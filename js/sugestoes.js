import {checkLog,atualizarCabecalho} from "./funcoes_reutilizavel.js";
checkLog();
atualizarCabecalho();

document.addEventListener('DOMContentLoaded', () => {

    const botaozinho = document.querySelectorAll('.mood-card');
    
    botaozinho.forEach(botao => {
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            

            const somBack = new Audio("sound/back.mp3");
            somBack.currentTime = 0;
            somBack.play();
            

            const tipo = botao.querySelector('h3').textContent.toLowerCase();
            localStorage.setItem('selecioneSeuHumor', tipo);
            

            somBack.onended = () => {
                window.location.href = 'playlists.html';
            }
        });
    });
});

//selectedMood = selecioneSeuHumor

// uando o usuário clica em um cartão de humor, o som toca, o humor escolhido é salvo no localStorage,
// e só depois do som o usuário é levado para a página de playlists. Assim,
// a próxima página pode saber qual humor foi escolhido e o som não é cortado pelo redirecionamento.

// Mapa de emojis no JavaScript
const emojiMap = {
    'Romântico': '💘', 'Animado': '🎉', 'Relaxado': '🍃', 'Melancólico': '🌧️',
    'Nostálgico': '🍂🥹', 'Feliz': '🤗', 'Triste': '🫀🥀', 'Energizado': '⚡',
    'Aventureiro': '🌄', 'Sonolento': '🥱', 'Focado': '🧠💡', 'Estressado': '🤯',
    'Motivado': '💪', 'Calmo': '☁️🫧🎐', 'Intenso': '🔥', 'Saudoso': '💭',
    'Dramático': '🎭', 'Contemplativo': '🤍🪽', 'Misterioso': '🤐', 'Irritado': '💥💢',
    'Inspirado': '🌞☘︎', 'Apaixonado': '❤️‍🔥', 'Neutro': '☯', 'Curioso': '🧐',
    'Confiante': '😎', 'Tenso': '💣⚠️', 'Espiritual': '🪬', 'Brincalhão': '🐱',
    'Tranquilo': '🍵✿', 'Determinado': 'ദ്ദി ˉ͈̀꒳ˉ͈́ )✧', 'Rebelde': '🤘✮', 'Zen': '༄🍃',
    'Sofrência': '🍺', 'Good vibes': '🫧🌻', 'Vibe noturna': '✨🌙', 'Vibe de festa': '🥳🥂',
    'Cinemático': '🎬', 'Surpreso': '🫣', 'Caótico': '🤪', 'Minimalista': '𔘓',
    'Profundo': '🌌', 'Reflexivo': '𓇢𓆸', 'Entediado': '😑', 'Radiante': '💫',
    'Saudade': '❤️‍🩹', 'Toska': '🖤', 'L\'appel du vide': '🌑', 'Ikigai': '⋆.˚🪻༘⋆',
    'Mono no aware': '🍁🍂', 'Wabi-sabi': '⏳😔', 'Tarab': '💿🫀', 'Hygge': '🧣❄️'
};



document.addEventListener('DOMContentLoaded', async () => {
    await carregarHumores();
    configurarEventos();
});

async function carregarHumores() {
    try {
        const response = await fetch('api/humores.php');
        const data = await response.json();

        if (data.type === 'success') {
            renderizarHumores(data.data);
        } else {
            mostrarMensagem('Erro ao carregar humores', 'error');
        }
    } catch (error) {
        console.error('Erro ao carregar humores:', error);
        mostrarMensagem('Erro ao carregar humores', 'error');
    }
}

function renderizarHumores(humores) {
    const moodGrid = document.querySelector('.mood-grid');
    
    if (!moodGrid) {
        console.error('Elemento .mood-grid não encontrado');
        return;
    }

    moodGrid.innerHTML = '';

    humores.forEach(humor => {
        const moodCard = document.createElement('div');
        moodCard.className = 'mood-card';
        moodCard.dataset.humorId = humor.id_humor;
        moodCard.dataset.humorNome = humor.tipo;
        
        const emoji = emojiMap[humor.tipo] || '🎵';
        const gradient = gerarGradiente(humor.tipo);
        
        moodCard.style.background = gradient;
        moodCard.innerHTML = `
            <div class="mood-icon">
                <span class="emoji">${emoji}</span>
            </div>
            <h3>${humor.tipo}</h3>
            <div class="mood-description">
                <p>${humor.descricao || 'Descrição não disponível'}</p>
                <span class="click-hint">Clique para ver playlists</span>
            </div>
        `;

        moodGrid.appendChild(moodCard);
    });

    adicionarEventosCardsHumor();
}

