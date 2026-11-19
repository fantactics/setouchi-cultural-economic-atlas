// Mirror openly licensed Wikimedia images from PHOTO ESSAY galleries, article
// heroes, image index cards and inline essays at deployment time.
// Only an image that downloads and passes basic validation is rewritten.
// Existing source links, attribution, and licenses remain in the page HTML.
import { mkdir, readFile, writeFile, readdir, copyFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = path.resolve('dist');
const rootAssets = path.join(root, 'images', 'essay-photo');
await mkdir(rootAssets, { recursive: true });
const cacheAssets=path.resolve('.photo-cache/assets');
const cacheManifest=path.resolve('.photo-cache/manifest.json');
await mkdir(cacheAssets,{recursive:true});
let previous={};
try { previous=JSON.parse(await readFile(cacheManifest,'utf8')); } catch {}
const cacheAvailable=async (filename)=>{
  if (!/^[a-f0-9]{20}\.(jpg|png|webp|avif|gif)$/.test(filename)) return false;
  const info=await stat(path.join(cacheAssets,filename)).catch(()=>null);
  return Boolean(info?.isFile() && info.size>800 && info.size<8*1024*1024);
};

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(file);
    else if (entry.isFile() && file.endsWith('.html')) yield file;
  }
}

const pages = [];
const urls = new Set();
const unsupportedRemote = new Set();
const galleryPages = new Set();
// Include both Commons Special:FilePath and direct upload.wikimedia.org image
// addresses. Earlier audits silently missed the latter, yielding false 112/112.
function isMirrorable(url) {
  try {
    const parsed=new URL(url);
    return (parsed.hostname==='commons.wikimedia.org' && parsed.pathname.startsWith('/wiki/Special:FilePath/'))
      || (parsed.hostname==='upload.wikimedia.org' && parsed.pathname.startsWith('/wikipedia/commons/'));
  } catch { return false; }
}
for await (const file of walk(root)) {
  const html = await readFile(file, 'utf8');
  pages.push({file,html});
  const tags=[...html.matchAll(/<img\b[^>]*\bdata-photo-essay-img\b[^>]*>/gi)];
  if(tags.length) galleryPages.add('/'+path.relative(root,file).replace(/index\.html$/,'').split(path.sep).join('/'));
  for (const match of tags) {
    const src = match[0].match(/\bsrc="([^"]+)"/i)?.[1]?.replaceAll('&amp;', '&')?.replaceAll('&#38;','&');
    if(!src) continue;
    if(isMirrorable(src)) urls.add(src);
    else if(/^https?:\/\//.test(src)) unsupportedRemote.add(src);
  }
  // PHOTO ESSAY-only matching missed hero photos, card covers and inline shots.
  // Mirror every Commons <img>, while retaining the PHOTO ESSAY page inventory.
  for (const tag of html.matchAll(/<img\b[^>]*>/gi)) {
    const src=tag[0].match(/\bsrc="([^"]+)"/i)?.[1]?.replaceAll('&amp;','&')?.replaceAll('&#38;','&');
    if(src && isMirrorable(src)) urls.add(src);
  }
}
console.log(`Site-wide Wikimedia photo mirror: ${urls.size} image URLs; ${galleryPages.size} PHOTO ESSAY gallery pages`);
if(unsupportedRemote.size) console.warn('PHOTO ESSAY unsupported external URLs:', [...unsupportedRemote]);

