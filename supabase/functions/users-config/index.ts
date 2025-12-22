// supabase/functions/users-config/index.ts

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* =====================================================
 * ENV
 * ===================================================== */
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase environment variables");
}

/* =====================================================
 * CLIENT
 * ===================================================== */
const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
);

/* =====================================================
 * CORS
 * ===================================================== */
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/* =====================================================
 * HANDLERS
 * ===================================================== */
async function listUsers() {
    const { data, error } = await supabase
        .schema("dashboard")
        .from("users")
        .select(`
            id,
            email,
            role,
            permission_level,
            status,
            is_master,
            created_at,
            updated_at
        `)
        .order("created_at", { ascending: true });

    if (error) throw error;

    return data ?? [];
}

/* =====================================================
 * SERVER
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
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            }
        );
    }

    try {
        const route = new URL(req.url).pathname.split("/").pop();

        const map: Record<string, () => Promise<any>> = {
            list: () => listUsers(),
        };

        if (!route || !map[route]) {
            return new Response(
                JSON.stringify({ error: "Unknown route" }),
                { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const data = await map[route]();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        console.error("[users-config]", err);

        return new Response(
            JSON.stringify({
                error: "Internal error",
                details:
                    err instanceof Error ? err.message : String(err),
            }),
            {
                status: 500,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            }
        );
    }
});
