# ATLAS multi-site plan (phase 3)

Both SETOUCHI ATLAS and KII ATLAS live in this repository.

## Current status
- The production deployment and canonical SETOUCHI paths remain unchanged.
- Shared layout/navigation/site identity is defined in `src/layouts/BaseLayout.astro` and `src/config/atlasSites.js`.
- The first KII landing page is at `src/pages/kii/index.astro`, provisionally published at `/setouchi-cultural-economic-atlas/kii/` **only after merge**.
- KII's first three researched essays are now in `src/data/kiiArticles.js`: Nachi waterfall, Shirarahama beach, and Arida's citrus terraces. Do not duplicate SETOUCHI essays or photography into KII.
- Regional essay cards are shared via `src/components/AtlasEssayCards.astro`. SETOUCHI homepage and the KII landing page both use it.
- KII-specific article records live in `src/data/kiiArticles.js`. They include sections, verified public background references, natural-condition tags and optional credited images from the owner's original quageo website.
- KII search is provided by `src/components/AtlasEssaySearch.astro`, scoped exclusively to `kiiArticles`. KII's natural-condition tag links prefill this search.
- A shared content renderer is available in `src/components/AtlasEssayDetail.astro`, with KII routes at `src/pages/kii/book/[slug].astro`. No detail pages are generated until reviewed KII essays exist.
- `scripts/check-kii-articles.mjs` enforces slug uniqueness, required sections, registered natural-condition tags and image credit requirements.
- KII is accessible at `https://kii-atlas.pages.dev/`, but SEO launch remains separately gated (`indexable:false` and `noindex,follow`; shared sitemap excludes KII). Publishing essays on the site does not automatically submit them for search indexing.
- `scripts/package-kii.mjs` turns `dist/kii/` plus the fingerprinted shared CSS/JS assets into a standalone site rooted at `dist-kii/`. It replaces KII preview links and canonicals without changing the SETOUCHI build output.
- The validation workflow checks the isolated standalone KII bundle. Following merge, the existing main-branch deployment workflow uploads the KII bundle as a downloadable GitHub Actions artifact, while still deploying `dist/` to the original SETOUCHI GitHub Pages URL.
- The bundle is deliberately **prelaunch** (`noindex`, `robots.txt: Disallow /`); setting a domain alone does NOT start public indexing. A later launch procedure must explicitly lift these protections after editorial review.
- No KII hosting service or independent domain has been connected yet, and no live changes should occur until review and merge.
- The editorial PR workflow now runs `scripts/check-built-editorial.mjs`, verifying article routes, substantial rendered Japanese prose, source sections, alt attributes and absence of research-only endings without pinning copyedited sentences. Review its CI result before merging.

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
- By default, absolute canonical URLs in the standalone bundle use the verified `https://kii-atlas.pages.dev` origin. Indexing remains intentionally blocked until a separate editorial SEO launch. `KII_PUBLIC_ORIGIN` can override the default for an independently configured domain.
- A chosen HTTPS root origin can be supplied as `KII_PUBLIC_ORIGIN`, with explicit `KII_LAUNCH_APPROVED=1` required before packaging. This changes the canonical target only; it does not automatically publish, approve articles, or lift noindex/robots restrictions.
- Do not point KII's domain at the existing SETOUCHI GitHub Pages source without configuring independent hosting: GitHub Pages grants one Pages site per repository.
- Keep SETOUCHI canonical paths and build intact. Never alter the default `main` deployment destination merely to launch KII.

## A single source repository, two hosted websites

**Recommended hosting for the second site:** connect a *separate Cloudflare Pages project* to the SAME GitHub repository. This keeps only one source repository; Cloudflare Pages automatically builds and deploys KII when changes reach `main`. The existing GitHub Pages destination stays exclusively SETOUCHI. No second GitHub repository is needed.

Cloudflare Pages setup:
1. Create a new Pages project, connect the GitHub repository `fantactics/setouchi-cultural-economic-atlas`, select `main`.
2. Set the root directory to the repository root, not `src/pages/kii`.
3. Set build command to `npm ci && npm run build && node scripts/package-kii.mjs`.
4. Set output directory to `dist-kii`, and environment Node version to `24`.
5. Without `KII_PUBLIC_ORIGIN`, the build uses `https://kii-atlas.pages.dev` as the canonical origin but retains noindex and `robots.txt` disallow rules, pending separate SEO launch approval.
6. After the hosting origin is known and articles have passed editorial review, set `KII_PUBLIC_ORIGIN` to the actual HTTPS origin and `KII_LAUNCH_APPROVED=1`. Rebuild and verify canonical/OG routes. These variables intentionally **do not** remove noindex or robots.txt restrictions; public indexing requires a separate explicit SEO launch change.
7. Only after confirming real articles, photography rights, page URLs, search and sitemap on the chosen domain, lift the noindex/robots safeguards and request indexing in Search Console.

**Important:** The Cloudflare project is *not configured* by this PR and no credentials/domain are known. Creating or configuring it requires authorization and connection to the Cloudflare account.

For code review without separate hosting, the PR validation workflow uploads `kii-atlas-pr-preview` from `dist-kii/`. Download from the GitHub Actions run artifacts. It is a static, root-relative bundle: serve at the site root when inspecting locally rather than opening `index.html` directly from a local file URL.

## First three essays / photo provenance

- Nachi: `nachi-waterfall-where-rock-meets-faith` — original research note `https://quageo.kyotrad.com/?p=2183`. Photo from the author's quageo site's own upload, credited to the original author.
- Shirarahama: `shirarahama-white-sand-across-the-sea` — original research note `https://quageo.kyotrad.com/?p=1558`. Photo from the author's quageo site's own upload, credited to the original author.
- Arida: `arida-mikan-climbs-the-hillside` — source note URL `https://quageo.kyotrad.com/?p=775` could not be independently retrieved when drafted; factual checks use MAFF and Wakayama Prefecture background documents. The user-site photograph is NOT inserted until its actual image URL can be verified.

User has authorized use of photos on the original quageo website. For future images, verify exact source and mark photography attribution. Original-website-hosted images are currently referenced via the owner's existing WordPress image CDN; a later migration can copy them into a managed local asset directory if needed for reliability.
