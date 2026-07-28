---
name: create-skill
description: Create or adapt a skill in this skills collection. Use when the user wants to author a new skill, install/adapt an external skill into the collection, or says "create-skill" / "add-skill".
---

# Create Skill

Author skills in **this repo** (`skills/<name>/SKILL.md`). Consuming repos get them via `npx github:dholde/skills sync` — do not invent a different layout.

## Location (non-negotiable)

- **Put skills in `skills/<skill-name>/SKILL.md` only** (this repo).
- Consuming repos install under `.claude/skills/` via sync — never hand-copy into a project as the source of truth.
- Keep the skill directory flat unless scripts/reference files are truly needed.

## Prefer lean over frameworks

- Install **individual skills**, not whole skill frameworks (e.g. take Superpowers' `brainstorming`, not the full Superpowers stack).
- Skip heavyweight execution machinery (subagent runners, worktree orchestration, companion servers) unless the user explicitly asks for it.
- Match skill level to the task: high-level app design → brainstorming/planning skills; module interfaces → codebase-design-style skills.

## Authoring style

- Keep `SKILL.md` short and actionable. Prefer the brevity of existing skills like `research` unless the workflow genuinely needs more.
- Frontmatter: `name` (kebab-case) + `description` that states **what** and **when to use**.
- Infer preferences from conversation when the user asks to encode them; ask only if location/scope/trigger is still ambiguous.
- Skills that write docs assume consuming repos use `docs/specs/`, `docs/plans/`, and `docs/research/` (create on first use if missing).

## Installing / adapting an external skill

When copying from another repo (Superpowers, addyosmani, mattpocock, etc.):

1. Fetch the upstream `SKILL.md` (and only the companion files you will keep).
2. Adapt it so it runs **standalone**:
   - Rewrite output paths to the shared conventions (`docs/specs/`, `docs/plans/`, `docs/research/`).
   - Remove steps that invoke skills/tools that are not in this collection.
   - Drop Visual Companion / server / framework-only dependencies.
   - Replace "invoke skill X" terminals with a handoff the user can approve (or a skill that *is* in this repo).
3. Put an HTML comment near the top of the file noting source URL and every local change.
4. Do not leave upstream paths like `docs/superpowers/...`.

## Catalog update (required)

After adding or adapting a skill, update this repo's `README.md`:

- Add a row under **Skills in this repo**.
- Columns: skill name, one-line "what it does", link to local `skills/.../SKILL.md`, upstream source (or "local").
- Keep entries brief — pickable at a glance.

## After authoring

1. Skill lives under `skills/<name>/SKILL.md`.
2. Description is trigger-friendly; body matches shared paths and installed tooling.
3. External adaptations are commented with source + diffs.
4. `README.md` is updated.
5. Tell the user to run `npx github:dholde/skills sync` in each consuming repo (and commit the result) to pick up the new skill.
