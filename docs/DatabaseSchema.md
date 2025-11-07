## DatabaseSchema.md

### Estrutura Principal

| Tabela         | Descrição                                 |
| -------------- | ----------------------------------------- |
| fact_sku_day   | Dados detalhados (SKU/dia) – base factual |
| agg_client_day | Snapshot diário agregado por cliente      |
| insight_cache  | Cache de análises de IA (TTL 24h)         |
| api_tokens     | Controle e renovação de tokens de API     |
| updates_log    | Registro de execução e status             |

Exemplo (`fact_sku_day`):

| client_id | data       | sku | receita_liquida | lucro  | margem | roas | estoque | reputacao | origem_api |
| --------- | ---------- | --- | --------------- | ------ | ------ | ---- | ------- | --------- | ---------- |
| uuid      | 2025-11-07 | 123 | 500.00          | 120.00 | 24%    | 3.2  | 45      | verde     | ML         |
