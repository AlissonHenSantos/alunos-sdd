# Spec 02: Busca por nome

## Objetivo
Permitir encontrar produtos digitando parte do nome, combinada com o filtro de categoria da Spec 01.

## Decisões fechadas (seguir como está, sem perguntar)
**Texto normalizado** (`Logic.normalizarTexto(s)`): converter para texto, decompor com `normalize("NFD")`, remover marcas de acento (`/[\u0300-\u036f]/g`), passar para minúsculas, remover espaços das pontas e colapsar espaços repetidos em um só.

**Busca** (`Logic.buscarProdutos(produtos, termo)`): devolve os produtos cujo nome normalizado **contém** o termo normalizado. Termo vazio (ou só espaços) devolve a lista inteira. Mantém a ordem recebida.

**Combinação** (`Logic.filtrarProdutos(db, { categoria = "todas", termo = "" })`): primeiro `listarProdutos(db, categoria)`, depois `buscarProdutos` (as duas condições valem ao mesmo tempo).

**Tela:**
- `<input id="busca" type="search" placeholder="Buscar produto">` ao lado do filtro de categoria.
- Filtra a cada digitação (evento `input`), sem botão e sem debounce.
- Mesmas regras de contagem (`#contagem`) e de "Nenhum produto encontrado." (`#sem-resultados`) da Spec 01.
- Não destacar o termo encontrado.

**Estrutura HTML e estilos:** o campo entra dentro de `.barra-filtros`, antes do filtro de categoria:
```html
<label class="campo">Buscar
  <input id="busca" type="search" placeholder="Buscar produto">
</label>
```

## Funções públicas em `Logic`
`normalizarTexto`, `buscarProdutos`, `filtrarProdutos`.

## Critérios de aceite
- CA1: **Quando** buscar `"mouse"` (categoria `"todas"`), **então** ids `[2, 10]`.
- CA2: `"MOUSE"` e `"  mouse  "` retornam o mesmo que `"mouse"`.
- CA3: `"mouse sem"` → `[2]`.
- CA4: `"mecanico"` → `[1]` (acha "Teclado Mecânico").
- CA5: `"cabo"` → `[6]`.
- CA6: `"usb"` → `[8]`.
- CA7: `"zzz"` → `[]`, e a tela mostra "Nenhum produto encontrado.".
- CA8: Termo vazio → 10 produtos.
- CA9: `"mouse"` com categoria `"acessorios"` → `[10]`. Com categoria `"audio"` → `[]`.
- CA10: `normalizarTexto("  Açaí  Grande ")` → `"acai grande"`.

## Critérios visuais (conferir no navegador)
- CV1: Busca e categoria aparecem lado a lado, com rótulo acima de cada campo. Em 375px de largura ficam um sobre o outro, ocupando a largura toda.
- CV2: Ambos os campos têm 40px de altura e contorno visível ao receber foco.

## Fora de escopo
Busca por categoria ou preço, busca aproximada (typos), histórico de buscas.
