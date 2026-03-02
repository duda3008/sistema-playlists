console.log("Script todas-playlists.js carregado ✅");
const divList = document.querySelector("#playlistList");

async function carregarPlaylists() {
  const data = await fetch("php/playlist.php").then((res) => res.json());
  console.log("JSON recebido:", data);


  if (!data.playlists || !Array.isArray(data.playlists) || data.playlists.length === 0) {
    divList.innerHTML = `<p>${data.message || "Nenhuma playlist encontrada 😢"}</p>`;
    return;
  }

  data.playlists.forEach((p) => {
     
    const div = document.createElement("div");
    div.classList.add("playlist-card");
    div.innerHTML = `
      <img src="${p.imagem}" alt="Imagem da playlist ${p.nome}" />
      <div class="playlist-info">
        <div class="playlist-name">${p.nome}</div>
        <div class="playlist-description">${p.descricao}</div>
        <div class="playlist-meta">Humor: ${p.humor}</div>
      </div>`;

div.addEventListener("click", async () => {
  div.classList.add("glow");

  // Remove o brilho depois de 400ms
  setTimeout(() => div.classList.remove("glow"), 400);

      const resp = await fetch("php/playlist-acess.php", {
        method: "POST",
        body: new URLSearchParams({ id_playlist: p.id_playlist }),
      }).then((res) => res.json());

      console.log("Resposta do PHP:", resp);

      // Exibe mensagem estilo toast
      const divToast = document.createElement("div");
      divToast.classList.add("toast");
      if (resp.type) divToast.classList.add(resp.type);
      divToast.textContent = resp.message;
      document.body.appendChild(divToast);


      // Remove o toast depois de um tempo
      setTimeout(() => {
        divToast.classList.add("fade-out");
        setTimeout(() => divToast.remove(), 500);
      }, 3000);
    });

    divList.append(div);
  });
}

carregarPlaylists();

