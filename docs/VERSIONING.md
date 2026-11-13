# Versioning

This project uses [Semantic Versioning 2.0.0](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/). `package.json` is the single source of truth for the version; every release is a git tag `vX.Y.Z`.

## Version rules

Format: `MAJOR.MINOR.PATCH`. While the major version is `0`, the project is in initial development: breaking changes bump MINOR.

| Bump  | When                                                                 |
| :---- | :------------------------------------------------------------------- |
| MAJOR | Breaking change (removed/renamed routes, URL structure changes, etc.) |
| MINOR | New user-visible feature (new section, page, language)               |
| PATCH | Bug fixes, copy/style tweaks, refactors, dependency updates           |

## Commit format

```
<type>(<optional scope>)<!>: <short imperative summary>

<optional body>

BREAKING CHANGE: <description>   # or use "!" after the type
```

Types: `feat`, `fix`, `perf`, `refactor`, `docs`, `style`, `build`, `ci`, `chore`, `revert`.

| Commit                        | Resulting bump |
| :---------------------------- | :------------- |
| `feat: ...`                   | MINOR          |
| `fix:`, `perf:`, `refactor:`  | PATCH          |
| `feat!: ...` / `BREAKING CHANGE:` | MAJOR (MINOR while `0.x`) |
| `docs`, `style`, `chore`, `ci`, `build` | PATCH (only if releasing) |

## Releasing

```bash
npm run release:dry     # preview next version and changelog entry
npm run release         # auto-detect bump from commits since last tag
npm run release:patch   # or release:minor / release:major
git push --follow-tags  # publish the commit and tag
```

`scripts/release.mjs` requires a clean working tree and will:

1. Compute the next version from commits since the last `v*` tag.
2. Update `package.json` and `package-lock.json`.
3. Prepend a section to `CHANGELOG.md` grouped by commit type.
4. Create the commit `chore(release): vX.Y.Z` and an annotated tag `vX.Y.Z`.

It never pushes. Release from the `main` branch only.

## Rules

- Never edit the version in `package.json` or `CHANGELOG.md` by hand; use the release script.
- Never move or delete a published tag. Fix forward with a new patch release.
- Use a GitHub Release on the tag, with the matching `CHANGELOG.md` section as notes.
