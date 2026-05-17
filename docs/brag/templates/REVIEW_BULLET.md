# Review Bullet Template

Use this template to generate performance review bullets from brag entries. Works for self-reviews, manager feedback, or promotion packets.

## Instructions

1. Read `docs/brag/manifest/profile.md` for role context.
2. Group brag entries by competency area.
3. Write 1-2 bullets per competency using the format below.

## Competency Areas

| Area | What counts |
|------|------------|
| **Delivery** | Shipped features, fixed bugs, met deadlines, unblocked others |
| **Technical depth** | Architecture decisions, refactoring, performance, reliability |
| **Collaboration** | Code reviews, mentoring, cross-team work, documentation |
| **Leadership** | Drove initiatives, made decisions under ambiguity, set direction |
| **Growth** | New skills learned, knowledge shared, processes improved |

## Bullet Format

**[Competency]: [What you did] → [Impact or outcome]**

### Examples

- **Delivery**: Shipped a blog-first brag system with typed metadata, capture automation, and AI review workflows → established a structured daily evidence pipeline for career growth.
- **Technical depth**: Refactored SEO tracker into a pure-core + adapter architecture with snapshot history → made weekly rank tracking reliable and testable.
- **Collaboration**: Published 12 blog posts on frontend practices, design systems, and technical storytelling → created shared reference material used by the team.
- **Growth**: Built a Notion-to-Next.js content SaaS from a client delivery pattern → expanded product thinking skills beyond pure frontend work.

## Output Structure

```markdown
## Performance Review — {{period}}

### Delivery
- {{bullet}}
- {{bullet}}

### Technical Depth
- {{bullet}}

### Collaboration
- {{bullet}}

### Leadership
- {{bullet}}

### Growth
- {{bullet}}

### Areas for Improvement
- {{honest gap from manifest or brag entries with confidence: emerging}}

### Goals for Next Period
- {{drawn from manifest career direction + brag next_actions}}
```
