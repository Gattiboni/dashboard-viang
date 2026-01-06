"""
Backfill Mercado Livre – Dashboard Viang (30 dias)
--------------------------------------------------
Objetivo:
- Reprocessar histórico de 30 dias para clientes existentes
- Popular:
  1) dashboard.raw_events (origem_api='mercado_livre', event_type='orders')
  2) dashboard.fact_sku_day
  3) dashboard.agg_client_day

Regras:
- Mantém o "jeito que funciona" do ETL diário (headers + querystring + refresh).
- Logs detalhados (log = vida fácil).
- Delete por janela de 30 dias ANTES de inserir (para evitar duplicação).
"""

import os
import requests
from datetime import datetime, timedelta, timezone, date

import psycopg2
from psycopg2.extras import Json

from dotenv import load_dotenv

load_dotenv()


# ----------------------------------------------------
# Helpers de log (mesmo padrão do ETL atual)
# ----------------------------------------------------


def log_info(msg: str) -> None:
    print(f"[INFO] {msg}")


def log_warn(msg: str) -> None:
    print(f"[WARN] {msg}")


def log_error(msg: str) -> None:
    print(f"[ERROR] {msg}")


# ----------------------------------------------------
# Conexão com Postgres
# ----------------------------------------------------


def get_pg_conn():
    dsn = os.getenv("SUPABASE_DB_CONNECTION_STRING")
    if not dsn:
        raise RuntimeError("SUPABASE_DB_CONNECTION_STRING não encontrada no .env")
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    return conn


# ----------------------------------------------------
# 1. Ler tokens ativos ML
# ----------------------------------------------------


