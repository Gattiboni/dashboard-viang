# ChangeLog — Histórico de Alterações do Projeto

Este documento consolida todas as mudanças realizadas no projeto, preservando integralmente o conteúdo original, mas reorganizado de forma dissertativa para facilitar leitura, manutenção e continuidade.  
As entradas estão registradas por ordem cronológica e mantêm versão, data, descrição e autor.

---

## v0.1.0 — 2025-11-07  
### Estrutura  
Criação inicial do repositório, definição da organização base e estrutura de diretórios, incluindo documentação fundamental para orientar as etapas posteriores do desenvolvimento.  
**Responsável:** Gattiboni

---

## v0.2.0 — 2025-11-07  
### Backend  
Implementação das pastas `etl`, `jobs`, `models`, `services` e `logs`, estabelecendo a base do backend e adicionando o arquivo `backend/README.md` para orientar padrões internos.  
**Responsável:** Gattiboni

---

## v0.3.0 — 2025-11-07  
### Arquitetura  
Formalização da arquitetura do sistema, contemplando HostGator (frontend), Supabase (banco e funções), Metabase (visualização) e Python/Make (ETL).  
Definição dos fluxos de automação por IA que apoiam o desenvolvimento orientado à documentação.  
**Responsável:** Gattiboni

---

## v0.4.0 — 2025-11-13  
### Infraestrutura  
Configuração do ambiente Metabase no Railway, incluindo provisionamento via Docker, PostgreSQL dedicado e validação do acesso por domínio.  
**Responsável:** Gattiboni

---

## v0.5.0 — 2025-11-13  
### Dados  
Criação do schema `dashboard` no Supabase e inclusão das tabelas fundamentais `api_tokens` e `updates_log`, que servem de base para a ingestão via ETL.  
**Responsável:** Gattiboni

---

## v0.6.0 — 2025-11-19  
### Escopo  
Ajuste do escopo do MVP para concentrar os esforços iniciais exclusivamente nos dados do Mercado Livre, enquanto Bling e Upseller aguardam autorização.  
Documentação e processo revisados para manter continuidade sem bloqueios.  
**Responsável:** Gattiboni

---

## v0.7.0 — 2025-11-25  
### Dados  
Sanitização completa da tabela `api_tokens`, correção de `client_id` duplicados, normalização de `display_name` e ajuste de `user_id` dos clientes Mercado Livre.  
Base consolidada e pronta para ingestão de dados.  
**Responsável:** Gattiboni

---

## 2025-11-27 — Frontend: Migração para Vite e Revisão da Arquitetura

### Adicionado  
- Estrutura inicial definida para migração completa do template estático do DashboardPack para um projeto Vite.  
- Processo oficial adotado: desenvolvimento guiado por wireframes, seleção explícita de componentes e mapeamento de integração antes de qualquer execução via Codex.  
- Registro formal da decisão de adotar Vite como base arquitetural do frontend.  
- Pastas reorganizadas para permitir evolução incremental com `/frontend/dashboardpack` migrando para estrutura modular.

### Alterado  
- Estratégia “template plug-and-play” substituída por arquitetura incremental utilizando bundler moderno.  
- Processo de autorização Mercado Livre atualizado: ativação de **todas** as permissões disponíveis antes de reenviar links OAuth.  
- Reautorização dos clientes Mercado Livre ajustada para regenerar tokens e validar novos escopos no Supabase.

### Corrigido  
- Falha do `npm run dev` do template vanilla (ausência do arquivo `dev-watch.js`) substituída por abordagem arquitetural correta baseada em Vite.  
- Mitigação do risco de inconsistências no frontend por automações sem estrutura prévia (implementação do pipeline wireframe → componentes → mapeamento → IA).

### Relacionado  
- Decisão 011: Adoção de Vite como base do frontend.  
- Decisão 012: Pipeline estruturado de wireframe → componentes → IA.  
- Decisão 013: Reautorização forçada dos clientes ML devido a erro 403 persistente.

---

*(Novas entradas devem seguir o formato dissertativo, mantendo integridade histórica e sem remoção de versões anteriores.)*
