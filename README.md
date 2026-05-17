# @diegovfeder portfolio

Welcome to my personal portfolio. It showcases my work as a software engineer — skills, past projects, and a bit about myself — built with SolidStart and TailwindCSS.

It now includes:

- a public `/blog` for long-form writing
- a public `/chat` route backed by DeepSeek, constrained to portfolio/blog/project context
- a public `/brag` route that presents yearly brag documents, recent blog evidence, and a typed public profile — the seed of a personal **brag-doc system** that turns blog writing and yearly impact notes into a reusable proof surface

The design system is documented in [`DESIGN.md`](./DESIGN.md). AI session conventions live in [`AGENTS.md`](./AGENTS.md) and [`CLAUDE.md`](./CLAUDE.md).

## Tech Stack

- **Framework**: SolidJS + SolidStart (file-based routing, SSR/SSG)
- **Styling**: TailwindCSS with `@tailwindcss/typography`, `tailwindcss-animate`, `@corvu/tailwind`
- **Routing**: `@solidjs/router`
- **Dialogs**: `@corvu/dialog`
- **Icons**: `solid-icons`
- **State**: SolidJS signals + a single `ThemeProvider` context
- **Content**: `marked` + `DOMPurify` for sanitized markdown rendering
- **Server**: SolidStart API route for `/api/chat` (DeepSeek upstream)
- **Tooling**: Bun, Vinxi (Vite 5.4 pinned), TypeScript 5.6, ESLint, Prettier, Vitest
- **Deploy**: Vercel preset (`app.config.ts`)

## Routes

- `/` - main portfolio sections
- `/blog` and `/blog/:slug` - markdown blog
- `/chat` - AI chat persona grounded in repo content
- `/brag` and `/brag/:year` - public brag landing page and yearly impact documents

## Brag System

The `/brag` experience is built to grow into a personal brag-doc system. Today it composes from:

- profile data mirrored from `docs/brag/manifest/profile.md` into `src/data/brag/profile.ts`
- recent public evidence pulled from `src/utils/blog.ts`
- yearly markdown reports in `public/brag/reports/<year>.md`, surfaced by `src/data/brag/reports.ts`

One brag document per year, kept small and stable: `2025` is closed, `2026` is the living document. Supporting templates (brag report, interview story, résumé block, review bullet) live in `docs/brag/templates/`. Capture and synthesis workflows are codified in [`skills/brag-workflow/SKILL.md`](./skills/brag-workflow/SKILL.md).

## Getting Started

To get started with this project, you'll need to have [Bun](https://bun.sh/) installed. If you haven't installed Bun yet, you can do so by following the instructions on their official website.

### Installing Dependencies

Once you've cloned the repository, navigate to the project directory and install the dependencies:

```sh
bun i
```

### Running the Development Server

To start the development server, run:

```sh
bun run dev
```

This will start the server and you can access it at `http://localhost:3000`.

### Chat Route Environment

The `/chat` route calls a server endpoint at `/api/chat` and requires:

- `DEEPSEEK_API_KEY` (required)
- `DEEPSEEK_MODEL` (optional, default: `deepseek-chat`)
- `DEEPSEEK_BASE_URL` (optional, default: `https://api.deepseek.com`)
- `CHAT_ALLOWED_ORIGINS` (recommended in production, comma-separated allowed origins)
- `CHAT_RATE_LIMIT_MAX_REQUESTS` (optional, default: `5`)
- `CHAT_RATE_LIMIT_WINDOW_MS` (optional, default: `60000`)

Example:

```sh
DEEPSEEK_API_KEY=your_key_here bun run dev
```

The chat API rejects cross-origin production requests and applies a best-effort
in-memory per-IP rate limit before forwarding requests to DeepSeek. For stricter
abuse protection, move the limiter to a shared store or add a bot challenge.

### Building for Production

To build the project for production, use the following command:

```sh
bun run build
```

This will generate the optimized files for deployment.

## Deployment

*This section will be updated with deployment instructions once the deployment process is completed.*

## Acknowledgments

- Thanks to the SolidJS community for their amazing framework and resources.
- Special thanks to the TailwindCSS team for their utility-first CSS framework that makes styling a breeze.

Feel free to reach out if you have any questions or feedback!
