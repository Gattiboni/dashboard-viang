## DecisionLog.md

### Entradas de Decisão Técnica

**001 — 2025-10-25**  
**Decisão:** Uso de Supabase como banco principal  
**Contexto:** Escalabilidade, custo zero no MVP e API nativa REST  
**Consequência:** Simplificação do backend e menor carga de manutenção  

**002 — 2025-10-26**  
**Decisão:** Metabase self-hosted (HostGator)  
**Contexto:** Reduzir custo do Metabase Cloud  
**Consequência:** Controle total de visual e autenticação  

**003 — 2025-10-28**  
**Decisão:** Estrutura client-centric incremental  
**Contexto:** Padrão único de dados para todos os clientes  
**Consequência:** Facilita clusterização e comparabilidade  

**004 — 2025-11-05**  
**Decisão:** Cache de 24h para IA  
**Contexto:** Reduz custo de tokens e latência  
**Consequência:** Controle previsível de uso e resposta instantânea  

**005 — 2025-11-06**  
**Decisão:** Frontend HTML + iframes Metabase  
**Contexto:** Eliminar dependência de framework  
**Consequência:** Deploy rápido e manutenção mínima  

**006 — 2025-11-12**  
**Decisão:** Criação do schema dedicado `dashboard` no Supabase  
**Contexto:** Organizar separação lógica das tabelas do projeto e evitar mistura com o schema `public`  
**Consequência:** Estrutura mais modular, isolamento do produto e base pronta para expansão futura (CRM + IA)  

---

### Decisão 007 — 2025-11-XX  
#### Definição da Infraestrutura do Metabase e Integração com o Supabase

**Contexto**  
Durante a execução do Bloco 1, tornou-se necessário definir o ambiente final de BI que suportará o MVP e a evolução futura (fase CRM + IA). Três opções foram avaliadas:

1. HostGator (ambiente atual da Aline) — inviável por não permitir execução persistente de aplicações.  
2. Metabase Cloud — funcional, mas com custo proibitivo para um MVP.  
3. Deployment containerizado no Railway — baixo custo, flexível e modular.

**Decisão**  
Adotar o Railway como ambiente oficial de execução do Metabase (Open Source), com a seguinte arquitetura:

- Container Docker `metabase/metabase:latest`  
- Banco PostgreSQL dedicado exclusivamente ao Metabase  
- Networking interno na porta 3000  
- Backups automatizados providos pelo Railway

**Motivos**  
- Custo muito inferior ao Metabase Cloud  
- Deploy simplificado e reprodutível  
- Isolamento completo entre BI e Data Warehouse  
- Facilidade de escalar ou migrar no futuro  
- Zero dependência da hospedagem compartilhada HostGator

**Impacto**  
- Metabase em ambiente isolado e estável  
- Domínio público operacional:  
  https://metabase-app-2-production.up.railway.app/  
- Documentação e configuração concluídas  
- Supabase permanece como **fonte única de verdade** (DW do projeto)

---

### Decisão 008 — 2025-11-XX  
#### Estruturação do Schema `dashboard` no Supabase

**Contexto**  
Para organizar a ingestão das APIs (Mercado Livre, Bling e Upseller), tornou-se necessário separar logicamente as tabelas do projeto, evitando uso do schema `public` e preparando terreno para evolução futura.

**Decisão**  
Criar o schema dedicado `dashboard` no Supabase e iniciar sua estrutura base:

- Tabela `api_tokens`  
- Tabela `updates_log`  
- Tabelas de staging serão adicionadas no Bloco 2 conforme as APIs forem integradas

**Motivos**  
- Separação clara entre dados operacionais e dados de ingestão  
- Evita colisões com tabelas internas do Supabase  
- Facilita governança, manutenção e auditoria  
- Permite expansão futura para módulos adicionais (CRM, IA, monitoramento)

**Impacto**  
- Estrutura pronta para ingestão do Bloco 2  
- Metabase poderá consumir esse schema com permissões específicas  
- Base organizada, modular e alinhada ao padrão técnico definido no projeto

---

### Decisão 009 — 2025-11-19

