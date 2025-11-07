## API_Tokens.md

### Estrutura

| Campo         | Tipo      | Descrição                                |
| ------------- | --------- | ---------------------------------------- |
| client_id     | UUID      | Identificador do cliente                 |
| platform      | Texto     | Nome da plataforma (ML, Bling, Upseller) |
| access_token  | Texto     | Token de acesso atual                    |
| refresh_token | Texto     | Token de renovação                       |
| expires_at    | Timestamp | Data de expiração                        |
| status        | Texto     | Ativo / Expirado / Erro                  |

### Processo de Atualização

1. Checagem diária de validade.
2. Renovação automática via API.
3. Atualização de campos no Supabase.
4. Registro de resultado no `updates_log`.

### Segurança

* Criptografia AES no armazenamento.
* Nenhum token salvo em texto plano.
* `.env` fora do versionamento.
