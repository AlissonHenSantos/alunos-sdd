# Spec 01: Listagem de produtos

## Objetivo
Mostrar a vitrine da loja com os produtos vendáveis, com filtro por categoria.

## Decisões fechadas (seguir como está, sem perguntar)
**Fonte:** `DB.produtos`. Nunca alterar `data.js`.

**Normalização** (`Logic.normalizarProduto(p)`: retorna um objeto novo, ou `null` se o produto deve ser excluído):
1. `nome`: remover espaços do início e do fim e colapsar espaços repetidos em um só.
2. `preco`: se for texto, trocar "," por "." e converter com `Number`. Excluir (`null`) se não for número finito ou se for menor ou igual a 0.
3. `estoque`: se for negativo, passa a 0.
4. `categoria`: se for `null` ou vazia, passa a `"sem-categoria"`.
5. `ativo`: excluir se for `false`.

**Duplicados** (`Logic.removerDuplicados(lista)`): dois produtos são duplicados se o nome for igual depois de remover acentos, ignorar maiúsculas/minúsculas e colapsar espaços. Manter o de menor `id` e descartar os demais.

**Ordem de processamento:** normalizar → excluir os `null` → remover duplicados → ordenar.

**Ordenação:** pelo nome, A–Z, com `localeCompare(outro, "pt-BR", { sensitivity: "base" })`.

**Preço** (`Logic.formatarPreco(n)`): `n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })`. Nos testes, comparar trocando qualquer espaço por espaço comum.

**Disponibilidade:** estoque maior que 0 → `Em estoque (N)`. Estoque 0 → `Esgotado`. Produtos esgotados continuam listados.

**Tela:**
- `<table id="tabela-produtos">` com colunas Nome, Categoria, Preço, Disponibilidade.
- `<select id="filtro-categoria">`: primeira opção com valor `todas` e texto "Todas as categorias"; depois as categorias em ordem alfabética, com valor e texto iguais ao nome da categoria. Valor inicial: `todas`.
- `<p id="contagem">`: "10 produtos", "1 produto" (singular) ou "0 produtos".
- Quando a lista filtrada for vazia: ocultar a tabela e mostrar `<p id="sem-resultados">Nenhum produto encontrado.</p>`.
- Usar o `style.css` existente, sem estilização elaborada.

**Estrutura HTML e estilos** (classes definidas em `specs/00-estilos.md`; não usar `style=`):
```html
<div class="barra-filtros">
  <label class="campo">Categoria
    <select id="filtro-categoria"><!-- opções --></select>
  </label>
</div>
<p id="contagem" class="texto-suave">10 produtos</p>
<div class="tabela-wrapper">
  <table id="tabela-produtos" class="tabela">
    <thead><tr><th>Nome</th><th>Categoria</th><th class="col-preco">Preço</th><th>Disponibilidade</th></tr></thead>
    <tbody><!-- uma <tr> por produto --></tbody>
  </table>
</div>
<p id="sem-resultados" class="mensagem-vazia oculto">Nenhum produto encontrado.</p>
```
Linha da tabela: `<td>` do nome, da categoria, `<td class="col-preco">` com o preço e `<td>` com `<span class="badge badge-ok">Em estoque (15)</span>` ou `<span class="badge badge-esgotado">Esgotado</span>`.
A tabela recebe a classe `oculto` quando não há produtos; `#sem-resultados` perde `oculto` nessa situação.

## Funções públicas em `Logic`
- `normalizarProduto(p)`
- `removerDuplicados(lista)`
- `formatarPreco(n)`
- `listarProdutos(db, categoria = "todas")`: aplica toda a ordem de processamento e o filtro; devolve lista ordenada.
- `listarCategorias(produtos)`: categorias únicas, em ordem alfabética.

## Critérios de aceite
- CA1: **Dado** o `DB` atual, **quando** chamar `listarProdutos(DB)`, **então** retorna 10 produtos, com ids na ordem `[6, 4, 8, 3, 2, 10, 9, 11, 1, 5]`.
- CA2: **Dado** o resultado do CA1, **quando** chamar `listarCategorias`, **então** retorna `["acessorios", "armazenamento", "audio", "cabos", "monitores", "perifericos", "sem-categoria"]`.
- CA3: **Quando** filtrar por `"perifericos"`, **então** os ids são `[2, 1, 5]`. Por `"acessorios"`, `[10, 11]`.
- CA4: **Quando** filtrar por `"todas"`, **então** o resultado é igual ao de `listarProdutos(DB)`.
- CA5: **Quando** filtrar por uma categoria inexistente, **então** retorna `[]` e a tela mostra "Nenhum produto encontrado." e "0 produtos".
- CA6: O produto 9 aparece com preço 349.9. Os produtos 7 (duplicado), 12 (inativo) e 13 (preço 0) não aparecem.
- CA7: Os produtos 2 e 10 aparecem como "Esgotado" (o 10 tinha estoque -2).
- CA8: `formatarPreco(249.9)` → `"R$ 249,90"`. `formatarPreco(899)` → `"R$ 899,00"`.
- CA9: `normalizarProduto({ ...produto, preco: "abc" })` → `null`.

## Critérios visuais (conferir no navegador, além de `specs/00-estilos.md`)
- CV1: A coluna Preço está alinhada à direita.
- CV2: "Em estoque (N)" aparece em verde (`badge-ok`) e "Esgotado" em vermelho (`badge-esgotado`).
- CV3: Sem resultados: a tabela some e aparece a caixa tracejada com "Nenhum produto encontrado.".

## Fora de escopo
Edição de produtos, paginação, imagens, persistência, ordenação escolhida pelo usuário.
