# Estrutura – Criação das Páginas Base do Frontend (VanillaJS + Admindek 3.1.0)

**Data:** 2025-12-11
**Responsável:** Gattiboni

## Resumo

Registro da criação da espinha dorsal do frontend, com todas as páginas definidas no wireframe v2 e alinhadas à matriz oficial de templates Admindek.
Arquivos criados em `/src/html/viang/` com nomes padronizados e sem conteúdo inicial.

| Ordem | Página (Wireframe)  | Template-base Admindek     |
| ----- | ------------------- | -------------------------- |
| 1     | **Dashboard**       | `dashboard/index.html`     |
| 2     | **Clientes**        | `table/dt_basic.html`      |
| 3     | **Cliente Detalhe** | `dashboard/analytics.html` |
| 4     | **Produtos**        | `table/tbl_bootstrap.html` |
| 5     | **Publicidade**     | `dashboard/analytics.html` |
| 6     | **Financeiro**      | `dashboard/finance.html`   |
| 7     | **Config**          | `forms/form2_basic.html`   |
| 8     | **Logs / ETL**      | `table/tbl_dt-simple.html` |

## Arquivos Criados

1. **dashboard.html**
   - **Finalidade:** Página principal com KPIs e visão executiva.
   - **Template-base futuro:** `dashboard/index.html`
   - **Status:** Arquivo vazio criado.

2. **clientes.html**
   - **Finalidade:** Página de listagem de clientes (tabela).
   - **Template-base futuro:** `table/dt_basic.html`
   - **Status:** Arquivo vazio criado.

3. **cliente-detalhe.html**
   - **Finalidade:** Drilldown analítico do cliente, com KPIs e dashboards.
   - **Template-base futuro:** `dashboard/analytics.html`
   - **Status:** Arquivo vazio criado.

4. **produtos.html**
   - **Finalidade:** Página de performance por produto, ranking e análises.
   - **Template-base futuro:** `table/tbl_bootstrap.html`
   - **Status:** Arquivo vazio criado.

5. **publicidade.html**
   - **Finalidade:** Módulo analítico de anúncios (Ads).
   - **Template-base futuro:** `dashboard/analytics.html`
   - **Status:** Arquivo vazio criado.

6. **financeiro.html**
   - **Finalidade:** KPIs financeiros, visão executiva e dashboards Monetários.
   - **Template-base futuro:** `dashboard/finance.html`
   - **Status:** Arquivo vazio criado.

7. **config.html**
   - **Finalidade:** Integrações, tokens, configurações da conta.
   - **Template-base futuro:** `forms/form2_basic.html`
   - **Status:** Arquivo vazio criado.

8. **logs.html**
   - **Finalidade:** Exibição dos registros ETL e rotinas automáticas.
   - **Template-base futuro:** `table/tbl_dt-simple.html`
   - 
status: Arquivo vazio criado.
d9. *login.html***
d     Finalidade: Tela de autenticação (simples). Template-base futuro: Template de login nativo do Admindek. Status: Arquivo vazio criado.
d10. *onboarding.html***
d     Finalidade: Processo de entrada do cliente, validação e integração. Template-base futuro: Estrutura híbrida (base limpa + includes). Status: Arquivo vazio criado.

## Observações
- Estrutura flat adotada conforme boas práticas para multi-page Vite + Admindek.
- Hierarquia UX (`clientes` → `cliente-detalhe`) não implica hierarquia de diretórios.
e- Nenhum template original foi modificado nesta etapa.
e- Conteúdos serão inseridos na próxima fase, página por página.

## Estado Final
- ✔️ Estrutura criada com sucesso e alinhada ao wireframe v2.
e- Pronta para receber os templates-base.