## Architecture.md

Fluxo completo do sistema:

```
APIs (Mercado Livre, Bling, Upseller)
   ↓
ETL (Python ou Make)
   ↓
Supabase (armazenamento + automação)
   ↓
Metabase (painéis e relatórios)
   ↓
Usuário (Aline e equipe)
```

Camadas estruturais:

| Camada   | Função                                     |
| -------- | ------------------------------------------ |
| Frontend | Interface de acesso via navegador          |
| Backend  | Automação e agregação de dados             |
| Banco    | Estrutura factual e agregada               |
| IA       | Insights sob demanda e relatórios textuais |
