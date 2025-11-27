## Table: agg_client_day
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: api_tokens
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: clients
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
| id | uuid | NO | gen_random_uuid() | None |
| client_id | uuid | NO | None | None |
| user_id | bigint | NO | None | None |
| display_name | text | NO | None | None |
| tipo_cliente | text | NO | None | None |
| status | text | NO | None | None |
| created_at | timestamp with time zone | NO | now() | None |
| updated_at | timestamp with time zone | NO | now() | None |

## Table: etl_status_codes
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
| status | text | NO | None | None |
| description | text | NO | None | None |

## Table: fact_sku_day
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: insight_cache
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
| id | uuid | NO | gen_random_uuid() | None |
| client_id | uuid | YES | None | None |
| prompt | text | NO | None | None |
| context | jsonb | YES | None | None |
| response | text | NO | None | None |
| hash | text | NO | None | None |
| expires_at | timestamp with time zone | NO | None | None |
| created_at | timestamp with time zone | YES | now() | None |
| updated_at | timestamp with time zone | YES | now() | None |

## Table: raw_events
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
| id | uuid | NO | gen_random_uuid() | None |
| client_id | uuid | NO | None | None |
| origem_api | text | NO | None | None |
| event_type | text | NO | None | None |
| payload | jsonb | NO | None | None |
| received_at | timestamp with time zone | YES | now() | None |

## Table: updates_log
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: vw_ads_metrics
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: vw_client_snapshot
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: vw_clientes
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: vw_clientes_com_status
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: vw_clientes_integracao
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
| client_id | uuid | YES | None | None |
| display_name | text | YES | None | None |
| platform | text | YES | None | None |
| status | text | YES | None | None |
| expires_at | timestamp with time zone | YES | None | None |
| dias_restantes_token | integer | YES | None | None |
| created_at | timestamp with time zone | YES | None | None |
| updated_at | timestamp with time zone | YES | None | None |

## Table: vw_dashboard_overview_atual
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: vw_dashboard_overview_diario
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: vw_detalhes_sku
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: vw_financeiro
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: vw_logs_etl
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

## Table: vw_produto_performance
| Column | Type | Nullable | Default | Description |
|--------|-------|----------|---------|-------------|
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

