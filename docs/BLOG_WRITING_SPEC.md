# Blog Writing Spec

This is the editorial source of truth for blog content in this repository.

## Objective

Write posts that are concise, poetic, and practical. Every post should feel human, clear, and useful in under a few minutes.

## Format Rules (Strict)

- Exactly one `#` title (H1).
- Use `3` or `4` `##` sections total.
- Include one closing section as the final `##` section.
- Target `350-550` words total.
- Use at most one code block only when truly essential.
- If a code block is used, max `8` lines.

## Title System

Use this pattern:

`Clear Topic: Poetic Subtitle`

Examples:

- `Local SEO in Curitiba: How Small Signals Became Local Trust`
- `Technical Storytelling: Turning Complexity into Shared Momentum`

## Voice Formula

Each paragraph should aim for this sequence:

1. Concrete claim
2. Vivid image or metaphor
3. Practical takeaway

Guidelines:

- Prefer short to medium sentences.
- Cut filler and repeated framing.
- Avoid tutorial-heavy tone unless the post is explicitly instructional.
- Keep language grounded: clear verbs, fewer abstractions.

## Structure Template

Use this default structure:

1. `# Title`
2. Short opening hook (1-2 paragraphs)
3. `## Section 1` (context)
4. `## Section 2` (core leverage points)
5. `## Section 3` (evidence, examples, or framework)
6. `## Closing ...` (actionable final perspective)

## Metadata Contract

Post body and metadata are split by design:

- Markdown body: `public/blog/posts/*.md`
- Metadata cards: `src/utils/blog.ts`

When rewriting a post, always update in both places:

- `title`
- `description`
- `tags`
- `readingTime`

## Reading Time Rule

Set `readingTime` from final draft length with this guideline:

- `1`: up to 180 words
- `2`: 181-320 words
- `3`: 321-480 words
- `4`: 481-650 words

## Do / Don’t

Do:

- Lead with one sharp idea.
- Use specific nouns and verbs.
- End with a direct takeaway.

Don’t:

- Stack multiple intros before the point.
- Overload posts with code or pseudo-code.
- Repeat the same idea in different wording.
