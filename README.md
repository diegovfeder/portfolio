# @diegovfeder portfolio

Welcome to my personal portfolio! This project showcases my work as a front-end engineer, highlighting my skills, past projects, and a bit about myself. The portfolio is built using SolidJS and TailwindCSS, providing a responsive and visually appealing experience.

It now includes:
- a hidden direct route, `/brag`, that works as an AI-powered career workflow board (timeline, retros, prompt packs, and markdown exports).
- a public `/chat` route backed by DeepSeek, constrained to portfolio/blog/project context.

## Tech Stack

- **Framework**: SolidJS
- **Styling**: TailwindCSS
- **Routing**: SolidJS Router
- **Dialog Component**: @corvu/dialog
- **Icons**: solid-icons
- **State Management**: SolidJS Signals
- **Image Handling**: Lazy loading with custom LazyImage component

## Routes

- `/` - main portfolio sections
- `/blog` and `/blog/:slug` - markdown blog
- `/chat` - AI chat persona grounded in repo content
- `/brag` - direct-access brag document workflow (not linked in primary nav)

## Brag Workflow (Local-First)

The `/brag` route merges:

- Public evidence from blog metadata (`src/utils/blog.ts`)
- Private local notes loaded only in dev from `src/data/brag/private.local.ts`

Production mode always disables private notes.

### Local Private Setup

1. Copy `src/data/brag/private.local.example.ts` to `src/data/brag/private.local.ts`.
2. Add your private entries/summaries.
3. Run `bun run dev` and open `http://localhost:3000/brag`.

Supporting markdown templates are in `docs/brag/templates/`.

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

Example:

```sh
DEEPSEEK_API_KEY=your_key_here bun run dev
```

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
