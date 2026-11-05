// Rodar: node --test
const test = require("node:test");
const assert = require("node:assert");
const { rotuloData, linhasDoSemestre, periodoLetivo } = require("./fases.js");

const d = (s) => new Date(s + "T12:00:00");

test("fase sem data publicada não tem rótulo", () => {
  assert.strictEqual(rotuloData(2, d("2026-11-03")), null);
});

test("rótulo mostra o período; prazo passado vem marcado como encerrado", () => {
  assert.deepStrictEqual(rotuloData(4, d("2026-11-03")), {
    texto: "31/08 a 10/09/2026",
    encerrado: true,
  });
  assert.deepStrictEqual(rotuloData(5, d("2026-11-03")), {
    texto: "10/12/2026 a 04/01/2027",
    encerrado: false,
  });
});

const nomes = ["Antes de começar", "Inscrição", "Concordância e efetivação", "Alteração", "Trancamento", "Fechamento"];

test("período letivo mostra início e fim", () => {
  assert.strictEqual(periodoLetivo(), "10/08 a 19/12/2026");
});

test("linhas do semestre: uma por fase, na ordem, com o nome da fase", () => {
  const l = linhasDoSemestre(nomes, d("2026-11-03"));
  assert.deepStrictEqual(l.map((x) => x.nome), nomes);
});

test("linhas do semestre: fase sem data publicada fica com texto null", () => {
  const l = linhasDoSemestre(nomes, d("2026-11-03"));
  assert.strictEqual(l[0].texto, null);
  assert.strictEqual(l[2].texto, null);
});

test("linhas do semestre: fase com data traz período, descrição do IC e se já passou", () => {
  const l = linhasDoSemestre(nomes, d("2026-11-03"));
  assert.strictEqual(l[1].texto, "24/07 a 03/08/2026");
  assert.strictEqual(l[1].encerrado, true);
  assert.match(l[1].desc, /inscrição/i);
  assert.strictEqual(l[5].texto, "10/12/2026 a 04/01/2027");
  assert.strictEqual(l[5].encerrado, false);
  assert.match(l[5].desc, /graus e frequências/i);
});
