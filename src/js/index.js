/*
O objetivo deste codigo é fazer a troca de tema do site para o 
modo escuro com o botao que representa o sol
*/

const botaoAlterarTema = document.getElementById("botao-alterar-tema");

const body = document.querySelector("body");

const imagemBotaoTrocaDeTema = document.querySelector(".imagem-botao");

botaoAlterarTema.addEventListener("click", () => { //funçãop de seta 
    const modoEscuroEstaAtivo = body.classList.contains("modo-escuro")

body.classList.toggle("modo-escuro"); // esta linha fara o mesmo que as linhas 17 e 20 sem condições
    if (modoEscuroEstaAtivo) {
        // body.classList.remove("modo-escuro")
        imagemBotaoTrocaDeTema.setAttribute("src", "./src/imagens/sun.png")
    } else {
        // body.classList.add("modo-escuro");
        imagemBotaoTrocaDeTema.setAttribute("src", "./src/imagens/moon.png")
    }

});