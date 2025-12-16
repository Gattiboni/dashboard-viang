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

---

### Decisão 014 — 2025-12-01  
#### Escolha da Base do Frontend: Vite Vanilla

**Contexto**  
O projeto adotou um template completo do DashboardPack, composto por HTML, CSS, JS e plugins tradicionais (Bootstrap, jQuery, componentes visuais estáticos). Durante a preparação do frontend, foram analisadas as implicações de implementar o template dentro de Vite Vanilla, Vite + React e Vite + Vue.  
Considerando a estrutura do template e o wireframe v2 do Dashboard Viang, tornou-se necessário escolher a base técnica definitiva para o desenvolvimento.

**Decisão**  
Adotar **Vite Vanilla** como base oficial do frontend.

**Motivos**  
- Compatibilidade total com o template do DashboardPack.  
- Não há necessidade de migrar componentes estáticos para React/Vue.  
- Evita reescrita de plugins, eventos de DOM e scripts legados.  
- Permite build moderno, organização modular e deploy limpo para HostGator.  
- Mantém alinhamento direto com o wireframe aprovado.  
- Reduz complexidade e elimina risco de bugs causados por frameworks.

**Impacto**  
- Estrutura do frontend evoluirá por HTML/CSS/JS modularizado sob o bundler do Vite.  
- O template permanece íntegro, apenas reorganizado dentro de `/src`.  
- A camada de rotas, componentes e páginas seguirá o wireframe v2 sem necessidade de adaptações estruturais.  
- Permite início imediato da implementação dos componentes e páginas.  


---

### Decisão 015 — 2025-12-02
#### Seleção Oficial das Páginas-Base do Template Admindek para o Frontend do Dashboard Viang

**Contexto**  
Após consolidação do wireframe v2, análise detalhada das telas disponíveis no template Admindek VanillaJS 3.1.0 e validação visual no demo compilado, tornou-se necessário definir a base estrutural de cada página do frontend. O objetivo é garantir consistência visual, aderência ao layout aprovado e modularidade dentro do projeto Vite Vanilla.

**Decisão**  
Selecionar oficialmente as seguintes páginas do template como base para o desenvolvimento do frontend:

- **Overview:** `dist/dashboard/analytics.html`  
- **Clientes:** `dist/table/dt_basic.html`  
- **Produtos:** `dist/table/tbl_bootstrap.html`  
- **Financeiro:** `dist/dashboard/finance.html`  
- **Integração:** `dist/forms/form2_basic.html`  
- **Logs ETL:** `dist/table/tbl_dt-simple.html`

**Motivos**  
- São as páginas com estrutura mais neutra, modular e coerente com o wireframe v2.  
- Evitam páginas temáticas (invoice, CRM, ecommerce) e demos excessivamente complexas.  
- Possuem o equilíbrio ideal entre simplicidade e potencial de expansão.

**Impacto**  
- O frontend passa a ter uma base estável, unificada e padronizada.  
- Reduz risco de retrabalho durante a migração para Vite.  
- Permite início imediato do Bloco de Implementação das telas.

---

### Decisão 016 — 2025-12-02
#### Metabase: Incorporação Estática (iframe) habilitada e uso de Embeds Assinados (JWT)

**Contexto**  
Durante o Bloco 3 (Mapeamento Metabase → Componentes), foi identificado que a incorporação via iframe estava desabilitada, impedindo a geração de URLs de embed para painéis do projeto Viang. Para permitir incorporação segura em produção, foi necessário habilitar a incorporação estática e definir uma chave secreta de assinatura.

**Decisão**  
- Habilitar **Incorporação Estática** (iframe) no Metabase (Admin → Incorporação → Estático).
- Utilizar **embeds assinados (JWT)** para painéis e perguntas incorporadas pelo frontend.
- Armazenar a chave de incorporação **somente no backend** via variável de ambiente (`METABASE_EMBED_SECRET_KEY`).
- Registrar `METABASE_SITE_URL` como base da instância ativa do Metabase.

**Motivos**  
- Viabiliza incorporação dos painéis no MVP sem reimplementar BI no frontend.
- Mantém o embed seguro (JWT) sem exposição de segredos no navegador.
- Permite parametrização futura (cliente/período/SKU) via tokens assinados.

**Impacto**  
- O frontend passará a consumir embeds do Metabase via URLs assinadas geradas pelo backend.
- Passa a existir dependência de uma rota/serviço no backend para emissão de tokens de embed.
- O Bloco 3 pode avançar com coleta e mapeamento dos embeds dos painéis.

---

### Decisão 017 — 2025-12-11
#### Ajuste de Escopo do MVP: Manutenção das Abas de Publicidade e Financeiro com Indicador “Em Breve”

