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

## v0.8.0 — 2025-12-01  
### Frontend: Definição da Base Técnica e Preparação para Implementação

### Adicionado  
- Entrada formal no DecisionLog definindo **Vite Vanilla** como base do frontend.  
- Diretriz oficial para uso do template DashboardPack sem migração para frameworks.  

### Alterado  
- Atualização da documentação do frontend para refletir a estrutura Vite Vanilla.  
- Alinhamento do wireframe v2 com a abordagem de desenvolvimento baseada em HTML/CSS/JS modular via Vite.  

### Impacto  
- O frontend passa a ter caminho técnico definitivo e compatível com o template adquirido.  
- Fluxo de implementação dos componentes e páginas liberado para iniciar imediatamente.  
- Riscos de incompatibilidade com frameworks eliminados.  
  

---

## v0.9.0 — 2025-12-02
### Frontend: Seleção e Consolidação das Páginas-Base do Template Admindek

### Adicionado  
- Registro oficial das páginas-base do template Admindek que serão utilizadas para construir as telas do Dashboard Viang.  
- Inclusão da decisão técnica correspondente (Decisão 015).

### Alterado  
- Alinhamento da estrutura do frontend para garantir compatibilidade direta entre o template estático e o projeto Vite Vanilla.  
- Ajuste do planejamento do Bloco 2 para seguir unicamente as páginas aprovadas.

### Impacto  
- Redução de retrabalho na migração do template.  
- Base sólida para componentização, recortes HTML e implementação incremental.  
- Liberação para o início da implementação da tela Overview.

---

## v0.9.1 — 2025-12-02
### Metabase: habilitação de incorporação estática e preparação para embeds assinados

### Adicionado
- Configuração de incorporação estática (iframe) habilitada no Metabase.
- Variáveis de ambiente para suporte a embed assinado:
  - `METABASE_SITE_URL`
  - `METABASE_EMBED_SECRET_KEY`

### Alterado
- Estratégia de incorporação do Metabase no MVP: embeds passam a ser gerados de forma assinada (JWT) via backend, evitando exposição de segredos no frontend.

### Impacto
- Liberação do fluxo de mapeamento Metabase → componentes (Bloco 3).
- Preparação para rota backend responsável por assinar URLs de embed.


----

## v0.10.0 — 2025-12-11  
### Ajuste de Escopo do MVP: Publicidade e Financeiro Marcados como “Em Breve”

### Adicionado  
- Inclusão do estado oficial **“Em breve”** nas abas **Publicidade** e **Financeiro**, mantendo a navegação e o wireframe v2 sem alterações estruturais.  
- Registro documentado da impossibilidade técnica de integrar **Mercado Ads via API pública**, conforme testes realizados e validação de escopo.  
- Registro formal de que os módulos financeiros dependem da integração com ERPs (Bling / Upseller), planejada para fases posteriores.

### Alterado  
- Atualização do escopo do MVP para refletir que as métricas de **Ads** e **Financeiro** não serão populadas por API no estágio atual.  
- Ajuste da documentação e arquitetura de dados para deixar explícito que essas abas só exibirão informações quando as integrações externas forem habilitadas.

### Impacto  
- Wireframe e frontend permanecem intactos, evitando retrabalho e garantindo consistência visual.  
- As abas passam a exibir mensagem de disponibilidade futura, prevenindo gráficos vazios, métricas nulas ou interpretações incorretas.  
- O ETL ML continua focado apenas nos dados efetivamente disponíveis via API.  
- A documentação do projeto permanece alinhada ao escopo real do MVP, reduzindo riscos de desenvolvimento desalinhado.

---

## [2025-12-11] Remoção completa do frontend e preparação para reconstrução

**Alteração:**  
Exclusão total da pasta `frontend` após diagnóstico de estrutura corrompida e pipeline de build inconsistente.

**Motivo:**  
O frontend acumulava configurações equivocadas, dependências quebradas e ausência de conformidade com o template Admindek. A persistência de falhas tornou mais eficiente reconstruir do zero do que tentar recuperar a versão existente.

**Resultado:**  
Repositório limpo e pronto para implementação correta do frontend baseado no Admindek original, seguindo a documentação oficial do projeto.

---

