
const divList = document.querySelector("#playlistList");

async function carregarPlaylists() {
  const data = await fetch("php/recentes.php").then((res) => res.json());
  console.log("JSON recebido:", data);


  if (!data.playlists || !Array.isArray(data.playlists) || data.playlists.length === 0) {
    divList.innerHTML = `<p>${data.message || "Nenhuma playlist encontrada 😢"}</p>`;
    return;
  }

  data.playlists.forEach((p) => {
      console.log(`Renderizando playlist:`, p);
    const div = document.createElement("div");
    div.classList.add("playlist-card");
    div.innerHTML = `
      <img src="${p.imagem}" alt="Imagem da playlist ${p.nome}" />
      <div class="playlist-info">
        <div class="playlist-name">${p.nome}</div>
        <div class="playlist-description">${p.descricao}</div>
        <div class="playlist-meta">Humor: ${p.humor}</div>
      </div>
    `;
    divList.append(div);
  });
}

carregarPlaylists();

