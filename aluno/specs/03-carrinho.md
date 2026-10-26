# Spec 03: Carrinho de compras

## Objetivo
Permitir adicionar produtos ao carrinho respeitando o estoque e mostrar subtotal, frete e total.

## Decisões fechadas (seguir como está, sem perguntar)
**Estado:** variável `carrinho` (array) em `app.js`, só em memória. Sem `localStorage`: recarregar a página limpa o carrinho.

**Item do carrinho:** `{ produtoId, nome, precoUnitario, estoque, quantidade }`. Os valores vêm do produto já normalizado no momento da adição.

**Todas as funções são puras:** não alteram os argumentos; devolvem novos objetos.

**Funções de `Logic`** (as três primeiras devolvem `{ carrinho, erro }`, onde `erro` é `null` ou texto):
- `adicionarAoCarrinho(carrinho, produto, quantidade = 1)`: se o item já existe, soma a quantidade. Se a quantidade final passar do estoque, devolve o carrinho **inalterado** e o erro.
- `alterarQuantidade(carrinho, produtoId, delta)`: soma `delta` (positivo ou negativo). Quantidade final menor ou igual a 0 remove o item. Passar do estoque devolve o carrinho inalterado e o erro.
- `removerItem(carrinho, produtoId)`: remove o item.
- `calcularTotais(carrinho)`: devolve `{ subtotal, frete, total }` como números.

**Cálculos:**
- `subtotal` = soma de `precoUnitario * quantidade`, arredondada com `Math.round(x * 100) / 100`.
- `frete` = 19.90 fixo quando há itens; 0 quando o carrinho está vazio.
- `total` = `subtotal + frete`, arredondado do mesmo jeito.

**Mensagem de erro:** `"Estoque insuficiente: restam N unidades."`, onde N = estoque menos o que já está no carrinho. Quando N for 1: `"restam 1 unidade."`.

**Tela:**
- Nova coluna "Ação" na tabela: botão "Adicionar" com `id="add-<produtoId>"`. Se o estoque for 0: botão desabilitado com o texto "Esgotado".
- Seção `<section id="carrinho">` abaixo da tabela. Cada item: nome, botões "−" e "+", preço unitário, subtotal do item e botão "Remover".
- Resumo com `#subtotal`, `#frete` e `#total`, formatados com `formatarPreco`.
- Carrinho vazio: texto "Seu carrinho está vazio." e os três valores em "R$ 0,00".
- Erros em `<p id="erro-carrinho" role="alert">`, limpo na próxima ação bem-sucedida.

**Estrutura HTML e estilos** (classes de `specs/00-estilos.md`; não usar `style=`):
- Coluna "Ação" da tabela: `<button class="btn btn-primario" id="add-1">Adicionar</button>`. Esgotado: `<button class="btn btn-secundario" disabled>Esgotado</button>`.
```html
<section id="carrinho" class="carrinho">
  <h2>Carrinho</h2>
  <p id="erro-carrinho" class="mensagem-erro oculto" role="alert"></p>
  <ul class="carrinho-lista">
    <li class="carrinho-item">
      <span class="item-nome">Teclado Mecânico</span>
      <span class="item-qtd">
        <button class="btn btn-secundario btn-icone" aria-label="Diminuir">−</button>
        <span>2</span>
        <button class="btn btn-secundario btn-icone" aria-label="Aumentar">+</button>
      </span>
      <span class="item-preco">R$ 249,90</span>
      <span class="item-subtotal">R$ 499,80</span>
      <button class="btn btn-perigo">Remover</button>
    </li>
  </ul>
  <p class="mensagem-vazia oculto">Seu carrinho está vazio.</p>
  <dl class="resumo">
    <div class="resumo-linha"><dt>Subtotal</dt><dd id="subtotal">R$ 0,00</dd></div>
    <div class="resumo-linha"><dt>Frete</dt><dd id="frete">R$ 0,00</dd></div>
    <div class="resumo-linha resumo-total"><dt>Total</dt><dd id="total">R$ 0,00</dd></div>
  </dl>
</section>
```
Carrinho vazio: a lista fica vazia, a mensagem perde `oculto`. `#erro-carrinho` perde `oculto` ao mostrar erro e o ganha de volta ao limpar.

## Critérios de aceite
- CA1: **Dado** carrinho vazio, **quando** adicionar o produto 1 (249.90), **então** subtotal 249.9, frete 19.9, total 269.8.
- CA2: Adicionar o produto 1 duas vezes → um item com quantidade 2 e subtotal 499.8.
- CA3: O produto 5 tem estoque 3. Adicionar quantidade 4 de uma vez → carrinho inalterado e erro `"Estoque insuficiente: restam 3 unidades."`.
- CA4: Com 3 unidades do produto 5 no carrinho, `alterarQuantidade(..., 5, +1)` → inalterado e erro `"Estoque insuficiente: restam 0 unidades."`.
- CA5: Produto com estoque 0 (id 2) → `adicionarAoCarrinho` devolve erro `"Estoque insuficiente: restam 0 unidades."`. Na tela o botão é "Esgotado" e está desabilitado.
- CA6: 3 unidades do produto 6 (29.90) → subtotal 89.7 (sem erro de ponto flutuante).
- CA7: `alterarQuantidade` com quantidade 1 e delta -1 → o item some.
- CA8: `removerItem` até esvaziar → frete 0, total 0.
- CA9: Nenhuma função altera o carrinho recebido (testar com `Object.freeze`).

## Critérios visuais (conferir no navegador)
- CV1: O botão "Adicionar" é azul-escuro; "Esgotado" é branco com borda e fica desabilitado (50% de opacidade).
- CV2: O botão "Remover" tem texto e borda vermelhos.
- CV3: A linha do Total tem fonte maior (1.25rem), em negrito, separada por uma linha acima.
- CV4: A mensagem de erro aparece em caixa vermelha clara acima da lista do carrinho.
- CV5: Em 375px de largura, cada item do carrinho quebra em linhas e não há rolagem horizontal na página.

## Fora de escopo
Finalizar pedido, pagamento, persistência, cupons, escolha de cliente (vem na mudança de requisito).
