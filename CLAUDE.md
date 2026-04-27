# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint` (Biome check)
- **Format:** `pnpm format` (Biome format --write)
- **Typecheck:** `pnpm typecheck`
- **DB Generate:** `pnpm db:generate` (generate Drizzle migration from schema)
- **DB Migrate:** `pnpm db:migrate` (apply pending migrations)
- **DB Seed:** `pnpm db:seed` (seed database with demo data)
- **DB Studio:** `pnpm db:studio` (open Drizzle Studio)

## Tech Stack

- **Next.js 16** with App Router and React 19
- **React Compiler** enabled (`reactCompiler: true` in next.config.ts)
- **Tailwind CSS v4** (uses `@tailwindcss/postcss`)
- **Shadcn/ui** (radix-nova style) for UI components — add new ones via `pnpm dlx shadcn add <component>`
- **React Hook Form + Zod** for form validation
- **Drizzle ORM** with PostgreSQL (Neon serverless)
- **Auth:** JWT sessions via `jose`, password hashing via `@node-rs/argon2`
- **Framer Motion** for animations
- **Biome** for linting and formatting (replaces ESLint + Prettier)
- **TypeScript** strict mode with `@/*` path alias → `./src/*`

## Architecture

### App Router Structure
- `src/app/` — pages and layouts using Next.js App Router
- `src/app/actions/` — shared server actions
- `src/app/sign-in/` — authentication page with server action
- `src/app/(dashboard)/` — dashboard route group with shared layout and sidebar
  - `(admin)/` — admin pages (dashboard, courses, users)
  - `student/` — student pages (profile, schedule, `[id]` detail)
  - `teacher/` — teacher pages (profile, schedule, courses, `[id]` detail)
- Page-specific components live in `src/app/<route>/components/`
- Shared business components in `src/components/common/`
- Layout components in `src/components/layout/`
- Shadcn/ui components in `src/components/ui/`

### Database
- Schema defined in `src/db/schema.ts` (Drizzle ORM, PostgreSQL)
- Migrations stored in `drizzle/` directory
- Connection setup in `src/db/index.ts` (Neon serverless)
- IDs: 5-character nanoid (`varchar` primary keys)
- User roles: `admin`, `teacher`, `student` (pgEnum)

### Authentication
- JWT-based sessions using `jose` (HS256, 7-day expiry)
- Session management in `src/lib/session.ts` (create/decrypt/delete via cookies)
- Data Access Layer in `src/lib/dal.ts` (`verifySession` cached helper)
- Password hashing with `@node-rs/argon2` via `src/lib/password.ts`
- `@node-rs/argon2` listed in `serverExternalPackages` in next.config.ts

### Key Patterns
- Forms use React Hook Form with `@hookform/resolvers/zod` and Shadcn's `Form` components
- Styling uses CSS variables defined in `src/app/globals.css` (light/dark theme tokens, primary color: gold `#D4AF37`)
- Font: Manrope via `next/font`
- Toast notifications via `react-hot-toast`
- Custom hooks in `src/hooks/` (`use-debounce`, `use-mobile`)
- Dummy data for development in `src/DUMMY_DATA/` (`COURSES.ts`, `USERS.ts`)

### Biome Configuration
- 2-space indentation
- `noUnknownAtRules: off` (for Tailwind v4 directives)
- Auto-organize imports enabled
- Next.js and React recommended lint rules enabled
