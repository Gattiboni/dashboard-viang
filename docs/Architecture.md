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
