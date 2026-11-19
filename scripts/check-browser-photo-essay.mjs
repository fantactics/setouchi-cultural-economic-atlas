// Mobile Chrome smoke test of PHOTO ESSAY rendering, beyond HTTP-only checks.
import puppeteer from 'puppeteer-core';
import {mkdir,access} from 'node:fs/promises';
const candidates=['/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium','/usr/bin/chromium-browser'];
let chrome=null;
for(const f of candidates){try{await access(f);chrome=f;break;}catch{}}
if(!chrome)throw Error('Chrome browser unavailable in GitHub hosted runner');
await mkdir('photo-essay-browser-check',{recursive:true});
const browser=await puppeteer.launch({
  executablePath:chrome,headless:true,
  args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']
});
const slugs=[
  'matsuyama-three-centers-one-city',
  'kojima-jeans-circular-economy',
  'what-cyclists-leave-behind',
  'hijiki-tidal-time'
];
const failures=[];
try{
  for(const slug of slugs){
    const page=await browser.newPage();
    await page.setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true});
    page.on('pageerror',error=>console.warn('BROWSER JS ERROR',slug,error.message));
    page.on('response',response=>{
      if(response.status()>=400&&/essay-photo|book\//.test(response.url()))
        console.warn('BROWSER HTTP ERROR',slug,response.status(),response.url());
    });
    const url='https://setouchi-atlas.pia2.org/book/'+slug+'/';
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
    await page.waitForSelector('.essay-photo-gallery img[data-photo-essay-img]',{timeout:20000});
    const count=await page.$$eval('.essay-photo-gallery img[data-photo-essay-img]',nodes=>nodes.length);
    for(let i=0;i<count;i++){
      await page.evaluate(index=>{
        document.querySelectorAll('.essay-photo-gallery img[data-photo-essay-img]')[index]
          ?.scrollIntoView({block:'center',behavior:'instant'});
      },i);
      try{
        await page.waitForFunction(index=>{
          const img=document.querySelectorAll('.essay-photo-gallery img[data-photo-essay-img]')[index];
          return img && img.complete && img.naturalWidth>0;
        },{timeout:18000,polling:400},i);
      }catch(error){console.warn('BROWSER PHOTO WAIT FAILED',slug,i,error.message);}
    }
    const states=await page.$$eval('.essay-photo-gallery img[data-photo-essay-img]',imgs=>imgs.map(img=>({
      src:img.currentSrc||img.src,complete:img.complete,naturalWidth:img.naturalWidth,
      hidden:img.hidden,display:getComputedStyle(img).display,
      rectWidth:Math.round(img.getBoundingClientRect().width),
      rectHeight:Math.round(img.getBoundingClientRect().height)
    })));
    const passed=states.every(s=>s.complete && s.naturalWidth>0 && !s.hidden && s.display!=='none' && s.rectWidth>0 && s.rectHeight>0);
    console.log('BROWSER PHOTO ESSAY',slug,passed?'PASS':'FAIL',JSON.stringify(states));
    await page.screenshot({path:'photo-essay-browser-check/'+slug+'.png',fullPage:false});
    if(!passed)failures.push(slug);
    await page.close();
  }
} finally {await browser.close();}
console.log('BROWSER PHOTO ESSAY SUMMARY',JSON.stringify({tested:slugs.length,failed:failures}));
if(failures.length)process.exitCode=1;
