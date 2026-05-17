# Agent Guide For This Repository

This file is the cross-session handoff so different AI conversations start from the same context.

## Bootstrap Order (Required)

1. [`/Users/diegovfeder/workspace/df/portfolio/docs/AI_INDEX.md`](/Users/diegovfeder/workspace/df/portfolio/docs/AI_INDEX.md) — canonical files + route map.
2. [`/Users/diegovfeder/workspace/df/portfolio/CLAUDE.md`](/Users/diegovfeder/workspace/df/portfolio/CLAUDE.md) — working rules, stack, code conventions.
3. [`/Users/diegovfeder/workspace/df/portfolio/DESIGN.md`](/Users/diegovfeder/workspace/df/portfolio/DESIGN.md) — design tokens + brand rationale (any UI work).
4. [`/Users/diegovfeder/workspace/df/portfolio/README.md`](/Users/diegovfeder/workspace/df/portfolio/README.md) — public-facing summary + chat env vars.
5. Local agent memory:
   - [`/Users/diegovfeder/workspace/df/portfolio/.kb/INDEX.md`](/Users/diegovfeder/workspace/df/portfolio/.kb/INDEX.md)
   - Latest entry in [`/Users/diegovfeder/workspace/df/portfolio/.kb/journal/`](/Users/diegovfeder/workspace/df/portfolio/.kb/journal/)
6. Read relevant [`.kb/gotchas/`](/Users/diegovfeder/workspace/df/portfolio/.kb/gotchas/) before any route/runtime change.
7. For DESIGN.md authoring or refreshes (in this repo or any other), use the template in [`/Users/diegovfeder/workspace/df/portfolio/docs/prompts/DESIGN_MD_AUTHORING_PROMPT.md`](/Users/diegovfeder/workspace/df/portfolio/docs/prompts/DESIGN_MD_AUTHORING_PROMPT.md).

## Repo-Local Skills

- `brag-workflow` — [`skills/brag-workflow/SKILL.md`](/Users/diegovfeder/workspace/df/portfolio/skills/brag-workflow/SKILL.md). Use for yearly brag documents, brag synthesis, interview story generation, and updating `/brag` evidence from public blog posts and profile material.
- `blog-create-post` — [`skills/blog-create-post/SKILL.md`](/Users/diegovfeder/workspace/df/portfolio/skills/blog-create-post/SKILL.md). Use for drafting, adding, editing, or publishing posts for `/blog`.

## Global Tooling Skills (Reference Only)

These live under `~/.codex/skills/` and are user-global Codex tooling. They are listed here as discoverable references for cross-tool work; they are **not** repo dependencies and not required for any task in this codebase.

- `cloudflare-deploy` — `/Users/diegovfeder/.codex/skills/cloudflare-deploy/SKILL.md`
- `figma` — `/Users/diegovfeder/.codex/skills/figma/SKILL.md`
- `gh-fix-ci` — `/Users/diegovfeder/.codex/skills/gh-fix-ci/SKILL.md`
- `notion-spec-to-implementation` — `/Users/diegovfeder/.codex/skills/notion-spec-to-implementation/SKILL.md`
- `vercel-deploy` — `/Users/diegovfeder/.codex/skills/vercel-deploy/SKILL.md`
- `skill-creator` (system) — `/Users/diegovfeder/.codex/skills/.system/skill-creator/SKILL.md`
- `skill-installer` (system) — `/Users/diegovfeder/.codex/skills/.system/skill-installer/SKILL.md`

## Operating Rules

- Default to read-only reconnaissance before mutating code.
- Prove claims with concrete file paths (line references when useful).
- Do not mutate code unless asked.
- Keep documentation in sync with reality:
  - `docs/AI_INDEX.md` when routes, architecture, stack, or workflows change.
  - `DESIGN.md` when UI tokens, brand voice, or component patterns change.
  - `.kb/journal/` for per-task decisions (append-only, `YYYY-MM-DD-<slug>.md`).
  - `.kb/gotchas/` when a codebase-specific trap is discovered.
- Before handoff: run `bun lint` and targeted `bun test` for modified areas. Summarise what changed, why, and residual risks.
