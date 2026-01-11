// =====================================================
// 1) RUNTIME E IMPORTS
// =====================================================

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";


// =====================================================
// 2) ENV (SEGREDOS E VARIÁVEIS)
// =====================================================

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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
    console.log("[invite-new-client] request-start", {
        method: req.method,
        url: req.url,
        headers: {
            "content-type": req.headers.get("content-type"),
            "authorization": !!req.headers.get("authorization"),
            "apikey": !!req.headers.get("apikey"),
        },
    });

    // =====================================================
    // 4.1) CORS PREFLIGHT (OPTIONS)
    // =====================================================
    if (req.method === "OPTIONS") {
        console.log("[invite-new-client] cors-preflight");
        return new Response("ok", { headers: corsHeaders });
    }

    // =====================================================
    // 4.2) VALIDAÇÃO DE MÉTODO
    // =====================================================
    if (req.method !== "POST") {
        console.warn("[invite-new-client] invalid-method", {
            method: req.method,
        });
        return new Response(JSON.stringify([]), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    try {
        // =====================================================
        // 4.3) VALIDAÇÃO DE CONTENT-TYPE
        // =====================================================
        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            console.warn("[invite-new-client] invalid-content-type", {
                contentType,
            });
            return new Response(
                JSON.stringify({ error: "invalid-content-type" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // =====================================================
        // 4.4) PARSE DO BODY (JSON)
        // =====================================================
        let body: any;
        try {
            body = await req.json();
        } catch {
            console.error("[invite-new-client] invalid-json-body");
            return new Response(
                JSON.stringify({ error: "invalid-json" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // =====================================================
        // 4.5) VALIDAÇÃO DE PAYLOAD
        // =====================================================
        const email = String(body?.email || "").trim();
        if (!email) {
            console.warn("[invite-new-client] email-missing", {
                body,
            });
            return new Response(
                JSON.stringify({ error: "email-missing" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }
        if (!RESEND_API_KEY) {
            console.error("[invite-new-client] resend-key-missing");
            return new Response(
                JSON.stringify({ error: "resend-key-missing" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // =====================================================
        // 4.5.1) GERA CLIENT_ID (estado pending)
        // =====================================================

        const client_id = crypto.randomUUID();

        console.log("[invite-new-client] client-id-generated", {
            client_id,
            email,
        });


        // =====================================================
        // 4.5.2) INSERT MÍNIMO EM api_tokens (pending)
        // =====================================================

        console.log("[invite-new-client] insert-api_tokens-start", {
            client_id,
            email,
            platform: "mercado_livre",
            status: "pending",
        });

        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

        if (!supabaseUrl || !serviceKey) {
            console.error("[invite-new-client] supabase-env-missing", {
                hasUrl: Boolean(supabaseUrl),
                hasServiceKey: Boolean(serviceKey),
            });
            return new Response(
                JSON.stringify({ error: "supabase-env-missing" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // =====================================================
        // DELETE CONVITES PENDING ANTERIORES (MESMO EMAIL)
        // =====================================================

        console.log("[invite-new-client] cleanup-pending-start", {
            email,
        });

        // Busca client_ids pendentes com este email
        const searchPendingRes = await fetch(
            `${supabaseUrl}/rest/v1/api_tokens` +
            `?ml_email=eq.${encodeURIComponent(email)}` +
            `&status=eq.pending` +
            `&select=client_id`,
            {
                method: "GET",
                headers: {
                    "Accept-Profile": "dashboard",
                    "apikey": serviceKey,
                    "Authorization": `Bearer ${serviceKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (searchPendingRes.ok) {
            const pendingRecords = await searchPendingRes.json().catch(() => []);

            if (Array.isArray(pendingRecords) && pendingRecords.length > 0) {
                console.log("[invite-new-client] cleanup-pending-found", {
                    email,
                    count: pendingRecords.length,
                });

                // Delete em clients (cascateia para api_tokens via FK)
                for (const record of pendingRecords) {
                    await fetch(
                        `${supabaseUrl}/rest/v1/clients?client_id=eq.${record.client_id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Profile": "dashboard",
                                "apikey": serviceKey,
                                "Authorization": `Bearer ${serviceKey}`,
                            },
                        }
                    );
                }

                console.log("[invite-new-client] cleanup-pending-complete", {
                    email,
                    deleted: pendingRecords.length,
                });
            }
        }

        // =====================================================
        // INSERT EM CLIENTS (PRIMEIRO - OBRIGATÓRIO)
        // =====================================================

        console.log("[invite-new-client] insert-clients-start", {
            client_id,
            email,
        });

        const insertClientsResponse = await fetch(
            `${supabaseUrl}/rest/v1/clients`,
            {
                method: "POST",
                headers: {
                    "apikey": serviceKey,
                    "Authorization": `Bearer ${serviceKey}`,
                    "Content-Type": "application/json",
                    "Content-Profile": "dashboard",
                    "Prefer": "return=minimal",
                },
                body: JSON.stringify({
                    client_id,
                    user_id: BigInt("0x" + client_id.replace(/-/g, "").slice(0, 16)),
                    display_name: email,
                    tipo_cliente: "externo",
                    status: "inactive",
                }),
            }
        );

        if (!insertClientsResponse.ok) {
            const errorText = await insertClientsResponse.text().catch(() => null);

            console.error("[invite-new-client] insert-clients-failed", {
                client_id,
                email,
                status: insertClientsResponse.status,
                response: errorText,
            });

            return new Response(
                JSON.stringify({ error: "insert-clients-failed" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        console.log("[invite-new-client] insert-clients-success", {
            client_id,
            email,
        });

        // =====================================================
        // INSERT EM API_TOKENS (DEPOIS - DEPENDE DE CLIENTS)
        // =====================================================

        console.log("[invite-new-client] insert-api_tokens-start", {
            client_id,
            email,
        });

        const insertResponse = await fetch(
            `${supabaseUrl}/rest/v1/api_tokens`,
            {
                method: "POST",
                headers: {
                    "apikey": serviceKey,
                    "Authorization": `Bearer ${serviceKey}`,
                    "Content-Type": "application/json",
                    "Content-Profile": "dashboard",
                    "Prefer": "return=minimal",
                },
                body: JSON.stringify({
                    client_id,
                    platform: "mercado_livre",
                    status: "pending",
                    ml_email: email,
                }),
            }
        );

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text().catch(() => null);

            console.error("[invite-new-client] insert-api_tokens-failed", {
                client_id,
                email,
                status: insertResponse.status,
                response: errorText,
            });

            return new Response(
                JSON.stringify({ error: "insert-api_tokens-failed" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        console.log("[invite-new-client] insert-api_tokens-success", {
            client_id,
            email,
        });

        // =====================================================
        // 4.6) AÇÃO PRINCIPAL — INVITE NEW CLIENT
        // =====================================================

        console.log("[invite-new-client] action-start", {
            email,
        });

        // =====================================================
        // 4.6.1) GERA LINK OAUTH MERCADO LIVRE
        // =====================================================

        const ML_OAUTH_CLIENT_ID = Deno.env.get("ML_APP_ID");
        const ML_OAUTH_REDIRECT_URI = "https://cbnisuoocsrhdqdpmips.supabase.co/functions/v1/ml_oauth_callback";

        if (!ML_OAUTH_CLIENT_ID || !ML_OAUTH_REDIRECT_URI) {
            console.error("[invite-new-client] ml-oauth-env-missing", {
                hasClientId: Boolean(ML_OAUTH_CLIENT_ID),
                hasRedirectUri: Boolean(ML_OAUTH_REDIRECT_URI),
                client_id,
            });

            return new Response(
                JSON.stringify({ error: "ml-oauth-env-missing" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        const oauthUrl =
            `https://auth.mercadolivre.com.br/authorization` +
            `?response_type=code` +
            `&client_id=${encodeURIComponent(ML_OAUTH_CLIENT_ID)}` +
            `&redirect_uri=${encodeURIComponent(ML_OAUTH_REDIRECT_URI)}` +
            `&state=${encodeURIComponent(client_id)}`;

        console.log("[invite-new-client] oauth-url-generated", {
            client_id,
            redirect_uri: ML_OAUTH_REDIRECT_URI,
        });


        // =====================================================
        // 4.6.2) MONTA EMAIL DE CONVITE (COM OAUTH)
        // =====================================================

        const emailBody = `
Você foi convidado(a) para acessar o Dashboard Viang.

Para concluir o cadastro e conectar sua conta do Mercado Livre,
clique no link abaixo e aceite as permissões solicitadas:

${oauthUrl}

Se você não reconhece este convite, pode ignorar esta mensagem.
`.trim();

        console.log("[invite-new-client] email-body-ready", {
            client_id,
            email,
        });


        // =====================================================
        // 4.6.3) ENVIO DE EMAIL VIA RESEND
        // =====================================================

        console.log("[invite-new-client] resend-send-start", {
            client_id,
            email,
        });

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
                    from: "Viang <no-reply@painel.viang.com.br>",
                    to: [email],
                    subject: "Convite para acessar o Dashboard Viang",
                    text: emailBody,
                }),
                signal: controller.signal,
            });
        } finally {
            clearTimeout(timeoutId);
        }

        const resendJson = await resendRes.json().catch(() => null);

        if (!resendRes.ok) {
            console.error("[invite-new-client] resend-failed", {
                client_id,
                email,
                status: resendRes.status,
                response: resendJson,
            });

            return new Response(
                JSON.stringify({
                    error: "resend-failed",
                    status: resendRes.status,
                }),
                {
                    status: 502,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        console.log("[invite-new-client] resend-send-success", {
            client_id,
            email,
        });

        // =====================================================
        // 4.7) RESPONSE DE SUCESSO
        // =====================================================

        console.log("[invite-new-client] success", {
            client_id,
            email,
            status: "pending",
        });

        return new Response(
            JSON.stringify({
                client_id,
                email,
                status: "pending",
            }),
            {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );

    } catch (err) {
        // =====================================================
        // 4.8) RESPONSE DE ERRO (CONTRATO DO FRONT)
        // =====================================================

        console.error("[invite-new-client] unhandled-error", {
            message: err instanceof Error ? err.message : String(err),
            stack: err instanceof Error ? err.stack : undefined,
        });

        return new Response(
            JSON.stringify({
                detail: err instanceof Error ? err.message : String(err),
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});

// =====================================================
// 5) TRATAMENTO DE ERRO (CONTRATO DO FRONT)
// =====================================================

// O tratamento de erro desta edge é realizado
// diretamente dentro do handler (bloco 4),
// seguindo o padrão das edges TIPO C:
//
// - status HTTP != 200 em falha
// - payload JSON com campo `detail`
// - headers CORS preservados
//
// Não existe handler de erro separado neste padrão.