## v0.11.0 — 2025-12-14  
### Dados: Backfill Pontual de Histórico Mercado Livre (MVP)

### Adicionado  
- Execução de backfill pontual dos dados do Mercado Livre, cobrindo uma janela fixa de **30 dias**, com o objetivo de restaurar histórico mínimo para análises comparativas no MVP.  
- Consolidação do histórico inicial nas tabelas factuais do schema `dashboard`, respeitando integralmente o modelo de dados existente.  

### Alterado  
- Nenhuma alteração estrutural realizada no schema, tabelas, ETL diário ou arquitetura geral do sistema.  

### Impacto  
- A Home do Dashboard passa a operar com dados históricos suficientes para leitura de tendência e cálculo de deltas por período.  
- Seletores de período (7 / 30 dias) tornam-se plenamente funcionais desde o MVP.  
- Valor percebido da ferramenta significativamente ampliado, sem introdução de dívida técnica ou retrabalho futuro.  
- Arquitetura permanece incremental, modular e alinhada às decisões previamente documentadas.

---

## v1.0.0 — 2025-12-14  
### Implementação do Backfill para Onboarding de Novos Clientes  

**Adicionado**  
- Arquivo `ml_etl_backfill_onboarding.py` adicionado ao fluxo de onboarding.  
- A partir do OAuth do Mercado Livre (ML), o backfill será executado para novos clientes, preenchendo os dados históricos nos últimos 30 dias.

**Alterado**  
- O fluxo de onboarding foi atualizado para incluir a execução do backfill após o OAuth.  
- O cliente agora será marcado como "ativo" após a conclusão do backfill e a credencial do cliente será configurada.

**Impacto**  
- O backfill para novos clientes será integrado automaticamente no processo de onboarding.  
- Nenhuma modificação nas rotinas do ETL diário foi necessária.  
- Fluxo de onboarding mais fluido e pronto para clientes com dados históricos.

# Instruções para o Fluxo de Onboarding

## Após a conclusão do OAuth com o Mercado Livre (ML):

- **Salvar token:** Salve o token recebido após a autorização do cliente.

- **Marcar cliente como ativo:** O cliente será marcado como ativo no sistema após a execução do backfill.

## Configuração do ambiente:
- Configure a variável de ambiente `BACKFILL_CLIENT_ID=<uuid_do_cliente>`.

## Rodar o script de backfill:
- Execute o comando abaixo para iniciar o processo de backfill para o novo cliente:

```bash
python ml_etl_backfill_onboarding.py
```

Esse processo garantirá que os dados históricos dos últimos 30 dias sejam carregados para o cliente no Supabase, populando as tabelas de dados relevantes (`fact_sku_day`, `agg_client_day`, `raw_events`), sem a necessidade de ações manuais.

---

### [2025-12-14] Views SQL para leitura e enriquecimento de dados Mercado Livre

**Adicionado:**
- View `vw_ml_order_items_flat`  
  Flatten dos pedidos do Mercado Livre a partir de `raw_events.payload`, explorando corretamente:
  - `payload.results[]`
  - `order_items[]`
- View `vw_ml_client_day_enriched`  
  Agregação diária por cliente com métricas derivadas (receita bruta, pedidos, ticket médio)
- View `vw_ml_viang_day`  
  Visão executiva agregada da operação (base da Home)
- View `vw_ml_top_skus`  
  Ranking de SKUs por unidades vendidas
- View `vw_ml_category_day`  
  Agregação por categoria para gráficos e hierarquia de produtos

**Observações:**
- Nenhuma modificação realizada nos ETLs existentes
- Views passam a refletir automaticamente dados do ETL diário e dos backfills (inclusive onboarding)
- Correção aplicada para leitura adequada do JSON do endpoint `/orders/search` (estrutura `results[]`)

**Estado atual:**
- Dados populados e validados
- Prontos para consumo no Metabase e frontend


---

## v1.1.0 — 2025-12-15  
### BI / Metabase: Consolidação da Home do Dashboard (MVP)

### Adicionado  
- Definição operacional completa da Home do Dashboard Viang no Metabase, utilizando exclusivamente **GUI Questions**, conectadas a um **único filtro global de período** em nível de dashboard.  
- Criação de ETL dedicado para **categorias do Mercado Livre**, isolado do ETL diário, populando tabela própria e permitindo leitura correta de categorias por nome em vez de código.  
- Criação de views SQL adicionais no schema `dashboard` para suporte à leitura incremental e enriquecimento sem alterar ETLs existentes.  

