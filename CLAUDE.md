# Portfolio Project

This is a modern portfolio website built with SolidJS and SolidStart, featuring a dark/light theme system and dynamic content.

## Tech Stack

- **Framework**: SolidJS with SolidStart (SSR/SSG)
- **Runtime**: Bun (package manager and runtime)
- **Styling**: TailwindCSS with custom animations and dark mode
- **Routing**: File-based routing with SolidJS Router
- **Build Tool**: Vinxi (Vite-based)
- **Deployment**: Vercel (configured preset)
- **Type Safety**: TypeScript

## Key Features

- 🌓 **Dark/Light Theme**: Persistent theme switching with localStorage
- 📱 **Responsive Design**: Mobile-first approach with TailwindCSS
- 🎨 **Custom Components**: Modular component architecture
- 🔍 **SEO Optimized**: Meta tags and proper routing
- 🖥️ **Terminal UI**: Custom terminal window components
- 🎭 **Animations**: TailwindCSS animations and transitions

## Project Structure

```bash
src/
├── routes/           # File-based routing
│   ├── index.tsx     # Home page
│   ├── blog/         # Blog section
│   └── [...404].tsx  # 404 handler
├── components/       # Reusable components
│   ├── core/         # Base UI components
│   ├── sections/     # Page sections
│   ├── terminal/     # Terminal UI components
│   └── home/         # Home page components
├── context/          # SolidJS context providers
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

### Terminal Components

- **TerminalWindow**: Draggable, resizable terminal UI
- **TerminalError**: Error display in terminal style

### Section Components

- **HomeSection**: Landing section
- **AboutSection**: About information
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

- `@kobalte/core`: Headless UI components
- `@corvu/dialog`: Modal/dialog components
- `solid-icons`: Icon library

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

## Key Patterns

1. **Context Providers**: Theme and global state management
2. **Resource Loading**: SolidJS createResource for async data
3. **Error Boundaries**: Graceful error handling
4. **File-based Routing**: Automatic route generation
5. **Component Composition**: Modular, reusable components

## Environment

- **Package Manager**: Bun (not npm/yarn)
- **Runtime**: Node.js 18+
- **Build Target**: Modern browsers with ES modules
- **Deployment**: Vercel with SSG prerendering
