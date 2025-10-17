# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for kistasi (Márton Tasnádi) built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4. Features a homepage with links and a bilingual resume page with PDF export.

## Development Commands

This project uses **yarn** as the package manager.

```bash
# Start development server with Turbopack
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run ESLint
yarn lint
```

## Technology Stack

- **Framework**: Next.js 15.3.1 with App Router
- **React**: Version 19.0.0
- **TypeScript**: Version 5
- **Styling**: Tailwind CSS 4 with PostCSS plugin (`@tailwindcss/postcss`)
- **PDF Generation**: @react-pdf/renderer
- **Turbopack**: Enabled by default for faster development builds

## Architecture

### Project Structure

```
app/
├── layout.tsx              # Root layout with metadata and theme provider
├── page.tsx                # Homepage with organized link sections
├── resume/
│   └── page.tsx           # Bilingual resume page (EN/HU)
├── api/
│   └── resume/pdf/
│       └── route.ts       # PDF generation API endpoint
├── components/
│   ├── ExperienceCard.tsx # Work experience display
│   ├── ResumePDF.tsx      # PDF document component
│   ├── ThemeToggle.tsx    # Dark mode toggle
│   └── Providers.tsx      # Client-side theme provider wrapper
├── context/
│   └── ThemeContext.tsx   # Theme state management
├── data/
│   └── experiences.ts     # Work experience content (bilingual)
├── types/
│   ├── experience.ts      # TypeScript types for work experience
│   └── language.ts        # Language types and translations
├── globals.css            # Global styles with Tailwind and custom theme
├── sitemap.ts             # Auto-generated sitemap
└── robots.ts              # Auto-generated robots.txt
```

### Path Aliases

The project uses `@/*` path alias that maps to the root directory (configured in tsconfig.json).

### Styling System

**Tailwind CSS 4 Configuration:**
- Custom theme colors defined in `globals.css` using `@theme` directive
- Dark mode support via custom variant: `@variant dark (&:where(.dark, .dark *))`
- Semantic color tokens: `primary`, `background`, `surface` (with dark variants)
- Extract repeated classes to constants for maintainability

**Theme Colors:**
```css
--color-primary: #2c3144
--color-background: #f2f8fa
--color-surface: #ffffff
--color-primary-dark: #ffffff
--color-background-dark: #1a1d2e
--color-surface-dark: #2c3144
```

### Dark Mode

- Managed via React Context (`ThemeContext`)
- Persists to localStorage
- Detects system preference on first load
- Applied via `.dark` class on `<html>`

### Internationalization

**Bilingual Support (English & Hungarian):**
- Default language: English
- Language switching via buttons on resume page
- Name order follows cultural conventions:
  - English: "Márton Tasnádi"
  - Hungarian: "Tasnádi Márton"
- Job title translations:
  - English: "Software Developer"
  - Hungarian: "Szoftverfejlesztő"
- All translations stored in `app/types/language.ts`
- Work experience content uses `LocalizedContent` interface

### PDF Generation

- Uses `@react-pdf/renderer` with Roboto font (supports Hungarian characters)
- Filename format based on language:
  - English: `marton-tasnadi-cv.pdf`
  - Hungarian: `tasnadi-marton-cv.pdf`
- Font registration required for special characters (ő, ű, etc.)
- API route at `/api/resume/pdf?lang={en|hu}`

### SEO Implementation

**Metadata (app/layout.tsx):**
- Site title: "kistasi - Software Developer"
- Comprehensive meta tags (description, keywords, author)
- Open Graph tags for social sharing
- Twitter Card support
- Robots directives (index, follow)
- Canonical URLs

**Structured Data:**
- JSON-LD Person schema on homepage
- Links all social profiles via `sameAs`
- Includes job title, location, email

**Generated Files:**
- `sitemap.xml` - Auto-generated sitemap
- `robots.txt` - Auto-generated robots file
- No tracking/analytics (privacy-focused)

### TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- Module resolution: bundler
- JSX: preserve (handled by Next.js)

## Code Style & Best Practices

### Component Organization

1. **Extract CSS classes to constants** for reusability
2. **Use semantic HTML** (`<header>`, `<main>`, `<footer>`, `<section>`)
3. **Use unique keys** (e.g., `key={item.id}`) instead of array indices
4. **Define TypeScript interfaces** for data structures
5. **Move static data** to module-level constants

### Example Pattern

```typescript
// Constants at top
const BUTTON_BASE = "px-4 py-2 border-2 transition-colors";
const BUTTON_ACTIVE = "bg-primary text-surface";

// Interfaces
interface Link {
  title: string;
  url: string;
  description: string;
}

// Static data
const links: Link[] = [
  { title: "Example", url: "/", description: "..." }
];

// Component
export default function Component() {
  return (
    <main>
      {links.map((link) => (
        <a key={link.title} className={BUTTON_BASE}>
          {link.title}
        </a>
      ))}
    </main>
  );
}
```

### Client Components

- Mark with `"use client"` directive
- Cannot export `metadata` (use `useEffect` to update document.title)
- Use React hooks (useState, useEffect, useContext)

## Content Guidelines

- **Branding**: Use "kistasi" in titles/headers, not "Márton Tasnádi"
- **No emojis** unless explicitly requested
- **Privacy-first**: No analytics or tracking
- **Bilingual**: Always provide both EN and HU versions
- **Professional tone**: Clean, minimal, focused on work
