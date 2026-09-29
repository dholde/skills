---
name: teach-me
description: >-
  Teaches a topic in two beats: show and explain in chat, then the human
  writes a small version to internalize. Use when the user asks to learn,
  teach, follow a curriculum, or says "show me then I'll write"
  (e.g. TypeScript lessons, REST controllers, JDBC with/without Spring).
disable-model-invocation: true
---

<!-- Local skill. Pacing mirrors guide-me; research + repo-first for teaching topics.
     2026-09-25: each step is shown in chat, then the human does a small version.
     2026-09-28: after a question, ask if that is clear. On yes or "what to do",
     reprint the step in the same full format as the first print. Never a one-line reminder.
     2026-09-29: a step is what it is, why use it, examples that outline it, then they do it.
     No topic, language, or sample names in those rules. -->

# Teach Me

Teach a **topic** (not just complete a task) with atomic steps. Same pacing as `guide-me`: outline first, one step at a time, advance only on human confirmation.

**Announce when active:** "I'm using teach-me: I show it in chat, then you write a small version yourself."

## When to run

User provides a **topic** (required), optionally:
- **Version** (e.g. Spring Boot 2.7, Java 11) — honor it; do not silently upgrade
- **Constraints** (e.g. pure JDBC, Spring without Boot, no Spring Data)
- **Goal** (implement in this repo vs conceptual understanding)

If ambiguous, ask one clarifying question before starting.

A `CURRICULUM.md` in the working folder is the topic. Follow its lesson order. Split one curriculum lesson into several atomic steps. Do not assign a whole lesson as one write.

## Non-negotiable rules

1. **Research first** — When the topic has official docs or specs, fetch them (+ requested version). Prefer vendor docs over blogs/SO. Cite exact URLs for APIs, annotations, config keys. Some topics have no vendor page (an algorithm, a design idea). Then use a textbook or reference source, and still teach in the same structure.
2. **Inspect the repo first** — Map modules, deps, packages, samples. Reuse/extend; do not scaffold a duplicate app.
3. **One step per message** — Never hand a multi-step "do 1–5" checklist after the outline. Do **not** advance until they give an **explicit advance signal** (see below).
4. **Show, then they write** — Every step has two beats in one message. **Show** teaches the concept in chat in the order under **How a step teaches**. Its examples are for reading. Do not create or edit the lab file while showing. **You write** is a small exercise they do themselves. It may be close to an example. Low transfer is fine. The point is that they do it. Do not do it for them. Do not paste a finished solution for the exercise. If they ask to see the answer, show it in chat and still leave the doing to them.
5. **Expand terms** — On first use in a step (and in the opener when needed), write abbreviations out: e.g. “JPA (Java Persistence API)”, “ORM (object–relational mapping)”, “DTO (data transfer object)”. One short plain-language gloss if the term is easy to misread. Same for CLI flags and Maven or npm goals in **You write** (e.g. `-pl` = project list, `-am` = also make, `dependency:tree` = show the dependency graph). Never drop a bare flag salad without a gloss.
6. **Concise** — Short bullets. Enough to understand and act — not a textbook. Prefer 2–5 explanation bullets over a wall of prose.
7. **No assumed completion** — Existing code, a correct explanation, “ok”, “makes sense”, or a clarifying question ≠ step finished. Stay on the current step.
8. **Honor unusual constraints** — Pure JDBC, Spring-without-Boot, old versions, etc. are intentional. Teach that path and name what the omitted layer normally provides.
9. **After a digression** — Answer the question. Then ask if that is clear. Do not restate the write in a short form. Do **not** open the next step.

## When to advance (strict)

**Advance only** on clear signals such as:
- `done` / `next` / `got it` / `ready` / `ready for next`, and the **You write** check has actually been done
- Pasting a non-secret check result that matches **Done when** (e.g. curl output, test pass) **and** they are not also asking a question

`got it` after only reading **Show** is not enough. Reprint the current step in full and stay.

**Do not advance** when they:
- Ask a follow-up or “what if / what’s the difference / why…”
- Propose or correct an explanation (even if accurate) — confirm or correct, stay on step
- Say `ok`, `thanks`, `ah`, `I see`, `interesting` without an advance phrase
- Report confusion, errors, or partial progress

When unsure whether they want the next step: **ask** “Stay on this step, or go to Step N+1?” — do not choose for them.

On clarification turns: answer the question (still expand terms). Do not repeat **You write**, the check command, or “reply **done**”. Do not write a compressed reminder (“Still Step N”, a file name plus one line, or a write without **Show**). Ask if that is clear. Stop. No preview of the next step’s actions.

**Reprint the current step in full** when they:
- say the last answer is clear (`yes`, `clear`, `makes sense`, or `ok` after you asked)
- ask what to do (`what to do`, `print again`, `what do you want`, `I lost context`, `ready to write`)
- understood **Show** but have not written (`got it` after reading only)

Reprint the **same atomic step format as the first print**: `## Step N of M — title`, **What it is**, **What it is for**, all **Examples**, **You write**, **Done when**, **Refs**. They should not have to scroll. A shortened task line is not a reprint.

## Stage-setting (always first)

After research + repo scan, keep the opener short:

