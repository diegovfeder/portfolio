# Brag Operating Model

This system turns ongoing work into reusable career evidence. The public `/brag` route is the proof surface; the operating model is the habit that keeps the proof current.

## Why This Exists

Brag documents solve a visibility and memory problem:

- managers and collaborators will not remember every useful contribution
- performance reviews over-index on recent work unless evidence is recorded over time
- invisible work such as mentoring, code review, incident response, refactoring, planning, and monitoring often disappears unless it is written down
- promotion, review, interview, and compensation conversations are easier when claims are backed by concrete examples
- reviewing your own evidence helps counter impostor syndrome with facts instead of vibes

The goal is not to publish every note. The goal is to keep enough evidence that later synthesis is honest, specific, and fast.

## Layers

### 1. Capture Layer

Short notes written weekly or biweekly. These can live outside the public repo when they include private context.

Capture notes should answer:

- What happened?
- Why did it matter?
- What did I personally do?
- What changed because of it?
- What evidence proves the change?
- Is this public-safe, private, or confidential?

### 2. Evidence Layer

Public-safe sources that can be reused by the site and AI workflows:

- blog posts in `public/blog/posts/`
- profile direction in `docs/brag/manifest/profile.md`
- yearly report markdown in `public/brag/reports/`
- runtime metadata in `src/data/brag/` and `src/utils/blog.ts`

Blog posts are the strongest public evidence when they explain context, decisions, tradeoffs, and outcomes.

### 3. Synthesis Layer

Periodic summaries that compress raw evidence into useful artifacts:

- yearly brag reports
- performance review bullets
- interview stories
- resume blocks
- role-fit maps

Synthesis should merge related small notes, remove noise, and promote only the strongest evidence.

### 4. Public Surface

`/brag` and `/brag/<year>` present curated, public-safe proof. They are not a private work diary.

## Cadence

- Weekly or biweekly: write quick evidence notes while memory is fresh.
- Monthly: scan notes and flag the strongest stories, metrics, and missing proof.
- Before 1:1s: pull 2-3 current bullets that show impact or open questions.
- Before performance reviews: synthesize the strongest evidence into review bullets.
- Yearly: update `public/brag/reports/<year>.md` with the durable story of the year.

Not every week needs a meaningful entry. Empty weeks are fine; forced evidence becomes noise.

## What Counts As Evidence

Include:

- shipped features, fixes, migrations, and releases
- architecture decisions and tradeoffs
- reliability, observability, performance, security, and maintenance work
- code reviews that changed direction or raised quality
- mentoring, pairing, onboarding, and documentation
- incidents, on-call work, debugging, and operational ownership
- stakeholder communication, planning, and alignment
- learning that later changed how work was delivered

Prefer metrics over adjectives:

- "reduced setup time from X to Y" is stronger than "made setup easier"
- "unblocked 3 engineers" is stronger than "helped the team"
- "documented the migration path used by two projects" is stronger than "improved docs"

If exact metrics are unavailable, name the observable outcome and mark the evidence quality honestly.

## Evidence Quality

Use these labels when an AI agent or human reviewer evaluates material:

- `strong`: concrete outcome, clear personal contribution, and at least one proof source
- `moderate`: clear contribution with partial proof or qualitative outcome
- `thin`: plausible story, but missing metrics, source links, or contribution boundaries

Thin evidence is not useless. It is a prompt to collect better proof before using the claim in a review, resume, or interview.

## Writing Shape

Use STAR or Context-Action-Result:

- Situation / Context: what was happening and why it mattered
- Task: what responsibility or constraint existed
- Action: what Diego personally did
- Result: what changed and how we know

Keep the phrasing concrete. Avoid claims that depend on confidence without evidence.

## Skills vs Prompts

Use the repo skill for repeatable work:

- `skills/blog-create-post/SKILL.md` when drafting or publishing a blog post
- `skills/brag-workflow/SKILL.md` when turning evidence into yearly reports, review bullets, interview stories, resume material, or `/brag` updates

Use prompt files for copyable task starters:

- `docs/brag/prompts/BRAG_OPERATING_PROMPTS.md`

The workflow is intentionally tool-agnostic. Codex, Cursor, Claude, or another assistant can follow the same sources, guardrails, and output templates.

## Recommended Flow

1. Do the work.
2. Capture a short note while context is fresh.
3. If the work has a public lesson, write a blog post.
4. Ask an AI agent to run a recent evidence review.
5. Promote strong evidence into the current yearly report.
6. Reuse the strongest yearly evidence for 1:1s, reviews, interviews, and role-fit prep.

The blog is not mandatory for every contribution, but it is the best public evidence when a story is worth explaining.

## References

- Julia Evans, "Write a brag document": https://jvns.ca/blog/brag-documents/
- Elton Minetto, "Dica de carreira: crie um brag document": https://eltonminetto.dev/post/2022-04-14-brag-document/
- Andre Neves, "Tech Leads Club Share Day - Brag Document + IA": https://github.com/AndreNeves97/brag-document
