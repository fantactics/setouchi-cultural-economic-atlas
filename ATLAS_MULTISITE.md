# ATLAS multi-site plan (phase 2)

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
- The PR build validates both entry points. No live changes should occur until review and merge.
- The previous general editorial workflow fails on a SETOUCHI copy assertion; this is a distinct check from the ATLAS builds and must be reconciled before merge.

## Subsequent phases
1. Gradually adapt legacy SETOUCHI index, detail page, tags and search to the region-agnostic components while preserving existing editorial features and permalinks; verify visual parity rather than replacing more capable components prematurely.
2. Store region-specific essays, place data and photographs separately and have each site read only its region's data.
3. Configure two build targets and two deployment destinations, preserving the existing SETOUCHI GitHub Pages URL. A repository's single GitHub Pages deployment cannot natively publish two separately configured Pages sites; a second destination, custom domain/hosting or a separate deployment repository is needed if KII must have an independent hostname.
4. Introduce KII-only routes and regional indexes once articles exist; test navigation, sitemap, canonical URL, analytics, image credits and SEO for each site.
5. Add smoke tests so shared UI changes trigger checks for both sites.

## Editorial constraints
Use the same reader-oriented essay conventions. Do not present invented stories as published pieces. Set geography-specific tags and photos in each region's own content layer.
