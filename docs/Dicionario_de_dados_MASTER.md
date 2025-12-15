
| ## agg_client_day (TABLE)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| client_id | uuid | NO |  |
| data | date | NO |  |
| total_receita | numeric | YES |  |
| total_lucro | numeric | YES |  |
| margem_media | numeric | YES |  |
| total_vendas | numeric | YES |  |
| ticket_medio | numeric | YES |  |
| roas_medio | numeric | YES |  |
| cac_medio | numeric | YES |  |
| ltv_estimado | numeric | YES |  |
| estoque_total | numeric | YES |  |
| rupturas | integer | YES |  |
| reputacao_status | text | YES |  |
| reputacao_nivel | text | YES |  |
| gasto_ads | numeric | YES |  |
| impressoes | numeric | YES |  |
| cliques | numeric | YES |  |
| ctr_medio | numeric | YES |  |
| roas_ads | numeric | YES |  |
| raw | jsonb | YES |  |
| created_at | timestamp with time zone | YES | now() |
| updated_at | timestamp with time zone | YES | now() |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ## api_tokens (TABLE)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| client_id | uuid | NO |  |
| platform | text | NO |  |
| access_token | text | YES |  |
| refresh_token | text | YES |  |
| expires_at | timestamp with time zone | YES |  |
| status | text | YES | 'active'::text |
| created_at | timestamp with time zone | YES | now() |
| updated_at | timestamp with time zone | YES | now() |
| user_id | bigint | YES |  |
| ml_nickname | text | YES |  |
| ml_first_name | text | YES |  |
| ml_last_name | text | YES |  |
| ml_email | text | YES |  |
| ml_phone | text | YES |  |
| ml_seller_status | text | YES |  |
| ml_points | integer | YES |  |
| ml_site_id | text | YES |  |
| ml_perma_link | text | YES |  |
| ml_logo | text | YES |  |
| bling_company_id | integer | YES |  |
| bling_company_name | text | YES |  |
| bling_cnpj | text | YES |  |
| bling_email | text | YES |  |
| bling_telefone | text | YES |  |
| bling_endereco | text | YES |  |
| bling_inscricao_estadual | text | YES |  |
| bling_owner_name | text | YES |  |
| upseller_account_id | text | YES |  |
| upseller_account_name | text | YES |  |
| upseller_owner_email | text | YES |  |
| upseller_owner_phone | text | YES |  |
| upseller_store_url | text | YES |  |
| upseller_plan | text | YES |  |
| display_name | text | YES |  |
                                                                                                                                                                                                                                                                                                                                          |
| ## clients (TABLE)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| client_id | uuid | NO |  |
| user_id | bigint | NO |  |
| display_name | text | NO |  |
| tipo_cliente | text | NO |  |
| status | text | NO |  |
| created_at | timestamp with time zone | NO | now() |
| updated_at | timestamp with time zone | NO | now() |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ## etl_status_codes (TABLE)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| status | text | NO |  |
| description | text | NO |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ## fact_sku_day (TABLE)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| client_id | uuid | NO |  |
| data | date | NO |  |
| sku | text | NO |  |
| origem_api | text | NO |  |
| item_id | text | YES |  |
| codigo_bling | text | YES |  |
| seller_custom_field | text | YES |  |
| seller_sku | text | YES |  |
| quantidade_vendida | numeric | YES |  |
| receita_bruta | numeric | YES |  |
| receita_liquida | numeric | YES |  |
| preco_unitario | numeric | YES |  |
| desconto | numeric | YES |  |
| custo_produto | numeric | YES |  |
| custo_frete | numeric | YES |  |
| custo_comissao | numeric | YES |  |
| custo_embalagem | numeric | YES |  |
| custo_operacional | numeric | YES |  |
| lucro | numeric | YES |  |
| margem | numeric | YES |  |
| roas | numeric | YES |  |
| cac | numeric | YES |  |
| ltv | numeric | YES |  |
| estoque | numeric | YES |  |
| estoque_virtual | numeric | YES |  |
| deposito_id | text | YES |  |
| reputacao_status | text | YES |  |
| reputacao_nivel | text | YES |  |
| custo_ads | numeric | YES |  |
| impressoes | numeric | YES |  |
| cliques | numeric | YES |  |
| ctr | numeric | YES |  |
| gasto_ads | numeric | YES |  |
| roas_ads | numeric | YES |  |
| campanha_id | text | YES |  |
| modalidade_envio | text | YES |  |
| prazo_previsto | text | YES |  |
| status_envio | text | YES |  |
| raw | jsonb | YES |  |
| created_at | timestamp with time zone | YES | now() |
| updated_at | timestamp with time zone | YES | now() |
                                                                                                                                                                              |
