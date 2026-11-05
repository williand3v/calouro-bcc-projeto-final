// No celular, cada linha de tabela vira um cartão com o nome da coluna antes de cada valor.
// Rótulo de cada célula: o nome da coluna, ou null para a cabeça da linha (TH) e células extras.
function rotular(nomes, tags) {
  return tags.map((t, i) => (t === "TD" && nomes[i] ? nomes[i].replace(/\s+/g, " ").trim() : null));
}

if (typeof document !== "undefined")
  document.querySelectorAll(".tabela").forEach((t) => {
    // ponytail: tabela com célula mesclada (rowspan) continua com rolagem lateral
    if (t.querySelector("[rowspan]")) return;
    const nomes = [...t.querySelectorAll("thead th")].map((h) => h.textContent);
    t.querySelectorAll("tbody tr").forEach((tr) => {
      const cel = [...tr.children];
      rotular(nomes, cel.map((c) => c.tagName)).forEach((r, i) => r && cel[i].setAttribute("data-label", r));
    });
    t.classList.add("empilha");
  });

if (typeof module !== "undefined") module.exports = { rotular };
