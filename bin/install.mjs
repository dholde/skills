#!/usr/bin/env node
/**
 * Install skills from this package.
 * Usage:
 *   npx github:dholde/skills sync   # copy into <cwd>/.claude/skills/
 *   npx github:dholde/skills writing-style <path-to-target-repo>
 */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  statSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");
const SKILLS_ROOT = join(PACKAGE_ROOT, "skills");
const USAGE = `Usage:
  npx github:dholde/skills sync
      Copy this package's skills into the current repo's .claude/skills/
  npx github:dholde/skills writing-style <path-to-target-repo>
      Copy rules/writing-style.md into <repo>/AGENTS.md and ensure CLAUDE.md has @AGENTS.md
`;

function assertGitRepo() {
  try {
    execSync("git rev-parse --show-toplevel", { stdio: "ignore" });
  } catch {
    console.error("Refusing to sync: not inside a git repository.");
    process.exit(1);
  }
}

/** Refuse syncing into this skills source repo (avoids nesting .claude/skills here). */
function assertNotSourceRepo() {
  try {
    if (realpathSync(process.cwd()) === realpathSync(PACKAGE_ROOT)) {
      console.error(
        "Refusing to sync into the skills source repo itself. Run sync from a consuming project.",
      );
      process.exit(1);
    }
  } catch {
    // realpath can fail for odd cwd; fall through
  }
  const pkgPath = join(process.cwd(), "package.json");
  if (!existsSync(pkgPath)) return;
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    if (pkg.name === "dholde-skills") {
      console.error(
        "Refusing to sync into the skills source repo itself. Run sync from a consuming project.",
      );
      process.exit(1);
    }
  } catch {
    // ignore unreadable package.json
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
  assertNotSourceRepo();
  const target = join(process.cwd(), ".claude", "skills");
  mkdirSync(target, { recursive: true });
  const names = listSkills();
  if (names.length === 0) {
    console.error(`No skills found under ${SKILLS_ROOT}`);
    process.exit(1);
  }
  for (const name of names) {
    cpSync(join(SKILLS_ROOT, name), join(target, name), { recursive: true });
    console.log(`synced ${name}`);
  }
  console.log(`\nDone. ${names.length} skill(s) → ${target}`);
  console.log("Review the git diff, then commit.");
}

const cmd = process.argv[2] ?? "sync";
if (cmd === "sync") {
  sync();
} else if (cmd === "writing-style") {
  const { syncWritingStyle } = await import("./sync-writing-style.mjs");
  syncWritingStyle(process.argv[3]);
} else {
  console.error(`Unknown command: ${cmd}\n\n${USAGE}`);
  process.exit(1);
}
