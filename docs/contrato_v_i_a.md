# Contrato da Camada de IA — v.I.A.ng

## 1. Visão Geral

A **v.I.A.ng** é uma camada de inteligência artificial integrada diretamente aos componentes visuais do dashboard (gráficos, KPIs, tabelas e cards), acionada por um ícone inline e operada por um **script frontend único** em conjunto com uma **Edge Function dedicada**.

Ela não substitui componentes existentes, não altera fluxos de dados e não interfere na renderização dos gráficos. Sua função é **interpretar, explicar e analisar** os elementos já existentes, sempre a partir do contexto real do sistema.

---

## 2. Arquitetura Geral

### 2.1 Frontend

* Arquivo dedicado:
  `frontend/src/html/viang-ai.html`

* Ícone de acionamento (inline nos componentes):
  `frontend/src/assets/images/viang/avatar-I-A.svg`

* Estratégia adotada: **Opção A**

  * Ícone inserido inline em cada componente
  * Nenhuma lógica duplicada por página
  * Toda a lógica concentrada em um único script global

### 2.2 Backend (Edge Function)

* Função dedicada:
  `supabase/functions/viang-ai/index.ts`

* Responsável por:

  * Orquestrar chamadas à API da OpenAI
  * Buscar metadados técnicos dos gráficos
  * Buscar dados reais quando necessário
  * Montar e validar o contexto enviado ao modelo

---

## 3. Contrato de Acionamento (Frontend → v.I.A.ng)

A v.I.A.ng pode ser acionada em **dois níveis distintos de contexto**:

1. **Contexto de elemento** (gráficos, KPIs, tabelas, cards)
2. **Contexto de página completa**

Em ambos os casos, o frontend declara apenas metadados. Nenhuma lógica é embutida nos componentes.

---

### 3.1 Acionamento por Elemento (Gráfico, KPI, Tabela, Componente)

Cada gráfico ou elemento interativo deve conter **apenas metadados declarativos**, sem lógica.

* Ícone clicável (SVG):

  * Sempre o mesmo arquivo
  * Tooltip fixo: **"v.I.A.ng Inteligente"**

* Atributos obrigatórios (`data-*`):

```html
<button
  class="viang-ai-trigger"
  data-context="element"
  data-element-type="chart | kpi | table | component"
  data-element-id="string-canônica"
  data-edge-function="nome-da-edge-function"
  data-edge-path="endpoint-da-edge"
  data-page="dashboard | produtos | clientes | cliente-detalhe"
>
  <img src="../assets/images/viang/avatar-I-A.svg" />
</button>
```

---

### 3.2 Acionamento por Página (Header Global)

Cada página deve conter **um único ícone da v.I.A.ng no header**, posicionado imediatamente **antes do seletor global de período**.

Esse acionamento representa o **contexto completo da página**.

* Ícone:

  * Mesmo SVG utilizado nos elementos
  * Tooltip fixo: **"v.I.A.ng Inteligente"**

* Atributos obrigatórios (`data-*`):

```html
<button
  class="viang-ai-trigger"
  data-context="page"
  data-page="dashboard | produtos | clientes | cliente-detalhe"
  data-page-edge-function="nome-da-edge-function-da-página"
  data-page-edge-path="endpoint-da-edge-da-página"
>
  <img src="../assets/images/viang/avatar-I-A.svg" />
</button>
```

Esses atributos continuam sendo a **única fonte de verdade** para a v.I.A.ng identificar o contexto.

---

## 4. Modal da v.I.A.ng

### 4.1 Abertura

Ao clicar no ícone, a v.I.A.ng abre um **modal centralizado**, inicialmente compacto, contendo:

**Mensagem fixa de boas-vindas:**

> "Oi, eu sou a v.I.A.ng, a I.A. da Viang. Estou aqui pra te ajudar a entender esta ferramenta por completo, cada uma de suas páginas e cada um dos gráficos. Ainda, posso te ajudar a analisar o que cada gráfico traz de importante para você levar para seu relacionamento com seus clientes e muito mais! Como posso te ajudar?"

