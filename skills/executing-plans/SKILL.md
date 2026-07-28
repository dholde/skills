---
name: executing-plans
description: Execute a written implementation plan from docs/plans/ task by task in one continuous run. Use when the user asks to implement an approved plan and wants the whole plan (or a range of tasks) done in a single session without per-task review gates.
---

<!-- Adapted from obra/superpowers (https://github.com/obra/superpowers/blob/main/skills/executing-plans/SKILL.md).
     Local changes: plans live in docs/plans/ (upstream is path-agnostic), removed the subagent-driven-development
     recommendation and the "Superpowers works better with subagents" note (subagent runners not used here),
     removed the REQUIRED sub-skills using-git-worktrees and finishing-a-development-branch (not installed) —
     branch setup is agreed with the user up front and completion is a handoff to the user,
     removed the Integration section.
     Branch naming (2026-07-22): if a feature branch is used for the continuous run, name it after the
     *deliverable* (e.g. feat/foundation-classic-and-chat), not the plan filename — same readability
     rule as executing-plans-step-wise. For a per-task PR gate, use executing-plans-step-wise instead. -->

# Executing Plans

## Overview

Load plan, review critically, execute all tasks, report when complete.

**Announce at start:** "I'm using the executing-plans skill to implement this plan."

## The Process

### Step 1: Load and Review Plan
1. Read the plan file from `docs/plans/`
2. Review critically — identify any questions or concerns about the plan
3. If concerns: raise them with the user before starting
4. If no concerns: create todos for the plan tasks and proceed
5. Confirm which branch to work on. Never start implementation on main/master without explicit user consent. If creating a feature branch for the whole run, name it after what it delivers (e.g. `feat/foundation-classic-and-chat`), not the plan filename — plan/task linkage belongs in the eventual PR description.

### Step 2: Execute Tasks

For each task:
1. Mark as in_progress
2. Follow each step exactly (plan has bite-sized steps)
3. Run verifications as specified — don't skip them
4. Commit as specified by the plan
5. Mark as completed

### Step 3: Complete

After all tasks are complete and verified:
- Run the full test suite and build one final time
- Report to the user: what was implemented, test/build status, and any deviations from the plan (there should be none you didn't flag)
- Hand off for review; the user decides on merge/PR

## When to Stop and Ask for Help

**STOP executing immediately when:**
- You hit a blocker (missing dependency, test fails, instruction unclear)
- The plan has critical gaps preventing starting
- You don't understand an instruction
- Verification fails repeatedly

**Ask for clarification rather than guessing.**

## When to Revisit Earlier Steps

**Return to review (Step 1) when:**
- The user updates the plan based on your feedback
- The fundamental approach needs rethinking

**Don't force through blockers** — stop and ask.

## Remember
- Review the plan critically first
- Follow plan steps exactly
- Don't skip verifications
- Stop when blocked, don't guess
- Never start implementation on main/master without explicit user consent
