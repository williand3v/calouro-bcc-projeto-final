// Rodar: node --test
const test = require("node:test");
const assert = require("node:assert");
const { rotular } = require("./tabelas.js");

test("célula de dados recebe o nome da coluna; cabeça da linha não", () => {
  assert.deepStrictEqual(rotular(["Período", "Créditos", "Disciplinas"], ["TH", "TD", "TD"]), [
    null,
    "Créditos",
    "Disciplinas",
  ]);
});

test("nome da coluna perde quebra de linha e espaço sobrando", () => {
  assert.deepStrictEqual(rotular(["Seg a sex\n   RU Central"], ["TD"]), ["Seg a sex RU Central"]);
});

test("célula além das colunas fica sem rótulo", () => {
  assert.deepStrictEqual(rotular(["A"], ["TD", "TD"]), ["A", null]);
});
