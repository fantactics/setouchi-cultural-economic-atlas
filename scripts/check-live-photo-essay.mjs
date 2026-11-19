// Validate PHOTO ESSAY delivery on ALL published pages, not a small sample.
// This runs on the GitHub runner after deployment and checks HTTP, MIME, bytes
// and file signature for every distinct gallery image.
import assert from 'node:assert/strict';
const origin='https://setouchi-atlas.pia2.org';
const wait=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
async function stableFetch(url,options={}){
  let response;
  for(let attempt=0;attempt<4;attempt++){
    response=await fetch(url,options);
    if(![429,500,502,503,504].includes(response.status))return response;
    console.warn('TEMPORARY HTTP FAILURE',response.status,String(url),'attempt',attempt+1);
    if(attempt<3)await wait(600*(attempt+1));
  }
  return response;
}
const response=await stableFetch(origin+'/photo-health.json',{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});
assert.equal(response.status,200,'Public photo-health report missing');
const report=await response.json();
const pages=report.galleryPages || [];
assert.ok(pages.length>=35,`Gallery audit unexpectedly short: ${pages.length}`);
console.log('LIVE PHOTO ESSAY AUDIT',JSON.stringify({pages:pages.length,buildWikimediaImages:report.total,buildMirrored:report.locallyHosted,unsupported:report.unsupportedRemote}));
const decode=(src)=>src.replaceAll('&amp;','&').replaceAll('&#38;','&');
const urls=new Map();
const failures=[];
let pageCount=0;
async function pool(items,threads,fn){
  let next=0;
  await Promise.all(Array.from({length:threads},async()=>{
    while(next<items.length){ const index=next++;await fn(items[index]);}
  }));
}
await pool(pages,3,async p=>{
  try {
    const res=await stableFetch(new URL(p,origin),{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});
    if(!res.ok){failures.push(`PAGE HTTP ${res.status} ${p}`);return;}
    const html=await res.text();
    const imgs=[...html.matchAll(/<img\b[^>]*\bdata-photo-essay-img\b[^>]*>/gi)]
      .map(x=>decode(x[0].match(/\bsrc="([^"]+)"/i)?.[1]||'')).filter(Boolean);
    if(!imgs.length)failures.push(`No gallery images found on ${p}`);
    for(const src of imgs){
      const full=new URL(src,origin).href;
      if(!urls.has(full))urls.set(full,[]);
      urls.get(full).push(p);
    }
    pageCount++;
  }catch(e){failures.push(`PAGE ERROR ${p}: ${String(e)}`);}
});
let checked=0,pass=0;
await pool([...urls.keys()],4,async url=>{
  checked++;
  try {
    const res=await stableFetch(url,{signal:AbortSignal.timeout(25000)});
    const bytes=Buffer.from(await res.arrayBuffer());
    const type=res.headers.get('content-type')||'';
    const valid=(
      (bytes[0]===255&&bytes[1]===216&&bytes[2]===255) ||
      bytes.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex')) ||
      (bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP') ||
      bytes.toString('ascii',4,12).includes('ftypavif') ||
      bytes.toString('ascii',0,6)==='GIF87a' ||
      bytes.toString('ascii',0,6)==='GIF89a'
    );
    if(!res.ok || !type.startsWith('image/') || bytes.length<800 || !valid)
      throw Error(`HTTP ${res.status}; type ${type}; bytes ${bytes.length}; magic=${valid}`);
    pass++;
  }catch(e){failures.push(`IMAGE ${url} pages=${urls.get(url).join(',')} error=${String(e)}`);}
});
console.log('LIVE PHOTO ESSAY RESULT',JSON.stringify({pages:pageCount,uniqueImages:checked,passed:pass,failed:failures.length}));
for(const f of failures)console.error('LIVE PHOTO ESSAY FAILURE',f);
assert.equal(failures.length,0,'One or more public PHOTO ESSAY images failed HTTP/image validation');
