# Brag System

The portfolio treats `/brag` as a public proof surface backed by a lightweight brag-document workflow.

## Operating Model

The system has four layers:

1. Capture notes: short weekly or biweekly evidence notes, usually private when they include company context.
2. Public evidence: blog posts, profile material, and public-safe markdown reports.
3. Synthesis: yearly reports, performance review bullets, interview stories, and resume blocks.
4. Public surface: `/brag` and `/brag/<year>`.

The route is public by default. It should only consume public-safe material, but the broader workflow can start from private notes that are reviewed before anything is promoted.

For the full workflow, read `docs/brag/OPERATING_MODEL.md`.

## Core Inputs

- `docs/brag/manifest/profile.md` - the canonical written profile and career direction
- `src/data/brag/profile.ts` - the runtime-safe typed mirror used by the app
- `src/utils/blog.ts` and `public/blog/posts/` - recent public evidence
- `public/brag/reports/` - long-form yearly reflection
- `docs/brag/templates/` - reusable output shapes for reports, review bullets, interview stories, and resume blocks
- `docs/brag/prompts/BRAG_OPERATING_PROMPTS.md` - tool-agnostic prompt starters for evidence synthesis

The core idea is simple: blog posts explain the work, yearly reports synthesize the work, and the public route presents the strongest proof.

## Route Shape

`/brag` presents:

1. hero / positioning
2. profile snapshot
3. selected experience timeline
4. recent blog evidence
5. yearly brag documents
6. prompt templates and reusable artifacts

Yearly documents live at `/brag/<year>`, for example:

- `/brag/2025`
- `/brag/2026`

## Authoring Files

- `docs/brag/manifest/profile.md` - narrative source of truth for profile and career direction
- `docs/brag/OPERATING_MODEL.md` - workflow, cadence, evidence rules, and AI-agent usage
- `docs/brag/prompts/BRAG_OPERATING_PROMPTS.md` - copyable prompt starters for any AI assistant
- `src/data/brag/profile.ts` - typed runtime data for profile and timeline
- `src/data/brag/reports.ts` - yearly report metadata
- `public/brag/reports/2025.md` - yearly brag document
- `public/brag/reports/2026.md` - current live yearly brag document
- `docs/brag/templates/BRAG_REPORT.md` - required template for future yearly reports

## Recommended Process

1. Do the work.
2. Capture a short evidence note while context is fresh.
3. If the work has a useful public lesson, publish a blog post.
4. Run a recent evidence review with `skills/brag-workflow/SKILL.md` or the prompts in `docs/brag/prompts/BRAG_OPERATING_PROMPTS.md`.
5. Promote strong, public-safe evidence into the current yearly report.
6. Reuse the strongest evidence for 1:1s, performance reviews, interviews, and job-fit prep.

Use skills for repeatable repo behavior and prompts for one-off assistant tasks. The workflow is intentionally not Codex-specific.

## Report Rules

- There is exactly one brag document per year.
- The route uses `year`, not a generic slug.
- Yearly documents are markdown files rendered like first-class content pages.
- Metadata stays in TypeScript for consistency with the existing blog system.
- Reports should be curated outputs, not raw weekly notes.
- Claims should be backed by evidence quality: strong, moderate, or thin.

## What Was Removed

The old capture/private-note/sync pipeline is no longer part of the public route:

- no private local brag module loading
- no capture ingestion directly into route rendering
- no generated sync report
- no `brag:new` or `brag:sync` commands

This route is public by default and grounded only in reviewed, public-safe material.
