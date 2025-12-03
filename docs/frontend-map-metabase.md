## Metabase → Frontend Map (MVP)

### Convenção de containers (travado)
- Container por embed: `#mb-<page>--<section>`
- Exemplo: `#mb-overview--dashboard`

---

### Mapeamento

## Mapeamento (MVP)

### Overview
- secao_wireframe: Painel principal (dashboard completo)
- componente: MetabaseEmbed
- caminho: /components/metabase-embed/
- tipo: embed-estático (JWT)
- metabase:
  - site_url: https://metabase-production-21b7.up.railway.app
  - dashboard_id: 2
  - embed_hash: "#background=false&bordered=false&titled=false"
- parametros: []
- container_destino: "#mb-overview--dashboard"

### Clientes
- secao_wireframe: Painel principal (dashboard completo)
- componente: MetabaseEmbed
- caminho: /components/metabase-embed/
- tipo: embed-estático (JWT)
- metabase:
  - site_url: https://metabase-production-21b7.up.railway.app
  - dashboard_id: 3
  - embed_hash: "#background=false&bordered=false&titled=false"
- parametros: []
- container_destino: "#mb-clientes--dashboard"

### Produtos
- secao_wireframe: Painel principal (dashboard completo)
- componente: MetabaseEmbed
- caminho: /components/metabase-embed/
- tipo: embed-estático (JWT)
- metabase:
  - site_url: https://metabase-production-21b7.up.railway.app
  - dashboard_id: 4
  - embed_hash: "#background=false&bordered=false&titled=false"
- parametros: []
- container_destino: "#mb-produtos--dashboard"

### Financeiro
- secao_wireframe: Painel principal (dashboard completo)
- componente: MetabaseEmbed
- caminho: /components/metabase-embed/
- tipo: embed-estático (JWT)
- metabase:
  - site_url: https://metabase-production-21b7.up.railway.app
  - dashboard_id: 5
  - embed_hash: "#background=false&bordered=false&titled=false"
- parametros: []
- container_destino: "#mb-financeiro--dashboard"

### Integração
- secao_wireframe: Painel principal (dashboard completo)
- componente: MetabaseEmbed
- caminho: /components/metabase-embed/
- tipo: embed-estático (JWT)
- metabase:
  - site_url: https://metabase-production-21b7.up.railway.app
  - dashboard_id: 6
  - embed_hash: "#background=false&bordered=false&titled=false"
- parametros: []
- container_destino: "#mb-integracao--dashboard"

### Logs ETL
- secao_wireframe: Painel principal (dashboard completo)
- componente: MetabaseEmbed
- caminho: /components/metabase-embed/
- tipo: embed-estático (JWT)
- metabase:
  - site_url: https://metabase-production-21b7.up.railway.app
  - dashboard_id: 7
  - embed_hash: "#background=false&bordered=false&titled=false"
- parametros: []
- container_destino: "#mb-logs-etl--dashboard"
