# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

RPCIDE landing page: a static-first marketing site for an online competitive programming IDE. Deployed on Vercel at `https://rpcide.cloud`.

## Stack

- Astro 5 (`.astro` pages/components) with React 19 islands (`.tsx`) only where interactivity is needed
- Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config`; theme lives in `src/global.css`)
- shadcn/ui (new-york style) + Radix primitives + `class-variance-authority`, `lucide` icons
- TypeScript (`astro/tsconfigs/strict`), path alias `@/*` → `src/*`
- Vercel adapter and `@vercel/analytics`

## Commands

| Command                | Purpose                                  |
| :--------------------- | :--------------------------------------- |
| `npm install`          | Install dependencies                     |
| `npm run dev`          | Dev server at `localhost:4321`           |
| `npm run build`        | Production build into `dist/`            |
| `npm run preview`      | Preview the production build             |
| `npx astro check`      | Type-check Astro/TS files                |
| `npm run release:dry`  | Preview the next version and changelog   |

There is no test suite or linter. Before finishing a change, run `npm run build` (and `npx astro check` for TS changes).

## Project layout

```
src/
  pages/            Routes. [lang]/ holds index, about, contact; index.astro rewrites to the detected language
  pages/shared/     [slug].astro redirects to the app (prerender = false)
  components/       Astro components; sections/ = page sections; ui/ = shadcn/ui React components
  layouts/Layout.astro
  i18n/ui.ts        ALL translated strings (en, es, pt)
  i18n/utils.ts     useTranslations, useTranslatedPath, getLangFromUrl
  config.ts         External URLs and contact email (single source)
  global.css        Tailwind import, theme tokens, CSS variables
  lib/utils.ts      cn() helper
scripts/release.mjs Release automation
docs/VERSIONING.md  Versioning policy
```

## Conventions

- **i18n is mandatory.** Never hardcode user-facing text. Add a key to every locale (`en`, `es`, `pt`) in `src/i18n/ui.ts`, and use `useTranslations(lang)`. `en` is the default and the fallback.
- Build internal links with `useTranslatedPath(lang)` so they respect the locale prefix.
- External URLs and the support email come from `src/config.ts`; do not inline them.
- Prefer `.astro` components. Use React (`.tsx`) only for interactive islands, with the narrowest `client:*` directive that works.
- Style with Tailwind utilities and theme tokens (e.g. `bg-primary`, `text-muted-foreground`); do not hardcode colors. Support light and dark modes (`dark:` variant).
- Merge class names with `cn()` from `@/lib/utils`. Add shadcn components under `src/components/ui/`.
- Use the `@/` alias for imports from `src`.
- Formatting follows `.editorconfig`: 2 spaces, LF, final newline.
- Keep pages responsive (mobile first) and accessible (alt text, semantic landmarks, labels).
- Do not commit secrets or `.env` files.

## Commits and versioning

- Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `build:`, `ci:`, `chore:`; add `!` or a `BREAKING CHANGE:` footer for breaking changes. Write the summary in imperative mood, in English.
- The project follows [SemVer](https://semver.org/). `package.json` holds the version; see `docs/VERSIONING.md`.
- **Never edit the version or `CHANGELOG.md` manually.** Releases are cut with `npm run release` (see `docs/VERSIONING.md`) and only when the user asks.
- Work on feature branches; do not push to `main` directly or open PRs unless asked.

## Boundaries

- Do not rename or remove routes without considering sitemap, redirects and the `[lang]` structure.
- Do not add dependencies without a clear need; prefer what is already installed.
- Do not edit `package-lock.json` by hand.
- Do not modify generated or ignored directories (`dist/`, `.astro/`, `node_modules/`).
