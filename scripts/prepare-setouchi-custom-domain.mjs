// Rewrite only SETOUCHI's published GitHub Pages artifact for its custom domain.
// Keep Astro's legacy project base during the shared SETOUCHI/KII build so KII's
// independent Cloudflare bundle and build-time checks remain unchanged.
import assert from 'node:assert/strict';
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const dist = path.resolve('dist');
const domain = 'https://setouchi-atlas.pia2.org';
const legacyPath = '/setouchi-cultural-economic-atlas/';
const legacyOrigin = 'https://fantactics.github.io';
const textExtensions = new Set(['.html', '.xml', '.txt', '.css', '.js', '.json', '.svg', '.webmanifest']);

async function* files(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* files(file);
    else if (entry.isFile()) yield file;
  }
}

const htmlPaths = [];
let rewritten = 0;
for await (const file of files(dist)) {
  if (path.extname(file) === '.html') htmlPaths.push(file);
  if (!textExtensions.has(path.extname(file))) continue;

  const before = await readFile(file, 'utf8');
  // Order matters: replace the full canonical URL before the root-relative base.
  const after = before
    // Preserve a terminal path separator when possible, while also fixing the
    // bare /setouchi-cultural-economic-atlas menu link (no terminal slash).
    .replaceAll(legacyOrigin + legacyPath, domain + '/')
    .replaceAll(legacyOrigin + legacyPath.slice(0, -1), domain)
    .replaceAll(legacyPath, '/')
    .replaceAll(legacyPath.slice(0, -1), '/')
    // Some JSON embeds URLs using escaped forward slashes.
    .replaceAll('https:\\/\\/fantactics.github.io\\/setouchi-cultural-economic-atlas\\/', 'https:\\/\\/setouchi-atlas.pia2.org\\/')
    .replaceAll('\\/setouchi-cultural-economic-atlas\\/', '\\/')
    .replaceAll('\\/setouchi-cultural-economic-atlas', '\\/');
  if (after !== before) {
    await writeFile(file, after, 'utf8');
    rewritten++;
  }
}

// Use one root-level stylesheet whose URL cannot depend on Astro's former
// /setouchi-cultural-economic-atlas/ project base. It acts as a dependable
// fallback alongside Astro's existing hashed CSS links. Do not inline styles:
// many pages would needlessly inflate the Pages deployment artifact.
const cssDir = path.join(dist, '_astro');
const cssFiles = (await readdir(cssDir)).filter(name => name.endsWith('.css'));
assert.ok(cssFiles.length > 0, 'Astro did not emit any compiled CSS');
const combinedCss = [];
for (const name of cssFiles) {
  const css = await readFile(path.join(cssDir, name), 'utf8');
  // Asset URLs inside CSS were relative to /_astro/. Keep that relative
  // directory context after concatenating into a root-level fallback file.
  combinedCss.push(css.replaceAll('url(./', 'url(/_astro/').replaceAll('url("../', 'url("/'));
}
const fallbackCss=combinedCss.join('\n');
await writeFile(path.join(dist, 'atlas-fallback.css'), fallbackCss, 'utf8');
// Stable content fingerprint prevents browsers from reusing an outdated global
// stylesheet after a new deploy (critical for PHOTO ESSAY display repairs).
const fallbackVersion=createHash('sha256').update(fallbackCss).digest('hex').slice(0,12);
for (const html of htmlPaths) {
  let markup = await readFile(html, 'utf8');
  if (!markup.includes('</head>')) continue;
  markup = markup.replace('</head>', `<link rel="stylesheet" href="/atlas-fallback.css?v=${fallbackVersion}" /></head>`);
  await writeFile(html, markup, 'utf8');
}

// GitHub Pages redirects the github.io project hostname to the new domain,
// but may preserve the old project path. Provide lightweight compatibility
// pages for old prefixed article/index URLs without rewriting any content.
let redirects = 0;
for (const html of htmlPaths) {
  const relative = path.relative(dist, html);
  const route = relative === 'index.html' ? '' : relative.replace(/index\.html$/, '');
  const target = domain + '/' + route.split(path.sep).join('/');
  const oldFile = path.join(dist, legacyPath.slice(1), relative);
  const escaped = target.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  const body = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${escaped}"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${escaped}"><title>移転しました | SETOUCHI ATLAS</title></head><body><p>移転しました。<a href="${escaped}">新しいページへ移動する</a></p></body></html>`;
  await mkdir(path.dirname(oldFile), { recursive: true });
  await writeFile(oldFile, body, 'utf8');
  redirects++;
}

// Guard the five editorially revised essays and the deliberately unpublished
// Shido draft in the actual artifact that will be deployed to the custom domain.
const revisedEssays = [
  ['fish-waste-to-feed-and-citrus', '港で残った魚が、みかん山へ向かう'],
  ['citrus-pomace-cascade', 'みかんを搾ったあと、枝を切ったあと'],
  ['olive-pomace-to-cattle', 'オリーブの搾りかすで、牛を育てる'],
  ['four-salt-fields', '塩田のあとに残った四つの風景'],
  ['ports-that-needed-waiting', '船が待たなくなったとき、港町には何が残ったのか']
];
for (const [slug, heading] of revisedEssays) {
  const page = path.join(dist, 'book', slug, 'index.html');
  const html = await readFile(page, 'utf8');
  assert.ok(html.includes(heading), `Revised heading missing in deployed essay: ${slug}`);
  assert.ok(html.includes('https://setouchi-atlas.pia2.org/book/' + slug + '/'), `Wrong canonical domain: ${slug}`);
  assert.ok(!html.includes('/setouchi-cultural-economic-atlas/'), `Legacy project path survived in essay: ${slug}`);
  assert.ok(html.includes('class="markdown-essay-body"'), `Markdown essay body not rendered: ${slug}`);
}
const withheld = path.join(dist, 'book', 'tadano-shido-industrial-ecosystem', 'index.html');
assert.ok(!(await stat(withheld).then(() => true).catch(() => false)), 'Shido draft must not be published');

const home = await readFile(path.join(dist, 'index.html'), 'utf8');
const sitemap = await readFile(path.join(dist, 'sitemap-0.xml'), 'utf8');
const sitemapIndex = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
// Check the public link and independent root-level CSS fallback.
assert.ok(home.includes('href="/atlas-fallback.css?v='), 'Fallback CSS missing from homepage');
assert.ok(home.includes('href="/"'), 'Top navigation must point to the custom-domain root');
assert.ok(!home.includes('/setouchi-cultural-economic-atlas'), 'Old project path remains in homepage');
assert.ok(home.includes(domain), 'Home page must link to the custom domain');
assert.ok(!home.includes(legacyPath), 'Home page still contains old project URLs');
assert.ok(sitemap.includes(domain + '/book/'), 'New-domain essay URLs missing from sitemap');
assert.ok(!sitemap.includes(legacyOrigin), 'Sitemap still points to old host');
assert.ok(sitemapIndex.includes(domain + '/sitemap-0.xml'), 'Sitemap index points to old host');
assert.ok((await stat(path.join(dist, 'setouchi-cultural-economic-atlas', 'book', 'hiketa-castle-port-town', 'index.html'))).isFile(), 'Missing old Hiketa URL redirect');
console.log(`Custom domain artifact ready: ${rewritten} rewritten files; ${cssFiles.length} bundled CSS files; ${redirects} legacy-path redirects.`);
