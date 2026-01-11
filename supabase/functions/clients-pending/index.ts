// =====================================================
// 1) RUNTIME E IMPORTS
// =====================================================

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";


// =====================================================
// 2) ENV (SEGREDOS E VARIÁVEIS)
// =====================================================

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");


// =====================================================
// 3) CORS (PADRÃO FIXO)
// =====================================================

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};


// =====================================================
// 4) SERVER / HANDLER
// =====================================================

serve(async (req) => {
    console.log("[clients-pending] request-start", {
        method: req.method,
        url: req.url,
    });

    // =====================================================
    // 4.1) CORS PREFLIGHT
    // =====================================================
    if (req.method === "OPTIONS") {
        console.log("[clients-pending] cors-preflight");
        return new Response("ok", { headers: corsHeaders });
    }

    // =====================================================
    // 4.2) VALIDAÇÃO DE MÉTODO
    // =====================================================
    if (req.method !== "POST") {
        console.warn("[clients-pending] invalid-method", {
            method: req.method,
        });
        return new Response(
            JSON.stringify([]),
            {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }

    try {
        // =====================================================
        // 4.3) VALIDA ENV
        // =====================================================
        if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
            console.error("[clients-pending] supabase-env-missing", {
                hasUrl: Boolean(SUPABASE_URL),
                hasServiceKey: Boolean(SUPABASE_SERVICE_ROLE_KEY),
            });
            return new Response(
                JSON.stringify([]),
                {
                    status: 200,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // =====================================================
        // 4.4) QUERY api_tokens (status = pending)
        // =====================================================
        console.log("[clients-pending] fetch-start");

        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/api_tokens` +
            `?status=eq.pending` +
            `&select=client_id,ml_email,status`,
            {
                method: "GET",
                headers: {
                    "Accept-Profile": "dashboard",
                    "apikey": SUPABASE_SERVICE_ROLE_KEY,
                    "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            const errorText = await res.text().catch(() => null);

            console.error("[clients-pending] fetch-failed", {
                status: res.status,
                response: errorText,
            });

            return new Response(
                JSON.stringify([]),
                {
                    status: 200,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        const data = await res.json();

        console.log("[clients-pending] fetch-success", {
            count: Array.isArray(data) ? data.length : 0,
        });

        // =====================================================
        // 4.5) RESPONSE DE SUCESSO
        // =====================================================
        return new Response(
            JSON.stringify(Array.isArray(data) ? data : []),
            {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );

    } catch (err) {
        console.error("[clients-pending] unhandled-error", {
            message: err instanceof Error ? err.message : String(err),
            stack: err instanceof Error ? err.stack : undefined,
        });

        return new Response(
            JSON.stringify([]),
            {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
