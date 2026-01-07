import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")!;

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
        db: {
            schema: "dashboard"
        }
    }
);

type ActionType = "explain" | "analyze" | "ask";
type ContextType = "page" | "element";

interface ViangRequest {
    client_id: string;
    page: string;
    context: ContextType;

    page_semantic_context?: any;

    element_id?: string | null;
    element_type?: string | null;

    action_type: ActionType;
    user_prompt?: string | null;

    period: {
        start: string;
        end: string;
    };
}

serve(async (req) => {
    try {
        if (req.method === "OPTIONS") {
            return new Response("ok", { headers: corsHeaders });
        }

        if (req.method !== "POST") {
            return new Response("Method not allowed", {
                status: 405,
                headers: corsHeaders
            });
        }

        let payload: ViangRequest;

        try {
            payload = await req.json();
        } catch {
            return new Response("Invalid JSON payload", {
                status: 400,
                headers: corsHeaders
            });
        }

        const {
            client_id,
            page,
            context,
            element_id = null,
            element_type = null,
            action_type,
            user_prompt = null,
            period
        } = payload;

        // ===== Validações explícitas (sem inferência) =====
        if (!client_id || !page || !context || !action_type || !period) {
            return new Response("Missing required fields", {
                status: 400,
                headers: corsHeaders
            });
        }

        if (context === "element") {
            // Guardrail 1 — identidade mínima do elemento
            if (!element_id || !element_type) {
                return new Response(
                    "element_id e element_type são obrigatórios quando context=element",
                    { status: 400, headers: corsHeaders }
                );
            }

            // Guardrail 2 — contexto semântico da página é obrigatório
            if (!payload.page_semantic_context) {
                return new Response(
                    "page_semantic_context é obrigatório para contexto element",
                    { status: 400, headers: corsHeaders }
                );
            }

            // Guardrail 3 — componentes precisam existir
            if (!Array.isArray(payload.page_semantic_context.components)) {
                return new Response(
                    "page_semantic_context.components ausente ou inválido",
                    { status: 400, headers: corsHeaders }
                );
            }
        }

        if (action_type === "ask" && !user_prompt) {
            return new Response("user_prompt is required for action_type=ask", {
                status: 400,
                headers: corsHeaders
            });
        }

        // ===== Hash determinístico do cache =====
        const hashBase = JSON.stringify({
            client_id,
            page,
            context,
            element_id,
            action_type,
            period,
            user_prompt: action_type === "ask" ? user_prompt : null
        });

        const hash = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(hashBase)
        ).then(buf =>
            Array.from(new Uint8Array(buf))
                .map(b => b.toString(16).padStart(2, "0"))
                .join("")
        );

        // ===== 1) Tenta ler cache válido =====
        const { data: cached } = await supabase
            .from("insight_cache")
            .select("response")
            .eq("hash", hash)
            .gt("expires_at", new Date().toISOString())
            .limit(1)
            .maybeSingle();

        if (cached?.response) {
            return new Response(
                JSON.stringify({ source: "cache", response: cached.response }),
                {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        // ===== 2) Limpa lixo vencido desse contexto =====
        await supabase
            .from("insight_cache")
            .delete()
            .eq("client_id", client_id)
            .eq("page", page)
            .eq("scope", context)
            .eq("action_type", action_type)
            .lte("expires_at", new Date().toISOString());

        let elementData: any = null;

        if (context === "element") {
            // =====================================================
            // 1) MAPEAMENTO DETERMINÍSTICO element_id → data_source
            // =====================================================
            const components = payload.page_semantic_context?.components;

            if (!Array.isArray(components)) {
                return new Response(
                    "page_semantic_context.components ausente ou inválido para contexto element",
                    { status: 400, headers: corsHeaders }
                );
            }

            const matches = components.filter(c => c.id === element_id);

            if (matches.length === 0) {
                return new Response(
                    `Elemento ${element_id} não encontrado no page_semantic_context`,
                    { status: 400, headers: corsHeaders }
                );
            }

            if (matches.length > 1) {
                return new Response(
                    `Mapeamento ambíguo: múltiplos componentes com id ${element_id}`,
                    { status: 400, headers: corsHeaders }
                );
            }

            const component = matches[0];

            if (!component.data_source || !component.data_source.name) {
                return new Response(
                    `Data source ausente ou inválido para o elemento ${element_id}`,
                    { status: 400, headers: corsHeaders }
                );
            }

            const dataSourceName = component.data_source.name;

            // =====================================================
            // 2) Consome a MESMA rota que o gráfico usa
            // =====================================================
            const elementRes = await fetch(
                `${SUPABASE_URL}/functions/v1/home-dashboard/${dataSourceName}`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        type: "custom",
                        preset: null,
                        start_date: payload.period.start,
                        end_date: payload.period.end
                    })
                }
            );

            if (!elementRes.ok) {
                const err = await elementRes.text();
                return new Response(err, {
                    status: 500,
                    headers: corsHeaders
                });
            }

            const raw = await elementRes.json();

            elementData =
                Array.isArray(raw)
                    ? {
                        exists: true,
                        has_data: raw.length > 0,
                        rows: raw,
                        count: raw.length
                    }
                    : {
                        exists: false,
                        has_data: false,
                        rows: [],
                        count: 0
                    };
        }

        let pageData: any = null;

        if (context === "page" && action_type === "analyze") {
            const components = payload.page_semantic_context?.components;

            if (!Array.isArray(components)) {
                return new Response(
                    "components ausente ou inválido no page_semantic_context",
                    { status: 400, headers: corsHeaders }
                );
            }

            const results: Record<string, any> = {};

            for (const c of components) {
                if (!c?.data_source?.name) {
                    continue;
                }

                const res = await fetch(
                    `${SUPABASE_URL}/functions/v1/home-dashboard/${c.data_source.name}`,
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            type: "custom",
                            preset: null,
                            start_date: payload.period.start,
                            end_date: payload.period.end
                        })
                    }
                );

                if (!res.ok) {
                    const err = await res.text();
                    return new Response(err, {
                        status: 500,
                        headers: corsHeaders
                    });
                }

                const raw = await res.json();

                const normalized =
                    Array.isArray(raw)
                        ? {
                            exists: true,
                            has_data: raw.length > 0,
                            rows: raw,
                            count: raw.length
                        }
                        : {
                            exists: false,
                            has_data: false,
                            rows: [],
                            count: 0
                        };

                results[c.id] = {
                    id: c.id,
                    type: c.type,
                    data_source: c.data_source.name,
                    state: normalized.has_data ? "populated" : "empty",
                    rows: normalized.rows,
                    count: normalized.count
                };
            }

            pageData = results;
        }


        // ===== 3) Define modelo conforme ação =====
        let model = "gpt-4.1-mini";

        if (action_type === "analyze" && context === "page") {
            model = "gpt-5.2";
        } else if (action_type === "analyze") {
            model = "gpt-4.1";
        } else if (action_type === "explain" && context === "page") {
            model = "gpt-4.1";
        }

        // ===== 4) Monta prompt base (simples e controlado) =====

        // 4.1 — Carrega dicionário oficial (fonte única da verdade)
        const { data: dictionaryRows, error: dictError } = await supabase
            .from("vw_data_dictionary_markdown")
            .select("*");

        if (dictError) {
            console.error("[viang-ai] erro ao carregar dicionário", dictError);
        }

        const dataDictionary =
            Array.isArray(dictionaryRows)
                ? dictionaryRows.map(r => r.markdown_doc).join("\n")
                : "";

        // 4.2 — Prompt institucional (sem inferência)
        const systemPrompt = `
Você é a v.I.A.ng, a IA analítica da plataforma Viang.

Você fala com autoridade institucional.
Você nunca generaliza dashboards.
Você nunca descreve abstrações que não existam no produto.

FONTE ÚNICA DE VERDADE CONCEITUAL:
${dataDictionary}

Regras absolutas:
- Use EXCLUSIVAMENTE os conceitos definidos acima.
- Nunca invente métricas, entidades ou significados.
- Nunca descreva algo que não exista na página.
- Nunca use linguagem genérica ou defensiva.
`;

        let userContent = "";

        if (action_type === "explain") {
            userContent = context === "page"
                ? `
Você está explicando uma página da plataforma Viang.

Contexto semântico da página:
${JSON.stringify(payload.page_semantic_context, null, 2)}

Explique de forma institucional, clara e aplicada o papel dessa página,
como ela funciona e para que serve no contexto da Viang.
`
                : `
Explique o elemento "${element_id}" (tipo: ${element_type}) da página "${page}".

Dados reais do elemento:
${JSON.stringify(elementData, null, 2)}
`;
        }

        if (action_type === "analyze") {
            userContent = context === "page"
                ? `Você está analisando a página "${page}" no período de ${period.start} a ${period.end}.

Interprete os dados como um gestor faria ao olhar este dashboard.

Regras de linguagem (obrigatórias):
- NÃO mencione termos técnicos (payload, JSON, schema, endpoint, RPC, edge, função, query, view, tabela, etc.).
- NÃO cite nomes de IDs técnicos (como "chart-..." ou "kpi-...") no texto final.
- Use linguagem clara, direta e executiva.

Regras de análise (obrigatórias):
- Considere SOMENTE os componentes que possuem dados no período.
- Quando um indicador estiver zerado ou ausente, explique o impacto disso no negócio.
- Se houver divergência entre indicadores, proponha até 2 hipóteses de negócio, sem tecnicês.

Formato:
- Texto corrido
- Conclusões práticas
- 3 ações recomendadas

Dados consolidados da página:
${JSON.stringify(pageData, null, 2)}`
                : `Você está analisando um elemento específico da página "${page}" no período de ${period.start} a ${period.end}.

Interprete os dados como um gestor faria ao olhar **apenas este indicador**, considerando impacto, tendência e tomada de decisão.

Regras de linguagem (obrigatórias):
- NÃO mencione termos técnicos (payload, JSON, schema, endpoint, RPC, edge, função, query, view, tabela, etc.).
- NÃO cite nomes de IDs técnicos no texto final.
- Fale sempre em termos de negócio, nunca de implementação.
- Seja direto, executivo e acionável.

    Regras de análise (obrigatórias):
    - Se \`has_data = false\`, explique o impacto prático da ausência de dados.
- Se houver dados, descreva o comportamento observado (tendência, concentração, variação).
- Não descreva o gráfico. Descreva o que ele **significa**.
- Não generalize para a página inteira.

Formato:
- 1 parágrafo executivo
- 3 insights objetivos
- 2 ações recomendadas

Dados do elemento:
${JSON.stringify(elementData, null, 2)}`;
        }

        // ===== 5) Chamada OpenAI =====
        const openaiRes = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                input: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userContent }
                ]
            })
        });

        if (!openaiRes.ok) {
            const err = await openaiRes.text();
            return new Response(err, {
                status: 500,
                headers: corsHeaders
            });
        }

        const openaiJson = await openaiRes.json();
        const aiResponse =
            openaiJson.output_text ??
            openaiJson.output?.[0]?.content?.[0]?.text ??
            "Sem resposta";

        // ===== 6) Salva no cache =====
        await supabase.from("insight_cache").insert({
            client_id,
            page,
            scope: context,
            element_id,
            action_type,
            prompt: user_prompt,
            context: payload,
            response: aiResponse,
            hash,
            expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
        });

        return new Response(
            JSON.stringify({ source: "openai", response: aiResponse }),
            {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (err) {
        console.error("[viang-ai] erro não tratado", err);
        return new Response(
            "Internal Server Error",
            {
                status: 500,
                headers: corsHeaders
            }
        );
    }
});