### 4.2 Opções Iniciais (MVP do MVP)

As opções iniciais variam **exclusivamente conforme o contexto acionado**.

#### a) Quando acionada por elemento

Três ações fixas e sempre presentes:

1. **Explicar este gráfico ou elemento**
2. **Analisar este gráfico ou elemento**
3. **Faça qualquer pergunta sobre este gráfico ou elemento**

#### b) Quando acionada por página

Três ações fixas e sempre presentes:

1. **Explicar esta página**
2. **Analisar esta página**
3. **Faça qualquer pergunta sobre esta página**

---

## 5. Comportamento de Cada Opção

### 5.1 Explicar este gráfico ou elemento

Objetivo:

* Explicar **como o elemento é composto**, não interpretar resultados.

Fluxo:

* A Edge Function:

  * Analisa o código e a Edge Function associada ao elemento
  * Identifica o payload esperado (estrutura, campos, tipos)
  * Ignora valores numéricos reais

Saída esperada:

* Origem dos dados
* Estrutura do payload
* Finalidade do gráfico
* Importância do indicador no contexto do negócio

---

### 5.2 Analisar este gráfico ou elemento

Objetivo:

* Interpretar **o que os dados reais estão dizendo**.

Fluxo:

* A Edge Function:

  * Executa a Edge Function original do gráfico
  * Recebe os dados reais
  * Considera o período selecionado
  * Considera o tipo de visualização

Saída esperada:

* Leitura clara e objetiva
* Destaque de tendências, padrões ou alertas
* Linguagem informativa, não extensa

---

### 5.3 Faça qualquer pergunta sobre este gráfico ou elemento

Objetivo:

* Espaço aberto de interação

Fluxo:

* Abre um campo de texto
* O texto do usuário vira prompt
* O contexto técnico do elemento é sempre anexado automaticamente

---

### 5.4 Explicar esta página

Objetivo:

* Explicar de forma objetiva e acessível **o que a página oferece** e **como ela funciona**.

Fluxo:

* A Edge Function:

  * Analisa o HTML da página
  * Analisa a Edge Function principal da página
  * Identifica todos os gráficos e elementos relevantes
  * Considera o propósito da página no produto

Saída esperada:

* Visão geral da página
* Papel de cada gráfico ou elemento
* Como a página deve ser usada na prática

---

### 5.5 Analisar esta página

Objetivo:

* Criar uma **análise geral e compreensiva** dos dados da página.

Fluxo:

* A Edge Function:

  * Executa a Edge Function da página
  * Consolida os dados retornados
  * Relaciona cada conjunto de dados ao seu respectivo gráfico

Saída esperada:

* No máximo **5 parágrafos**
* Destaque breve dos principais insights de cada gráfico ou elemento
* Encerramento com um **parecer geral** baseado nos dados

---

### 5.6 Faça qualquer pergunta sobre esta página

Objetivo:

* Espaço aberto de interação em contexto de página completa

Fluxo:

* Abre um campo de texto
* O texto do usuário vira prompt
* O contexto técnico e de dados da página inteira é anexado automaticamente

---

### 5.2 Analisar este gráfico ou elemento

Objetivo:

* Interpretar **o que os dados reais estão dizendo**.

Fluxo:

* A Edge Function:

  * Executa a Edge Function original do gráfico
  * Recebe os dados reais
  * Considera o período selecionado
  * Considera o tipo de visualização

Saída esperada:

* Leitura clara e objetiva
* Destaque de tendências, padrões ou alertas
* Linguagem informativa, não extensa

---

### 5.3 Faça qualquer pergunta sobre este gráfico ou elemento

Objetivo:

* Espaço aberto de interação

Fluxo:

* Abre um campo de texto
* O texto do usuário vira prompt
* O contexto técnico do elemento é sempre anexado automaticamente

---

## 6. Iterações e Continuidade

