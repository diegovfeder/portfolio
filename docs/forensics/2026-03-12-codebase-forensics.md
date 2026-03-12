# 2026-03-12 — Codebase Forensics Baseline

Generated using `docs/prompts/CODEBASE_FORENSICS_PROMPT.md`.

## A) What This App Is

This repository is a single SolidStart portfolio web app for Diego Feder. It combines a one-page portfolio (`/`), a markdown-backed blog (`/blog`, `/blog/:slug`), a public grounded AI chat (`/chat` via `/api/chat`), and a work-in-progress career workflow route (`/brag`) currently rendered as static placeholders.

## B) Main User Flows (Route + Modules + Data/API)

1. Portfolio exploration (`/`)
   - Route: `src/routes/index.tsx`
   - Modules: `src/components/sections/*`, especially `cases.section.tsx`, `projects.section.tsx`
   - Data: `src/data/projects.ts`
   - Network: external links to project/case websites

2. Blog listing (`/blog`)
   - Route: `src/routes/blog/index.tsx`
   - Modules: `src/components/blog/grid.tsx`, `src/components/blog/card.tsx`
   - Data: `src/utils/blog.ts`
   - Network: none required for listing

3. Blog detail (`/blog/:slug`)
   - Route: `src/routes/blog/[slug].tsx`
   - Data flow: fetch markdown from `/blog/posts/:slug.md`, parse with `marked`
   - Rendering/security: sanitize HTML with `DOMPurify` in `src/components/markdown/renderer.tsx`

4. Grounded chat (`/chat`)
   - Route/UI: `src/routes/chat/index.tsx`
   - API: `POST /api/chat` in `src/routes/api/chat.ts`
   - Provider call: DeepSeek `POST /chat/completions`
   - Grounding source: `src/data/ai/persona.ts` composed from portfolio/blog/project data

5. Brag workflow route (`/brag`)
   - Route/UI: `src/routes/brag/index.tsx` (static placeholders)
   - Planned/available data pipeline: `src/utils/brag.ts`, `src/utils/brag-private.ts`, `src/data/brag/*`
   - Current gap: route does not yet consume `buildBragPageData()`

## C) Evidence Table

| Claim | Evidence | Confidence |
|---|---|---|
| Single-app SolidStart architecture | `package.json`, `src/app.tsx` (`Router`, `FileRoutes`) | High |
| Blog detail fetches markdown and parses via `marked` | `src/routes/blog/[slug].tsx` | High |
| Markdown output sanitized with `DOMPurify` | `src/components/markdown/renderer.tsx` | High |
| Chat UI posts to `/api/chat` | `src/routes/chat/index.tsx` | High |
| `/api/chat` validates payload and calls DeepSeek | `src/routes/api/chat.ts` | High |
| Chat system prompt is grounded in local portfolio/blog/projects | `src/data/ai/persona.ts` | High |
| `/brag` is currently static placeholder UI | `src/routes/brag/index.tsx` | High |
| Brag data utilities exist but are not route-wired | `src/utils/brag.ts`, `src/utils/brag-private.ts` and no import/use in route | High |
| Deploy target is Vercel with prerender crawl | `app.config.ts` | High |
| CI workflows are Claude-automation oriented | `.github/workflows/claude.yml`, `.github/workflows/claude-code-review.yml` | Medium |

## D) Stack Summary

- Frontend: SolidJS + SolidStart + file-based routing (`src/app.tsx`)
- Styling/UI: TailwindCSS + Corvu dialog components
- Content: static metadata (`src/utils/blog.ts`) + markdown in `public/blog/posts`
- Server/API: SolidStart API route (`src/routes/api/chat.ts`)
- External integration: DeepSeek chat completions API
- Persistence/auth: no DB/auth layer currently evident in app code
- Infra: Vinxi build pipeline + Vercel preset (`app.config.ts`)
- Observability: no explicit analytics/error tracking SDK found in `src` or `package.json`

## E) Unknowns + Confirmation Plan + Recommendations

### Unknowns

1. Exact runtime error context users see on `/chat` and `/brag` in local dev.
2. Whether `/chat` failures are primarily environment (`DEEPSEEK_API_KEY`) or UI/runtime errors.
3. Intended immediate scope for `/brag`: keep static MVP vs wire full data pipeline now.

### Confirmation Plan

1. Run `bun run dev` locally and capture both terminal stack and browser console for `/chat` and `/brag`.
2. Exercise `/api/chat` directly with and without `DEEPSEEK_API_KEY` to separate config from route issues.
3. Decide `/brag` scope, then either:
   - keep static and update docs to match, or
   - wire `buildBragPageData()` into route with minimal UI.

### High-Impact Recommendations

1. Align docs with current `/brag` implementation status to avoid false expectations.
2. Add CI checks for `lint`, `test`, and `build` in GitHub Actions.
3. Add clearer `/chat` UI handling for missing server config (`DEEPSEEK_API_KEY`).
4. Keep timestamped forensics snapshots under `docs/forensics/` to reduce repeated rediscovery.

## Validation Notes

- `bun run test --run`: pass (all tests green)
- `bun run build`: pass, with client build warning about `entry-client` default export expectation in virtual handler import
