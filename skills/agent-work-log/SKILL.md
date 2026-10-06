---
name: agent-work-log
description: >-
  Record a problem working with an agent as one entry in the current repo's
  agent work log. Use when the user wants to log an agent miss or agent
  mistake, or says "agent work experience" / "log this agent mistake".
---

# Agent Work Log

Write one log entry in the **current working repo**. Do not hardcode a repo path.

The only write is `0_agent-work-experience/agent-work-log.md` (create the directory if it is missing). Do not commit unless the user asks. Do not run database commands or apply migrations.

## File

- If `0_agent-work-experience/agent-work-log.md` is missing, create it with a short explanation of the log, draft guidance for each label below, then one filled entry.
- If the file already exists, append one new entry. Do not rewrite earlier entries.

## Labels

Use these labels, in this order. Pick the lowest Severity that still matches, and say why in the entry. Severity is the consequence if the agent's plan had been followed as written and no human caught it.

1. **Date.** The day the incident happened, as `YYYY-MM-DD`. This is the same day as the entry heading.
2. **Model.** The model name the product showed for that agent, such as `Grok 4.7 High`. Do not invent a model. If the conversation does not name one, ask.
3. **Severity.** Only Low, Medium, or High.
   - **Low** — little consequence, easy to notice or reverse.
   - **Medium** — meaningful wasted effort, bugs, broken builds, or localized damage.
   - **High** — production impact, data loss, security exposure, financial loss, or other serious consequence.
4. **Situation.** What needed to be done and the goal.
5. **What the agent did.** The agent's plan, not a verdict.
6. **Implication.** What would have happened if the human followed it blindly.
7. **My review and what I suggested.** What the human found wrong, in their terms.
8. **My suggestion vs agent suggestion outcome.** What the human's suggestion avoided or improved.

## Facts

- Use facts from the conversation. Do not invent employers, quotes, or outcomes.
- If the incident is not in the conversation, ask before writing. Leave a label blank rather than guess.
- Do not paste secrets, connection strings, tokens, or passwords into the file.

## Entry shape

Start each entry with `## YYYY-MM-DD — short title` (the date the entry is written), then the eight labels as `###` headings. Date and Model are part of the entry, not only the heading. On a new file, put the explanation and label guidance above the first entry.
