---
name: root-cause-summary
description: >-
  Explain one specific problem as bullets under Expected behavior, Actual
  behavior (symptoms), Root cause, and Fix, in plain words. Use when the user
  asks what went wrong, why something fails, what the root cause is, how to fix
  it, or wants an issue or bug write-up.
---

# Root cause summary

Answer with four labeled sections of bullets. No intro sentence. No prose paragraphs.

## Sections

Use these, in this order.

- **Expected behavior**: what should happen, step by step, including any retry or fallback that should kick in.
- **Actual behavior (symptoms)**: what happens instead and how it shows: the screen, the status, the exact log line, the count of affected items.
- **Root cause**: why it happens, down to the mechanism. Not a restatement of a symptom.
- **Fix**: the steps in order, with exact names and values, ending with what the user sees once it works.

## Rules

- One fact per bullet. Each bullet is understandable on its own.
- Each bullet follows from the one before it. Do not jump to a new subject without saying how it connects.
- When there are two similar things (two databases, two hosts, two apps), name and tell them apart once, then always use those names.
- Use the real term for every thing (`pooler host`, `PROD_DATABASE_URL`), never a stand-in like "the other address".
- No metaphors or fluffy phrasing ("a shared door", "the magic happens").
- Name the real actor. A process or a value does not act ("the copy connects"); the app, server, job, or person does.
- Every "this", "that", or "it" must point to the noun right before it. If it does not, repeat the noun.
- Leave out checks that passed and facts that are not the cause. If a sentence makes the reader ask "so what?", cut it.
- Root cause answers "why" until it reaches something the reader can act on or verify.
- Say what was verified and what is inferred, and what the inference rests on (for example, the log).
- Use short, plain words. Write like a colleague explaining at a whiteboard, not like a report.

## Example

The example below is the shape. Explain the problem in front of you. Do not reuse these facts.

**Expected behavior**
- After Approve, the review app writes the question into the game database.
- The row then moves to Promoted.
- If that write fails on Approve, the daily gate cron retries the same write for every row still on Approved.

**Actual behavior (symptoms)**
- Approved questions stay on Approved.
- The Promoted tab stays empty.
- The log line is `promote left approved: Error`.
- The review app reached the game database address and got no answer from Postgres.
- The 12 approved rows are still only in the review database.

**Root cause**
- `PROD_DATABASE_URL` is the game database address saved on the review app.
- Vercel hides that value, so the exact string was not opened.
- The log still identifies it: the connection died at once, and Postgres never replied.
- That is what the direct host `db.<project>.supabase.co` does from Vercel.
- That host only accepts IPv6, and the Vercel server has none.

**Fix**
- In Supabase, open geokicka-staging and copy the transaction pooler URI.
- Its host is `pooler.supabase.com` and its port is `6543`.
- Paste that URI into `PROD_DATABASE_URL` on the review app, for Production.
- Redeploy.
- After the redeploy, run the gate cron.
- The review app then connects to the game database through the pooler host, inserts the 12 questions, and sets their status to promoted.
