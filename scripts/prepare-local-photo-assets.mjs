// Mirror openly licensed PHOTO ESSAY images at deployment time so visitors
// are not dependent on Wikimedia Commons / an image proxy at page-view time.
// Only an image that downloads and passes basic validation is rewritten.
// Existing source links, attribution, and licenses remain in the page HTML.
import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = path.resolve('dist');
const rootAssets = path.join(root, 'images', 'essay-photo');
await mkdir(rootAssets, { recursive: true });

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(file);
    else if (entry.isFile() && file.endsWith('.html')) yield file;
  }
}

const pages = [];
const urls = new Set();
// Image tags created by EssayPhotoGallery have a dedicated data attribute.
for await (const file of walk(root)) {
  const html = await readFile(file, 'utf8');
  pages.push({file,html});
  for (const match of html.matchAll(/<img\b[^>]*\bdata-photo-essay-img\b[^>]*>/gi)) {
    const src = match[0].match(/\bsrc="([^"]+)"/i)?.[1]?.replaceAll('&amp;', '&');
    if (src && /^https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//.test(src)) urls.add(src);
  }
}
console.log(`PHOTO ESSAY asset mirror: ${urls.size} distinct Commons images across ${pages.length} HTML pages`);

function candidates(src) {
  const original = new URL(src);
  original.searchParams.delete('width');
  const resized = new URL(original.href);
  resized.searchParams.set('width', '960');
  const proxy = new URL('https://wsrv.nl/');
  proxy.searchParams.set('url', original.href);
  proxy.searchParams.set('w', '960');
  return [...new Set([resized.href, original.href, proxy.href])];
}
const headers = {
  'User-Agent': 'SETOUCHI-ATLAS/1.0 (https://github.com/fantactics/setouchi-cultural-economic-atlas; editorial photo cache)',
  'Accept': 'image/avif,image/webp,image/jpeg,image/png,image/*;q=0.8'
};
async function download(src) {
  for (const candidate of candidates(src)) {
    for (let attempt=1; attempt<=2; attempt++) {
      try {
        const response=await fetch(candidate,{headers,signal:AbortSignal.timeout(16000)});
        if (!response.ok) throw Error(`HTTP ${response.status}`);
        const type=(response.headers.get('content-type')||'').split(';')[0].trim().toLowerCase();
        const formats={'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp','image/avif':'.avif','image/gif':'.gif'};
        const extension=formats[type];
        if (!extension) throw Error(`Invalid content type ${type}`);
        const bytes=Buffer.from(await response.arrayBuffer());
        if (bytes.length<800 || bytes.length>8*1024*1024) throw Error(`Invalid size ${bytes.length}`);
        const hash=createHash('sha256').update(src).digest('hex').slice(0,20);
        const name=hash+extension;
        await writeFile(path.join(rootAssets,name),bytes);
        return '/images/essay-photo/'+name;
      } catch (error) {
        if (attempt===2) console.warn(`Image fetch failed: ${error.message} (${candidate.slice(0,110)})`);
      }
    }
  }
  return null;
}
const items=[...urls];
const local=new Map();
let next=0;
async function worker(){
  while(next<items.length){
    const src=items[next++];
    const result=await download(src);
    if(result) local.set(src,result);
  }
}
await Promise.all(Array.from({length:5},()=>worker()));
let edited=0;
for (const {file,html} of pages) {
  const updated=html.replace(/<img\b[^>]*\bdata-photo-essay-img\b[^>]*>/gi,tag=>{
    return tag.replace(/\bsrc="([^"]+)"/i,(match,escaped)=>{
      const url=escaped.replaceAll('&amp;','&');
      return local.has(url)?'src="'+local.get(url)+'"':match;
    });
  });
  if(updated!==html){await writeFile(file,updated,'utf8');edited++;}
}
console.log(`PHOTO ESSAY: mirrored ${local.size}/${urls.size} images; updated ${edited} HTML files.`);
if(local.size===0 && urls.size>0) console.warn('No Commons images could be mirrored: all PHOTO ESSAY images retain browser fallbacks.');

// Original explicitly approved photo mirror, used outside PHOTO ESSAY as well.
const approved={
  url:'https://upload.wikimedia.org/wikipedia/commons/1/16/Mitsuhama-Port_on_inside%28Matsuyama_City%29.JPG',
  destination:path.join(rootAssets,'mitsuhama-port-inside-jyo81.jpg')
};
try{
  const response=await fetch(approved.url,{headers,signal:AbortSignal.timeout(16000)});
  if(!response.ok) throw Error('HTTP '+response.status);
  const bytes=Buffer.from(await response.arrayBuffer());
  if(bytes.length<20000) throw Error('Image too small');
  await writeFile(approved.destination,bytes);
}catch(e){console.warn('Approved Mitsuhama photo mirror unavailable: '+e.message);}
