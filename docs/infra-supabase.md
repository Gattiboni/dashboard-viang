# Infraestrutura — Supabase

Este documento descreve a infraestrutura Supabase utilizada pelo projeto Dashboard VIANG,
incluindo instância, schema, tabelas, views e responsabilidades atuais.

O conteúdo reflete o **estado real, validado e em uso** após:
- implementação do ETL Mercado Livre
- backfill completo (30 dias)
- criação da camada de leitura via views SQL
- integração ativa com Metabase

---

## Instância

- URL: https://cbnisuoocsrhdqdpmips.supabase.co
- Projeto: Supabase Cloud
- Região: (gerenciada pelo Supabase)
- Schema dedicado: `dashboard`

---

## Schema `dashboard`

O schema `dashboard` é o **único schema utilizado pelo projeto** para:
- ingestão de dados
- armazenamento de fatos
- leitura analítica (views)
- consumo pelo Metabase e frontend

---

## Tabelas Atuais

### Tabelas de Ingestão e Fato

- `raw_events`  
  Armazena respostas completas das APIs externas (principalmente Mercado Livre),
  em formato `jsonb`.  
  É a **fonte de verdade auditável** do projeto.

- `fact_sku_day`  
  Tabela factual diária por SKU, populada via ETL.  
  Mantida por estabilidade e compatibilidade futura.

- `agg_client_day`  
  Snapshot diário agregado por cliente, populado via ETL.

---

### Tabelas de Controle e Operação

- `api_tokens`  
  Controle de tokens OAuth e estado das integrações por cliente.

- `updates_log`  
  Registro de execuções dos ETLs (diário, backfill, onboarding).

- `insight_cache`  
  Tabela reservada para cache futuro de análises automáticas (IA).  
  **Fora do escopo do MVP**, mas já prevista na arquitetura.

---

## Views de Leitura (Camada Analítica)

As views abaixo compõem a **camada oficial de leitura do MVP**.
Nenhuma view altera dados; todas consomem `raw_events` e/ou tabelas factuais.

### Views Mercado Livre

- `vw_ml_order_items_flat`  
  Flatten do JSON retornado pelo endpoint `/orders/search`, explorando corretamente:
  - `payload.results[]`
  - `order_items[]`

- `vw_ml_client_day_enriched`  
  Agregação diária por cliente com métricas derivadas:
  - receita bruta
  - unidades vendidas
  - pedidos
  - ticket médio

- `vw_ml_viang_day`  
  Visão executiva agregada da operação (base da Home).

- `vw_ml_top_skus`  
  Ranking de SKUs por unidades vendidas.

- `vw_ml_category_day`  
  Agregação diária por categoria de produto.

---

## Integração com Metabase

- O Metabase está conectado diretamente ao Supabase.
- Consome **exclusivamente views e tabelas do schema `dashboard`**.
- Nenhum dashboard do MVP acessa:
  - dados de ERP
  - dados de Publicidade / Ads

A conexão com o Metabase, antes planejada para etapa futura, encontra-se **ativa e validada** :contentReference[oaicite:0]{index=0}.

---

## Estratégia Arquitetural (Estado Atual)

- O ETL é responsável apenas por:
  - ingestão
  - persistência
  - transformações mínimas e estáveis
- A inteligência de leitura está concentrada em:
  - views SQL
  - dashboards do Metabase
- Essa separação:
  - reduz risco de regressão
  - facilita backfills e onboarding
  - permite evolução incremental sem refatorações grandes

---

## Considerações Importantes

- Publicidade e Financeiro (ERP) **não fazem parte do MVP**
- Novos endpoints (logística detalhada, reclamações, perguntas, estoque)
  serão integrados pós-MVP, respeitando o mesmo padrão:
  - raw_events → views → dashboards
- O schema atual está preparado para escalar de:
  - poucos clientes (MVP)
  - para centenas ou milhares, sem mudança estrutural

---

Estado do documento: **ATUALIZADO E VALIDADO (14/12/2025)**.
