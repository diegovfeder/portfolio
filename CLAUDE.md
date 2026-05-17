# Portfolio — Claude Code Working Rules

Personal portfolio and writing surface for Diego Feder, built on SolidStart. It hosts:

- a one-page portfolio at `/`
- a markdown blog at `/blog` and `/blog/:slug`
- a grounded AI chat at `/chat` (server endpoint at `/api/chat`)
- a public brag surface at `/brag` and `/brag/:year` — evolving into a personal brag-doc system grounded in public writing and yearly impact docs

## Session Bootstrap (read in order)

1. `/Users/diegovfeder/workspace/df/portfolio/AGENTS.md` — cross-session handoff
2. `/Users/diegovfeder/workspace/df/portfolio/docs/AI_INDEX.md` — canonical files + route map
3. `/Users/diegovfeder/workspace/df/portfolio/DESIGN.md` — design tokens + brand rationale (any UI work)
4. `/Users/diegovfeder/workspace/df/portfolio/.kb/INDEX.md` plus the latest entry in `/Users/diegovfeder/workspace/df/portfolio/.kb/journal/` — local agent memory
5. `/Users/diegovfeder/workspace/df/portfolio/.kb/gotchas/` — read before any route/runtime change
6. `/Users/diegovfeder/workspace/df/portfolio/docs/prompts/DESIGN_MD_AUTHORING_PROMPT.md` — for authoring or refreshing the DESIGN.md spec in this or any other repo

## Repo-Local Skills

- `brag-workflow` — `/Users/diegovfeder/workspace/df/portfolio/skills/brag-workflow/SKILL.md`. Use for yearly brag docs, evidence synthesis, interview story prep, and `/brag` updates.
- `blog-create-post` — `/Users/diegovfeder/workspace/df/portfolio/skills/blog-create-post/SKILL.md`. Use for drafting, adding, editing, or publishing `/blog` posts.

## Stack

- SolidJS 1.8 + SolidStart 1.0 with `@solidjs/router` and `@solidjs/meta`
- TypeScript 5.6
- TailwindCSS 3.4 with the `@tailwindcss/typography`, `tailwindcss-animate`, and `@corvu/tailwind` plugins
- `@corvu/dialog` for modal/dialog primitives
- Bun as package manager and runtime; Node >= 18
- Vinxi (Vite 5.4 pinned) for dev/build; Vercel deploy preset
- Vitest + `@solidjs/testing-library` for tests
- ESLint 9 + `eslint-plugin-solid` + Prettier
- `marked` + `DOMPurify` for safe markdown rendering
- DeepSeek upstream for `/api/chat`

## Routes

- `/` — portfolio sections (`HomeSection`, `CasesSection`, `ProjectsSection`, `AboutSection`, `ContactSection`)
- `/blog`, `/blog/:slug` — markdown blog backed by `public/blog/posts/<slug>.md` and metadata in `src/utils/blog.ts`
- `/chat` — grounded persona chat UI; posts to `/api/chat`
- `/api/chat` — server endpoint that injects persona + knowledge prompt and calls DeepSeek
- `/brag` — public brag landing (profile, timeline, recent blog evidence, yearly reports)
- `/brag/:year` — yearly brag document rendered from `public/brag/reports/<year>.md`
- `[...404]` — terminal-style fallback view

## Project Layout

```bash
src/
├── routes/
│   ├── index.tsx          # /
│   ├── blog/
│   │   ├── index.tsx      # /blog
│   │   └── [slug].tsx     # /blog/:slug
│   ├── chat.tsx           # /chat
│   ├── brag/
│   │   ├── index.tsx      # /brag
│   │   └── [year].tsx     # /brag/:year
│   ├── api/
│   │   └── chat.ts        # /api/chat (DeepSeek)
│   └── [...404].tsx       # terminal-UI 404
├── components/
│   ├── blog/              # card, grid, header, button
│   ├── brag/              # report-page
│   ├── core/              # nav, theme-button, lazy-image, dialog primitives
│   ├── home/              # case, project, skill, list
│   ├── markdown/          # renderer (DOMPurify + marked)
│   ├── sections/          # home/cases/projects/about/contact
│   └── terminal/          # window (draggable), error (interactive)
├── context/               # theme provider
├── data/                  # projects, brag profile/reports/prompts, ai persona
├── utils/                 # blog metadata, brag helpers
├── constants/             # theme tokens
├── tests/                 # vitest + testing-library
├── app.css                # globals + focus utilities
└── app.tsx                # app shell
public/
├── blog/posts/<slug>.md   # blog markdown bodies
└── brag/reports/<year>.md # yearly brag markdown bodies
```

## Code Conventions

### SolidJS

- Read signals with `()` (e.g. `count()`).
- Use `createSignal` for local state, `createMemo` for derived values, `createEffect` for reactive side effects.
- Prefer `<Show>`, `<Switch>` + `<Match>`, `<For>` over JS-level conditionals and loops in JSX.
- Use `createResource` / `createAsync` for async data; respect Solid's reactive boundaries.

### Components

- Arrow function syntax for component definitions.
- Type all props and function parameters.
- Single-responsibility, composable components; lift only the state that must be shared.
- Default-export the file's main component.
- Use the `~/` import alias for `src/` paths.

### Events

- Name handlers `handle*` (e.g. `handleClick`, `handleSubmit`, `handleCommand`).

### Styling

- Tailwind utilities first. Reach for global CSS only when extending shared utilities in `src/app.css` (the four `focus-*` classes live there).
- Prefer class objects (`classList`) over ternaries for conditional styling.
- Treat `DESIGN.md` tokens as canonical for any UI work — `border-2`, `rounded-lg`, `rounded-full`, the `border-b-8 w-14/16` section rule, `hover:scale-105 transition-all duration-500`, mono voice on chrome.
- No backdrop blur on content surfaces (reserved for the Corvu dialog overlay). No atmospheric gradients. No multi-colour accent chips.

### Accessibility

- Appropriate ARIA attributes and semantic HTML.
- Keyboard navigation must work end-to-end.
- Visible focus on every interactive element — use the global `focus-ring` / `focus-scale` / `focus-pulse` / `focus-bold-and-underline` utilities from `src/app.css`.
- Labels and structure that read sensibly via screen reader.

### Security

- All user-rendered markdown goes through `DOMPurify` via `MarkdownRenderer`. Don't bypass it.
- Validate inputs at API boundaries (see `src/routes/api/chat.ts` for the existing pattern).

## Working Style In This Repo

- Default to read-only reconnaissance before mutating code.
- Prove claims with concrete file paths (line references when useful).
- Don't mutate code unless asked.
- When routes, architecture, stack, workflows, or UI tokens change, update the matching doc: `docs/AI_INDEX.md` for routes/architecture, `DESIGN.md` for UI tokens, `.kb/journal/` for task-scoped decisions, `.kb/gotchas/` for codebase traps.
- Before handoff: run `bun lint` (and `bun test` for modified areas), then summarise what changed, why, and any residual risks.

## Development Commands

```bash
bun i           # install
bun dev         # start dev server on http://localhost:3000
bun build       # production build (Vinxi → Vercel preset)
bun start       # serve the production build
bun test        # vitest
bun lint        # eslint
bun lint:fix
bun format
bun format:check
```

## Environment

- `/api/chat` requires `DEEPSEEK_API_KEY`. See `README.md` for the full chat env (`DEEPSEEK_MODEL`, `DEEPSEEK_BASE_URL`, `CHAT_ALLOWED_ORIGINS`, `CHAT_RATE_LIMIT_*`).
- No persistent backend; chat is stateless and public.
- Theme persists via `localStorage`.
