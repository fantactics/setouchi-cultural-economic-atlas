// Post-deploy test: verify the public HTML and its actual PHOTO ESSAY
// image URLs, not merely that the build downloaded source images.
import assert from 'node:assert/strict';

const origin = 'https://setouchi-atlas.pia2.org';
const paths = [
  '/book/matsuyama-three-centers-one-city/',
  '/book/kojima-jeans-circular-economy/',
  '/book/hijiki-tidal-time/',
  '/book/what-cyclists-leave-behind/'
];
const timeout = (ms=20000) => AbortSignal.timeout(ms);
const htmlDecode = (s) => s.replaceAll('&amp;','&').replaceAll('&#38;','&');
let inspected = 0, successful = 0, failed = 0;
for (const pagePath of paths) {
  const url = origin + pagePath;
  const page = await fetch(url, {headers:{'Cache-Control':'no-cache'}, signal:timeout()});
  const html = await page.text();
  console.log('LIVE PAGE',page.status,url,'bytes',html.length);
  assert.equal(page.status,200,`Public page not HTTP 200: ${url}`);
  const images = [...html.matchAll(/<img\b[^>]*data-photo-essay-img[^>]*>/gi)]
    .map(match=>htmlDecode(match[0].match(/\bsrc="([^"]+)"/i)?.[1]||''))
    .filter(Boolean);
  console.log('LIVE PHOTO ESSAY',pagePath,images.length,images);
  assert.ok(images.length>0,`No PHOTO ESSAY photos found in public HTML: ${pagePath}`);
  for (const src of images) {
    inspected++;
    const imageUrl = new URL(src,origin);
    try {
      const res = await fetch(imageUrl, {signal:timeout()});
      const bytes = Buffer.from(await res.arrayBuffer());
      const type = res.headers.get('content-type')||'';
      const signatureOk = (
        (bytes[0]===0xff && bytes[1]===0xd8 && bytes[2]===0xff) ||
        (bytes.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex'))) ||
        (bytes.toString('ascii',0,4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP') ||
        (bytes.toString('ascii',4,12).includes('ftypavif')) ||
        (bytes.toString('ascii',0,6)==='GIF87a') || (bytes.toString('ascii',0,6)==='GIF89a')
      );
      const ok=res.ok&&type.startsWith('image/')&&bytes.length>800&&signatureOk;
      if(ok)successful++; else failed++;
      console.log(ok?'LIVE IMAGE OK':'LIVE IMAGE BAD',res.status,type,bytes.length,imageUrl.href);
    } catch(e) {
      failed++;console.log('LIVE IMAGE FAILED',String(e),imageUrl.href);
    }
  }
}
console.log('LIVE PHOTO ESSAY SUMMARY',JSON.stringify({inspected,successful,failed}));
assert.equal(failed,0,'Public PHOTO ESSAY images have failed delivery checks');
