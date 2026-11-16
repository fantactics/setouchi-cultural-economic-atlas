// Avoid fragile runtime hotlinking for licensed third-party PHOTO ESSAY images.
// This is run only for SETOUCHI's GitHub Pages artifact, after the KII bundle
// is already generated. License/attribution remain in the corresponding data.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const images = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Mitsuhama-Port_on_inside%28Matsuyama_City%29.JPG',
    destination: 'dist/images/essay-photo/mitsuhama-port-inside-jyo81.jpg'
  }
];

for (const image of images) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(image.url, {
        headers: { 'User-Agent': 'SETOUCHI-ATLAS/1.0 (GitHub Pages cultural-education photo preservation; https://github.com/fantactics/setouchi-cultural-economic-atlas)' },
        signal: AbortSignal.timeout(30000)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const type = response.headers.get('content-type') || '';
      if (!type.startsWith('image/')) throw new Error(`Expected image: ${type}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 20000) throw new Error(`File too small: ${bytes.length}`);
      await mkdir(path.dirname(image.destination), { recursive: true });
      await writeFile(image.destination, bytes);
      console.log(`Downloaded ${image.destination} (${bytes.length} bytes)`);
      lastError = null;
      break;
    } catch (error) {
      lastError = error;
      console.warn(`Photo download attempt ${attempt}/3 failed: ${error.message}`);
    }
  }
  if (lastError) throw new Error(`Unable to mirror ${image.url}: ${lastError.message}`);
}
