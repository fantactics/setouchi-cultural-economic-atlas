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

  // The article lead is a direct sibling of the reading column, not a child.
  // Check both viewport classes so an inherited margin reset cannot shift it
  // to the left while the header and article body remain centred.
  for (const width of [390,1280]){
    const page=await browser.newPage();
    await page.setViewport({width,height:850,deviceScaleFactor:1});
    const pathname='/book/kojima-from-cotton-to-jeans/';
    const res=await page.goto(base+pathname,{waitUntil:'domcontentloaded',timeout:45000});
    const geometry=await page.evaluate(()=>{
      const lead=document.querySelector('.book-article-dek.reader-essay-opening-lead');
      const wrapper=document.querySelector('article.book-article');
      if(!lead || !wrapper)return {found:false};
      const a=lead.getBoundingClientRect();
      const b=wrapper.getBoundingClientRect();
      return {found:true,leadLeft:a.left,leadRight:a.right,leadWidth:a.width,
        articleCenter:b.left+b.width/2,leadCenter:a.left+a.width/2,
        marginLeft:getComputedStyle(lead).marginLeft,
        marginRight:getComputedStyle(lead).marginRight};
    });
    const centered=geometry.found && Math.abs(geometry.articleCenter-geometry.leadCenter)<4;
    if(res?.status()!==200 || !centered)errors.push({pathname,width,http:res?.status(),geometry,reason:'essay opening lead not centred'});
    console.log('ESSAY LEAD ALIGNMENT',width,centered?'PASS':'FAIL',JSON.stringify(geometry));
    await page.close();
  }
} finally {await browser.close();}
if(errors.length){console.error('Mobile navigation failures',JSON.stringify(errors));process.exitCode=1;}
else console.log('Mobile navigation: 5 routes and homepage search passed.');
