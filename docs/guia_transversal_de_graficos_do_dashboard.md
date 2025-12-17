# Guia Transversal de Gráficos do Dashboard (Viang)

> **Objetivo**: registrar **todos os critérios e parâmetros transversais** (técnicos, de UI e de arquitetura) que devem ser respeitados **em qualquer gráfico** criado daqui pra frente no frontend.

---

## 1) Fontes de verdade e limites

- **Template AdminDek (dump + tree) é a fonte de verdade do frontend.**
- **Arquivos existentes no template devem ser reutilizados.**
- **Padrão do projeto: multi-page (HTML) + includes** (Vite + plugin de include), sem alterar o modelo estrutural.
- **MVP congelado**: decisões e padrões já adotados não são contornados “por fora”.

---

## 2) Convenções de página e includes (estrutura fixa)

### Estrutura base obrigatória de qualquer página com gráfico

- HTML com `@@include` para:
  - `head-page-meta-root.html` (título)
  - `head-css-root.html` (CSS/estilos do template)
  - `layout-vertical-viang.html` (layout global)
  - `breadcrumb.html` (hierarquia e navegação)

### Regras práticas

- **Não duplicar ****************************************************`<script>`**************************************************** inline antigos**: uma página deve ter **um único bloco de scripts de lógica** (ou módulos bem delimitados), sem sobras.
- **Não “mexer no head”** além dos includes e do título da página.
- **Assets**: usar somente os assets já providos pelo AdminDek (JS/CSS vendor e do tema), via includes do template.

---

## 3) Biblioteca de gráficos e padrão de render

### Biblioteca

- **ApexCharts** é o padrão para gráficos nativos do projeto.

### Identidade e ciclo de vida do chart

- Cada gráfico tem:
  - Um **container DOM** (id único, ex: `#chart-xxx`).
  - Uma **variável de instância** (ex: `let chartX;`).
  - Uma função `loadX()` para:
    - buscar dados
    - mapear para `categories`/`series`
    - `updateOptions()` se instância já existe
    - `new ApexCharts(...).render()` na primeira vez

### Resiliência

- Cada `loadX()` deve estar em `try/catch` e logar com prefixo padronizado (`[Chart Nome]`).
- Quando o container não existir, a função retorna sem erro.

---

## 4) Contrato de dados: Supabase (SQL) → Edge Function → Front

### Camada SQL (Supabase)

- Views são **camada oficial de leitura** do MVP.
- Views **não alteram dados**, só leem (ex.: base `raw_events` via views de flatten).
- Views para o dashboard vivem no **schema \*\*\*\*****`dashboard`**.
- Views devem expor colunas prontas para consumo:
  - **`client_id`**\*\* sempre presente\*\* em qualquer métrica multi-tenant.
  - Datas em formato DD/MM/AAAA quando forem trafegadas para o front (salvo mediante orientações específicas explícitas).
  - Números como `numeric`/`bigint` (sem strings formatadas).

### Edge Function (por página)

- Padrão: **1 Edge Function por página**.
- A Edge Function:
  - roda no Deno
  - usa `SUPABASE_SERVICE_ROLE_KEY` (somente backend)
  - executa \*\*RPCs no schema \*\***`dashboard`** (`supabase.schema("dashboard").rpc(...)`)
  - faz roteamento por `route` (último segmento do path)
  - retorna JSON array (fallback `[]`)
  - aplica CORS + `Content-Type: application/json`

### Payload de período (contrato do front → Edge)

- O front envia um JSON `period` padronizado:
  - presets (`7d`, `30d`, `90d`)
  - custom com `start_date` e `end_date` (`YYYY-MM-DD`)
- A Edge resolve datas e passa para RPC como:
  - `p_start_date`
  - `p_end_date`

### RPCs (contrato Edge → DB)

- Padrão de assinatura: funções aceitam `p_start_date`, `p_end_date`.
- Retorno: linhas simples, sem nested JSON.
- Nomes consistentes com o mapa de rotas (ex.: `chart-pedidos-dia` → `fn_chart_pedidos_por_dia`).

---

## 5) Segurança e credenciais

- **Nenhum segredo no frontend.**
- Frontend pode usar:
  - `SUPABASE_ANON_KEY` (pública)
- Backend (Edge) guarda e usa:
  - `SUPABASE_SERVICE_ROLE_KEY`
- Metabase embedding (quando aplicável):
  - segredo de assinatura (JWT) fica **somente** no backend
  - front consome URL já assinada

---

## 6) Padrões de request do frontend (fetch)

- Chamadas para dados do dashboard usam **POST JSON** para `SUPABASE_FN_BASE`.
- Headers padrão:
  - `Content-Type: application/json`
  - `apikey: SUPABASE_ANON_KEY`
  - `Authorization: Bearer SUPABASE_ANON_KEY`
- Tratamento de erro:
  - parse do JSON com fallback
  - quando `res.ok` é falso, log estruturado

---

## 7) Formatação e internacionalização (padrão atual observado)

> Observação: esta seção descreve **o padrão implementado atualmente** no `dashboard.html`.

### Datas

- Função utilitária de UI: `formatDateBRShort("YYYY-MM-DD") → "DD/MM/YY"`.
- Período trafegado e persistido: ISO `YYYY-MM-DD`.

### Números

- Há utilitário `formatNumberCompact()` usando `Intl.NumberFormat('pt-BR')` e sufixos (`k`, `M`, `B`).

### Moeda

- Há utilitários de compactação/formatação de BRL usados em `yaxis/tooltip` para gráficos monetários.

---

## 8) Tooltips, legendas, labels e densidade visual

- Cada gráfico define explicitamente:

  - `tooltip` (especialmente `tooltip.y.formatter`)
  - `legend` (mostrar/ocultar e posicionamento)
  - `dataLabels` (enabled, estilo e formatter)
  - `xaxis.categories` e `xaxis.labels.rotate` quando necessário
  - `yaxis.labels.formatter`

- **Padrão de toolbar**: `chart.toolbar.show = false`.

---

## 9) Cores e consistência visual

- Cores vêm de helper `pickColors(n)` (paleta do template).
- Não fixar paletas ad-hoc por gráfico fora desse helper.

---

## 10) Organização do código na página

- Encapsular em IIFE (padrão atual): `(function(){ ... })();`
- Estrutura recomendada por ordem:
  1. Config/constantes (keys, base URL, estado do período)
  2. Helpers (formatters, parse de range)
  3. Infra de request (`postJSON`)
  4. Funções `loadX()` por gráfico
  5. `reloadAll()` chamando cada `loadX()`
  6. Boot inicial (preset default, badges, reload)

---

## 11) Critérios de “pronto” para um gráfico novo

- Existe \*\*view (ou RPC) em \*\***`dashboard`** retornando dataset minimalista.
- Existe **rota mapeada** na Edge Function da página.
- Existe container DOM e instância ApexCharts com ciclo de vida correto.
- Existe formatação declarada (data, número, moeda) no chart.
- Erros de rede/DB não quebram a página: logam e seguem.

---

##

---

## Apêndice A) Glossário rápido

- **View**: camada de leitura SQL (contrato estável para gráficos).
- **RPC**: função Postgres chamada pela Edge Function via `schema('dashboard').rpc()`.
- **Edge Function**: backend por página que protege credenciais e padroniza saída JSON.
- **Period**: payload padronizado de filtro temporal.