function candidates(src) {
  const original=new URL(src);
  const isSpecial=original.hostname==='commons.wikimedia.org';
  let canonical, resized=null, filepath=null;
  if(isSpecial){
    const filename=decodeURIComponent(original.pathname.slice('/wiki/Special:FilePath/'.length)).replaceAll(' ','_');
    const digest=createHash('md5').update(filename).digest('hex');
    canonical='https://upload.wikimedia.org/wikipedia/commons/'+digest[0]+'/'+digest.slice(0,2)+'/'+filename.split('/').map(encodeURIComponent).join('/');
    const thumb=new URL(original.href);
    thumb.searchParams.set('width','960');
    resized=thumb.href;
  } else {
    canonical=original.href;
    const filename=decodeURIComponent(original.pathname.slice(original.pathname.lastIndexOf('/')+1));
    filepath='https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(filename)+'?width=960';
  }
  const proxy=new URL('https://wsrv.nl/');
  proxy.searchParams.set('url',canonical);
  proxy.searchParams.set('w','960');
  const proxyAlternate=new URL('https://images.weserv.nl/');
  proxyAlternate.searchParams.set('url',canonical);
  proxyAlternate.searchParams.set('w','960');
  return [...new Set([resized,canonical,proxy.href,proxyAlternate.href,filepath,original.href].filter(Boolean))];
}
const headers = {
  'User-Agent': 'SETOUCHI-ATLAS/1.0 (https://github.com/fantactics/setouchi-cultural-economic-atlas; editorial photo cache)',
  'Accept': 'image/avif,image/webp,image/jpeg,image/png,image/*;q=0.8'
};
async function download(src) {
  for (const candidate of candidates(src)) {
    for (let attempt=1; attempt<=1; attempt++) {
      try {
        const response=await fetch(candidate,{headers,signal:AbortSignal.timeout(7000)});
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
        await writeFile(path.join(cacheAssets,name),bytes);
        return '/images/essay-photo/'+name;
      } catch (error) {
        if (attempt===1) console.warn(`Image fetch failed: ${error.message} (${candidate.slice(0,110)})`);
      }
    }
  }
  return null;
}
const items=[...urls];
const local=new Map();
const pending=[];
for(const src of items){
  const name=previous[src];
  if(name && await cacheAvailable(name)){
    await copyFile(path.join(cacheAssets,name),path.join(rootAssets,name));
    local.set(src,'/images/essay-photo/'+name);
  } else pending.push(src);
}
console.log(`PHOTO ESSAY cache: reused ${local.size} previously downloaded images; attempting ${pending.length} new downloads.`);
let next=0;
async function worker(){
  while(next<pending.length){
    const src=pending[next++];
    const result=await download(src);
    if(result) local.set(src,result);
  }
}
await Promise.all(Array.from({length:3},()=>worker()));
const manifest={};
for(const [src,url] of local) manifest[src]=path.basename(url);
await writeFile(cacheManifest,JSON.stringify(manifest,null,2)+'\n','utf8');
let edited=0;
for (const {file,html} of pages) {
  const updated=html.replace(/<img\b[^>]*>/gi,tag=>{
    return tag.replace(/\bsrc="([^"]+)"/i,(match,escaped)=>{
      const url=escaped.replaceAll('&amp;','&');
      return local.has(url)?'src="'+local.get(url)+'"':match;
    });
  });
  if(updated!==html){await writeFile(file,updated,'utf8');edited++;}
}
console.log(`Site-wide photos: mirrored ${local.size}/${urls.size} images; updated ${edited} HTML files.`);
console.log(`PHOTO ESSAY unresolved: ${items.length-local.size} Wikimedia images; unsupported remote: ${unsupportedRemote.size}`);
const unresolved=items.filter(src=>!local.has(src));
const affectedPages=pages.flatMap(({file,html})=>{
  const blocked=unresolved.filter(src=>html.includes(src.replaceAll('&','&amp;'))||html.includes(src));
  return blocked.length ? [{page:'/'+path.relative(root,file).replace(/index\.html$/,'').split(path.sep).join('/'),unresolved:blocked.length,images:blocked}] : [];
});
await writeFile(path.join(root,'photo-health.json'),JSON.stringify({
  generatedAt:new Date().toISOString(),
  total:items.length,
  locallyHosted:local.size,
  unresolved:unresolved.length,
  affectedPages,
  galleryPages:[...galleryPages],
  unsupportedRemote:[...unsupportedRemote]
},null,2)+'\n','utf8');
console.log(`PHOTO ESSAY health report: ${affectedPages.length} page(s) with unresolved photos.`);
for(const entry of affectedPages) console.warn(`PHOTO ESSAY missing: ${entry.page} (${entry.unresolved} image(s))`);
if(local.size===0 && urls.size>0) console.warn('No Commons images could be mirrored: all PHOTO ESSAY images retain browser fallbacks.');

// All article and gallery Wikimedia photographs are now handled by the same
// cached site-wide mirroring pass; no hardcoded local photo URL is required.
