import assert from "node:assert/strict";
import { execSync, spawnSync } from "node:child_process";
import {
  existsSync,
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
const SCRIPT = join(REPO, "bin", "sync-writing-style.mjs");
const INSTALLER = join(REPO, "bin", "install.mjs");
const scratchDirs = [];

const BODY = `Write so a tired reader gets it on the first pass. Tight, like caveman lite.

- Lead with the point. Then the details.
- Short sentences. Numbered steps when there is more than one.
- Cut filler, hedging, and pleasantries. Keep articles and full sentences.
- Be concrete in whatever the topic is: an object, a step, or a concept.
- When you need a special word, introduce it in one plain sentence, then use it.
- Keep code, names, and error strings exact.`;

const BLOCK = `## Writing style

<!-- BEGIN writing-style -->
${BODY}
<!-- END writing-style -->
`;

const GIT_ENV = {
  ...process.env,
  GIT_AUTHOR_NAME: "test",
  GIT_AUTHOR_EMAIL: "test@example.com",
  GIT_COMMITTER_NAME: "test",
  GIT_COMMITTER_EMAIL: "test@example.com",
};

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

function runScript(args, opts = {}) {
  return spawnSync(process.execPath, [SCRIPT, ...args], {
    encoding: "utf8",
    ...opts,
  });
}

function initGitRepo(dir) {
  execSync("git init", { cwd: dir, stdio: "ignore" });
}

function commitAll(dir) {
  execSync("git add -A && git commit -m test --no-gpg-sign", {
    cwd: dir,
    env: GIT_ENV,
    stdio: "ignore",
  });
}

function assertNoDiff(dir) {
  const diff = spawnSync("git", ["diff", "--exit-code"], { cwd: dir, encoding: "utf8" });
  assert.equal(diff.status, 0, diff.stdout + diff.stderr);
  const status = spawnSync("git", ["status", "--porcelain"], {
    cwd: dir,
    encoding: "utf8",
  });
  assert.equal(status.stdout, "");
}

test("rule file is the verbatim body", () => {
  assert.equal(
    readFileSync(join(REPO, "rules", "writing-style.md"), "utf8"),
    `${BODY}\n`,
  );
});

test("empty repo: creates AGENTS.md and CLAUDE.md, second run has no diff", () => {
  const dir = scratch("writing-style-empty-");
  initGitRepo(dir);
  const first = runScript([dir]);
  assert.equal(first.status, 0, first.stderr);
  assert.equal(readFileSync(join(dir, "AGENTS.md"), "utf8"), BLOCK);
  assert.equal(readFileSync(join(dir, "CLAUDE.md"), "utf8"), "@AGENTS.md\n");
  commitAll(dir);
  const second = runScript([dir]);
  assert.equal(second.status, 0, second.stderr);
  assert.match(second.stdout, /unchanged/);
  assertNoDiff(dir);
});

test("existing AGENTS.md without markers: appends section, second run has no diff", () => {
  const dir = scratch("writing-style-append-");
  initGitRepo(dir);
  const original = "# Project\n\nLeave this line alone.\n";
  writeFileSync(join(dir, "AGENTS.md"), original);
  const first = runScript([dir]);
  assert.equal(first.status, 0, first.stderr);
  assert.equal(readFileSync(join(dir, "AGENTS.md"), "utf8"), `${original}\n${BLOCK}`);
  assert.equal(readFileSync(join(dir, "CLAUDE.md"), "utf8"), "@AGENTS.md\n");
  commitAll(dir);
  const second = runScript([dir]);
  assert.equal(second.status, 0, second.stderr);
  assertNoDiff(dir);
  assert.equal(readFileSync(join(dir, "AGENTS.md"), "utf8"), `${original}\n${BLOCK}`);
});

test("existing markers: replaces only the inner text and keeps the rest", () => {
  const dir = scratch("writing-style-markers-");
  initGitRepo(dir);
  const prefix = "# Keep\n\n";
  const suffix = "\n# After\n";
  const original = `${prefix}<!-- BEGIN writing-style -->\nOLD\n<!-- END writing-style -->${suffix}`;
  writeFileSync(join(dir, "AGENTS.md"), original);
  writeFileSync(join(dir, "CLAUDE.md"), "# Notes\n\n@AGENTS.md\n\nTail.\n");
  const first = runScript([dir]);
  assert.equal(first.status, 0, first.stderr);
  assert.equal(
    readFileSync(join(dir, "AGENTS.md"), "utf8"),
    `${prefix}<!-- BEGIN writing-style -->\n${BODY}\n<!-- END writing-style -->${suffix}`,
  );
  assert.equal(
    readFileSync(join(dir, "CLAUDE.md"), "utf8"),
    "# Notes\n\n@AGENTS.md\n\nTail.\n",
  );
  commitAll(dir);
  const second = runScript([dir]);
  assert.equal(second.status, 0, second.stderr);
  assertNoDiff(dir);
});

test("CLAUDE.md keeps existing lines and does not duplicate @AGENTS.md", () => {
  const dir = scratch("writing-style-claude-");
  writeFileSync(join(dir, "CLAUDE.md"), "# Notes\n\nKeep me.\n");
  const first = runScript([dir]);
  assert.equal(first.status, 0, first.stderr);
  assert.equal(
    readFileSync(join(dir, "CLAUDE.md"), "utf8"),
    "# Notes\n\nKeep me.\n@AGENTS.md\n",
  );
  const second = runScript([dir]);
  assert.equal(second.status, 0, second.stderr);
  assert.equal(
    readFileSync(join(dir, "CLAUDE.md"), "utf8"),
    "# Notes\n\nKeep me.\n@AGENTS.md\n",
  );
});

test("a mention of @AGENTS.md inside a sentence still gets its own line", () => {
  const dir = scratch("writing-style-claude-mention-");
  writeFileSync(join(dir, "CLAUDE.md"), "Read @AGENTS.md for rules.\n");
  const result = runScript([dir]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    readFileSync(join(dir, "CLAUDE.md"), "utf8"),
    "Read @AGENTS.md for rules.\n@AGENTS.md\n",
  );
});

test("broken markers abort and leave AGENTS.md untouched", () => {
  const dir = scratch("writing-style-broken-");
  const original = "<!-- BEGIN writing-style -->\nno end\n";
  writeFileSync(join(dir, "AGENTS.md"), original);
  const result = runScript([dir]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /broken writing-style marker pair/);
  assert.equal(readFileSync(join(dir, "AGENTS.md"), "utf8"), original);
  assert.equal(existsSync(join(dir, "CLAUDE.md")), false);
});

test("missing directory fails", () => {
  const result = runScript([join(tmpdir(), "writing-style-missing-nope")]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Not a directory/);
});

test("installer writing-style command forwards the target path", () => {
  const dir = scratch("writing-style-cli-");
  const result = spawnSync(process.execPath, [INSTALLER, "writing-style", dir], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(join(dir, "AGENTS.md"), "utf8"), BLOCK);
  assert.equal(readFileSync(join(dir, "CLAUDE.md"), "utf8"), "@AGENTS.md\n");
});

test("installer writing-style without a path prints usage", () => {
  const result = spawnSync(process.execPath, [INSTALLER, "writing-style"], {
    encoding: "utf8",
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /path-to-target-repo/);
});
