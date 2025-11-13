# Infraestrutura — Metabase

Este documento descreve o ambiente de execução do Metabase utilizado no Dashboard Viang.

---

## 1. Ambiente

O Metabase é executado via Docker no Railway.

**Serviço:** `metabase-app-2`  
**Imagem:** `metabase/metabase:latest`  
**Porta interna:** `3000`  
**Domínio público:**  
`https://metabase-app-2-production.up.railway.app/`

Banco de dados **exclusivo** para o Metabase:  
Serviço `metabase-postgres-viang`

---

## 2. Variáveis configuradas

| Variável | Valor |
|---------|-------|
| MB_DB_TYPE | postgres |
| MB_DB_HOST | postgres.railway.internal |
| MB_DB_PORT | 5432 |
| MB_DB_DBNAME | railway |
| MB_DB_USER | postgres |
| MB_DB_PASS | (senha do Postgres Railway) |
| MB_SITE_LOCALE | pt_BR |
| MB_EMAIL_ADDRESS | alanggattiboni@gmail.com |
| MB_PASSWORD_COMPLEXITY | strict |
| MB_PASSWORD_LENGTH | 10 |

---

## 3. Configurações internas realizadas

- Timezone: **America/Sao_Paulo**  
- Moeda: **BRL (R$)**  
- Data/hora: **DD/MM/YYYY, 24h**  
- Login via Google: **desativado**  
- Cadastro automático de usuários: **desativado (padrão OSS)**  
- Permissões futuras serão gerenciadas manualmente

---

## 4. Backup e segurança

- Railway executa backup automático do Postgres  
- Volume persistente no container do Postgres  
- Metabase OSS sem dependência externa  
- Supabase permanece como camada oficial de dados

---

## 5. Próximos passos

- Conectar o Supabase ao Metabase após criação das tabelas de ingestão  
- Criar dashboards iniciais no Bloco 3  
