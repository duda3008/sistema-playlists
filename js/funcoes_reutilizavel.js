async function checkLog() {
  const username = document.querySelector(".username");
  const imgUser = document.querySelector(".user-avatar");
  const respCabecalho= await fetch("api/cabecalho.php").then(res=> res.json());
  username.innerHTML= respCabecalho.nome;
  imgUser.src=respCabecalho.imagem;
  const user_menu = document.querySelector(".user-menu");
  const resp= await fetch('api/check-session.php').then(res=>res.json());
  
  user_menu.addEventListener("click", () => {
      if(resp.logged){
          mostrarMensagem("Vocâ não pode acessar o cadastro se já tiver uma conta, saia para mudar de conta.", 'error');
          return;
        }else{
          cadastrar();
        }
    });
};



function cadastrar() {
  if (document.querySelector("#cadastroDiv")) return;

  const div1 = document.createElement("div");
  div1.id = "div1";

  const cadastroDiv = document.createElement("div");
  cadastroDiv.id = "cadastroDiv";

  cadastroDiv.innerHTML = `
  <h2>Perfil do Usuário</h2>
  <form id="formPerfil">
  <label for="nome">Nome:</label>
  <input type="text" id="nome" placeholder="Digite seu nome" name="nome-user">
  
  <label for="email">Email:</label>
  <input type="email" id="email" placeholder="Digite seu e-mail" name="email">
  
  <label for="senha">Senha:</label>
  <input type="password" id="senha" placeholder="Digite sua senha" name="pass-user">
  <div class="botoes">
  <button type="submit" id="register">Registrar</button>
  </div>
  <div id="loginLink"><a href="#">Já tem uma conta?Clique aqui e faça login✨</a></div>
  </form>
  `;

  document.body.append(div1, cadastroDiv);

  document.getElementById("cadastroDiv").classList.add("visible");
  document.getElementById("div1").classList.add("visible");

  const loginLink = document.querySelector("#loginLink");
  loginLink.addEventListener("click", (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link
    loginRenderizar();
  });
}
// Em funcoes_reutilizavel.js, modifique a função loginRenderizar:
function loginRenderizar() {
  // Remove os elementos de cadastro antes de criar os de login
  const cadastroDiv = document.querySelector("#cadastroDiv");
  const div1 = document.querySelector("#div1");
  
  if (cadastroDiv) cadastroDiv.remove();
  if (div1) div1.remove();

  const loginDiv = document.createElement("div");
  loginDiv.id = "loginDiv";

  const divLogin = document.createElement("div");
  divLogin.id = "divLogin";

  loginDiv.innerHTML = `
  <h2>Login</h2>
  <form id="loginForm"> 
  <label for="loginEmail">Email:</label>
  <input type="email" id="loginEmail" placeholder="Digite seu e-mail" name="email">
  
  <label for="loginSenha">Senha:</label>
  <input type="password" id="loginSenha" placeholder="Digite sua senha" name="pass-user">

  <div class="botoes">
  <button type="submit" id="loginBtn">Login</button>
  </div>
  </form>
  `;

  document.body.append(divLogin, loginDiv);

  // Adiciona classes para estilização
  document.getElementById("loginDiv").classList.add("visible");
  document.getElementById("divLogin").classList.add("visible");

  // Adiciona o event listener diretamente no formulário
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const fd = new FormData(form);

    try {
        const resp = await fetch("api/login.php", {
            method: "POST",
            credentials: "include",
            body: fd
        }).then(res => res.json());
        
        mostrarMensagem(resp.message, resp.type);
        
        if (resp.type === "success") {
            // Limpa os campos e fecha o modal
            document.querySelector("#loginEmail").value = "";
            document.querySelector("#loginSenha").value = "";
            
            setTimeout(() => {
                const loginDiv = document.querySelector("#loginDiv");
                const divLogin = document.querySelector("#divLogin");
                if (loginDiv) loginDiv.remove();
                if (divLogin) divLogin.remove();
                
                atualizarCabecalho();
                location.href = "./index.html";
            }, 2000);
        }
    } catch (error) {
        console.error("Erro no login:", error);
        mostrarMensagem("Erro ao tentar fazer login", "error");
    }
  });
}

function mostrarMensagem(msg, type) {
  const msgAntiga = document.querySelector(".mensagem");
  if (msgAntiga) {
    msgAntiga.remove();
  }

  const mensagem = document.createElement("div");
  mensagem.classList.add("mensagem");
  mensagem.classList.add(type); // Adiciona a classe do tipo
  mensagem.innerHTML = msg;
  document.body.append(mensagem);
  
  setTimeout(() => {
    if (mensagem.parentNode) {
      mensagem.remove();
    }
  }, 3000); // Aumentei para 3 segundos para melhor leitura
}



async function atualizarCabecalho() {
  try {
    const resp = await fetch("api/check-session.php").then(res=>res.json()); 
    const username = document.querySelector("#username");
    const perfilUser = document.querySelector("#perfilUser");
    const btnConfig = document.querySelector("#config");

    if (resp.logged) {

      if (username) username.innerHTML = resp.user_name;
      if (perfilUser) perfilUser.src = resp.img;
      if (btnConfig) btnConfig.style.display = "block";
    } else {
  
      if (btnConfig) btnConfig.style.display = "none";
      if (username) username.innerHTML = "Usuário";
      if (perfilUser) perfilUser.src = "img/avatar.png";
    }
  } catch (error) {
    console.error("Erro ao atualizar cabeçalho:", error);

    const btnConfig = document.querySelector("#config");
    if (btnConfig) btnConfig.style.display = "none";
  }
}





export {
  cadastrar,
  mostrarMensagem,
  atualizarCabecalho,
checkLog
};
