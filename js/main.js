document.addEventListener('DOMContentLoaded', () => {

    const temaSalvo = localStorage.getItem('theme');

    if (temaSalvo) {

        document.body.className = '';

        document.body.classList.add(`${temaSalvo}-mode`);
    }
});

// O código espera até que todo o conteúdo da página seja carregado (DOMContentLoaded).
// Ele busca no localStorage o valor salvo com a chave 'theme'.
// Se existir um tema salvo, ele:
// Remove todas as classes do <body> (className = '').
// Adiciona ao <body> uma nova classe com o nome do tema seguido de -mode (por exemplo, dark-mode ou light-mode).