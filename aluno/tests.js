// Testes das regras de negócio. Abra tests.html no navegador.
// Cada critério de aceite das specs deve ter um teste aqui.

test("a base de dados foi carregada", () => {
  assertTrue(Array.isArray(DB.produtos) && DB.produtos.length > 0, "DB.produtos vazio");
});

// --- Os testes do curso entram abaixo desta linha ---
