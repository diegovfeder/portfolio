# Codex Brag Operating Prompts

Use these prompts in Codex after running `bun run brag:sync`.

## 1) Daily Normalization

```text
Read docs/brag/captures/*.md and docs/brag/generated/BRAG_SYNC_REPORT.md.

Task:
1. Identify today's strongest one or two entries.
2. Rewrite each into STAR format (Situation, Task, Action, Result).
3. Keep only claims that are evidence-backed.
4. If metrics are missing, propose exactly what should be measured next time.

Output format:
- Story title
- STAR bullets
- Evidence used
- Missing proof checklist
```

## 2) Weekly Consolidation

```text
Act as my career operating system reviewer.
Use docs/brag/generated/BRAG_SYNC_REPORT.md as source of truth.

Task:
1. Pick top 3 wins of the week by measurable impact.
2. Group by competency (delivery, technical depth, collaboration, leadership).
3. Produce one interview-ready story per competency.
4. List weak spots in my current evidence set.
5. Create a next-week capture plan (5 bullet actions).

Output format:
- Weekly top wins table
- Competency story cards
- Evidence gaps
- Next-week plan
```

## 3) Job Description Fit Mapping

```text
Use docs/brag/generated/BRAG_SYNC_REPORT.md plus the role below.

ROLE:
{{TARGET_ROLE}}

JOB DESCRIPTION:
{{JOB_DESCRIPTION}}

Task:
1. Map each requirement to matching brag entries.
2. Score confidence 0-1 based on evidence quality.
3. Flag unsupported claims.
4. Build a 14-day gap-closing plan.

Output format:
| Requirement | Matched entry | Confidence | Risk | Action |
```

## 4) Interview Drill Builder

```text
Use docs/brag/generated/BRAG_SYNC_REPORT.md.

Task:
1. Generate 12 interview questions likely for {{TARGET_ROLE}}.
2. Draft concise STAR answers from my entries.
3. Mark weak answers with "LOW-EVIDENCE".
4. Provide a must-rehearse top 5 list.

Output format:
- Question
- Answer draft
- Entry reference
- Evidence quality tag
```

## 5) Public Promotion Filter

```text
Evaluate private entries and propose candidates to convert into public blog posts.

Rules:
- Remove confidential details.
- Keep technical tradeoffs and measurable outcomes.
- Prefer stories that showcase systems thinking.

Output format:
- Candidate entry
- Why publish
- Redactions required
- Blog angle and title draft
```
