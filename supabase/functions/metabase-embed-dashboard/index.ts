import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { create, getNumericDate } from 'https://deno.land/x/djwt@v2.8/mod.ts'

const METABASE_SITE_URL = 'https://metabase-production-21b7.up.railway.app'
const METABASE_SECRET_KEY = Deno.env.get('METABASE_EMBED_SECRET_KEY')

if (!METABASE_SECRET_KEY) {
    throw new Error('METABASE_EMBED_SECRET_KEY missing')
}

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

serve(async (req) => {
    // Preflight CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        if (req.method !== 'POST') {
            return new Response('Method Not Allowed', {
                status: 405,
                headers: corsHeaders
            })
        }

        // (por enquanto) sem params, só validar pipeline fim-a-fim
        const payload = {
            resource: { dashboard: 9 },
            params: {},
            exp: getNumericDate(60 * 60 * 24) // 24 horas
        }

        // djwt v2.8 no edge runtime: use CryptoKey (não Uint8Array)
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode(METABASE_SECRET_KEY),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        )

        const token = await create({ alg: 'HS256', typ: 'JWT' }, payload, cryptoKey)

        const embedUrl =
            `${METABASE_SITE_URL}/embed/dashboard/${token}` +
            `#bordered=false&titled=false`

        return new Response(JSON.stringify({ embed_url: embedUrl }), {
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.error('Erro ao gerar embed:', err)

        return new Response(JSON.stringify({ error: 'Erro interno ao gerar embed' }), {
            status: 500,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            }
        })
    }
})