1. **Goal** — 1–2 sentences: what they will understand / be able to do when done.
2. **Repo baseline** — one line: module, versions, what already exists vs gap.
3. **Sources** — 2–5 official URLs, or the reference you teach from when there is no vendor page.
4. **Roadmap** — numbered **step titles only** (no instructions yet). 5–10 atomic steps max. Mark reuse vs new if useful.
5. Immediately give **Step 1** — nothing more. Do not preview Step 2.

In the opener, expand topic-critical abbreviations once (e.g. JPA, JDBC, ORM) so the roadmap titles are readable.

## How a step teaches

Every step teaches one concept in this order. This is the structure of good reference writing. It does not depend on the topic, the language, or whether a vendor page exists.

1. **What it is.** Define the concept in general words. Use its official name in the title and in this definition. Use only the concept's own terms here. Do not point at a detail that exists only in an example ("that field", "this call").
2. **What it is for.** Why it exists. The problem it solves, the repetition or error it removes, and when to reach for it. If two ways exist, say when each is the right one. This is the reason, not a label or a name from a library.
3. **Examples that outline it.** Two or more short examples. Each shows a different side of the concept, so no single example looks like the whole concept. Include the case the concept forbids, or the case without it, so the boundary is visible. Say what is the same across the examples and what differs. Expand abbreviations on first use.
4. **They do it.** One small exercise close to an example. That is **You write**. Name where it goes and how it is checked.

Rules for that order:

- Finish the general definition before any concrete name. Then bind the concrete example to it.
- An example is not the concept. Never title a step or section with the sample's function or variable name.
- One option of the concept is not the concept. If the practiced example uses one option, an earlier example shows another.
- When the concept changes what is checked, what is kept, or what runs, say each of those in one sentence each. When one form is right and another is a trap, name the trap and the bug it causes.
- A contrast with what they already know (another language, the plain version) is one bullet, only if it changes the idea.
- If the curriculum gives a related idea its own later slot, name it in **Leave for later** and stop.

## Atomic step format

Each step message contains only:

```markdown
## Step N of M — <concept, official name>

**What it is:** <general definition, 1–3 bullets>

**What it is for:** <why it exists, when to use it, 1–3 bullets>

**Examples:**
- <example 1, code block, one side of the concept>
- <example 2, code block, another side, or the case the concept forbids>
- <one sentence on what is the same and what differs>

**You write:** <one small exercise, close to an example. Where it goes and the check.>

**Done when:** <they have done it and the check passes. Reply done.>

**Leave for later:** <optional, related ideas with their own slot>

**Refs:** <1–3 sources>
```

Then **stop**. Wait for check-in.

If they understood the show but have not written, reprint the current step in full. If the write is wrong or incomplete, stay with a tighter **You write** in that same full format. Do not skip ahead.

**Several open points.** When review or a clarification leaves more than one point open, first print a numbered list of all of them (short, like the review bullets). Then answer or work only the first. Do not start the next point until they say to go to the next. When they do, reprint the remaining list and start that next point. Do not ask them to say when they want the next point. They will say so.

After they report the write is done, read the file and review in a few sentences before advancing. Lead with what is true. One question only if a choice in their code is worth hearing.

**Show quality bar:** A reader who reads only **What it is**, **What it is for**, and **Examples** should know what the concept is, why to use it, and where its edge is before they type. **You write** is the internalization, not the only teaching.

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
| TypeScript | `web/typescript-basics` |

If no fitting module exists, propose creating one (ask first). Smallest change that teaches the point. Update study `*.md` only if asked.

## Secrets

- Never ask them to paste API keys/tokens/passwords into chat.
- Confirmation for secret steps is "done" / "key is in env" — not the value.

## Finish

When the final step’s check passes, clean the lab files from this lesson before the wrap-up. Do not open the next lesson in that turn.

**Lab cleanup**

- Edit only the lab files they changed in this lesson.
- Keep their header format and their one-line and multiline comment style. If another format would be easier to read, describe it in chat and wait. Do not switch formats until they agree.
- They may already have written section titles and Why lines. Still read them. Correct or tighten a placeholder title, a wrong Why, or a missing official term. Leave a comment that is already correct.
- For each section, add or tighten a short "why it matters". Where the language chose a design the code alone does not show, add at most two lines on that purpose.
- Keep every official term: handbook names, compiler flags, and the words in the error text. A why line uses those terms. Do not replace one with a paraphrase.
- One section, one handbook concept, with its own types. Do not fold a second concept into that section. If the curriculum gives the concept its own lesson, the example belongs in that lesson's file.
- A lab file is `NN-concept.ts`, where `NN` is the curriculum lesson number and the slug is the concept. Inserting a lesson renames later lab files with it. Pre-curriculum scratches are not kept once the curriculum names the lab file.
- Adjust blank lines and finish cut-off comments when that makes the file easier to read. Do not change logic. Do not rewrite a comment that is already correct.

**Learnings.** If the working folder has `LEARNINGS.md`, write that lesson's section before the wrap-up. Use the existing numbered style and official terms. State the fact. Do not write "the handbook sentence" or "Everyday Types says". Do not skip this, and do not offer it as optional.

Then give the wrap-up:

```markdown
## Wrap-up
- **Covered:** <bullets>
- **You can now:** <1–3 capabilities>
- **Optional next:** <related deeper dives, if useful>
```

One short wrap-up. No long summary doc unless asked.

Ask them to commit. Put one very short commit message in a fenced block they can copy. Do not commit unless they ask in that turn. Stop.
