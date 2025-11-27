# Wireframe Estrutural — Dashboard Viang (v2 · Database‑Aligned)

> Versão totalmente revisada com base nos dados reais do Supabase (schema, dicionário e views). Este documento é a FONTE DE VERDADE para o frontend Vite + DashboardPack + embeds Metabase.
> Nada aqui é sugestão. Tudo aqui é regra.

---

# 0. Arquitetura de Navegação (Sidebar + Topbar)

## Sidebar (fixo)
- Logo / Identidade visual
- **Dashboard** (/dashboard)
- **Clientes** (/clientes)
- **Produtos** (/produtos)
- **Publicidade** (/publicidade)
- **Financeiro** (/financeiro)
- **Configurações** (/config)
- Botão Collapse

## Topbar (fixo)
- Busca Global (cliente, SKU, campanha)
- Filtro Global de Período (7d / 30d / 90d / custom)
- Selector Global de Cliente (ALL / cliente)
- Indicador de Alertas
- Avatar

---

# 1. Layout Base (todas as telas)
```
┌────────────────────────── TOPBAR ──────────────────────────┐
│ LOGO | Busca | Período | Cliente | Alertas | Perfil       │
└────────────────────────────────────────────────────────────┘
┌────── SIDEBAR ───────┐ ┌──────────────────────────────────┐
│ nav items             │ │ GRID 12 col                      │
│                       │ │ Linha 1: KPIs                   │
│                       │ │ Linha 2: Gráficos (iframes)     │
│                       │ │ Linha 3: Tabelas / Painéis      │
└────────────────────────┘ └──────────────────────────────────┘
```

---

# 2. Mapa Geral de Telas

### Acesso
- /login
- /onboarding (Cadastro + Tokens)

### Interno
- /dashboard
- /clientes
- /clientes/:id
- /produtos
- /publicidade
- /financeiro
- /config

---

# 3. /login — Autenticação

### Objetivo
Acesso exclusivo para contas @viang.com.br.

### Campos
- email
- senha

### Validações
- domínio obrigatório
- conta deve estar validada

### Layout
```
Logo central
Card login (6 col)
Rodapé
```

---

# 4. /onboarding — Cadastro + Tokens

### Objetivo
Cadastrar cliente usando **APIs como fonte de verdade**.

### Componentes
#### Card: Dados do Cliente (ERP)
Campos preenchidos via ERP:
- display_name (bling_company_name / upseller_account_name)
- cnpj (bling_cnpj)
- email (bling_email / upseller_owner_email)
- telefone (erp fields)

#### Card: Integrações
- Mercado Livre → tokens via api_tokens
  - ml_nickname
  - ml_email
  - ml_seller_status
  - ml_points
- ERP (bling / upseller)

#### Preview (somente leitura)
Baseado em api_tokens + dados ERP.

### Botões
- Validar ML
- Validar ERP
- Salvar

---

# 5. /clientes — Lista de Clientes

### Fonte primária: vw_clientes
Campos usados:
- display_name
- tipo_cliente
- status
- has_mercado_livre
- has_bling
- has_upseller

### Fonte secundária: vw_clientes_com_status
- status_financeiro
- status_operacional
- status_ads
- status_reputacao
- margem_media
- total_lucro
- rupturas

### Layout
```
Linha 1: Busca + [+ Cliente]
Linha 2: Tabela completa (12 col)
```

### Colunas
- Cliente
- Tipo
- Status
- Integrações (ML / Bling / Upseller)
- Score Financeiro
- Score Operacional
- Score Ads
- Score Reputação
- Última Atualização
- Ações

---

# 6. /clientes/:id — Cliente Detalhado

### Fonte: vw_client_snapshot + vw_clientes_com_status

### Layout
```
Linha 1: Resumo (cards)
Linha 2: Abas
Linha 3: Conteúdo
```

## Aba 1 — Resumo
Campos reais:
- total_receita
- total_lucro
- margem_media
- total_vendas
- ticket_medio
- roas_medio
- ltv_estimado
- estoque_total
- rupturas
- reputacao_status / nivel

## Aba 2 — Produtos
Fonte: vw_produto_performance + vw_detalhes_sku
Gráficos:
- Ranking: receita_liquida
- Curva ABC
- Margem × quantidade_vendida
- Estoque × demanda

## Aba 3 — Publicidade
Fonte: vw_ads_metrics
Campos:
- gasto_ads_total
- impressoes_total
- cliques_total
- ctr_total
- roas_total

## Aba 4 — Financeiro
Fonte: vw_financeiro
Campos:
- receita_total
- lucro_total
- margem_media
- custo_total
- unidades_vendidas

## Aba 5 — Operações
Fonte: fact_sku_day
Campos:
- status_envio
- prazo_previsto
- modalidade_envio
- reputacao_status
- rupturas

## Aba 6 — Ações / Consultoria
Fonte: raw_events + insight_cache

---

# 7. /dashboard — Snapshot Executivo (Financeiro + Operações)

### Fonte principal: vw_dashboard_overview_atual
Campos:
- total_receita
- total_lucro
- margem_media
- total_vendas
- roas_medio
- roas_ads
- estoque_total
- rupturas
- reputacao_status / nivel
- status_financeiro
- status_operacional
- status_ads
- status_reputacao

### Gráficos (iframes)
- Série temporal: vw_dashboard_overview_diario
- SLA: fact_sku_day.status_envio
- Reclamações: fact_sku_day
- Reputação ML: reputacao_nivel
- Mapa: vendas agregadas (opcional futuro)

### Layout
```
Linha 1: KPIs (6)
Linha 2: Receita & Lucro (iframe)
Linha 3: KPIs Operacionais
Linha 4: Painel Operacional (iframes)
Linha 5: Alertas
Linha 6: Clientes Prioritários
```

---

# 8. /produtos — Produtos & Margem

### Fonte: vw_produto_performance
Campos principais:
- receita_liquida
- margem
- quantidade_vendida
- custo_total
- estoque
- estoque_virtual

### Layout
```
Ranking
Matriz margem × volume
Curva ABC
Estoque × Capital
Heatmap Ruptura
```

---

# 9. /publicidade — Ads

### Fonte: vw_ads_metrics
Gráficos reais:
- Funil Ads (impressoes → cliques → vendas)
- ACOS/ROAS por data
- CTR ao longo do tempo
- gasto_ads_total × receita_liquida

---

# 10. /financeiro — Financeiro Consolidado

### Fonte: vw_financeiro
Campos:
- receita_total
- lucro_total
- margem_media
- custo_total
- unidades_vendidas

### Layout
```
Linha 1: Receita Bruta vs Líquida
Linha 2: Lucro Líquido
Linha 3: Conciliação (tabela iframes)
```

---

# 11. Funcionalidades Transversais

## Drill-down (regra única)
- Clique em KPI → aplica filtro
- Clique em gráfico → abre cliente ou filtra

## Relatórios
- /dashboard: relatório global
- /clientes/:id: relatório do cliente

## IA (insight_cache)
- Insights baseados em vw_dashboard_overview_atual + fact_sku_day + histórico

---

# 12. Mapa Metabase → Componentes (versão inicial)

Será produzido após a aprovação final do wireframe.

---

# 13. Notas
- Documento blindado contra improviso
- Totalmente aderente ao Supabase
- Nenhuma rota, card ou métrica existe se não vier do banco

