// supabase/functions/ml_oauth_callback/index.ts
/// <reference types="https://esm.sh/@supabase/functions-js/dist/edge-runtime.d.ts" />


import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Config Supabase
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  db: { schema: 'dashboard' }
});


// Config Mercado Livre
const mlAppId = Deno.env.get("ML_APP_ID")!;
const mlAppSecret = Deno.env.get("ML_APP_SECRET")!;

// Redirect URI da integração (tem que ser esta exata)
const redirectUri =
  "https://cbnisuoocsrhdqdpmips.supabase.co/functions/v1/ml_oauth_callback";

serve(async (req: Request): Promise<Response> => {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state"); // client_id

    if (!code || !state) {
      return new Response(
        `Erro na autorização do Mercado Livre.<br/>
         Parâmetros inválidos.<br/>
         code=${code} state=${state}`,
        { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    // Trocar code por token
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: mlAppId,
      client_secret: mlAppSecret,
      code,
      redirect_uri: redirectUri,
    });

    const tokenResp = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!tokenResp.ok) {
      const text = await tokenResp.text();
      console.error("Erro ao trocar code por token:", text);
      return new Response(
        `Erro ao finalizar integração com Mercado Livre.<br/>
         HTTP ${tokenResp.status}<br/>
         ${text}`,
        { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    const tokenData = await tokenResp.json() as any;

    const accessToken = tokenData.access_token as string;
    const refreshToken = tokenData.refresh_token as string;
    const expiresIn = Number(tokenData.expires_in ?? 0);
    const userId = String(tokenData.user_id ?? "");

    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    // Upsert no banco
    const { error } = await supabase
      .from("api_tokens", { schema: "dashboard" })
      .upsert(
        {
          client_id: state,
          platform: "mercado_livre",
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_at: expiresAt,
          status: "active",
          user_id: userId,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "client_id,platform" }
      );





    if (error) {
      console.error("Erro ao salvar tokens:", error);
      return new Response(
        `Tokens criados, mas erro ao salvar no banco.<br/>
         ${error.message}`,
        { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    }

    // Página amigável de sucesso
    const html = `
      <html>
      <head><meta charset="utf-8"><title>Integração Mercado Livre</title></head>
      <body style="font-family: system-ui; padding: 24px;">
        <h2>Integração concluída com sucesso ✅</h2>
        <p>Seus dados do Mercado Livre foram conectados ao Dashboard Viang.</p>
        <p>Você já pode fechar esta aba.</p>
      </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });

  } catch (e) {
    console.error("Erro inesperado:", e);
    return new Response(
      "Erro inesperado ao finalizar autorização.",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }
});
