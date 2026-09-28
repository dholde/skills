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
     2026-09-25: each step is show-in-chat, then the human writes a small version.
     2026-09-28: after a question, ask if that is clear. On yes or "what to do",
     reprint the step in the same full format as the first print. Never a one-line reminder.
     2026-09-28: concept first with only type variables. Then Example, which binds those variables. Never "that/this/it" pointing at a field that exists only in the example. -->

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

1. **Research first** — Fetch official docs/specs for the topic (+ requested version). Prefer vendor docs over blogs/SO. Cite exact URLs for APIs, annotations, config keys.
2. **Inspect the repo first** — Map modules, deps, packages, samples. Reuse/extend; do not scaffold a duplicate app.
3. **One step per message** — Never hand a multi-step "do 1–5" checklist after the outline. Do **not** advance until they give an **explicit advance signal** (see below).
4. **Show, then they write** — Every step has two beats in one message. **Show** explains the idea in chat and includes a short worked example as a code block. That example is for reading. Do not create or edit the lab file while showing it. **You write** is a small exercise they type into the lab file. It may be close to the example. Low transfer is fine. The point is that they type it. Do not write that file for them. Do not paste a finished solution for the exercise. If they ask to see the answer, show it in chat and still leave the typing to them.
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

Reprint the **same atomic step format as the first print**: `## Step N of M — title`, all **Show** bullets, the worked example, **You write** with the example code, **Why it matters**, **Done when**, **Refs**. They should not have to scroll. A shortened task line is not a reprint.

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

**Show:**
- <What this piece is / does — 2–4 short bullets: components, flow, or why>
- <Expand abbreviations on first use; gloss jargon in plain words>
- <Optional: one contrast with Java or plain JavaScript, only if it changes the idea>
- <A short worked example in a code block. For reading. Not the exercise.>

**You write:** <one small edit in the lab file, close to the example. Name the file and the check command.>

**Why it matters:** <one short sentence — interview payoff>

**Done when:** <they have typed it and the check passes. Reply done.>

**Refs:** <1–3 official doc links>
```

Then **stop**. Wait for check-in.

If they understood the show but have not written, reprint the current step in full. If the write is wrong or incomplete, stay with a tighter **You write** in that same full format. Do not skip ahead.

**Several open points.** When review or a clarification leaves more than one point open, first print a numbered list of all of them (short, like the review bullets). Then answer or work only the first. Do not start the next point until they say to go to the next. When they do, reprint the remaining list and start that next point. Do not ask them to say when they want the next point. They will say so.

After they report the write is done, read the file and review in a few sentences before advancing. Lead with what is true. One question only if a choice in their code is worth hearing.

**Show quality bar:** A reader who only reads **Show** should know what the thing is and where it sits before they type. **You write** is the internalization, not the only teaching.

**Concept, then example.** A concept sentence may use only the type variables (`T`, `K`) and official names. Finish that sentence before any concrete key or object. Then a separate **Example** binds the variables (`T` is `{ symbol: string; price: number }`, `K` is `"symbol"`). Do not write "that property" / "this key" / "it" unless the noun was named in the same concept sentence. A concept mixed with `T["symbol"]` in the next breath is the failure mode.

**The title is the concept.** Use the official term (`Indexed access type`). The function you wrote (`getProperty`) is the example under that title. Do not title the section with that function's name.

**Generic form, then the concrete spelling.** When the construct is `T[K]` and also `SomeType["field"]`, show `T[K]` first. Then one example where the same `[]` uses a concrete type and a quoted field name. Say they are the same construct.

**Do not teach the surface only.** For a checker construct, **Show** names in short bullets: (1) what callers or values are checked against, (2) what is erased and what JavaScript remains, (3) the call or form that is legal (or illegal) only with this construct, and what the version without it would allow, (4) a mechanical rule that is easy to miss (order, adjacency, what may sit between declarations). When two legal forms exist (method vs field, `!==` vs `!=`), name the bug or silent change the wrong pick causes, not only the syntax. Use the official handbook example when it exists. One aspect per example. Do not invent a sample that is equivalent to a simpler form (an optional parameter, a union) and present that as the reason to use the construct.

**Examples imply a boundary.** A reader treats the positions in the worked example as the whole feature. If the construct can also appear in another position (a variable, a parameter, a return, a field, or another declaration form), say so in one sentence in **Show**, even when **You write** practices only one of them. If one declaration form makes the example illegal and another does not, name that difference. Do not leave the boundary for them to discover by asking what else an interview would allow.

**A use that fits both types hides the change.** When **Show** changes what the checker believes about a value, do not stop at a use that would also be legal for the original type. That use looks the same either way, so the reader never sees that the checker stopped looking at the real value. Include one use that is legal only under the new belief, and say what the runtime does with the original value. Do not leave that use for them to discover.

**Do not fold a later lesson into this one.** If the curriculum already has a later slot for a second handbook feature, name that feature in **Leave for later** and stop. Do not assign a write that implements it.

**The legal form is not always legal everywhere.** When a class or a function declaration may list call signatures and an object literal may not, **Show** says that in one sentence and includes the illegal snippet. Do not leave them to paste class syntax into `{ }`.

**One body per overload in the source language.** If they know Java (or C#) overloads as separate methods, **Show** says the TypeScript list is erased and there is one body, before they write. Also say: callers see only the overload signatures, the implementation signature is not visible, the signatures must be consecutive, and the emit is the implementation only.

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
