---
name: create-release
description: Create GitHub releases following the established version scheme, title format, and release-notes style. Use when the user asks to create, cut, or draft a release/tag for one or more commits.
disable-model-invocation: true
---

# Creating Releases

Releases are GitHub releases with lightweight tags, created via `gh release create`. Notes follow a consistent English style.

## Conventions

- **Tags**: lightweight, created by `gh release create` (do not hand-create annotated git tags).
- **Version scheme**: semver `vMAJOR.MINOR.PATCH`. Check the current latest release (`gh release list --limit 1`), then bump the segment matching the change: **patch** for fixes/small tweaks, **minor** for new features (backward compatible), **major** for breaking changes. Bumping a higher segment resets the lower ones to 0 (e.g. `v0.1.4` → minor → `v0.2.0`). If the user hasn't said which, ask or infer from the commit.
- **Granularity**: one release per merged PR / feature commit. Combine only when commits form one feature (e.g. a fix-up PR right after the feature) or are pure docs; note the combination in the mapping.
- **Target**: pass the **full 40-char commit SHA** to `--target`. Short SHAs fail validation (`Release.target_commitish is invalid`). The commit must already be on `origin/main` (`git fetch origin main` first if unsure).
- **Language**: release titles and notes are in **English**.

## Title format

```
vX.X.X — <Short Title Case summary>
```

Use an em dash (`—`). Example: `v1.2.0 — Add Export Endpoint`.

## Notes format

1. A 1–2 sentence intro describing what the release does and why.
2. A heading: `## Major changes since vY.Y.Y` (the previous version).
3. Bold-lead bullets, each `- **Category**: detail`, with `backticked` code identifiers, file names, flags, and values.

Template:

```markdown
<1–2 sentence intro>.

## Major changes since vY.Y.Y
- **<Category>**: <what changed, with `identifiers` where useful>.
- **<Category>**: <...>.
- **Tests**: <coverage added/updated> (when applicable).
```

## Workflow

1. Find the target commit(s) and the current latest release:
   - `git log --oneline v<latest>..HEAD` (or `git log -1 <sha>` for a specific commit)
   - `gh release list --limit 5`
2. Read the commit(s) to write accurate notes:
   - `git show --stat <sha>` and `git log -1 --format='%s%n%n%b' <sha>`
3. Resolve the full SHA: `git rev-parse <sha>`.
4. Create the release (request network + git write as needed):

```bash
gh release create vX.X.X --target <FULL_SHA> --title "vX.X.X — <Title>" --notes "<intro>

## Major changes since vY.Y.Y
- **<Category>**: <detail>."
```

5. If creating several releases in one go, create them in ascending version order so each `--target` tags its own commit. If GitHub marks the wrong one as Latest (it uses creation time, not version), fix with `gh release edit v<highest> --latest`.

## Example

```bash
gh release create v1.2.0 --target 0123456789abcdef0123456789abcdef01234567 \
  --title "v1.2.0 — Add Export Endpoint" \
  --notes "Adds a JSON export endpoint so clients can download their data without scraping the UI.

## Major changes since v1.1.0
- **API**: New \`GET /api/export\` returns a downloadable JSON payload; gated by the existing session auth.
- **Docs & tests**: README documents the route; added request/response unit tests."
```
