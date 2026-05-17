# Brag Route

The portfolio now treats `/brag` as a public proof surface rather than a local-only workflow board.

## Operating Model

The route is built from three public-safe inputs:

1. `docs/brag/manifest/profile.md` - the canonical written profile
2. `src/data/brag/profile.ts` - the runtime-safe typed mirror used by the app
3. `src/utils/blog.ts` plus yearly markdown documents in `public/brag/reports/`

The core idea is simple:

- the manifest holds the richer authored profile
- the typed runtime data powers the UI
- blog posts provide recent public evidence
- yearly brag documents provide long-form annual reflection

## Route Shape

`/brag` now presents:

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
- `src/data/brag/profile.ts` - typed runtime data for profile and timeline
- `src/data/brag/reports.ts` - yearly report metadata
- `public/brag/reports/2025.md` - yearly brag document
- `public/brag/reports/2026.md` - current live yearly brag document
- `docs/brag/templates/BRAG_REPORT.md` - required template for future yearly reports

## Report Rules

- There is exactly one brag document per year.
- The route uses `year`, not a generic slug.
- Yearly documents are markdown files rendered like first-class content pages.
- Metadata stays in TypeScript for consistency with the existing blog system.

## What Was Removed

The old capture/private-note/sync pipeline is no longer part of the brag route:

- no private local brag module loading
- no capture ingestion
- no generated sync report
- no `brag:new` or `brag:sync` commands

This route is public by default and grounded only in public-safe material.
