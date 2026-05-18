# Brag Operating Prompts

Use these prompts with any AI assistant against the public brag system: operating model, profile manifest, yearly brag documents, and linked blog posts.

## 1. Recent Evidence Review

```text
Read these sources in order:
1. docs/brag/OPERATING_MODEL.md
2. docs/brag/README.md
3. docs/brag/manifest/profile.md
4. src/utils/blog.ts
5. the newest relevant markdown file(s) in public/blog/posts/

Task:
1. Use the newest blog posts and public-safe notes as the evidence layer.
2. Extract 1-3 brag-ready stories.
3. Label each story as strong evidence, moderate evidence, or thin evidence.
4. Identify invisible work that should be captured if it is not already represented.
5. If metrics are missing, say exactly what proof is still absent.

Output format:
- Date span
- Story candidates
- Evidence quality
- Evidence used
- Missing proof
- Recommended next action
```

## 2. Yearly Brag Draft

```text
Read these sources in order:
1. docs/brag/OPERATING_MODEL.md
2. docs/brag/README.md
3. docs/brag/manifest/profile.md
4. src/data/brag/reports.ts
5. relevant markdown files in public/blog/posts/
6. the yearly document in public/brag/reports/{{YEAR}}.md if it already exists

Task:
1. Group the year's work into 3-5 coherent contribution themes.
2. Keep the narrative grounded in public-safe evidence only.
3. Prefer metrics over adjectives and outcomes over activity volume.
4. Include invisible work when there is enough evidence to support it.
5. Rewrite weak or vague sections into concrete outcome language.
6. Suggest what should be promoted into the yearly document next.

Output format:
## Summary
## Scope of Contribution
## Key Contributions
## Overall Impact
## Strength Areas Demonstrated
## Focus for Next Period
## Closing Reflection
## Evidence Gaps
```

## 3. Job Fit Mapping

```text
Read these sources in order:
1. docs/brag/OPERATING_MODEL.md
2. docs/brag/manifest/profile.md
3. src/data/brag/reports.ts
4. relevant public/blog/posts markdown
5. relevant yearly brag report markdown

ROLE:
{{TARGET_ROLE}}

JOB DESCRIPTION:
{{JOB_DESCRIPTION}}

Task:
1. Map each role requirement to matching public evidence.
2. Score confidence based on evidence quality, not optimism.
3. Flag unsupported claims and thin proof.
4. Suggest how to position the strongest annual stories in interviews.
5. Separate public-safe claims from claims that require private confirmation.

Output format:
| Requirement | Evidence | Confidence | Gap | Preparation Action |
```

## 4. Interview Drill Builder

```text
Read these sources in order:
1. docs/brag/OPERATING_MODEL.md
2. docs/brag/manifest/profile.md
3. relevant public/blog/posts markdown
4. relevant yearly brag report markdown

TARGET ROLE:
{{TARGET_ROLE}}

Task:
1. Build the top 3 reusable stories from public evidence.
2. Generate 10-12 likely interview questions for the target role.
3. Draft concise STAR-style answers grounded in those stories.
4. Mark weak answers as LOW-EVIDENCE.
5. End with a must-rehearse top 5 list.

Output format:
- Question
- Answer draft
- Story reference
- Evidence quality tag
```

## 5. Performance Review Pack

```text
Read these sources in order:
1. docs/brag/OPERATING_MODEL.md
2. docs/brag/manifest/profile.md
3. public/brag/reports/{{YEAR}}.md
4. relevant public/blog/posts markdown

PERIOD:
{{PERIOD}}

Task:
1. Extract the strongest evidence for the review period.
2. Group evidence by competency area: delivery, technical depth, collaboration, leadership, growth.
3. Convert evidence into concise review bullets.
4. Name missing metrics or proof separately instead of overstating impact.
5. Suggest 2-3 points to bring to a manager 1:1.

Output format:
## Performance Review - {{PERIOD}}
## Strongest Evidence
## Review Bullets
## Manager 1:1 Talking Points
## Evidence Gaps
```
