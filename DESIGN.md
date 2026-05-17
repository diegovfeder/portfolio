---
version: alpha
name: DVF Mono Editorial
description: A personal-portfolio brand for Diego Feder built on stark black/white canvases and a monospace voice. The identity reads like a developer's terminal made editorial — pure `#ffffff` (or `#000000` in dark mode) under near-black ink, with monospace carrying every heading, navigation label, CTA, badge, and accent. The single brand voltage is the underline accent — a short `border-b-8` rule beneath every section title (`border-slate-700` / `border-slate-300`) — paired with a quiet `text-blue-600` / `text-blue-400` link colour reserved for inline links and active syntax. Decoration is minimal: no gradients, no glass, no atmospheric washes. Cards sit on a flat canvas with `border-2` hairlines and a generous `rounded-lg` corner; pills are reserved for buttons and tags. The signature visual is the vertical, `-rotate-90` monospace nav rail down the left edge plus the macOS-style terminal window used for the 404 and embedded surfaces.

colors:
  primary: "#000000"
  primary-soft: "#111827"
  on-primary: "#ffffff"
  canvas: "#ffffff"
  canvas-dark: "#000000"
  ink: "#000000"
  ink-dark: "#ffffff"
  body: "#334155"
  body-strong: "#0f172a"
  body-dark: "#cbd5e1"
  body-dark-strong: "#f1f5f9"
  muted: "#64748b"
  muted-dark: "#94a3b8"
  hairline: "#e5e7eb"
  hairline-strong: "#111827"
  hairline-dark: "#374151"
  hairline-dark-strong: "#ffffff"
  surface-soft: "#f3f4f6"
  surface-soft-dark: "#1f2937"
  surface-card: "#ffffff"
  surface-card-dark: "#000000"
  surface-terminal-header: "#f3f4f6"
  surface-terminal-header-dark: "#1f2937"
  accent-link: "#2563eb"
  accent-link-dark: "#60a5fa"
  accent-link-strong: "#1d4ed8"
  accent-rule: "#334155"
  accent-rule-dark: "#cbd5e1"
  syntax-keyword: "#9333ea"
  syntax-keyword-dark: "#c084fc"
  syntax-variable: "#2563eb"
  syntax-variable-dark: "#60a5fa"
  syntax-string: "#22c55e"
  syntax-string-dark: "#4ade80"
  syntax-punctuation: "#6b7280"
  semantic-error: "#ef4444"
  semantic-success: "#22c55e"
  semantic-warning: "#eab308"
  traffic-close: "#ef4444"
  traffic-min: "#eab308"
  traffic-max: "#22c55e"
  focus-ring: "#94a3b8"
  corvu-bg: "#f3f1fe"
  corvu-100: "#e6e2fd"
  corvu-200: "#d4cbfb"
  corvu-300: "#bcacf6"
  corvu-400: "#a888f1"
  scrollbar-track: "#aaaaaa"
  scrollbar-thumb: "#000000"
  scrollbar-thumb-hover: "#555555"

typography:
  display-xl:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0
  display-lg:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0
  display-md:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  title-lg:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0
  title-md:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: 0
  body-lg:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-md:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-thin:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: 0
  caption:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  mono-meta:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  mono-tag:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  mono-nav:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0
  mono-button:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  none: 0px
  sm: 2px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px

spacing:
  px: 1px
  xxs: 4px
  xs: 8px
  sm: 12px
  base: 16px
  md: 24px
  lg: 32px
  xl: 48px
  xxl: 64px
  section: 96px
  nav-rail-mobile: 56px
  nav-rail-desktop: 80px

breakpoints:
  xs: 450px
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px

motion:
  hover-duration: 500ms
  hover-scale: 1.05
  base-duration: 300ms
  cursor-blink: 1s

