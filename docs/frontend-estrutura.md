# Estrutura de Arquivos e Pastas (pré-Codex) — Frontend

## Objetivo
Definir fronteiras rígidas para implementação do frontend (Vite + Admindek), evitando criação “inventada” de estrutura, rotas e componentes.

---

## Árvore final (travada)

**Raiz do frontend:** `dashboard-viang/frontend/vite-dashboard/`

```text
src/
  assets/
  styles/
    main.scss

  components/
    metabase-embed/
      index.js
      index.scss

  pages/
    dashboard/        (Overview)
      index.html
      index.js
      index.scss

    clientes/
      index.html
      index.js
      index.scss

    produtos/
      index.html
      index.js
      index.scss

    financeiro/
      index.html
      index.js
      index.scss

    integracao/
      index.html
      index.js
      index.scss

    logs-etl/
      index.html
      index.js
      index.scss

Padrão de componentes (travado)

/components/<nome>/
  index.js
  index.scss
  index.html   (opcional — somente se houver markup reutilizável)
Regras:

Não renomear pastas/arquivos.

Não mover arquivos.

Todo componente deve expor um ponto de entrada claro (JS).

index.html só existe quando o componente possuir markup próprio reutilizável.

---

## Regra de páginas (substitui “placeholders vazios”)

As páginas **não** serão HTML em branco.

Cada página deve:

1. Usar o **esqueleto base do Admindek** (header + sidebar + `pc-container`).
2. Dentro do `pc-container`, conter **somente 1 container** de embed (sem layout extra inventado).

### Containers padrão (travado)

* Overview (`pages/dashboard/`): `#mb-overview--dashboard`
* Clientes (`pages/clientes/`): `#mb-clientes--dashboard`
* Produtos (`pages/produtos/`): `#mb-produtos--dashboard`
* Financeiro (`pages/financeiro/`): `#mb-financeiro--dashboard`
* Integração (`pages/integracao/`): `#mb-integracao--dashboard`
* Logs ETL (`pages/logs-etl/`): `#mb-logs-etl--dashboard`

---

## Navegação (sidebar)

* Os links do sidebar devem apontar para as rotas/páginas acima **mesmo que a página ainda só tenha o container do embed**.
* Não criar rotas extras fora desta lista sem atualização explícita da documentação.

---

## Referência de wireframe

* Wireframe v2 deve estar anexado e referenciado nos docs do frontend como fonte oficial de layout/escopo.

