// Rodar: node --test
const test = require("node:test");
const assert = require("node:assert");
const { buscar, contem } = require("./busca.js");

test("contem: acha sem acento, de qualquer jeito de escrever", () => {
  assert.strictEqual(contem("Programação de Computadores I", "programacao"), true);
  assert.strictEqual(contem("Programação de Computadores I", "PROGRAMAÇAO de"), true);
  assert.strictEqual(contem("Programacao", "programação"), true);
});

test("contem: todas as palavras precisam estar; busca vazia casa com tudo", () => {
  assert.strictEqual(contem("Banco de Dados I", "banco redes"), false);
  assert.strictEqual(contem("Banco de Dados I", "  "), true);
});

const itens = [
  { t: "Trancamento de disciplinas", u: "guia.html#trancamento", x: "trancamento de disciplinas voce pode trancar ate o prazo" },
  { t: "Glossário", u: "guia.html#glossario", x: "glossario crid confirmacao de registro de inscricao" },
  { t: "Ônibus internos", u: "campus.html#onibus", x: "onibus internos linhas do campus" },
];

test("ignora acento e maiúscula", () => {
  assert.deepStrictEqual(buscar(itens, "ONIBUS").map((i) => i.u), ["campus.html#onibus"]);
});

test("acha pelo texto do tópico, não só pelo título", () => {
  assert.deepStrictEqual(buscar(itens, "crid").map((i) => i.u), ["guia.html#glossario"]);
});

test("todas as palavras precisam aparecer", () => {
  assert.deepStrictEqual(buscar(itens, "trancar prazo").length, 1);
  assert.deepStrictEqual(buscar(itens, "trancar onibus"), []);
});

test("título que casa vem antes de texto que casa", () => {
  const lista = [
    { t: "Outro", u: "a", x: "outro fala de trancamento" },
    { t: "Trancamento", u: "b", x: "trancamento" },
  ];
  assert.deepStrictEqual(buscar(lista, "trancamento").map((i) => i.u), ["b", "a"]);
});

test("busca vazia não devolve nada", () => {
  assert.deepStrictEqual(buscar(itens, "  "), []);
});
