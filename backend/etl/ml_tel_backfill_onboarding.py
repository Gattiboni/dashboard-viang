"""
Backfill Mercado Livre — Onboarding de Cliente
----------------------------------------------
Objetivo:
- Executar backfill automático (30 dias) para UM cliente recém-onboardado
- Popular:
  - dashboard.raw_events
  - dashboard.fact_sku_day
  - dashboard.agg_client_day

Premissas:
- Mesmo padrão do ETL diário (headers, bearer, refresh, etc)
- Mesmo modelo de logs
- Backfill é idempotente por cliente
"""

import os
import requests
from datetime import datetime, timedelta, timezone, date

import psycopg2
from psycopg2.extras import Json

from dotenv import load_dotenv

load_dotenv()


# ----------------------------------------------------
# Logs (mesmo padrão)
# ----------------------------------------------------


def log_info(msg):
    print(f"[INFO] {msg}")


def log_warn(msg):
    print(f"[WARN] {msg}")


def log_error(msg):
    print(f"[ERROR] {msg}")


# ----------------------------------------------------
# Conexão Supabase
# ----------------------------------------------------


def get_pg_conn():
    dsn = os.getenv("SUPABASE_DB_CONNECTION_STRING")
    if not dsn:
        raise RuntimeError("SUPABASE_DB_CONNECTION_STRING ausente")
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    return conn


# ----------------------------------------------------
# Token ML por cliente
# ----------------------------------------------------


def get_ml_token_for_client(conn, client_id):
    with conn.cursor() as cur:
        cur.execute(
            """
            select client_id, access_token, refresh_token, user_id
            from dashboard.api_tokens
            where platform='mercado_livre'
              and status='active'
              and client_id=%s
            """,
            (client_id,),
        )
        row = cur.fetchone()

    if not row:
        raise RuntimeError(f"Nenhum token ML ativo para client_id={client_id}")

    return {
        "client_id": row[0],
        "access_token": row[1],
        "refresh_token": row[2],
        "user_id": row[3],
    }


# ----------------------------------------------------
# Refresh token ML (igual ao ETL diário)
# ----------------------------------------------------


def refresh_ml_token(conn, client_id, refresh_token):
    try:
        resp = requests.post(
            "https://api.mercadolibre.com/oauth/token",
            data={
                "grant_type": "refresh_token",
                "client_id": os.getenv("ML_APP_ID"),
                "client_secret": os.getenv("ML_APP_SECRET"),
                "refresh_token": refresh_token,
            },
            timeout=30,
        )

        if resp.status_code != 200:
            return None

        data = resp.json()
        access = data.get("access_token")
        refresh = data.get("refresh_token") or refresh_token
        expires = data.get("expires_in")

        with conn.cursor() as cur:
            cur.execute(
                """
                update dashboard.api_tokens
                set access_token=%s,
                    refresh_token=%s,
                    expires_at=now() + (%s || ' seconds')::interval,
                    updated_at=now()
                where client_id=%s
                  and platform='mercado_livre'
                """,
                (access, refresh, expires, client_id),
            )

        return access

    except Exception:
        return None


# ----------------------------------------------------
# DELETE seguro por cliente (janela 30 dias)
# ----------------------------------------------------


def delete_window(conn, client_id, start_date):
    start_ts = datetime.combine(start_date, datetime.min.time(), tzinfo=timezone.utc)

    with conn.cursor() as cur:
        cur.execute(
            "delete from dashboard.fact_sku_day where client_id=%s and data>=%s",
            (client_id, start_date),
        )
        cur.execute(
            "delete from dashboard.agg_client_day where client_id=%s and data>=%s",
            (client_id, start_date),
        )
        cur.execute(
            """
            delete from dashboard.raw_events
            where client_id=%s
              and origem_api='mercadolivre'
              and received_at>=%s
            """,
            (client_id, start_ts),
        )

    log_info(f"Janela limpa para client_id={client_id}")


