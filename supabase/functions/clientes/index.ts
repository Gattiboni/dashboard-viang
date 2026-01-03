import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase env vars missing");
}

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: { persistSession: false },
        db: { schema: "dashboard" }
    }
);

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const url = new URL(req.url);
        const route = url.pathname.split("/").pop();

        if (route !== "clientes") {
            return new Response(JSON.stringify([]), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // =====================================================
        // BODY OPCIONAL
        // =====================================================
        let body: any = null;
        try {
            body = await req.json();
        } catch {
            body = null;
        }

        // =====================================================
        // 1) SAVE OVERRIDES
        // =====================================================
        if (body?.action === "save_overrides" && Array.isArray(body.payload)) {

            const rows = body.payload.map((item: any) => ({
                client_id: item.client_id,
                ml_email_override: item.ml_email ?? null,
                ml_phone_override: item.ml_phone ?? null,
                ml_perma_link_override: item.ml_perma_link ?? null,
                ml_logo_override: item.ml_logo ?? null,
                updated_at: new Date().toISOString()
            }));

            const { error } = await supabase
                .from("client_overrides")
                .upsert(rows, { onConflict: "client_id" });

            if (error) {
                throw error;
            }

            return new Response(
                JSON.stringify([]),
                { headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // =====================================================
        // 2) LIST CLIENTES
        // =====================================================

        // 2.1 api_tokens (fonte da verdade)
        const { data: tokens, error: tokensError } = await supabase
            .from("api_tokens")
            .select(`
                ml_logo,
                display_name,
                status,
                expires_at,
                client_id,
                user_id,
                ml_nickname,
                ml_first_name,
                ml_last_name,
                ml_email,
                ml_phone,
                ml_seller_status,
                ml_points,
                ml_site_id,
                ml_perma_link
            `)
            .eq("platform", "mercado_livre")
            .order("display_name", { ascending: true });

        if (tokensError) {
            throw tokensError;
        }

        // 2.2 overrides (sem relação declarada)
        const { data: overrides, error: overridesError } = await supabase
            .from("client_overrides")
            .select(`
                client_id,
                ml_logo_override,
                ml_email_override,
                ml_phone_override,
                ml_perma_link_override
            `);

        if (overridesError) {
            throw overridesError;
        }

        // 2.3 map de overrides por client_id
        const overridesMap = new Map(
            (overrides ?? []).map(o => [o.client_id, o])
        );

        // 2.4 merge final
        const merged = (tokens ?? []).map(row => {
            const o = overridesMap.get(row.client_id);

            return {
                ml_logo: o?.ml_logo_override ?? row.ml_logo,
                display_name: row.display_name,
                status: row.status,
                expires_at: row.expires_at,

                client_id: row.client_id,
                user_id: row.user_id,
                ml_nickname: row.ml_nickname,
                ml_first_name: row.ml_first_name,
                ml_last_name: row.ml_last_name,

                ml_email: o?.ml_email_override ?? row.ml_email,
                ml_phone: o?.ml_phone_override ?? row.ml_phone,

                ml_seller_status: row.ml_seller_status,
                ml_points: row.ml_points,
                ml_site_id: row.ml_site_id,

                ml_perma_link: o?.ml_perma_link_override ?? row.ml_perma_link
            };
        });

        return new Response(JSON.stringify(merged), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error("[clientes]", err);

        // CONTRATO DO FRONT: SEMPRE ARRAY
        return new Response(JSON.stringify([]), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    }
});