function gerarGradiente(nomeHumor) {
    const cores = {
        // Cores existentes
        'Romântico': ['#FF2E63', '#FF6B6B'],
        'Feliz': ['#08D9D6', '#00C9FF'],
        'Energizado': ['#FF9A3C', '#FFCC70'],
        'Melancólico': ['#6A4C93', '#8A5A44'],
        'Animado': ['#FFD93D', '#FF9A3C'],
        'Relaxado': ['#6BCF7F', '#4CAF50'],
        'Nostálgico': ['#9C27B0', '#673AB7'],
        'Triste': ['#2196F3', '#03A9F4'],
        'Aventureiro': ['#FF5722', '#FF9800'],
        'Sonolento': ['#607D8B', '#78909C'],
        'Focado': ['#009688', '#4CAF50'],
        'Estressado': ['#F44336', '#E91E63'],
        'Motivado': ['#FFC107', '#FF9800'],
        'Calmo': ['#00BCD4', '#009688'],
        'Intenso': ['#E91E63', '#9C27B0'],
        
        // NOVAS CORES para todos os humores
        'Contemplativo': ['#9C27B0', '#E91E63'],
        'Misterioso': ['#673AB7', '#3F51B5'],
        'Irritado': ['#FF5252', '#FF1744'],
        'Inspirado': ['#00E676', '#00C853'],
        'Apaixonado': ['#FF4081', '#F50057'],
        'Neutro': ['#78909C', '#546E7A'],
        'Curioso': ['#FF9100', '#FF6D00'],
        'Confiante': ['#FFD600', '#FFAB00'],
        'Tenso': ['#FF3D00', '#DD2C00'],
        'Espiritual': ['#7C4DFF', '#651FFF'],
        'Brincalhão': ['#FF80AB', '#F50057'],
        'Tranquilo': ['#80DEEA', '#4DD0E1'],
        'Determinado': ['#FF8A65', '#FF5722'],
        'Rebelde': ['#B71C1C', '#D50000'],
        'Zen': ['#4DB6AC', '#26A69A'],
        'Sofrência': ['#5D4037', '#4E342E'],
        'Good vibes': ['#AED581', '#9CCC65'],
        'Vibe noturna': ['#283593', '#1A237E'],
        'Vibe de festa': ['#EC407A', '#D81B60'],
        'Cinemático': ['#212121', '#000000'],
        'Surpreso': ['#FFCA28', '#FFB300'],
        'Caótico': ['#BF360C', '#DD2C00'],
        'Minimalista': ['#CFD8DC', '#B0BEC5'],
        'Profundo': ['#311B92', '#1A237E'],
        'Reflexivo': ['#00838F', '#006064'],
        'Entediado': ['#757575', '#616161'],
        'Radiante': ['#FFD740', '#FFC400'],
        'Saudade': ['#7B1FA2', '#6A1B9A'],
        'Toska': ['#263238', '#000A12'],
        'L\'appel du vide': ['#37474F', '#263238'],
        'Ikigai': ['#E57373', '#EF5350'],
        'Mono no aware': ['#8D6E63', '#6D4C41'],
        'Wabi-sabi': ['#795548', '#5D4037'],
        'Tarab': ['#AD1457', '#880E4F'],
        'Hygge': ['#BCAAA4', '#A1887F']
    };

    const cor = cores[nomeHumor] || ['#666666', '#999999'];
    return `linear-gradient(135deg, ${cor[0]}, ${cor[1]})`;
}

// No arquivo sugestoes.js, modifique a função adicionarEventosCardsHumor:

function adicionarEventosCardsHumor() {
    const moodCards = document.querySelectorAll('.mood-card');
    
    moodCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateX(10px)';
            this.querySelector('.mood-description').style.opacity = '1';
            this.querySelector('.mood-description').style.transform = 'translateY(0)';
        });

        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateX(0)';
            this.querySelector('.mood-description').style.opacity = '0';
            this.querySelector('.mood-description').style.transform = 'translateY(10px)';
        });

        card.addEventListener('click', function(e) {
            e.preventDefault();
            const humorNome = this.dataset.humorNome;
            const humorId = this.dataset.humorId;
            
            // Redirecionar para playlists.html com os parâmetros de humor
            const url = new URL('playlists.html', window.location.href);
            url.searchParams.set('filter_by', 'humor');
            url.searchParams.set('humor_id', humorId);
            url.searchParams.set('humor_nome', humorNome);
            
            window.location.href = url.toString();
        });
    });
}
function configurarEventos() {
    const searchContainer = document.querySelector('.search-container');
    
    if (searchContainer) {
        const searchButton = searchContainer.querySelector('button');
        const searchInput = searchContainer.querySelector('input');
        
        searchButton.addEventListener('click', function() {
            realizarBusca(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                realizarBusca(this.value);
            }
        });
    }
}

function realizarBusca(termo) {
    if (termo.trim()) {
        mostrarMensagem(`Buscando por: ${termo}`, 'success');
    }
}