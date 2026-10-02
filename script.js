const form = document.getElementById("movie-form");
const poster = document.getElementById("poster");
const genreEl = document.getElementById("poster-genre");
const titleEl = document.getElementById("poster-title");
const taglineEl = document.getElementById("poster-tagline");
const synopsisEl = document.getElementById("synopsis");
const statusEl = document.getElementById("synopsis-status");
const visualStyleSelect = document.getElementById("visual-style");
const movieTitleInput = document.getElementById("movie-title");

function formatPosterTitle(value) {
  const cleaned = value.trim();

  if (!cleaned) {
    return "SUA<br>HISTÓRIA";
  }

  const words = cleaned.split(/\s+/);
  const formatted = words.slice(0, 4).join(" ");

  if (formatted.length <= 16) {
    return formatted;
  }

  return formatted
    .split(" ")
    .slice(0, 3)
    .join(" ")
    .replace(/\s+/g, " ");
}

function updatePalette(value) {
  const palette = ["noite", "oceano", "floresta", "por do sol"].includes(value)
    ? value
    : "noite";

  poster.dataset.palette = palette;
}

function buildSynopsis({ genre, hero, setting, conflict, ending }) {
  const cleanedGenre = genre || "ficção científica";
  const cleanedHero = hero || "uma protagonista determinada";
  const cleanedSetting = setting || "uma cidade em movimento";
  const cleanedConflict = conflict || "quebrar um mistério antigo";
  const cleanedEnding = ending || "um desfecho surpreendente";

  return `Em um filme de ${cleanedGenre}, ${cleanedHero} enfrenta ${cleanedConflict} ${cleanedSetting}, até que ${cleanedEnding}.`;
}

function renderMoviePreview() {
  const genre = document.getElementById("genre").value || "ficção científica";
  const hero = document.getElementById("hero").value || "uma protagonista determinada";
  const setting = document.getElementById("setting").value || "em uma cidade que nunca dorme";
  const conflict = document.getElementById("conflict").value || "desvendar um segredo que muda tudo";
  const ending = document.getElementById("ending").value || "a verdade aparece no último minuto";
  const customTitle = movieTitleInput.value.trim();
  const currentPalette = visualStyleSelect.value;

  updatePalette(currentPalette);

  genreEl.textContent = (genre || "SEU PRÓXIMO GRANDE FILME").toUpperCase();
  titleEl.innerHTML = formatPosterTitle(customTitle);
  taglineEl.textContent = `${hero.charAt(0).toUpperCase() + hero.slice(1)} em ${setting}.`;
  synopsisEl.textContent = buildSynopsis({ genre, hero, setting, conflict, ending });
  statusEl.textContent = customTitle ? "PRÉVIA" : "RASCUNHO";
}

visualStyleSelect.addEventListener("change", () => {
  updatePalette(visualStyleSelect.value);
});

movieTitleInput.addEventListener("input", () => {
  const value = movieTitleInput.value.trim();
  titleEl.innerHTML = formatPosterTitle(value);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const requiredFields = [
    document.getElementById("genre"),
    document.getElementById("hero"),
    document.getElementById("setting"),
    document.getElementById("conflict"),
    document.getElementById("ending")
  ];

  const allFilled = requiredFields.every((field) => field.value && field.value.trim() !== "");

  if (!allFilled) {
    statusEl.textContent = "FALTA DADOS";
    statusEl.style.background = "rgba(247, 215, 120, 0.1)";
    statusEl.style.borderColor = "rgba(247, 215, 120, 0.28)";
    statusEl.style.color = "#f7d778";
    synopsisEl.textContent = "Escolha todos os elementos para montar a sua história.";
    return;
  }

  statusEl.style.background = "rgba(127, 230, 176, 0.1)";
  statusEl.style.borderColor = "rgba(127, 230, 176, 0.28)";
  statusEl.style.color = "#bafed0";

  renderMoviePreview();
});

renderMoviePreview();