#### Ajuste de Escopo do MVP: Continuidade com Mercado Livre enquanto Bling e Upseller aguardam autorização

**Contexto**
Durante a integração das APIs externas, clientes apresentaram dificuldade em concluir o fluxo OAuth do Bling, inviabilizando a coleta imediata desses dados. A dependência direta dessas autorizações criou risco de travamento do cronograma do MVP.

**Decisão**
Prosseguir o MVP utilizando exclusivamente os dados extraídos do **Mercado Livre**, que já possui tokens ativos e totalmente funcionais no Supabase. A integração com **Bling** e **Upseller** será movida para a próxima etapa do projeto, sem comprometer os dashboards principais e a camada de IA.

**Motivos**

* Evitar bloqueio do projeto por fatores externos (clientes que não completaram OAuth).
* Garantir entrega do MVP dentro do prazo.
* As métricas essenciais (vendas, margem, reputação, Ads, SKU performance) já são completamente extraídas do ML.
* A posterior inclusão de Bling e Upseller não altera a estrutura já criada (views, ETL e schema).

**Impacto**

* O MVP continua funcional e com dados reais.
* A documentação e o ETL permanecem consistentes com o modelo client‑centric.
* Bling e Upseller entram como **Bloco 4** ou **Fase 2**, sem retrabalho no que já está pronto.

---

### Decisão 010 — 2025-11-25  
#### Padronização do Modelo de Autorização Mercado Livre, Saneamento de Tokens, Correção de Schemas e Consolidação dos Clientes

**Contexto**  
Durante a implementação da integração OAuth com o Mercado Livre, a Edge Function `ml_oauth_callback` apresentou comportamentos inconsistentes devido à ausência de variáveis de ambiente, schema não exposto ao runtime, problemas de permissões e divergências na estrutura de dados do schema `dashboard`.  
Diversos registros incorretos foram gerados nas tentativas iniciais antes do ajuste completo do fluxo, resultando em duplicações de `client_id`, divergências de `user_id`, registros de teste e inconsistência na identificação dos clientes.  
Após a correção de todos os componentes do fluxo OAuth (incluindo troca de token, configuração do cliente Supabase e upsert no schema correto), tornou-se necessário consolidar e padronizar todos os registros.

**Decisão**  
- Expor o schema `dashboard` no Supabase e configurar o cliente com `db: { schema: 'dashboard' }` para garantir acesso consistente.  
- Corrigir a Edge Function, incluindo: atualização de segredos via CLI, ajuste do callback OAuth, validação dos parâmetros retornados pelo Mercado Livre e ajuste da operação `upsert` com constraint única (`client_id, platform`).  
- Eliminar registros antigos, inválidos ou originados durante testes (incluindo `client_id` antigos da TOH e Eletrohalen).  
- Unificar registros duplicados, tomando como verdade os tokens obtidos via autorização real dos clientes.  
- Corrigir e padronizar `display_name` e `user_id` de todos os clientes, incluindo a formalização da Viang como cliente interno.  
- Estabelecer um modelo único de identificação para cada cliente, garantindo integridade entre `client_id`, `user_id` e `display_name`.

**Motivos**  
- Remover ruído e inconsistências deixadas pelo período de implantação.  
- Garantir que o fluxo OAuth opere exclusivamente com dados válidos.  
- Preparar a base para o início do ETL e jobs de refresh de token.  
- Evitar problemas futuros de sincronização e ingestão analítica.  
- Melhorar rastreabilidade, manutenção e auditoria dos tokens.

**Impacto**  
- Integração Mercado Livre validada em produção, com fluxo completo operacional.  
- Estrutura do schema `dashboard` consolidada e sem duplicidades.  
- Todos os clientes ativos corretamente identificados: Fuji, Ballon Kids, TOH, Eletrohalen e Viang.  
- Tokens válidos salvos corretamente e prontos para uso no ETL.  
- Redução significativa de erros futuros nos jobs de atualização de token e no pipeline de ingestão.  

---

### Decisão 011 — 2025-11-27  
#### Adoção de Vite como base do Frontend e Descontinuação do Template Estático

