---
name: sync-cv-to-portfolio
description: >-
  Update the portfolio site and chat knowledge from the canonical Markdown CV.
  Use when the CV in interview-preparation changed, or the user asks to sync
  the portfolio from the CV / interview-preparation repo.
---

# Sync CV to portfolio

Canonical CVs (not dated application folders):

- `~/Repos/interview-preparation/0-cv/0_base-version/cv-en.md`
- `~/Repos/interview-preparation/0-cv/0_base-version/cv-de.md`

Portfolio content lives in `~/Repos/portfolio/content/`. Above `## AI Details` is the site; below is chat-only. Do not invent employers, dates, degrees, or skills.

## Mapping

- **Intro (ask-first):** Do not change profile `headline`, public body (paragraph under the name), or `location`. Diff against the CV, propose only concrete edits (e.g. “10 years → 11 years”), and wait. Never copy email or phone.
- **Profile AI Details** (chat only): Technical Skills, education, publications, Amazon internship, ALK-Trier, BOSH fellowship, spoken languages.
- **Jobs** → `content/experience/{slug}.{en,de}.md`. Keep SAP as three files by title period (2016–03/2020, 04/2020–03/2023, 04/2023–04/2025). Assign CV bullets to the matching period; leftover SAP-wide facts go in that file’s AI Details. Do not merge SAP into one row.
- **DinoSitter** is a CV job and a **project** on the site. Do not add an experience row. Update `content/projects/dinositter.*.md`.
- **FoodAround, LetsPair** → existing project files. ALK-Trier stays profile AI Details only.
- **Voice:** CV is first person; experience/project public bodies stay impersonal / third person.
- **Dates:** EN `MM/YYYY`, DE `MM.YYYY`. EN/DE must match on employers, dates, titles, and tech. DE titles follow the CV (e.g. Freelance, German role names).
- Keep extra chat-only facts the CV does not contradict.

## Checklist

1. Diff the two CV files against `content/profile`, `content/experience`, and `content/projects`.
2. Propose intro diffs and **wait**. Do not apply intro/headline/`location` in the same pass.
3. Edit experience, projects, and profile AI Details in **both** locales in the same change.
4. `pnpm test` (and `pnpm lint` if you touched TS).
5. Browser `/en` and `/de`: intro unchanged unless approved; experience/projects match; chat has no email.
6. Do not commit unless asked.
