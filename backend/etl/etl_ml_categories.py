"""
ETL Mercado Livre – Categorias (baseado em dados reais)
------------------------------------------------------
Fluxo:
1. Buscar category_id distintos já existentes no banco
2. Consultar API /categories/{id}
3. Popular dashboard.ml_categories
4. Log simples e confiável

Observação:
- NÃO usa /sites/MLB/categories (403)
- NÃO usa OAuth
"""

import os
import requests
from datetime import datetime, timezone

import psycopg2
from psycopg2.extras import execute_batch
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://api.mercadolibre.com"


# ----------------------------------------------------
# Helpers de log (IGUAL ao ETL diário)
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
        raise RuntimeError("SUPABASE_DB_CONNECTION_STRING não encontrada")
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    return conn


# ----------------------------------------------------
# 1. Buscar category_id reais do banco
# ----------------------------------------------------


def get_existing_category_ids(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            select distinct category_id
            from dashboard.vw_ml_order_items_flat
            where category_id is not null
        """
        )
        rows = cur.fetchall()

    ids = [r[0] for r in rows]
    log_info(f"Category IDs distintos encontrados: {len(ids)}")
    return ids


# ----------------------------------------------------
# 2. Consultar categoria no ML (endpoint validado)
# ----------------------------------------------------


def fetch_category(category_id: str) -> dict:
    url = f"{BASE_URL}/categories/{category_id}"
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    return resp.json()


def build_path(path_from_root):
    if not path_from_root:
        return None
    return " > ".join(p["name"] for p in path_from_root)


# ----------------------------------------------------
# 3. Coletar categorias reais
# ----------------------------------------------------


def collect_categories(conn):
    categories = []
    ids = get_existing_category_ids(conn)

    for cid in ids:
        try:
            data = fetch_category(cid)

            parent_id = None
            if data.get("path_from_root") and len(data["path_from_root"]) > 1:
                parent_id = data["path_from_root"][-2]["id"]

            categories.append(
                {
                    "category_id": data["id"],
                    "category_name": data["name"],
                    "parent_category_id": parent_id,
                    "category_path": build_path(data.get("path_from_root")),
                }
            )

        except Exception as e:
            log_warn(f"Falha ao buscar categoria {cid}: {e}")

    log_info(f"Categorias válidas coletadas: {len(categories)}")
    return categories


# ----------------------------------------------------
# 4. Upsert
# ----------------------------------------------------


def upsert_categories(conn, rows):
    sql = """
        insert into dashboard.ml_categories (
            category_id,
            category_name,
            parent_category_id,
            category_path,
            created_at,
            updated_at
        )
        values (
            %(category_id)s,
            %(category_name)s,
            %(parent_category_id)s,
            %(category_path)s,
            now(),
            now()
        )
        on conflict (category_id) do update
        set
            category_name = excluded.category_name,
            parent_category_id = excluded.parent_category_id,
            category_path = excluded.category_path,
            updated_at = now();
    """

    with conn.cursor() as cur:
        execute_batch(cur, sql, rows, page_size=100)

    log_info("Upsert em ml_categories concluído")


# ----------------------------------------------------
# 5. MAIN
# ----------------------------------------------------


def main():
    log_info("ETL Mercado Livre – Categorias INICIADO")
    started = datetime.now(timezone.utc)

    conn = None
    try:
        conn = get_pg_conn()

        categories = collect_categories(conn)
        if not categories:
            log_warn("Nenhuma categoria coletada.")
            return

        upsert_categories(conn, categories)

        duration = (datetime.now(timezone.utc) - started).total_seconds()
        log_info(f"ETL categorias finalizado com sucesso em {duration:.1f}s")

    except Exception as e:
        log_error(f"Erro crítico no ETL de categorias: {e}")
        raise
    finally:
        if conn:
            conn.close()
            log_info("Conexão encerrada.")


if __name__ == "__main__":
    main()
