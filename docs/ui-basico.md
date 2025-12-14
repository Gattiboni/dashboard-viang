# UI Básico — Estado Atual

Este documento descreve o **estado atual da camada de UI** do projeto, após a adaptação dos templates base do Admindek para o layout e navegação do projeto **Viang**.

O objetivo desta etapa foi garantir **coerência estrutural e navegação correta**, sem qualquer ajuste de conteúdo funcional ou visual refinado.

---

## Escopo desta etapa

Incluído:
- Ajuste de layout das páginas para uso do `layout-vertical-viang.html`
- Ajuste de breadcrumb conforme hierarquia definida no projeto
- Validação de navegação (sidebar + topbar)
- Garantia de que nenhuma página renderiza includes como texto

Explicitamente fora de escopo:
- Ajustes visuais finos (spacing, alinhamento, estética)
- Remoção ou adaptação de conteúdo placeholder dos templates
- Implementação de lógica de dados, estados ou integrações
- Refatoração de JavaScript
- UX final

---

## Páginas cobertas
As páginas abaixo estão **estruturalmente corretas**, navegáveis e alinhadas ao projeto:

| Página | Breadcrumb |
|---|---|
| Dashboard | Visão geral |
| Clientes | Clientes > Lista |
| Cliente Detalhe | Clientes > Detalhe |
| Produtos | Produtos > Lista |
| Publicidade | Publicidade > Visão geral |
| Financeiro | Financeiro > Visão geral |
| Configurações | Configurações > Geral |
| Logs / ETL | Logs > ETL |

---

## Decisões estruturais adotadas
- Cada página permanece como **HTML completo**, conforme o dump original do Admindek.
- O layout do projeto é aplicado via:
```html
@@include('./layout-vertical-viang.html')
the breadcrumb continua sendo resolvido a partir de:
@@include('../layouts/breadcrumb.html')
nnenhuma página foi convertida em partial.
nnenhuma lógica de injeção reversa de layout foi adotada.
essas decisões seguem estritamente:
o comportamento do build do template,
a documentação consolidada no dump,
o funcionamento validado do Dashboard.

### Critério de pronto (DoD) desta etapa
Esta etapa é considerada concluída quando:
todas as páginas listadas carregam com sidebar e topbar do projeto,
breadcrumb exibe o rótulo correto em todas as páginas,
nennhum @@include(...) aparece renderizado como texto,
a navegação lateral leva às páginas corretas,
o Dashboard permanece inalterado.
todos os critérios acima foram atendidos.

### Observações importantes
o conteúdo exibido nas páginas ainda é o conteúdo bruto dos templates.
isso é intencional e temporário.
a limpeza, substituição ou customização desses conteúdos será feita em etapas posteriores, majoritariamente de forma manual.

### Próximos passos (fora deste documento)
definir abordagem para limpeza de placeholders por página,
iniciar integração de dados reais (Metabase, APIs, etc.),
srefinar UX conforme wireframe validado,
documentar padrões finais de UI quando estabilizados.
este documento registra apenas o estado atual, sem antecipar decisões futuras.