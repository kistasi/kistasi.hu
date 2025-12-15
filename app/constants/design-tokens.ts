/**
 * Design System Tokens
 *
 * Centralized design tokens for consistent spacing, typography, and layout
 * across the application.
 */

// Typography Scale
export const typography = {
  h1: "text-5xl font-bold text-primary",
  h2: "text-3xl font-bold text-primary",
  h3: "text-xl font-bold text-primary",
  bodyLarge: "text-lg text-primary",
  body: "text-base text-primary",
  small: "text-sm text-primary",
} as const;

// Spacing Scale
export const spacing = {
  page: "p-8",
  sectionMajor: "space-y-12",
  section: "space-y-6",
  tight: "space-y-3",
  list: "space-y-2",
} as const;

// Component Styles
export const components = {
  card: "border-2 border-primary bg-surface p-6",
  button: "px-6 py-3 border-2 border-primary font-bold transition-colors duration-200",
  buttonPrimary: "bg-primary text-surface hover:bg-surface hover:text-primary",
  buttonSecondary: "bg-surface text-primary hover:bg-primary hover:text-surface",
} as const;

// Layout
export const layout = {
  containerSmall: "max-w-md mx-auto",
  containerMedium: "max-w-4xl mx-auto",
  containerLarge: "max-w-7xl mx-auto",
  minHeight: "min-h-screen bg-background",
} as const;
