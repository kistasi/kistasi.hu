# CLAUDE.md

Project guidance for Claude Code when working with this codebase.

## Commands

```bash
yarn dev    # Development server (Turbopack)
yarn build  # Production build
yarn lint   # ESLint
```

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript 5
- Tailwind CSS 4 (`@tailwindcss/postcss`)
- @react-pdf/renderer (PDF generation)
- TMDB API v3 (watchlog feature)

## Project Structure

```
app/
├── layout.tsx              # Root layout, metadata
├── page.tsx                # Homepage
├── resume/page.tsx         # Bilingual resume (EN/HU)
├── watchlog/
│   ├── page.tsx           # Random film display
│   └── all/page.tsx       # Film grid
├── api/
│   ├── resume/pdf/route.ts
│   └── watchlog/route.ts
├── components/
│   ├── ExperienceCard.tsx
│   └── ResumePDF.tsx
├── data/
│   ├── experiences.ts     # Work experience (bilingual)
│   └── watchedMovies.ts   # TMDB movie IDs
└── types/
    ├── experience.ts
    ├── language.ts
    └── tmdb.ts
```

Path alias: `@/*` maps to root directory

## Styling System

**Color Tokens (globals.css):**
```css
--color-primary: #ffffff
--color-background: #1a1d2e
--color-surface: #2c3144
```

**Design System:**

Typography (responsive - mobile first):
- H1: `text-4xl md:text-5xl font-bold text-primary`
- H2: `text-2xl md:text-3xl font-bold text-primary`
- H3: `text-lg md:text-xl font-bold text-primary`
- Body: `text-sm md:text-base text-primary`
- Small: `text-sm text-primary`

Spacing:
- Page: `p-8`
- Major sections: `space-y-12`
- Sections: `space-y-6`
- Tight: `space-y-3`
- Card: `p-6`
- Button: `px-6 py-3`
- Gap: `gap-4` (standard), `gap-6` (grid)

Containers:
- `max-w-md mx-auto` (homepage)
- `max-w-4xl mx-auto` (resume)
- `max-w-7xl mx-auto` (watchlog)

**iOS Safari:**
- `theme-color` meta set to `#1a1d2e`
- `viewport-fit=cover` for notch handling

## Code Patterns

### Component Structure

```typescript
// 1. Constants (style classes, static data)
const BUTTON = "px-6 py-3 border-2 border-primary transition-colors";

// 2. Interfaces
interface Link {
  title: string;
  url: string;
}

// 3. Component
export default function Component() {
  return <main className="p-8">...</main>;
}
```

### Rules

- Extract repeated classes to constants
- Follow the design system typography and spacing scales
- Use semantic HTML (`<header>`, `<main>`, `<footer>`, `<section>`)
- Unique keys (not array indices)
- Client components: `"use client"` directive
- NO emojis unless explicitly requested

## Bilingual Support

- English/Hungarian via `app/types/language.ts`
- Name order: "Márton Tasnádi" (EN), "Tasnádi Márton" (HU)
- Job title: "Software Developer" (EN), "Szoftverfejlesztő" (HU)
- Work experience uses `LocalizedContent` interface

## PDF Generation

- Uses `@react-pdf/renderer` with Roboto font
- Filenames: `marton-tasnadi-cv.pdf` (EN), `tasnadi-marton-cv.pdf` (HU)
- Route: `/api/resume/pdf?lang={en|hu}`
- Font registration required for Hungarian chars (ő, ű, etc.)

## Watchlog

- Data: Array of TMDB movie IDs in `app/data/watchedMovies.ts`
- API key: `.env.local` as `TMDB_API_KEY`
- Cache: 1 hour via Next.js `revalidate`
- Find IDs: `themoviedb.org/movie/{ID}`
- NO duplicates (causes React key warnings)

## Content Guidelines

- Branding: Use "kistasi" in headers (not "Márton Tasnádi")
- Bilingual: Always provide EN and HU versions
- Privacy: No analytics/tracking
