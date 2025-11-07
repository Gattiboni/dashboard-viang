# Backend – Dashboard Viang

Este diretório contém toda a lógica de **integração, automação e manipulação de dados** do projeto.
O backend é responsável por coletar dados das APIs (Mercado Livre, Bling, Upseller), tratá-los, armazenar no Supabase e gerar atualizações diárias para o Metabase.

---

## Estrutura de pastas

```
backend/
│
├── etl/          → Scripts de extração e transformação (Python ou Make)
│    ├── mercado_livre.py      # Coleta e normalização de dados de vendas e Ads
│    ├── bling.py              # Integração financeira / estoque
│    ├── upseller.py           # Dados complementares (quando aplicável)
│
├── jobs/         → Rotinas automáticas e agendadas
│    ├── refresh_tokens.py     # Atualização diária dos tokens de API
│    ├── daily_update.py       # Execução geral de ETL + agregações
│
├── models/       → Estrutura de tabelas e schemas do banco (Supabase)
│    ├── base_model.py         # Definições comuns de conexão e logs
│    ├── fact_sku_day.py       # Tabela principal (nível SKU/dia)
│    ├── agg_client_day.py     # Tabela agregada (nível cliente/dia)
│
├── services/     → Funções utilitárias e integrações externas
│    ├── ai_insights.py        # Geração e cache de insights de IA
│    ├── reports.py            # Criação de relatórios PDF e e-mails
│    ├── utils.py              # Funções auxiliares e tratativas de erro
│
├── logs/         → Arquivos de log rotacionados automaticamente
│
└── requirements.txt  → Dependências Python (Supabase, Requests, etc.)
```

---

## Fluxo resumido

1. **Agendamento (03:00–05:00):**

   * Executa `jobs/daily_update.py`
   * Cada script em `etl/` coleta dados novos/atualizados.
   * Dados tratados são gravados nas tabelas `fact_sku_day` e `agg_client_day`.

2. **Atualização de Tokens:**

   * `jobs/refresh_tokens.py` renova os tokens de API expirando e salva no Supabase.

3. **Logs e Auditoria:**

   * Cada execução gera logs em `/logs`.
   * Registros também podem ser enviados para o Supabase (`updates_log`).

4. **Geração de Relatórios e IA:**

   * Scripts em `services/` processam relatórios e insights.
   * A IA é chamada sob demanda (via cache de 24h).

---

## Convenções de código

* Segue **PEP8** (indentação 4 espaços, snake_case).
* Cada script Python deve conter uma docstring curta descrevendo o propósito.
* Logs críticos devem usar `logging` padrão (sem `print`).
* Funções de ETL devem aceitar argumentos `client_id` e `data_inicio` para reprocessamentos manuais.

---

## Segurança

* Variáveis sensíveis ficam em `.env` (ignorado pelo Git).
* Nunca salvar tokens ou senhas em texto no código.
* Logs não devem conter dados sensíveis dos clientes.

---

## Próximos passos

* Adicionar testes unitários simples para validação dos scripts ETL.
* Documentar as dependências no `requirements.txt` conforme forem sendo incluídas.
* Quando o backend for estável, criar CI/CD leve (GitHub Actions) para automatizar o deploy no HostGator.

---

> *“Manter simples é manter vivo.” – A filosofia de arquitetura do Dashboard Viang*
