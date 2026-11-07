# ATLAS multi-site plan (phase 1)

Both SETOUCHI ATLAS and KII ATLAS live in this repository.

## Current status
- The production deployment and canonical SETOUCHI paths remain unchanged.
- Shared layout/navigation/site identity is defined in `src/layouts/BaseLayout.astro` and `src/config/atlasSites.js`.
- The first KII landing page is at `src/pages/kii/index.astro`, provisionally published at `/setouchi-cultural-economic-atlas/kii/` **only after merge**.
- KII has no published essays yet. Do not duplicate SETOUCHI content or imagery into KII.
- The PR build validates both entry points. No live changes should occur until review and merge.

## Subsequent phases
1. Extract the common essay card, index, detail page, tag UI and search into reusable components without changing current SETOUCHI permalinks.
2. Store region-specific essays, place data and photographs separately and have each site read only its region's data.
3. Configure two build targets and two deployment destinations, preserving the existing SETOUCHI GitHub Pages URL. A repository's single GitHub Pages deployment cannot natively publish two separately configured Pages sites; a second destination, custom domain/hosting or a separate deployment repository is needed if KII must have an independent hostname.
4. Introduce KII-only routes and regional indexes once articles exist; test navigation, sitemap, canonical URL, analytics, image credits and SEO for each site.
5. Add smoke tests so shared UI changes trigger checks for both sites.

## Editorial constraints
Use the same reader-oriented essay conventions. Do not present invented stories as published pieces. Set geography-specific tags and photos in each region's own content layer.
