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
      .from("api_tokens")
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

    // =====================================================
    // MARCA BACKFILL ONBOARDING COMO PENDENTE (updates_log)
    // =====================================================
    try {
      const { error: logError } = await supabase
        .from("updates_log")
        .insert({
          job_name: "ml_etl_backfill_onboarding",
          status: "info",
          event: "oauth_success",
          platform: "mercado_livre",
          details: { client_id: state },
          notes: { source: "ml_oauth_callback" },
        });

      if (logError) {
        console.error("Erro ao criar updates_log (backfill partial):", logError);
      }
    } catch (logEx) {
      console.error("Erro inesperado ao criar updates_log (backfill partial):", logEx);
    }

    // =====================================================
    // DISPARA ETL BACKFILL ONBOARDING (GITHUB ACTIONS)
    // =====================================================

    try {
      const githubToken = Deno.env.get("GITHUB_ACTIONS_TOKEN");

      if (!githubToken) {
        console.error("[ml_oauth_callback] github-token-missing");
      } else {
        const dispatchRes = await fetch(
          "https://api.github.com/repos/Gattiboni/dashboard-viang/actions/workflows/etl-backfill-onboarding.yml/dispatches",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${githubToken}`,
              "Accept": "application/vnd.github+json",
              "Content-Type": "application/json",
              "User-Agent": "viang-edge",
            },
            body: JSON.stringify({
              ref: "main",
            }),
          }
        );

        if (!dispatchRes.ok) {
          const text = await dispatchRes.text().catch(() => null);
          console.error("[ml_oauth_callback] github-dispatch-failed", {
            status: dispatchRes.status,
            response: text,
          });
        } else {
          console.log("[ml_oauth_callback] github-dispatch-success", {
            workflow: "etl-backfill-onboarding.yml",
            ref: "main",
          });
        }
      }
    } catch (dispatchErr) {
      console.error("[ml_oauth_callback] github-dispatch-unhandled-error", {
        message: dispatchErr instanceof Error
          ? dispatchErr.message
          : String(dispatchErr),
      });
    }

    try {
      // =====================================================
      // DIAGNÓSTICO — NÃO vaza valores, só lista keys
      // =====================================================
      const envObj = Deno.env.toObject();
      const envKeys = Object.keys(envObj);

      console.log("[ml_oauth_callback] env-diagnostic", {
        hasGithubActionsTokenKey: envKeys.includes("GITHUB_ACTIONS_TOKEN"),
        githubLikeKeys: envKeys.filter((k) => k.includes("GITHUB")),
        supabaseLikeKeys: envKeys.filter((k) => k.includes("SUPABASE")),
      });

      const githubToken = Deno.env.get("GITHUB_ACTIONS_TOKEN");

      if (!githubToken) {
        console.error("[ml_oauth_callback] github-token-missing");
      } else {
        const dispatchRes = await fetch(
          "https://api.github.com/repos/Gattiboni/dashboard-viang/actions/workflows/etl-backfill-onboarding.yml/dispatches",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${githubToken}`,
              "Accept": "application/vnd.github+json",
              "Content-Type": "application/json",
              "User-Agent": "viang-edge",
            },
            body: JSON.stringify({
              ref: "main",
            }),
          }
        );

        if (!dispatchRes.ok) {
          const text = await dispatchRes.text().catch(() => null);
          console.error("[ml_oauth_callback] github-dispatch-failed", {
            status: dispatchRes.status,
            response: text,
          });
        } else {
          console.log("[ml_oauth_callback] github-dispatch-success", {
            workflow: "etl-backfill-onboarding.yml",
            ref: "main",
          });
        }
      }
    } catch (dispatchErr) {
      console.error("[ml_oauth_callback] github-dispatch-unhandled-error", {
        message: dispatchErr instanceof Error
          ? dispatchErr.message
          : String(dispatchErr),
      });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: "https://gattiboni.github.io/dashboard-viang-public/",
      },
    });

  } catch (e) {
    console.error("Erro inesperado:", e);
    return new Response(
      "Erro inesperado ao finalizar autorização.",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }
});