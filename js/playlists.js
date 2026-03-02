import {
  atualizarCabecalho,
  mostrarMensagem,
  checkLog
} from "./funcoes_reutilizavel.js";
import {
  renderizarSelectGeneros,
  renderizarSelectHumores
} from "./renderizarSelects.js";

// Inicialização
atualizarCabecalho();
checkLog();

// ===== FUNÇÕES DE UTILIDADE =====
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        filter_by: params.get('filter_by'),
        humor_id: params.get('humor_id'),
        humor_nome: params.get('humor_nome')
    };
}

function calcularDuracaoTotal(playlist) {
    let totalSegundos = 0;
    
    if (!playlist.musicas || !Array.isArray(playlist.musicas)) {
        return "0 min";
    }
    
    playlist.musicas.forEach((musica) => {
        if (musica.duracao) {
            try {
                const partes = musica.duracao.split(":").map(Number);
                
                if (partes.length === 3) {
                    totalSegundos += partes[0] * 3600 + partes[1] * 60 + partes[2];
                } else if (partes.length === 2) {
                    totalSegundos += partes[0] * 60 + partes[1];
                } else if (partes.length === 1) {
                    totalSegundos += partes[0];
                }
            } catch (error) {
                console.warn('Formato de duração inválido:', musica.duracao);
            }
        }
    });

    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    
    if (horas > 0) {
        return `${horas}h ${minutos}min`;
    } else {
        return `${minutos}min`;
    }
}

function mostrarMensagemSemPlaylists() {
    const grid = document.querySelector(".playlists-grid");
    if (grid) {
        grid.innerHTML = `
            <div class="no-playlists-msg">
                <i class="fa-solid fa-circle-info"></i>
                Você não tem nenhuma playlist cadastrada no momento.
            </div>
        `;
    }
}

function adicionarBotaoLimparFiltro() {
    const existingBtn = document.querySelector('#limpar-filtro');
    if (existingBtn) existingBtn.remove();

    const limparBtn = document.createElement('button');
    limparBtn.id = 'limpar-filtro';
    limparBtn.innerHTML = '<i class="fas fa-times"></i> Limpar Filtro';
    limparBtn.classList.add('btn-limpar-filtro');
    
    limparBtn.addEventListener('click', () => {
        window.location.href = 'playlists.html';
    });

    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.appendChild(limparBtn);
    } else {
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) {
            pageTitle.parentNode.insertBefore(limparBtn, pageTitle.nextSibling);
        }
    }
}