**Contexto**  
A investigação técnica confirmou que a API pública do Mercado Livre não disponibiliza endpoints funcionais para Mercado Ads, tornando inviável integrar dados de publicidade via API no MVP.  
Paralelamente, a integração com ERPs (Bling / Upseller), necessária para alimentar os dados financeiros completos, também foi adiada para uma fase futura conforme decisões anteriores de escopo.  
Apesar disso, a arquitetura do frontend e o wireframe do Dashboard Viang já incluem as abas **Publicidade** e **Financeiro**, ancoradas em componentes visuais e fluxos de navegação essenciais para a coerência do produto.

**Decisão**  
Manter as abas **Publicidade** e **Financeiro** no MVP, preservando o wireframe e a navegação original, porém exibindo um estado explícito de **“Em breve”** até que as respectivas integrações de dados sejam habilitadas:  
- **Publicidade:** aguardando integração futura via importação externa ou acordo oficial de acesso a dados Ads.  
- **Financeiro:** aguardando integração com ERP (Bling / Upseller) para cálculo de custos, margem real e indicadores financeiros completos.

Nenhum dado parcial será exibido e nenhuma métrica será inferida; o estado “Em breve” evita ruído visual, previne conclusões incorretas e mantém a coerência do produto.

**Motivos**  
- Evitar retrabalho desnecessário no frontend e no mapeamento de componentes.  
- Preservar a estrutura de navegação definida no wireframe v2.  
- Manter a arquitetura preparada para dados futuros sem que o MVP dependa desses módulos.  
- Evitar métricas vazias, `NULL` ou enganadoras no Supabase e nas views derivadas.  

**Impacto**  
- O frontend mantém todas as abas previstas, garantindo consistência da experiência do usuário.  
- A aba “Publicidade” somente exibirá dados quando houver fonte externa confiável (CSV, data feed ou integração oficial).  
- A aba “Financeiro” aguardará a integração com ERP prevista para fases posteriores.  
- O ETL permanece concentrado nos dados públicos e disponíveis do Mercado Livre.  
- A documentação passa a refletir o estado real do MVP, sem suposições ou lacunas.

---

## [2025-12-11] Reinício completo do Frontend com Admindek original

**Decisão:**  
A pasta inteira `frontend` do repositório foi removida e o desenvolvimento será reiniciado do zero utilizando o template original do Admindek (dashboardpack.com), respeitando integralmente a documentação oficial tanto do projeto quanto do próprio template.

**Justificativa:**  
A compilação e estrutura do frontend haviam se tornado irrecuperáveis devido à configuração inadequada, acúmulo de erros persistentes e ausência de alinhamento com a documentação do Admindek. Para garantir modularidade, incrementalidade e evitar retrabalho, adotou-se a recriação limpa e estruturada do frontend, em conformidade com o wireframe e arquitetura oficial do projeto.

**Impacto:**  
Não afeta Supabase, Metabase ou backend. Permite reconstrução organizada da camada de interface, eliminando ruídos e garantindo alinhamento técnico pleno com as decisões do projeto.

---

### Decisão 018 — 2025-12-14  
#### Execução de Backfill Pontual (30 dias) para Dados do Mercado Livre no MVP

**Contexto**  
Durante a fase inicial de ingestão dos dados do Mercado Livre, foi identificado que a API apresentou comportamento divergente da documentação oficial, exigindo ajustes em headers e parâmetros não documentados.  
Esse cenário atrasou a coleta efetiva e resultou em histórico disponível apenas a partir de poucos dias antes da validação da Home do Dashboard.

Dado o acúmulo de frustrações externas (limitações da API, atrasos de suporte e restrições de escopo já aceitas), tornou-se necessário restaurar o valor percebido do produto no MVP, garantindo uma janela histórica mínima que permita análises comparativas e leitura confiável de performance.

**Decisão**  
Executar um **backfill pontual e controlado** dos dados do **Mercado Livre**, limitado a uma janela fixa de **30 dias**, abrangendo todas as métricas efetivamente disponibilizadas pela API no escopo atual do MVP.

O backfill será:
- Executado **uma única vez**, em **14/12/2025**  
- Restrito exclusivamente aos dados do Mercado Livre  
- Limitado às tabelas factuais existentes no schema `dashboard`  
- Implementado de forma **idempotente**, via `upsert`, sem alterar a estrutura do banco  
- Totalmente separado do fluxo regular de ETL incremental diário  

**Motivos**  
- Garantir entrega de valor real e imediato no MVP  
- Permitir uso efetivo dos seletores de período (7 / 30 dias) e cálculo de deltas  
- Evitar apresentação de dados excessivamente recentes ou incompletos  
- Mitigar impacto dos atrasos causados por fatores externos ao projeto  
- Preservar a confiança da usuária final na ferramenta  

