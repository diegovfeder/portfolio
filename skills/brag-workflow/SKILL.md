---
name: brag-workflow
description: Run the public brag-document workflow for this portfolio repo. Use when the user wants to turn blog posts, yearly brag documents, and profile material into interview-ready stories, annual reviews, job-fit prep, or updates to the public `/brag` experience.
---

# brag-workflow

Use this skill when a request is about brag reviews, yearly document authoring, evidence synthesis, interview story generation, role-fit prep, or converting public work into reusable career material.

System context lives in `/Users/diegovfeder/workspace/df/portfolio/docs/brag/README.md`.
If the task is to write, edit, or publish the public blog post itself, use `/Users/diegovfeder/workspace/df/portfolio/skills/blog-create-post/SKILL.md` before continuing.

## Operating Model

- `/brag` is a public proof surface, not a private workflow board.
- Public blog posts are the recent evidence layer.
- Yearly markdown documents in `public/brag/reports/` are the long-form brag layer.
- `docs/brag/manifest/profile.md` is the written source of truth for identity and direction.

## Load Sources In This Order

1. `/Users/diegovfeder/workspace/df/portfolio/docs/brag/manifest/profile.md`
2. `/Users/diegovfeder/workspace/df/portfolio/src/data/brag/profile.ts`
3. `/Users/diegovfeder/workspace/df/portfolio/src/data/brag/reports.ts`
4. `/Users/diegovfeder/workspace/df/portfolio/src/utils/blog.ts`
5. Matching markdown files in `/Users/diegovfeder/workspace/df/portfolio/public/blog/posts/`
6. Matching yearly report markdown in `/Users/diegovfeder/workspace/df/portfolio/public/brag/reports/`

## Output Templates

Use these templates when generating artifacts:

- `docs/brag/templates/BRAG_REPORT.md` — for yearly brag documents
- `docs/brag/templates/RESUME_BLOCK.md` — for resume bullets and CV generation
- `docs/brag/templates/INTERVIEW_STORY.md` — for STAR interview stories
- `docs/brag/templates/REVIEW_BULLET.md` — for performance review bullets

## Modes

### 1. Recent Evidence Review

Use after recent public writing exists.

- Read the newest relevant blog entries first.
- Extract 1-3 reusable story candidates.
- Flag thin evidence explicitly instead of over-polishing it.

### 2. Yearly Brag Drafting

Use for building or updating `public/brag/reports/<year>.md`.

- Start from the yearly report metadata and related blog evidence.
- Group work into a few coherent contribution themes.
- Keep the narrative evidence-based and public-safe.

### 3. Job-Targeted Brag Prep

Use the same evidence set as the yearly review, then map it to a target role or job description.

- Rank evidence by fit.
- Flag unsupported claims and missing proof.
- Turn the strongest stories into interview-ready or CV-ready material.

## Guardrails

- Do not invent metrics, scope, or business impact.
- Keep the work grounded in public evidence unless the user explicitly asks for a private draft outside the route.
- Prefer exact dates and concrete proof sources over vague summaries.
- If blog metadata is too thin, read the full markdown body before concluding the story is weak.
