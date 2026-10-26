// Interface: DOM e eventos. Chama as regras em Logic.
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").textContent =
    "Mini-loja carregada. Produtos na base: " + DB.produtos.length;
});
