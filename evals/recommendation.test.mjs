import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("Prazo curto selects the express adjustment suggestion", () => {
  const start = html.indexOf('$$("#qs3 button").forEach');
  const end = html.indexOf("})});", start) + 5;
  const elements = {};
  const button = { textContent: "Prazo curto", addEventListener: (_event, callback) => callback() };
  runInNewContext(html.slice(start, end), {
    P: { o: "Trabalho diário", u: "Todo dia" }, dot() {},
    $$: (selector) => selector === "#qs3 button" ? [button] : [],
    $: (selector) => elements[selector] || (elements[selector] = { classList: { add() {} } }),
  });
  assert.equal(elements["#qres"].textContent, "Ajuste fino expresso");
  assert.match(html, /questionário não calcula medidas/);
});
