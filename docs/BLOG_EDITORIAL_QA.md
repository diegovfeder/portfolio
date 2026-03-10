# Blog Editorial QA Checklist

Use this before publishing or merging a post update.

## Structure

- [ ] One H1 only.
- [ ] 3-4 H2 sections total.
- [ ] Final H2 is a closing section.
- [ ] Word count between 350 and 550.

## Style

- [ ] Title follows `Clear Topic: Poetic Subtitle`.
- [ ] Opening reaches the point within first 2 paragraphs.
- [ ] Paragraphs use claim -> image -> takeaway flow.
- [ ] Language is concise and avoids tutorial bloat.

## Code Content

- [ ] No code blocks, or at most 1 code block.
- [ ] If used, code block is <= 8 lines.

## Metadata Sync

- [ ] `src/utils/blog.ts` title matches markdown H1 intent.
- [ ] Description is concise and aligned with final draft.
- [ ] Tags reflect the rewritten angle.
- [ ] `readingTime` follows spec thresholds.

## Runtime Sanity

- [ ] Post opens from blog grid.
- [ ] Route slug resolves without 404.
- [ ] Markdown renders correctly (headings, bullets, emphasis).
