import {
  mostrarMensagem,

} from "./funcoes_reutilizavel.js";

const username = document.querySelector(".username");
const logout = document.querySelector(".logout-button");
const resp= await fetch("api/cabecalho.php").then(res=> res.json());
username.innerHTML= resp.nome;
logout.addEventListener("click", ()=>{
  logoutBtn();
})

async function logoutBtn() {
  const resp = await fetch("api/logout.php").then(res => res.json());
  mostrarMensagem(resp.message,resp.type);
  setTimeout(() => {
   window.location.href = "./index.html";
  
  },3000);
  // window.location.href = "./index.html";
}


const profilePic = document.querySelector(".profile-pic img");
profilePic.src = resp.imagem;
const perfilUser = document.querySelector(".user-avatar");

username.innerHTML = `${resp.nome}`;
perfilUser.src = `${resp.imagem}`;

const nomeConfig = document.querySelector("#nomeConfig");
nomeConfig.innerHTML = `${resp.nome}`;

function atualizarFotoPerfil(url) {
  // Atualiza a foto na página atual
  const imgPerfil = document.querySelector(".profile-pic img");
  if (imgPerfil) {
    imgPerfil.src = url;
  }

  // Atualiza a foto no header
  const perfilUser = document.querySelector(".user-avatar");
  if (perfilUser) {
    perfilUser.src = url;
  }

  loggedUser.img = url;
  saveUser(loggedUser);
  users = loadUsers().users;
}

const btnAlterarEmail = document.querySelector("#alterarEmail");
const btnAlterarSenha = document.querySelector("#alterarSenha");
const btnAlterarNome= document.querySelector("#alterarNome");
btnAlterarEmail.addEventListener("click", () => {
  Alteracao("Email", "email");
});

btnAlterarSenha.addEventListener("click", () => {
  Alteracao("Senha", "password");
});
btnAlterarNome.addEventListener("click", () => {
    Alteracao("Nome", "text");
})

function Alteracao(rotulo, tipoInput) {
      if (document.querySelector(".alteracao")) return;

  const divAlterar = document.createElement("div");
  divAlterar.classList.add("alteracao");

  divAlterar.innerHTML = `
        <span>
            <label>${rotulo}</label>
            <input type="${tipoInput}" id="campodeAlteracao">
        </span>
        <button id= "confirmarAlteracao">Alterar ${rotulo}</button>
    `;
  document.body.append(divAlterar);


  const button = document.querySelector("#confirmarAlteracao");
  const input = document.querySelector("#campodeAlteracao");

  button.addEventListener("click", () => {
    const novoValor = input.value.trim();

    if(!novoValor){
         mostrarMensagem(`${rotulo} não pode estar vazio!`);
            return;
    }

    if (rotulo == "Email") {
      loggedUser.email = novoValor;
     
    } else if (rotulo == "Senha") {
      loggedUser.senha = input.value;
    }else if(rotulo == "Nome"){
         loggedUser.nome = input.value;
         nomeConfig.innerHTML = `${loggedUser.nome}`;
         username.innerHTML = `${loggedUser.nome}`;
    }

 saveUser(loggedUser);
  users = loadUsers().users;
      mostrarMensagem(`${rotulo} alterado com sucesso!`);
      divAlterar.remove();

  });
}

if (loggedUser.id != -1) {
  logout.addEventListener("click", () => {
    // Atualiza o valor do usuário logado no momento do clique

    if (loggedUser.id != -1) {
      localStorage.removeItem("logged-user");
      mostrarMensagem("Logout realizado com sucesso!");
      setTimeout(() => {
        location.href = "index.html";
      }, 1000);
    } else {
      mostrarMensagem("Nenhum usuário está logado.");
    }
  });
} else {
  mostrarMensagem(
    "Você precisa estar cadastrado ou ter feito login para poder acessar as configurações."
  );
}


const bntFoto = document.querySelector(".edit-profile");

bntFoto.addEventListener("click", () => {
  if (document.querySelector(".divFoto")) return;

  const divFoto = document.createElement("div");
  divFoto.classList.add("divFoto");
  divFoto.innerHTML = `
<h2> Insira o endereço da sua nova foto de perfil aqui:🔍 </h2>
<span id="spanFoto"> 
<input type="text"  id="inputFoto" placeholder="Cole o endereço da imagem aqui" >
<button id="confirmarFoto">Confirmar</button>
</span>
<div id="previewFoto"></div>
`;

  document.body.append(divFoto);

  const inputFoto = document.querySelector("#inputFoto");
  const confirmarBtn = divFoto.querySelector("#confirmarFoto");
  const preview = divFoto.querySelector("#previewFoto");

  inputFoto.addEventListener("input", () => {
    const url = inputFoto.value.trim();
    preview.innerHTML = `<img src="${url}" alt="Nova foto de perfil" width="150">`;
  });

  confirmarBtn.addEventListener("click", () => {
    const url = inputFoto.value.trim();

    if (!url) {
      mostrarMensagem(
        "É necessário colocar o endereço da imagem para modificá-la."
      );
      return;
    }

    atualizarFotoPerfil(url);
    divFoto.remove();
    mostrarMensagem("Foto atualizada com sucesso!");
  });
});
/*no inicio já atualizar o nome do span, usando o leggedUser em todas as páginas*/

document.addEventListener('DOMContentLoaded', () => {

    const opcoes = document.querySelectorAll('.theme-option');
    const body = document.body;
    const somSwitch2 = new Audio("sound/switch2.mp3");

    const temaSalvo = localStorage.getItem('theme') || 'dark';
    aplicarTema(temaSalvo);

    opcoes.forEach(opcao => {

        if (opcao.dataset.theme === temaSalvo) {
            opcao.classList.add('active');
        }
  
        opcao.addEventListener('click', function() {
            somSwitch2.currentTime = 0;
            somSwitch2.play();

            const theme = this.dataset.theme;
            aplicarTema(theme);
            localStorage.setItem('theme', theme);

            opcoes.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function aplicarTema(theme) {

        body.className = '';
        if (theme === 'light') {

            body.classList.add('light-mode');

        } else if (theme !== 'dark') {

            body.classList.add(`${theme}-mode`);

        }
    }
});

// Quando a página carrega, pega o tema salvo (ou usa 'dark').
// Aplica esse tema no <body>.
// Para cada botão de tema:
// Marca como ativo se for o tema atual.
// Ao clicar, toca um som, aplica o novo tema, salva no navegador e marca como ativo.
// A função aplicarTema só troca a classe do <body> conforme o tema escolhido.