* Todas as opções permitem **iterações ilimitadas**
* Follow-ups reutilizam:

  * Contexto original do elemento
  * Histórico da interação dentro do modal

Não há reinicialização de contexto até o modal ser fechado.

---

## 7. Controles do Modal

### 7.1 Botão "Fechar"

* Fecha o modal
* Limpa completamente:

  * Histórico
  * Estado
  * Contexto

### 7.2 Botão "Copiar"

* Copia **a última resposta da v.I.A.ng**
* Conteúdo formatado e organizado
* Pronto para colar em documentos externos

### 7.3 Botão "Exportar"

* Gera um PDF contendo:

  * Breadcrumb da página
  * Identificação do gráfico ou elemento
  * Período analisado
  * Dados relevantes
  * Representação visual do gráfico ou componente
  * Histórico completo da interação com a v.I.A.ng

---

## 8. Regras Fundamentais

* Nenhuma lógica de IA no frontend além do disparo
* Nenhuma chamada direta à OpenAI fora da Edge Function
* Nenhuma duplicação de código por página
* Contexto sempre explícito, nunca inferido
* A v.I.A.ng analisa o sistema, não o usuário

---

## 8.1 Chamada padrão

Toda chamada da v.I.A.ng à OpenAI é realizada **exclusivamente a partir da Edge Function** (`supabase/functions/viang-ai/index.ts`), utilizando a API oficial da OpenAI e a chave de serviço definida no ambiente.

### Variável de ambiente obrigatória

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

* A chave é de **conta de serviço**
* Nunca é exposta ao frontend
* Disponível apenas via `Deno.env.get("OPENAI_API_KEY")`

---

### Padrão de autenticação

Todas as requisições utilizam autenticação via **Bearer Token**:

```
Authorization: Bearer ${OPENAI_API_KEY}
```

---

### Endpoint oficial

A v.I.A.ng utiliza exclusivamente o endpoint unificado da OpenAI:

```
POST https://api.openai.com/v1/responses
```

---

### Modelo

A v.I.A.ng adota **estratégia híbrida de modelos**, com controle explícito de custo e qualidade, respeitando o teto mensal rígido definido para o MVP.

A seleção do modelo **não é feita no frontend** e **não é dinâmica por usuário**, apenas por **tipo de ação**, sempre na Edge Function.

#### Mapeamento de modelos por ação

| Ação                         | Modelo                       |
| ---------------------------- | ---------------------------- |
| Explicar gráfico ou elemento | `gpt-4.1-mini`               |
| Explicar página              | `gpt-4.1`                    |
| Analisar gráfico ou elemento | `gpt-4.1`                    |
| Analisar página              | `gpt-5.2`                    |
| Pergunta aberta (default)    | `gpt-4.1-mini`               |
| Follow-ups                   | Mesmo modelo da ação inicial |

Essa estratégia garante:

* Alta qualidade onde há síntese e decisão
* Uso econômico para explicações e iterações
* Previsibilidade de custo mensal

*(A troca de modelos exige alteração explícita neste contrato.)*

---

### Estrutura mínima da requisição

````json
{
  "model": "<definido conforme tipo de ação>",
  "input": [
    {
      "role": "system",
      "content": "Contexto técnico e regras da v.I.A.ng"
    },
    {
      "role": "user",
      "content": "Prompt gerado a partir da interação do usuário"
    }
  ]
}
```,
    {
      "role": "user",
      "content": "Prompt gerado a partir da interação do usuário"
    }
  ]
}
````

---

### Regras obrigatórias

* ❌ Nenhuma chamada direta à OpenAI no frontend
* ❌ Nenhuma chave de API em HTML, JS ou assets
* ❌ Nenhuma inferência de contexto pelo modelo
* ✅ Todo contexto é montado explicitamente pela Edge Function
* ✅ Toda chamada é auditável e controlável no backend

---

## 9. Escopo Atual

Este contrato define **exclusivamente** o MVP inicial da v.I.A.ng.

Qualquer expansão (memória persistente, sugestões proativas, automações) exige novo contrato.
