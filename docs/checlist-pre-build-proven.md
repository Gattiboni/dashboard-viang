# ✅ Checklist Pré-Build — Páginas do Dashboard Viang

Este checklist deve ser aplicado **ANTES do build** em **CADA página HTML**.
O resultado esperado é **CHECK / NÃO CHECK**, sem interpretação.

---

## 0️⃣ Regra Estrutural de Autenticação (OBRIGATÓRIA)

- [ ] O `authGate` é o **primeiro script do `<body>`**
- [ ] O `authGate` é **idêntico** ao modelo canônico abaixo
- [ ] NÃO existe lógica de auth após qualquer `@@include`

ÚNICO Modelo canônico permitido:

```html
<script>
    (function authGate() {
        const ACCESS_TOKEN = localStorage.getItem('sb_access_token');

        if (!ACCESS_TOKEN) {
            window.location.href = '/viang/login-viang.html';
        }
    })();
</script>

# Regras absolutas:

- ❌ Não usar `async` no `authGate`
- ❌ Não usar `fetch` no `authGate`
- ❌ Não validar token remotamente
- ❌ Não remover itens do `localStorage`
- ❌ Não posicionar `authGate` após `@@include`

---


## 1️⃣ Autenticação (Auth Gate)

- [ ] A página possui `authGate`?
  - [ ] O `authGate` é **síncrono**
  - [ ] O `authGate` **NÃO faz fetch**
  - [ ] O `authGate` **NÃO valida token remotamente**
  - [ ] O `authGate` **NÃO chama `/auth/v1/user`**
  - [ ] O `authGate` **NÃO remove itens do localStorage**
  - [ ] O `authGate` apenas verifica:
    ```js
    localStorage.getItem('sb_access_token')
    ```

**Regra absoluta**  
❌ Qualquer `authGate` com `async`, `await` ou `fetch` = **NÃO CHECK**

---

## 2️⃣ Uso de localStorage

- [ ] A página **NÃO remove** `sb_access_token`
- [ ] A página **NÃO remove** `sb_refresh_token`
- [ ] A página **NÃO limpa localStorage automaticamente**
- [ ] A página **NÃO invalida sessão sozinha**

**Único arquivo autorizado a escrever token:**  
- `login-viang.html`

---

## 3️⃣ Redirecionamentos

- [ ] Redirecionamentos são **explícitos**
- [ ] Não existem redirects baseados em:
  - [ ] resposta HTTP
  - [ ] status de API
  - [ ] try/catch genérico
- [ ] Não existe redirect automático após carregamento de dados

---

## 4️⃣ MVP: regras de ouro

- [ ] Nenhuma página tenta “confirmar” se o token é válido
- [ ] Nenhuma página tenta “renovar” sessão
- [ ] Nenhuma página tenta “proteger” rota com backend
- [ ] Navegação depende **somente de estado local**

---

## 5️⃣ Comparação obrigatória

Antes do build, a página deve ser comparada com:

- [ ] `dashboard.html` (versão estável)
- [ ] NÃO com `produtos.html` (control sample quebrado)

Diferenças aceitáveis:
- conteúdo
- gráficos
- fetch de dados de negócio

Diferenças **NÃO aceitáveis**:
- lógica de auth
- lógica de sessão
- lógica de redirect

---

## 6️⃣ Teste mínimo obrigatório

- [ ] Janela anônima
- [ ] DevTools aberto
- [ ] Login → Dashboard → Página
- [ ] Token permanece em `localStorage`
- [ ] Página NÃO redireciona sozinha
