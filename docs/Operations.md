## Operations.md

### Rotina Diária (03:00–05:00)

1. Atualização de tokens (`jobs/refresh_tokens.py`).
2. Execução de ETL (APIs Mercado Livre, Bling, Upseller).
3. Gravação de dados (`fact_sku_day`, `agg_client_day`).
4. Agregação e logs automáticos.
5. Geração de relatórios e cache de IA.

### Manutenção e Auditoria

| Item       | Frequência | Ação                             | Responsável |
| ---------- | ---------- | -------------------------------- | ----------- |
| Logs       | Semanal    | Rotação e backup                 | Sistema     |
| Tokens     | Diária     | Auditoria e renovação automática | Sistema     |
| Backups    | Diária     | Exportação Supabase via API      | Supabase    |
| Relatórios | Mensal     | Envio automático via SMTP        | Sistema     |

### Hospedagem

| Camada   | Local              | Função                           |
| -------- | ------------------ | -------------------------------- |
| Frontend | HostGator          | Landing page e Metabase embutido |
| Backend  | Supabase Functions | Rotinas automáticas e ETL        |