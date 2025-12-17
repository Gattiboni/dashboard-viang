import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

/* =====================================================
 *  HELPERS
 * ===================================================== */

function parsePeriod(body: any) {
    if (body?.type === "custom") {
        return {
            start_date: body.start_date,
            end_date: body.end_date,
        };
    }

    return {
        preset: body?.preset ?? "30d",
    };
}

async function rpc(fn: string, params?: any) {
    const { data, error } = await supabase.rpc(fn, params ?? {});
    if (error) throw error;
    return data;
}

/* =====================================================
 *  SERVER
 * ===================================================== */

serve(async (req) => {
    try {
        const url = new URL(req.url);
        const path = url.pathname.split("/").pop();

        const body = await req.json().catch(() => ({}));
        const period = parsePeriod(body);

        /* =====================================================
         *  MAPA DE ENDPOINTS — PRODUTOS
         * ===================================================== */

        const map: Record<string, () => Promise<any>> = {
            /* PRIORIDADE 1 — ALERTAS */
            "alerts-pior-queda-produtos": () =>
                rpc("fn_pior_queda_produtos_semana"),

            "alerts-pior-queda-vendedores": () =>
                rpc("fn_pior_queda_vendedores_semana"),

            "alerts-pior-margem-produto": () =>
                rpc("fn_pior_margem_implicita_produto"),

            /* PRIORIDADE 2 — BUBBLE MARGEM */
            "chart-margem-produto-bubble": () =>
                rpc("fn_margem_operacional_por_produto", period),

            /* PRIORIDADE 3 — GIRO NO TEMPO */
            "chart-giro-produtos-tempo": () =>
                rpc("fn_giro_produtos_tempo", period),

            /* PRIORIDADE 4 — CURVA ABC */
            "table-curva-abc-produtos": () =>
                rpc("fn_curva_abc_produtos", period),

            /* PRIORIDADE 5 — TABELÃO */
            "table-tabelao-produtos": () =>
                rpc("fn_tabelao_produtos", period),
        };

        if (!path || !map[path]) {
            return new Response(
                JSON.stringify({ error: "Endpoint não encontrado" }),
                { status: 404 }
            );
        }

        const data = await map[path]();
        return Response.json(data);

    } catch (err) {
        return new Response(
            JSON.stringify({ error: String(err) }),
            { status: 500 }
        );
    }
});
