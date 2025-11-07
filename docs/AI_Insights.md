## AI_Insights.md

| Etapa | Descrição                                                             |
| ----- | --------------------------------------------------------------------- |
| 1     | Usuário acessa gráfico e solicita insight                             |
| 2     | API valida cache (`insight_cache`) via hash de parâmetros             |
| 3     | Cache válido → retorno imediato                                       |
| 4     | Cache ausente → geração de prompt → OpenAI API → gravação com TTL 24h |
| 5     | Insights automáticos diários para 5 dashboards principais             |

Tabela `insight_cache`:
| client_id | chart_id | params_hash | insight_text | score_risco | created_at | expires_at |

*(Documentação de IA segue formato de logs técnicos: cada execução registrada e versionada.)*
