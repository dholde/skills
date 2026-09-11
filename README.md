# Agent Skills

Single git source of truth and catalog for my Cursor + Claude Code setup.

This repo is the only place authored skills and agent templates are maintained. Consuming projects adopt later; they are not edited from here.

**Agents — stale copies vs local extras:** `sync` overlays this repo's trees onto `<project>/.claude/skills/<name>/`. It does not empty those dirs first, so a consuming repo can be in between: new files from here plus leftover paths from an older copy. If a name is listed under **Skills in this repo**, dest-only files (or a whole leftover dir after we removed that skill here) are stale — delete those paths, or replace that one directory, then re-sync. Never `rm -rf .claude/skills`. Never delete skill *names* that do not exist in this repo (repo-local extras such as dinositter, backend, frontend).

## How I use this

- Cursor + Claude Code, no double maintenance.
- Always-on rules: consuming repo has `AGENTS.md` as the source of truth; `CLAUDE.md` is only `@AGENTS.md`. No `.cursorrules`, no `.cursor/rules/*.mdc`, no second copy under the project's `.cursor/skills/`.
- Skills and custom agents live under `.claude/skills/` and `.claude/agents/` in consuming repos so both tools load them (Cursor compatibility-loads `.claude/skills/` and `~/.claude/skills/`).
- Personal/invoke-on-demand skills from this repo: prefer symlink `~/.claude/skills/<name>` → `~/Repos/skills/skills/<name>` (live updates, one SoT).
- Keep COPY as an option via the installer for skills that must travel with a project's git (clones, Cloud Agents, `AGENTS.md` always-on reads): `npx github:dholde/skills sync` copies into `<project>/.claude/skills/` and leaves repo-local extras alone.
- Repo-local extras (e.g. dinositter, backend, frontend) stay only in the consuming project — never move them here.
- Third-party tool skills (Archify and similar): install with the official CLI globally; document here; do not put their files under `skills/`.

## Two skill lists (never mix them)

- **Skills in this repo** = files under `skills/<name>/` that we author or adapt. `sync` may copy these into a project. `link` may symlink them into `~/.claude/skills/`.
- **Global installs** = third-party tool skills we do **not** vendor. Document name, what it does, install command, update command. First row: Archify.

## Install / update

### Link (personal, live updates)

From this clone (not from the npx cache):

```bash
node ~/Repos/skills/bin/install.mjs link
```

Creates `~/.claude/skills/<name>` → this repo's `skills/<name>/` for every authored skill. Re-run after adding a skill here. Does not touch extra names already in `~/.claude/skills/` (e.g. Archify).

Do **not** run `npx github:dholde/skills link` — that would try to link an npx cache, which the installer refuses.

### Sync (copy into a project's git)

From any consuming git repo:

```bash
npx github:dholde/skills sync
```

Copies **all** skills from this repo into the current project's `.claude/skills/`. First run installs; later runs overlay matching names (they do not clear dest dirs first — see the stale-copy note at the top). Review the git diff, then commit.

Repo-local extras (skills that exist only in the consuming project) are left alone — sync only writes names that live here.

Do **not** write `.cursor/skills/` or `.agents/skills/` in consuming projects.

**Conventions skills assume:** docs land under `docs/specs/`, `docs/plans/`, and `docs/research/` (create on first use if missing).

**Author a new skill:** work in this repo (see `create-skill`), then `link` for personal use and/or `sync` into projects that need a git-tracked copy.

## Skills in this repo

