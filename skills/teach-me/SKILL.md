---
name: teach-me
description: >-
  Teaches a specific technical topic with a concise, human-gated step-by-step
  guide grounded in the current repo and official docs. Use when the user asks
  to learn, teach, walk through, or explain how to implement something
  (e.g. REST controllers, JDBC with/without Spring/Spring Boot), including
  version-specific or framework-comparison questions meant for understanding
  layers.
disable-model-invocation: true
---

<!-- Local skill. Pacing mirrors guide-me; research + repo-first for teaching topics. -->

# Teach Me

Teach a **topic** (not just complete a task) with atomic steps. Same pacing as `guide-me`: outline first, one step at a time, advance only on human confirmation.

**Announce when active:** "I'm using teach-me: research + repo check, then outline, then one step at a time until you confirm."

## When to run

User provides a **topic** (required), optionally:
- **Version** (e.g. Spring Boot 2.7, Java 11) — honor it; do not silently upgrade
- **Constraints** (e.g. pure JDBC, Spring without Boot, no Spring Data)
- **Goal** (implement in this repo vs conceptual understanding)

If ambiguous, ask one clarifying question before starting.

## Non-negotiable rules

1. **Research first** — Fetch official docs/specs for the topic (+ requested version). Prefer vendor docs over blogs/SO. Cite exact URLs for APIs, annotations, config keys.
2. **Inspect the repo first** — Map modules, deps, packages, samples. Reuse/extend; do not scaffold a duplicate app.
3. **One step per message** — Never hand a multi-step "do 1–5" checklist after the outline. Do **not** advance until they give an **explicit advance signal** (see below).
4. **Teach, don’t only assign** — Every step must explain the idea (components, flow, why this layer) before or with the action. “Do this” alone is not enough.
5. **Expand terms** — On first use in a step (and in the opener when needed), write abbreviations out: e.g. “JPA (Java Persistence API)”, “ORM (object–relational mapping)”, “DTO (data transfer object)”. One short plain-language gloss if the term is easy to misread.
6. **Concise** — Short bullets. Enough to understand and act — not a textbook. Prefer 2–5 explanation bullets over a wall of prose.
7. **No assumed completion** — Existing code, a correct explanation, “ok”, “makes sense”, or a clarifying question ≠ step finished. Stay on the current step.
8. **Honor unusual constraints** — Pure JDBC, Spring-without-Boot, old versions, etc. are intentional. Teach that path and name what the omitted layer normally provides.
9. **After a digression** — Restate the current step in one line so place isn’t lost. Do **not** open the next step’s full template.

## When to advance (strict)

**Advance only** on clear signals such as:
- `done` / `next` / `got it` / `ready` / `ready for next`
- Pasting a non-secret check result that matches **Done when** (e.g. curl output, test pass) **and** they are not also asking a question

**Do not advance** when they:
- Ask a follow-up or “what if / what’s the difference / why…”
- Propose or correct an explanation (even if accurate) — confirm or correct, stay on step
- Say `ok`, `thanks`, `ah`, `I see`, `interesting` without an advance phrase
- Report confusion, errors, or partial progress

When unsure whether they want the next step: **ask** “Stay on this step, or go to Step N+1?” — do not choose for them.

On clarification turns: answer the question (still expand terms) → one-line “Still **Step N** — reply **done** when ready” → stop. No preview of the next step’s actions.

## Stage-setting (always first)

After research + repo scan, keep the opener short:

1. **Goal** — 1–2 sentences: what they will understand / be able to do when done.
2. **Repo baseline** — one line: module, versions, what already exists vs gap.
3. **Docs** — 2–5 official URLs.
4. **Roadmap** — numbered **step titles only** (no instructions yet). 5–10 atomic steps max. Mark reuse vs new if useful.
5. Immediately give **Step 1** — nothing more. Do not preview Step 2.

In the opener, expand topic-critical abbreviations once (e.g. JPA, JDBC, ORM) so the roadmap titles are readable.

## Atomic step format

Each step message contains only:

```markdown
## Step N of M — <title>

**Concept:**
- <What this piece is / does — 2–4 short bullets: components, request/data flow, or layer responsibility>
- <Expand abbreviations on first use in this step; gloss jargon in plain words>
- <Optional: one contrast — what you are *not* using yet and what that forces by hand>

**Do this:** <smallest useful action — one concept, one file, one command, or one contrast>

**Why it matters:** <one short sentence — interview/practical payoff>

**Done when:** <how they know to stop and reply>

**Refs:** <1–3 official doc links>
```

Then **stop**. Wait for check-in.

If the check-in shows they aren’t done, stay on the same step with a tighter "Do this" and, if needed, a clearer **Concept** bullet. Do not skip ahead.

**Concept quality bar:** A reader who only skims **Concept** should know *what* the thing is and *where it sits* before they touch code. **Do this** is practice, not the only teaching.

## Framework-comparison topics

When contrasting layers (pure JDBC vs Spring JDBC vs Boot + Data):

- Teach only the **requested** stack in the active step.
- Name what you are **not** using and what that forces by hand (DataSource, exception translation, transactions, scanning, auto-config, etc.).
- Expand each of those terms on first use.
- Offer a later step up the ladder only if they want it.

## Version-specific topics

- Pin coords/APIs to the **stated** version.
- If repo version ≠ requested, say so once and ask which to follow before coding.
- Note breaking diffs only when they block the step (one bullet + doc link).

## Implementation in this repo

When cwd is `interview-preparation` (or similar):

| Topic area | Prefer module |
|---|---|
| Spring Core / without Boot | `core-spring-framework` |
| Spring Boot web, actuator, profiles | `spring-boot-basics` |
| Persistence / JDBC / JPA / Data | `spring-data-and-persistence` |
| Java language / collections | `java-basics` |
| Algorithms | `algorithms-and-datastructures` |

If no fitting module exists, propose creating one (ask first). Smallest change that teaches the point. Update study `*.md` only if asked.

## Secrets

- Never ask them to paste API keys/tokens/passwords into chat.
- Confirmation for secret steps is "done" / "key is in env" — not the value.

## Finish

When the final step’s check passes:

```markdown
## Wrap-up
- **Covered:** <bullets>
- **You can now:** <1–3 capabilities>
- **Optional next:** <related deeper dives, if useful>
```

One short wrap-up. No long summary doc unless asked.
