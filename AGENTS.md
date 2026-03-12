# Agent Guide For This Repository

This file is the cross-session handoff so different AI conversations start from the same context.

## Bootstrap Order (Required)

1. Read [`/Users/diegovfeder/workspace/df/portfolio/docs/AI_INDEX.md`](/Users/diegovfeder/workspace/df/portfolio/docs/AI_INDEX.md).
2. Read [`/Users/diegovfeder/workspace/df/portfolio/CLAUDE.md`](/Users/diegovfeder/workspace/df/portfolio/CLAUDE.md).
3. Read [`/Users/diegovfeder/workspace/df/portfolio/README.md`](/Users/diegovfeder/workspace/df/portfolio/README.md).
4. Use the prompt template in [`/Users/diegovfeder/workspace/df/portfolio/docs/prompts/CODEBASE_FORENSICS_PROMPT.md`](/Users/diegovfeder/workspace/df/portfolio/docs/prompts/CODEBASE_FORENSICS_PROMPT.md) for repository investigation tasks.

## Verified Skills (Installed)

- `cloudflare-deploy`: `/Users/diegovfeder/.codex/skills/cloudflare-deploy/SKILL.md`
- `figma`: `/Users/diegovfeder/.codex/skills/figma/SKILL.md`
- `gh-fix-ci`: `/Users/diegovfeder/.codex/skills/gh-fix-ci/SKILL.md`
- `notion-spec-to-implementation`: `/Users/diegovfeder/.codex/skills/notion-spec-to-implementation/SKILL.md`
- `vercel-deploy`: `/Users/diegovfeder/.codex/skills/vercel-deploy/SKILL.md`
- `skill-creator`: `/Users/diegovfeder/.codex/skills/.system/skill-creator/SKILL.md`
- `skill-installer`: `/Users/diegovfeder/.codex/skills/.system/skill-installer/SKILL.md`

## Repo-Local Skills

- `brag-workflow`: `/Users/diegovfeder/workspace/df/portfolio/docs/skills/brag-workflow/SKILL.md`

Use `brag-workflow` whenever the task is about daily captures, brag synthesis, interview story generation, or updating `/brag` evidence from local notes.

## Operating Rules For Future AI Sessions

- Default to read-only reconnaissance first.
- Prove claims with concrete file paths (and line references when useful).
- Do not mutate code unless asked.
- Keep `docs/AI_INDEX.md` updated when architecture, routes, stack, or workflows change.
