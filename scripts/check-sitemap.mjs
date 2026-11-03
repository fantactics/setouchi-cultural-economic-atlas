// Run after Astro builds, before publishing to GitHub Pages.
// Verify that both common sitemap entry points and their indexed page URLs
// are present at the actual repository subpath used by the public site.
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const base = 'https://fantactics.github.io/setouchi-cultural-economic-atlas/';
const expected = ['sitemap.xml', 'sitemap-index.xml', 'sitemap-0.xml', 'robots.txt'];

for (const file of expected) {
  assert.ok(existsSync(path.join(dist, file)), `Missing generated output: ${file}`);
}

const read = (file) => readFileSync(path.join(dist, file), 'utf8');
const xmlLocs = (xml) => [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => match[1]);

const conventional = read('sitemap.xml');
const index = read('sitemap-index.xml');
const pages = read('sitemap-0.xml');
const robots = read('robots.txt');

assert.match(conventional, /<sitemapindex\b/, 'sitemap.xml must be an XML sitemap index');
assert.deepEqual(xmlLocs(conventional), [`${base}sitemap-0.xml`], 'sitemap.xml target must be canonical');
assert.match(index, /<sitemapindex\b/, 'Astro should generate a sitemap index');
assert.ok(xmlLocs(index).includes(`${base}sitemap-0.xml`), 'Astro sitemap index must include the page URL set');
assert.match(pages, /<urlset\b/, 'Astro should generate a page URL sitemap');
const urls = xmlLocs(pages);
assert.ok(urls.length >= 60, `Unexpectedly few sitemap URLs: ${urls.length}`);
assert.ok(urls.every((url) => url.startsWith(base)), 'Sitemap must not escape the GitHub Pages project path');
assert.ok(urls.some((url) => url.includes('/book/setouchi-sushi-not-nigiri/')), 'A known essay URL must be indexed');
assert.ok(urls.some((url) => url.includes('/book/')), 'The essay index must be included');
assert.ok(robots.includes(`Sitemap: ${base}sitemap.xml`), 'robots.txt and sitemap entry point differ');

console.log(`Sitemap verification passed: ${urls.length} URLs, correct GitHub Pages project path, both XML entry points.`);
