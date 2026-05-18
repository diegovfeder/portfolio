# AI Knowledge Index

Last updated: 2026-05-17 (America/Sao_Paulo)

## What This Webapp Is

Personal portfolio + blog for Diego Feder, built with SolidStart. The main experience is a one-page portfolio (`/`), a markdown-backed blog (`/blog`, `/blog/:slug`), a grounded AI chat route (`/chat`), and a public brag route (`/brag`, `/brag/:year`) for yearly impact documents and profile evidence.

## Canonical Files (Read First)

- Design system spec (DESIGN.md): `/Users/diegovfeder/workspace/df/portfolio/DESIGN.md`
- App shell and routing: `/Users/diegovfeder/workspace/df/portfolio/src/app.tsx`
- Home route: `/Users/diegovfeder/workspace/df/portfolio/src/routes/index.tsx`
- Blog routes: `/Users/diegovfeder/workspace/df/portfolio/src/routes/blog/index.tsx`, `/Users/diegovfeder/workspace/df/portfolio/src/routes/blog/[slug].tsx`
- Chat route + API: `/Users/diegovfeder/workspace/df/portfolio/src/routes/chat.tsx`, `/Users/diegovfeder/workspace/df/portfolio/src/routes/api/chat.ts`
- Brag routes: `/Users/diegovfeder/workspace/df/portfolio/src/routes/brag/index.tsx`, `/Users/diegovfeder/workspace/df/portfolio/src/routes/brag/[year].tsx`
- Blog metadata: `/Users/diegovfeder/workspace/df/portfolio/src/utils/blog.ts`
- Shared markdown rendering/sanitization: `/Users/diegovfeder/workspace/df/portfolio/src/utils/markdown-content.ts`, `/Users/diegovfeder/workspace/df/portfolio/src/utils/markdown-content.server.ts`, `/Users/diegovfeder/workspace/df/portfolio/src/utils/sanitize-html.ts`, `/Users/diegovfeder/workspace/df/portfolio/src/utils/sanitize-html.server.ts`
- Chat persona grounding: `/Users/diegovfeder/workspace/df/portfolio/src/data/ai/persona.ts`
- Brag data + mapping: `/Users/diegovfeder/workspace/df/portfolio/src/utils/brag.ts`, `/Users/diegovfeder/workspace/df/portfolio/src/data/brag/profile.ts`, `/Users/diegovfeder/workspace/df/portfolio/src/data/brag/reports.ts`
- Brag prompt templates: `/Users/diegovfeder/workspace/df/portfolio/src/data/brag/prompts.ts`
- Brag docs + workflow: `/Users/diegovfeder/workspace/df/portfolio/docs/brag/README.md`, `/Users/diegovfeder/workspace/df/portfolio/docs/brag/OPERATING_MODEL.md`, `/Users/diegovfeder/workspace/df/portfolio/docs/brag/prompts/BRAG_OPERATING_PROMPTS.md`, `/Users/diegovfeder/workspace/df/portfolio/docs/brag/templates/BRAG_REPORT.md`
- Repo-local brag skill: `/Users/diegovfeder/workspace/df/portfolio/skills/brag-workflow/SKILL.md`
- Repo-local blog publishing skill: `/Users/diegovfeder/workspace/df/portfolio/skills/blog-create-post/SKILL.md`
- Blog content files: `/Users/diegovfeder/workspace/df/portfolio/public/blog/posts/`
- Brag report markdown files: `/Users/diegovfeder/workspace/df/portfolio/public/brag/reports/`
- Project data: `/Users/diegovfeder/workspace/df/portfolio/src/data/projects.ts`
- Deploy config: `/Users/diegovfeder/workspace/df/portfolio/app.config.ts`
- Package stack and scripts: `/Users/diegovfeder/workspace/df/portfolio/package.json`
- CI workflows: `/Users/diegovfeder/workspace/df/portfolio/.github/workflows/`

## Route Map

- `/` -> portfolio sections (`HomeSection`, `CasesSection`, `ProjectsSection`, `AboutSection`, `ContactSection`)
- `/blog` -> blog grid driven by `blogPostEntries`
- `/blog/:slug` -> loads markdown from `public/blog/posts/:slug.md`, parses with `marked`, sanitizes with `DOMPurify`, then renders via `MarkdownRenderer`
- `/chat` -> chat UI that posts to `/api/chat`, renders plain-text transcript, and uses strict grounding
- `/api/chat` -> server endpoint that validates messages, injects persona+knowledge prompt, and calls DeepSeek
- `/brag` -> public brag landing page with profile, timeline, recent blog evidence, yearly report cards, prompt templates, and artifacts
- `/brag/:year` -> yearly brag markdown document rendered from `public/brag/reports/<year>.md`
- fallback -> terminal-style 404 view

## Main User Flows

1. Browse one-page portfolio sections and use hash navigation.
2. Open enterprise case study modals and click out to external websites.
3. Browse client projects, toggle hidden projects, open project links.
4. Open blog list and navigate into blog post detail pages.
5. Read markdown blog posts rendered safely with XSS sanitization.
6. Open `/chat` and ask grounded questions about portfolio/blog/projects.
7. Open `/brag` to browse public brag content and yearly impact documents.
8. Open `/brag/:year` to read a single annual brag report with related blog evidence.
9. Toggle dark/light mode with persistence via `localStorage`.

## Stack Fingerprint

- Frontend: SolidJS + SolidStart, file-based routing, TailwindCSS, Corvu dialog components.
- Content: Static metadata (`src/utils/blog.ts`) + static markdown files in `public/blog/posts` + brag profile/report data (`src/utils/brag.ts`, `src/data/brag/*`, `public/brag/reports/*`) + chat persona grounding (`src/data/ai/persona.ts`).
- Blog publishing contract: each post requires a metadata entry in `src/utils/blog.ts` and a matching markdown file in `public/blog/posts/<SLUG>.md`; route lookup is slug-driven and case-sensitive.
- Brag operating model: tool-agnostic evidence workflow with capture notes, public blog evidence, yearly markdown-backed brag documents, and reusable review/interview/resume artifacts. `/brag` stays public-safe and curated.
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
- Styling system: `DESIGN.md` (tokens + rationale), `src/app.css`, `tailwind.config.cjs`
- Infra/workflows: `.github/workflows/*`, `app.config.ts`

## Known Gaps / Caveats

- Blog metadata is separate from markdown bodies (potential drift risk).
- Brag profile content is mirrored between `docs/brag/manifest/profile.md` and `src/data/brag/profile.ts`, so those two files must stay aligned.
- Yearly brag report metadata in `src/data/brag/reports.ts` must stay aligned with markdown files in `public/brag/reports/`.
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
