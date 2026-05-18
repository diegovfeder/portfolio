# Resume Block Template

Use this template to generate role-specific resume bullets from brag entries.

## Instructions

1. Read `docs/brag/manifest/profile.md` for identity and positioning.
2. Read `docs/brag/OPERATING_MODEL.md` for evidence quality rules.
3. Select the 3-5 strongest brag entries that match the target role.
4. Convert each into a resume bullet using the format below.

## Resume Bullet Format

**[Action verb] [what you did] [for whom/what scope], [measurable result or observable outcome].**

### Examples

- Designed and shipped a blog-first career evidence system with typed metadata and AI-driven review workflows, reducing brag-doc maintenance from ad-hoc notes to a structured evidence pipeline.
- Refactored an SEO rank tracker from a monolithic script into a testable pipeline with pure-core architecture and dependency-injected adapters, enabling reliable weekly snapshots across 50+ keywords.
- Productized client blog delivery into a Notion-to-Next.js content SaaS with SSR and SEO-first performance, eliminating per-client setup overhead.

## Output Structure

```markdown
## {{TARGET_ROLE}} - Resume Bullets

### Summary
{{2-3 sentence professional summary tailored to this role}}

### Experience
- {{bullet 1 - strongest fit}}
- {{bullet 2}}
- {{bullet 3}}
- {{bullet 4}}
- {{bullet 5}}

### Skills
{{comma-separated skills relevant to role, drawn from manifest skills inventory}}

### Evidence Gaps
- {{any claims that lack strong evidence - flag for honesty}}
```
