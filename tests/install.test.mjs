import assert from "node:assert/strict";
import { execSync, spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
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

test("link symlinks this clone's skills into $HOME/.claude/skills", () => {
  const home = scratch("skills-link-home-");
  const result = run(["link"], { env: { ...process.env, HOME: home } });
  assert.equal(result.status, 0, result.stderr);
  const dest = join(home, ".claude", "skills", "brainstorming");
  assert.equal(lstatSync(dest).isSymbolicLink(), true);
  assert.equal(realpathSync(dest), realpathSync(join(REPO, "skills", "brainstorming")));
  assert.match(result.stdout, /linked brainstorming/);
});

test("link leaves extra names in ~/.claude/skills alone", () => {
  const home = scratch("skills-link-extra-");
  const extra = join(home, ".claude", "skills", "archify");
  mkdirSync(extra, { recursive: true });
  writeFileSync(join(extra, "SKILL.md"), "# not ours\n");
  const result = run(["link"], { env: { ...process.env, HOME: home } });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(lstatSync(extra).isSymbolicLink(), false);
  assert.equal(readFileSync(join(extra, "SKILL.md"), "utf8"), "# not ours\n");
});

test("link replaces a copied skill directory with a symlink", () => {
  const home = scratch("skills-link-replace-");
  const dest = join(home, ".claude", "skills", "caveman");
  mkdirSync(dest, { recursive: true });
  writeFileSync(join(dest, "SKILL.md"), "stale copy\n");
  const result = run(["link"], { env: { ...process.env, HOME: home } });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(lstatSync(dest).isSymbolicLink(), true);
  assert.equal(realpathSync(dest), realpathSync(join(REPO, "skills", "caveman")));
});

test("link is idempotent when the symlink already points at this clone", () => {
  const home = scratch("skills-link-idem-");
  mkdirSync(join(home, ".claude", "skills"), { recursive: true });
  symlinkSync(
    join(REPO, "skills", "research"),
    join(home, ".claude", "skills", "research"),
  );
  const result = run(["link"], { env: { ...process.env, HOME: home } });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    realpathSync(join(home, ".claude", "skills", "research")),
    realpathSync(join(REPO, "skills", "research")),
  );
});

test("link refuses to run from an npx cache path", () => {
  const cacheRoot = scratch("skills-npx-");
  const npxPkg = join(cacheRoot, "_npx", "fake", "node_modules", "dholde-skills");
  mkdirSync(join(npxPkg, "bin"), { recursive: true });
  mkdirSync(join(npxPkg, "skills", "dummy"), { recursive: true });
  writeFileSync(join(npxPkg, "skills", "dummy", "SKILL.md"), "# dummy\n");
  cpSync(INSTALLER, join(npxPkg, "bin", "install.mjs"));
  const home = scratch("skills-npx-home-");
  const result = spawnSync(
    process.execPath,
    [join(npxPkg, "bin", "install.mjs"), "link"],
    { encoding: "utf8", env: { ...process.env, HOME: home } },
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /npx cache/i);
  assert.equal(existsSync(join(home, ".claude", "skills", "dummy")), false);
});

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

test("unknown command prints usage for sync and link", () => {
  const result = run(["frobnicate"]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Unknown command: frobnicate/);
  assert.match(result.stderr, /sync/);
  assert.match(result.stderr, /link/);
});
