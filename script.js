/* IA usada: GitHub Copilot, como apoio para estruturar e revisar este código. */

const botaoMenu = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector("#menu-principal");
const botaoTema = document.querySelector(".theme-toggle");
const formularioContato = document.querySelector("#form-contato");
const listaProjetos = document.querySelector("#lista-projetos");

const projetos = [
  // PERSONALIZE: título, descrição, tecnologias, imagem, alt e link do seu projeto.
  { titulo: "Projeto Figma", descricao: "Demonstração da interface criada no Figma para o início do curso.", tecnologias: ["Figma"], imagem: "Screenshots/Captura de tela 2026-10-23 174625.png", alt: "Captura de tela do projeto de interface no Figma" },
  { titulo: "projeto html + css", descricao: "Prática de CSS e HTML.", tecnologias: ["HTML", "CSS"], imagem: "Screenshots/Captura de tela 2026-10-23 182006.png", alt: "Ilustração de uma página em telas diferentes" },
  { titulo: "Exercícios de JavaScript", descricao: "Pequenas interações para praticar funções, eventos e lógica.", tecnologias: ["HTML", "JavaScript"], imagem: "Screenshots/Captura de tela 2026-10-23 183600.png", alt: "Ilustração de código JavaScript" }
];

/** Recebe uma hora de 0 a 23 e devolve a saudação correspondente. */
function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) return "Bom dia";
  if (hora >= 12 && hora < 18) return "Boa tarde";
  return "Boa noite";
}

/** Abre ou fecha a navegação compacta e atualiza o estado acessível. */
function alternarMenu() {
  const menuAberto = botaoMenu.getAttribute("aria-expanded") === "true";
  botaoMenu.setAttribute("aria-expanded", String(!menuAberto));
  botaoMenu.setAttribute("aria-label", menuAberto ? "Abrir menu" : "Fechar menu");
  menuPrincipal.classList.toggle("is-open");
}

/** Atualiza o rótulo do botão de tema conforme o tema atual. */
function atualizarBotaoTema(temaEscuroAtivo) {
  botaoTema.setAttribute("aria-label", temaEscuroAtivo ? "Ativar tema claro" : "Ativar tema escuro");
  botaoTema.title = temaEscuroAtivo ? "Ativar tema claro" : "Ativar tema escuro";
  botaoTema.querySelector("span").textContent = temaEscuroAtivo ? "☀" : "☾";
}

/** Altera o tema, e persiste a preferência no navegador. */
function alternarTema() {
  const temaEscuroAtivo = document.body.classList.toggle("tema-escuro");
  localStorage.setItem("tema-portifolio", temaEscuroAtivo ? "escuro" : "claro");
  atualizarBotaoTema(temaEscuroAtivo);
}

/** Restaura o tema salvo anteriormente, se houver. */
function carregarTemaSalvo() {
  const temaEscuroAtivo = localStorage.getItem("tema-portifolio") === "escuro";
  document.body.classList.toggle("tema-escuro", temaEscuroAtivo);
  atualizarBotaoTema(temaEscuroAtivo);
}

