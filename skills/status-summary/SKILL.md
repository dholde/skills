---
name: status-summary
description: >-
  Summarize what was done, what is planned, or what is still open as nested
  one-line bullets. Use when the user asks for a summary, a status, what was
  done, what is planned, or what is open.
---

# Status summary

Answer with nested bullets. No intro sentence. The first line is a section label.

## Sections

Use these, in this order. Drop a section that has nothing in it.

- **Built** — on the current branch or pull request, or already shipped.
- **Written down, not built** — specs, roadmap entries, decisions.
- **Still open** — a choice that is not made yet.
- **Repo** — branch, pull request, or a process rule, only when that changed or they asked where the work is.

## Shape

- A top bullet is one outcome.
- Bullets under it are the facts that make that outcome true.
- Two levels is normal. A third level only when one of those facts has its own parts.
- Each bullet is one line and understandable on its own.
- Use the words already used in the conversation and the spec.
- When a line is not about the player, say who it is about.
- Name the pull request once, on the section it belongs to.

The example below is the shape. Report the work in front of you. Do not reuse these facts.

## Example

**Built** (draft PR #44)

- The review app proposes and schedules each day's five questions.
  - A person edits a proposal from promoted questions only.
  - A question can return after 60 days.
- The game plays the scheduled round.
  - A day with no round shows "Heute keine Tagesrunde."
  - Local development without server keys still plays from the question file. Players never hold a key.

**Written down, not built**

- A spec for the modes that follow, queued on the roadmap.
  - Global board: exact place and top share, under a public name.
  - A group streak when 80% play, rounded up.

**Repo**

- This work is only on PR #44.