| ## insight_cache (TABLE)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| client_id | uuid | YES |  |
| prompt | text | NO |  |
| context | jsonb | YES |  |
| response | text | NO |  |
| hash | text | NO |  |
| expires_at | timestamp with time zone | NO |  |
| created_at | timestamp with time zone | YES | now() |
| updated_at | timestamp with time zone | YES | now() |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ## ml_categories (TABLE)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| category_id | text | NO |  |
| category_name | text | NO |  |
| parent_category_id | text | YES |  |
| category_path | text | YES |  |
| created_at | timestamp with time zone | YES | now() |
| updated_at | timestamp with time zone | YES | now() |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ## raw_events (TABLE)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| client_id | uuid | NO |  |
| origem_api | text | NO |  |
| event_type | text | NO |  |
| payload | jsonb | NO |  |
| received_at | timestamp with time zone | YES | now() |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ## updates_log (TABLE)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| job_name | text | NO |  |
| status | text | NO |  |
| event | text | YES |  |
| details | jsonb | YES |  |
| duration_ms | integer | YES |  |
| created_at | timestamp with time zone | YES | now() |
| platform | text | YES |  |
| started_at | timestamp with time zone | YES |  |
| finished_at | timestamp with time zone | YES |  |
| notes | jsonb | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ## vw_ads_metrics (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| client_id | uuid | YES |  |
| data | date | YES |  |
| gasto_ads_total | numeric | YES |  |
| impressoes_total | numeric | YES |  |
| cliques_total | numeric | YES |  |
| ctr_total | numeric | YES |  |
| roas_total | numeric | YES |  |
| clients_id | uuid | YES |  |
| clients_user_id | bigint | YES |  |
| clients_display_name | text | YES |  |
| clients_tipo_cliente | text | YES |  |
| clients_status | text | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ## vw_client_snapshot (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | YES |  |
| client_id | uuid | YES |  |
| data | date | YES |  |
| total_receita | numeric | YES |  |
| total_lucro | numeric | YES |  |
| margem_media | numeric | YES |  |
| total_vendas | numeric | YES |  |
| ticket_medio | numeric | YES |  |
| roas_medio | numeric | YES |  |
| cac_medio | numeric | YES |  |
| ltv_estimado | numeric | YES |  |
| estoque_total | numeric | YES |  |
| rupturas | integer | YES |  |
| reputacao_status | text | YES |  |
| reputacao_nivel | text | YES |  |
| gasto_ads | numeric | YES |  |
| impressoes | numeric | YES |  |
| cliques | numeric | YES |  |
| ctr_medio | numeric | YES |  |
| roas_ads | numeric | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| clients_id | uuid | YES |  |
| clients_user_id | bigint | YES |  |
| clients_display_name | text | YES |  |
| clients_tipo_cliente | text | YES |  |
| clients_status | text | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ## vw_clientes (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | YES |  |
| client_id | uuid | YES |  |
| user_id | bigint | YES |  |
| display_name | text | YES |  |
| tipo_cliente | text | YES |  |
| status | text | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| has_mercado_livre | boolean | YES |  |
| has_bling | boolean | YES |  |
| has_upseller | boolean | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ## vw_clientes_com_status (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| client_id | uuid | YES |  |
| display_name | text | YES |  |
| data | date | YES |  |
| status_financeiro | text | YES |  |
| status_operacional | text | YES |  |
| status_ads | text | YES |  |
| status_reputacao | text | YES |  |
| margem_media | numeric | YES |  |
| total_lucro | numeric | YES |  |
| estoque_total | numeric | YES |  |
| rupturas | integer | YES |  |
| roas_ads | numeric | YES |  |
| reputacao_nivel | text | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ## vw_clientes_integracao (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| client_id | uuid | YES |  |
| display_name | text | YES |  |
| platform | text | YES |  |
| status | text | YES |  |
| expires_at | timestamp with time zone | YES |  |
| dias_restantes_token | integer | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ## vw_dashboard_overview_atual (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| client_id | uuid | YES |  |
| display_name | text | YES |  |
| data | date | YES |  |
| total_receita | numeric | YES |  |
| total_lucro | numeric | YES |  |
| margem_media | numeric | YES |  |
| total_vendas | numeric | YES |  |
| roas_medio | numeric | YES |  |
| roas_ads | numeric | YES |  |
| estoque_total | numeric | YES |  |
| rupturas | integer | YES |  |
| reputacao_status | text | YES |  |
| reputacao_nivel | text | YES |  |
| status_financeiro | text | YES |  |
| status_operacional | text | YES |  |
| status_ads | text | YES |  |
| status_reputacao | text | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ## vw_dashboard_overview_diario (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| client_id | uuid | YES |  |
| display_name | text | YES |  |
| data | date | YES |  |
| total_receita | numeric | YES |  |
| total_lucro | numeric | YES |  |
| margem_media | numeric | YES |  |
| total_vendas | numeric | YES |  |
| roas_medio | numeric | YES |  |
| roas_ads | numeric | YES |  |
| estoque_total | numeric | YES |  |
| rupturas | integer | YES |  |
| reputacao_status | text | YES |  |
| reputacao_nivel | text | YES |  |
| status_financeiro | text | YES |  |
| status_operacional | text | YES |  |
| status_ads | text | YES |  |
| status_reputacao | text | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ## vw_detalhes_sku (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| client_id | uuid | YES |  |
| sku | text | YES |  |
| data | date | YES |  |
| receita_liquida | numeric | YES |  |
| lucro | numeric | YES |  |
| margem | numeric | YES |  |
| quantidade_vendida | numeric | YES |  |
| estoque | numeric | YES |  |
| estoque_virtual | numeric | YES |  |
| custo_produto | numeric | YES |  |
| custo_frete | numeric | YES |  |
| custo_comissao | numeric | YES |  |
| custo_ads | numeric | YES |  |
| roas_ads | numeric | YES |  |
| campanha_id | text | YES |  |
| reputacao_status | text | YES |  |
| reputacao_nivel | text | YES |  |
| clients_id | uuid | YES |  |
| clients_user_id | bigint | YES |  |
| clients_display_name | text | YES |  |
| clients_tipo_cliente | text | YES |  |
| clients_status | text | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ## vw_financeiro (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| client_id | uuid | YES |  |
| data | date | YES |  |
| receita_total | numeric | YES |  |
| lucro_total | numeric | YES |  |
| margem_media | numeric | YES |  |
| custo_total | numeric | YES |  |
| unidades_vendidas | numeric | YES |  |
| clients_id | uuid | YES |  |
| clients_user_id | bigint | YES |  |
| clients_display_name | text | YES |  |
| clients_tipo_cliente | text | YES |  |
| clients_status | text | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ## vw_logs_etl (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | YES |  |
| job_name | text | YES |  |
| status | text | YES |  |
| platform | text | YES |  |
| event | text | YES |  |
| started_at | timestamp with time zone | YES |  |
| finished_at | timestamp with time zone | YES |  |
| duration_ms | integer | YES |  |
| duration_interval | interval | YES |  |
| details | jsonb | YES |  |
| notes | jsonb | YES |  |
| created_at | timestamp with time zone | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ## vw_ml_category_day (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| category_id | text | YES |  |
| data | date | YES |  |
| receita_bruta | numeric | YES |  |
| unidades_vendidas | numeric | YES |  |
| pedidos | bigint | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ## vw_ml_category_day_enriched (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| category_id | text | YES |  |
| category_name | text | YES |  |
| category_path | text | YES |  |
| data | date | YES |  |
| receita_bruta | numeric | YES |  |
| unidades_vendidas | numeric | YES |  |
| pedidos | bigint | YES |  |
| ticket_medio | numeric | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ## vw_ml_client_day_enriched (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| client_id | uuid | YES |  |
| data | date | YES |  |
| receita_bruta | numeric | YES |  |
| unidades_vendidas | numeric | YES |  |
| pedidos | bigint | YES |  |
| ticket_medio | numeric | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ## vw_ml_order_items_flat (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| client_id | uuid | YES |  |
| data | date | YES |  |
| order_id | text | YES |  |
| order_status | text | YES |  |
| sku | text | YES |  |
| product_title | text | YES |  |
| category_id | text | YES |  |
| seller_sku | text | YES |  |
| seller_custom_field | text | YES |  |
| quantidade_vendida | numeric | YES |  |
| preco_unitario | numeric | YES |  |
| receita_bruta | numeric | YES |  |
| custo_comissao_ml | numeric | YES |  |
| received_at | timestamp with time zone | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ## vw_ml_orders_logistics_enriched (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| client_id | uuid | YES |  |
| order_id | text | YES |  |
| order_created_at | timestamp with time zone | YES |  |
| order_closed_at | timestamp with time zone | YES |  |
| payment_approved_at | timestamp with time zone | YES |  |
| dispatch_time_hours | numeric | YES |  |
| on_time_order | integer | YES |  |
| late_order | integer | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ## vw_ml_top_skus (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| sku | text | YES |  |
| product_title | text | YES |  |
| category_id | text | YES |  |
| unidades_vendidas | numeric | YES |  |
| receita_bruta | numeric | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ## vw_ml_viang_day (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| data | date | YES |  |
| receita_bruta_total | numeric | YES |  |
| unidades_totais | numeric | YES |  |
| pedidos_totais | numeric | YES |  |
| ticket_medio_geral | numeric | YES |  |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ## vw_produto_performance (VIEW)

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | YES |  |
| client_id | uuid | YES |  |
| data | date | YES |  |
| sku | text | YES |  |
| origem_api | text | YES |  |
| item_id | text | YES |  |
| codigo_bling | text | YES |  |
| seller_custom_field | text | YES |  |
| seller_sku | text | YES |  |
| quantidade_vendida | numeric | YES |  |
| receita_bruta | numeric | YES |  |
| receita_liquida | numeric | YES |  |
| preco_unitario | numeric | YES |  |
| desconto | numeric | YES |  |
| custo_produto | numeric | YES |  |
| custo_frete | numeric | YES |  |
| custo_comissao | numeric | YES |  |
| custo_embalagem | numeric | YES |  |
| custo_operacional | numeric | YES |  |
| lucro | numeric | YES |  |
| margem | numeric | YES |  |
| roas | numeric | YES |  |
| cac | numeric | YES |  |
| ltv | numeric | YES |  |
| estoque | numeric | YES |  |
| estoque_virtual | numeric | YES |  |
| deposito_id | text | YES |  |
| reputacao_status | text | YES |  |
| reputacao_nivel | text | YES |  |
| custo_ads | numeric | YES |  |
| impressoes | numeric | YES |  |
| cliques | numeric | YES |  |
| ctr | numeric | YES |  |
| gasto_ads | numeric | YES |  |
| roas_ads | numeric | YES |  |
| campanha_id | text | YES |  |
| modalidade_envio | text | YES |  |
| prazo_previsto | text | YES |  |
| status_envio | text | YES |  |
| raw | jsonb | YES |  |
| created_at | timestamp with time zone | YES |  |
| updated_at | timestamp with time zone | YES |  |
| clients_id | uuid | YES |  |
| clients_user_id | bigint | YES |  |
| clients_display_name | text | YES |  |
| clients_tipo_cliente | text | YES |  |
| clients_status | text | YES |  |
 |