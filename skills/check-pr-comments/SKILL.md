---
name: check-pr-comments
description: Triage and verify PR review comments against official docs and project design before planning fixes. Use when the user provides PR comments to review or asks to check/address PR feedback.
disable-model-invocation: true
---

# Check PR Comments

Check the comments in the PR that I provide you below. For each comment:
1. Verify it is a valid concern. If valid, then proceed. If not valid, then provide reason and skip.
2. Verify that the proposal aligns with official docs of the relevant components/frameworks/services
3. Verify that the proposal aligns with the internal project design
4. If proposal is optimal (see checks 2. and 3.), then plan with the proposed solution. If proposal needs improvement, then plan an improved solution aligning with official docs and project design.

Important:
- Do not do assumptions
- Ground every decision in official docs or internal project design decisions
- If something is unclear, then ask before doing decisions
- Use the `karpathy` skill for planning the fixes
