# Cronograma de Execução – Dashboard Viang

**Período:** 10 a 24 de novembro de 2025  
**Carga total:** 12h (MVP)  
**Base:** proposta técnica e arquitetura final definida.  
O cronograma está dividido em **3 Sprints**, cada uma com entregáveis e subtarefas executáveis.

---

## **Sprint 1 – Estrutura e Integração de Dados**  
**Período:** 10 a 13/11  
**Objetivo:** estabelecer a fundação técnica do projeto (acessos, APIs, Supabase, HostGator e Metabase).  
**Total estimado:** 4h  
**Landmark:** *Integrações ativas e banco Supabase operacional.*

### **Bloco 1 – Levantamento e Configuração de Acesso (2h)**
- [ ] Validar credenciais de Mercado Livre, Bling e Upseller.  
  - Confirmar tokens e autenticação OAuth de cada conta.  
  - Registrar credenciais temporárias em `.env` local (não versionado).  
- [ ] Criar tabela `api_tokens` e testar fluxo de refresh no Supabase.  
  - Estruturar campos: `client_id`, `platform`, `access_token`, `refresh_token`, `expires_at`, `status`.  
  - Executar job de teste e registrar resultado no `updates_log`.  
- [ ] Confirmar acesso à hospedagem HostGator e criar ambiente do Metabase.  
  - Testar conexão do banco Supabase no painel Metabase.  
  - Configurar domínio e login inicial.  
  - Validar política de backup e segurança.

### **Bloco 2 – Integração e Estrutura de Dados (2h)**
- [ ] Desenvolver scripts ETL para coleta de dados via API (ML, Bling, Upseller).  
  - Definir endpoints, tokens e parâmetros de coleta.  
  - Padronizar colunas e datatypes.  
- [ ] Implementar tabela `fact_sku_day` no Supabase (estrutura base).  
  - Criar chaves compostas (`client_id`, `sku`, `data`).  
  - Validar inserções e consistência de tipos.  
- [ ] Testar gravação incremental e logs automáticos.  
  - Executar ETL piloto com 3 clientes.  
  - Validar registros no Supabase e log de sucesso.


### Atualização — Novembro/2025

- Ambiente Metabase operacional no Railway  
- DNS do HostGator corrigido e validado  
- Schema `dashboard` criado no Supabase  
- Tabelas base implantadas: `api_tokens`, `updates_log`  
- Infraestrutura concluída  
- Pendências: ingestão e validação OAuth das APIs no Bloco 2  

---

## **Sprint 2 – Processamento, Dashboard e UX**  
**Período:** 14 a 20/11  
**Objetivo:** construir o painel funcional com dados reais e estrutura consolidada.  
**Total estimado:** 6h  
**Landmark:** *Dashboard funcional com dados reais carregando via Supabase.*

### **Bloco 3 – Processamento e Normalização (3h)**
- [ ] Criar rotina de limpeza e cálculo de KPIs (lucro, margem, ROAS, CAC, LTV).  
  - Normalizar valores nulos e inconsistentes.  
  - Criar funções SQL e Python para cálculo automatizado.  
- [ ] Implementar `agg_client_day` (visão agregada por cliente/dia).  
  - Criar job de agregação diária.  
  - Validar totais e médias contra dados originais.  
- [ ] Validar consistência entre APIs.  
  - Cruzar relatórios ML vs Bling vs Upseller.  
  - Corrigir diferenças em valores de frete, comissões e margem.

### **Bloco 4 – Construção do Dashboard e Visualizações (3h)**
- [ ] Configurar Metabase e criar dashboards principais:  
  - Snapshot (visão geral).  
  - Produtos e Margem.  
  - Publicidade (Ads).  
  - Financeiro.  
  - Operações e Reputação.  
- [ ] Integrar filtros globais (cliente, período, categoria, SKU).  
  - Testar performance e consistência nos filtros.  
- [ ] Aplicar identidade visual e UX mínima.  
  - Inserir logo e paleta da Aline.  
  - Uniformizar tipografia e títulos.  
  - Configurar acessos para clientes-piloto.

---

## **Sprint 3 – Testes, Documentação e Entrega Final**  
**Período:** 21 a 24/11  
**Objetivo:** revisar, validar e entregar o MVP funcional à Aline.  
**Total estimado:** 2h  
**Landmark:** *Entrega validada e walkthrough final com a cliente.*

### **Bloco 5 – Testes e Ajustes (1h)**
- [ ] Testar fluxos completos de atualização (tokens + ETL + Metabase).  
  - Simular execução agendada.  
  - Validar integridade de dados em `agg_client_day`.  
- [ ] Verificar logs e refresh de cache.  
  - Garantir ausência de erros nos jobs.  
  - Confirmar atualização diária do Supabase.  
- [ ] Corrigir discrepâncias de cálculo e performance.  
  - Ajustar colunas problemáticas e índices.

### **Bloco 6 – Documentação e Entrega (1h)**
- [ ] Atualizar documentação técnica (`Architecture.md`, `DatabaseSchema.md`, `Operations.md`).  
- [ ] Gerar relatório final com screenshots e comparativos de performance.  
- [ ] Conduzir reunião de walkthrough com Aline.  
  - Apresentar painel e fluxo de atualização.  
  - Alinhar roadmap pós-MVP (IA e automações).

---

## **Resumo de Carga Horária**
| Sprint | Horas | Entregável Principal |
|---------|--------|----------------------|
| Sprint 1 | 4h | Integrações e Supabase configurados |
| Sprint 2 | 6h | Dashboard funcional conectado ao banco |
| Sprint 3 | 2h | MVP validado e entregue |

**Total:** 12h (MVP dentro do escopo definido)

---

### **Observações**
- As automações de IA e relatórios entram como **fase evolutiva (pós-MVP)**.  
- Cada incremento deve ser registrado no `ChangeLog.md` e validado com a cliente antes da execução.  
- Comunicação e acompanhamento via ClickUp e WhatsApp durante todo o ciclo.