components:
  page-canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  page-canvas-dark:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.ink-dark}"

  nav-rail:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-nav}"
    width: "{spacing.nav-rail-desktop}"
  nav-rail-link:
    textColor: "{colors.ink}"
    typography: "{typography.mono-nav}"
  nav-rail-link-active:
    textColor: "{colors.ink}"
    typography: "{typography.mono-nav}"

  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    padding: 32px 16px
  footer-stamp:
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
  footer-stamp-accent:
    textColor: "{colors.accent-link}"
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.mono-button}"
  footer-link-active:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.mono-button}"

  theme-toggle:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-button}"
    rounded: "{rounded.full}"
    padding: 8px 16px

  section-heading:
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
  section-rule:
    backgroundColor: "{colors.accent-rule}"
    height: 8px
    width: 56px

  button-primary-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-button}"
    rounded: "{rounded.full}"
    padding: 12px 20px
  button-primary-pill-dark:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.full}"

  button-text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  button-text-link-rule:
    backgroundColor: "{colors.accent-rule}"
    height: 4px
    width: 24px

  tag-mono:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.body}"
    typography: "{typography.mono-tag}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  tag-outlined:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.mono-tag}"
    rounded: "{rounded.full}"
    padding: 6px 16px

  card-base:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-base-hover:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"

  blog-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  blog-card-meta:
    textColor: "{colors.muted}"
    typography: "{typography.mono-meta}"
  blog-card-title-hover:
    textColor: "{colors.accent-link}"
    typography: "{typography.title-md}"

  blog-header-title:
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
  blog-header-accent-dot:
    textColor: "{colors.accent-link}"
    typography: "{typography.display-lg}"

  skill-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.lg}"
    padding: 24px

  list-block:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  list-block-rule:
    backgroundColor: "{colors.muted-dark}"
    width: 2px

  case-trigger:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
  case-image-frame:
    backgroundColor: "{colors.hairline}"
    rounded: "{rounded.none}"
    padding: 8px
  case-modal:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 24px

  terminal-window:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: 16px
  terminal-header:
    backgroundColor: "{colors.surface-terminal-header}"
    textColor: "{colors.muted}"
    typography: "{typography.mono-meta}"
    padding: 16px
  terminal-prompt:
    textColor: "{colors.semantic-success}"
    typography: "{typography.code}"
  terminal-history:
    textColor: "{colors.muted-dark}"
    typography: "{typography.code}"
  terminal-error-line:
    textColor: "{colors.semantic-error}"
    typography: "{typography.code}"

  traffic-light-close:
    backgroundColor: "{colors.traffic-close}"
    rounded: "{rounded.full}"
    size: 16px
  traffic-light-min:
    backgroundColor: "{colors.traffic-min}"
    rounded: "{rounded.full}"
    size: 16px
  traffic-light-max:
    backgroundColor: "{colors.traffic-max}"
    rounded: "{rounded.full}"
    size: 16px

  avatar-portrait:
    backgroundColor: transparent
    rounded: "{rounded.full}"
    size: 192px

  prose-body:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
  prose-h1:
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
  prose-h2:
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
  prose-link:
    textColor: "{colors.accent-link}"
    typography: "{typography.body-md}"
  prose-strong:
    textColor: "{colors.accent-link}"
    typography: "{typography.body-md}"
  prose-code-inline:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.body-strong}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: 0 4px
  prose-code-block:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.body-strong}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: 16px

  focus-ring:
    textColor: "{colors.focus-ring}"

  dialog-overlay:
    backgroundColor: "rgba(0, 0, 0, 0.5)"
---

# DVF Mono Editorial Design System

## Overview

DVF Mono Editorial is the design language for the personal portfolio + blog at `diegofeder.com.br`. It reads like a developer's terminal made editorial: a flat black-and-white canvas, a monospace voice for every label, and a stripped-back interaction palette that never grows past `hover:scale-105 transition-all duration-500`.

The base canvas is **pure white** (`{colors.canvas}` — `#ffffff`) in light mode and **pure black** (`{colors.canvas-dark}` — `#000000`) in dark mode. Both modes use the inverse for ink. There is no off-white card layer, no atmospheric gradient, no glass morphism, no backdrop blur (except as a Corvu dialog overlay primitive). Depth comes from `border-2` hairlines and a short underline accent — never from shadow stacks.

Type uses the **system monospace stack** for everything chrome-y — nav, CTAs, badges, blog/post titles, dates, code surfaces, terminal windows — and the **system sans stack** only for long-form prose (the "about me" bio, the case-study description, blog body copy). No custom typeface is loaded; the brand trusts the platform's monospace to carry the voice.

The single brand voltage is **the underline accent rule** — a short `border-b-8 w-14` (or `w-16`) bar that lives directly beneath every section heading and a slimmer `border-b-4 w-6` variant beneath every "view project" / "view website" text link. The other accent is a quiet `{colors.accent-link}` (`#2563eb`) reserved for inline links, blog-card hover titles, and the trailing `.` punctuation on display headings (`blog_posts.`, `brag_document.`).

**Key Characteristics:**

