// Rewrite only SETOUCHI's published GitHub Pages artifact for its custom domain.
// Keep Astro's legacy project base during the shared SETOUCHI/KII build so KII's
// independent Cloudflare bundle and build-time checks remain unchanged.
import assert from 'node:assert/strict';
import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

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

const home = await readFile(path.join(dist, 'index.html'), 'utf8');
const sitemap = await readFile(path.join(dist, 'sitemap-0.xml'), 'utf8');
const sitemapIndex = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
// Catch failures that were previously invisible: menu links, CSS/JS assets and images.
const oldBase = '/setouchi-cultural-economic-atlas';
assert.ok(!home.includes(oldBase), 'Home still references the old project path');
assert.ok(/href=["']\/["']/.test(home), 'Top navigation does not point to /');
for (const html of htmlPaths) {
  const markup = await readFile(html, 'utf8');
  assert.ok(!markup.includes(oldBase), `Legacy path remains in ${path.relative(dist, html)}`);
  for (const match of markup.matchAll(/<(?:link|script)\b[^>]*(?:href|src)=["'](\/_astro\/[^"'?#]+)["']/g)) {
    const asset = path.join(dist, match[1].slice(1));
    try {
      await stat(asset);
    } catch {
      throw new Error(`Missing compiled asset ${match[1]} in ${path.relative(dist, html)}`);
    }
  }
}
assert.ok(home.includes(domain), 'Home page must link to the custom domain');
assert.ok(!home.includes(legacyPath), 'Home page still contains old project URLs');
assert.ok(sitemap.includes(domain + '/book/'), 'New-domain essay URLs missing from sitemap');
assert.ok(!sitemap.includes(legacyOrigin), 'Sitemap still points to old host');
assert.ok(sitemapIndex.includes(domain + '/sitemap-0.xml'), 'Sitemap index points to old host');
assert.ok((await stat(path.join(dist, 'setouchi-cultural-economic-atlas', 'book', 'hiketa-castle-port-town', 'index.html'))).isFile(), 'Missing old Hiketa URL redirect');
console.log(`Custom domain artifact ready: ${rewritten} rewritten text files; ${redirects} legacy-path redirects.`);
