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


## 2025-11 — Adição de tabelas base ETL

Como parte do Bloco 1, foram adicionadas as seguintes tabelas no schema `dashboard`:

### `api_tokens`
Armazena tokens temporários das integrações:

| campo | tipo | descrição |
|-------|------|-----------|
| client_id | text | Identificador interno da conta |
| platform | text | `mercado_livre`, `bling`, `upseller` |
| access_token | text | token atual |
| refresh_token | text | refresh token |
| expires_at | timestamptz | validade da sessão |
| status | text | `active`, `expired`, `error` |

### `updates_log`
Registra execução dos jobs de coleta:

| campo | tipo | descrição |
|--------|------|-------------|
| id | uuid | PK |
| platform | text | sistema de origem |
| started_at | timestamptz | início |
| finished_at | timestamptz | fim |
| status | text | `success`, `partial`, `error` |
| notes | text | detalhes |

Essas estruturas servem de base para o Bloco 2 (ingestão real das APIs).

