# Portfolio Project

This is a modern portfolio website built with SolidJS and SolidStart, featuring a dark/light theme system, dynamic blog content, and creative terminal UI components.

## Tech Stack

- **Framework**: SolidJS with SolidStart (SSR/SSG)
- **Runtime**: Bun (package manager and runtime)
- **Styling**: TailwindCSS with custom animations and dark mode
- **Routing**: File-based routing with SolidJS Router
- **Build Tool**: Vinxi (Vite-based)
- **Deployment**: Vercel (configured preset)
- **Type Safety**: TypeScript
- **Content**: Markdown with DOMPurify sanitization

## Key Features

- 🌓 **Dark/Light Theme**: Persistent theme switching with localStorage
- 📱 **Responsive Design**: Mobile-first approach with TailwindCSS
- 🎨 **Custom Components**: Modular component architecture
- 🔍 **SEO Optimized**: Meta tags and proper routing
- 🖥️ **Terminal UI**: Interactive terminal window components with commands
- 🎭 **Animations**: TailwindCSS animations and transitions
- 📝 **Blog System**: Markdown-based blog with secure rendering
- 🛡️ **Security**: XSS protection with DOMPurify sanitization

## Project Structure

```bash
src/
├── routes/           # File-based routing
│   ├── index.tsx     # Home page
│   ├── blog/         # Blog section
│   │   ├── index.tsx # Blog listing page
│   │   └── [slug].tsx # Individual blog posts
│   └── [...404].tsx  # 404 handler with terminal UI
├── components/       # Reusable components
│   ├── blog/         # Blog-specific components
│   │   ├── card.tsx  # Blog post cards
│   │   ├── grid.tsx  # Blog post grid layout
│   │   └── header.tsx # Blog post headers
│   ├── core/         # Base UI components
│   ├── markdown/     # Markdown rendering
│   │   └── renderer.tsx # Secure markdown renderer
│   ├── sections/     # Page sections
│   ├── terminal/     # Terminal UI components
│   │   ├── window.tsx # Draggable terminal window
│   │   └── error.tsx  # Interactive terminal errors
│   └── home/         # Home page components
├── context/          # SolidJS context providers
├── utils/            # Utility functions
│   └── blog.ts       # Blog post metadata and utilities
└── constants/        # App constants
```

## Routes

- `/` - Home page with portfolio showcase
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog posts

## Development Commands

```bash
# Development server
bun dev

# Build for production
bun build

# Start production server
bun start

# Run tests
bun test

# Linting
bun lint
bun lint:fix
```

## Component Architecture

### Core Components

- **Nav**: Main navigation with smooth transitions
- **ThemeButton**: Dark/light mode toggle
- **LazyImage**: Optimized image loading
- **Loading**: Loading states

### Blog Components

- **BlogCard**: Individual blog post cards with metadata
- **BlogGrid**: Responsive grid layout for blog posts
- **BlogPostHeader**: Blog post title, date, and tags display
- **MarkdownRenderer**: Secure markdown rendering with DOMPurify

### Terminal Components

- **TerminalWindow**: Draggable, resizable terminal UI with viewport centering
- **TerminalError**: Interactive terminal with commands (cd .., clear, help)

### Section Components

- **HomeSection**: Landing section
- **AboutSection**: About information with enhanced bio
- **ProjectsSection**: Portfolio projects
- **CasesSection**: Case studies
- **ContactSection**: Contact information

## Theme System

The app uses a context-based theme system with:

- Persistent storage in localStorage
- CSS class-based dark mode (`dark:` prefixes)
- Smooth transitions between themes
- System preference detection

## Styling

- **TailwindCSS**: Primary styling framework
- **Custom colors**: Corvu design system integration
- **Typography plugin**: Enhanced text styling
- **Animations**: Custom cursor and pulse animations
- **Dark mode**: Class-based implementation

## Dependencies

### Core

- `solid-js`: Reactive UI library
- `@solidjs/start`: Full-stack SolidJS framework
- `@solidjs/router`: Client-side routing
- `@solidjs/meta`: SEO and meta tags

### UI Libraries

- `@corvu/dialog`: Modal/dialog components
- `@corvu/tailwind`: Corvu design system integration
- `solid-icons`: Icon library

### Content & Security

- `marked`: Markdown parsing and rendering
- `dompurify`: XSS protection for HTML sanitization
- `@types/dompurify`: TypeScript definitions for DOMPurify

### Development

- `typescript`: Type safety
- `eslint`: Code linting with SolidJS plugin
- `vitest`: Testing framework
- `@solidjs/testing-library`: SolidJS testing utilities

### Build & Deployment

- `vinxi`: Build tool and dev server
- Vercel preset for deployment
- Node.js 18+ requirement

## Configuration

### ESLint

- TypeScript and SolidJS plugins
- Custom rules for component patterns
- Disabled overly strict rules where appropriate

### TailwindCSS

- Dark mode support
- Custom color palette
- Typography and animation plugins
- Corvu design system integration

### Build

- Vite 5.4.10 pinned for stability
- SSR/SSG with Vinxi
- Vercel deployment optimization

## Blog System

The blog uses a hybrid approach combining hardcoded metadata with dynamic content fetching:

- **Metadata Management**: Blog post metadata (title, date, tags, etc.) stored in `src/utils/blog.ts`
- **Content Fetching**: Markdown files stored in `/public/blog/posts/` and fetched at runtime
- **Secure Rendering**: All markdown content sanitized with DOMPurify to prevent XSS attacks
- **Creative Error Handling**: 404 and error pages use interactive terminal UI instead of generic error messages
- **Responsive Design**: Blog components adapt to mobile, tablet, and desktop layouts

### Current Blog Features:
- ✅ **Secure markdown rendering** with DOMPurify sanitization
- ✅ **Responsive blog cards** with hover animations
- ✅ **Creative terminal error handling** with interactive commands
- ✅ **SEO-friendly** with proper meta tags and semantic HTML
- ✅ **Loading states** and error boundaries for graceful UX

### Planned Enhancements:
- 🚧 **MDX support** for rich interactive content
- 🚧 **Static site generation** for improved performance and SEO
- 🚧 **Advanced features** like search, tags filtering, and reading time
- 🚧 **Performance optimizations** including caching and lazy loading

## Key Patterns

1. **Context Providers**: Theme and global state management
2. **Resource Loading**: SolidJS createResource for async data fetching
3. **Error Boundaries**: Graceful error handling with creative UX
4. **File-based Routing**: Automatic route generation with dynamic parameters
5. **Component Composition**: Modular, reusable components with clear separation of concerns
6. **Security First**: All user content sanitized to prevent XSS vulnerabilities
7. **Hydration Safe**: Client-side only rendering for complex components to prevent hydration mismatches

## Environment

- **Package Manager**: Bun (not npm/yarn)
- **Runtime**: Node.js 18+
- **Build Target**: Modern browsers with ES modules
- **Deployment**: Vercel with SSG prerendering
