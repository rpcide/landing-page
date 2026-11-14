# Contributing to the RPCIDE Landing Page

Thanks for your interest in improving the RPCIDE landing page. This guide covers how to set up the project, the conventions we follow and how to open a pull request.

For organization-wide guidelines, see the [RPCIDE contributing guide](https://github.com/rpcide/.github/blob/main/CONTRIBUTING.md).

## Getting started

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/rpcide/landing-page.git
cd landing-page
npm install
npm run dev
```

The dev server runs at http://localhost:4321.

| Command               | Purpose                                |
| :-------------------- | :------------------------------------- |
| `npm run dev`         | Development server                     |
| `npm run build`       | Production build into `dist/`          |
| `npm run preview`     | Preview the production build           |
| `npx astro check`     | Type-check Astro and TypeScript files  |
| `npm run release:dry` | Preview the next version and changelog |

There is no test suite or linter. `npx astro check` and `npm run build` must pass; CI runs both on every pull request.

## Workflow

1. Open an issue first for large changes, so we can agree on the approach.
2. Create a branch from `main` (for example `feat/pricing-section` or `fix/navbar-overflow`). Do not push to `main` directly.
3. Make small, focused changes. Do not reformat unrelated code.
4. Run `npx astro check` and `npm run build`.
5. For visual changes, check the page in all three locales (`/`, `/es`, `/pt`), in light and dark mode, and at mobile and desktop widths.
6. Open a pull request against `main`.

## Code conventions

### Stack

- [Astro 5](https://astro.build) pages and components, with React 19 islands (`.tsx`) only where interactivity is needed. Use the narrowest `client:*` directive that works.
- [Tailwind CSS v4](https://tailwindcss.com). There is no `tailwind.config`; the theme lives in `src/global.css`. The root `tailwild.config.js` is an empty legacy file: leave it empty.
- [shadcn/ui](https://ui.shadcn.com) (new-york style) components under `src/components/ui/`.
- TypeScript in strict mode. Import from `src` with the `@/` alias.

### Translations (i18n)

The site is available in English (default), Spanish (`/es`) and Portuguese (`/pt`).

- Never hardcode user-facing text. Add a key to `src/i18n/ui.ts` for **every** locale (`en`, `es`, `pt`) in the same change, and read it with `useTranslations(lang)`.
- Build internal links with `useTranslatedPath(lang)` so they respect the locale prefix.

### Styling

- Use Tailwind utilities and theme tokens (`bg-primary`, `text-muted-foreground`, ...). Do not hardcode colors.
- Support light and dark modes with the `dark:` variant.
- Merge class names with `cn()` from `@/lib/utils`.
- Keep pages responsive (mobile first) and accessible: alt text, semantic landmarks and labels.

### Configuration

- External URLs and the support email live in `src/config.ts`. Do not inline them.
- Do not add dependencies without a clear need, and never edit `package-lock.json` by hand.
- Do not rename or remove routes without considering the sitemap, redirects and the `[lang]` structure.
- Never commit secrets or `.env` files.

### Formatting

Follow `.editorconfig`: 2 spaces, LF line endings and a final newline.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/). The release script derives the next version from them, so the format matters.

```
<type>(<optional scope>)<!>: <short imperative summary>
```

Types: `feat`, `fix`, `perf`, `refactor`, `docs`, `style`, `build`, `ci`, `chore`, `revert`. Add `!` after the type or a `BREAKING CHANGE:` footer for breaking changes. Write the summary in English, in the imperative mood.

```
feat: add pricing section
fix(navbar): prevent overflow on small screens
docs: update contributing guide
```

Pull request titles must also follow this format: they become the squash-merge commit subject.

## Versioning and releases

The project follows [Semantic Versioning](https://semver.org/). See [docs/VERSIONING.md](docs/VERSIONING.md) for details.

- Do not change the `version` field in `package.json` or edit `CHANGELOG.md` by hand.
- Releases are cut by maintainers from `main` with `npm run release` or the **Release** GitHub Actions workflow.

## Pull request checklist

- [ ] The PR title is a Conventional Commit.
- [ ] `npx astro check` and `npm run build` pass.
- [ ] New user-facing strings have `en`, `es` and `pt` translations.
- [ ] Visual changes were checked in all locales, light and dark mode, and on mobile.
- [ ] No hardcoded colors, URLs or secrets.

## License

By contributing, you agree that your contributions are licensed under the [GNU AGPL v3.0](LICENSE).
