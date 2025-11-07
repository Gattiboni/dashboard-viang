# Dashboard Viang

O **Dashboard Viang** é uma plataforma de inteligência e automação de performance desenvolvida para centralizar e interpretar dados operacionais e financeiros de consultorias e vendedores do Mercado Livre. O sistema integra múltiplas fontes de informação (Mercado Livre, Bling ERP, Upseller e outros) em um único painel analítico, projetado para tomada de decisão rápida, previsível e escalável.

O projeto é orientado por uma arquitetura modular e client-centric, com atualização automática de dados, estrutura incremental e integração direta com recursos de IA para análises preditivas e relatórios automatizados.

---

## Objetivo

Fornecer à **Consultoria Aline Vianna** uma solução consolidada de Business Intelligence, capaz de traduzir grandes volumes de dados em decisões acionáveis e padronizar a visão de performance de múltiplos clientes em um único ambiente.

O foco é a **função e eficiência**: menos interface manual, mais resultado analítico.

---

## Estrutura do Projeto

```
dashboard-viang/
│
├── docs/               → Documentação técnica e funcional
│   ├── README.md
│   ├── Stack.md
│   ├── Operations.md
│   ├── DecisionLog.md
│   ├── Architecture.md
│   ├── DatabaseSchema.md
│   ├── API_Tokens.md
│   ├── AI_Insights.md
│   └── Roadmap.md
│
├── backend/            → Extração, transformação e automação de dados
│   ├── etl/             # Scripts de coleta de APIs (Mercado Livre, Bling, Upseller)
│   ├── jobs/            # Agendamentos automáticos e cron de atualização
│   ├── models/          # Estrutura e schema das tabelas Supabase
│   ├── services/        # IA, relatórios e utilidades gerais
│   ├── logs/            # Registros de execução e auditoria
│   └── requirements.txt # Dependências Python
│
├── frontend/           → Camada visual (template HTML + embeds do Metabase)
│   ├── html/
│   ├── css/
│   └── assets/
│
├── sql/                → Queries e views para uso no Metabase
│
├── automations/        → Rotinas Make/Zapier ou Supabase Functions
│
├── diagrams/           → Arquivos Excalidraw e fluxos visuais do sistema
│
└── .gitignore          → Exclusões de versionamento
```

---

## Arquitetura Técnica

O Dashboard Viang é composto por quatro camadas principais:

1. **Frontend (HostGator / HTML + Metabase)**
   Interface web leve, hospedada no domínio da consultoria, com login e painéis dinâmicos embutidos por iframe do Metabase.

2. **Backend (Python / Make / Supabase Functions)**
   Responsável por coleta, tratamento, atualização e agregação diária dos dados. Inclui automação de tokens, logs e geração de relatórios.

3. **Banco de Dados (Supabase / PostgreSQL)**
   Núcleo de armazenamento de dados com estrutura incremental. Contém tabelas de fatos (`fact_sku_day`, `agg_client_day`, `insight_cache`) e logs de atualização.

4. **Integrações (APIs Mercado Livre, Bling, Upseller)**
   Fornecem dados de vendas, estoque, anúncios, campanhas, margens e reputação. Atualizadas automaticamente via jobs diários.

---

## Inteligência Artificial

A camada de IA atua em duas frentes:

* **Análise on-demand**: geração de insights sob solicitação do usuário, processados e armazenados por 24h em cache.
* **Análise automatizada**: relatórios diários e mensais gerados a partir dos principais KPIs do período.

A integração é feita via API da OpenAI, com controle de custo e cache inteligente no Supabase.

---

## Atualizações e Logs

* Atualizações automáticas diárias (03:00–05:00).
* Logs de execução gravados localmente e no Supabase (`updates_log`).
* Tokens de API monitorados e renovados automaticamente.

---

## Requisitos e Tecnologias

**Linguagem e Frameworks**
Python 3.11+, Pandas, Requests, Supabase Client, ReportLab.

**Banco e Automação**
Supabase (PostgreSQL), Supabase Functions, Make (Zapier opcional).

**Frontend**
HTML5, CSS3, AdminLTE Template, Metabase embed.

**IA**
OpenAI API (GPT-4+), cache de 24h no Supabase.

---

## Licença

Projeto proprietário desenvolvido por **Alan Gattiboni (Gattiboni Enterprises)**.
Distribuição e uso restritos à **Consultoria Aline Vianna** e parceiros autorizados.

---

> Este repositório segue o princípio da simplicidade funcional: toda automação deve reduzir esforço humano, nunca adicioná-lo.
