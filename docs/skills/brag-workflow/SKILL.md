# brag-workflow

Use this skill when the user wants to capture day-to-day work/study evidence and convert it into interview-ready brag material.

## Goal

Keep brag data reliable and simple:
- capture one event
- sync into structured entries
- review strongest stories

## Inputs

- Event title (required)
- Type (optional): `work`, `study`, `project`, `hiring`, `reflection`
- Date (optional): `YYYY-MM-DD`

## Workflow

1. Create capture file:
```bash
bun run brag:new --title "<event title>" --type <type>
```

2. Fill generated file in `docs/brag/captures/` using the template sections.

3. Sync generated artifacts:
```bash
bun run brag:sync
```

4. Review outputs:
- `src/data/brag/private.local.ts`
- `docs/brag/generated/BRAG_SYNC_REPORT.md`
- `/brag` route in dev

## Guardrails

- Do not invent metrics. If missing, mark as missing.
- Keep confidential details out of public-facing output.
- Prefer concrete evidence links (PR/ticket/artifact) when available.

## Standard Output (for assistant responses)

- Top 1-3 strongest entries from latest sync
- Missing evidence checklist
- Next capture action (single sentence)
