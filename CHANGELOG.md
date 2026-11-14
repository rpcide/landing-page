# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project follows [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-11-14

### Features

- add domain change notification to UI and update package-lock for TypeScript (`b734d8c`)
- add Vercel Analytics integration to track user interactions (`7033500`)
- replace logo image format from webp to svg and update favicon images (`090fdc2`)
- add Rust and Kotlin languages to the Languages section (`d41a6f3`)
- create contact page (`0a21718`)
- add key features section to About page with multilingual support (`30b847f`)
- add About page with content and layout for multiple languages (`821eec0`)
- update footer links and improve layout (`937791f`)
- add custom 404 page with layout and image (`c2eff6e`)
- add Vercel adapter to Astro configuration (`cc850f8`)
- update app icons and remove unused logo file (`2f2db48`)
- add new icons and web manifest for improved PWA support (`f44c318`)
- enhance mobile navigation by adding login icon to button (`4d7e73d`)
- replace logo with new WebP format and update header/footer image sizes (`7d55321`)
- update Languages section to use new icons for programming languages (`453a8bd`)
- add configuration file with API and app URLs (`fc620d6`)
- add Drawer component shadcnui (`e6f7a24`)
- add logo png (`7573f56`)
- add robots.txt for SEO optimization (`bd2f50c`)
- add sitemap integration and link to layout for improved SEO (`d0bd448`)
- add Geist Variable font for improved typography (`c1a2090`)
- update UI titles and descriptions for language support (`2fb701f`)
- enhance footer with language support and improved translations (`c5e6ffd`)
- add Link component for language-aware navigation (`842dadb`)
- update layout structure by adjusting z-index and spacing (`76f337a`)
- add CTA and PreviewEditor sections (`b823d43`)
- add Languages section (`f2d5bf4`)
- add Card component and related subcomponents for UI structure (`02083d4`)
- add className prop to Layout component and wrap children in a div for improved styling (`406a873`)
- add AnimatedBackground component to Hero section for enhanced visuals (`77393bf`)
- add Features section with multilingual support and integrate CardFeature component (`dd3bf29`)
- enhance Hero section with additional content and translations (`25f8f63`)
- add Hero section with multilingual support and content (`316a410`)
- add Badge component with variant support (`0a05c3f`)
- add LanguageToggle component (`d161027`)
- add Locale type definition for supported languages (`0fa6b7e`)
- implement language redirection based on URL in index page (`439e398`)
- add Header component with navigation and theme toggle (`e4e789d`)
- add ModeToggle component for theme switching (`3c256f8`)
- add tailwild and shadcn (`e1ed5f2`)
- implement internationalization support with language and UI translations (`17d03b5`)
- add .editorconfig for consistent coding styles and format index.astro (`524290b`)

### Bug Fixes

- ignore .vercel build output so release runs on a clean tree (`d1ac038`)
- update button styles for consistent rounding and sizing (`49e364e`)
- replace anchor tag with Link component in Header for improved routing (`338e187`)
- ensure prerender is disabled for shared slug pages (`635bd73`)
- add dynamic redirect for shared slug pages (`4a490fe`)
- typo in ui.ts (`3406884`)
- remove unnecessary border from footer and adjust CTA section layout (`87c2306`)
- adjust padding in PreviewEditor for consistent layout (`0b9027d`)
- update hero section text for improved clarity and consistency (`fe04e18`)
- adjust heading size in Hero section for better responsiveness (`0e7f963`)
- adjust layout and structure of PreviewEditor component for improved responsiveness (`19e98a2`)
- update CTA link to use dynamic app URL from config (`d741498`)
- set responsive Header component (`d93e7c0`)
- update page title format to include site name for clarity (`a7ad237`)
- remove Trophy icon and related text from Hero section for simplification (`4de76da`)
- comment out ModeToggle component in Header and Footer for cleanup (`0f44afe`)
- update footer links and logo for consistency (`4aa82eb`)
- increase logo size for better visibility (`baae7d0`)
- update sitemap references to use sitemap-index.xml (`23eb3b3`)
- update header title to use static text instead of translation (`00e2dd2`)
- update text colors and card background for improved readability (`01eee4b`)
- update login link to use the correct application URL (`f922a58`)
- add padding to features section for improved spacing (`7b07b88`)
- add relative positioning to header for improved layout stacking (`0e1b626`)
- update background styles for light and dark themes (`0aa5488`)
- replace Badge component with styled div for hero slogan (`65742e7`)
- update Container component to increase maximum width (`4968c1f`)
- update color variables for improved theming and add smooth scrolling (`96085a3`)
- add text styling to navigation items in Header component (`c1b5663`)
- update i18n configuration to disable default locale prefixing (`353d64f`)
- ensure default locale redirection in i18n configuration and remove unused language utility from index page (`26ab123`)

### Refactoring

- update color scheme to use primary color variable across components (`3f85967`)
- adjust container and paragraph widths for improved layout consistency (`f504e20`)
- simplify CTA button structure and remove redundant button (`7da30f9`)

### CI

- rerun PR title check when the title is edited (`167bfed`)
- add CI and release GitHub Actions workflows (`99b8c24`)

## [0.0.1] - 2026-11-13

### Features

- Initial landing page (Astro 5, React islands, Tailwind CSS v4) with Hero, Features, Languages, CTA and PreviewEditor sections.
- Trilingual i18n (en default, es, pt), About and Contact pages, custom 404, Vercel deployment and analytics.
