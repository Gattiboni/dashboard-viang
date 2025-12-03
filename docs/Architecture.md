## Architecture.md (versão atualizada em 19/11/2025)

Fluxo completo do sistema:

```
APIs (Mercado Livre)
   ↓
ETL (Python ou Make)
   ↓
Supabase (armazenamento + automação)
   ↓
Metabase (painéis e relatórios)
   ↓
Usuário (Aline e equipe)
```

> **Nota:** As integrações com **Bling** e **Upseller** permanecem previstas na arquitetura, porém foram movidas para a próxima etapa. A estrutura atual já está preparada para recebê-las sem modificações futuras.

Camadas estruturais:

| Camada   | Função                                     |
| -------- | ------------------------------------------ |
| Frontend | Interface de acesso via navegador          |
| Backend  | Automação e agregação de dados (ML ativo)  |
| Banco    | Estrutura factual e agregada               |
| IA       | Insights sob demanda e relatórios textuais |


### Frontend — Seleção das Páginas-Base do Template (2025-12-02)

O frontend adotará como base visual e estrutural as páginas do template Admindek VanillaJS 3.1.0, validadas conforme o wireframe v2:

- `dashboard/analytics.html` — Overview  
- `table/dt_basic.html` — Clientes  
- `table/tbl_bootstrap.html` — Produtos  
- `dashboard/finance.html` — Financeiro  
- `forms/form2_basic.html` — Integração  
- `table/tbl_dt-simple.html` — Logs ETL  

Essas páginas serão recortadas e migradas para o projeto Vite Vanilla em módulos HTML/JS independentes, preservando layout, grid e componentes essenciais. A escolha prioriza neutralidade visual, compatibilidade com Bootstrap e expansão futura com DataTables e ApexCharts.


### Metabase Embedding (MVP) — JWT / Incorporação Estática

Para incorporar painéis e perguntas do Metabase no frontend do Dashboard Viang, foi habilitada a **Incorporação Estática (iframe)** no Metabase e adotado o padrão de **embeds assinados (JWT)**.

- O **segredo de assinatura** deve existir **somente no backend** (variável `METABASE_EMBED_SECRET_KEY`).
- O frontend não deve conter segredos; ele deve consumir URLs já assinadas (emitidas pelo backend).
- A instância ativa do Metabase deve ser referenciada por `METABASE_SITE_URL`.

Esse modelo permite incorporar painéis com segurança e habilita parametrização futura (cliente/período/SKU) sem expor credenciais no navegador.
