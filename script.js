// Personagens fixos com imagens e níveis de poder
const personagens = [
  { nome: "Superman", tipo: "heroi", poder: 10, img: "url_superman" },
  { nome: "Batman", tipo: "heroi", poder: 9, img: "url_batman" },
  { nome: "Mulher Maravilha", tipo: "heroi", poder: 9, img: "url_mulher_maravilha" },
  { nome: "Flash", tipo: "heroi", poder: 9, img: "url_flash" },
  { nome: "Lanterna Verde", tipo: "heroi", poder: 8, img: "url_lanterna_verde" },
  { nome: "Lex Luthor", tipo: "vilao", poder: 7, img: "url_lex_luthor" },
  { nome: "Coringa", tipo: "vilao", poder: 8, img: "url_coringa" },
  { nome: "Ares", tipo: "vilao", poder: 9, img: "url_ares" },
  { nome: "Reverse-Flash", tipo: "vilao", poder: 9, img: "url_reverse_flash" },
  { nome: "Sinestro", tipo: "vilao", poder: 8, img: "url_sinestro" },
];

// Arrays para os times
let heroisEscolhidos = [];
let viloesEscolhidos = [];

// Preencher o dropdown de seleção
function preencherSelecao() {
  const select = document.getElementById("personagem");
  personagens.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.nome;
    option.textContent = `${p.nome} (${p.tipo === "heroi" ? "Herói" : "Vilão"})`;
    select.appendChild(option);
  });
}

// Adicionar personagem ao time escolhido
function adicionarPersonagem(event) {
  event.preventDefault();

  const nomePersonagem = document.getElementById("personagem").value;
  const lado = document.getElementById("lado").value;

  if (!nomePersonagem || !lado) return alert("Selecione um personagem e um lado.");

  const personagem = personagens.find((p) => p.nome === nomePersonagem);
  if (!personagem) return;

  if (lado === "herois" && heroisEscolhidos.length < 5) {
    heroisEscolhidos.push(personagem);
    atualizarLista("listaHerois", personagem);
  } else if (lado === "viloes" && viloesEscolhidos.length < 5) {
    viloesEscolhidos.push(personagem);
    atualizarLista("listaViloes", personagem);
  } else {
    alert("Já existem 5 personagens nesse lado!");
  }

  verificarTimes();
}

// Atualizar lista visual de personagens
function atualizarLista(listaId, personagem) {
  const lista = document.getElementById(listaId);
  const li = document.createElement("li");
  li.innerHTML = `<img src="${personagem.img}" alt="${personagem.nome}"> ${personagem.nome} (Poder: ${personagem.poder})`;
  lista.appendChild(li);
}

// Verificar se os times estão completos
function verificarTimes() {
  if (heroisEscolhidos.length > 0 && viloesEscolhidos.length > 0) {
    document.getElementById("finalizar").style.display = "block";
  }
}

// Finalizar o combate
function finalizarCombate() {
  const poderHerois = heroisEscolhidos.reduce((acc, h) => acc + h.poder, 0);
  const poderViloes = viloesEscolhidos.reduce((acc, v) => acc + v.poder, 0);

  const vencedor =
    poderHerois > poderViloes
      ? "Heróis venceram!"
      : poderHerois < poderViloes
      ? "Vilões venceram!"
      : "Empate!";

  document.getElementById("vencedor").textContent = vencedor;

  const reiniciarBtn = document.createElement("button");
  reiniciarBtn.textContent = "Reiniciar";
  reiniciarBtn.onclick = () => location.reload();
  document.getElementById("vencedor").appendChild(reiniciarBtn);
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  preencherSelecao();
  document.getElementById("formSelecao").addEventListener("submit", adicionarPersonagem);
  document.getElementById("finalizar").addEventListener("click", finalizarCombate);
});
