# Frontend — Componentes Visuais Travados (MVP)
**Projeto:** Dashboard Viang  
**Template:** Admindek VanillaJS 3.1.0 (DashboardPack)  
**Objetivo:** travar escolhas visuais para impedir improviso durante implementação (Codex).

---

## 1) Sidebar (MVP)

**Status:** TRAVADO ✅  
**Referência oficial:** demo compilado do Admindek (sidebar vertical padrão, conforme print validado)

### Modelo
- Sidebar **vertical à esquerda**
- Estilo e estrutura padrão Admindek (NAVIGATION, itens com highlight ativo e suporte a submenu)
- Sem mudanças estruturais no MVP

### Itens e ordem (MVP)
1. Overview  
2. Clientes  
3. Produtos  
4. Financeiro  
5. Integração  
6. Logs ETL  
7. Configurações  

---

## 2) Header / Navbar (MVP)

**Status:** TRAVADO ✅  
**Referência oficial:** `dist/dashboard/analytics.html` (header padrão do Admindek)

### Modelo
- Header padrão do template (com toggle da sidebar + área de ações à direita)
- Sem idioma e sem alternância de tema no MVP

### Ícones do header (MVP)
**Ficam (permanentes):**
- Ajuda (Support)
- Notificações
- Perfil (dropdown)

**Removidos:**
- Tema (toggle)
- Idioma
- Menu “grid/widgets” (opções redundantes no MVP)

---

## 3) Grid / Layout de Conteúdo (MVP)

**Status:** TRAVADO ✅  
**Referência oficial:** `dist/dashboard/analytics.html`

### Padrão
- Manter estrutura padrão do template:
  - título + breadcrumb no topo da página
  - conteúdo dentro do container do Admindek (padrão `pc-container`)
  - uso normal de grid Bootstrap (rows/cols) e cards do template
- Não alterar padding/margins globais no MVP

---

## 4) Cards KPI (MVP)

**Status:** TRAVADO ✅  
**Referências oficiais:**
- Overview: `dist/dashboard/analytics.html`
- Financeiro: `dist/dashboard/finance.html`

### Padrão
- **Overview** usa os cards KPI do `analytics.html`
- **Financeiro** usa os cards KPI do `finance.html`
- Não criar novos estilos de card KPI no MVP
- Quantidade e tipos de KPIs por página: **PENDENTE** (será definido no de-para por tela)

---

## 5) Tabelas (MVP)

**Status:** TRAVADO ✅  
**Objetivo:** não misturar estilos entre telas no MVP.

### Padrões oficiais por tela
- **Produtos:** `dist/table/tbl_bootstrap.html`
- **Clientes:** `dist/table/dt_basic.html`
- **Logs ETL:** `dist/table/tbl_dt-simple.html`

---

## 6) Gráficos (MVP)

**Status:** PARCIALMENTE TRAVADO ✅  
**Decisão travada agora (lib):**
- **ApexCharts é a única biblioteca de gráficos do MVP**

**Pendente (será definido no de-para por tela):**
- Tipos de gráficos por página (line/bar/area/radial etc.)

**Referências usuais (visuais):**
- `dist/dashboard/analytics.html`
- `dist/dashboard/finance.html`

---

## 7) Badges / Alerts / Toasts (MVP)

**Status:** TRAVADO ✅

### Padrão
- Usar **somente** componentes nativos do Bootstrap/Admindek já presentes no template
- Sem bibliotecas externas de UI/notifications no MVP

---

## 8) Tema (MVP)

**Status:** TRAVADO ✅

### Padrão
- **Tema claro fixo**
- Sem alternância de tema (dark mode) no MVP
- Revisão de tema: **pós-MVP**
