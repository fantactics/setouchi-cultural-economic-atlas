// Publishing boundary: KII has its own Cloudflare Pages site.
// After KII is independently packaged from the combined Astro build,
// remove its preview subtree from the SETOUCHI GitHub Pages artifact.
// This preserves the KII standalone bundle, source files, and SETOUCHI pages.
import { access, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const kiiBundle = resolve('dist-kii');
const required = [
  join(dist, 'index.html'),
  join(dist, 'book', 'index.html'),
  join(kiiBundle, 'index.html')
];
for (const path of required) await access(path);

await rm(join(dist, 'kii'), { recursive: true, force: true });
try {
  await access(join(dist, 'kii'));
  throw new Error('KII is still present in SETOUCHI GitHub Pages output');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

for (const path of required) await access(path);
console.log('SETOUCHI deployment excludes /kii/; standalone KII bundle remains intact.');
