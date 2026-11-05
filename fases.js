// Datas do período 2026.2. Fonte: calendário do IC em curso.html#calendario-ic (consultado em 26/10/2026).
// Chave = índice da fase em `phases` do index.html; valor = [início, fim, descrição do IC].
// Fases sem data publicada ficam de fora.
// ponytail: datas escritas à mão, atualizar a cada semestre junto com a tabela do curso.html.
const PERIODO = ["2026-08-10", "2026-12-19"];
const DATAS = {
  1: ["2026-07-24", "2026-08-03", "pedidos de inscrição em disciplinas (não calouros, no SIGA)"],
  3: ["2026-08-10", "2026-08-21", "alteração de pedidos de inscrição"],
  4: ["2026-08-31", "2026-09-10", "desistência e trancamento de disciplinas (no SIGA)"],
  5: ["2026-12-10", "2027-01-04", "lançamento de graus e frequências"],
};

const dia = (s) => new Date(s + "T12:00:00");
const br = (s) => s.split("-").reverse().join("/");

// "24/07 a 03/08/2026"; se os anos forem diferentes, os dois levam o ano.
function intervalo(a, b) {
  const mesmoAno = a.slice(0, 4) === b.slice(0, 4);
  return `${mesmoAno ? br(a).slice(0, 5) : br(a)} a ${br(b)}`;
}

// Texto do período da fase e se o prazo já passou. Sem data publicada, devolve null.
function rotuloData(i, hoje) {
  if (!DATAS[i]) return null;
  const [a, b] = DATAS[i];
  return { texto: intervalo(a, b), encerrado: dia(b) < hoje };
}

// Período letivo inteiro, por exemplo "10/08 a 19/12/2026".
const periodoLetivo = () => intervalo(...PERIODO);

// Uma linha por fase, na ordem: { nome, texto, desc, encerrado }. Sem data publicada: texto e desc null.
function linhasDoSemestre(nomes, hoje) {
  return nomes.map((nome, i) => {
    const r = rotuloData(i, hoje);
    return { nome, texto: r ? r.texto : null, desc: DATAS[i] ? DATAS[i][2] : null, encerrado: r ? r.encerrado : false };
  });
}

if (typeof module !== "undefined") module.exports = { rotuloData, linhasDoSemestre, periodoLetivo };
