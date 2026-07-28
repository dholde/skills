# Agent Skills

Personal collection of Cursor / Claude Code skills. Source of truth for every skill used across repos. Consuming projects install a copy under `.claude/skills/` (works in Cursor today; Claude Code–ready).

## Install / update

From any git repo:

```bash
npx github:dholde/skills sync
```

This copies **all** skills from this repo into the current project's `.claude/skills/`. First run installs; later runs overwrite with the latest. Review the git diff, then commit.

Repo-local extras (skills that exist only in the consuming project) are left alone — sync only writes names that live here.

**Conventions skills assume:** docs land under `docs/specs/`, `docs/plans/`, and `docs/research/` (create on first use if missing).

**Author a new skill:** work in this repo (see `create-skill`), then sync into projects that should get it.

## Skills in this repo

| Skill | What it does | Local file | Upstream source |
| --- | --- | --- | --- |
| blog-idea-miner | Mines Cursor chats + git changes into short AI blog-post idea files under `blog-posts/ideas/`. | [SKILL.md](skills/blog-idea-miner/SKILL.md) | local |
| brainstorming | Socratic design refinement: one question at a time, 2–3 approaches with trade-offs, validated design doc in `docs/specs/`. | [SKILL.md](skills/brainstorming/SKILL.md) | [obra/superpowers `brainstorming`](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md) |
| caveman | Ultra-compressed output mode for token efficiency (levels: lite/full/ultra + wenyan). | [SKILL.md](skills/caveman/SKILL.md) | [JuliusBrussee/caveman `skills/caveman`](https://github.com/JuliusBrussee/caveman/blob/main/skills/caveman/SKILL.md) |
| check-pr-comments | Triage PR review comments against official docs and project design before planning fixes. | [SKILL.md](skills/check-pr-comments/SKILL.md) | local |
| create-release | Cut GitHub releases with semver tags, English titles, and bold-lead notes via `gh release create`. | [SKILL.md](skills/create-release/SKILL.md) | local |
| create-skill | Conventions for authoring skills in this collection and syncing them into consuming repos. | [SKILL.md](skills/create-skill/SKILL.md) | local |
| executing-plans | Executes a `docs/plans/` plan task-by-task in one continuous run: critical review first, exact steps, verifications, stop on blockers. | [SKILL.md](skills/executing-plans/SKILL.md) | [obra/superpowers `executing-plans`](https://github.com/obra/superpowers/blob/main/skills/executing-plans/SKILL.md) |
| executing-plans-step-wise | Variant of executing-plans: one task = one branch = one PR, then a **hard stop** for user review before the next task. | [SKILL.md](skills/executing-plans-step-wise/SKILL.md) | local (derived from executing-plans) |
| grill-me | Slash-command wrapper: runs a `grilling` session. | [SKILL.md](skills/grill-me/SKILL.md) | [mattpocock/skills `grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) |
| grilling | Relentless one-question-at-a-time interview to stress-test a plan or decision. Good after a design draft exists. | [SKILL.md](skills/grilling/SKILL.md) | [mattpocock/skills `grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md) |
| guide-me | Walk through a specific task one atomic step at a time; outline first, advance only on confirmation. | [SKILL.md](skills/guide-me/SKILL.md) | local |
| karpathy | Guardrails against common LLM coding mistakes (overcomplication, non-surgical changes, hidden assumptions). | [SKILL.md](skills/karpathy/SKILL.md) | [multica-ai/andrej-karpathy-skills `karpathy-guidelines`](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/skills/karpathy-guidelines/SKILL.md) (from [Karpathy's X post](https://x.com/karpathy/status/2015883857489522876)) |
| keep-me-relevant | Human implements learning-relevant parts (solo or guided coaching); agent sets the stage, hints, reviews. | [SKILL.md](skills/keep-me-relevant/SKILL.md) | local (ideas from [mentor-agent-skill](https://github.com/ahmealy/mentor-agent-skill), [codetrain](https://github.com/InferHaven/agent-skills/tree/main/codetrain), [socratic-review](https://smithery.ai/skills/rysweet/socratic-review)) |
| research | Background-agent investigation against primary sources; findings saved to `docs/research/` (or the repo's existing notes convention). | [SKILL.md](skills/research/SKILL.md) | [mattpocock/skills `research`](https://github.com/mattpocock/skills/blob/main/skills/engineering/research/SKILL.md) |
| writing-plans | Decomposes an approved design into bite-sized, independently testable tasks (exact files, code, commands) in `docs/plans/`. | [SKILL.md](skills/writing-plans/SKILL.md) | [obra/superpowers `writing-plans`](https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md) |

Every skill adapted from an external source carries an HTML comment at the top of its `SKILL.md` with the source URL and local changes (see `create-skill`).

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