**Impacto**  
- Nenhuma alteração estrutural na arquitetura, schema ou modelo de dados  
- Nenhuma mudança no fluxo diário de ETL após a execução  
- A Home do Dashboard passa a refletir um histórico consistente e comparável  
- Base preparada para evolução incremental (IA, novos módulos) sem retrabalho

---

### Decisão 018 — 2025-12-14
#### Implementação do Backfill para Onboarding de Novos Clientes

**Contexto**  
Após a finalização do processo de backfill para clientes existentes, foi necessário criar uma versão separada do ETL para onboarding de novos clientes. Essa decisão visa garantir que cada cliente que entre na plataforma receba um backfill de dados histórico, conforme o fluxo de integração.

**Decisão**  
- Criar o arquivo `ml_etl_backfill_onboarding.py`, responsável por rodar o backfill específico para novos clientes.  
- Após o OAuth do Mercado Livre (ML), executar o backfill com o comando:
  - `python ml_etl_backfill_onboarding.py`
- O arquivo processará os dados históricos (últimos 30 dias) e populará as tabelas `fact_sku_day`, `agg_client_day` e `raw_events`.
- O token e os detalhes de cliente serão salvos e o ambiente será configurado com a variável `BACKFILL_CLIENT_ID` para garantir que o backfill seja executado corretamente.

**Motivos**  
- Criar uma solução escalável e simples para novos clientes, sem impactar os clientes existentes.  
- Garantir que todos os novos clientes tenham um histórico de dados, mesmo se entrarem em um momento posterior.  
- Manter a consistência do processo e facilitar a operação de onboarding.

**Impacto**  
- Cada novo cliente receberá um backfill automaticamente após a configuração do OAuth ML.  
- Nenhuma modificação no fluxo do ETL diário é necessária, mantendo a arquitetura isolada e modular.

---

### [2025-12-14] Estratégia de leitura de dados via Views (sem alteração de ETLs)

**Contexto:**  
Durante a implementação da Home do dashboard, identificou-se que os dados necessários ao MVP já estavam presentes no `raw_events` (Mercado Livre), porém não estavam acessíveis de forma tabular para consumo pelo Metabase e pelo frontend.

**Decisão:**  
Adotar uma camada de leitura baseada em **views SQL** no Supabase para:
- Flatten do JSON retornado pelo endpoint `/orders/search` do Mercado Livre
- Enriquecimento semântico dos dados (SKU, categoria, ticket médio, pedidos por dia, etc.)
- Evitar qualquer alteração imediata nos ETLs diários e de backfill já validados

**Justificativa:**  
- Minimiza risco de regressão em ETLs estáveis
- Permite rápida validação e ajuste incremental
- Mantém o `raw_events` como fonte de verdade auditável
- Facilita consumo pelo Metabase e evolução futura (materialized views ou migração para ETL, se necessário)

**Impacto:**  
- Nenhuma alteração estrutural em backend ou ingestão
- Liberação imediata de KPIs essenciais do MVP
- Base sólida para Home agregada (VIANG) e futuras páginas

---

### Decisão 019 — 2025-12-15  
#### Estratégia Definitiva de KPIs da Home (MVP) e Congelamento de Blocos sem Fonte de Dados Confiável

**Contexto**  
Durante a implementação da Home do Dashboard Viang no Metabase, foi realizada uma validação rigorosa entre:
- KPIs definidos no wireframe e planejamento (Seção 2)
- Views SQL disponíveis no schema `dashboard`
- Dicionário de dados oficial do projeto
- Comportamento real do Metabase (GUI Questions, filtros e embeds)
- Limitações práticas da API do Mercado Livre no payload atual

Testes práticos demonstraram que determinados KPIs planejados dependiam de dados que:
- Não existem nas views atuais
- Não podem ser derivados com segurança no Metabase
- Ou resultariam em métricas enganosas no MVP

**Decisão**  
1. **Adotar GUI Questions no Metabase como padrão do MVP**, sem SQL Questions, para todos os KPIs cujas métricas já estejam corretamente modeladas nas views do Supabase.  
2. **Centralizar o controle de período exclusivamente no filtro de dashboard**, conectado ao frontend por meio de embed assinado, sem qualquer filtro de data definido no nível das perguntas.  
3. **Congelar integralmente a Seção 2.3 — Operação & Logística no MVP**, após tentativa empírica de criação de view logística baseada em `raw_events`, que comprovou ausência de eventos confiáveis de despacho físico no payload atual do Mercado Livre.  
4. **Congelar integralmente a Seção 2.4 — Experiência & Reputação no MVP**, devido à inexistência, no banco atual, de dados de reputação e avaliação de anúncios, apesar de os tokens OAuth já preverem acesso a esses endpoints.  
5. **Congelar integralmente a Seção 2.5 — Eficiência Operacional (Alertas Executivos) no MVP**, por depender das mesmas bases de dados inexistentes ou não confiáveis que inviabilizaram as Seções 2.3 e 2.4.  
6. Manter todas as decisões de congelamento explicitamente documentadas para evitar métricas parciais, placeholders ou KPIs enganosos no dashboard.