// ===== FUNÇÕES PRINCIPAIS =====
async function cardPlaylist(filtroHumorId = null) {
    const divCard = document.querySelector(".playlists-grid");
    if (!divCard) return;
    
    divCard.innerHTML = '<div class="loading">Carregando playlists...</div>';

    const urlParams = getUrlParams();
    const hasHumorFilter = urlParams.filter_by === 'humor' && urlParams.humor_id;
    const humorIdFiltro = hasHumorFilter ? urlParams.humor_id : filtroHumorId;

    let apiUrl = 'api/get-playlist-user.php';

    if (humorIdFiltro) {
        apiUrl = `api/get-playlist-user.php?humor_id=${humorIdFiltro}`;
        
        if (hasHumorFilter && urlParams.humor_nome) {
            const pageTitle = document.querySelector('.page-title');
            if (pageTitle) {
                pageTitle.textContent = `Playlists - ${decodeURIComponent(urlParams.humor_nome)}`;
            }
            adicionarBotaoLimparFiltro();
        }
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json());

        if (response.type === 'error') {
            mostrarMensagemSemPlaylists();
            return;
        }
 if (!response.data || response.data.length === 0) {
            mostrarMensagemSemPlaylists();
            
            if (humorIdFiltro) {
                const humorNome = hasHumorFilter ? decodeURIComponent(urlParams.humor_nome) : 'este humor';
                mostrarMensagem(`Nenhuma playlist encontrada para ${humorNome}`, 'info');
            }
            return;
        }
        const playlists = response.data;
        divCard.innerHTML = '';

        for (const playlist of playlists) {
            const card = document.createElement("div");
            card.classList.add("playlist-card");
            card.dataset.humor = playlist.humor ? playlist.humor.toLowerCase().replace(/\s+/g, '-') : 'sem-humor';
            card.dataset.id = playlist.id_playlist;

            try {
                const musicResponse = await fetch(`api/get-musica-detail.php?idPlaylist=${playlist.id_playlist}`);
                const musicData = await musicResponse.json();
                const musicas = musicData.data?.musicas || [];
                const duracaoTotal = calcularDuracaoTotal({ musicas });
                
                card.innerHTML = `
                    <div class="playlist-cover">  
                        <img src="${playlist.imagem || 'img/playlistDefult.png'}" alt="Capa da playlist">
                        <div class="playlist-overlay">
                            <button class="play-btn"><i class="fas fa-play"></i></button>
                        </div>
                    </div>
                    <div class="playlist-info">
                        <h3>${playlist.nome}</h3>
                        <p class="playlist-stats">${playlist.total_musicas || 0} músicas • ${duracaoTotal}</p>
                        <div class="playlist-actions">
                            <button class="action-btn favorite ${playlist.favorita ? "active" : ""}"><i class="fas fa-heart"></i></button>
                            <button class="action-btn edit"><i class="fas fa-pencil-alt"></i></button>
                            <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;

                divCard.append(card);

                // Event listeners
                card.addEventListener("click", () => {
                    mostrarDetalhesPlaylist(playlist.id_playlist);
                });

                const btnExcluir = card.querySelector(".delete");
                btnExcluir.addEventListener("click", async (e) => {
                    e.stopPropagation();
                    const confirmar = confirm("Tem certeza que deseja excluir essa playlist?");
                    if (confirmar) {
                        await excluirPlaylist(playlist.id_playlist);
                    }
                });

                const btnFavoritar = card.querySelector(".favorite");
                btnFavoritar.addEventListener("click", async (e) => {
                    e.stopPropagation();
                    await favoritarPlaylist(playlist.id_playlist, !playlist.favorita);
                    cardPlaylist(humorIdFiltro);
                });

            } catch (error) {
                console.log('Erro ao carregar detalhes da música:', error);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar playlists:', error);
        mostrarMensagem("Erro ao carregar playlists", "error");
        mostrarMensagemSemPlaylists();
    }
}

// ===== FUNÇÕES DE AÇÕES =====
async function excluirPlaylist(idPlaylist) {
    try {
        const response = await fetch('api/delete-playlist.php', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_playlist: idPlaylist })
        }).then(res => res.json());

        mostrarMensagem(response.message, response.type);
        if (response.type === 'success') {
            const urlParams = getUrlParams();
            const humorIdFiltro = urlParams.filter_by === 'humor' ? urlParams.humor_id : null;
            cardPlaylist(humorIdFiltro);
        }
    } catch (error) {
        console.error('Erro ao excluir playlist:', error);
        mostrarMensagem("Erro ao excluir playlist", "error");
    }
}

async function favoritarPlaylist(idPlaylist, favorita) {
    try {
        const response = await fetch('api/favoritar-playlist.php', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id_playlist: idPlaylist, 
                favorita: favorita 
            })
        }).then(res => res.json());

        mostrarMensagem(response.message, response.type);
    } catch (error) {
        mostrarMensagem("Erro ao favoritar playlist", "error");
    }
}

async function favFiltro() {
  
  const fav = document.querySelector(".filter-tab");

  fav.addEventListener("click", async ()=> {
    


  });

}

// ===== MODAL DE DETALHES =====
async function mostrarDetalhesPlaylist(idPlaylist) {
    try {
        const modalExistente = document.querySelector('.playlist-modal');
        if (modalExistente) {
            modalExistente.remove();
        }

        const response = await fetch(`api/get-playlist-details.php?idPlaylist=${idPlaylist}`, {
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json());

        if (response.type === 'success') {
            const responseMusic = await fetch(`api/get-musica-detail.php?idPlaylist=${idPlaylist}`, {
                method: 'GET',
                credentials: 'include'
            }).then(res => res.json());

            if (responseMusic.type === 'error') {
                mostrarMensagem(responseMusic.message, responseMusic.type);
                return;
            }

            const duracaoTotal = calcularDuracaoTotal(responseMusic.data);
            
            const modalMusic = document.createElement("div");
            modalMusic.classList.add("playlist-modal");
            
            const musicasHtml = responseMusic.data.musicas && responseMusic.data.musicas.length > 0 
                ? responseMusic.data.musicas.map(musica => `
                    <li class="musica-item">
                        <div class="musica-info">
                            <img src="${musica.imagem || 'img/music-default.png'}" class="capa-musica" alt="Capa da música">
                            <div class="detalhes-musica">
                                <h4>${musica.nome || 'Título desconhecido'}</h4>
                                <p>${musica.artista?.nome || 'Artista desconhecido'} • ${musica.album?.nome || 'Álbum desconhecido'}</p>
                            </div>
                        </div>
                        <span class="duracao">${musica.duracao || '0:00'}</span>
                        <div class="acoes-musica">
                            <button class="editar-musica" data-id="${musica.id_musica}" title="Editar música">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="excluir-musica" data-id="${musica.id_musica}" title="Excluir música">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>
                `).join('')
                : '<li class="no-musics">Nenhuma música encontrada nesta playlist</li>';

            modalMusic.innerHTML = `
                <div class="modal-content">
                    <button class="close-btn">&times;</button>
                    
                    <img src="${response.data.imagem || 'img/playlistDefult.png'}" alt="Capa da Playlist" class="playlist-cover-img">
                    
                    <div class="playlist-header">
                        <h2>${response.data.nome || 'Playlist sem nome'}</h2>
                        <p class="playlist-owner">Criada por: ${response.data.usuario_nome || 'Usuário'}</p>
                        <p class="playlist-description">${response.data.descricao || "Esta playlist não possui descrição."}</p>
                        
                        <div class="playlist-meta">
                            <p><strong>Humor:</strong> ${response.data.humor || "Não definido"}</p>
                            ${response.data.descricao_humor ? `<p><strong>Descrição:</strong> ${response.data.descricao_humor}</p>` : ''}
                            <p class="playlist-duration"><strong>Duração total:</strong> ${duracaoTotal}</p>
                            <p><strong>Músicas:</strong> ${response.data.total_musicas || 0}</p>
                        </div>
                    </div>

                    <h3><i class="fas fa-music"></i> Músicas da Playlist</h3>
                    <ul class="musicas-list">${musicasHtml}</ul>

                    <div class="modal-actions">
                        <button id="btn-add-musica" class="btn-primary">
                            <i class="fas fa-plus"></i> Adicionar Música
                        </button>
                        <button id="btn-editar-playlist" class="btn-secondary">
                            <i class="fas fa-edit"></i> Editar Playlist
                        </button>
                    </div>
                </div>
            `;

            document.body.append(modalMusic);

            // Event listeners do modal
            const closeBtn = modalMusic.querySelector(".close-btn");
            closeBtn.addEventListener("click", () => {
                modalMusic.remove();
            });

            const btnAddMusica = modalMusic.querySelector("#btn-add-musica");
            const btnEditarPlaylist = modalMusic.querySelector("#btn-editar-playlist");

            if (btnAddMusica) {
                btnAddMusica.addEventListener("click", () => {
                    adicionarMusicaPlaylist(idPlaylist);
                });
            }

            if (btnEditarPlaylist) {
                btnEditarPlaylist.addEventListener("click", () => {
                    editarPlaylistCompleta(response.data);
                });
            }

            // Event listeners para ações das músicas
            adicionarEventosMusicasModal(modalMusic, idPlaylist);

            // Fechar modal ao clicar fora ou com ESC
            modalMusic.addEventListener('click', (e) => {
                if (e.target === modalMusic) {
                    modalMusic.remove();
                }
            });

            const closeModal = (e) => {
                if (e.key === 'Escape') {
                    modalMusic.remove();
                    document.removeEventListener('keydown', closeModal);
                }
            };
            document.addEventListener('keydown', closeModal);

        } else {
            mostrarMensagem("Erro ao carregar detalhes da playlist", "error");
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes da playlist:', error);
        mostrarMensagem("Erro ao carregar detalhes da playlist", "error");
    }
}

function adicionarEventosMusicasModal(modal, playlistId) {
    const botoesEditar = modal.querySelectorAll(".editar-musica");
    const botoesExcluir = modal.querySelectorAll(".excluir-musica");

    botoesEditar.forEach(botao => {
        botao.addEventListener("click", (e) => {
            e.stopPropagation();
            const idMusica = botao.getAttribute("data-id");
            editarMusicaPlaylist(idMusica, playlistId);
        });
    });

    botoesExcluir.forEach(botao => {
        botao.addEventListener("click", (e) => {
            e.stopPropagation();
            const idMusica = botao.getAttribute("data-id");
            excluirMusicaPlaylist(idMusica, playlistId);
        });
    });
}

// ===== FUNÇÕES DE AÇÕES (PLACEHOLDER) =====
async function adicionarMusicaPlaylist(playlistId) {
    mostrarMensagem("Funcionalidade de adicionar música em desenvolvimento", "info");
}

async function editarPlaylistCompleta(playlistData) {
    mostrarMensagem("Funcionalidade de editar playlist em desenvolvimento", "info");
}

async function editarMusicaPlaylist(musicaId, playlistId) {
    mostrarMensagem("Funcionalidade de editar música em desenvolvimento", "info");
}

async function excluirMusicaPlaylist(musicaId, playlistId) {
    if (confirm("Tem certeza que deseja excluir esta música da playlist?")) {
        try {
            const response = await fetch('api/delete-musica-playlist.php', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    id_musica: musicaId, 
                    id_playlist: playlistId 
                })
            }).then(res => res.json());

            mostrarMensagem(response.message, response.type);
            if (response.type === 'success') {
                document.querySelector('.playlist-modal')?.remove();
                mostrarDetalhesPlaylist(playlistId);
            }
        } catch (error) {
            console.error('Erro ao excluir música:', error);
            mostrarMensagem("Erro ao excluir música", "error");
        }
    }
}

// ===== FORMULÁRIO DE NOVA PLAYLIST =====
async function inicializarFormularioPlaylist() {
    const addPlaylist = document.querySelector(".new-playlist-btn");
    const resp = await fetch('api/check-session.php').then(res => res.json());

    if (addPlaylist && resp.logged) {
        addPlaylist.addEventListener("click", formularioPlaylist);
    }
}

async function formularioPlaylist() {
    if (document.querySelector('.form-playlist')) return;

    let musicasTemporarias = [];

    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");
    document.body.append(overlay);

    const divFormPlaylist = document.createElement("div");
    divFormPlaylist.classList.add("form-playlist");
    divFormPlaylist.innerHTML = `
    <form id='formPlaylist'>
    <h2>Criar Nova Playlist</h2>

    <label for="nomePlaylist">Nome da Playlist:</label>
    <input type="text" id="nomePlaylist" name="nomePlaylist" required>

    <label for="descricaoPlaylist">Descrição:</label>
    <input type="text" id="descricaoPlaylist" name="descPlaylist" required>

    <label for="humorPlaylist">Humor:</label>
    <select id="humores" name="humorPlay"><option value="">Escolha um humor</option></select>

    <label for="imagemPlaylist">Imagem da Playlist:</label>
    <input type="text" id="imagemPlaylist" placeholder="URL da imagem (opcional)" name="imgPlaylist">
 
    <label for="nomeMusica">Nome da Música:</label>
    <input type="text" id="nomeMusica" placeholder="Digite o nome da música" name="nomeMusica">  
    
    <label for="generoMusica">Gênero da Música:</label>
    <select id="genres" name="genero_id"><option value="">Escolha um gênero</option></select>

    <label for="nomeArtista">Nome do Artista:</label>
    <input type="text" name="artista" id="artistaPlaylist" placeholder="Digite o nome do artista">
    <div id="sugestoes-artista" style="display: none;"></div>
    <input type="hidden" id="id-artista" name="id_artista">
     
    <label for="nomeAlbum">Nome do Álbum:</label>
    <input type="text" name="album" id="albumPlaylist" placeholder="Digite o nome do álbum">

    <label for="duracaoMusica">Duração da Música:</label>
    <input type="text" name="duracao" id="duracaoPlaylist" placeholder="Duração (ex: 3:30)">

    <label for="imagemMusica">Imagem da Música:</label>
    <input type="text" id="imgMusica" placeholder="URL da imagem">
    
    <button type="button" id="adicionarMusica">Adicionar Música</button>
    
    <div id="listaMusicas"></div>

    <button id="salvarPlaylist" type="submit">Salvar</button>
    <button type="button" id="cancelarMusica">Cancelar Música</button>
    <button type="button" id="cancelarPlaylist">Cancelar</button>
</form>  
  `;
    document.body.append(divFormPlaylist);

    // Configuração dos elementos do formulário
    const humorPlaylist = document.querySelector("#humores");
    const genres = document.querySelector("#genres");
    renderizarSelectGeneros(genres);
    renderizarSelectHumores(humorPlaylist);

    // Configuração da busca de artista
    configurarBuscaArtista();

    // Event listeners dos botões
    const adicionarMusica = document.querySelector("#adicionarMusica");
    const cancelarMusica = document.querySelector("#cancelarMusica");
    const cancelarPlaylist = document.querySelector("#cancelarPlaylist");
    const formPlay = document.querySelector("#formPlaylist");

    adicionarMusica.addEventListener("click", () => adicionarMusicaTemporaria(musicasTemporarias));
    cancelarMusica.addEventListener("click", limparCamposMusica);
    cancelarPlaylist.addEventListener("click", () => {
        divFormPlaylist.remove();
        overlay.remove();
    });
    formPlay.addEventListener("submit", (e) => salvarPlaylist(e, musicasTemporarias, divFormPlaylist, overlay));
}

function configurarBuscaArtista() {
    const artistaPlaylist = document.querySelector("#artistaPlaylist");
    let searchTimeout;

    artistaPlaylist.addEventListener('input', function (e) {
        const nomeArtista = this.value.trim();
        clearTimeout(searchTimeout);

        if (nomeArtista === '') {
            document.getElementById('sugestoes-artista').innerHTML = '';
            document.getElementById('sugestoes-artista').style.display = 'none';
            return;
        }

        searchTimeout = setTimeout(() => {
            fetch('api/insert-musica.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome_artista: nomeArtista
                })
            })
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('sugestoes-artista');
                if (data.type === 'success' && data.data) {
                    const artista = data.data;
                    container.innerHTML = `
                        <div class="sugestao-artista">
                            <span>${artista.nome}</span>
                            <button type="button" class="btn-selecionar-artista" data-id="${artista.id_artista}" data-nome="${artista.nome.replace(/"/g, '&quot;')}">
                                Usar este artista
                            </button>
                        </div>
                    `;
                } else {
                    container.innerHTML = `
                        <div class="sugestao-criar">
                            <span>Artista não encontrado</span>
                            <button type="button" class="btn-criar-artista" data-nome="${nomeArtista.replace(/"/g, '&quot;')}">
                                Criar "${nomeArtista}"
                            </button>
                        </div>
                    `;
                }

                container.style.display = 'block';

                // Event listeners para os botões dinâmicos
                const btnSelecionar = container.querySelector('.btn-selecionar-artista');
                if (btnSelecionar) {
                    btnSelecionar.addEventListener('click', function() {
                        const idArtista = this.getAttribute('data-id');
                        const nomeArtista = this.getAttribute('data-nome');
                        selecionarArtista(idArtista, nomeArtista);
                    });
                }

                const btnCriar = container.querySelector('.btn-criar-artista');
                if (btnCriar) {
                    btnCriar.addEventListener('click', function() {
                        const nomeArtista = this.getAttribute('data-nome');
                        criarArtista(nomeArtista);
                    });
                }
            })
            .catch(error => {
                console.error('Erro na busca:', error);
            });
        }, 500);
    });
}

function selecionarArtista(idArtista, nomeArtista) {
    document.getElementById('artistaPlaylist').value = nomeArtista;
    document.getElementById('id-artista').value = idArtista;
    document.getElementById('sugestoes-artista').style.display = 'none';
}

function criarArtista(nomeArtista) {
    fetch('api/insert-musica.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            criar_artista: true,
            nome_artista: nomeArtista
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.type === 'success' && data.data) {
            const novoArtista = data.data;
            document.getElementById('artistaPlaylist').value = novoArtista.nome;
            document.getElementById('id-artista').value = novoArtista.id_artista;
            document.getElementById('sugestoes-artista').style.display = 'none';
        } else {
            mostrarMensagem(data.message || 'Erro ao criar artista', 'error');
        }
    })
    .catch(error => {
        console.error('Erro ao criar artista:', error);
        mostrarMensagem('Erro ao criar artista', 'error');
    });
}

function adicionarMusicaTemporaria(musicasTemporarias) {
    const nomeMusicaInput = document.querySelector("#nomeMusica");
    const generoSelect = document.querySelector("#genres");
    const artistaInput = document.querySelector("#artistaPlaylist");
    const albumInput = document.querySelector("#albumPlaylist");
    const duracaoInput = document.querySelector("#duracaoPlaylist");
    const imagemInput = document.querySelector("#imgMusica");

    const nomeMusicaValor = nomeMusicaInput.value.trim();
    const generoValor = generoSelect.value;
    const generoTexto = generoSelect.options[generoSelect.selectedIndex].text;
    const artistaValor = artistaInput.value.trim();
    const albumValor = albumInput.value.trim();
    const duracaoValor = duracaoInput.value.trim();
    const imagemValor = imagemInput.value.trim();

    if (nomeMusicaValor === "" || generoValor === "" || artistaValor === "" || albumValor === "" || duracaoValor === "") {
        mostrarMensagem("Por favor, preencha todos os campos de música.", "error");
        return;
    }

    const musica = {
        titulo: nomeMusicaValor,
        artista: artistaValor,
        album: albumValor,
        duracao: duracaoValor,
        imagem: imagemValor,
        generoId: generoValor,
        generoNome: generoTexto
    };

    musicasTemporarias.push(musica);
    atualizarListaMusicas(musicasTemporarias);
    limparCamposMusica();
    mostrarMensagem("Música adicionada à lista temporária!", "success");
}

function atualizarListaMusicas(musicasTemporarias) {
    const listaMusicas = document.querySelector("#listaMusicas");
    listaMusicas.innerHTML = "";
    
    musicasTemporarias.forEach((m, i) => {
        listaMusicas.innerHTML += `
            <div class="musica-temporaria">
                🎵 Música ${i + 1}: ${m.titulo} - ${m.artista} 
                <small>(${m.generoNome})</small>
                <button class="remover-musica" data-index="${i}">❌</button>
            </div>
        `;
    });

    document.querySelectorAll('.remover-musica').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            musicasTemporarias.splice(index, 1);
            atualizarListaMusicas(musicasTemporarias);
        });
    });
}

function limparCamposMusica() {
    document.querySelector("#nomeMusica").value = "";
    document.querySelector("#genres").value = "";
    document.querySelector("#artistaPlaylist").value = "";
    document.querySelector("#albumPlaylist").value = "";
    document.querySelector("#duracaoPlaylist").value = "";
    document.querySelector("#imgMusica").value = "";
}

async function salvarPlaylist(e, musicasTemporarias, divFormPlaylist, overlay) {
    e.preventDefault();
    
    const nomePlaylist = document.querySelector("#nomePlaylist");
    const humorPlaylist = document.querySelector("#humores");
    
    if (nomePlaylist.value.trim() === "" || musicasTemporarias.length === 0 || humorPlaylist.value.trim() === "") {
        mostrarMensagem("Por favor, preencha todos os campos.", "error");
        return;
    }

    try {
        const formPlaylist = document.querySelector("#formPlaylist");
        const fdPlaylist = new FormData(formPlaylist);

        const respPlaylist = await fetch('api/insert-playlist.php', {
            method: "POST",
            credentials: "include",
            body: fdPlaylist,
        }).then(res => res.json());

        mostrarMensagem(respPlaylist.message, respPlaylist.type);

        if (respPlaylist.type === 'success') {
            const playlistId = respPlaylist.id;
            let musicasInseridas = 0;

            for (const musica of musicasTemporarias) {
                const formMusica = new FormData();
                formMusica.append('playlistId', playlistId);
                formMusica.append('nomeMusica', musica.titulo);
                formMusica.append('artista', musica.artista);
                formMusica.append('album', musica.album);
                formMusica.append('duracao', musica.duracao);
                formMusica.append('genero_id', musica.generoId);
                formMusica.append('imagemUrl', musica.imagem);

                const respMusica = await fetch('api/insert-musica.php', {
                    method: "POST",
                    credentials: "include",
                    body: formMusica,
                }).then(res => res.json());

                if (respMusica.type === 'success') {
                    musicasInseridas++;
                }
            }

            mostrarMensagem(`Playlist criada com ${musicasInseridas} músicas adicionadas!`, 'success');
            divFormPlaylist.remove();
            overlay.remove();
            
            // Recarregar a lista de playlists
            const urlParams = getUrlParams();
            const humorIdFiltro = urlParams.filter_by === 'humor' ? urlParams.humor_id : null;
            cardPlaylist(humorIdFiltro);
        }

    } catch (error) {
        console.error('Erro ao criar playlist:', error);
        mostrarMensagem("Erro ao criar playlist", "error");
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = getUrlParams();
    
    if (urlParams.filter_by === 'humor' && urlParams.humor_id) {
        cardPlaylist(urlParams.humor_id);
    } else {
        cardPlaylist();
    }
    
    inicializarFormularioPlaylist();
});