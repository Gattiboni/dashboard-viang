import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const HOOK_SECRET = Deno.env.get("SUPABASE_AUTH_HOOK_SECRET");

serve(async (req) => {
    try {
        if (!HOOK_SECRET) {
            return new Response(
                JSON.stringify({ error: "Hook secret não configurado" }),
                { status: 500 }
            );
        }

        const receivedSignature = req.headers.get("x-supabase-signature");

        if (!receivedSignature || receivedSignature !== HOOK_SECRET) {
            return new Response(
                JSON.stringify({ error: "Assinatura do hook inválida" }),
                { status: 401 }
            );
        }

        const payload = await req.json();
        const email: string | undefined = payload?.user?.email;

        if (!email) {
            return new Response(
                JSON.stringify({ error: "Email ausente no payload de signup" }),
                { status: 400 }
            );
        }

        // exceção master
        if (email === "alangattiboni@gmail.com") {
            return new Response(JSON.stringify({}), { status: 200 });
        }

        // domínio permitido
        const allowedDomain = "@viang.com.br";

        if (!email.endsWith(allowedDomain)) {
            return new Response(
                JSON.stringify({ error: "Domínio de email não autorizado" }),
                { status: 403 }
            );
        }

        return new Response(JSON.stringify({}), { status: 200 });

    } catch (err) {
        return new Response(
            JSON.stringify({
                error: "Erro interno no Auth Hook",
                details: String(err)
            }),
            { status: 500 }
        );
    }
});
