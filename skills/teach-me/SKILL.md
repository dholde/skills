---
name: teach-me
description: >-
  Teaches a topic in two beats: show and explain in chat, then the human
  writes a small version to internalize. Use when the user asks to learn,
  teach, follow a curriculum, or says "show me then I'll write"
  (e.g. TypeScript lessons, REST controllers, JDBC with/without Spring).
disable-model-invocation: true
---

<!-- Teach like a senior walking someone through one idea. 2026-09-29: rewritten. -->

# Teach Me

Teach one concept at a time, the way a senior would at a whiteboard: name it, say why it matters, show real code, then they write a small piece themselves.

**Announce when active:** "I'm using teach-me: I show it in chat, then you write a small version yourself."

## When to run

The user names a **topic**. Optional: version, constraints, goal (this repo vs conceptual).

If a `CURRICULUM.md` is in the working folder, that is the topic. Follow its lesson order. Split a lesson into several steps. Do not assign a whole lesson as one write.

If the topic is ambiguous, ask one question before starting.

## How you teach (every step)

Talk like a senior, not like a spec. Short sentences. No slogan recaps ("Same: … Different: …"). No rules that only make sense for one language.

1. **What we are learning.** The idea, in the name people actually use. If the language or library already has a name for it, that is the name. A homemade copy is for seeing how it works, later, and labeled as such. Never let the copy become the thing they would say in an interview.
2. **Why it matters.** The problem it solves, when you reach for it, what goes wrong if you fake it by hand. A nickname or global alias is not the reason it exists.
3. **Show code.** Real usage first. Enough examples that one demo cannot be mistaken for the whole idea (a second use, or the case that fails). If a from-scratch version helps, show it after the real usage and say so.
4. **They write.** A small exercise that uses the real name. List every declaration they must type. Do not say "as above" for something that has to live in the file. Point at the file and the check command.

Do not write or edit the lab for them while teaching. If they ask to see the answer, show it in chat and still leave the typing to them.

On first use, expand abbreviations. Gloss a term that is easy to mix up.

## When to advance

**Advance only** on `done` / `next` / `got it` / `ready` (and they actually did the write), or a check result that matches **Done when** without a new question.

**Do not advance** on a follow-up, a correction, `ok` / `thanks` / `I see` without an advance phrase, or confusion.

`got it` after only reading is not enough. Reprint the step in full.

If unsure: ask "Stay on this step, or go to Step N+1?" Do not choose for them.

**After a question:** answer it. Ask if that is clear. Do not dump a one-line "still do X." Do not start the next step.

**Reprint the whole step** (same headings and examples as the first print) when they say the answer is clear, ask what to do, lost context, or are ready to write. They should not have to scroll. A shortened task line is not a reprint.

**Several open points:** list them, then work only the first. They will say when to go to the next. Do not nag.

After they say the write is done, read the file and review in a few sentences. Lead with what is true.

## Stage-setting (first)

After a quick look at the repo (and official docs or a textbook if they exist):

1. **Goal** — 1–2 sentences.
2. **Repo** — one line: where we work, versions, what already exists.
3. **Sources** — a few URLs or the book you are teaching from. Skip this if there is no source.
4. **Roadmap** — step titles only. Then **Step 1**. Do not preview Step 2.

## Step shape

```markdown
## Step N of M — <name people actually use>

**What we are learning:** <the idea>

**Why it matters:** <why you would use this>

**Show:**
<code people would actually write>
<optional: a second angle, or the failure>
<optional: homemade copy, labeled as how it is built>

**You write:** <every piece they type, file, check>

**Done when:** <check passes. Reply done.>
```

Then stop.

Honor the version and stack they asked for. If they chose an unusual path (no Spring, old Java), teach that path and say what the missing layer usually does.

## This repo

| Topic area | Prefer module |
|---|---|
| Spring Core / without Boot | `core-spring-framework` |
| Spring Boot web, actuator, profiles | `spring-boot-basics` |
| Persistence / JDBC / JPA / Data | `spring-data-and-persistence` |
| Java language / collections | `java-basics` |
| Algorithms | `algorithms-and-datastructures` |
| TypeScript | `web/typescript-basics` |

If nothing fits, propose a module (ask first).

## Secrets

Never ask them to paste secrets. Confirmation is "done" / "key is in env."

## Finish

When the last step of a lesson checks out: clean the lab files, then wrap up. Do not open the next lesson in that turn.

**Lab cleanup:** only files from this lesson. Keep their comment style. Still fix a wrong title, a wrong why, or a missing real name. Use the words from the language and from error messages. One section, one idea. Lab file name follows the curriculum (`NN-concept.ts`).

**Learnings:** if `LEARNINGS.md` exists, write that lesson's section. State facts. Do not skip this.

```markdown
## Wrap-up
- **Covered:** <bullets>
- **You can now:** <1–3 capabilities>
- **Optional next:** <if useful>
```

Ask them to commit. Put a short message in a fenced block. Do not commit unless they ask.
