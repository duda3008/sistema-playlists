import { atualizarCabecalho,checkLog} from "./funcoes_reutilizavel.js";
checkLog();


atualizarCabecalho();



document.querySelectorAll('.cta-button').forEach(botao => {
    
    botao.addEventListener('click', (event) => {
        event.preventDefault();

        const som = new Audio('sound/toggle.mp3');
        som.currentTime = 0;
        som.play();

        som.onended = () => {
            window.location.href = botao.href;
        };

    });
});

// Seleciona todos os elementos com a classe .cta-button.
// Para cada botão, adiciona um ouvinte de clique.
// Ao clicar, impede o comportamento padrão do link.
// Cria e toca o áudio toggle.mp3.
// Quando o som termina, redireciona para o endereço do botão (botao.href).
// Assim, o som é tocado antes do redirecionamento.