// supabase/functions/cliente-detalhe/index.ts

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* =====================================================
 *  ENV
 * ===================================================== */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase env vars missing");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
});

/* =====================================================
 *  CORS
 * ===================================================== */

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/* =====================================================
 *  PERÍODO — igual ao padrão das edges existentes
 * ===================================================== */

type DashboardPeriod =
    | { type: "preset"; preset: "7d" | "30d" | "90d"; start_date: null; end_date: null }
    | { type: "custom"; preset: null; start_date: string; end_date: string };

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

/* =====================================================
 *  RPC — cliente + período
 * ===================================================== */

async function rpcCliente(fn: string, client_id: string, period: DashboardPeriod) {
    const { start_date, end_date } = resolvePeriod(period);

    const { data, error } = await supabase
        .schema("dashboard")
        .rpc(fn, {
            p_client_id: client_id,
            p_start_date: start_date,
            p_end_date: end_date,
        });

    if (error) throw error;
    return data ?? [];
}

/* =====================================================
 *  SERVER
 * ===================================================== */

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    try {
        const url = new URL(req.url);
        const route = url.pathname.split("/").pop();

        if (!route) {
            return new Response(JSON.stringify({ error: "Invalid route" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const body = await req.json();

        const client_id = body?.client_id;
        if (!client_id) {
            return new Response(JSON.stringify({ error: "client_id missing" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // period = resto do body (o front manda {client_id, type, preset, start_date, end_date})
        const period: DashboardPeriod = {
            type: body?.type,
            preset: body?.preset ?? null,
            start_date: body?.start_date ?? null,
            end_date: body?.end_date ?? null,
        };

        const map: Record<string, () => Promise<any>> = {
            // KPIs
            "kpi-receita-bruta": () =>
                rpcCliente("fn_kpi_receita_bruta_cliente", client_id, period),

            "kpi-ticket-medio": () =>
                rpcCliente("fn_kpi_ticket_medio_cliente", client_id, period),

            // Charts
            "chart-receita-por-semana": () =>
                rpcCliente("fn_chart_receita_por_semana_cliente", client_id, period),

            "chart-pedidos-dia": () =>
                rpcCliente("fn_chart_pedidos_por_dia_cliente", client_id, period),

            "chart-unidades-categoria": () =>
                rpcCliente("fn_chart_unidades_categoria_cliente", client_id, period),

            "chart-distribuicao-categoria": () =>
                rpcCliente("fn_chart_distribuicao_categoria_cliente", client_id, period),

            "chart-top-skus": () =>
                rpcCliente("fn_chart_top_skus_cliente", client_id, period),

            // Alerts
            "alerts-pior-queda-produtos": () =>
                rpcCliente("fn_pior_queda_produtos_semana_cliente", client_id, period),

            // Produtos (cliente) — usados na página Cliente Detalhe
            "chart-margem-produto-bubble": () =>
                rpcCliente("fn_margem_operacional_por_produto_cliente", client_id, period),

            "table-curva-abc-produtos": () =>
                rpcCliente("fn_curva_abc_produtos_cliente", client_id, period),

            "table-tabelao-produtos": () =>
                rpcCliente("fn_tabelao_produtos_cliente", client_id, period),
        };

        if (!map[route]) {
            return new Response(JSON.stringify({ error: "Unknown route" }), {
                status: 404,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const data = await map[route]();

        return new Response(JSON.stringify(data ?? []), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("[cliente-detalhe]", err);

        return new Response(
            JSON.stringify({
                error: "Internal error",
                details: err instanceof Error ? err.message : String(err),
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
        );
    }
});
