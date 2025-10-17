# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website (kistasi.hu) built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4. The site is a simple single-page application with Hungarian localization.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Technology Stack

- **Framework**: Next.js 15.3.1 with App Router
- **React**: Version 19.0.0
- **TypeScript**: Version 5
- **Styling**: Tailwind CSS 4 with PostCSS plugin (`@tailwindcss/postcss`)
- **Turbopack**: Enabled by default for faster development builds

## Architecture

### Project Structure

- `app/` - Next.js App Router directory
  - `layout.tsx` - Root layout with HTML lang set to "hu-HU"
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles with Tailwind CSS imports

### Path Aliases

The project uses `@/*` path alias that maps to the root directory (configured in tsconfig.json:22).

### Styling System

Tailwind CSS 4 is configured with PostCSS:
- Global styles import Tailwind via `@import "tailwindcss"` in app/globals.css:1
- PostCSS configuration in postcss.config.mjs uses `@tailwindcss/postcss` plugin
- Inline Tailwind classes are used throughout components

### TypeScript Configuration

- Target: ES2017 (tsconfig.json:3)
- Strict mode enabled
- Module resolution: bundler
- JSX: preserve (handled by Next.js)

## Key Conventions

### Localization

The site targets Hungarian audience:
- HTML lang attribute set to "hu-HU" in app/layout.tsx:9
- Content should be in Hungarian when appropriate

### Component Structure

This is a simple single-page site. Components are currently minimal with styling applied via Tailwind utility classes inline.
