You are a senior design-engineer authoring the **DESIGN.md** for THIS repository.

Goal: produce a single, evidence-grounded `DESIGN.md` at the repo root that captures the design system as it actually exists in code — colors, typography, radii, spacing, motion, components, and the "do's and don'ts" that prevent future drift. The output must follow the DESIGN.md specification (YAML front matter + sectioned markdown body) so it can be consumed by other agents, design tools, and humans.

## Hard rules

- **Evidence-driven, not aspirational.** Document only what is actually in the code. Cite file paths when extracting a token.
- **Read-only first.** Survey the repo (Phase 1) before writing. Do not author anything until you have read enough to back every token with at least one real usage.
- **No new colors, fonts, or radii.** Extract from `tailwind.config.*`, global CSS, and component class strings. If a value never appears in code, do not invent it.
- **Theme-aware.** Where the repo has light/dark variants, pair each token with its dark counterpart (e.g. `accent-link`/`accent-link-dark`).
- **One DESIGN.md, at the repo root.** Path: `./DESIGN.md`. Overwrite only if the user confirms.
- **No secrets.** Do not read or echo `.env*` contents.

## Reference — DESIGN.md format spec

A DESIGN.md file has two layers:

1. **YAML front matter** (machine-readable tokens), delimited by `---` lines.
2. **Markdown body** (human rationale), organized into `##` sections.

### Front matter schema

```yaml
---
version: alpha
name: <Design system name>
description: <One-paragraph essay describing the brand voice and visual signature.>
colors:
  <token-name>: "#RRGGBB"
typography:
  <token-name>:
    fontFamily: "<stack>"
    fontSize: <px|rem>
    fontWeight: <number>
    lineHeight: <number|px>
    letterSpacing: <px|em>
rounded:
  <scale-name>: <px>
spacing:
  <scale-name>: <px>
components:
  <component-name>:
    backgroundColor: "{colors.<token>}"
    textColor: "{colors.<token>}"
    typography: "{typography.<token>}"
    rounded: "{rounded.<scale>}"
    padding: <px or px px>
---
```

Token references use `{path.to.token}` and may point to any previously defined value. Variants (hover, active, dark) live as separate entries with a related key name (e.g. `button-primary` + `button-primary-hover`).

### Required markdown sections, in order

1. `## Overview` — brand personality, target audience, the emotional response the UI should evoke, the brand's strongest visual signature.
2. `## Colors` — grouped by role (Brand & Accent, Surface, Hairlines, Text, Semantic, Decorative). Each entry: `**Name** ({colors.token} — #hex): one-line usage.`
3. `## Typography` — Font Family declaration, then a Hierarchy table mapping every typography token to family / size / weight / line-height / letter-spacing / Use, then Principles (3–6 bullets).
4. `## Layout` — base unit, spacing token list, grid / container rules, breakpoints, whitespace philosophy.
5. `## Elevation & Depth` — table of depth levels (flat / hairline / shadow tiers / atmospheric), plus a Decorative Depth note for any non-shadow depth signals (underline rules, dividers, gradients).
6. `## Shapes` — Border-Radius scale table mapping each `{rounded.token}` to a value and Use.
7. `## Components` — one paragraph per documented component, leading with its `{components.token}` name in bold and listing the exact classes / structure. Variants documented as siblings.
8. `## Do's and Don'ts` — two bulleted lists. The Don'ts must call out any out-of-system patterns currently shipping in the repo so future work converges back to system.

Optional sections allowed (e.g. `## Motion`, `## Responsive Behavior`, `## Iteration Guide`, `## Known Gaps`) if the codebase reveals patterns worth documenting.

### Mini example (compact)

```yaml
---
version: alpha
name: ExampleSystem
description: A calm, editorial brand. Black ink on pure white; one accent blue reserved for inline links.
colors:
  primary: "#000000"
  on-primary: "#ffffff"
  accent-link: "#2563eb"
  canvas: "#ffffff"
  hairline: "#e5e7eb"
typography:
  display-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  lg: 8px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 12px 20px
---
```

## Phase 1 — Repo indexing checklist (do this FIRST, in parallel where possible)

Run only safe, read-only commands. Build a mental model before writing.

1. **Stack fingerprint.** Read `package.json` (or equivalent: `pnpm-workspace.yaml`, `bun.lock`, `Cargo.toml`, `requirements.txt`). Note: framework (Next/Remix/SolidStart/Astro/Vite/etc.), UI libs (Corvu, Radix, Kobalte, Headless UI, shadcn/ui), styling layer (Tailwind v3/v4, CSS-in-JS, CSS modules), test runner.

