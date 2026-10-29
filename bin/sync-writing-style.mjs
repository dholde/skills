#!/usr/bin/env node
/**
 * Copy rules/writing-style.md into a target repo's AGENTS.md
 * and ensure CLAUDE.md contains a line `@AGENTS.md`.
 *
 * Usage:
 *   node bin/sync-writing-style.mjs <path-to-target-repo>
 */

import { existsSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RULE_PATH = join(PACKAGE_ROOT, "rules", "writing-style.md");

const BEGIN = "<!-- BEGIN writing-style -->";
const END = "<!-- END writing-style -->";
const CLAUDE_LINE = "@AGENTS.md";

export function ruleBody() {
  if (!existsSync(RULE_PATH)) {
    console.error(`Missing rule file: ${RULE_PATH}`);
    process.exit(1);
  }
  return readFileSync(RULE_PATH, "utf8").replace(/\s+$/u, "");
}

/** Section appended when AGENTS.md has no markers. Ends with a newline. */
export function writingStyleSection(body) {
  return ["## Writing style", "", BEGIN, body, END, ""].join("\n");
}

export function applyAgents(existing, body) {
  const begin = existing.indexOf(BEGIN);
  const end = existing.indexOf(END);
  if (begin !== -1 || end !== -1) {
    if (begin === -1 || end === -1 || end < begin) {
      throw new Error(
        `AGENTS.md has a broken writing-style marker pair (${BEGIN} / ${END}).`,
      );
    }
    const innerStart = begin + BEGIN.length;
    return (
      existing.slice(0, innerStart) + "\n" + body + "\n" + existing.slice(end)
    );
  }
  const section = writingStyleSection(body);
  if (existing.length === 0) return section;
  let prefix = existing;
  if (!prefix.endsWith("\n")) prefix += "\n";
  if (!prefix.endsWith("\n\n")) prefix += "\n";
  return prefix + section;
}

export function applyClaude(existing) {
  if (existing.split(/\r?\n/u).some((line) => line.trim() === CLAUDE_LINE)) {
    return existing;
  }
  if (existing.length === 0) return `${CLAUDE_LINE}\n`;
  return existing.endsWith("\n")
    ? `${existing}${CLAUDE_LINE}\n`
    : `${existing}\n${CLAUDE_LINE}\n`;
}

function writeIfChanged(path, before, after) {
  if (after === before) {
    console.log(`unchanged ${path}`);
    return;
  }
  writeFileSync(path, after);
  console.log(`updated ${path}`);
}

export function syncWritingStyle(targetArg) {
  if (!targetArg) {
    console.error(
      "Usage: node bin/sync-writing-style.mjs <path-to-target-repo>",
    );
    process.exit(1);
  }
  const target = resolve(targetArg);
  if (!existsSync(target) || !statSync(target).isDirectory()) {
    console.error(`Not a directory: ${target}`);
    process.exit(1);
  }

  const body = ruleBody();
  const agentsPath = join(target, "AGENTS.md");
  const claudePath = join(target, "CLAUDE.md");
  const agentsExisting = existsSync(agentsPath)
    ? readFileSync(agentsPath, "utf8")
    : "";
  const claudeExisting = existsSync(claudePath)
    ? readFileSync(claudePath, "utf8")
    : "";

  let agentsNext;
  try {
    agentsNext = applyAgents(agentsExisting, body);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  writeIfChanged(agentsPath, agentsExisting, agentsNext);
  writeIfChanged(claudePath, claudeExisting, applyClaude(claudeExisting));
}

function invokedDirectly() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return realpathSync(entry) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (invokedDirectly()) {
  syncWritingStyle(process.argv[2]);
}
