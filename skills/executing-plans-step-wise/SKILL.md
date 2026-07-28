---
name: executing-plans-step-wise
description: Execute a written implementation plan from docs/plans/ one task at a time, hard-stopping after each task for a small reviewable PR. Use when the user wants incremental PRs they can review and understand end-to-end instead of one big changeset.
---

<!-- Derived from the local executing-plans skill (itself adapted from obra/superpowers executing-plans,
     https://github.com/obra/superpowers/blob/main/skills/executing-plans/SKILL.md).
     Local changes vs. executing-plans:
     - Continuous "execute all tasks" loop replaced by task = branch = PR with a HARD STOP after each
       task for user review; added PR description requirements and task-splitting guidance for
       oversized tasks.
     - Branch/PR naming: do NOT use <plan>-task-<n>. Branches and PR titles name the *deliverable*
       (`<type>/<nn>-<short-description>`), so git history and the PR list stay readable later.
       Plan/task traceability lives in the PR body ("Plan task" section), not in the branch name.
       Adopted 2026-07-22 after feedback that foundation-task-N names hide what the change is.
     - Merging (adopted 2026-07-22): PRs are ALWAYS squash-merged. Squash commit = PR title (subject)
       + PR description (detailed body), like `git commit -m "short" -m "details"`. Repo settings
       should enforce this (squash only; default message = PR title + body).
     - Learning check (adopted 2026-07-23): at task pick, if the task has learning-relevant work,
       offer keep-me-relevant (solo / guided / split / agent) before implementing. -->

# Executing Plans — Step-Wise (PR per task)

## Overview

Execute exactly **one plan task per cycle**: branch, implement, verify, open a PR, then **stop** until the user has reviewed and merged. The goal is small incremental PRs the user can review and understand end-to-end — never a giant multi-task branch.

**Announce at start:** "I'm using the executing-plans-step-wise skill: one task, one PR, then I stop for your review."

## The Cycle

### 1. Load and review (first cycle only)
1. Read the plan file from `docs/plans/`
2. Review critically — raise concerns with the user before starting
3. Create todos for the plan tasks
4. Confirm the base branch (usually main) and PR workflow (e.g. GitHub via `gh`)

### 2. Pick the next task
- Take the lowest-numbered incomplete task whose predecessors are merged
- **Size check:** if the task touches ~6+ files or mixes two separable concerns (e.g. framework wiring vs. components), propose splitting it into two PRs and agree with the user before starting. Splitting happens at execution — do not edit the plan file.
- **Learning check:** if the task contains learning-relevant work per `keep-me-relevant` (framework-typical building blocks, design patterns), offer that skill's hand-over options before implementing. If declined, proceed normally.

### 3. Implement on a task branch
1. Branch from the up-to-date base branch using a **deliverable-named** branch (not the plan filename):

   ```bash
   git checkout main && git pull && git checkout -b <type>/<nn>[-a|-b]-<short-description>
   ```

   | Piece | Rule | Examples |
   |---|---|---|
   | `<type>` | Conventional commit-ish prefix | `feat`, `chore`, `content`, `fix`, `refactor` |
   | `<nn>` | Zero-padded plan task number (keep order readable in `git branch`) | `01`, `02`, `05` |
   | `-a` / `-b` | Only when the task was split into two PRs | `05a`, `05b` |
   | `<short-description>` | What this PR delivers — readable months later | `scaffold-nextjs-vitest`, `i18n-routing`, `chat-api` |

   Examples: `chore/01-scaffold-nextjs-vitest`, `feat/05a-i18n-routing`, `feat/07-chat-api`.

   **Do not** name branches `<plan>-task-<n>` (e.g. `foundation-task-5`) — the plan name does not describe the change, and the task number alone is opaque in the PR list. Plan/task linkage belongs in the PR description.

2. Mark the task in_progress; follow each plan step exactly; run every verification; commit as the plan specifies
3. Only this task's files — no scope creep, no drive-by fixes. Note unrelated findings in the PR description instead.

### 4. Open the PR
Push the branch and open a PR containing only this task.

- **PR title:** same idea as the branch — name the deliverable (e.g. `Scaffold Next.js app with Vitest`), not the plan file.
- **PR body:** must let the user review without reading the plan, and must carry plan/task traceability:

```markdown
## Plan task
<Plan file> — Task <n>: <task title>

## What this delivers
<2-4 sentences: what exists after this PR that didn't before>

## How to verify locally
- `pnpm test` (all green)
- `pnpm build`
- <manual check from the plan, if any — what to run/click and what to expect>

## Notes for review
<deviations from the plan (should be none unflagged), judgment calls, noticed-but-not-touched items>
```

### 5. Merge convention (user merges)
- PRs are **squash-merged, always** — one commit per task on main.
- Squash commit message = **PR title** (subject) + **PR description** (body). Repo settings pre-fill this (squash only, default message "Pull request title and description"); don't override with a bare one-liner.

### 6. HARD STOP
- After opening the PR, **stop working. Do not start the next task.**
- Report the PR link and a one-paragraph summary to the user
- Resume with step 2 only after the user has merged (or closed/redirected) the PR
- If review feedback arrives: address it on the same branch, re-run verifications, push, and stop again

## When to Stop and Ask for Help

**STOP immediately when:**
- You hit a blocker (missing dependency, failing test, unclear instruction)
- Verification fails repeatedly
- The plan has a gap that requires a decision

**Ask rather than guess.** A wrong guess contaminates every PR after it.

## Remember
- One task = one branch = one PR = one review — no exceptions without explicit user request
- Branch and PR title name the **deliverable**; the PR body names the **plan task**
- Follow plan steps exactly; run every verification
- Keep PRs self-explanatory; the user should never need the plan open to review
- Never commit directly to main/master
