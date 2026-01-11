// supabase/functions/falecomdev/index.ts

declare const Deno: {
    env: { get(name: string): string | undefined };
    serve: (handler: (req: Request) => Response | Promise<Response>) => unknown;
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "86400",
};

const DEST_EMAIL = "alangattiboni@gmail.com";

Deno.serve(async (req: Request): Promise<Response> => {
    // ========= CORS preflight =========
    if (req.method === "OPTIONS") {
        return new Response("ok", {
            status: 200,
            headers: corsHeaders,
        });
    }

    // Quick env check route (optional for debugging)
    if (new URL(req.url).pathname.endsWith("/falecomdev-env-check")) {
        return new Response(
            JSON.stringify({ hasResendKey: Boolean(RESEND_API_KEY) }),
            {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
        );
    }

    try {
        if (!RESEND_API_KEY) {
            return new Response(
                JSON.stringify({
                    error: "resend-key-missing",
                    hint:
                        "Set RESEND_API_KEY as a Function secret (supabase secrets set RESEND_API_KEY=...) and redeploy.",
                }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                },
            );
        }

        const url = new URL(req.url);
        const route = url.pathname.split("/").pop();
        if (route !== "falecomdev") {
            return new Response(
                JSON.stringify({ error: "not-found" }),
                {
                    status: 404,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                },
            );
        }

        if (req.method !== "POST") {
            return new Response(
                JSON.stringify({ error: "method-not-allowed" }),
                {
                    status: 405,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                },
            );
        }

        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return new Response(
                JSON.stringify({ error: "invalid-content-type" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                },
            );
        }

        const body = await req.json().catch(() => null) as
            | { title?: string; message?: string; files?: string[]; timestamp?: string }
            | null;

        if (!body) {
            return new Response(
                JSON.stringify({ error: "invalid-json" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                },
            );
        }

        const title = String(body.title || "").trim();
        const message = String(body.message || "").trim();
        const files = Array.isArray(body.files) ? body.files : [];
        const timestamp = body.timestamp || new Date().toISOString();

        if (!title || !message) {
            return new Response(
                JSON.stringify({ error: "missing-title-or-message" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                },
            );
        }

        const emailBody = `
Nova mensagem recebida via Fale com o Dev

Título:
${title}

Mensagem:
${message}

Recebido em:
${timestamp}

Links dos arquivos:
${files.map((u) => `- ${u}`).join("\n")}
    `.trim();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        let resendRes: Response;
        try {
            resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "Viang <no-reply@resend.dev>",
                    to: [DEST_EMAIL],
                    subject: title,
                    text: emailBody,
                }),
                signal: controller.signal,
            });
        } finally {
            clearTimeout(timeoutId);
        }

        const resendJson = await resendRes.json().catch(() => null);
        if (!resendRes.ok) {
            console.error("[falecomdev] Resend error", resendRes.status, resendJson);
            return new Response(
                JSON.stringify({
                    error: "resend-failed",
                    status: resendRes.status,
                    details: resendJson ?? null,
                }),
                {
                    status: 502,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                },
            );
        }

        return new Response(
            JSON.stringify({ ok: true, resend: resendJson }),
            {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
        );
    } catch (err) {
        console.error("[falecomdev] internal error", err);
        const message = err instanceof Error ? err.message : String(err);
        return new Response(
            JSON.stringify({ error: "internal-error", message }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
        );
    }
});
