#!/usr/bin/env node
/**
 * Install skills from this package.
 * Usage:
 *   npx github:dholde/skills sync   # copy into <cwd>/.claude/skills/
 *   node bin/install.mjs link       # symlink this clone into ~/.claude/skills/
 */

import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  statSync,
  symlinkSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");
const SKILLS_ROOT = join(PACKAGE_ROOT, "skills");
const USAGE = `Usage:
  npx github:dholde/skills sync
      Copy this package's skills into the current repo's .claude/skills/
  node bin/install.mjs link
      Symlink this clone's skills into ~/.claude/skills/ (live updates)
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

function isNpxInstall() {
  const normalized = PACKAGE_ROOT.replaceAll("\\", "/");
  return normalized.includes("/_npx/") || normalized.includes("/npm/_npx/");
}

function assertCloneForLink() {
  if (isNpxInstall()) {
    console.error(
      "Refusing to link from an npx cache. Run from your clone:\n  node /path/to/skills/bin/install.mjs link",
    );
    process.exit(1);
  }
  if (!existsSync(join(PACKAGE_ROOT, ".git"))) {
    console.error(
      "Refusing to link: this is not a git clone of the skills repo.\nRun from your clone:\n  node /path/to/skills/bin/install.mjs link",
    );
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

function destLstat(dest) {
  try {
    return lstatSync(dest);
  } catch {
    return null;
  }
}

function isSymlinkTo(dest, src) {
  try {
    if (!lstatSync(dest).isSymbolicLink()) return false;
    return realpathSync(dest) === realpathSync(src);
  } catch {
    return false;
  }
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

function link() {
  assertCloneForLink();
  const target = join(homedir(), ".claude", "skills");
  mkdirSync(target, { recursive: true });
  const names = listSkills();
  if (names.length === 0) {
    console.error(`No skills found under ${SKILLS_ROOT}`);
    process.exit(1);
  }
  for (const name of names) {
    const src = join(SKILLS_ROOT, name);
    const dest = join(target, name);
    if (isSymlinkTo(dest, src)) {
      console.log(`linked ${name} (exists)`);
      continue;
    }
    if (destLstat(dest)) {
      rmSync(dest, { recursive: true, force: true });
    }
    symlinkSync(src, dest);
    console.log(`linked ${name}`);
  }
  console.log(`\nDone. ${names.length} skill(s) → ${target}`);
  console.log("These are live symlinks into this clone.");
}

const cmd = process.argv[2] ?? "sync";
if (cmd === "sync") {
  sync();
} else if (cmd === "link") {
  link();
} else {
  console.error(`Unknown command: ${cmd}\n\n${USAGE}`);
  process.exit(1);
}
