import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* =====================================================
 *  ENV
 * ===================================================== */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase env vars missing");
}

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
);

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
 *  PERÍODO — IGUAL À HOME
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
 *  RPC — IGUAL À HOME
 * ===================================================== */

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

/* =====================================================
 *  SERVER
 * ===================================================== */

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ error: "Method not allowed" }),
            {
                status: 405,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }

    try {
        const url = new URL(req.url);
        const route = url.pathname.split("/").pop()!;
        const period = await req.json();

        /* =================================================
         *  MAPA DE ENDPOINTS — PRODUTOS (NORMALIZADO)
         * ================================================= */

        const map: Record<string, () => Promise<any>> = {
            /* ALERTAS — TODOS COM PERÍODO */
            "alerts-pior-queda-produtos": () =>
                rpc("fn_pior_queda_produtos_semana", period),

            "alerts-pior-queda-vendedores": () =>
                rpc("fn_pior_queda_vendedores_semana", period),

            "alerts-pior-margem-produto": () =>
                rpc("fn_pior_margem_implicita_produto", period),

            /* GRÁFICOS */
            "chart-margem-produto-bubble": () =>
                rpc("fn_margem_operacional_por_produto", period),

            "chart-giro-produtos-tempo": () =>
                rpc("fn_giro_produtos_tempo", period),

            /* TABELAS */
            "table-curva-abc-produtos": () =>
                rpc("fn_curva_abc_produtos", period),

            "table-tabelao-produtos": () =>
                rpc("fn_tabelao_produtos", period),
        };

        if (!map[route]) {
            return new Response(
                JSON.stringify({ error: "Unknown route" }),
                {
                    status: 404,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        const data = await map[route]();

        return new Response(JSON.stringify(data ?? []), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error("[produtos-dashboard]", err);

        return new Response(
            JSON.stringify({
                error: "Internal error",
                details: err instanceof Error ? err.message : String(err),
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