**Motivos**  
- Preservar a credibilidade analítica do MVP.  
- Evitar exposição de métricas calculadas a partir de proxies inválidos.  
- Manter aderência estrita ao dicionário de dados e ao modelo real do banco.  
- Evitar retrabalho futuro causado por decisões apressadas no Metabase.  
- Garantir que toda métrica exibida no MVP tenha origem clara, rastreável e defensável.

**Impacto**  
- A Home do Dashboard Viang passa a focar exclusivamente em **Performance & Vendas** e **Produtos**, com dados reais, consistentes e validados.  
- Operação, Logística, Reputação e Alertas ficam explicitamente planejados para fases posteriores, quando houver ingestão adequada de dados.  
- A arquitetura permanece incremental, modular e alinhada às premissas originais do projeto.  
- O frontend mantém estrutura e navegação intactas, sem exibição de KPIs vazios ou enganosos.

---

### Decisão 020 — 2025-12-16  
#### Isolamento do Embed do Metabase em Micro-Frontend Dedicado (Investigação e Padronização)

**Contexto**  
Durante a implementação da Home do Dashboard Viang via incorporação estática (iframe) do Metabase dentro do template Admindek (Vite Vanilla), foram identificados comportamentos recorrentes de **spinner infinito** no embed, mesmo com todos os pré-requisitos técnicos corretamente configurados (JWT válido, rede funcional, embed habilitado, URL acessível isoladamente).

A investigação empírica e a análise de relatos oficiais (GitHub, Discourse e documentação do Metabase) indicaram que:
- O frontend do Metabase pode não concluir o bootstrap interno do dashboard em cenários específicos (ex.: erro silencioso em cards, parâmetros obrigatórios ausentes, estados internos de erro não tratados).
- O ambiente host complexo (template admin + CSP rigorosa + SPA) dificulta o diagnóstico e introduz múltiplas variáveis não relacionadas ao problema real.
- O “caminho feliz” documentado pelo Metabase para static embedding assume um **host HTML mínimo**, sem interferências de frameworks, templates ou CSP agressiva.

Diante disso, tornou-se necessário reduzir drasticamente o espaço de incerteza, isolando o embed em um ambiente previsível e alinhado às referências oficiais.

**Decisão**  
Adotar, para a fase de investigação e padronização dos embeds do Metabase, um **micro-frontend dedicado e minimalista**, separado do shell principal (AdminDek), com as seguintes diretrizes:

- O AdminDek permanece como **shell oficial** do produto, responsável por layout, navegação e contexto do usuário.
- O Metabase **não será mais embutido diretamente** nas páginas do AdminDek durante essa fase.
- O AdminDek passará a incorporar um iframe interno apontando para um **micro-frontend próprio**, cuja única responsabilidade é renderizar o static embed do Metabase.
- O micro-frontend utilizará HTML mínimo, CSP controlada e fluxo alinhado aos exemplos oficiais de static embedding do Metabase.
- A geração de JWT continua sendo responsabilidade do backend (Supabase Edge Functions), sem exposição de segredos no frontend.

Essa decisão **não substitui nem invalida** a arquitetura existente, mas cria uma camada intermediária de isolamento para diagnóstico confiável, repetibilidade e padronização futura.

**Motivos**  
- Reduzir variáveis externas durante a investigação de falhas de bootstrap do Metabase.
- Alinhar o ambiente de embed ao “caminho feliz” documentado oficialmente.
- Facilitar reprodução de bugs relacionados a cards, parâmetros e versões do Metabase.
- Evitar afrouxamento indevido da CSP ou customizações perigosas no template Admindek.
- Criar base sólida e repetível para múltiplas páginas de dashboard (Home, Produtos, etc.).

**Impacto**  
- Nenhuma alteração estrutural imediata no AdminDek, Vite ou CSP do shell.
- Introdução de um micro-frontend dedicado exclusivamente ao embed do Metabase.
- Maior observabilidade e previsibilidade do comportamento do embed.
- Preparação do terreno para padronização dos dashboards sem retrabalho futuro.
- Documentação e commits subsequentes passarão a distinguir claramente **shell** e **host de embed**.

---


*(Cada nova decisão é numerada e vinculada às versões do ChangeLog.)*
