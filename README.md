# RPCIDE Landing Page

The marketing site of [RPCIDE](https://github.com/rpcide), live at [rpcide.cloud](https://rpcide.cloud). It presents the project and links to the [web app](https://github.com/rpcide/rpcide).

## Tech stack

- [Astro 5](https://astro.build) with React components
- [Tailwind CSS v4](https://tailwindcss.com)
- Deployed on [Vercel](https://vercel.com) with `@astrojs/vercel`

## Quick start

Requirements: Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:4321.

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run astro ...` | Astro CLI, e.g. `npm run astro check` |

## Configuration

The site needs no environment variables. URLs and contact details are in [src/config.ts](src/config.ts):

```ts
const config = {
  apiUrl: "https://api.rpcide.cloud",
  appUrl: "https://app.rpcide.cloud",
  supportEmail: "rpcideofficial@gmail.com",
};
```

The canonical site URL (used for the sitemap) is `site` in [astro.config.mjs](astro.config.mjs). Change both if you deploy your own copy.

## Translations

The site is available in English (default, no URL prefix), Spanish (`/es`) and Portuguese (`/pt`).

- UI strings: [src/i18n/ui.ts](src/i18n/ui.ts)
- Helpers: [src/i18n/utils.ts](src/i18n/utils.ts)
- Locales are configured under `i18n` in [astro.config.mjs](astro.config.mjs)

## Project structure

```
src/
├── pages/
│   ├── index.astro          # Home (English)
│   ├── [lang]/              # index, about and contact pages per language
│   ├── shared/[slug].astro  # Redirects shared links to the web app
│   └── 404.astro
├── components/
│   ├── sections/            # Hero, Features, Languages, PreviewEditor, CTA
│   └── ui/                  # UI primitives
├── layouts/Layout.astro
├── i18n/
└── config.ts
public/                      # Static assets, favicon, robots.txt
```

## Contributing

See the [contributing guide](https://github.com/rpcide/.github/blob/main/CONTRIBUTING.md). Run `npm run build` before opening a pull request.

## License

[GNU AGPL v3.0](LICENSE)
