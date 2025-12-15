- Nenhuma lógica de negócio é aplicada nesta tabela.
- Serve como base auditável para backfill, views e correções futuras.

---

## Tabela: `fact_sku_day`

Fato diário por SKU, derivado via ETL.

### Campos principais

| campo | tipo | descrição |
|------|------|-----------|
| id | uuid | PK |
| client_id | uuid | Cliente |
| data | date | Data do evento |
| sku | text | SKU / item_id |
| quantidade_vendida | numeric | Unidades vendidas |
| receita_liquida | numeric | Receita calculada no ETL |
| origem_api | text | Ex.: `mercado_livre` |
| raw | jsonb | (opcional / futuro) |

### Observações
- Campos financeiros completos (lucro, margem, custos) **não fazem parte do MVP**.
- A tabela é mantida por estabilidade do ETL e compatibilidade futura.
- Para leitura e inteligência, **as views são a camada preferencial**.

---

## Tabela: `agg_client_day`

Snapshot diário agregado por cliente, derivado via ETL.

### Campos principais

| campo | tipo | descrição |
|------|------|-----------|
| id | uuid | PK |
| client_id | uuid | Cliente |
| data | date | Data |
| total_receita | numeric | Receita agregada |
| total_vendas | numeric | Unidades vendidas |
| ticket_medio | numeric | (pode ser NULL no ETL) |
| origem_api | text | Ex.: `mercado_livre` |

### Observações
- Alguns campos são mantidos por compatibilidade, mas **não são usados diretamente no MVP**.
- A camada de views fornece agregações mais completas e consistentes.

---

## Tabelas de Controle

### `api_tokens`

Controle de autenticação das integrações.

| campo | tipo | descrição |
|------|------|-----------|
| client_id | uuid | Cliente |
| platform | text | `mercado_livre`, etc |
| access_token | text | Token ativo |
| refresh_token | text | Refresh |
| expires_at | timestamptz | Validade |
| status | text | `active`, `expired`, `error` |

---

### `updates_log`

Registro de execução dos ETLs.

| campo | tipo | descrição |
|------|------|-----------|
| id | uuid | PK |
| platform | text | Origem |
| started_at | timestamptz | Início |
| finished_at | timestamptz | Fim |
| status | text | `success`, `partial`, `error` |
| notes | text | Detalhes |

---

## Views de Leitura (Camada MVP)

Estas views são a **base oficial de leitura** para o Metabase e para a Home do dashboard.
Nenhuma altera dados. Todas leem de `raw_events`.

---

### View: `vw_ml_order_items_flat`

Flatten dos pedidos do Mercado Livre.

Origem:
- `raw_events.payload.results[]`
- `order_items[]`

Campos principais:
- client_id
- data
- order_id
- sku
- product_title
- category_id
- seller_sku
- seller_custom_field
- quantidade_vendida
- preco_unitario
- receita_bruta
- custo_comissao_ml

---

### View: `vw_ml_client_day_enriched`

Agregação diária por cliente.

Métricas:
- receita_bruta
- unidades_vendidas
- pedidos
- ticket_medio

---

### View: `vw_ml_viang_day`

Visão executiva agregada da operação (Home).

Métricas:
- receita_bruta_total
- unidades_totais
- pedidos_totais
- ticket_medio_geral

---

### View: `vw_ml_top_skus`

Ranking de SKUs por unidades vendidas.

Uso:
- Snippet da Home (Top 10)
- Base para drilldown futuro

---

### View: `vw_ml_category_day`

Agregação diária por categoria.

Uso:
- Gráficos por tipo/categoria de produto
- Hierarquia visual do MVP

---

## Notas Finais

- O MVP **não depende** de ERP nem de Publicidade.
- Qualquer enriquecimento adicional (logística, reclamações, estoque real)
será feito via novos endpoints e/ou novas tabelas, pós-MVP.
- O ETL permanece estável; a inteligência está concentrada na camada de leitura.

Estado do schema: **VALIDADO e ATIVO (14/12/2025)**.
