# Esquema da base de dados (data.js)

O objeto global `DB` é carregado por `<script src="data.js">` e tem três listas.

## DB.produtos
| campo | tipo | descrição |
|---|---|---|
| id | número | identificador |
| nome | texto | nome exibido |
| preco | número | preço em reais |
| estoque | número | unidades disponíveis |
| categoria | texto | categoria do produto |
| ativo | booleano | se o produto está à venda |

## DB.clientes
| campo | tipo | descrição |
|---|---|---|
| id | número | identificador |
| nome | texto | nome completo |
| email | texto | e-mail de contato |
| cidade | texto | cidade |
| vip | booleano | cliente VIP |

## DB.pedidos
| campo | tipo | descrição |
|---|---|---|
| id | número | identificador |
| clienteId | número | referência a `DB.clientes` |
| data | texto | data do pedido |
| status | texto | pendente, pago, enviado ou cancelado |
| itens | lista | `{ produtoId, quantidade }` |

## Aviso
Os dados vieram de um sistema legado e **não são garantidamente limpos**.
Investigue antes de confiar. Qualquer comportamento sobre dados estranhos
deve estar definido na spec.
