/**
 * Produce an independently hostable KII ATLAS bundle from the shared Astro
 * build without changing SETOUCHI's deployed artifact or canonical routes.
 *
 * Usage: node scripts/package-kii.mjs
 *        KII_PUBLIC_ORIGIN=https://kii.example.org node scripts/package-kii.mjs
 *
 * The default is a preview-only, noindex package. Domain configuration is
 * deliberately explicit: no fictional public destination is published.
 */
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve, relative, join, dirname, extname } from 'node:path';

const source = resolve('dist');
const input = join(source, 'kii');
const output = resolve('dist-kii');
const setouchiBase = '/setouchi-cultural-economic-atlas/';
const kiiBase = setouchiBase + 'kii/';
const origin = process.env.KII_PUBLIC_ORIGIN?.replace(/\/$/, '') || '';
if (origin && !/^https:\/\/[^/]+$/.test(origin)) {
  throw new Error('KII_PUBLIC_ORIGIN must be a bare HTTPS origin, without a path');
}
if (origin && !process.env.KII_LAUNCH_APPROVED) {
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
  // The KII-specific base must be replaced BEFORE the broader asset base.
  let transformed = content.split(kiiBase).join('/');
  // Shared, fingerprinted Astro assets live at the site's own root.
  transformed = transformed.split(setouchiBase + '_astro/').join('/_astro/');
  // The host's canonical and social URL must not point to SETOUCHI.
  const oldHost = 'https://fantactics.github.io';
  transformed = transformed.split(oldHost + kiiBase).join((origin || 'https://preview.invalid') + '/');
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

// No Search Console submission or indexing until the editorial launch.
// Do not re-use the SETOUCHI sitemap on the KII origin.
await writeFile(join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
await writeFile(join(output, '.nojekyll'), '');
await writeFile(join(output, 'BUILD_INFO.txt'),
  'KII ATLAS standalone bundle\n' +
  'Origin: ' + (origin || 'unconfigured preview') + '\n' +
  'Status: noindex (prelaunch)\n' +
  'Source: shared ATLAS monorepo\n');
const homepage = await readFile(join(output, 'index.html'), 'utf8');
for (const required of ['KII ATLAS','noindex,follow','href="/"']) {
  if (!homepage.includes(required)) throw new Error('Missing ' + required + ' in KII homepage');
}
if (homepage.includes('setouchi-sushi-not-nigiri')) throw new Error('SETOUCHI article leaked into KII bundle');
console.log('Standalone KII bundle created at dist-kii/; KII remains unindexed.');
