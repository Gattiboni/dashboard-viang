## ChangeLog.md

### Registro de Versões

| Data       | Versão | Tipo        | Descrição                                                                                                       | Responsável |
| ---------- | ------ | ----------- | --------------------------------------------------------------------------------------------------------------- | ----------- |
| 2025-11-07 | v0.1.0 | Estrutura   | Criação do repositório, estrutura de diretórios e base documental                                               | Gattiboni   |
| 2025-11-07 | v0.2.0 | Backend     | Criação de pastas `etl`, `jobs`, `models`, `services`, `logs` e inclusão de `backend/README.md`                 | Gattiboni   |
| 2025-11-07 | v0.3.0 | Arquitetura | Definição de camadas (HostGator + Supabase + Metabase + Python/Make) e fluxos de IA                             | Gattiboni   |
| 2025-11-13 | v0.4.0 | Infra       | Configuração do ambiente Metabase em Railway (Docker + PostgreSQL dedicado) e validação de acesso via domínio  | Gattiboni   |
| 2025-11-13 | v0.5.0 | Dados       | Criação do schema `dashboard` no Supabase e inclusão das tabelas base `api_tokens` e `updates_log` para ETL    | Gattiboni   |
| 2025-11-19 | v0.6.0 | Escopo | Ajuste do escopo do MVP para avançar com dados exclusivos do Mercado Livre enquanto Bling e Upseller aguardam autorização. Documentação e processo atualizados, garantindo continuidade sem bloqueio. | Gattiboni   |
| 2025-11-25 | v0.7.0 | Dados | Sanitização da tabela `api_tokens`, correção de `client_id` duplicados, normalização de `display_name` e ajuste de `user_id` dos clientes integrados ao Mercado Livre. Base consolidada e apta para ingestão. | Gattiboni |

*(Novas entradas devem seguir formato fixo, uma linha por release, sem apagar versões anteriores.)*
