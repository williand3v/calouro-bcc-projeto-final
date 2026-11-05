// Busca em todos os tópicos do site. Cada item: { t: título, u: endereço, x: texto sem acento }.
const sem = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// O texto tem todas as palavras de q? Ignora acento e maiúscula; busca vazia casa com tudo.
function contem(texto, q) {
  const x = sem(texto);
  return sem(q).split(/\s+/).filter(Boolean).every((p) => x.includes(p));
}

// Itens que têm todas as palavras de q; os que casam no título vêm primeiro.
function buscar(itens, q) {
  if (!q.trim()) return [];
  return itens
    .filter((i) => contem(i.x, q))
    .sort((a, b) => contem(b.t, q) - contem(a.t, q));
}

// Lê os tópicos (section.topic com id) de uma página já carregada.
function topicos(doc, pagina) {
  return [...doc.querySelectorAll("section.topic[id]")].map((s) => {
    const t = s.querySelector("h2")?.textContent.trim() || s.id;
    return { t, u: `${pagina}#${s.id}`, x: sem(t + " " + s.textContent) };
  });
}

if (typeof module !== "undefined") module.exports = { buscar, contem, topicos };
