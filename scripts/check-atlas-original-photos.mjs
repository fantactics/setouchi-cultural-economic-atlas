// Validate locally published ATLAS original photos before deployment.
// Supports normal Markdown image syntax and semantic HTML <figure> images.
// No external API or paid service is used.
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const contentDir = path.join(root, 'src/content/essays');
const prefix = '/setouchi-cultural-economic-atlas/';
const imagePathPrefix = prefix + 'images/atlas-original/';
const errors = [];
let checked = 0;

function photoReferences(source) {
  const found = [];
  for (const m of source.matchAll(/!\[([^\]\n]*)\]\((\/setouchi-cultural-economic-atlas\/images\/atlas-original\/[^\s)]+)\)/g)) {
    found.push({ alt:m[1], url:m[2] });
  }
  for (const m of source.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const src = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!src?.startsWith(imagePathPrefix)) continue;
    const alt = tag.match(/\balt\s*=\s*["']([^"']*)["']/i)?.[1] || '';
    found.push({ alt, url:src });
  }
  return found;
}

const files = (await readdir(contentDir)).filter(name => name.endsWith('.md'));
for (const file of files) {
  const source = await readFile(path.join(contentDir, file), 'utf8');
  for (const {alt,url} of photoReferences(source)) {
    checked++;
    if (!alt.trim()) errors.push(`${file}: missing alt text for ${url}`);
    const rel = url.slice(prefix.length);
    const local = path.resolve(root, 'public', rel);
    const publicRoot = path.resolve(root, 'public');
    if (!local.startsWith(publicRoot + path.sep)) {
      errors.push(`${file}: unsafe image URL ${url}`);
      continue;
    }
    try {
      const info = await stat(local);
      if (!info.isFile() || info.size < 100) errors.push(`${file}: image empty or invalid: ${url}`);
      if (info.size > 3 * 1024 * 1024) errors.push(`${file}: image larger than 3 MiB: ${url}`);
      if (local.toLowerCase().endsWith('.webp')) {
        const bytes = await readFile(local);
        if (bytes.toString('ascii',0,4) !== 'RIFF' || bytes.toString('ascii',8,12) !== 'WEBP') {
          errors.push(`${file}: not a valid WebP header: ${url}`);
        }
      }
    } catch {
      errors.push(`${file}: missing published image: ${url}`);
    }
  }
}
console.log(`Checked ${checked} local ATLAS photo reference(s) in ${files.length} essay(s).`);
if (errors.length) {
  console.error(errors.map(s => '- '+s).join('\n'));
  process.exit(1);
}