**Contexto**  
O template adquirido no DashboardPack utiliza HTML/JS estático, sem bundler, sem servidor de desenvolvimento e sem modularidade real. O script `npm run dev` referenciava arquivos inexistentes, confirmando que o template não foi projetado para uso incremental ou integração profissional. Com a evolução prevista do dashboard, necessidade de modularização, integração com componentes reutilizáveis e manutenção futura, tornou-se inviável depender de estrutura estática ou Live Server.

**Decisão**  
Adotar **Vite** como estrutura oficial do frontend, criando um projeto modular que permita:  
- Build incremental  
- Organização por componentes e páginas  
- Injeção estruturada dos iframes do Metabase  
- Manutenção e escalabilidade  
- Deploy limpo para HostGator  
O template original será migrado para o projeto Vite apenas como base visual (HTML/CSS/JS).

**Motivos**  
- Evitar arquitetura frágil baseada em HTML estático  
- Permitir evolução incremental com baixo acoplamento  
- Reduzir risco de inconsistências ao usar automações de IA  
- Garantir frontend moderno, sustentável e versionável  
- Possibilitar reutilização de componentes

**Impacto**  
- Frontend passa a ser escalável e profissional  
- Fluxo de desenvolvimento integrado ao VSCode + Codex  
- Deploy consistente via `/dist`  
- Template absorvido com segurança  
- Facilita criação futura de temas, módulos e componentes reutilizáveis

---

### Decisão 012 — 2025-11-27  
#### Estratégia de Desenvolvimento Guiado por Wireframes + Componentização antes da Automação por IA

**Contexto**  
O uso de Codex acelera o desenvolvimento, mas gera risco de divergências quando não existem diretrizes claras. Para manter consistência e evitar código improvisado, é necessário estabelecer uma base de design e estrutura antes de pedir qualquer implementação à IA.

**Decisão**  
Adotar um fluxo estruturado em 3 etapas obrigatórias antes de envolver Codex:  
1. **Wireframe detalhado** com layout, hierarquia de páginas e estrutura geral.  
2. **Seleção explícita de componentes** (cards, tabelas, navegação, filtros, etc.).  
3. **Mapa de integração com Metabase**, listando cada iframe e sua página/alvo.

Somente após isso, Codex é acionado para implementar o código, reduzindo margem de improviso.

**Motivos**  
- Evitar arquitetura caótica gerada pela IA  
- Garantir consistência visual e estrutural  
- Minimizar retrabalho  
- Facilitar manutenção e evolução futura  
- Permitir que o Codex execute, não decida

**Impacto**  
- Fluxo de trabalho claro e previsível  
- Código limpo e padronizado  
- Menor risco de inconsistências  
- Qualquer colaborador futuro conseguirá entender e manter o projeto  
- Implementações rápidas e seguras

---

### Decisão 013 — 2025-11-27  
#### Duplicação do Processo de Autorização do Mercado Livre (Reautorizações Forçadas)

**Contexto**  
Todos os clientes ML enfrentaram erro 403 em `/orders/search` e `/orders/{id}`, mesmo com OAuth correto, refresh funcionando e tokens válidos. Investigação mostrou que o problema é interno ao ML: permissões inconsistentes, escopos ocultos e comportamento não documentado. Enquanto o ticket oficial é analisado, reautorizações podem forçar a sincronização interna de escopos.

**Decisão**  
Reenviar o fluxo OAuth para todos os clientes (TOH, Fuji, Eletrohalen, Ballon Kids e Viang administrativo), utilizando links oficiais com `state=<client_id>`, após ativar **todas as permissões disponíveis** no painel do app. O objetivo é forçar o ML a atualizar escopos associados ao token.

**Motivos**  
- Forçar sincronização de permissões internas  
- Garantir máxima compatibilidade de escopos  
- Reduzir impacto enquanto o suporte não responde  
- Preparar o ambiente para ingestão imediata assim que o ML liberar acesso

**Impacto**  
- Tokens atualizados no Supabase  
- Possível desbloqueio imediato dos endpoints afetados  
- Independência temporária de ajustes manuais pelo ML  
- Processo transparente e seguro para os sellers reautorizantes





*(Cada nova decisão é numerada e vinculada às versões do ChangeLog.)*