2. **Tailwind / theme config.** Find and read all of:
   - `tailwind.config.{js,cjs,ts,mjs}`
   - `theme.config.*`, `panda.config.*`, `vanilla-extract*`, `unocss.config.*`
   - Any `colors.{ts,js}` / `tokens.{ts,js}` files in `src/`, `lib/`, `app/`, or `styles/`
   - For Tailwind v4: scan `*.css` files for `@theme { ... }` blocks
   Record: every custom color (literal hex + name), every custom font family, every custom radius/spacing/animation/keyframe, every plugin loaded.

3. **Global CSS.** Find and read every global stylesheet:
   - `globals.css`, `global.css`, `app.css`, `index.css`, `main.css`, `styles.css`
   - Custom `@layer base|components|utilities` blocks
   - CSS custom properties (`--color-foo`) defined on `:root`, `html`, `body`, or `.dark`
   - Reusable utility classes (`focus-ring`, `prose-*`, etc.)
   Record: theme switch mechanism (class strategy vs `[data-theme]`), font @imports/@font-face, scrollbar styles, focus rings.

4. **Routes / pages.** Inspect every top-level route file. For each, capture: page wrapper classes, max-width, padding pattern, hero treatment, section spacing pattern.

5. **Components.** Walk the components directory tree. Group by purpose:
   - Navigation (top nav, sidebar, breadcrumbs, footer)
   - Buttons / CTAs (including variants)
   - Cards (content, feature, pricing, blog, project)
   - Forms (inputs, selects, checkboxes, radios)
   - Dialogs / modals / sheets / tooltips
   - Badges / tags / chips
   - Code surfaces (terminal, code blocks, IDE mockups)
   - Decorative (heroes, dividers, banners)
   For each, capture: outer classes, hover/active/focus states, dark-mode pair, ARIA / semantic role.

6. **Recurring class patterns.** Use `rg` (ripgrep) to count:
   - Border weights: `\bborder(-[0-9]+)?\b`
   - Radius usage: `\brounded(-[a-z0-9\[\]]+)?\b`
   - Hover transforms: `hover:scale-[0-9.]+`, `hover:-?translate-`
   - Shadow tiers: `\bshadow(-[a-z0-9\[\]]+)?\b`
   - Backdrop blur / opacity fills: `backdrop-blur`, `bg-(white|black)/[0-9]+`
   - Tracking / uppercase overlines: `tracking-\[[0-9.]+em\]`, `uppercase`
   The most frequent values are canonical. Rare values are candidates for the **Don't** list.

7. **Out-of-system inventory.** While indexing, note any class patterns that exist in only one or two files but feel inconsistent with the dominant aesthetic. These become explicit **Don't** items and **Known Gaps** entries.

8. **Brand voice cues.** Look for repeated copy patterns: trailing punctuation (`brand.`, `routes_`), code-style labels (`year = '2026'`), section dividers, lowercase headings, identifier-style naming. These belong in the Overview and Typography Principles.

After Phase 1, you should be able to answer:

- What is the brand's single visual signature? (e.g. "vertical rotated nav rail", "device-mockup hero", "underline accent rule")
- What is the canonical card pattern? (border weight + radius + bg + hover)
- What is the canonical button pattern?
- What is the universal hover signature? (scale + duration + easing)
- Which 1–2 accent colors carry the brand? Which are off-system?

If you cannot answer these, keep indexing.

## Phase 2 — Token extraction rules

When translating Tailwind classes (or CSS custom properties) into DESIGN.md tokens:

- **Use semantic names, not literal Tailwind names.** `bg-blue-600` → `accent-link`, not `blue-600`. `bg-gray-200` used as a placeholder → `hairline` or `surface-soft`, depending on role.
- **Always record the literal hex.** Look up Tailwind's default palette if needed, or read the resolved value from custom config. Never use a name like `blue-600` as a token value.
- **Pair light + dark.** Every text/surface/hairline token gets a `-dark` companion when the repo's dark-mode pair differs.
- **Group by role**, not by hue. Brand & Accent · Surface · Hairlines · Text · Semantic · Decorative.
- **Typography tokens are composites.** `display-lg`, `title-md`, `body-md`, `caption`, `code`, `mono-button` are role-named. Sizes attach to roles, not to size-only tokens like `text-36`.
- **Reserved palette goes in `## Colors > Reserved`.** Colors declared in config but not yet used in any component get a dedicated subsection so future work can wire them in deliberately.
- **Component tokens reference other tokens.** Always `"{colors.token}"`, never inline hex.
- **Variants are sibling tokens.** `button-primary` + `button-primary-hover` + `button-primary-dark`. Never use a nested map.

