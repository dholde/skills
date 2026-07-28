---
name: blog-idea-miner
description: >-
  Mines Cursor chat transcripts and git changes for short AI blog-post ideas.
  Produces a hook, bullet outline, alternative angles, and navigable source
  references. Use when the user asks for a blog idea, blog post idea, or to
  mine a chat for blog content.
disable-model-invocation: true
---

# Blog Idea Miner

Collect short AI blog-post ideas from Cursor chats + code changes. Write one idea file per invocation.

**Output repo:** `/Users/denis/Repos/blog-posts/ideas/`

## When to run

User explicitly invokes this skill and provides:
1. **Chat reference(s)** — see resolution below
2. **Branch or commits** — what code changes to analyze
3. **Working title** (optional)

## Guard

If `cwd` is `/Users/denis/Repos/blog-posts`, ask which source repo to analyze. Do not use blog-posts as the source.

## Chat resolution

Accept any convenient form from the Cursor UI:

| Input | Action |
|-------|--------|
| `[title](uuid)` link | Extract uuid from markdown link |
| Raw uuid | Use directly |
| Title / keywords | Grep current project's `agent-transcripts` for match |
| "this chat" / "latest" / none | Pick most recent transcript(s) in slug dir |

**Resolve transcript path:**

```bash
.claude/skills/blog-idea-miner/scripts/resolve-transcripts.sh [uuid|keyword]
```
(Path is relative to the consuming repo after `npx github:dholde/skills sync`.)

Transcripts live at:
`~/.cursor/projects/<slug>/agent-transcripts/<uuid>/<uuid>.jsonl`

Where `<slug>` = absolute `cwd` with leading `/` stripped and `/` replaced by `-`.
Example: `/Users/denis/Repos/first-escape-der-turm` → `Users-denis-Repos-first-escape-der-turm`

**Read transcripts:** JSONL, each line `{role, message}`. Grep or read selectively — do not load entire large files into context. Extract only pivotal exchanges (tried X → failed because Y → landed on Z).

## Code changes

Determine base branch (default `main`, fallback `master`):

**Branch not merged:**
```bash
git diff main...HEAD
git log main..HEAD --oneline
```

**Specific commits:**
```bash
git show <sha> --stat
git show <sha>
```

**Already merged:** use `git log` / `git show` on the relevant squash or merge commit; ask user if unclear.

Summarize only changes relevant to the blog angle — file paths, what changed, why notable.

## Output rules

- **One file = one small idea.** Short posts, one or few aspects.
- **Hook:** 1–2 catchy opener options.
- **Outline:** bullet headers only, no prose paragraphs.
- **Alternative angles:** 2–4 topics the user may have missed, each with why it is interesting.
- **Source material:** distilled quotes/paraphrase + code pointers — not full transcript dump.
- **Filename:** `YYYY-MM-DD-<slug>.md` where `<slug>` is a kebab-case topic slug derived from the working title (e.g. `dynamic-character-spec-updates`).

**Transcript durability:** store `[title](uuid)` in frontmatter (clickable in Cursor) + absolute `.jsonl` path. Optionally archive raw transcript as sibling `ideas/YYYY-MM-DD-<slug>.transcript.jsonl`. Do NOT paste full transcript into the idea `.md`.

## Idea file template

Write to `/Users/denis/Repos/blog-posts/ideas/YYYY-MM-DD-<slug>.md`:

```markdown
---
title: <working title>
date: YYYY-MM-DD
status: idea
source_repo: <repo name>
branch: <branch or main>
commits:
  - <sha> <subject>
chats:
  - "[<chat title>](<uuid>)"
transcript_paths:
  - ~/.cursor/projects/<slug>/agent-transcripts/<uuid>/<uuid>.jsonl
tags: [ai]
---

## Hook
<1-2 catchy opener options>

## Outline
- <Header 1>
  - <point>
- <Header 2>
  - <point>

## Alternative angles
- <angle you may have missed> — why it is interesting

## Source material
- Key exchange: > <distilled quote/paraphrase>
- Code: `<path>` — <what changed / why notable>
```

## Workflow checklist

```
- [ ] Resolve chat transcript(s)
- [ ] Gather git diff / log for branch or commits
- [ ] Distill pivotal chat exchanges
- [ ] Identify AI-related blog angle
- [ ] Write hook (1-2 options)
- [ ] Write bullet outline
- [ ] Suggest 2-4 alternative angles
- [ ] Write idea file to blog-posts/ideas/
- [ ] Confirm path to user
```

## Example invocation

```
Use blog-idea-miner.
Chat: [Dynamic spec reload debugging](0298ba68-6a00-48dd-80b1-f6c737ce8491)
Branch: feat/dynamic-updates
Working title: Live character spec updates without restart
```
