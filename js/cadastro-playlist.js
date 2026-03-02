const form = document.querySelector("#formPlaylist");
const container = document.querySelector("#musicasContainer");
const btnMusic = document.querySelector("#addMusica");
let cont=0;

btnMusic.addEventListener("click", () =>{
  const divMusic=document.createElement("div");
  divMusic.innerHTML= `<input type="text" name="musicas[${contador}][nome]" placeholder="Nome da música" required>
    <input type="text" name="musicas[${contador}][artista]" placeholder="Artista" required>
    <input type="text" name="musicas[${contador}][album]" placeholder="Álbum">
    <input type="text" name="musicas[${contador}][dduracao]" placeholder="Duração">`;
container.appendChild(divMusic);
cont++;
  });

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fd = new FormData(form);


  const resp = await fetch("./php/insert-playlist.php", {
    method: "POST",
    credentials: "include",
    body: fd,
  }).then((res) => res.json());

  console.log(resp);

  if (resp.type === "success") {
    // redireciona só depois do insert ser concluído
    window.location.href = "todas-playlist.html";
  } else {
    alert("Falha ao criar playlist: " + resp.message);
  }
});
