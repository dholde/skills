# Cloud vs local skills (Archify / global installs)

Question: how to give Cloud Agents third-party skills installed only on the laptop (`~/.claude/skills/`), without vendoring them into every consuming repo.

## What the platforms actually load

Cursor discovers project skills from `.agents/skills/` and `.cursor/skills/`, plus compatibility paths `.claude/skills/` and `.codex/skills/`. User-level on the *local* machine: `~/.cursor/skills/`, `~/.agents/skills/`, and compatibility `~/.claude/skills/`. ([Cursor Skills](https://cursor.com/docs/skills))

Claude Code: personal `~/.claude/skills/<name>/SKILL.md`; project `.claude/skills/<name>/SKILL.md`. ([Claude Code Skills](https://code.claude.com/docs/en/skills))

The `npx skills` CLI installs Cursor global to `~/.cursor/skills/` and Claude Code global to `~/.claude/skills/`. Project Cursor target is `.agents/skills/`. ([vercel-labs/skills](https://github.com/vercel-labs/skills))

## Cloud Agents do not see the Mac home directory

Cloud Agents run on isolated Ubuntu VMs. ([Cloud Agent setup](https://cursor.com/docs/cloud-agent/setup)) User-level skills stay on the laptop until synced. Cursor **does not copy** `~/.agents/skills/` or other unsynced local skills to Cloud Agents. **Only `~/.cursor/skills/` syncs.** ([Cursor Skills — Use personal skills with Cloud Agents](https://cursor.com/docs/skills))

Archify was installed with `--agent claude-code --global`, so it landed in `~/.claude/skills/archify`. That path is loaded locally by Cursor (compatibility), but it is **not** the Cloud sync source.

## Official ways to get a skill onto Cloud Agents

1. **Commit project skills** — always available to Cloud Agents from the checkout. Cursor’s default for team/shared workflows. ([Cloud Agents FAQ](https://cursor.com/help/ai-features/cloud-agents), [best practices](https://cursor.com/docs/cloud-agent/best-practices))
2. **Sync Skills for Cloud Agents** — Settings → Agents → copy `~/.cursor/skills/` to *your* Cloud Agents (private, not teammates). ([Cursor Skills](https://cursor.com/docs/skills))
3. **Environment install script (IaC)** — `.cursor/environment.json` `install` runs on each Cloud Build (must be idempotent). Closest “provision the VM” hook. ([Cloud Agent setup](https://cursor.com/docs/cloud-agent/setup))
4. **Team marketplace** — publish so teammates install a copy. Distinct from personal sync. ([Cursor Skills](https://cursor.com/docs/skills))

There is no first-party “one config file provisions laptop Claude Code + laptop Cursor + Cloud Agents + teammates” skills catalog. `agentskills.io` is a file-format standard, not a deployment plane.

## Implication for this catalog

Authored skills in a consuming repo’s git (`.claude/skills/`) is the usual Cloud-safe path — already used.

For invoke-only third-party tools (Archify): do **not** need to vendor into every repo if Cloud use is personal. Dual-install to `~/.cursor/skills/` and enable Sync Skills. Use environment `install` or a project-level `npx skills add` (no `--global`) only when Cloud Agents that are *not* you (GitHub `@cursor`, teammates) must have it.