def get_active_ml_tokens(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            select 
                client_id,
                access_token,
                refresh_token,
                user_id,
                expires_at
            from dashboard.api_tokens
            where platform = 'mercado_livre'
              and status = 'active'
            """
        )
        rows = cur.fetchall()

    tokens = [
        {
            "client_id": r[0],
            "access_token": r[1],
            "refresh_token": r[2],
            "user_id": r[3],
            "expires_at": r[4],
        }
        for r in rows
    ]

    log_info(f"Tokens ativos ML encontrados: {len(tokens)}")
    return tokens


# ----------------------------------------------------
# 2. GET genérico do Mercado Livre
# ----------------------------------------------------


def ml_get(endpoint: str, access_token: str) -> dict:
    base_url = "https://api.mercadolibre.com"
    url = f"{base_url}{endpoint}"
    headers = {"Authorization": f"Bearer {access_token}"}
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    return resp.json()


# ----------------------------------------------------
# 2.1 Obter dados completos do vendedor ML
# ----------------------------------------------------


def ml_get_user_full(user_id: str, access_token: str) -> dict:
    try:
        data = ml_get(f"/users/{user_id}?access_token={access_token}", access_token)
        seller = data.get("seller_reputation", {}) or {}
        trans = seller.get("transactions", {}) or {}
        phone = data.get("phone", {}) or {}

        return {
            "ml_nickname": data.get("nickname"),
            "ml_first_name": data.get("first_name"),
            "ml_last_name": data.get("last_name"),
            "ml_email": data.get("email"),
            "ml_phone": phone.get("number"),
            "ml_seller_status": seller.get("level_id"),
            "ml_points": trans.get("completed"),
            "ml_site_id": data.get("site_id"),
            "ml_perma_link": data.get("permalink"),
            "ml_logo": data.get("logo"),
        }

    except Exception as e:
        log_warn(f"Falha ao buscar user ML {user_id}: {e}")
        return {}


# ----------------------------------------------------
# 2.2 Atualizar api_tokens com dados ML
# ----------------------------------------------------


def update_ml_user_info(conn, client_id, user_id, access_token):
    data = ml_get_user_full(str(user_id), access_token)
    if not data:
        log_warn(f"Nenhum dado de usuário retornado para client_id={client_id}")
        return

    with conn.cursor() as cur:
        cur.execute(
            """
            update dashboard.api_tokens
            set
                ml_nickname      = %(ml_nickname)s,
                ml_first_name    = %(ml_first_name)s,
                ml_last_name     = %(ml_last_name)s,
                ml_email         = %(ml_email)s,
                ml_phone         = %(ml_phone)s,
                ml_seller_status = %(ml_seller_status)s,
                ml_points        = %(ml_points)s,
                ml_site_id       = %(ml_site_id)s,
                ml_perma_link    = %(ml_perma_link)s,
                ml_logo          = %(ml_logo)s,
                updated_at       = now()
            where client_id = %(client_id)s
              and platform = 'mercado_livre'
            """,
            {**data, "client_id": client_id},
        )

    log_info(f"Perfil ML atualizado para client_id={client_id}")


# ----------------------------------------------------
# 2.3 Tentar refresh do token ML
# ----------------------------------------------------


def refresh_ml_token(conn, client_id, refresh_token):
    """
    Retorna novo access_token OU None.
    Atualiza no Supabase se funcionar.
    """
    try:
        url = "https://api.mercadolibre.com/oauth/token"
        payload = {
            "grant_type": "refresh_token",
            "client_id": os.getenv("ML_APP_ID"),
            "client_secret": os.getenv("ML_APP_SECRET"),
            "refresh_token": refresh_token,
        }

        resp = requests.post(url, data=payload, timeout=30)
        if resp.status_code != 200:
            log_warn(f"Refresh ML falhou para client_id={client_id}: {resp.text}")
            return None

        data = resp.json()
        new_access = data.get("access_token")
        new_refresh = data.get("refresh_token")  # Pode vir null
        expires_in = data.get("expires_in")

        # Buscar o refresh_token atual se o novo vier null
        if not new_refresh:
            log_warn(
                f"ML devolveu refresh_token NULL para client_id={client_id}. Mantendo o antigo."
            )
            with conn.cursor() as cur:
                cur.execute(
                    """
                    select refresh_token 
                    from dashboard.api_tokens
                    where client_id = %s
                      and platform = 'mercado_livre'
                    """,
                    (client_id,),
                )
                current_refresh = cur.fetchone()[0]
            new_refresh = current_refresh

        with conn.cursor() as cur:
            cur.execute(
                """
                update dashboard.api_tokens
                set 
                    access_token = %s,
                    refresh_token = %s,
                    expires_at = now() + (%s || ' seconds')::interval,
                    updated_at = now()
                where client_id = %s
                  and platform = 'mercado_livre'
                """,
                (new_access, new_refresh, expires_in, client_id),
            )

        log_info(f"Refresh ML OK → client_id={client_id}")
        return new_access

    except Exception as e:
        log_warn(f"Erro no refresh ML para client_id={client_id}: {e}")
        return None


# ----------------------------------------------------
# 3. Registrar raw_events
# ----------------------------------------------------


def log_raw_event(conn, client_id, origem_api, event_type, payload):
    with conn.cursor() as cur:
        cur.execute(
            """
            insert into dashboard.raw_events (client_id, origem_api, event_type, payload, received_at)
            values (%s, %s, %s, %s, now())
            """,
            (client_id, origem_api, event_type, Json(payload)),
        )


# ----------------------------------------------------
# 3.1 Limpeza da janela (30 dias)
# ----------------------------------------------------


def delete_window(conn, start_date: date):
    """
    Deleta janela de 30 dias (inclusive start_date) para as 3 tabelas base.
    raw_events não tem coluna data → usa received_at.
    """
    start_ts = datetime.combine(start_date, datetime.min.time(), tzinfo=timezone.utc)

    log_info(f"Delete janela (>= {start_date.isoformat()}) – INICIADO")

    with conn.cursor() as cur:
        # fact_sku_day
        cur.execute(
            """
            delete from dashboard.fact_sku_day
            where data >= %s
            """,
            (start_date,),
        )

        # agg_client_day
        cur.execute(
            """
            delete from dashboard.agg_client_day
            where data >= %s
            """,
            (start_date,),
        )

        # raw_events (mercado_livre)
        cur.execute(
            """
            delete from dashboard.raw_events
            where origem_api = 'mercado_livre'
              and received_at >= %s
            """,
            (start_ts,),
        )

    log_info("Delete janela – OK")


# ----------------------------------------------------
# 4. Coleta orders/search por dia (paginada)
# ----------------------------------------------------


def fetch_orders_for_day(user_id, access_token, day: date) -> list[dict]:
    """
    Busca pedidos pagos do seller num dia específico, paginando.
    Mantém padrão do ETL atual (Authorization + access_token redundante em params).

    Observação:
    - Mercado Livre retorna paging (offset/limit/total) em geral.
    - Filtros por janela usam parâmetros "order.date_created.from/to".
    """
    orders_url = "https://api.mercadolibre.com/orders/search"

    day_start = datetime(day.year, day.month, day.day, 0, 0, 0, tzinfo=timezone.utc)
    day_end = day_start + timedelta(days=1)

    # formato ISO com offset
    day_start_s = day_start.isoformat().replace("+00:00", "Z")
    day_end_s = day_end.isoformat().replace("+00:00", "Z")

    headers = {"Authorization": f"Bearer {access_token}"}

    limit = 50
    offset = 0
    pages = []

    while True:
        params = {
            "seller": user_id,  # formato que FUNCIONA
            "order.status": "paid",
            "sort": "date_desc",
            "access_token": access_token,  # redundância necessária (ML ainda aceita)
            "limit": limit,
            "offset": offset,
            "order.date_created.from": day_start_s,
            "order.date_created.to": day_end_s,
        }

        resp = requests.get(orders_url, headers=headers, params=params, timeout=30)

        if resp.status_code != 200:
            raise requests.HTTPError(response=resp)

        payload = resp.json()
        pages.append(payload)

        paging = payload.get("paging", {}) or {}
        total = int(paging.get("total", 0) or 0)
        got = offset + limit

        if got >= total:
            break

        offset += limit

    return pages


# ----------------------------------------------------
# 5. raw → fact (somente raw inserido nesta execução)
# ----------------------------------------------------


def process_raw_events_to_fact(conn, started_ts: datetime):
    log_info("Processando raw_events (execução atual) → fact_sku_day...")

    with conn.cursor() as cur:
        cur.execute(
            """
            select id, client_id, payload
            from dashboard.raw_events
            where origem_api='mercado_livre'
              and event_type='orders'
              and received_at >= %s
            """,
            (started_ts,),
        )
        rows = cur.fetchall()

    fact_rows = []

    for _, client_id, payload in rows:
        for order in payload.get("results", []) or []:
            date_created = order.get("date_created")
            data = date_created[:10] if date_created else None

            for item in order.get("order_items", []) or []:
                info = item.get("item", {}) or {}
                sku = str(info.get("id", "")) or None
                qty = item.get("quantity", 0) or 0
                price = float(item.get("unit_price", 0) or 0)
                receita = qty * price

                fact_rows.append(
                    (client_id, data, sku, "mercado_livre", sku, qty, receita)
                )

    if not fact_rows:
        log_warn("Nenhuma linha gerada para fact_sku_day.")
        return 0

    with conn.cursor() as cur:
        cur.executemany(
            """
            insert into dashboard.fact_sku_day 
            (client_id, data, sku, origem_api, item_id, quantidade_vendida, receita_liquida)
            values (%s, %s, %s, %s, %s, %s, %s)
            """,
            fact_rows,
        )

    log_info(f"fact_sku_day atualizado ({len(fact_rows)} linhas)")
    return len(fact_rows)


# ----------------------------------------------------
# 6. agregação diária (somente janela já limpa)
# ----------------------------------------------------


def aggregate_daily(conn, start_date: date):
    log_info("Agregando fact_sku_day → agg_client_day...")

    with conn.cursor() as cur:
        cur.execute(
            """
            insert into dashboard.agg_client_day (
                id, client_id, data, total_receita, total_lucro,
                margem_media, total_vendas, created_at, updated_at
            )
            select
                gen_random_uuid(), client_id, data,
                sum(receita_liquida),
                sum(coalesce(lucro,0)),
                avg(margem),
                sum(quantidade_vendida),
                now(),
                now()
            from dashboard.fact_sku_day
            where data >= %s
            group by client_id, data
            """,
            (start_date,),
        )

    log_info("agg_client_day atualizado.")


# ----------------------------------------------------
# 7. Registro final (updates_log)
# ----------------------------------------------------


def register_log(conn, status, details):
    with conn.cursor() as cur:
        cur.execute(
            """
            insert into dashboard.updates_log (
                job_name, status, event, details, platform,
                started_at, finished_at, notes
            )
            values (%s, %s, %s, %s, %s, now(), now(), %s)
            """,
            (
                "etl_mercado_livre_backfill",
                status,
                "backfill_ml_30d",
                Json(details),
                "mercado_livre",
                Json(details),
            ),
        )


# ----------------------------------------------------
# 8. MAIN
# ----------------------------------------------------


def main():
    log_info("BACKFILL Mercado Livre (90 dias) – INICIADO")

    started_ts = datetime.now(timezone.utc)
    today = datetime.now(timezone.utc).date()
    start_date = today - timedelta(days=89)  # janela 90 dias (inclusive)

    conn = None
    try:
        conn = get_pg_conn()

        tokens = get_active_ml_tokens(conn)
        if not tokens:
            msg = "Nenhum token ML ativo."
            log_warn(msg)
            register_log(conn, "warning", {"msg": msg})
            return

        # 1) Limpa janela (90 dias)
        delete_window(conn, start_date)

        total_pages = 0
        total_orders = 0
        clientes_processados = 0
        clientes_pulados = []

        # 2) Coleta por cliente e por dia
        for tok in tokens:
            client_id = tok["client_id"]
            access = tok["access_token"]
            refresh = tok["refresh_token"]
            user_id = tok["user_id"]

            log_info(f"--- CLIENTE {client_id} (seller {user_id}) ---")

            # Atualiza perfil ML (igual ETL)
            try:
                update_ml_user_info(conn, client_id, user_id, access)
            except Exception as e:
                log_warn(f"Falha ao atualizar perfil ML → {e}")

            ok = True

            day = start_date
            while day <= today:
                try:
                    pages = fetch_orders_for_day(user_id, access, day)
                    for p in pages:
                        results = p.get("results", []) or []
                        total_orders += len(results)
                        total_pages += 1
                        log_raw_event(conn, client_id, "mercado_livre", "orders", p)

                    log_info(
                        f"{day.isoformat()} → páginas={len(pages)} | pedidos={sum(len(p.get('results', []) or []) for p in pages)}"
                    )

                except requests.HTTPError as e:
                    # tenta refresh apenas nos 401
                    if e.response is not None and e.response.status_code == 401:
                        log_warn(
                            f"401 em backfill (day={day.isoformat()}) para client_id={client_id} → tentando refresh"
                        )
                        new_access = refresh_ml_token(conn, client_id, refresh)
                        if not new_access:
                            ok = False
                            break
                        access = new_access
                        continue

                    log_warn(
                        f"Erro HTTP no backfill (day={day.isoformat()}) client_id={client_id}: {getattr(e.response, 'text', str(e))}"
                    )
                    ok = False
                    break

                except Exception as e:
                    log_warn(
                        f"Erro inesperado no backfill (day={day.isoformat()}): {e}"
                    )
                    ok = False
                    break

                day = day + timedelta(days=1)

            if not ok:
                log_warn(f"Cliente {client_id} pulado (falha no backfill)")
                clientes_pulados.append(str(client_id))
                continue

            clientes_processados += 1

        # 3) raw → fact (só desta execução) e agregação
        fact_rows = process_raw_events_to_fact(conn, started_ts)
        aggregate_daily(conn, start_date)

        # 4) log final
        details = {
            "msg": "Backfill 90 dias concluído",
            "window_start": start_date.isoformat(),
            "window_end": today.isoformat(),
            "started_at": started_ts.isoformat(),
            "clientes_processados": clientes_processados,
            "clientes_pulados": clientes_pulados,
            "total_pages_raw": total_pages,
            "total_pedidos": total_orders,
            "fact_rows": fact_rows,
        }

        register_log(conn, "success", details)
        log_info("BACKFILL ML (90 dias) finalizado com sucesso.")

    except Exception as e:
        log_error(f"Erro crítico no backfill: {e}")
        if conn:
            register_log(conn, "error", {"msg": str(e)})
    finally:
        if conn:
            conn.close()
            log_info("Conexão encerrada.")


if __name__ == "__main__":
    main()
