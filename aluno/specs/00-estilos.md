# Spec 00: Estilos (vale para todas as specs)

## Objetivo
Garantir que a interface tenha sempre a mesma aparência, sem o agente inventar estilos nem perguntar sobre eles.

## Decisões fechadas (seguir como está, sem perguntar)
- Todo o CSS está pronto em `style.css`. **Usar somente as classes e variáveis que existem lá.**
- **Proibido:** atributo `style="..."` no HTML, `element.style.x` no JS (exceto `hidden`/`.oculto`, veja abaixo), `!important` novo, cores ou tamanhos fora das variáveis, fontes externas, frameworks CSS.
- Mostrar/ocultar elementos: adicionar ou remover a classe `oculto` com `classList`.
- Precisa de uma classe nova? Adicione ao final de `style.css`, usando apenas as variáveis de `:root`, e registre em "Premissas" da spec em andamento.
- Texto, mensagens e rótulos: em português, exatamente como estão nas specs.

## Tokens (variáveis em `:root`)
| Variável | Valor | Uso |
|---|---|---|
| `--cor-primaria` | `#1f3a5f` | cabeçalho, botão primário, foco |
| `--cor-fundo` | `#f5f6f8` | fundo da página e cabeçalho da tabela |
| `--cor-superficie` | `#ffffff` | cartões, tabela, campos |
| `--cor-borda` | `#d9dde3` | bordas |
| `--cor-texto` / `--cor-texto-suave` | `#222222` / `#5a6270` | texto principal / secundário |
| `--cor-sucesso` / `--cor-sucesso-fundo` | `#1a7f37` / `#e6f4ea` | "Em estoque" |
| `--cor-erro` / `--cor-erro-fundo` | `#c62828` / `#fdecea` | "Esgotado", erros, "Remover" |
| `--espaco-1` a `--espaco-5` | 4, 8, 16, 24, 32 px | margens, espaçamentos e gaps |
| `--raio` | `8px` | cantos arredondados |

Fonte: `--fonte` (fontes do sistema). Tamanho base 16px. Container principal: `main`, máximo de 960px, centralizado.

## Classes disponíveis e quando usar
| Classe | Uso |
|---|---|
| `barra-filtros` | linha com busca e filtro de categoria |
| `campo` | `<label>` que envolve um `input` ou `select` (rótulo acima do campo) |
| `tabela-wrapper` + `tabela` | tabela de produtos (o wrapper dá rolagem horizontal) |
| `col-preco` | `<th>` e `<td>` da coluna Preço (alinhada à direita) |
| `badge` + `badge-ok` / `badge-esgotado` | disponibilidade do produto |
| `btn` + `btn-primario` / `btn-secundario` / `btn-perigo` | botões. `btn-icone` para "−" e "+" |
| `mensagem-vazia` | "Nenhum produto encontrado." e "Seu carrinho está vazio." |
| `mensagem-erro` | `#erro-carrinho` |
| `carrinho`, `carrinho-lista`, `carrinho-item`, `item-nome`, `item-qtd`, `item-preco`, `item-subtotal` | seção do carrinho |
| `resumo`, `resumo-linha`, `resumo-total` | subtotal, desconto, frete e total |
| `texto-suave` | textos secundários (ex.: `#contagem`) |
| `oculto` | esconder elementos |

## Critérios de aceite visuais (conferir no navegador)
- CS1: Nenhum atributo `style=` no HTML nem `.style.` no JS (buscar no código).
- CS2: Todas as cores do CSS vêm de variáveis (`var(--...)`), exceto as definições em `:root`.
- CS3: Cabeçalho azul-escuro (`--cor-primaria`) com título branco; fundo da página cinza claro.
- CS4: Conteúdo centralizado, com no máximo 960px de largura.
- CS5: Botões têm pelo menos 40px de altura. Botão desabilitado fica com 50% de opacidade e cursor "proibido".
- CS6: Ao navegar com a tecla Tab, todo botão, campo e select mostra um contorno visível.
- CS7: Com a janela em 375px de largura, a página não tem rolagem horizontal (só a tabela rola dentro de `tabela-wrapper`).

## Fora de escopo
Tema escuro, animações, ícones, imagens, impressão.
