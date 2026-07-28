#!/usr/bin/env node
/**
 * Sync every skill from this package into the current repo's `.claude/skills/`.
 * Usage (from any git repo): `npx github:dholde/skills sync`
 */

import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_ROOT = join(__dirname, "..", "skills");
const TARGET = join(process.cwd(), ".claude", "skills");

function assertGitRepo() {
  try {
    execSync("git rev-parse --show-toplevel", { stdio: "ignore" });
  } catch {
    console.error("Refusing to sync: not inside a git repository.");
    process.exit(1);
  }
}

function listSkills() {
  return readdirSync(SKILLS_ROOT)
    .filter((name) => {
      const dir = join(SKILLS_ROOT, name);
      return (
        statSync(dir).isDirectory() && existsSync(join(dir, "SKILL.md"))
      );
    })
    .sort();
}

function sync() {
  assertGitRepo();
  mkdirSync(TARGET, { recursive: true });
  const names = listSkills();
  if (names.length === 0) {
    console.error(`No skills found under ${SKILLS_ROOT}`);
    process.exit(1);
  }
  for (const name of names) {
    cpSync(join(SKILLS_ROOT, name), join(TARGET, name), { recursive: true });
    console.log(`synced ${name}`);
  }
  console.log(`\nDone. ${names.length} skill(s) → ${TARGET}`);
  console.log("Review the git diff, then commit.");
}

const cmd = process.argv[2] ?? "sync";
if (cmd === "sync") {
  sync();
} else {
  console.error(`Unknown command: ${cmd}\n\nUsage:\n  npx github:dholde/skills sync`);
  process.exit(1);
}