### Alterado  
- Estratégia inicial de KPIs totalmente em SQL foi abandonada em favor de GUI Questions, após validação prática de melhor compatibilidade com embeds e seletor global de período.  
- Ajuste do escopo da Home para refletir apenas KPIs com fonte de dados validada e comportamento consistente no Metabase.  

### Congelado (MVP)  
- **Seção 2.3 — Operação & Logística**: congelada após constatação de ausência de eventos confiáveis de despacho físico no payload atual do Mercado Livre.  
- **Seção 2.4 — Experiência & Reputação**: congelada por inexistência, no banco atual, de dados de reputação e avaliação de anúncios, apesar de endpoints previstos nos tokens OAuth.  
- **Seção 2.5 — Eficiência Operacional (Alertas Executivos)**: congelada por depender das mesmas bases de dados não disponíveis ou não confiáveis no MVP.  

### Impacto  
- A Home do Dashboard passa a exibir apenas métricas defensáveis, com dados reais e sem inferências frágeis.  
- Redução significativa de risco de ruído analítico ou questionamentos por parte de clientes.  
- Base sólida para evolução futura, permitindo reativação dos blocos congelados assim que novas fontes de dados forem integradas.  
- Arquitetura de BI alinhada com embeds assinados, seletor global de período e frontend customizado Viang.

---

## v1.2.0 — 2025-12-16  
### BI / Frontend: Investigação de Spinner Infinito em Embeds do Metabase

### Adicionado  
- Registro formal da estratégia de **isolamento do embed do Metabase** em micro-frontend dedicado para investigação e padronização.
- Consolidação empírica dos aprendizados sobre comportamento de static embeds do Metabase em ambientes complexos (templates admin + CSP).
- Documentação dos limites do embed estático em relação a erros silenciosos de cards, parâmetros obrigatórios e bootstrap interno da SPA do Metabase.

### Alterado  
- Nenhuma alteração estrutural aplicada ao AdminDek, Vite ou CSP do shell nesta versão.
- Nenhuma modificação em Metabase, Supabase ou geração de JWT.

### Impacto  
- O projeto passa a distinguir explicitamente:
  - **Shell do produto** (AdminDek / Vite)
  - **Host de embed do Metabase** (micro-frontend dedicado)
- A fase seguinte de implementação será realizada em branch separada, com foco exclusivo na validação do novo fluxo de embed.
- Redução significativa do risco de decisões arquiteturais baseadas em sintomas e não em causas reais.

---

---

## v1.3.0 — 2025-12-16  
### BI / Frontend: Saída do Metabase e Implementação de Dashboard Nativo

### Alterado  
- Abandonada a estratégia de consumo do Metabase (embeds estáticos e assinados) para a **Home do Dashboard**.  
- A Home passa a ser renderizada integralmente no frontend (AdminDek), com gráficos e KPIs implementados via JavaScript e ApexCharts.  
- O Metabase deixa de ser dependência operacional para o MVP da Home, permanecendo apenas como referência analítica e validação conceitual.

### Adicionado  
- Implementação de **Edge Functions no Supabase** para servir dados agregados da Home, seguindo o padrão:
  - **Uma Edge Function por página** (Home/Dashboard), responsável por orquestrar todas as consultas necessárias.
  - Funções SQL estáveis no schema `dashboard` como camada única de acesso a dados.
- Criação de funções SQL dedicadas para cada gráfico e KPI da Home, garantindo:
  - Rastreabilidade
  - Reprodutibilidade
  - Independência do frontend
(Atualmente elas não estão ativas nem sendo solicitados. Processo foi refeito no Supabase)

- **UM serviço novo por página deve ser criado para cada página no Railway (empty service - configs iguais às do serviço para home - dashboard)**

- Implementação dos gráficos nativos no frontend, respeitando integralmente:
  - Dicionário de dados do projeto
  - Queries validadas previamente no Metabase
  - Layout e grid do template AdminDek

