# 2026-03-13 — Codebase Forensics Delta

Generated using `docs/prompts/CODEBASE_FORENSICS_PROMPT.md`.

## Compared Against

- Baseline snapshot: `docs/forensics/2026-03-12-codebase-forensics.md`

## Net-New Findings

1. Repo-local assistant workflow instructions now live outside `docs/`, under `skills/`.
   - Evidence: `skills/brag-workflow/SKILL.md`, `AGENTS.md`, `CLAUDE.md`, `docs/AI_INDEX.md`, `docs/brag/README.md`
   - Impact: `docs/` is now reserved for human-facing product/workflow documentation, while repo-local assistant behavior lives in a dedicated tracked skill boundary.

2. The brag route is now wired to real page data with a guarded fallback path.
   - Evidence: `src/routes/brag.tsx` imports and loads `buildBragPageData` from `~/utils/brag`, wraps loading in `loadBragPageData()`, and falls back to `buildBragRouteFallbackData()` on failure.
   - Impact: `/brag` no longer depends on static placeholder-only route content and can render safely even when local brag data loading fails.

3. Client entry now exports the guarded default mount expected by SolidStart/Vinxi.
   - Evidence: `src/entry-client.tsx`
   - Impact: this aligns with the route-stability fix captured later in `.kb/gotchas/solidstart-route-stability-chat-brag.md`.

## Corrected / Stale Findings

1. The prior snapshot said `/chat` lived at `src/routes/chat/index.tsx`.
   - Current evidence: `src/routes/chat.tsx`
   - Status: stale route path in the 2026-03-12 baseline.

2. The prior snapshot said `/brag` lived at `src/routes/brag/index.tsx`.
   - Current evidence: `src/routes/brag.tsx`
   - Status: stale route path in the 2026-03-12 baseline.

3. The prior snapshot said `/brag` was static placeholder UI and that brag data utilities were not route-wired.
   - Current evidence: `src/routes/brag.tsx`, `src/utils/brag.ts`
   - Status: obsolete. The route now renders data from `buildBragPageData()` and only falls back to placeholder-safe data when loading throws.

## Validation Rerun This Pass

- `bun run test -- --run` — fail. `src/tests/routes/chat-route.test.tsx` expects the send button to stay disabled until trimmed input exists, but the current local edit in `src/routes/chat.tsx` logs `draft`, returns `!isSending()`, and ignores draft emptiness.
- `bun run build` — pass. The build prerendered `/chat` and `/brag`, but emitted console noise from the current `src/routes/chat.tsx` debug logging during prerender.

## Remaining Unknowns

1. Whether the current local edits in `src/routes/chat.tsx` are intentional or experimental.
   - Evidence: `git diff -- src/routes/chat.tsx`
   - Why unresolved: this pass did not normalize or review unrelated in-progress work, but the change is already affecting test behavior and prerender logging.

2. Whether the delta-first forensics prompt needs a separate explicit baseline mode in practice.
   - Evidence: `docs/prompts/CODEBASE_FORENSICS_PROMPT.md`
   - Why unresolved: the prompt now includes fallback guidance, but the workflow has only one delta pass so far.
