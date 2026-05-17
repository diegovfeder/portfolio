---
name: blog-create-post
description: Create or update a blog post for this portfolio repo. Use when the user wants to write, draft, publish, or add an article, case study, or essay to `/blog`, including choosing the slug, updating metadata in src/utils/blog.ts, creating the matching markdown file in public/blog/posts, and validating that both stay in sync.
---

# blog-create-post

Use this skill when a request is about adding or updating blog content in this repository.

Repo context:
- metadata lives in `/Users/diegovfeder/workspace/df/portfolio/src/utils/blog.ts`
- markdown bodies live in `/Users/diegovfeder/workspace/df/portfolio/public/blog/posts/`
- blog detail pages read metadata from `blogPostEntries` and fetch `/blog/posts/<slug>.md`
- blog metadata also feeds AI grounding and public brag evidence, so title, description, tags, and date matter beyond the blog UI

## Goal

Ship a blog post that is publishable in this codebase, not just drafted in isolation.

That means keeping metadata and markdown synchronized.

## Workflow

1. Inspect the current blog system before writing:
   - read `src/utils/blog.ts`
   - read 1-2 recent posts in `public/blog/posts/`
   - confirm the post’s audience, angle, and evidence source from the user request or repo context

2. Define the publishing contract:
   - slug: uppercase snake case, matching existing posts
   - metadata path: `src/utils/blog.ts`
   - markdown path: `public/blog/posts/<SLUG>.md`
   - date: ISO `YYYY-MM-DD`
   - tags: lowercase, concise, hyphenated when needed
   - readingTime: integer minutes
   - description: one clear sentence for the blog grid and AI grounding

3. Write both parts together:
   - add or update the `blogPostEntries` item
   - create or update the matching markdown file
   - keep title, slug, and intent aligned across both files

4. Follow the repo’s writing style:
   - start the markdown file with `# Title`
   - use a short italic opening hook after the title when it improves the post
   - prefer `##` section headings over long unbroken prose
   - write with concrete claims, practical framing, and minimal filler
   - use inline markdown links when citing external sites or examples

5. Validate the publish shape:
   - confirm the slug exists in both `src/utils/blog.ts` and `public/blog/posts/`
   - ensure the metadata entry is ordered correctly among existing posts, usually newest-first
   - run a targeted check when appropriate, preferably `bun run build`, because prerender will catch broken blog links or missing routes

## Guardrails

- Never create only the markdown file or only the metadata entry. This repo needs both.
- Do not add YAML frontmatter to blog markdown files. The route reads raw markdown, not frontmatter.
- Do not invent metrics, outcomes, or case-study evidence. If the user has not provided proof, state the uncertainty or keep the claim softer.
- Keep descriptions and tags useful for retrieval. They power blog cards, chat grounding, and public brag summaries.
- If editing an existing post, preserve the slug unless the user explicitly wants a route change.

## Standard Output

- final post title
- slug
- files changed
- any weak claims or missing evidence that still need confirmation
