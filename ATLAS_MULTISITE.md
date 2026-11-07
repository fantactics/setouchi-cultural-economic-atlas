# ATLAS multi-site plan (phase 3)

Both SETOUCHI ATLAS and KII ATLAS live in this repository.

## Current status
- The production deployment and canonical SETOUCHI paths remain unchanged.
- Shared layout/navigation/site identity is defined in `src/layouts/BaseLayout.astro` and `src/config/atlasSites.js`.
- The first KII landing page is at `src/pages/kii/index.astro`, provisionally published at `/setouchi-cultural-economic-atlas/kii/` **only after merge**.
- KII has no published essays yet. Do not duplicate SETOUCHI content or imagery into KII.
- Regional essay cards are shared via `src/components/AtlasEssayCards.astro`. SETOUCHI homepage and the KII landing page both use it.
- KII-specific article records live in `src/data/kiiArticles.js` and are initially empty. KII shows an explicit editorial empty state until reviewed stories are added.
- KII search is provided by `src/components/AtlasEssaySearch.astro`, scoped exclusively to `kiiArticles`. KII's natural-condition tag links prefill this search.
- A shared content renderer is available in `src/components/AtlasEssayDetail.astro`, with KII routes at `src/pages/kii/book/[slug].astro`. No detail pages are generated until reviewed KII essays exist.
- `scripts/check-kii-articles.mjs` enforces slug uniqueness, required sections, registered natural-condition tags and image credit requirements.
- KII is a pre-launch prototype (`indexable:false`), emits `noindex,follow`, and is excluded from the shared sitemap until real essays and its production destination are ready.
- `scripts/package-kii.mjs` turns `dist/kii/` plus the fingerprinted shared CSS/JS assets into a standalone site rooted at `dist-kii/`. It replaces KII preview links and canonicals without changing the SETOUCHI build output.
- The validation workflow checks the isolated standalone KII bundle. Following merge, the existing main-branch deployment workflow uploads the KII bundle as a downloadable GitHub Actions artifact, while still deploying `dist/` to the original SETOUCHI GitHub Pages URL.
- The bundle is deliberately **prelaunch** (`noindex`, `robots.txt: Disallow /`); setting a domain alone does NOT start public indexing. A later launch procedure must explicitly lift these protections after editorial review.
- No KII hosting service or independent domain has been connected yet, and no live changes should occur until review and merge.
- The previous general editorial workflow fails on a SETOUCHI copy assertion; this is a distinct check from the ATLAS builds and must be reconciled before merge.

## Subsequent phases
1. Gradually adapt legacy SETOUCHI index, detail page, tags and search to the region-agnostic components while preserving existing editorial features and permalinks; verify visual parity rather than replacing more capable components prematurely.
2. Store region-specific essays, place data and photographs separately and have each site read only its region's data.
3. Choose and configure the independent KII hosting destination (a dedicated hosting service, custom domain or deployment-only Pages repository). `dist-kii/` is now available as its standalone upload bundle, but automatic external deployment still requires hosting credentials/destination. A repository's single GitHub Pages deployment cannot serve a second independent Pages origin.
4. Introduce KII-only routes and regional indexes once articles exist; test navigation, sitemap, canonical URL, analytics, image credits and SEO for each site.
5. Add smoke tests so shared UI changes trigger checks for both sites.

## Editorial constraints
Use the same reader-oriented essay conventions. Do not present invented stories as published pieces. Set geography-specific tags and photos in each region's own content layer.

## Packaging and deployment boundaries

```sh
npm install
npm run build
node scripts/package-kii.mjs
# Review dist/index.html for SETOUCHI and dist-kii/index.html for KII
```

- KII's source URLs are under `/setouchi-cultural-economic-atlas/kii/` during the shared Astro build. The standalone packager rewrites that region-specific prefix to `/`, and copies shared build assets from `dist/_astro/` into `dist-kii/_astro/`.
- Without `KII_PUBLIC_ORIGIN`, absolute canonical URLs in the standalone bundle point to a reserved preview host, and indexing is blocked. The artifact is for inspection, not public search.
- A chosen HTTPS root origin can be supplied as `KII_PUBLIC_ORIGIN`, with explicit `KII_LAUNCH_APPROVED=1` required before packaging. This changes the canonical target only; it does not automatically publish, approve articles, or lift noindex/robots restrictions.
- Do not point KII's domain at the existing SETOUCHI GitHub Pages source without configuring independent hosting: GitHub Pages grants one Pages site per repository.
- Keep SETOUCHI canonical paths and build intact. Never alter the default `main` deployment destination merely to launch KII.
