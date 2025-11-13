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



*(Cada nova decisão é numerada e vinculada às versões do ChangeLog.)*
