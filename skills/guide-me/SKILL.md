---
name: guide-me
description: Guide the human through a specific task one atomic step at a time, waiting for confirmation before advancing. Use when the user wants a walkthrough, checklist coaching, or says "guide me" / "step by step" / "walk me through".
---

<!-- Original local skill. Pacing pattern inspired by keep-me-relevant guided mode;
     docs-first for third-party product steps. -->

# Guide Me

Walk the human through **one concrete task** with atomic steps. Outline the whole path first; advance only when they confirm the current step is done.

**Announce when active:** "I'm using guide-me: full outline first, then one step at a time until you confirm."

## Docs-first (external products)

Before outlining a third-party process (OpenAI, Vercel, Upstash, etc.):

1. Prefer **official docs** over memory (markdown twins like `https://developers.openai.com/api/docs/quickstart.md` when available).
2. Use the URLs and labels from those docs in the steps.
3. If docs and UI disagree, say so and follow the live dashboard labels the human reports.

## Stage-setting (always first)

Keep it short:

1. **Goal** — 1–2 exact sentences: what will exist / work when done.
2. **Verify** — the check that proves success (command, page, expected result).
3. **Roadmap** — numbered **step titles only** (no instructions yet). Keep steps atomic (one decision, one page, one command, or one file edit).
4. Immediately give **Step 1** — nothing more. Do not preview Step 2.

## Atomic steps (mandatory)

**One step per message. Never hand over a multi-step "do 1–5" checklist after the outline.**

Each step message contains only:

1. **Step N of M — title**
2. **Do this** — the smallest useful action (ideally one page click path, one command, or one file)
3. **Why / note** (optional, one short sentence) — only if the action is confusing without it; link official docs when useful
4. **Done when** — how they know to stop and reply
5. **Stop** — wait for check-in ("done", paste of non-secret output, or an error). Do **not** advance until they confirm.

If the check-in shows the step isn’t finished, stay on the same step with a tighter "Do this". Do not skip ahead.

After answering a side question, **restate the current step** in one line so the thread doesn’t lose place.

## Secrets

- Never ask the human to paste API keys, tokens, or passwords into chat.
- Tell them to put secrets in local env files / host dashboards only.
- Confirmation for secret steps is "done" / "key is in `.env.local`" — not the value.

## Finish

When the final step’s verify check passes, say the goal is met in one short paragraph. Offer the next natural follow-up only if obvious (e.g. smoke the chat UI); do not start another guided process unless asked.
