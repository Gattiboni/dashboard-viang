# Guia Oficial — Implementação Edge Function + Frontend (Dashboard Viang)

Este documento define o **padrão obrigatório** para criação de:
- novas Edge Functions (`index.ts`)
- novas páginas frontend (`*.html`)

O objetivo é garantir:
- contrato único
- comportamento previsível
- zero ambiguidade de período
- frontend burro e backend consistente

Qualquer desvio deste guia **exige justificativa explícita**.

---

## 1️⃣ Princípio central (não negociável)

> **Toda Edge Function trabalha SEMPRE com período explícito.**  
> **Toda decisão temporal acontece no frontend.**

- Backend **nunca** decide o que é “semana”, “mês”, “recente”, etc.
- Backend recebe apenas:
  - `p_start_date`
  - `p_end_date`

---

## 2️⃣ Modelo de período (contrato global)

### Tipo único aceito
```ts
type DashboardPeriod =
  | { type: "preset"; preset: "7d" | "30d" | "90d"; start_date: null; end_date: null }
  | { type: "custom"; preset: null; start_date: string; end_date: string };

# Regras

- **Frontend** sempre envia um `DashboardPeriod`.
- **Backend** sempre resolve para datas ISO (`YYYY-MM-DD`).
- Nenhuma RPC recebe preset.
- Nenhuma RPC calcula datas internamente.

## 3️⃣ Estrutura obrigatória — Edge Function (`index.ts`)
### 3.1 Runtime e setup
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Sempre usar std@0.224.0

Sempre usar supabase-js@2

Sempre validar ENV

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Supabase env vars missing");
}

3.2 Cliente Supabase (padrão)
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

3.3 CORS (padrão único)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

3.4 Resolução de período (copiar e não reinventar)
function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

function resolvePeriod(p: DashboardPeriod) {
  if (p.type === "custom") {
    return { start_date: p.start_date, end_date: p.end_date };
  }

  const end = new Date();
  const start = new Date(end);

  if (p.preset === "7d") start.setDate(end.getDate() - 7);
  if (p.preset === "30d") start.setDate(end.getDate() - 30);
  if (p.preset === "90d") start.setDate(end.getDate() - 90);

  return { start_date: iso(start), end_date: iso(end) };
}

3.5 Helper de RPC (único permitido)
async function rpc(fn: string, period: DashboardPeriod) {
  const { start_date, end_date } = resolvePeriod(period);

  const { data, error } = await supabase
    .schema("dashboard")
    .rpc(fn, {
      p_start_date: start_date,
      p_end_date: end_date,
    });

  if (error) throw error;
  return data;
}


Proibido:

supabase.rpc() direto

passar {} como payload

RPC sem período

3.6 Server (estrutura fixa)
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const route = new URL(req.url).pathname.split("/").pop()!;
    const period = await req.json();

    const map: Record<string, () => Promise<any>> = {
      /* endpoints aqui */
    };

    if (!map[route]) {
      return new Response(
        JSON.stringify({ error: "Unknown route" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await map[route]();

    return new Response(JSON.stringify(data ?? []), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("[edge-function]", err);

    return new Response(
      JSON.stringify({
        error: "Internal error",
        details: err instanceof Error ? err.message : String(err),
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

4️⃣ Endpoints (regras obrigatórias)

Todos os endpoints:

recebem DashboardPeriod

chamam rpc(fn, period)

Não existem:

endpoints “sem período”

exceções “só esse aqui”

Exemplo correto:

"alerts-pior-queda-produtos": () =>
  rpc("fn_pior_queda_produtos_semana", period)

5️⃣ SQL / RPCs — aprendizados críticos
5.1 Período

Toda função SQL recebe:

(p_start_date DATE, p_end_date DATE)

5.2 Comparações

Alertas comparativos usam percentual, não valor absoluto

Volume absoluto só serve como contexto, nunca como ranking

5.3 Margem

Margem implícita viável:

margem = receita_bruta - custo_comissao_ml


Para ranking: usar percentual

margem_percentual = Σ(margem) / Σ(receita_bruta)

5.4 Identidade

Nunca confiar em seller_name vindo “cru”

Sempre resolver via:

client_id → vw_clientes.display_name

6️⃣ Frontend — contrato obrigatório
6.1 Estado global
window.DASHBOARD_PERIOD


Sempre existe

Sempre enviado

Nunca {}

6.2 postJSON (imutável)
postJSON(path, payload)
# Headers obrigatórios:

**apikey:** SUPABASE_ANON_KEY

**Authorization:** Bearer SUPABASE_ANON_KEY

## 6.3 Regras de consumo

- Frontend não calcula período
- Frontend não recalcula métricas já resolvidas
- Frontend não corrige identidade
- Frontend apenas:
  - renderiza
  - formata
  - colore

## 7️⃣ Checklist antes de deploy

- Nenhum endpoint recebe {}
- Todas as RPCs recebem `p_start_date` / `p_end_date`
- Nenhum cálculo temporal no backend
- Nenhum nome humano vindo direto da API transacional
- Alertas comparados por percentual
- Edge Function idêntica estruturalmente à Home
- Frontend envia sempre `window.DASHBOARD_PERIOD`

> Se todos os itens são sim, o deploy é técnico, não ritualístico.

## 8️⃣ Regra final (a mais importante)

Se Home e a nova página não puderem compartilhar o mesmo helper mental, a implementação está errada.