- Pure black-or-white page canvas; no atmospheric backdrop in any production route.
- Monospace as the brand voice — every heading, button, badge, route label, and the entire vertical nav rail.
- The vertical, `-rotate-90` mono nav rail down the left edge is the page chrome on the home route.
- A flat, content-width **footer row** carries cross-route navigation: `dvf.` brand stamp on the left, mono outline links (`blog.`, `chat.`, `brag.`) on the right. No floating pill stacks anywhere.
- `border-2` (never `border` 1px) is the canonical card outline.
- `rounded-lg` (8px) is the canonical card corner; pills (`rounded-full`) are reserved for buttons, badges, and tags.
- Universal hover signature: `hover:scale-105 transition-all duration-500`.
- The macOS-style terminal window — red/yellow/green traffic lights + monospace prompt — is reused for the 404 page and any embedded terminal surface.
- Code-syntax styling (purple keyword, blue variable, green string, gray punctuation) only on the **blog header tagline** — not on actual code blocks, which stay neutral gray.

## Colors

The palette is rooted in pure black and pure white with slate/gray hairlines and a single blue link accent. Multi-colour accent chips (emerald, amber, sky) are not part of this system.

### Brand & Accent

- **Ink** (`{colors.ink}` — `#000000`): The brand's only display colour in light mode.
- **Ink Dark** (`{colors.ink-dark}` — `#ffffff`): Direct inverse for dark mode.
- **Accent Link** (`{colors.accent-link}` — `#2563eb`) / **Accent Link Dark** (`{colors.accent-link-dark}` — `#60a5fa`): The quiet blue used for inline `<a>` tags, blog-card hover titles, the trailing `.` punctuation on display headings, and the `prose-strong` emphasis in rendered markdown. Never used on a CTA fill.
- **Accent Link Strong** (`{colors.accent-link-strong}` — `#1d4ed8`): The legacy `blue-700` accent that currently appears only on the brag route's residual mono labels. **Slated for removal** during the brag redesign.
- **Accent Rule** (`{colors.accent-rule}` — `#334155`) / **Accent Rule Dark** (`{colors.accent-rule-dark}` — `#cbd5e1`): The slate fill used for the signature `border-b-8` section underline and `border-b-4` link rule beneath text CTAs.

### Surface

- **Canvas** (`{colors.canvas}` — `#ffffff`) / **Canvas Dark** (`{colors.canvas-dark}` — `#000000`): The page floor. There is no off-white "soft" canvas tier.
- **Surface Card** (`{colors.surface-card}` — `#ffffff`) / **Surface Card Dark** (`{colors.surface-card-dark}` — `#000000`): Card background matches canvas. Differentiation comes from the hairline border, not a fill change.
- **Surface Soft** (`{colors.surface-soft}` — `#f3f4f6`) / **Surface Soft Dark** (`{colors.surface-soft-dark}` — `#1f2937`): The single muted fill — used by tag chips, the markdown inline-code background, and the case-study image frame.
- **Surface Terminal Header** (`{colors.surface-terminal-header}` — `#f3f4f6`) / **Dark** (`{colors.surface-terminal-header-dark}` — `#1f2937`): The terminal-window chrome bar that holds the traffic-light buttons.

### Hairlines

- **Hairline** (`{colors.hairline}` — `#e5e7eb`) / **Hairline Dark** (`{colors.hairline-dark}` — `#374151`): Default `border-2 border-gray-200` / `border-gray-700` outline on blog cards and the terminal window.
- **Hairline Strong** (`{colors.hairline-strong}` — `#111827`) / **Hairline Dark Strong** (`{colors.hairline-dark-strong}` — `#ffffff`): The high-contrast `border-2 border-gray-900` / `border-white` used on the primary pill CTA and the floating-pill nav.

### Text

- **Body** (`{colors.body}` — `#334155`) / **Body Dark** (`{colors.body-dark}` — `#cbd5e1`): Default long-form prose colour — the slate-700 / slate-300 pair.
- **Body Strong** (`{colors.body-strong}` — `#0f172a`): Reserved for body emphasis where ink would be too heavy.
- **Muted** (`{colors.muted}` — `#64748b`) / **Muted Dark** (`{colors.muted-dark}` — `#94a3b8`): The slate-500 / slate-400 used for dates, reading time, and the terminal command history.

### Syntax (Blog Header Only)

