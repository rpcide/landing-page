# CLAUDE.md

@AGENTS.md

## Claude Code specifics

The shared project guidance (stack, commands, layout, conventions, commits) lives in `AGENTS.md`, imported above. Keep it as the single source of truth; add only Claude-specific notes here.

### Workflow

- Read the relevant component and the matching `src/i18n/ui.ts` keys before editing; most UI changes touch both.
- After changing UI, verify with `npm run build`. For visual changes, run `npm run dev` and check the page in all three locales (`/`, `/es`, `/pt`) and in light and dark mode.
- Make small, focused edits with the Edit tool; do not reformat unrelated code.
- When adding a user-facing string, add `en`, `es` and `pt` translations in the same change.

### Versioning and releases

- Follow `docs/VERSIONING.md`. Write every commit as a Conventional Commit; the release script derives the next version from them.
- Preview with `npm run release:dry`. Run `npm run release` only when explicitly asked, and never push tags unless asked.
- Do not touch the `version` field in `package.json` or `CHANGELOG.md` by hand.

### Notes

- `tailwild.config.js` at the root is an empty legacy file (typo in the name); Tailwind v4 is configured in `src/global.css`. Do not populate it.
- Production domain is `rpcide.com`; app and API URLs are in `src/config.ts`.