## Phase 3 — Authoring checklist (write in this order)

1. **Draft the YAML front matter first.** Build the token catalog from Phase 1 evidence. If you find yourself inventing a name, stop and re-read the relevant component.

2. **Write the `## Overview`.** One paragraph essay. Lead with the canvas and accent, then the single visual signature, then the typography stance. End with a "Key Characteristics" bulleted list of 6–10 traits.

3. **Write `## Colors`.** Group as listed in Phase 2. Every entry must read: `**Name** ({colors.token} — #hex): one-line usage.`

4. **Write `## Typography`.** Font Family declaration → Hierarchy table with token / family / size / weight / line-height / letter-spacing / Use columns → Principles (the rules the brand follows, e.g. "Display weight stays at 600", "Mono is reserved for code surfaces").

5. **Write `## Layout`.** Base unit · spacing scale tokens · grid / max-widths / nav structure · breakpoints table · whitespace philosophy.

6. **Write `## Elevation & Depth`.** Depth tiers table. If the system is flat, say so and list what carries hierarchy instead (hairlines, underline rules, color shifts).

7. **Write `## Shapes`.** Radius scale table mapping every `{rounded.token}` to its value and Use. Identify the canonical card corner and CTA corner explicitly.

8. **Write `## Components`.** One block per component in token order. Lead with the bolded component token name, then the exact classes / structure. Document variants (hover, dark, active) as sibling blocks.

9. **(Optional) Write `## Motion`, `## Responsive Behavior`, `## Iteration Guide`, `## Known Gaps`** if Phase 1 revealed patterns worth capturing.

10. **Write `## Do's and Don'ts`.** Two bulleted lists.
    - **Do's** restate the canonical patterns in imperative voice: "Do use `border-2` on every card outline."
    - **Don'ts** name specific anti-patterns that exist in the codebase right now: "Don't use `rounded-2xl` — the canonical card corner is `{rounded.lg}` (8px)." Each Don't should be backed by a real usage you found in Phase 1.

## Phase 4 — Quality gates (run before declaring done)

Self-audit the draft. It is not ready until all of these pass:

- [ ] Every component listed in `components:` is referenced at least once in the `## Components` markdown section.
- [ ] Every color in `colors:` is referenced at least once in the `## Colors` markdown section.
- [ ] Every typography token in `typography:` appears in the Hierarchy table.
- [ ] No inline hex codes inside `components:`. All component fills/strokes use `{colors.token}` references.
- [ ] No invented values. Every hex / px / class shown can be grep'd in the repo.
- [ ] Dark-mode pairs documented for every color that has one in code.
- [ ] At least 3 Don'ts, each citing a real out-of-system pattern from the codebase.
- [ ] The Overview ends with a Key Characteristics bullet list (6–10 traits).
- [ ] The brand's single visual signature is named explicitly in the Overview.
- [ ] If the repo uses Tailwind, the spacing scale is anchored to Tailwind's 4px base unless the config overrides it.
- [ ] If a section is intentionally omitted (e.g. no Motion section because animations are out of scope), document the omission under `## Known Gaps`.

## Output

- Write the final file to `./DESIGN.md` at the repo root.
- Do not overwrite an existing DESIGN.md without asking the user first; if one exists, propose a diff or place the new draft at `./DESIGN.draft.md` for review.
- After writing, print a short summary: brand name, token count by group (e.g. "12 colors, 9 typography, 5 rounded, 8 spacing, 18 components"), and the 3 most surprising out-of-system patterns you flagged in **Don'ts**.
- Suggest wiring the file in:
  - Add it to the project's bootstrap doc (e.g. `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `README.md`) as "the canonical source of truth for any UI work."
  - If the project has an AI session index (e.g. `docs/AI_INDEX.md`), add it there too.

## Failure modes to avoid

- **Don't echo Tailwind's full default palette.** Only document colors actually used in code.
- **Don't write a marketing brochure.** This is a technical spec for agents and engineers. Tight prose; no adjective stacking.
- **Don't aspire.** If the repo is messy, the Don'ts list captures the messiness — the spec describes what the brand *is*, not what it *should* be.
- **Don't skip the indexing phase.** A DESIGN.md written without first reading the repo is provably wrong. Read first; write second.
- **Don't gate on completeness.** A focused, evidence-driven spec covering the canonical 80% beats an exhaustive spec full of speculation. Use `## Known Gaps` for anything you couldn't ground in evidence.