# ----------------------------------------------------
# Fetch orders por dia (padrão que FUNCIONA)
# ----------------------------------------------------


def fetch_orders_day(user_id, access_token, day):
    url = "https://api.mercadolibre.com/orders/search"
    headers = {"Authorization": f"Bearer {access_token}"}

    start = datetime(day.year, day.month, day.day, tzinfo=timezone.utc)
    end = start + timedelta(days=1)

    params_base = {
        "seller": user_id,
        "order.status": "paid",
        "sort": "date_desc",
        "access_token": access_token,
        "order.date_created.from": start.isoformat().replace("+00:00", "Z"),
        "order.date_created.to": end.isoformat().replace("+00:00", "Z"),
    }

    pages, offset = [], 0
    limit = 50

    while True:
        params = {**params_base, "limit": limit, "offset": offset}
        r = requests.get(url, headers=headers, params=params, timeout=30)
        r.raise_for_status()
        data = r.json()
        pages.append(data)

        total = data.get("paging", {}).get("total", 0)
        if offset + limit >= total:
            break
        offset += limit

    return pages


# ----------------------------------------------------
# MAIN
# ----------------------------------------------------


def run_backfill_for_client(client_id):
    log_info(f"BACKFILL onboarding iniciado → client_id={client_id}")

    conn = get_pg_conn()
    tok = get_ml_token_for_client(conn, client_id)

    today = datetime.now(timezone.utc).date()
    start_date = today - timedelta(days=29)
    started_ts = datetime.now(timezone.utc)

    delete_window(conn, client_id, start_date)

    access = tok["access_token"]
    refresh = tok["refresh_token"]
    user_id = tok["user_id"]

    day = start_date
    while day <= today:
        try:
            pages = fetch_orders_day(user_id, access, day)
            for p in pages:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        insert into dashboard.raw_events
                        (client_id, origem_api, event_type, payload, received_at)
                        values (%s,'mercadolivre','orders',%s,now())
                        """,
                        (client_id, Json(p)),
                    )

            log_info(f"{day} → pages={len(pages)}")

        except requests.HTTPError as e:
            if e.response.status_code == 401:
                access = refresh_ml_token(conn, client_id, refresh)
                if not access:
                    raise
                continue
            raise

        day += timedelta(days=1)

    log_info("raw_events preenchido")

    with conn.cursor() as cur:
        cur.execute(
            """
            insert into dashboard.fact_sku_day
            (client_id, data, sku, origem_api, quantidade_vendida, receita_liquida)
            select
                re.client_id,
                (o->>'date_created')::date,
                (i->'item'->>'id'),
                'mercadolivre',
                (i->>'quantity')::numeric,
                ((i->>'quantity')::numeric * (i->>'unit_price')::numeric)
            from dashboard.raw_events re,
                 jsonb_array_elements(re.payload->'results') o,
                 jsonb_array_elements(o->'order_items') i
            where re.client_id=%s
              and re.received_at>=%s
            """,
            (client_id, started_ts),
        )

    with conn.cursor() as cur:
        cur.execute(
            """
            insert into dashboard.agg_client_day
            (id, client_id, data, total_receita, total_vendas, created_at, updated_at)
            select
                gen_random_uuid(),
                client_id,
                data,
                sum(receita_liquida),
                sum(quantidade_vendida),
                now(),
                now()
            from dashboard.fact_sku_day
            where client_id=%s
              and data>=%s
            group by client_id, data
            """,
            (client_id, start_date),
        )

    log_info(f"BACKFILL onboarding finalizado → client_id={client_id}")
    conn.close()


# ----------------------------------------------------
# ENTRYPOINT
# ----------------------------------------------------

if __name__ == "__main__":
    CLIENT_ID = os.getenv("BACKFILL_CLIENT_ID")
    if not CLIENT_ID:
        raise RuntimeError("BACKFILL_CLIENT_ID não definido")

    run_backfill_for_client(CLIENT_ID)
