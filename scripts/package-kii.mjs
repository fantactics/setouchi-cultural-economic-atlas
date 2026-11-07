/**
 * Produce an independently hostable KII ATLAS bundle from the shared Astro
 * build without changing SETOUCHI's deployed artifact or canonical routes.
 *
 * Usage: node scripts/package-kii.mjs
 *        KII_PUBLIC_ORIGIN=https://kii.example.org node scripts/package-kii.mjs
 *
 * The default is the confirmed kii-atlas.pages.dev origin. Domain configuration is
 * deliberately explicit: no fictional public destination is published.
 */
import { access, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve, relative, join, extname } from 'node:path';

const source = resolve('dist');
const input = join(source, 'kii');
const output = resolve('dist-kii');
const setouchiBase = '/setouchi-cultural-economic-atlas/';
const kiiBase = setouchiBase + 'kii/';
const origin = process.env.KII_PUBLIC_ORIGIN?.replace(/\/$/, '') || 'https://kii-atlas.pages.dev';
if (origin && !/^https:\/\/[^/]+$/.test(origin)) {
  throw new Error('KII_PUBLIC_ORIGIN must be a bare HTTPS origin, without a path');
}
if (process.env.KII_PUBLIC_ORIGIN && !process.env.KII_LAUNCH_APPROVED) {
  throw new Error('Production-like KII packaging requires KII_LAUNCH_APPROVED=1');
}
try {
  await readdir(input);
} catch {
  throw new Error('KII build not found: run npm run build first');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(input, output, { recursive: true });
await cp(join(source, '_astro'), join(output, '_astro'), { recursive: true });

const replaceUrls = (content) => {
  // Replace complete canonical / OpenGraph URLs before shortening paths.
  const oldHost = 'https://fantactics.github.io';
  let transformed = content.split(oldHost + kiiBase).join(origin + '/');
  // Shared sitemap indexes the SETOUCHI domain; do not advertise it for KII.
  transformed = transformed.replace(/<link\s+rel="sitemap"[^>]*>/g, '');
  // The KII-specific base must be replaced BEFORE the broader asset base.
  transformed = transformed.split(kiiBase).join('/');
  // Shared, fingerprinted Astro assets live at the site's own root.
  transformed = transformed.split(setouchiBase + '_astro/').join('/_astro/');
  return transformed;
};
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    // Do not rewrite compiled JS/CSS: the package retains all required hashed assets.
    if (extname(file) !== '.html') continue;
    const html = await readFile(file, 'utf8');
    const transformed = replaceUrls(html);
    if (transformed.includes('https://fantactics.github.io/setouchi-cultural-economic-atlas/kii/')) {
      throw new Error('Incorrect canonical URL in ' + relative(output, file));
    }
    if (transformed.includes(kiiBase) || transformed.includes(setouchiBase + '_astro/')) {
      throw new Error('Residual monorepo paths in ' + relative(output, file));
    }
    await writeFile(file, transformed, 'utf8');
  }
}
await walk(output);

// KII has a dedicated Cloudflare Pages origin. Search engines may crawl it.
const verificationFile = 'google9c35f2435ae15949.html';
const verificationLine = 'google-site-verification: ' + verificationFile;
const verificationPath = join(output, verificationFile);
try {
  await access(verificationPath);
} catch {
  throw new Error('Missing GSC verification HTML in KII standalone bundle: ' + verificationPath);
}
if ((await readFile(verificationPath, 'utf8')).trim() !== verificationLine) {
  throw new Error('Unexpected content in KII Search Console verification file');
}

// A dedicated KII sitemap: never reuse SETOUCHI's sitemap or hostname.
const routes = [];
async function gatherHtml(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) { await gatherHtml(file); continue; }
    if (entry.name !== 'index.html') continue;
    const pathname = relative(output, directory).replaceAll('\\', '/');
    const route = pathname ? pathname + '/' : '';
    routes.push(origin + '/' + route);
  }
}
await gatherHtml(output);
routes.sort();
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes.map(url => '  <url><loc>' + url.replaceAll('&', '&amp;') + '</loc></url>').join('\n') +
  '\n</urlset>\n';
await writeFile(join(output, 'sitemap.xml'), sitemap);
await writeFile(join(output, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + origin + '/sitemap.xml\n');
await writeFile(join(output, '.nojekyll'), '');
await writeFile(join(output, 'BUILD_INFO.txt'),
  'KII ATLAS standalone bundle\n' +
  'Origin: ' + origin + '\n' +
  'Status: indexable (Cloudflare Pages)\n' +
  'Source: shared ATLAS monorepo\n');
const homepage = await readFile(join(output, 'index.html'), 'utf8');
for (const required of ['KII ATLAS','index,follow','href="/"']) {
  if (!homepage.includes(required)) throw new Error('Missing ' + required + ' in KII homepage');
}
if (!routes.length || routes.some(url => url.includes('/setouchi-cultural-economic-atlas/'))) {
  throw new Error('Invalid KII sitemap routes');
}
if (homepage.includes('setouchi-sushi-not-nigiri')) throw new Error('SETOUCHI article leaked into KII bundle');
console.log('Standalone KII bundle created at dist-kii/ with Search Console file and '+routes.length+' sitemap URLs.');
