// Mobile navigation smoke test on the published custom-domain site.
// Run after deployment, using Chrome already installed in the GitHub Actions runner.
import puppeteer from 'puppeteer-core';
import { access } from 'node:fs/promises';

const candidates=['/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium','/usr/bin/chromium-browser'];
let chrome;
for(const name of candidates){try{await access(name);chrome=name;break;}catch{}}
if(!chrome)throw Error('No Chrome executable for mobile navigation check');
const base='https://setouchi-atlas.pia2.org';
const checks=[
  ['/', '初めての3篇'],
  ['/book/', '今日は、どの瀬戸内へ？'],
  ['/book/nature/', '風景の「なんで？」を探そう。'],
  ['/book/culture/', '文化・風習から、瀬戸内を読む。'],
  ['/book/kojima-from-cotton-to-jeans/', 'この風景から、次の問いへ。']
];
const browser=await puppeteer.launch({executablePath:chrome,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const errors=[];
try {
  for (const [pathname,headline] of checks){
    const page=await browser.newPage();
    await page.setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true});
    const res=await page.goto(base+pathname,{waitUntil:'domcontentloaded',timeout:45000});
    const state=await page.evaluate((expected)=>({
      expected:document.body.textContent.includes(expected),
      overflow:document.documentElement.scrollWidth>window.innerWidth+4,
      width:document.documentElement.scrollWidth,
      viewport:window.innerWidth,
      links:[...document.querySelectorAll('main a[href*="/book/"]')].length
    }),headline);
    if(res?.status()!==200 || !state.expected || state.overflow || state.links===0)
      errors.push({pathname,http:res?.status(),...state});
    console.log('MOBILE NAV',pathname,JSON.stringify({http:res?.status(),...state}));
    if(pathname==='/'){
      const input=await page.$('.atlas-search-input');
      if(!input)errors.push({pathname,reason:'search input missing'});
      else {
        await input.type('児島');
        const found=await page.waitForFunction(()=>document.querySelectorAll('.atlas-search-results a').length>0,{timeout:8000}).then(()=>true).catch(()=>false);
        const match=found && await page.$eval('.atlas-search-results',el=>el.textContent.includes('児島'));
        if(!match)errors.push({pathname,reason:'search did not return Kojima essays'});
        console.log('MOBILE SEARCH 児島',match?'PASS':'FAIL');
      }
    }
    await page.close();
  }
} finally {await browser.close();}
if(errors.length){console.error('Mobile navigation failures',JSON.stringify(errors));process.exitCode=1;}
else console.log('Mobile navigation: 5 routes and homepage search passed.');
