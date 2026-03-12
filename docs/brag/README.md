# Brag Document Workspace

This folder is the local-first markdown source of truth for the `/brag` route workflow.

## Folder Map

- `templates/SOURCE_OF_TRUTH.md` — canonical profile snapshot (current role, stack, strengths).
- `templates/RELEVANT_EXPERIENCES.md` — technical wins with impact metrics.
- `templates/KNOWLEDGE_BASE.md` — study notes and reusable technical patterns.
- `templates/ACADEMIC_PROJECTS.md` — academic work that supports target roles.
- `templates/HIRING_PROCESS.md` — interview timeline, feedback, and prep actions.
- `templates/DAILY_NOTE.md` — low-friction daily capture feeding weekly/monthly retros.

## How This Connects to the App

- Public evidence is mapped from `src/utils/blog.ts` into `/brag` timeline entries.
- Private notes are loaded only in local/dev from `src/data/brag/private.local.ts`.
- Production builds always disable private mode and show only public evidence.

## Local Setup

1. Copy `src/data/brag/private.local.example.ts` to `src/data/brag/private.local.ts`.
2. Add your private entries and summaries.
3. Run `bun dev` and open `/brag`.

## Operational Loop

1. Capture daily notes.
2. Consolidate weekly into brag entries with metrics.
3. Run fit analysis against job descriptions.
4. Generate custom CV + interview drills.
5. Promote selected stories into public blog posts when appropriate.
