const botaoAlterarTema = document.getElementById("botao-alterar-tema");
const body = document.querySelector("body");
const imagemBotaoTrocaDeTema = document.querySelector(".imagem-botao");

botaoAlterarTema.addEventListener("click", () => {
    body.classList.toggle("modo-escuro");
    const modoEscuroEstaAtivo = body.classList.contains("modo-escuro");
    imagemBotaoTrocaDeTema.setAttribute("src", modoEscuroEstaAtivo ? "./src/imagens/sun.png" : "./src/imagens/moon.png");
});
