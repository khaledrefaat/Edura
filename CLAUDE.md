# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint` (Biome check)
- **Format:** `pnpm format` (Biome format --write)

## Tech Stack

- **Next.js 16** with App Router and React 19
- **React Compiler** enabled (`reactCompiler: true` in next.config.ts)
- **Tailwind CSS v4** (experimental, uses `@tailwindcss/postcss`)
- **Shadcn/ui** (radix-nova style) for UI components — add new ones via `pnpm dlx shadcn add <component>`
- **React Hook Form + Zod** for form validation
- **Biome** for linting and formatting (replaces ESLint + Prettier)
- **TypeScript** strict mode with `@/*` path alias → `./src/*`

## Architecture

### App Router Structure
- `src/app/` — pages and layouts using Next.js App Router
- Page-specific components live in `src/app/<route>/components/`
- Shared UI components in `src/components/ui/` (Shadcn/ui managed)
- Utilities in `src/lib/utils.ts`

### Key Patterns
- Forms use React Hook Form with `@hookform/resolvers/zod` and Shadcn's `Form` components
- Styling uses CSS variables defined in `src/app/globals.css` (light/dark theme tokens, primary color: gold `#D4AF37`)
- Font: Manrope via `next/font`
- Toast notifications via `react-hot-toast`

### Biome Configuration
- 2-space indentation
- `noUnknownAtRules: off` (for Tailwind v4 directives)
- Auto-organize imports enabled
- Next.js and React recommended lint rules enabled