/** Cria os cards de projeto com base no array e no filtro selecionado. */
function renderizarProjetos(filtro = "todos") {
  listaProjetos.replaceChildren();
  projetos
    .filter((projeto) => filtro === "todos" || projeto.tecnologias.includes(filtro))
    .forEach((projeto) => {
      const card = document.createElement("article");
      card.className = "project-card";
      const linkImagem = document.createElement("a");
      linkImagem.className = "project-image";
      linkImagem.href = projeto.link || "#contato";
      linkImagem.setAttribute("aria-label", `${projeto.titulo}: ${projeto.link ? "ver projeto" : "em breve"}`);
      const imagem = document.createElement("img");
      imagem.src = projeto.imagem;
      imagem.alt = projeto.alt;
      imagem.width = 640;
      imagem.height = 410;
      linkImagem.append(imagem);

      const conteudo = document.createElement("div");
      conteudo.className = "project-copy";
      const titulo = document.createElement("h3");
      titulo.textContent = projeto.titulo;
      const descricao = document.createElement("p");
      descricao.textContent = projeto.descricao;
      const etiquetas = document.createElement("ul");
      etiquetas.className = "project-tags";
      etiquetas.setAttribute("aria-label", "Tecnologias usadas");
      projeto.tecnologias.forEach((tecnologia) => {
        const etiqueta = document.createElement("li");
        etiqueta.textContent = tecnologia;
        etiquetas.append(etiqueta);
      });
      const linkProjeto = document.createElement("a");
      linkProjeto.className = "project-link";
      linkProjeto.href = projeto.link || "#contato";
      linkProjeto.textContent = projeto.link ? "Ver projeto ↗" : "Em breve — adicione seu link";
      conteudo.append(titulo, descricao, etiquetas, linkProjeto);
      card.append(linkImagem, conteudo);
      listaProjetos.append(card);
    });
}

/** Verifica os campos e mostra uma mensagem abaixo de cada campo inválido. */
function validarFormulario() {
  const nome = formularioContato.elements.nome;
  const email = formularioContato.elements.email;
  const mensagem = formularioContato.elements.mensagem;
  const consentimento = formularioContato.elements.consentimento;
  const erros = {
    nome: nome.value.trim().length < 2 ? "Digite seu nome (pelo menos 2 caracteres)." : "",
    email: email.validity.valid ? "" : "Digite um e-mail válido.",
    mensagem: mensagem.value.trim().length < 10 ? "A mensagem precisa ter pelo menos 10 caracteres." : "",
    consentimento: consentimento.checked ? "" : "Marque o consentimento para continuar."
  };
  Object.entries(erros).forEach(([campo, erro]) => {
    document.querySelector(`#erro-${campo}`).textContent = erro;
  });
  const primeiroCampoComErro = Object.keys(erros).find((campo) => erros[campo]);
  if (primeiroCampoComErro) {
    formularioContato.elements[primeiroCampoComErro].focus();
    return false;
  }
  return true;
}

/** Valida o formulário e informa sucesso sem enviar dados a um servidor. */
function processarFormulario(evento) {
  evento.preventDefault();
  const feedback = document.querySelector("#form-feedback");
  feedback.textContent = "";
  if (!validarFormulario()) return;
  formularioContato.reset();
  feedback.textContent = "Mensagem validada! Esta demonstração não envia seus dados.";
}

/** Marca o filtro ativo e mostra somente projetos da tecnologia escolhida. */
function filtrarProjetos(evento) {
  const botao = evento.target.closest(".filter-button");
  if (!botao) return;
  document.querySelectorAll(".filter-button").forEach((item) => {
    const selecionado = item === botao;
    item.classList.toggle("is-active", selecionado);
    item.setAttribute("aria-pressed", String(selecionado));
  });
  renderizarProjetos(botao.dataset.filter);
}

/** Insere a saudação baseada na hora local e o ano atual no rodapé. */
function atualizarDataDaPagina() {
  document.querySelector("#saudacao").textContent = obterSaudacao(new Date().getHours());
  document.querySelector("#ano-atual").textContent = new Date().getFullYear();
}

if (botaoMenu) {
  botaoMenu.addEventListener("click", alternarMenu);
}
if (menuPrincipal && botaoMenu) {
  menuPrincipal.addEventListener("click", (evento) => {
    if (!evento.target.closest("a")) return;
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    menuPrincipal.classList.remove("is-open");
  });
}
if (botaoTema) {
  botaoTema.addEventListener("click", alternarTema);
}
if (formularioContato) {
  formularioContato.addEventListener("submit", processarFormulario);
}
const barraDeFiltros = document.querySelector(".filter-bar");
if (barraDeFiltros) {
  barraDeFiltros.addEventListener("click", filtrarProjetos);
}

carregarTemaSalvo();
atualizarDataDaPagina();
if (listaProjetos) {
  renderizarProjetos();
}