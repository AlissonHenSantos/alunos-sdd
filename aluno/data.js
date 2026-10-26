// BASE DE DADOS MOCKADA DA MINI-LOJA
// Somente leitura: nao altere este arquivo.
const DB = {
  produtos: [
    { id: 1,  nome: "Teclado Mecânico",  preco: 249.90, estoque: 15, categoria: "perifericos",   ativo: true },
    { id: 2,  nome: "Mouse Sem Fio",     preco: 89.90,  estoque: 0,  categoria: "perifericos",   ativo: true },
    { id: 3,  nome: "Monitor 24\"",      preco: 899.00, estoque: 5,  categoria: "monitores",     ativo: true },
    { id: 4,  nome: "Headset Gamer",     preco: 199.90, estoque: 8,  categoria: "audio",         ativo: true },
    { id: 5,  nome: "Webcam Full HD",    preco: 159.90, estoque: 3,  categoria: "perifericos",   ativo: true },
    { id: 6,  nome: "Cabo HDMI 2m",      preco: 29.90,  estoque: 50, categoria: "cabos",         ativo: true },
    { id: 7,  nome: "mouse sem fio ",    preco: 89.90,  estoque: 4,  categoria: "perifericos",   ativo: true },
    { id: 8,  nome: "Hub USB-C",         preco: 129.90, estoque: 12, categoria: null,            ativo: true },
    { id: 9,  nome: "SSD 1TB",           preco: "349,90", estoque: 7, categoria: "armazenamento", ativo: true },
    { id: 10, nome: "Mousepad Grande",   preco: 39.90,  estoque: -2, categoria: "acessorios",    ativo: true },
    { id: 11, nome: "Suporte Notebook",  preco: 119.90, estoque: 6,  categoria: "acessorios",    ativo: true },
    { id: 12, nome: "Microfone USB",     preco: 279.90, estoque: 2,  categoria: "audio",         ativo: false },
    { id: 13, nome: "Cabo USB-C",        preco: 0,      estoque: 20, categoria: "cabos",         ativo: true }
  ],
  clientes: [
    { id: 1, nome: "Ana Souza",   email: "ana@email.com",   cidade: "Santa Rita do Sapucaí", vip: false },
    { id: 2, nome: "Bruno Lima",  email: "bruno@email.com", cidade: "Pouso Alegre",          vip: false },
    { id: 3, nome: "Carla Dias",  email: "",                cidade: "Itajubá",               vip: false },
    { id: 4, nome: "Diego Alves", email: "diego@@email",    cidade: "Santa Rita do Sapucaí", vip: false },
    { id: 5, nome: "Elisa Rocha", email: "elisa@email.com", cidade: "Pouso Alegre",          vip: true }
  ],
  pedidos: [
    { id: 1, clienteId: 1, data: "2026-09-10", status: "pago",      itens: [{ produtoId: 1, quantidade: 1 }, { produtoId: 6, quantidade: 2 }] },
    { id: 2, clienteId: 2, data: "2026-09-15", status: "enviado",   itens: [{ produtoId: 3, quantidade: 1 }] },
    { id: 3, clienteId: 5, data: "31/02/2026", status: "pago",      itens: [{ produtoId: 4, quantidade: 1 }] },
    { id: 4, clienteId: 9, data: "2026-10-01", status: "pendente",  itens: [{ produtoId: 99, quantidade: 1 }] },
    { id: 5, clienteId: 3, data: "2026-10-12", status: "cancelado", itens: [{ produtoId: 5, quantidade: 0 }] }
  ]
};