- **Syntax Keyword** (`{colors.syntax-keyword}` — `#9333ea`) / **Dark** (`{colors.syntax-keyword-dark}` — `#c084fc`): `const`.
- **Syntax Variable** (`{colors.syntax-variable}` — `#2563eb`) / **Dark** (`{colors.syntax-variable-dark}` — `#60a5fa`): the identifier (`thoughts`).
- **Syntax String** (`{colors.syntax-string}` — `#22c55e`) / **Dark** (`{colors.syntax-string-dark}` — `#4ade80`): `'code'`, `'tech'`, `'life'`.
- **Syntax Punctuation** (`{colors.syntax-punctuation}` — `#6b7280`): `=`, `[`, `]`, `,`.

> Scope note: these tokens render the **blog header tagline only**. Live code blocks use the neutral `prose-code` styling — no rainbow syntax.

### Terminal & Semantic

- **Traffic Close / Min / Max** (`{colors.traffic-close}` `#ef4444` · `{colors.traffic-min}` `#eab308` · `{colors.traffic-max}` `#22c55e`): The macOS-style window buttons on the terminal header.
- **Semantic Error** (`{colors.semantic-error}` — `#ef4444`): Markdown renderer error state, terminal error line.
- **Semantic Success** (`{colors.semantic-success}` — `#22c55e`): Terminal prompt arrow and input caret.
- **Semantic Warning** (`{colors.semantic-warning}` — `#eab308`): Reserved; currently unused outside the terminal traffic-light.

### Reserved / Corvu

- **Corvu palette** (`{colors.corvu-bg}` through `{colors.corvu-400}`): The Corvu design system's lavender palette. Defined in `tailwind.config.cjs` and reserved for future Corvu dialog accents; not currently applied to portfolio surfaces.

### Focus

- **Focus Ring** (`{colors.focus-ring}` — `#94a3b8`): The `focus:ring-2 focus:ring-slate-400` colour exposed via the global `.focus-ring` utility class.

## Typography

### Font Family

The system uses the platform's **system monospace stack** as the brand voice (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`) and the platform's **system sans stack** only for long-form prose (`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`). No web font is loaded — the brand trusts the host platform's monospace.

### Hierarchy

| Token | Family | Size | Weight | Line Height | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | mono | 48px | 700 | 1.1 | Long-form route h1 (blog post detail, future redesign) |
| `{typography.display-lg}` | mono | 36px | 700 | 1.15 | `blog_posts.`, `brag_document.`, home heading |
| `{typography.display-md}` | mono | 30px | 700 | 1.2 | Prose `<h1>` inside `MarkdownRenderer` |
| `{typography.title-lg}` | sans | 24px | 700 | 1.25 | Case-study title, project h2 on desktop |
| `{typography.title-md}` | sans | 20px | 700 | 1.4 | Every `<h2>` section heading on the home route, blog-card title, prose `<h2>` |
| `{typography.title-sm}` | sans | 18px | 700 | 1.4 | Skill card title, project subtitle, list-block title |
| `{typography.body-lg}` | sans | 18px | 400 | 1.6 | Bio/about prose, case-modal subtitle |
| `{typography.body-md}` | sans | 16px | 400 | 1.6 | Default body text |
| `{typography.body-sm}` | sans | 14px | 400 | 1.5 | List-block items, project description on mobile |
| `{typography.body-thin}` | sans | 18px | 300 | 1.6 | Project description on desktop (`font-thin` slate variant) |
| `{typography.caption}` | sans | 12px | 400 | 1.4 | Image captions, dialog metadata |
| `{typography.mono-meta}` | mono | 14px | 400 | 1.5 | Blog-card date, reading-time, dialog metadata |
| `{typography.mono-tag}` | mono | 12px | 700 | 1.2 | Tag chips on project + blog cards |
| `{typography.mono-nav}` | mono | 16px | 400 | 1 | Vertical nav rail rotated labels |
| `{typography.mono-button}` | mono | 14px | 400 | 1 | Pill CTAs, theme toggle, floating nav pills |
| `{typography.code}` | mono | 14px | 400 | 1.5 | `MarkdownRenderer` `<pre>`/`<code>`, terminal content |

### Principles

- **Monospace is the voice.** Every label that reads like an *identifier* — route names, button copy, dates, badges, headings ending in `.` or `_` — runs in monospace at weight 400 or 700. Departures (a bare `Headline` with no terminal flourish) read as off-brand.
- **The trailing `.` is the brand seal.** `blog_posts.`, `brag_document.`, `dvf.`, `home.`, `dark mode.` — every primary label closes with a period, often tinted `{colors.accent-link}`.
- **Section headings are short and stacked on a rule.** `text-xl font-bold` heading, then a `border-b-8 w-14` (or `w-16`) bar directly under it. No tagline overline, no uppercase tracking.
- **Sans is for prose, not for chrome.** The about bio and project descriptions read in `font-sans` at 16–18px / weight 300–400. Headings inside those prose blocks return to mono (`prose-h1:font-mono prose-h2:font-mono`).
- **No uppercase tracking accents.** The brag route's `tracking-[0.22em] uppercase` overlines are out of system — section position and the underline rule do the work instead.

