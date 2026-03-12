# Brag Document Workspace

This folder is a local-first career evidence system.
Goal: convert day-to-day work, study, and interview notes into reusable brag stories with measurable impact.

## Architecture

1. You capture events as markdown files in `docs/brag/captures/*.md`.
2. `bun run brag:sync` parses those files and generates:
   - `src/data/brag/private.local.ts` (private entries + summaries for `/brag`)
   - `docs/brag/generated/BRAG_SYNC_REPORT.md` (latest snapshot)
3. `/brag` merges this private data (dev only) with public blog evidence from `src/utils/blog.ts`.

Production never loads private notes.

## Folder Map

- `captures/` — canonical input notes (one file per event).
- `generated/` — generated snapshots (safe to inspect, can be regenerated).
- `../skills/brag-workflow/` — assistant workflow instructions (single source for Codex/Claude behavior).
- `templates/` — manual templates and reference structures.

## Commands

```bash
# create a new capture note
bun run brag:new --title "Checkout reliability incident fix" --type work

# rebuild private brag data + report from capture notes
bun run brag:sync
```

## Daily Loop (10 minutes)

1. Create a note with `bun run brag:new --title "..."`.
2. Fill context/challenge/action/result + before/after metrics.
3. Run `bun run brag:sync`.
4. Open `/brag` and verify the entry appears in timeline + retros.

## Weekly Loop (30-45 minutes)

1. Run `bun run brag:sync`.
2. Open `docs/brag/generated/BRAG_SYNC_REPORT.md`.
3. Use `docs/skills/brag-workflow/SKILL.md` for the weekly review flow.
4. Promote strongest safe stories into public blog posts when relevant.

## Capture File Contract

Every file in `captures/` should follow:

- Filename: `YYYY-MM-DD__TYPE__short-slug.md`
- Frontmatter keys:
  - `date`, `type`, `title`, `tags`, `impact`, `impact_metric`
  - `evidence_links`, `skills`, `interview_story_angle`
  - optional: `lessons`, `gaps`, `next_actions`
- Sections:
  - `Context`, `Challenge`, `Action`, `Result`, `Evidence and Metrics`, `Reflection`

Use `templates/CAPTURE_NOTE.md` as default structure.