| Skill | What it does | Local file | Upstream source |
| --- | --- | --- | --- |
| blog-idea-miner | Mines Cursor chats + git changes into short AI blog-post idea files under `blog-posts/ideas/`. | [SKILL.md](skills/blog-idea-miner/SKILL.md) | local |
| brainstorming | Socratic design refinement: one question at a time, 2–3 approaches with trade-offs, validated design doc in `docs/specs/`. | [SKILL.md](skills/brainstorming/SKILL.md) | [obra/superpowers `brainstorming`](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md) |
| caveman | Ultra-compressed output mode for token efficiency (levels: lite/full/ultra + wenyan). | [SKILL.md](skills/caveman/SKILL.md) | [JuliusBrussee/caveman `skills/caveman`](https://github.com/JuliusBrussee/caveman/blob/main/skills/caveman/SKILL.md) |
| check-pr-comments | Triage PR review comments against official docs and project design before planning fixes. | [SKILL.md](skills/check-pr-comments/SKILL.md) | local |
| create-release | Cut GitHub releases with semver tags, English titles, and bold-lead notes via `gh release create`. | [SKILL.md](skills/create-release/SKILL.md) | local |
| create-skill | Conventions for authoring/updating skills in this collection (incl. malice/safety review), symlink vs sync, and global third-party installs. | [SKILL.md](skills/create-skill/SKILL.md) | local |
| executing-plans | Executes a `docs/plans/` plan task-by-task in one continuous run: critical review first, exact steps, verifications, stop on blockers. | [SKILL.md](skills/executing-plans/SKILL.md) | [obra/superpowers `executing-plans`](https://github.com/obra/superpowers/blob/main/skills/executing-plans/SKILL.md) |
| executing-plans-step-wise | Variant of executing-plans: one task = one branch = one PR, then a **hard stop** for user review before the next task. | [SKILL.md](skills/executing-plans-step-wise/SKILL.md) | local (derived from executing-plans) |
| grill-me | Slash-command wrapper: runs a `grilling` session. | [SKILL.md](skills/grill-me/SKILL.md) | [mattpocock/skills `grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) |
| grilling | Relentless one-question-at-a-time interview to stress-test a plan or decision. Good after a design draft exists. | [SKILL.md](skills/grilling/SKILL.md) | [mattpocock/skills `grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md) |
| guide-me | Walk through a specific task one atomic step at a time; outline first, advance only on confirmation. | [SKILL.md](skills/guide-me/SKILL.md) | local |
| karpathy | Guardrails against common LLM coding mistakes (overcomplication, non-surgical changes, hidden assumptions). | [SKILL.md](skills/karpathy/SKILL.md) | [multica-ai/andrej-karpathy-skills `karpathy-guidelines`](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/skills/karpathy-guidelines/SKILL.md) (from [Karpathy's X post](https://x.com/karpathy/status/2015883857489522876)) |
| keep-me-relevant | Human implements learning-relevant parts (solo or guided coaching); agent sets the stage, hints, reviews. | [SKILL.md](skills/keep-me-relevant/SKILL.md) | local (ideas from [mentor-agent-skill](https://github.com/ahmealy/mentor-agent-skill), [codetrain](https://github.com/InferHaven/agent-skills/tree/main/codetrain), [socratic-review](https://smithery.ai/skills/rysweet/socratic-review)) |
| research | Background-agent investigation against primary sources; findings saved to `docs/research/` (or the repo's existing notes convention). | [SKILL.md](skills/research/SKILL.md) | [mattpocock/skills `research`](https://github.com/mattpocock/skills/blob/main/skills/engineering/research/SKILL.md) |
| teach-me | Topic teaching with research + repo check, outline, then human-gated atomic steps (strict advance signals). | [SKILL.md](skills/teach-me/SKILL.md) | local |
| writing-plans | Decomposes an approved design into bite-sized, independently testable tasks (exact files, code, commands) in `docs/plans/`. | [SKILL.md](skills/writing-plans/SKILL.md) | [obra/superpowers `writing-plans`](https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md) |

Every skill adapted from an external source carries an HTML comment at the top of its `SKILL.md` with the source URL and local changes (see `create-skill`).

Archify is **not** in this table. It is a global install (see below).

## Global installs

Third-party tool skills. We do **not** vendor these under `skills/`. Install with the official CLI; list them here.

| Skill | What it does | Install | Update |
| --- | --- | --- | --- |
| Archify | Invoke-only skill that turns a system description or repo into verifiable architecture, workflow, sequence, data-flow, and lifecycle diagrams (self-contained HTML). | `npx -y skills add tt-a1i/archify --skill archify --agent claude-code --global --yes` | `npx skills update` |

Do not add `--copy`. Do not add `--agent cursor` unless Cloud Agents need it. Do not copy Archify files into this repo. Do not add Archify to `AGENTS.md` (invoke-only).

## Agent templates

Source files in this repo (copy into a consuming project, do not symlink globally unless you choose to):

| Agent | File | Dest in a consuming repo |
| --- | --- | --- |
| planner | [agents/planner.md](agents/planner.md) | `.claude/agents/planner.md` |
| implementer | [agents/implementer.md](agents/implementer.md) | `.claude/agents/implementer.md` |
| verifier | [agents/verifier.md](agents/verifier.md) | `.claude/agents/verifier.md` |

Consuming repos copy these to `.claude/agents/` (not `.cursor/agents/`). Frontmatter plus `Read .claude/skills/…/SKILL.md` paths are intentional for Cursor.

## Skill repos that inspired this

| Repo | What it is |
| --- | --- |
| [obra/superpowers](https://github.com/obra/superpowers) | The most popular skills framework: full methodology (brainstorm → plan → TDD → subagent execution). Skills are individually adoptable. |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 24 lifecycle skills, lighter-weight than Superpowers. |
| [mattpocock/skills](https://github.com/mattpocock/skills) | Engineering-focused skills, strongest on module/interface design vocabulary. |
| [anthropics/skills](https://github.com/anthropics/skills) | Anthropic's official skills: document handling, MCP building, frontend design, skill authoring. |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Vercel's official React/Next.js performance and web design rules. |

## Resources

- [Comparison: agent-skills vs. Superpowers vs. mattpocock/skills](https://github.com/addyosmani/agent-skills/blob/main/docs/comparison.md) — honest side-by-side of how the three packs differ and when to reach for each.
- [Top agent skills overview (2026)](https://pinggy.io/blog/ai_agent_skills/) — survey of popular skills with use cases.
