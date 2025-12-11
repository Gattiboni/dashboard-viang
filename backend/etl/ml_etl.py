"""
ETL Mercado Livre – Dashboard Viang (Robusto • Refresh • Skip inválidos)
------------------------------------------------------------------------
Fluxo:
1. Buscar tokens ativos
2. Atualizar perfil do vendedor (users/{id})
3. Tentar refresh automático em caso de 401
4. Em último caso, pular cliente inválido e seguir com os demais
5. Buscar pedidos
6. Registrar raw
7. Processar fact
8. Agregar
9. Log final detalhado
"""

import os
import json
import requests
from datetime import datetime, timedelta, timezone

import psycopg2
from psycopg2.extras import Json

from dotenv import load_dotenv

load_dotenv()


# ----------------------------------------------------
# Helpers de log
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

        # Agora fazer o update corretamente
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
# 4. raw → fact
# ----------------------------------------------------


def process_raw_events_to_fact(conn):
    log_info("Processando raw_events → fact_sku_day...")

    with conn.cursor() as cur:
        cur.execute(
            """
            select id, client_id, payload
            from dashboard.raw_events
            where origem_api='mercado_livre'
              and event_type='orders'
            """
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
        return

    with conn.cursor() as cur:
        cur.executemany(
            """
            insert into dashboard.fact_sku_day 
            (client_id,data,sku,origem_api,item_id,quantidade_vendida,receita_liquida)
            values (%s,%s,%s,%s,%s,%s,%s)
            """,
            fact_rows,
        )

    log_info(f"fact_sku_day atualizado ({len(fact_rows)} linhas novas)")


# ----------------------------------------------------
# 5. agregação diária
# ----------------------------------------------------


def aggregate_daily(conn):
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
            group by client_id, data
            """
        )

    log_info("agg_client_day atualizado.")


# ----------------------------------------------------
# 6. Registro final
# ----------------------------------------------------


def register_log(conn, status, details):
    with conn.cursor() as cur:
        cur.execute(
            """
            insert into dashboard.updates_log (
                job_name,status,event,details,platform,
                started_at,finished_at,notes
            )
            values (%s,%s,%s,%s,%s,now(),now(),%s)
            """,
            (
                "etl_mercado_livre",
                status,
                "etl_mvp_ml",
                Json(details),
                "mercado_livre",
                Json(details),
            ),
        )


# ----------------------------------------------------
# 7. MAIN
# ----------------------------------------------------


def main():
    log_info("ETL Mercado Livre – INICIADO")
    started = datetime.now(timezone.utc).isoformat()

    conn = None
    try:
        conn = get_pg_conn()

        with conn.cursor() as cur:
            cur.execute(
                "select count(*) from dashboard.api_tokens where platform='mercado_livre';"
            )
            total = cur.fetchone()[0]
            log_info(f"Tokens ML encontrados na base: {total}")

        tokens = get_active_ml_tokens(conn)
        if not tokens:
            msg = "Nenhum token ML ativo."
            log_warn(msg)
            register_log(conn, "warning", {"msg": msg})
            return

        date_from = (
            datetime.now(timezone.utc).date() - timedelta(days=7)
        ).isoformat() + "T00:00:00.000-00:00"

        total_orders = 0
        clientes_processados = 0
        clientes_pulados = []

        for tok in tokens:
            try:
                client_id = tok["client_id"]
                access = tok["access_token"]
                refresh = tok["refresh_token"]
                user_id = tok["user_id"]

                log_info(f"--- CLIENTE {client_id} ---")

                # todo o processamento do cliente permanece exatamente como está no seu arquivo atual

            except Exception as e:
                log_error(f"Erro inesperado ao processar cliente {client_id}: {e}")
                continue

            # 1) atualizar perfil ML
            try:
                update_ml_user_info(conn, client_id, user_id, access)
            except Exception as e:
                log_warn(f"Falha ao atualizar perfil ML → {e}")

            # 2) buscar pedidos (FIX 401 – formato confirmado pela Sara)
            try:
                orders_url = "https://api.mercadolibre.com/orders/search"
                params = {
                    "seller": user_id,  # formato que FUNCIONA
                    "order.status": "paid",  # usado nos testes bem-sucedidos
                    "sort": "date_desc",
                    "access_token": access,  # redundância necessária (ML ainda aceita)
                }

                headers = {
                    "Authorization": f"Bearer {access}"  # mantém a forma oficial
                }

                resp = requests.get(
                    orders_url, headers=headers, params=params, timeout=30
                )

                if resp.status_code != 200:
                    raise requests.HTTPError(response=resp)

                orders = resp.json()

            except requests.HTTPError as e:
                if e.response is not None and e.response.status_code == 401:
                    log_warn(
                        f"401 em pedidos para client_id={client_id} → tentando refresh"
                    )

                    new_access = refresh_ml_token(conn, client_id, refresh)
                    if not new_access:
                        log_warn(f"Cliente {client_id} pulado (refresh falhou)")
                        clientes_pulados.append(str(client_id))
                        continue

                    # tentar novamente com token renovado
                    params["access_token"] = new_access
                    headers["Authorization"] = f"Bearer {new_access}"

                    resp2 = requests.get(
                        orders_url, headers=headers, params=params, timeout=30
                    )

                    if resp2.status_code != 200:
                        log_warn(f"Mesmo após refresh → client_id {client_id} pulado")
                        clientes_pulados.append(str(client_id))
                        continue

                    orders = resp2.json()
                else:
                    log_warn(f"Erro ao buscar pedidos client_id={client_id}: {e}")
                    clientes_pulados.append(str(client_id))
                    continue

            # registrar e contabilizar
            results = orders.get("results", []) or []
            total_orders += len(results)
            clientes_processados += 1

            log_raw_event(conn, client_id, "mercado_livre", "orders", orders)
            log_info(f"{len(results)} pedidos salvos para client_id={client_id}")

        # processar e agregar
        process_raw_events_to_fact(conn)
        aggregate_daily(conn)

        # finalizar
        details = {
            "msg": "Concluído (robusto)",
            "started_at": started,
            "clientes_processados": clientes_processados,
            "clientes_pulados": clientes_pulados,
            "total_pedidos": total_orders,
        }

        register_log(conn, "success", details)
        log_info("ETL ML Finalizado com sucesso.")

    except Exception as e:
        log_error(f"Erro crítico: {e}")
        if conn:
            register_log(conn, "error", {"msg": str(e)})
    finally:
        if conn:
            conn.close()
            log_info("Conexão encerrada.")


if __name__ == "__main__":
    main()
