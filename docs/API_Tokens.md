# API Tokens — Estrutura Completa por Plataforma  
*(Arquivo atualizado conforme solicitação do Gattiboni)*

---

# Estrutura Geral (Mantida + Expandida)

A tabela `dashboard.api_tokens` é utilizada para armazenar informações de autenticação e metadados das três integrações:

- Mercado Livre  
- Bling  
- Upseller  

Ela continua funcionando como núcleo do fluxo de autenticação, mas agora passa a conter também campos adicionais necessários para listagem completa de clientes e seus metadados.

---

## Estrutura da Tabela `api_tokens` (Expandida)

| Campo                  | Tipo          | Plataforma      | Descrição |
|------------------------|---------------|------------------|-----------|
| id                     | UUID          | Todas            | Chave primária interna |
| client_id              | UUID          | Todas            | Identificador do cliente (multi-tenant) |
| platform               | Text          | Todas            | `mercado_livre`, `bling`, `upseller` |
| user_id                | Bigint/Text   | ML / Bling       | ID do usuário (ML: seller_id) |
| access_token           | Text          | ML / Bling       | Token de acesso |
| refresh_token          | Text          | ML / Bling       | Token de renovação |
| api_key                | Text          | Upseller         | API KEY da conta principal |
| expires_at             | Timestamptz   | ML / Bling       | Expiração do token |
| status                 | Text          | Todas            | `active`, `pending`, `error` |
| created_at             | Timestamptz   | Todas            | Criado automaticamente |
| updated_at             | Timestamptz   | Todas            | Atualizado automaticamente |

---

# Campos Adicionais por Plataforma  
*(Todos estes campos devem ficar NULL caso a plataforma ainda não esteja integrada)*

---

# Mercado Livre  
*(via `/users/{user_id}` — todos esses campos são oficiais na API)*

| Campo                  | Tipo | Descrição |
|------------------------|------|-----------|
| ml_nickname            | Text | Nickname público do vendedor |
| ml_first_name          | Text | Primeiro nome |
| ml_last_name           | Text | Sobrenome |
| ml_email               | Text | Email cadastrado |
| ml_phone               | Text | Telefone |
| ml_seller_status       | Text | Classificação do vendedor |
| ml_points              | Int  | Pontuação de reputação |
| ml_site_id             | Text | Ex.: `MLB` |
| ml_perma_link          | Text | URL pública da loja do vendedor |
| ml_logo                | Text | URL da imagem/perfil |

---

# Bling  
*(via `/usuario` e `/empresa` — dados cadastrais oficiais do ERP)*

| Campo                       | Tipo | Descrição |
|-----------------------------|------|-----------|
| bling_company_id            | Int  | ID da empresa |
| bling_company_name          | Text | Razão Social |
| bling_cnpj                  | Text | CNPJ |
| bling_email                 | Text | Email da conta |
| bling_telefone              | Text | Telefone |
| bling_endereco              | Text | Endereço completo |
| bling_inscricao_estadual    | Text | IE/Isento |
| bling_owner_name            | Text | Nome do responsável pela conta |

---

# Upseller  
*(via `/account` e `/profile` — dados administrativos da plataforma)*

| Campo                     | Tipo | Descrição |
|---------------------------|------|-----------|
| upseller_account_id       | Text | ID da conta principal |
| upseller_account_name     | Text | Nome da loja |
| upseller_owner_email      | Text | Email do responsável |
| upseller_owner_phone      | Text | Telefone |
| upseller_store_url        | Text | URL da loja |
| upseller_plan             | Text | Plano contratado |

---

# Processo de Atualização (Expandido)

1. Carregar tokens ativos (ML/Bling) ou API KEY (Upseller).  
2. Chamar APIs:  
   - ML → `/users/{user_id}`  
   - Bling → `/usuario` e `/empresa`  
   - Upseller → `/account` e `/profile`  
3. Preencher/atualizar colunas adicionais.  
4. Registrar execução no `updates_log`.  
5. Rodar tudo automaticamente na janela 03h–05h.

---

# Segurança

- Tokens e chaves nunca são logados.  
- `.env` continua fora do versionamento.  
- Possível migração futura para Supabase Vault.  
- Exposição controlada no Metabase.

---

# Observações Importantes

- Campos de Bling e Upseller ficam `NULL` até a autorização.  
- Documento NÃO removeu nada da versão original.  
- Estrutura está pronta para `vw_clientes`, CRM e expansão futura.

