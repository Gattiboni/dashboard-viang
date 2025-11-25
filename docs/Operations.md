## Operations.md (versão atualizada em 19/11/2025)

### Rotina Diária (03:00–05:00)

1. Atualização de tokens (`jobs/refresh_tokens.py`).
2. Execução do ETL **somente com Mercado Livre** (MVP).
   *Bling e Upseller entram na etapa seguinte, sem alterar o fluxo atual.*
3. Gravação de dados (`fact_sku_day`, `agg_client_day`).
4. Agregação e logs automáticos (`updates_log`).
5. Geração de relatórios e cache de IA (`insight_cache`).

### Manutenção e Auditoria

| Item       | Frequência | Ação                             | Responsável |
| ---------- | ---------- | -------------------------------- | ----------- |
| Logs       | Semanal    | Rotação e backup                 | Sistema     |
| Tokens     | Diária     | Auditoria e renovação automática | Sistema     |
| Backups    | Diária     | Exportação Supabase via API      | Supabase    |
| Relatórios | Mensal     | Envio automático via SMTP        | Sistema     |

### Hospedagem

| Camada   | Local              | Função                                       |
| -------- | ------------------ | -------------------------------------------- |
| Frontend | HostGator          | Página estática e embed do Metabase          |
| Backend  | Supabase Functions | Rotinas automáticas e ETL focado em ML (MVP) |
