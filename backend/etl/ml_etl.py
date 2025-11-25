"""
ETL Mercado Livre – Dashboard Viang (MVP)
-----------------------------------------
Fluxo:
1. Buscar tokens ativos do Supabase
2. Coletar dados do ML (orders + items + metrics básicas)
3. Registrar eventos brutos em raw_events
4. Processar fact_sku_day
5. Agregar para agg_client_day
6. Gravar logs em updates_log
"""

import os
import json
import requests
from datetime import datetime, timedelta
from supabase import create_client, Client

# ----------------------------------------------------
# Inicialização – Supabase
# ----------------------------------------------------

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# ----------------------------------------------------
# 1. Ler tokens ativos do Supabase
# ----------------------------------------------------

def get_active_ml_tokens():
    response = supabase.table("api_tokens") \
        .select("*") \
        .eq("platform", "mercado_livre") \
        .eq("status", "active") \
        .execute()

    tokens = response.data
    print(f"🔍 Tokens ativos encontrados: {len(tokens)}")
    return tokens


# ----------------------------------------------------
# 2. Funções auxiliares – chamar API ML
# ----------------------------------------------------

def ml_get(endpoint, access_token):
    url = f"https://api.mercadolibre.com{endpoint}"
    headers = {"Authorization": f"Bearer {access_token}"}
    r = requests.get(url, headers=headers, timeout=20)
    r.raise_for_status()
    return r.json()


# ----------------------------------------------------
# 3. Registrar evento bruto no raw_events
# ----------------------------------------------------

def log_raw_event(client_id, origem_api, event_type, payload):
    supabase.table("raw_events").insert({
        "client_id": client_id,
        "origem_api": origem_api,
        "event_type": event_type,
        "payload": payload,
        "received_at": datetime.utcnow().isoformat()
    }).execute()


# ----------------------------------------------------
# 4. Processar raw_events → fact_sku_day (MVP)
# ----------------------------------------------------

def process_raw_events_to_fact():
    print("📦 Processando raw_events → fact_sku_day...")

    # pegar eventos ML ainda não processados (MVP simplificado)
    rows = supabase.table("raw_events").select("*").eq("origem_api", "mercado_livre").execute().data

    fact_rows = []
    for ev in rows:
        payload = ev["payload"]

        # MVP: pegar apenas itens com SKU, preço e quantidade
        # (modelagem real será feita na Fase 2)
        if "order_items" not in payload:
            continue

        for item in payload["order_items"]:
            fact_rows.append({
                "id": None,
                "client_id": ev["client_id"],
                "data": payload.get("date_created", None)[:10] if payload.get("date_created") else None,
                "sku": str(item.get("item", {}).get("id", "")),
                "origem_api": "mercado_livre",
                "item_id": str(item.get("item", {}).get("id", "")),
                "quantidade_vendida": item.get("quantity", 0),
                "receita_liquida": float(item.get("unit_price", 0)),
                "lucro": None,  # será preenchido no processamento futuro
                "margem": None,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            })

    if fact_rows:
        supabase.table("fact_sku_day").insert(fact_rows).execute()

    print(f"✔ fact_sku_day atualizado ({len(fact_rows)} linhas novas)")


# ----------------------------------------------------
# 5. Agregar fact_sku_day → agg_client_day
# ----------------------------------------------------

def aggregate_daily():
    print("📊 Agregando fact_sku_day → agg_client_day...")

    sql = """
    insert into dashboard.agg_client_day
    (id, client_id, data, total_receita, total_lucro, margem_media, total_vendas, created_at, updated_at)
    select
        gen_random_uuid(),
        client_id,
        data,
        sum(receita_liquida),
        sum(lucro),
        avg(margem),
        sum(quantidade_vendida),
        now(), now()
    from dashboard.fact_sku_day
    group by client_id, data;
    """

    supabase.postgrest.rpc("exec_sql", {"sql": sql}).execute()

    print("✔ Aggregação concluída")


# ----------------------------------------------------
# 6. Registrar log final no updates_log
# ----------------------------------------------------

def register_log(status, notes):
    supabase.table("updates_log").insert({
        "id": None,
        "job_name": "etl_mercado_livre",
        "status": status,
        "event": "etl_mvp_ml",
        "details": notes,
        "duration_ms": None,
        "platform": "mercado_livre",
        "started_at": datetime.utcnow().isoformat(),
        "finished_at": datetime.utcnow().isoformat(),
        "notes": notes
    }).execute()


# ----------------------------------------------------
# Função principal
# ----------------------------------------------------

def main():
    print("🚀 ETL Mercado Livre – INICIADO")

    try:
        tokens = get_active_ml_tokens()

        for t in tokens:
            client_id = t["client_id"]
            access_token = t["access_token"]

            # 1) puxar orders do ML (últimos 3 dias - MVP)
            orders = ml_get("/orders/search?seller_id=" + t["user_id"], access_token)
            log_raw_event(client_id, "mercado_livre", "orders", orders)

            print(f"📥 Cliente {client_id}: {len(orders.get('results', []))} pedidos coletados")

        # 2) processar → fact
        process_raw_events_to_fact()

        # 3) agregar → agg
        aggregate_daily()

        # 4) log
        register_log("success", {"msg": "ETL ML concluído com sucesso"})

        print("✅ ETL Mercado Livre – FINALIZADO")

    except Exception as e:
        print("❌ ERRO no ETL:", e)
        register_log("error", {"msg": str(e)})


if __name__ == "__main__":
    main()
