# AI Knowledge Index

Last updated: 2026-03-10 (America/Sao_Paulo)

## What This Webapp Is

Personal portfolio + blog for Diego Feder, built with SolidStart. The main experience is a one-page portfolio (`/`), a markdown-backed blog (`/blog`, `/blog/:slug`), a grounded AI chat route (`/chat`), and a hidden career OS route (`/brag`) for brag-document workflows.

## Canonical Files (Read First)

- App shell and routing: `/Users/diegovfeder/workspace/df/portfolio/src/app.tsx`
- Home route: `/Users/diegovfeder/workspace/df/portfolio/src/routes/index.tsx`
- Blog routes: `/Users/diegovfeder/workspace/df/portfolio/src/routes/blog/index.tsx`, `/Users/diegovfeder/workspace/df/portfolio/src/routes/blog/[slug].tsx`
- Chat route + API: `/Users/diegovfeder/workspace/df/portfolio/src/routes/chat.tsx`, `/Users/diegovfeder/workspace/df/portfolio/src/routes/api/chat.ts`
- Brag route: `/Users/diegovfeder/workspace/df/portfolio/src/routes/brag/index.tsx`
- Blog metadata: `/Users/diegovfeder/workspace/df/portfolio/src/utils/blog.ts`
- Chat persona grounding: `/Users/diegovfeder/workspace/df/portfolio/src/data/ai/persona.ts`
- Brag data + mapping: `/Users/diegovfeder/workspace/df/portfolio/src/utils/brag.ts`, `/Users/diegovfeder/workspace/df/portfolio/src/utils/brag-private.ts`
- Brag prompt templates: `/Users/diegovfeder/workspace/df/portfolio/src/data/brag/prompts.ts`
- Private brag module contract: `/Users/diegovfeder/workspace/df/portfolio/src/data/brag/private.ts`
- Blog content files: `/Users/diegovfeder/workspace/df/portfolio/public/blog/posts/`
- Project data: `/Users/diegovfeder/workspace/df/portfolio/src/data/projects.ts`
- Deploy config: `/Users/diegovfeder/workspace/df/portfolio/app.config.ts`
- Package stack and scripts: `/Users/diegovfeder/workspace/df/portfolio/package.json`
- CI workflows: `/Users/diegovfeder/workspace/df/portfolio/.github/workflows/`

## Route Map

- `/` -> portfolio sections (`HomeSection`, `CasesSection`, `ProjectsSection`, `AboutSection`, `ContactSection`)
- `/blog` -> blog grid driven by `blogPostEntries`
- `/blog/:slug` -> loads markdown from `public/blog/posts/:slug.md`, parses with `marked`, sanitizes with `DOMPurify`
- `/chat` -> chat UI that posts to `/api/chat`, renders plain-text transcript, and uses strict grounding
- `/api/chat` -> server endpoint that validates messages, injects persona+knowledge prompt, and calls DeepSeek
- `/brag` -> merges blog-derived public evidence with local/dev private brag notes, then renders timeline/retros/prompts/exports
- fallback -> terminal-style 404 view

## Main User Flows

1. Browse one-page portfolio sections and use hash navigation.
2. Open enterprise case study modals and click out to external websites.
3. Browse client projects, toggle hidden projects, open project links.
4. Open blog list and navigate into blog post detail pages.
5. Read markdown blog posts rendered safely with XSS sanitization.
6. Open `/chat` and ask grounded questions about portfolio/blog/projects.
7. Open `/brag` directly to run career retros and copy AI prompt/export blocks.
8. Toggle dark/light mode with persistence via `localStorage`.

## Stack Fingerprint

- Frontend: SolidJS + SolidStart, file-based routing, TailwindCSS, Corvu dialog components.
- Content: Static metadata (`src/utils/blog.ts`) + static markdown files in `public/blog/posts` + brag workflow data (`src/utils/brag.ts`, `src/data/brag/*`) + chat persona grounding (`src/data/ai/persona.ts`).
- Security: DOMPurify for sanitized markdown rendering.
- Server/API: SolidStart API route (`src/routes/api/chat.ts`) with DeepSeek upstream integration.
- Build/dev: Vinxi (`dev/build/start` scripts).
- Deploy target: Vercel preset (`app.config.ts`).
- Type/lint/test: TypeScript, ESLint, Vitest.

## Architecture Boundaries

- Route layer: `src/routes/*`
- UI components: `src/components/*`
- Domain content data: `src/data/*`, `src/utils/blog.ts`, `src/utils/brag.ts`, `public/blog/posts/*`, `docs/brag/*`
- Shared state/context: `src/context/theme.tsx`
- Styling system: `src/app.css`, `tailwind.config.cjs`
- Infra/workflows: `.github/workflows/*`, `app.config.ts`

## Known Gaps / Caveats

- Blog metadata is separate from markdown bodies (potential drift risk).
- Private brag notes are intentionally local/dev-only (`src/data/brag/private.local.ts`) and ignored by git.
- Chat route depends on `DEEPSEEK_API_KEY` for `/api/chat`.
- No persistent backend data layer or auth; chat is stateless and public.
- No dedicated lint/test/build CI workflow found beyond Claude automation workflows.

## Fast Safe Recon Commands

```bash
ls -la
find . -maxdepth 2 -type f \( -name "package.json" -o -name "README*" -o -name "next.config.*" -o -name "vite.config.*" -o -name "turbo.json" -o -name "pnpm-workspace.yaml" \)
cat README.md
rg -n "router|blog|marked|dompurify|vercel|workflow|theme|localStorage" src package.json app.config.ts .github
```