## Layout

### Spacing System

- **Base unit:** 4px (Tailwind default scale).
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.base}` 16px · `{spacing.md}` 24px · `{spacing.lg}` 32px · `{spacing.xl}` 48px · `{spacing.xxl}` 64px · `{spacing.section}` 96px.
- **Section rhythm:** Sections on the home route stack with `pt-4` to `pt-12` and pad `pr-8` to leave room for the left nav rail. Long-form routes (`/blog`, `/brag`) use `py-16` to `py-20` for outer section padding.

### Grid & Container

- **Home route:** A single column anchored to the left nav rail with `pl-16 sm:pl-20` to clear the fixed rail. Skill grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. Strengths-and-growth list grid `grid-cols-1 lg:grid-cols-3`. Project grid `grid-cols-1 lg:grid-cols-2`.
- **Blog:** `max-w-7xl` outer with the fixed `BlogHeader` strip pinned to the top.
- **Long-form prose:** `max-w-none` inside `prose` — the article surface is sized by its parent container, not by a measure cap.
- **Cases:** A horizontally snap-scrolling row (`snap-x snap-mandatory overflow-x-scroll`) with min-width tiles from 200px (mobile) to 480px (lg).

### Nav Rail

The left-edge vertical nav is a **fixed `w-14` (56px) on mobile, `w-20` (80px) on desktop**, padded with `pl-8 sm:pl-10` and laid out `flex-col justify-around` so the rotated mono links distribute evenly down the full viewport height. It is only rendered on the home route — dedicated routes (`/blog`, `/chat`, `/brag`) hide it.

### Whitespace Philosophy

Pages run tight at the top of sections and breathe between them. Cards inside grids sit at 16–24px gap. The home hero is full-viewport-height (`h-screen`) and centres a single monospace headline (`software engineer_`).

## Elevation & Depth

The system is **flat by intent**. Depth is signalled by hairline borders and underline rules, not shadow stacks.

| Level | Treatment | Use |
|---|---|---|
| Flat (canvas) | `{colors.canvas}` / `{colors.canvas-dark}` | All page sections, all card backgrounds |
| Hairline outline | `border-2` in `{colors.hairline}` / `{colors.hairline-dark}` | Blog cards, terminal window, project tags |
| Strong outline | `border-2` in `{colors.hairline-strong}` / `{colors.hairline-dark-strong}` | Primary pill CTA, theme toggle |
| Soft shadow | `shadow-md` | Skill cards, dialog-image triggers |
| Window shadow | `shadow-lg` | The terminal window |
| Modal shadow | `shadow-2xl` | The Corvu case-study dialog content |
| Atmospheric blur | `backdrop-blur-sm` over `bg-black/50` | **Only** as a Corvu dialog overlay — never on a content surface |

### Decorative Depth

- **The section underline rule** (`border-b-8 w-14`/`w-16`) is the brand's only intentional depth signal beneath a heading.
- **The short link rule** (`border-b-4 w-6`) repeats the same gesture under "view project" / "view website" text CTAs.
- **No radial gradients.** No `bg-[radial-gradient(...)]` washes are part of this system.
- **No `bg-white/N`, `bg-black/N` translucent fills** on content surfaces.
- **No glow shadows** (e.g. `shadow-[0_30px_120px_rgba(...)]`).

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Case-study image frame, project image inner |
| `{rounded.sm}` | 2px | Project image overlay |
| `{rounded.md}` | 6px | Inline code background |
| `{rounded.lg}` | 8px | Cards, terminal window, code block, prose code block |
| `{rounded.xl}` | 12px | Corvu case dialog content only |
| `{rounded.full}` | 9999px | Pill CTAs, tags, badges, theme toggle, traffic-light buttons, avatar portrait |

`{rounded.lg}` is the canonical card corner. The brag route's `rounded-[2rem]` and `rounded-2xl` are **out of system** — slated for normalisation to `{rounded.lg}` during the redesign.

## Components

### Page Canvas

**`page-canvas`** — `main` wrapper. Background `{colors.canvas}`, text `{colors.ink}`. Dark variant `{components.page-canvas-dark}` swaps both. `overflow-x-hidden` to absorb the rotated nav rail.

### Navigation

**`nav-rail`** — Fixed left edge, height 100vh, `w-14 sm:w-20`, mono link family `{typography.mono-nav}`. Each link is rotated `-90deg` via `transform -rotate-90 origin-left`, `w-fit`, hover `hover:underline hover:scale-105 transition-all duration-500`. Active hash adds `font-bold underline`. Rendered only on the home route — hidden on `/blog`, `/chat`, `/brag`.

**`nav-rail-link`** — Each rotated mono entry: `home`, `cases`, `projects`, `about me`, `contact`. No trailing dot in the rail.

**`footer`** — Global site footer rendered below `<main>` on every route. `border-t border-gray-200 dark:border-gray-800 mt-16 py-8`. Inner container `max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-6`. On the home route, the footer adds `pl-16 sm:pl-20` to clear the fixed vertical nav rail.

**`footer-stamp`** — The `dvf.` brand stamp on the left of the footer. `font-mono text-3xl font-semibold focus-pulse`, links to `/`. The trailing `.` is tinted `{colors.accent-link}` / `{colors.accent-link-dark}`.

**`footer-link`** — Mono outline route links on the right of the footer (`blog.`, `chat.`, `brag.`). `font-mono text-sm transition-all duration-500 hover:scale-105 hover:underline`. Active route adds `font-bold underline`.

**`theme-toggle`** — Fixed `bottom-16 -right-6`, rotated `-rotate-90`, same `rounded-full border-2` body, mono copy `light mode.` / `dark mode.`.

### Headings

**`section-heading`** — `text-xl font-bold` heading, optionally `whitespace-nowrap`. Directly followed by `{components.section-rule}`.

**`section-rule`** — `<div class="border-slate-700 dark:border-slate-300 border-b-8 w-14">` (or `w-16`). The brand's signature underline. No more than one rule per heading; never on `<h3>` or deeper.

### Buttons

**`button-primary-pill`** — Pill text CTA. `rounded-full border-2 border-gray-900 dark:border-white px-5 py-3`, mono `{typography.mono-button}`, hover `hover:scale-105 transition-all duration-500`. Trailing `.` in label (`brag_document.`, `latest_year = '2026'`).

**`button-text-link`** — Inline link with a tiny rule beneath. Example: `view project` followed by `<div class="border-slate-700 dark:border-slate-300 border-b-4 w-6" />`. Hover `hover:font-bold hover:scale-105`.

### Badges & Tags

**`tag-mono`** — Soft-fill chip. Background `{colors.surface-soft}`, text `{colors.body}`, mono `{typography.mono-tag}`, `rounded-full px-3 py-1`. Used on blog cards.

**`tag-outlined`** — Outlined chip. `border px-4 py-2 rounded-full`, mono `{typography.mono-tag}`. Used on project + case cards.

### Cards

**`blog-card`** — `border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-black`, hover `hover:border-blue-500 dark:hover:border-blue-400`. Title at `{typography.title-md}`, hover-tints to `{colors.accent-link}`. Date in `{typography.mono-meta}` and `{colors.muted}`. Tags use `{components.tag-mono}`. A `read_more →` line at the bottom appears on hover. The whole card has an absolute `<A>` overlay for navigation.

**`skill-card`** — Centred icon-title-description card, `rounded-lg shadow-md p-4`. The only home-route surface that uses a shadow.

**`list-block`** — Strength/growth/versatility lists in the about section. Two-column row: a `border-2 border-slate-300` 2px vertical rule on the left + the `title-sm` heading and `body-sm` items on the right.

**`case-trigger`** — A horizontal-scroll snap tile. `min-w-[200px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[480px]`, plain `bg-white dark:bg-black`, with the image cradled in a `{colors.hairline}` frame at `padding: 8px` and **no corner rounding**.

**`case-modal`** — Corvu dialog content. `rounded-xl bg-white dark:bg-gray-800 shadow-2xl max-w-4xl p-4 md:p-6 max-h-[90vh] overflow-y-auto`. The dialog overlay is `bg-black/50 backdrop-blur-sm` (the system's only `backdrop-blur` use).

### Terminal Window

**`terminal-window`** — Draggable floating panel. `rounded-lg border bg-white dark:bg-black shadow-lg`, defaulted 800×120, viewport-clamped, repositioned by `requestAnimationFrame`. Hosts the 404 view and any embedded prompt.

**`terminal-header`** — 16px header bar with `bg-gray-100 dark:bg-gray-800 border-b`. Holds the three traffic-light buttons + a mono `{typography.mono-meta}` title and a `cursor-move` grab affordance.

**`traffic-light-close` / `traffic-light-min` / `traffic-light-max`** — 16px circles in red-500 / yellow-500 / green-500 with hover-darkened variants. The arrangement (red → yellow → green, left to right) is intentional macOS dialect.

**`terminal-prompt`** — `➜ ` in `{colors.semantic-success}` plus an input that reads `text-green-500 bg-transparent border-none outline-none font-mono`.

**`terminal-history`** — Past command lines in `{colors.muted-dark}`.

**`terminal-error-line`** — `text-red-500` for thrown errors at the top of the panel.

### Prose / MarkdownRenderer

**`prose-body`** — The `<article>` wrapper uses Tailwind's `prose dark:prose-invert max-w-none`. The renderer overrides `prose-h1:font-mono prose-h1:text-2xl prose-h2:font-mono prose-h2:text-xl`. Body text inherits `{colors.body}` / `{colors.body-dark}`.

**`prose-link`** — `text-blue-600 dark:text-blue-400 no-underline hover:underline`.

**`prose-strong`** — `text-blue-600 dark:text-blue-400`. Strong text inherits the accent-link colour rather than a heavier weight.

**`prose-code-inline`** — `font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded`.

**`prose-code-block`** — `bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700`. Neutral, not syntax-tinted.

**Custom list rendering** — Ordered lists drop their default counters and inject `prose-ol>li:before:content-[counter(list-item)'.']` with a `{colors.muted}` numeral. Unordered lists drop bullets entirely.

### Forms (Currently Limited)

The portfolio has no form inputs beyond the terminal prompt and the chat composer. When forms appear, follow the terminal-prompt dialect (transparent background, `border-none outline-none focus:ring`) rather than a card-bordered input.

### Focus Utilities

Defined globally in `src/app.css`:

- `.focus-ring` — `focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-transparent focus:outline-none`. Default focus treatment for links and buttons.
- `.focus-pulse` — `focus:animate-pulse`. Used on `dvf.` and case triggers to give a soft heartbeat on tab focus.
- `.focus-scale` — `focus:scale-105`. Used on the projects toggle.
- `.focus-bold-and-underline` — `focus:font-bold focus:underline`. Used on the rotated nav-rail links.

### Custom Scrollbar

10px wide. Track `{colors.scrollbar-track}` (`#aaaaaa`), thumb `{colors.scrollbar-thumb}` (`#000000`), hover `{colors.scrollbar-thumb-hover}` (`#555555`). Defined globally and not theme-aware.

## Motion

- **Universal interactive transition:** `transition-all duration-500` with `hover:scale-105`. This applies to every primary pill CTA, every "view project" / "view website" link, theme toggle, floating-pill nav, and rotated nav-rail link. Departures break brand.
- **Card hover:** Blog cards transition `border-color` over 300ms, the title transitions colour over 300ms, and the `read_more →` row fades in via `opacity-0 group-hover:opacity-100`.
- **Image hover:** Project and case images use `hover:animate-pulse` on a 300ms `transition-all`.
- **Cursor blink:** The terminal cursor uses the custom `animation: cursor-fast` (`1s step-start infinite`, opacity 1↔0). Defined in `tailwind.config.cjs`.
- **No translate-Y hover** (e.g. `hover:-translate-y-1`) and **no `scale-[1.02]`** — only `hover:scale-105`.

## Responsive Behavior

### Breakpoints

The project extends Tailwind's defaults with an `xs: 450px` breakpoint.

| Name | Width | Key Changes |
|---|---|---|
| Base | < 450px | Nav rail `w-14`; section headings stay `text-xl`; case tiles `min-w-[200px]` |
| xs | 450–640px | Blog header pads loosen (`pt-36` on the article) |
| sm | 640–768px | Nav rail expands to `w-20`; case tiles widen to `min-w-[280px]`; terminal allowed to resize |
| md | 768–1024px | Project grid still single-column; titles step to `md:text-2xl` |
| lg | 1024–1280px | Project grid goes 2-up; skill grid goes 4-up; case tile reaches `min-w-[480px]` |
| xl | > 1280px | Wider list-block padding; brag-route layouts may go 3-up |

### Touch Targets

- Pill CTAs land at `py-3 px-5` (~48px height) — above WCAG AA.
- Nav-rail rotated links are intentionally narrow but live in a large 56–80px hit lane.
- Theme toggle is `p-2 px-4` (40px touch height).

### Collapsing Strategy

- Nav rail only on the home route; cross-route navigation lives in the global `footer` everywhere.
- Project subtitle drops from `md:text-xl` to `text-lg` below `md`.
- Case-study modal uses `w-11/12 max-w-4xl` so it absorbs viewport width down to mobile.
- Terminal window recalculates width / height on every viewport resize when not actively being interacted with.

## Do's and Don'ts

### Do

- Do use **`{colors.canvas}` or `{colors.canvas-dark}`** as the page floor — never an off-white tier or a gradient.
- Do close primary labels with the **trailing `.` / `_` flourish** (`brag_document.`, `software engineer_`).
- Do underline every `<h2>` with the **`border-b-8 w-14`/`w-16` rule** in `{colors.accent-rule}` / `{colors.accent-rule-dark}`.
- Do reach for **`border-2`** on every card or button outline.
- Do use **`rounded-lg`** (8px) on cards and **`rounded-full`** on buttons, tags, and badges.
- Do apply **`hover:scale-105 transition-all duration-500`** to every interactive surface.
- Do route every label that reads as an identifier (URL, command, badge) into **monospace**.
- Do use **`{colors.accent-link}`** for inline links, blog-card hover titles, and the trailing accent dot — never as a CTA fill.
- Do prefer **hairlines + underline rules** over shadow stacks for hierarchy.
- Do treat the **terminal window** as the canonical pattern for any "command surface" — including future redesigns of the chat composer.

### Don't

- **Don't introduce atmospheric gradients** (e.g. `bg-[radial-gradient(...)]`). The brag route's tri-colour radial wash is out of system.
- **Don't use translucent surfaces** (`bg-white/90`, `bg-black/80`) or `backdrop-blur` on content cards. Backdrop blur is reserved for the Corvu dialog overlay only.
- **Don't round corners beyond `{rounded.xl}`** (12px). `rounded-2xl` and `rounded-[2rem]` are not part of this system.
- **Don't use `border` (1px)** on cards or buttons. The canonical weight is `border-2`.
- **Don't reach for multi-colour accent chips** (emerald, amber, sky). The accent vocabulary is slate + blue + the syntax palette (which is scoped to the blog header tagline).
- **Don't use `tracking-[0.18em] uppercase`** overlines above section headings. The underline rule replaces them.
- **Don't replace `hover:scale-105`** with `hover:-translate-y-1` or `hover:scale-[1.02]`.
- **Don't drop heavy display shadows** (`shadow-[0_30px_120px_...]`). Maximum elevation outside the dialog/terminal is `shadow-md`.
- **Don't load custom fonts.** The brand trusts the system mono and sans stacks.
- **Don't put the vertical nav rail on long-form routes** (`/blog`, `/chat`, `/brag`). Cross-route navigation lives in the global `footer`.
- **Don't reintroduce a fixed floating pill stack** in the top-right corner. Cross-route navigation belongs in the inline `footer`, not in the viewport chrome.

## Iteration Guide

1. Treat the home route, blog list, and 404 terminal as **the canonical surfaces**. When a new surface looks different, the new surface is wrong.
2. CTAs default to `{rounded.full}` (pill). Cards default to `{rounded.lg}` (8px). Modals are the only place `{rounded.xl}` (12px) is allowed.
3. When you add a heading, **add its underline rule in the same component**.
4. Add `font-mono` first; only step to `font-sans` when you're writing real prose.
5. Use `{token.refs}` in any new component spec — never inline hex.
6. When the brag route, blog/post detail, or any new route diverges from the table above, the divergence is a **bug**, not a variant.

## Known Gaps

- The brag route (`/brag`, `/brag/:year`) currently ships with out-of-system rounded corners, atmospheric gradients, glass surfaces, multi-colour accent chips, and uppercase tracking overlines. The first redesign anchored to this DESIGN.md is the brag normalisation.
- The chat route (`/chat`) does not yet have a fully documented composer pattern; treat the terminal-window primitive as the reference until that is captured here.
- Animation timings beyond `duration-500` are not tokenised. Most of the system uses two durations: 300ms for colour/opacity and 500ms for transform.
- The Corvu lavender palette (`corvu-bg` through `corvu-400`) is declared in Tailwind but has no portfolio surface today. Document its first use when it lands.
- Form input styling has no canonical card-bordered variant; only the transparent terminal-prompt dialect exists.

