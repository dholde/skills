import assert from "node:assert/strict";
import { execSync, spawnSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const INSTALLER = join(REPO, "bin", "install.mjs");
const scratchDirs = [];

function scratch(prefix) {
  const dir = mkdtempSync(join(tmpdir(), prefix));
  scratchDirs.push(dir);
  return dir;
}

after(() => {
  for (const dir of scratchDirs) {
    rmSync(dir, { recursive: true, force: true });
  }
});

function run(args, opts = {}) {
  return spawnSync(process.execPath, [INSTALLER, ...args], {
    encoding: "utf8",
    ...opts,
  });
}

function initGitRepo(dir) {
  execSync("git init", { cwd: dir, stdio: "ignore" });
}

test("sync copies skills into a consuming git repo and leaves extras", () => {
  const consumer = scratch("skills-sync-");
  initGitRepo(consumer);
  const extra = join(consumer, ".claude", "skills", "dinositter");
  mkdirSync(extra, { recursive: true });
  writeFileSync(join(extra, "SKILL.md"), "# local extra\n");
  const result = run(["sync"], { cwd: consumer });
  assert.equal(result.status, 0, result.stderr);
  const copied = join(consumer, ".claude", "skills", "writing-plans", "SKILL.md");
  assert.equal(existsSync(copied), true);
  assert.equal(lstatSync(join(consumer, ".claude", "skills", "writing-plans")).isSymbolicLink(), false);
  assert.equal(readFileSync(join(extra, "SKILL.md"), "utf8"), "# local extra\n");
});

test("sync refuses the skills source repo", () => {
  const result = run(["sync"], { cwd: REPO });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /source repo/i);
});

test("unknown command prints usage", () => {
  const result = run(["frobnicate"]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown command: frobnicate/);
  assert.match(result.stderr, /sync/);
});
