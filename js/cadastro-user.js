import { mostrarMensagem, cadastrar, atualizarCabecalho } from "./funcoes_reutilizavel.js";

atualizarCabecalho();

const user_menu = document.querySelector(".user-menu");

user_menu.addEventListener("click", () => {

    // Cria o formulário
    cadastrar();

    // Aguarda o DOM montar o formulário
    setTimeout(() => {

        const formPerfil = document.querySelector("#formPerfil");
        const inputName = document.querySelector("#nome");
        const inputEmail = document.querySelector("#email");
        const inputSenha = document.querySelector("#senha");

        console.log("FORM ENCONTRADO?", formPerfil);

        if (!formPerfil) {
            console.error("Formulário não encontrado. O HTML ainda não foi inserido.");
            return;
        }

        formPerfil.addEventListener("submit", async (e) => {
            e.preventDefault();

            const fd = new FormData(formPerfil);
            const resp = await fetch("api/cadastro.php", {
                method: "POST",
                credentials: "include",
                body: fd,
            }).then(res => res.json());

            mostrarMensagem(resp.message, resp.type);

            if (resp.type === "success") {
                inputEmail.value="";
                inputName.value="";
                inputSenha.value="";
                setTimeout(() => {
                    location.href = "./index.html";
                }, 1500);
            }
        });

    }, 100); 
});
