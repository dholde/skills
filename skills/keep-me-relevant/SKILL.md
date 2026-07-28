---
name: keep-me-relevant
description: Hand learning-relevant implementation work to the human (solo or guided coaching), then review and iterate. Use when a task involves framework-typical code (React components, data loading, API routes), design patterns, or interview-relevant skills — integrated into real project work, not as a tutorial.
---

<!-- Original local skill. Inspiration (ideas only; not installed):
     - Hint tiers: https://github.com/ahmealy/mentor-agent-skill
     - Teachable moments on real branches: https://github.com/InferHaven/agent-skills/tree/main/codetrain
     - Question-first review: https://smithery.ai/skills/rysweet/socratic-review
     Deliberately not adopted: web UIs, companion servers, weak-area/learning logs.
     Guided mode (2026-07-23): atomic one-step-at-a-time delivery — never dump a multi-step
     checklist; wait for check-in before the next step; restate current step after Q&A.
     Refined 2026-07-23: repeated framework patterns are hand-over candidates (memorization);
     guided steps include a mandatory Background element.
     Refined 2026-07-23: stage-setting goal must be 1–2 exact sentences; Background is a
     per-item "what you'll use" list (thing → what it is → why here vs alternative).
     Refined 2026-07-23: when the human asks for code, give real project code (correct
     paths/names) — never renamed "transfer" examples that look pasteable but won't run.
     Refined 2026-07-23: Background is tutor judgment, not a checklist — explain what a
     curious human would need (origin, meaning, why here); examples in the skill are
     illustrative only, never exhaustive. -->

# Keep Me Relevant

## Purpose

Keep the human interview-ready and fluent in their own codebase by implementing the **valuable** parts themselves. Learning happens on real plan tasks — not artificial exercises.

**Announce when active:** "I'm using keep-me-relevant: you implement the learning-relevant part; I coach and review."

## When it applies (detection)

**Offer when the work includes:**
- Framework-typical building blocks (React component, data loading/queries, API route handler, Zod schema design, streaming chat UI, i18n wiring)
- A named design pattern or seam worth owning
- A technique that shows up in interviews for this stack
- Repetition of a framework pattern the human has done before (another component, another route, another schema) — repetition is how patterns become memory. For repeats, default the suggestion to **solo** (the human knows the shape; coaching can be lighter), but all modes stay available.

**Skip (do not offer):**
- Boilerplate, config, lockfiles, generated code
- Pure content/markdown edits, drive-by renames, docs-only changes

## The offer

When a candidate is detected (or the user invokes `/keep-me-relevant`), ask **one** short question with these options:

1. **Solo** — you implement it fully
2. **Guided** — you implement with step-by-step coaching in chat
3. **Split** — you write the core; agent does boilerplate + tests
4. **Agent** — agent implements as usual

Never nag. If declined (option 4), do not re-offer for similar items in the same task.

## Human-implements mode (solo or guided)

**Stage-setting (always first, keep it short):** **Goal in 1–2 exact sentences** — precise phrasing of what will exist and work when done (no filler, no restating the plan); then the verification command/check that proves success; then a **numbered roadmap of step titles only** (no instructions yet). Then immediately give **Step 1** — nothing more.

**Hard rule (default):** do **not** proactively dump a ready-to-paste solution for the current step — coach with Goal / Background / Do-this first.

**Exception — human asks for code:** if they ask for a sample, snippet, "fitting code", or the test/implementation body, give the **real project code** (correct paths, exports, seed values). Never invent renamed stand-ins (`getOwner`, `@/catalog/...`) that look pasteable but will not run. Prefer quoting the plan block or writing the real file contents in chat. The human still pastes/adapts into the editor — agent does not write the file unless they ask you to.

### Q&A — always available

The human may ask anything at any point (concepts, API usage, trade-offs). Answer fully. When illustrating:

- Use **this project's** names and paths when showing code
- For concepts only (no code request): short plain-language explanation is enough; optional pointer to docs
- Point to **resources**: installed docs (e.g. `node_modules/next/dist/docs/`), official framework/library docs, or the relevant plan section

After answering, **restate the current step** in one line (e.g. "Still on Step 2: fill `routing.ts` — tell me when it's done") so the thread never loses place.

### Solo

Stay quiet after stage-setting + Step 1 unless asked. On request, escalate hints:

1. Concept question — what do you expect / which idea applies?
2. Where to look — file, section of the plan, or docs path
3. Mechanism in plain words — still never the solution diff

On request ("background?"), give the same Background block as a guided step would for the current step — without switching to guided.

### Guided — atomic steps (mandatory)

**One step per message. Never hand over a multi-step "do 1–5" checklist.**

Each step message contains only:

1. **Step N of M — title** (so progress is obvious)
2. **Goal** — one sentence
3. **Background — what you'll use**: short bullets for the ideas this step touches — written like a **human tutor**, not a spec dump.
   **Judgment (the point):** ask what would confuse someone who knows programming but not *this* stack/file yet. Prefer explaining that. Skip what is already obvious from the Goal or from earlier steps in this task. When the human later asks “what is X?”, treat that as a signal you under-explained — fix the habit next step, don’t only patch the chat.
   For each bullet that earns a place, cover as needed (not every bullet needs every line): plain-language meaning; **where it comes from** if that isn’t obvious (library vs this repo); why this choice here vs a common alternative. Library/API facts: prefer installed docs / version-matched skills over memory.
   Illustrative shape only (do **not** treat as a required or complete list of topics):
   - a library type → say which package owns it and what job it does
   - a framework mode (e.g. Server vs Client Component) → say what it means and why it fits
   Do not turn Background into a full solution dump unless the human asks for code.
4. **Do this** — the smallest useful action (ideally one file or one command)
5. **Hint** (optional) — short; resource / plan section link if useful (real paths only)
6. **Done when** — how the human knows to stop and reply
7. **Stop** — wait for the human to check in ("done", paste, or an error). Do **not** preview Step N+1 until they do.

If the human's check-in shows the step isn't finished (e.g. empty files), stay on the same step with a tighter "Do this" — do not advance.

Switch solo ↔ guided mid-task on request.

### Split

Agree the boundary in one sentence (e.g. "you write `ProfileHero` + `ProjectList`; I write the failing tests and layout shell"). Agent may write only the agreed non-core parts. Handed-over core still follows solo/guided rules (no solution for that core).

## Review & iterate

After the human's code is ready:

1. Run the plan's verifications (`pnpm test`, `pnpm build`, etc.) — gates stay hard; don't open a PR with red tests
2. Review against the plan contract and idiomatic usage for this stack
3. Lead with 1–2 questions ("why did you choose X?") before direct suggestions
4. Human decides whether to iterate; then commit/PR as `executing-plans-step-wise` (or the active plan skill) requires

## Boundaries

- Not a tutorial mode — no invented exercises outside the real task
- Plan step order and PR discipline unchanged
- Note authorship honestly in the PR body when the human wrote the core (e.g. "Core UI implemented by Denis under keep-me-relevant")
