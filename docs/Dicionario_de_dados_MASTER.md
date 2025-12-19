| # Data Dictionary Master — Dashboard Schema

## Sumário
- [agg_client_day](#agg_client_day)
- [api_tokens](#api_tokens)
- [clients](#clients)
- [etl_status_codes](#etl_status_codes)
- [fact_sku_day](#fact_sku_day)
- [insight_cache](#insight_cache)
- [ml_categories](#ml_categories)
- [raw_events](#raw_events)
- [updates_log](#updates_log)
- [users](#users)
- [vw_ads_metrics](#vw_ads_metrics)
- [vw_client_snapshot](#vw_client_snapshot)
- [vw_clientes](#vw_clientes)
- [vw_clientes_com_status](#vw_clientes_com_status)
- [vw_clientes_integracao](#vw_clientes_integracao)
- [vw_dashboard_overview_atual](#vw_dashboard_overview_atual)
- [vw_dashboard_overview_diario](#vw_dashboard_overview_diario)
- [vw_data_dictionary_markdown](#vw_data_dictionary_markdown)
- [vw_detalhes_sku](#vw_detalhes_sku)
- [vw_financeiro](#vw_financeiro)
- [vw_logs_etl](#vw_logs_etl)
- [vw_ml_category_day](#vw_ml_category_day)
- [vw_ml_category_day_enriched](#vw_ml_category_day_enriched)
- [vw_ml_client_day_enriched](#vw_ml_client_day_enriched)
- [vw_ml_order_items_flat](#vw_ml_order_items_flat)
- [vw_ml_orders_logistics_enriched](#vw_ml_orders_logistics_enriched)
- [vw_ml_top_skus](#vw_ml_top_skus)
- [vw_ml_viang_day](#vw_ml_viang_day)
- [vw_produto_performance](#vw_produto_performance)
- [vw_receita_semanal_por_cliente](#vw_receita_semanal_por_cliente)

---

## agg_client_day
**Propósito:** Tabela do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | NO | gen_random_uuid() | None |
| client_id | uuid | NO | None | None |
| data | date | NO | None | None |
| total_receita | numeric | YES | None | None |
| total_lucro | numeric | YES | None | None |
| margem_media | numeric | YES | None | None |
| total_vendas | numeric | YES | None | None |
| ticket_medio | numeric | YES | None | None |
| roas_medio | numeric | YES | None | None |
| cac_medio | numeric | YES | None | None |
| ltv_estimado | numeric | YES | None | None |
| estoque_total | numeric | YES | None | None |
| rupturas | integer | YES | None | None |
| reputacao_status | text | YES | None | None |
| reputacao_nivel | text | YES | None | None |
| gasto_ads | numeric | YES | None | None |
| impressoes | numeric | YES | None | None |
| cliques | numeric | YES | None | None |
| ctr_medio | numeric | YES | None | None |
| roas_ads | numeric | YES | None | None |
| raw | jsonb | YES | None | None |
| created_at | timestamp with time zone | YES | now() | None |
| updated_at | timestamp with time zone | YES | now() | None |

---

## api_tokens
**Propósito:** Tabela do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | NO | gen_random_uuid() | None |
| client_id | uuid | NO | None | None |
| platform | text | NO | None | None |
| access_token | text | YES | None | None |
| refresh_token | text | YES | None | None |
| expires_at | timestamp with time zone | YES | None | None |
| status | text | YES | 'active'::text | None |
| created_at | timestamp with time zone | YES | now() | None |
| updated_at | timestamp with time zone | YES | now() | None |
| user_id | bigint | YES | None | None |
| ml_nickname | text | YES | None | None |
| ml_first_name | text | YES | None | None |
| ml_last_name | text | YES | None | None |
| ml_email | text | YES | None | None |
| ml_phone | text | YES | None | None |
| ml_seller_status | text | YES | None | None |
| ml_points | integer | YES | None | None |
| ml_site_id | text | YES | None | None |
| ml_perma_link | text | YES | None | None |
| ml_logo | text | YES | None | None |
| bling_company_id | integer | YES | None | None |
| bling_company_name | text | YES | None | None |
| bling_cnpj | text | YES | None | None |
| bling_email | text | YES | None | None |
| bling_telefone | text | YES | None | None |
| bling_endereco | text | YES | None | None |
| bling_inscricao_estadual | text | YES | None | None |
| bling_owner_name | text | YES | None | None |
| upseller_account_id | text | YES | None | None |
| upseller_account_name | text | YES | None | None |
| upseller_owner_email | text | YES | None | None |
| upseller_owner_phone | text | YES | None | None |
| upseller_store_url | text | YES | None | None |
| upseller_plan | text | YES | None | None |
| display_name | text | YES | None | None |

---

## clients
**Propósito:** Tabela do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | NO | gen_random_uuid() | None |
| client_id | uuid | NO | None | None |
| user_id | bigint | NO | None | None |
| display_name | text | NO | None | None |
| tipo_cliente | text | NO | None | None |
| status | text | NO | None | None |
| created_at | timestamp with time zone | NO | now() | None |
| updated_at | timestamp with time zone | NO | now() | None |

---

## etl_status_codes
**Propósito:** Tabela do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| status | text | NO | None | None |
| description | text | NO | None | None |

---

## fact_sku_day
**Propósito:** Tabela do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | NO | gen_random_uuid() | None |
| client_id | uuid | NO | None | None |
| data | date | NO | None | None |
| sku | text | NO | None | None |
| origem_api | text | NO | None | None |
| item_id | text | YES | None | None |
| codigo_bling | text | YES | None | None |
| seller_custom_field | text | YES | None | None |
| seller_sku | text | YES | None | None |
| quantidade_vendida | numeric | YES | None | None |
| receita_bruta | numeric | YES | None | None |
| receita_liquida | numeric | YES | None | None |
| preco_unitario | numeric | YES | None | None |
| desconto | numeric | YES | None | None |
| custo_produto | numeric | YES | None | None |
| custo_frete | numeric | YES | None | None |
| custo_comissao | numeric | YES | None | None |
| custo_embalagem | numeric | YES | None | None |
| custo_operacional | numeric | YES | None | None |
| lucro | numeric | YES | None | None |
| margem | numeric | YES | None | None |
| roas | numeric | YES | None | None |
| cac | numeric | YES | None | None |
| ltv | numeric | YES | None | None |
| estoque | numeric | YES | None | None |
| estoque_virtual | numeric | YES | None | None |
| deposito_id | text | YES | None | None |
| reputacao_status | text | YES | None | None |
| reputacao_nivel | text | YES | None | None |
| custo_ads | numeric | YES | None | None |
| impressoes | numeric | YES | None | None |
| cliques | numeric | YES | None | None |
| ctr | numeric | YES | None | None |
| gasto_ads | numeric | YES | None | None |
| roas_ads | numeric | YES | None | None |
| campanha_id | text | YES | None | None |
| modalidade_envio | text | YES | None | None |
| prazo_previsto | text | YES | None | None |
| status_envio | text | YES | None | None |
| raw | jsonb | YES | None | None |
| created_at | timestamp with time zone | YES | now() | None |
| updated_at | timestamp with time zone | YES | now() | None |

---

## insight_cache
**Propósito:** Tabela do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | NO | gen_random_uuid() | None |
| client_id | uuid | YES | None | None |
| prompt | text | NO | None | None |
| context | jsonb | YES | None | None |
| response | text | NO | None | None |
| hash | text | NO | None | None |
| expires_at | timestamp with time zone | NO | None | None |
| created_at | timestamp with time zone | YES | now() | None |
| updated_at | timestamp with time zone | YES | now() | None |

---

## ml_categories
**Propósito:** Tabela do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| category_id | text | NO | None | None |
| category_name | text | NO | None | None |
| parent_category_id | text | YES | None | None |
| category_path | text | YES | None | None |
| created_at | timestamp with time zone | YES | now() | None |
| updated_at | timestamp with time zone | YES | now() | None |

---

## raw_events
**Propósito:** Tabela do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | NO | gen_random_uuid() | None |
| client_id | uuid | NO | None | None |
| origem_api | text | NO | None | None |
| event_type | text | NO | None | None |
| payload | jsonb | NO | None | None |
| received_at | timestamp with time zone | YES | now() | None |

---

## updates_log
**Propósito:** Tabela do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | NO | gen_random_uuid() | None |
| job_name | text | NO | None | None |
| status | text | NO | None | None |
| event | text | YES | None | None |
| details | jsonb | YES | None | None |
| duration_ms | integer | YES | None | None |
| created_at | timestamp with time zone | YES | now() | None |
| platform | text | YES | None | None |
| started_at | timestamp with time zone | YES | None | None |
| finished_at | timestamp with time zone | YES | None | None |
| notes | jsonb | YES | None | None |

---

## users
**Propósito:** Tabela do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | NO | gen_random_uuid() | None |
| auth_user_id | uuid | NO | None | None |
| email | text | NO | None | None |
| role | text | NO | 'user'::text | None |
| permission_level | integer | NO | 1 | None |
| status | text | NO | 'pending'::text | None |
| is_master | boolean | NO | false | None |
| created_at | timestamp with time zone | NO | now() | None |
| updated_at | timestamp with time zone | NO | now() | None |

---

## vw_ads_metrics
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| data | date | YES | None | None |
| gasto_ads_total | numeric | YES | None | None |
| impressoes_total | numeric | YES | None | None |
| cliques_total | numeric | YES | None | None |
| ctr_total | numeric | YES | None | None |
| roas_total | numeric | YES | None | None |
| clients_id | uuid | YES | None | None |
| clients_user_id | bigint | YES | None | None |
| clients_display_name | text | YES | None | None |
| clients_tipo_cliente | text | YES | None | None |
| clients_status | text | YES | None | None |

---

## vw_client_snapshot
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | YES | None | None |
| client_id | uuid | YES | None | None |
| data | date | YES | None | None |
| total_receita | numeric | YES | None | None |
| total_lucro | numeric | YES | None | None |
| margem_media | numeric | YES | None | None |
| total_vendas | numeric | YES | None | None |
| ticket_medio | numeric | YES | None | None |
| roas_medio | numeric | YES | None | None |
| cac_medio | numeric | YES | None | None |
| ltv_estimado | numeric | YES | None | None |
| estoque_total | numeric | YES | None | None |
| rupturas | integer | YES | None | None |
| reputacao_status | text | YES | None | None |
| reputacao_nivel | text | YES | None | None |
| gasto_ads | numeric | YES | None | None |
| impressoes | numeric | YES | None | None |
| cliques | numeric | YES | None | None |
| ctr_medio | numeric | YES | None | None |
| roas_ads | numeric | YES | None | None |
| created_at | timestamp with time zone | YES | None | None |
| updated_at | timestamp with time zone | YES | None | None |
| clients_id | uuid | YES | None | None |
| clients_user_id | bigint | YES | None | None |
| clients_display_name | text | YES | None | None |
| clients_tipo_cliente | text | YES | None | None |
| clients_status | text | YES | None | None |

---

## vw_clientes
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | YES | None | None |
| client_id | uuid | YES | None | None |
| user_id | bigint | YES | None | None |
| display_name | text | YES | None | None |
| tipo_cliente | text | YES | None | None |
| status | text | YES | None | None |
| created_at | timestamp with time zone | YES | None | None |
| updated_at | timestamp with time zone | YES | None | None |
| has_mercado_livre | boolean | YES | None | None |
| has_bling | boolean | YES | None | None |
| has_upseller | boolean | YES | None | None |

---

## vw_clientes_com_status
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| display_name | text | YES | None | None |
| data | date | YES | None | None |
| status_financeiro | text | YES | None | None |
| status_operacional | text | YES | None | None |
| status_ads | text | YES | None | None |
| status_reputacao | text | YES | None | None |
| margem_media | numeric | YES | None | None |
| total_lucro | numeric | YES | None | None |
| estoque_total | numeric | YES | None | None |
| rupturas | integer | YES | None | None |
| roas_ads | numeric | YES | None | None |
| reputacao_nivel | text | YES | None | None |

---

## vw_clientes_integracao
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| display_name | text | YES | None | None |
| platform | text | YES | None | None |
| status | text | YES | None | None |
| expires_at | timestamp with time zone | YES | None | None |
| dias_restantes_token | integer | YES | None | None |
| created_at | timestamp with time zone | YES | None | None |
| updated_at | timestamp with time zone | YES | None | None |

---

## vw_dashboard_overview_atual
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| display_name | text | YES | None | None |
| data | date | YES | None | None |
| total_receita | numeric | YES | None | None |
| total_lucro | numeric | YES | None | None |
| margem_media | numeric | YES | None | None |
| total_vendas | numeric | YES | None | None |
| roas_medio | numeric | YES | None | None |
| roas_ads | numeric | YES | None | None |
| estoque_total | numeric | YES | None | None |
| rupturas | integer | YES | None | None |
| reputacao_status | text | YES | None | None |
| reputacao_nivel | text | YES | None | None |
| status_financeiro | text | YES | None | None |
| status_operacional | text | YES | None | None |
| status_ads | text | YES | None | None |
| status_reputacao | text | YES | None | None |

---

## vw_dashboard_overview_diario
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| display_name | text | YES | None | None |
| data | date | YES | None | None |
| total_receita | numeric | YES | None | None |
| total_lucro | numeric | YES | None | None |
| margem_media | numeric | YES | None | None |
| total_vendas | numeric | YES | None | None |
| roas_medio | numeric | YES | None | None |
| roas_ads | numeric | YES | None | None |
| estoque_total | numeric | YES | None | None |
| rupturas | integer | YES | None | None |
| reputacao_status | text | YES | None | None |
| reputacao_nivel | text | YES | None | None |
| status_financeiro | text | YES | None | None |
| status_operacional | text | YES | None | None |
| status_ads | text | YES | None | None |
| status_reputacao | text | YES | None | None |

---

## vw_data_dictionary_markdown
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| markdown_doc | text | YES | None | None |

---

## vw_detalhes_sku
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| sku | text | YES | None | None |
| data | date | YES | None | None |
| receita_liquida | numeric | YES | None | None |
| lucro | numeric | YES | None | None |
| margem | numeric | YES | None | None |
| quantidade_vendida | numeric | YES | None | None |
| estoque | numeric | YES | None | None |
| estoque_virtual | numeric | YES | None | None |
| custo_produto | numeric | YES | None | None |
| custo_frete | numeric | YES | None | None |
| custo_comissao | numeric | YES | None | None |
| custo_ads | numeric | YES | None | None |
| roas_ads | numeric | YES | None | None |
| campanha_id | text | YES | None | None |
| reputacao_status | text | YES | None | None |
| reputacao_nivel | text | YES | None | None |
| clients_id | uuid | YES | None | None |
| clients_user_id | bigint | YES | None | None |
| clients_display_name | text | YES | None | None |
| clients_tipo_cliente | text | YES | None | None |
| clients_status | text | YES | None | None |

---

## vw_financeiro
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| data | date | YES | None | None |
| receita_total | numeric | YES | None | None |
| lucro_total | numeric | YES | None | None |
| margem_media | numeric | YES | None | None |
| custo_total | numeric | YES | None | None |
| unidades_vendidas | numeric | YES | None | None |
| clients_id | uuid | YES | None | None |
| clients_user_id | bigint | YES | None | None |
| clients_display_name | text | YES | None | None |
| clients_tipo_cliente | text | YES | None | None |
| clients_status | text | YES | None | None |

---

## vw_logs_etl
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | YES | None | None |
| job_name | text | YES | None | None |
| status | text | YES | None | None |
| platform | text | YES | None | None |
| event | text | YES | None | None |
| started_at | timestamp with time zone | YES | None | None |
| finished_at | timestamp with time zone | YES | None | None |
| duration_ms | integer | YES | None | None |
| duration_interval | interval | YES | None | None |
| details | jsonb | YES | None | None |
| notes | jsonb | YES | None | None |
| created_at | timestamp with time zone | YES | None | None |

---

## vw_ml_category_day
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| category_id | text | YES | None | None |
| data | date | YES | None | None |
| receita_bruta | numeric | YES | None | None |
| unidades_vendidas | numeric | YES | None | None |
| pedidos | bigint | YES | None | None |

---

## vw_ml_category_day_enriched
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| category_id | text | YES | None | None |
| category_name | text | YES | None | None |
| category_path | text | YES | None | None |
| data | date | YES | None | None |
| receita_bruta | numeric | YES | None | None |
| unidades_vendidas | numeric | YES | None | None |
| pedidos | bigint | YES | None | None |
| ticket_medio | numeric | YES | None | None |

---

## vw_ml_client_day_enriched
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| data | date | YES | None | None |
| receita_bruta | numeric | YES | None | None |
| unidades_vendidas | numeric | YES | None | None |
| pedidos | bigint | YES | None | None |
| ticket_medio | numeric | YES | None | None |

---

## vw_ml_order_items_flat
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| data | date | YES | None | None |
| order_id | text | YES | None | None |
| order_status | text | YES | None | None |
| sku | text | YES | None | None |
| product_title | text | YES | None | None |
| category_id | text | YES | None | None |
| seller_sku | text | YES | None | None |
| seller_custom_field | text | YES | None | None |
| quantidade_vendida | numeric | YES | None | None |
| preco_unitario | numeric | YES | None | None |
| receita_bruta | numeric | YES | None | None |
| custo_comissao_ml | numeric | YES | None | None |
| received_at | timestamp with time zone | YES | None | None |

---

## vw_ml_orders_logistics_enriched
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| order_id | text | YES | None | None |
| order_created_at | timestamp with time zone | YES | None | None |
| order_closed_at | timestamp with time zone | YES | None | None |
| payment_approved_at | timestamp with time zone | YES | None | None |
| dispatch_time_hours | numeric | YES | None | None |
| on_time_order | integer | YES | None | None |
| late_order | integer | YES | None | None |

---

## vw_ml_top_skus
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| sku | text | YES | None | None |
| product_title | text | YES | None | None |
| category_id | text | YES | None | None |
| unidades_vendidas | numeric | YES | None | None |
| receita_bruta | numeric | YES | None | None |

---

## vw_ml_viang_day
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| data | date | YES | None | None |
| receita_bruta_total | numeric | YES | None | None |
| unidades_totais | numeric | YES | None | None |
| pedidos_totais | numeric | YES | None | None |
| ticket_medio_geral | numeric | YES | None | None |

---

## vw_produto_performance
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| id | uuid | YES | None | None |
| client_id | uuid | YES | None | None |
| data | date | YES | None | None |
| sku | text | YES | None | None |
| origem_api | text | YES | None | None |
| item_id | text | YES | None | None |
| codigo_bling | text | YES | None | None |
| seller_custom_field | text | YES | None | None |
| seller_sku | text | YES | None | None |
| quantidade_vendida | numeric | YES | None | None |
| receita_bruta | numeric | YES | None | None |
| receita_liquida | numeric | YES | None | None |
| preco_unitario | numeric | YES | None | None |
| desconto | numeric | YES | None | None |
| custo_produto | numeric | YES | None | None |
| custo_frete | numeric | YES | None | None |
| custo_comissao | numeric | YES | None | None |
| custo_embalagem | numeric | YES | None | None |
| custo_operacional | numeric | YES | None | None |
| lucro | numeric | YES | None | None |
| margem | numeric | YES | None | None |
| roas | numeric | YES | None | None |
| cac | numeric | YES | None | None |
| ltv | numeric | YES | None | None |
| estoque | numeric | YES | None | None |
| estoque_virtual | numeric | YES | None | None |
| deposito_id | text | YES | None | None |
| reputacao_status | text | YES | None | None |
| reputacao_nivel | text | YES | None | None |
| custo_ads | numeric | YES | None | None |
| impressoes | numeric | YES | None | None |
| cliques | numeric | YES | None | None |
| ctr | numeric | YES | None | None |
| gasto_ads | numeric | YES | None | None |
| roas_ads | numeric | YES | None | None |
| campanha_id | text | YES | None | None |
| modalidade_envio | text | YES | None | None |
| prazo_previsto | text | YES | None | None |
| status_envio | text | YES | None | None |
| raw | jsonb | YES | None | None |
| created_at | timestamp with time zone | YES | None | None |
| updated_at | timestamp with time zone | YES | None | None |
| clients_id | uuid | YES | None | None |
| clients_user_id | bigint | YES | None | None |
| clients_display_name | text | YES | None | None |
| clients_tipo_cliente | text | YES | None | None |
| clients_status | text | YES | None | None |

---

## vw_receita_semanal_por_cliente
**Propósito:** View do schema dashboard.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| client_id | uuid | YES | None | None |
| semana_inicio | date | YES | None | None |
| receita_total | numeric | YES | None | None |

---

 |