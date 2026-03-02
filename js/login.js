import { cadastrar, atualizarCabecalho, mostrarMensagem } from "./funcoes_reutilizavel.js";

atualizarCabecalho();

const user_menu = document.querySelector(".user-menu");

user_menu.addEventListener("click", () => {
    cadastrar();
});

// E pronto! Não precisa mais de event listeners adicionais para o formulário de login
// porque eles já estão dentro da função loginRenderizar