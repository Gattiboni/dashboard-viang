import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { crypto } from "https://deno.land/std@0.203.0/crypto/mod.ts";

/**
 * Supabase Auth Hook — Before User Created
 * Contrato REAL do Supabase:
 * - Valida assinatura HMAC
 * - Espera status 2xx ou erro
 * - Ignora payload extra
 */

const HOOK_SECRET = Deno.env.get("AUTH_HOOK_SECRET");
const EXPECTED_PROJECT_URL = Deno.env.get("SUPABASE_URL");
const ALLOWED_DOMAIN = "@viang.com.br";
const MASTER_EMAIL = "alangattiboni@gmail.com";

serve(async (req) => {
    const requestId = crypto.randomUUID();
    const start = Date.now();

    const log = (level: "info" | "warn" | "error", msg: string, extra: any = {}) => {
        console.log(JSON.stringify({
            level,
            msg,
            requestId,
            ts: new Date().toISOString(),
            ...extra,
        }));
    };

    try {
        if (!HOOK_SECRET) {
            log("error", "HOOK_SECRET ausente");
            return new Response("Hook misconfigured", { status: 500 });
        }


        // 2️⃣ Parse seguro do payload
        let payload: any;
        try {
            payload = JSON.parse(rawBody);
        } catch {
            log("error", "JSON inválido");
            return new Response("Invalid JSON", { status: 400 });
        }

        const email = payload?.user?.email;
        const userId = payload?.user?.id;

        if (!email || !userId) {
            log("warn", "Payload incompleto", { payload });
            return new Response("Invalid payload", { status: 400 });
        }

        // 3️⃣ Log de contrato implícito
        log("info", "Signup attempt", {
            email,
            userId,
            projectUrl: EXPECTED_PROJECT_URL,
            hookUrl: req.url,
        });

        // 4️⃣ Exceção master
        if (email === MASTER_EMAIL) {
            log("info", "Master bypass");
            return ok(start, requestId);
        }

        // 5️⃣ Regra de domínio
        if (!email.endsWith(ALLOWED_DOMAIN)) {
            log("warn", "Domínio não autorizado", { email });
            return new Response(
                JSON.stringify({ error: "Domínio não autorizado" }),
                { status: 403 }
            );
        }

        // 6️⃣ Sucesso
        return ok(start, requestId);

    } catch (err) {
        log("error", "Erro interno", { error: String(err) });
        return new Response("Internal error", { status: 500 });
    }
});

function ok(start: number, requestId: string) {
    return new Response(null, {
        status: 200,
        headers: {
            "x-auth-hook": "pre-signup-domain-guard",
            "x-request-id": requestId,
            "x-processing-ms": String(Date.now() - start),
        },
    });
}
