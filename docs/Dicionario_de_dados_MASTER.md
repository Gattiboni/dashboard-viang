# Data Dictionary Master — Dashboard Schema

## Sumário
- [agg_client_day](#agg_client_day)
- [api_tokens](#api_tokens)
- [clients](#clients)
- [etl_status_codes](#etl_status_codes)
- [fact_sku_day](#fact_sku_day)
- [insight_cache](#insight_cache)
- [raw_events](#raw_events)
- [updates_log](#updates_log)
- [vw_ads_metrics](#vw_ads_metrics)
- [vw_client_snapshot](#vw_client_snapshot)
- [vw_clientes](#vw_clientes)
- [vw_clientes_com_status](#vw_clientes_com_status)
- [vw_clientes_integracao](#vw_clientes_integracao)
- [vw_dashboard_overview_atual](#vw_dashboard_overview_atual)
- [vw_dashboard_overview_diario](#vw_dashboard_overview_diario)
- [vw_detalhes_sku](#vw_detalhes_sku)
- [vw_financeiro](#vw_financeiro)
- [vw_logs_etl](#vw_logs_etl)
- [vw_produto_performance](#vw_produto_performance)

---
## agg_client_day
**Propósito:** Agregações diárias por cliente derivadas de fact_sku_day.

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
**Propósito:** Armazena tokens OAuth e metadados do Mercado Livre para cada cliente.

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
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

### Colunas

| Coluna | Tipo | Nullable | Default | Descrição |
|--------|------|----------|---------|-----------|
| status | text | NO | None | None |
| description | text | NO | None | None |

---
## fact_sku_day
**Propósito:** Fatos diários por SKU integrados do ML para métricas e dashboards.

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
**Propósito:** Cache de insights gerados para melhorar performance de leitura.

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
## raw_events
**Propósito:** Eventos brutos importados do ML (pedidos, vendas, atualizações).

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
**Propósito:** Registra execuções do ETL, status e mensagens para auditoria.

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
## vw_ads_metrics
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
## vw_detalhes_sku
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
## vw_produto_performance
**Propósito:** Tabela do schema dashboard utilizada no pipeline de dados.

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
# Views
## VIEW: vw_ads_metrics
```
 SELECT a.client_id,
    a.data,
    sum(a.gasto_ads) AS gasto_ads_total,
    sum(a.impressoes) AS impressoes_total,
    sum(a.cliques) AS cliques_total,
    (sum(a.cliques) / NULLIF(sum(a.impressoes), (0)::numeric)) AS ctr_total,
    (sum(a.receita_liquida) / NULLIF(sum(a.gasto_ads), (0)::numeric)) AS roas_total,
    c.id AS clients_id,
    c.user_id AS clients_user_id,
    c.display_name AS clients_display_name,
    c.tipo_cliente AS clients_tipo_cliente,
    c.status AS clients_status
   FROM (fact_sku_day a
     JOIN clients c ON ((c.client_id = a.client_id)))
  GROUP BY a.client_id, a.data, c.id, c.user_id, c.display_name, c.tipo_cliente, c.status;
```

---
## VIEW: vw_client_snapshot
```
 SELECT a.id,
    a.client_id,
    a.data,
    a.total_receita,
    a.total_lucro,
    a.margem_media,
    a.total_vendas,
    a.ticket_medio,
    a.roas_medio,
    a.cac_medio,
    a.ltv_estimado,
    a.estoque_total,
    a.rupturas,
    a.reputacao_status,
    a.reputacao_nivel,
    a.gasto_ads,
    a.impressoes,
    a.cliques,
    a.ctr_medio,
    a.roas_ads,
    a.created_at,
    a.updated_at,
    c.id AS clients_id,
    c.user_id AS clients_user_id,
    c.display_name AS clients_display_name,
    c.tipo_cliente AS clients_tipo_cliente,
    c.status AS clients_status
   FROM (agg_client_day a
     JOIN clients c ON ((c.client_id = a.client_id)));
```

---
## VIEW: vw_clientes
```
 SELECT c.id,
    c.client_id,
    c.user_id,
    c.display_name,
    c.tipo_cliente,
    c.status,
    c.created_at,
    c.updated_at,
    bool_or(((t.platform = 'mercado_livre'::text) AND (t.status = 'active'::text))) AS has_mercado_livre,
    bool_or(((t.platform = 'bling'::text) AND (t.status = 'active'::text))) AS has_bling,
    bool_or(((t.platform = 'upseller'::text) AND (t.status = 'active'::text))) AS has_upseller
   FROM (clients c
     LEFT JOIN api_tokens t ON ((t.client_id = c.client_id)))
  GROUP BY c.id, c.client_id, c.user_id, c.display_name, c.tipo_cliente, c.status, c.created_at, c.updated_at;
```

---
## VIEW: vw_clientes_com_status
```
 SELECT c.client_id,
    c.display_name,
    a.data,
        CASE
            WHEN (a.margem_media >= (20)::numeric) THEN 'verde'::text
            WHEN (a.margem_media >= (10)::numeric) THEN 'amarelo'::text
            ELSE 'vermelho'::text
        END AS status_financeiro,
        CASE
            WHEN (a.rupturas > 0) THEN 'vermelho'::text
            WHEN (a.estoque_total < (5)::numeric) THEN 'amarelo'::text
            ELSE 'verde'::text
        END AS status_operacional,
        CASE
            WHEN (a.roas_ads >= (3)::numeric) THEN 'verde'::text
            WHEN (a.roas_ads >= (1)::numeric) THEN 'amarelo'::text
            ELSE 'vermelho'::text
        END AS status_ads,
    a.reputacao_status AS status_reputacao,
    a.margem_media,
    a.total_lucro,
    a.estoque_total,
    a.rupturas,
    a.roas_ads,
    a.reputacao_nivel
   FROM (vw_client_snapshot a
     JOIN clients c ON ((c.client_id = a.client_id)));
```

---
## VIEW: vw_clientes_integracao
```
 SELECT c.client_id,
    c.display_name,
    t.platform,
    t.status,
    t.expires_at,
    ((t.expires_at)::date - (now())::date) AS dias_restantes_token,
    t.created_at,
    t.updated_at
   FROM (api_tokens t
     JOIN clients c ON ((c.client_id = t.client_id)));
```

---
## VIEW: vw_dashboard_overview_atual
```
 WITH ultimos AS (
         SELECT vw_dashboard_overview_diario.client_id,
            max(vw_dashboard_overview_diario.data) AS data_recente
           FROM vw_dashboard_overview_diario
          GROUP BY vw_dashboard_overview_diario.client_id
        )
 SELECT d.client_id,
    d.display_name,
    d.data,
    d.total_receita,
    d.total_lucro,
    d.margem_media,
    d.total_vendas,
    d.roas_medio,
    d.roas_ads,
    d.estoque_total,
    d.rupturas,
    d.reputacao_status,
    d.reputacao_nivel,
    d.status_financeiro,
    d.status_operacional,
    d.status_ads,
    d.status_reputacao
   FROM (vw_dashboard_overview_diario d
     JOIN ultimos u ON (((u.client_id = d.client_id) AND (u.data_recente = d.data))));
```

---
## VIEW: vw_dashboard_overview_diario
```
 SELECT snap.client_id,
    stat.display_name,
    snap.data,
    snap.total_receita,
    snap.total_lucro,
    snap.margem_media,
    snap.total_vendas,
    snap.roas_medio,
    snap.roas_ads,
    snap.estoque_total,
    snap.rupturas,
    snap.reputacao_status,
    snap.reputacao_nivel,
    stat.status_financeiro,
    stat.status_operacional,
    stat.status_ads,
    stat.status_reputacao
   FROM (vw_client_snapshot snap
     JOIN vw_clientes_com_status stat ON (((stat.client_id = snap.client_id) AND (stat.data = snap.data))));
```

---
## VIEW: vw_detalhes_sku
```
 SELECT a.client_id,
    a.sku,
    a.data,
    a.receita_liquida,
    a.lucro,
    a.margem,
    a.quantidade_vendida,
    a.estoque,
    a.estoque_virtual,
    a.custo_produto,
    a.custo_frete,
    a.custo_comissao,
    a.custo_ads,
    a.roas_ads,
    a.campanha_id,
    a.reputacao_status,
    a.reputacao_nivel,
    c.id AS clients_id,
    c.user_id AS clients_user_id,
    c.display_name AS clients_display_name,
    c.tipo_cliente AS clients_tipo_cliente,
    c.status AS clients_status
   FROM (fact_sku_day a
     JOIN clients c ON ((c.client_id = a.client_id)));
```

---
## VIEW: vw_financeiro
```
 SELECT a.client_id,
    a.data,
    sum(a.receita_liquida) AS receita_total,
    sum(a.lucro) AS lucro_total,
    avg(a.margem) AS margem_media,
    sum(((((a.custo_produto + a.custo_frete) + a.custo_comissao) + a.custo_embalagem) + a.custo_operacional)) AS custo_total,
    sum(a.quantidade_vendida) AS unidades_vendidas,
    c.id AS clients_id,
    c.user_id AS clients_user_id,
    c.display_name AS clients_display_name,
    c.tipo_cliente AS clients_tipo_cliente,
    c.status AS clients_status
   FROM (fact_sku_day a
     JOIN clients c ON ((c.client_id = a.client_id)))
  GROUP BY a.client_id, a.data, c.id, c.user_id, c.display_name, c.tipo_cliente, c.status;
```

---
## VIEW: vw_logs_etl
```
 SELECT id,
    job_name,
    status,
    platform,
    event,
    started_at,
    finished_at,
    duration_ms,
    (finished_at - started_at) AS duration_interval,
    details,
    notes,
    created_at
   FROM updates_log
  ORDER BY created_at DESC;
```

---
## VIEW: vw_produto_performance
```
 SELECT a.id,
    a.client_id,
    a.data,
    a.sku,
    a.origem_api,
    a.item_id,
    a.codigo_bling,
    a.seller_custom_field,
    a.seller_sku,
    a.quantidade_vendida,
    a.receita_bruta,
    a.receita_liquida,
    a.preco_unitario,
    a.desconto,
    a.custo_produto,
    a.custo_frete,
    a.custo_comissao,
    a.custo_embalagem,
    a.custo_operacional,
    a.lucro,
    a.margem,
    a.roas,
    a.cac,
    a.ltv,
    a.estoque,
    a.estoque_virtual,
    a.deposito_id,
    a.reputacao_status,
    a.reputacao_nivel,
    a.custo_ads,
    a.impressoes,
    a.cliques,
    a.ctr,
    a.gasto_ads,
    a.roas_ads,
    a.campanha_id,
    a.modalidade_envio,
    a.prazo_previsto,
    a.status_envio,
    a.raw,
    a.created_at,
    a.updated_at,
    c.id AS clients_id,
    c.user_id AS clients_user_id,
    c.display_name AS clients_display_name,
    c.tipo_cliente AS clients_tipo_cliente,
    c.status AS clients_status
   FROM (fact_sku_day a
     JOIN clients c ON ((c.client_id = a.client_id)));
```

---
# Indexes
### idx_agg_client_day_client_id_data on agg_client_day
```
CREATE INDEX idx_agg_client_day_client_id_data ON dashboard.agg_client_day USING btree (client_id, data)
```

### agg_client_day_pkey on agg_client_day
```
CREATE UNIQUE INDEX agg_client_day_pkey ON dashboard.agg_client_day USING btree (id)
```

### api_tokens_client_platform_uniq on api_tokens
```
CREATE UNIQUE INDEX api_tokens_client_platform_uniq ON dashboard.api_tokens USING btree (client_id, platform)
```

### idx_api_tokens_user_id on api_tokens
```
CREATE INDEX idx_api_tokens_user_id ON dashboard.api_tokens USING btree (user_id)
```

### api_tokens_pkey on api_tokens
```
CREATE UNIQUE INDEX api_tokens_pkey ON dashboard.api_tokens USING btree (id)
```

### clients_pkey on clients
```
CREATE UNIQUE INDEX clients_pkey ON dashboard.clients USING btree (id)
```

### clients_user_id_key on clients
```
CREATE UNIQUE INDEX clients_user_id_key ON dashboard.clients USING btree (user_id)
```

### clients_client_id_key on clients
```
CREATE UNIQUE INDEX clients_client_id_key ON dashboard.clients USING btree (client_id)
```

### etl_status_codes_pkey on etl_status_codes
```
CREATE UNIQUE INDEX etl_status_codes_pkey ON dashboard.etl_status_codes USING btree (status)
```

### fact_sku_day_pkey on fact_sku_day
```
CREATE UNIQUE INDEX fact_sku_day_pkey ON dashboard.fact_sku_day USING btree (id)
```

### idx_fact_sku_day_client_id_data on fact_sku_day
```
CREATE INDEX idx_fact_sku_day_client_id_data ON dashboard.fact_sku_day USING btree (client_id, data)
```

### insight_cache_hash_idx on insight_cache
```
CREATE INDEX insight_cache_hash_idx ON dashboard.insight_cache USING btree (hash)
```

### insight_cache_pkey on insight_cache
```
CREATE UNIQUE INDEX insight_cache_pkey ON dashboard.insight_cache USING btree (id)
```

### raw_events_pkey on raw_events
```
CREATE UNIQUE INDEX raw_events_pkey ON dashboard.raw_events USING btree (id)
```

### idx_raw_events_client_id on raw_events
```
CREATE INDEX idx_raw_events_client_id ON dashboard.raw_events USING btree (client_id)
```

### updates_log_pkey on updates_log
```
CREATE UNIQUE INDEX updates_log_pkey ON dashboard.updates_log USING btree (id)
```

