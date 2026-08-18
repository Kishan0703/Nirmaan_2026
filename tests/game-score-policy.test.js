const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function loadTsModule(relativePath) {
  const filename = path.join(__dirname, "..", relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;

  const mod = { exports: {} };
  const fn = new Function("exports", "module", "require", "__filename", "__dirname", output);
  fn(mod.exports, mod, require, filename, path.dirname(filename));
  return mod.exports;
}

const { validateGameScore } = loadTsModule("lib/game-score.ts");

assert.deepEqual(validateGameScore(300), { ok: true, score: 300 });
assert.deepEqual(validateGameScore(840), { ok: true, score: 840 });
assert.deepEqual(validateGameScore(850), {
  ok: false,
  error: "Score is outside the allowed game range.",
});
assert.deepEqual(validateGameScore(2340, { gameDuration: 60, pointsPerBug: 10, spawnIntervalMs: 700 }), { ok: true, score: 2340 });
assert.deepEqual(validateGameScore(-1), {
  ok: false,
  error: "Invalid score value.",
});

console.log("game score policy tests passed");