### Removido  
- Uso de iframes, JWTs e fluxo de embed do Metabase na Home do Dashboard.  
- Dependência do comportamento interno do Metabase (bootstrap, filtros globais, spinner silencioso).

### Impacto  
- Redução drástica de complexidade operacional no frontend.  
- Eliminação de erros silenciosos e comportamentos imprevisíveis do embed.  
- Controle total do ciclo: **SQL → Edge Function → Frontend**.  
- Arquitetura mais modular, escalável e alinhada ao MVP congelado.  
- Base sólida para expansão futura (novas páginas, IA, comparativos), sem retrabalho.

---

## v1.4.0 — 2025-12-17  
### Autenticação & Acesso (MVP)

### Adicionado  
- Implementação completa do fluxo de **cadastro e login** utilizando Supabase Auth (Email + Password).  
- Criação das páginas dedicadas:
  - `login-viang.html`
  - `register-viang.html`
  ambas baseadas estritamente nos templates oficiais do Admindek, com ajustes mínimos e localizados.  
- Ativação de **confirmação obrigatória por e-mail** no Supabase Auth, bloqueando login antes da validação do usuário.  
- Implementação de **Auth Hook (pre-signup)** via Edge Function no Supabase para:
  - validação de domínio permitido (`@viang.com.br`)
  - exceção explícita para conta master  
- Criação da tabela `dashboard.users` para consolidação futura de permissões, hierarquia e status de conta, mantendo separação clara entre Auth e domínio da aplicação.  
- Definição e marcação da **master account** via flag explícita em tabela (`is_master`), sem impacto no fluxo MVP.  

### Frontend  
- Integração direta com Supabase Auth via **anon key**, sem exposição de segredos sensíveis.  
- Tratamento de erros de login e cadastro com mensagens formatadas para rastreabilidade.  
- Implementação de validação **UX-only** de domínio no frontend, sem qualquer papel de segurança.  

### Pendente (pós-HostGator)  
- Validação efetiva de sessão ativa em páginas internas (session guard).  
- Redirecionamento automático para login quando não houver sessão válida, dependente de domínio final e cookies reais de produção.

### Impacto  
- Fluxo de autenticação do MVP fechado de ponta a ponta, com segurança centralizada no Supabase e frontend mínimo, previsível e rastreável.  
- Nenhuma dependência de framework adicional ou lógica duplicada.  
- Base preparada para evolução futura de permissões sem retrabalho.

---

## ChangeLog — Correção de navegação e estabilização de autenticação (Frontend)

### Data
2025-12-18

### Contexto
Foi identificado um bug persistente de navegação no frontend (HostGator), no qual páginas protegidas exibiam conteúdo por um breve instante e redirecionavam imediatamente para a tela de login. O problema ocorria de forma intermitente e difícil de rastrear, mesmo após limpeza de cache, rebuilds e testes em modo anônimo.

### Persistência do erro
O erro persistia porque não estava concentrado no login ou no dashboard principal, mas sim em páginas específicas (ex.: **Produtos**) que implementavam lógica própria de autenticação. Essas páginas:
- Executavam validação assíncrona de sessão (`fetch /auth/v1/user`)
- Invalidadavam e limpavam o `localStorage` automaticamente em caso de resposta não-OK
- Redirecionavam para o login após a autenticação já ter ocorrido com sucesso

Esse padrão fazia com que o token fosse criado corretamente no login, mas removido logo na primeira navegação subsequente, produzindo o efeito de “piscar e chutar”.

### Mudanças adotadas
- Padronização absoluta do mecanismo de autenticação no frontend
- Remoção de qualquer validação assíncrona de sessão no MVP
- Proibição de limpeza automática de `localStorage` fora do fluxo explícito de logout
- Definição de um **authGate canônico, síncrono e minimalista**, baseado apenas na existência do token local
- Reorganização estrutural das páginas para garantir que o `authGate` seja executado antes de qualquer `@@include` ou script de layout

### Resultado
A navegação tornou-se previsível, estável e reproduzível em todas as páginas, eliminando redirecionamentos inesperados e efeitos colaterais relacionados a estado de sessão.

### Referências
- Documento: `docs/checklist-pre-build-proven.md`

---

*(Novas entradas devem seguir o formato dissertativo, mantendo integridade histórica e sem remoção de versões anteriores.)*
