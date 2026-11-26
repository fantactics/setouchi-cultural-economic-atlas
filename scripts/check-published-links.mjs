// Validate public editorial routes and curated entry links before deployment.
// Unlike link checks that only inspect frontmatter, this checks actual built HTML.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { storyOrder } from '../src/data/bookArticles.js';

const dist=path.resolve('dist');
const legacy='/setouchi-cultural-economic-atlas/';
const collection='collections/salt-afterlife';
const collectionEssays=[
  'ako-after-salt-fields',
  'iwagi-salt-pans-to-shrimp-ponds',
  'imabari-why-shipbuilding',
  'takehara-salt-capital-to-townscape',
  'sakaide-salt-fields-to-industry',
  'kinkai-salt-field-to-solar'
];
const requiredSlugs=[...new Set([...storyOrder,...collectionEssays])];
assert.equal(new Set(storyOrder).size,storyOrder.length,'Duplicate slug in published storyOrder');

const built=(pathname)=>path.join(dist,pathname,'index.html');
const assertPage=(pathname)=>{
  const file=built(pathname);
  assert.ok(existsSync(file),`Published page missing: /${pathname}/ (check storyOrder/getStaticPaths)`);
  return readFileSync(file,'utf8');
};
for(const slug of requiredSlugs) assertPage('book/'+slug);
// Retain the research draft in source control but do not publish its route.
assert.ok(!existsSync(built('book/kada-sea-bream-distribution-ecosystem')), 'Unverified Kada live-holding draft must remain unpublished');
for(const slug of ['fish-waste-to-feed-and-citrus','citrus-pomace-cascade']) assert.ok(!existsSync(built('book/'+slug)), 'Withdrawn essay still published: '+slug);
for(const route of ['collections/port-towns','book/ports-that-needed-waiting']){
  const retired=assertPage(route);
  assert.ok(retired.includes('noindex,follow') && retired.includes('https://setouchi-atlas.pia2.org/book/'), 'Retired port page must forward to essay index: '+route);
}
const publicEssayIndex=assertPage('book');
assert.ok(!publicEssayIndex.includes('/collections/port-towns/') && !publicEssayIndex.includes('特集 · PORT TOWNS'), 'Retired port feature still promoted');
assert.ok(publicEssayIndex.includes('/collections/salt-afterlife/'), 'Salt feature must remain discoverable');
const retiredSaltHtml=assertPage('book/four-salt-fields');
assert.ok(retiredSaltHtml.includes('noindex,follow') && retiredSaltHtml.includes('/collections/salt-afterlife/'), 'Retired salt essay must be a redirect to the collection');
assert.ok(!retiredSaltHtml.includes('markdown-essay-body'), 'Retired salt essay still contains article body');
const onomichiPage=assertPage('book/onomichi-capital-to-culture-and-ships');
const schematic='images/editorial/onomichi-joshoji-section.svg';
const joshojiPhoto='images/atlas-original/joshoji-crossing-onomichi.avif';
assert.ok(existsSync(path.join(dist,schematic)), 'Onomichi explanatory SVG did not reach built site');
assert.ok(existsSync(path.join(dist,joshojiPhoto)), 'Approved Onomichi No.3199 photo not in built site');
assert.ok(onomichiPage.includes('onomichi-joshoji-section.svg'), 'Onomichi page lost its section schematic');
assert.ok(onomichiPage.includes('joshoji-crossing-onomichi.avif'), 'Onomichi essay lost the approved crossing photograph');
assert.ok(onomichiPage.includes('距離・高低差'), 'Onomichi schematic lacks schematic-accuracy disclaimer');


// Readers should encounter the approved cover before the narrative lead,
// and the article hero must agree with its verified discovery-card image.
for(const [slug,fileHint] of [
  ['oysters-taste-of-small-seas','Grilled%20oysters'],
  ['tai-meshi-two-seas','Uwajima%20Taimeshi'],
  ['what-cyclists-leave-behind','Shimanami-expressway']
]){
  const html=assertPage('book/'+slug);
  const heroIndex=html.indexOf('class="book-hero-photo"');
  const leadIndex=html.indexOf('class="book-article-dek reader-essay-opening-lead"');
  assert.ok(heroIndex>=0 && leadIndex>heroIndex,`Essay opening order is incorrect: ${slug}`);
  assert.ok(html.slice(heroIndex,heroIndex+700).includes(fileHint),`Article hero differs from verified discovery cover: ${slug}`);
}

// The island harvesting essay must not accidentally present an Okinawa photo
// as its regional cover. Its licensed species photograph is shared with its article.
const hijikiPage=assertPage('book/hijiki-tidal-time');
const hijikiHero=hijikiPage.indexOf('class="book-hero-photo"');
assert.ok(hijikiHero>=0,'Hijiki hero missing');
assert.ok(hijikiPage.slice(hijikiHero,hijikiHero+750).includes('Sargassum%20fusiforme'),
  'Hijiki hero should show the species, not a different region');
const indexHtml=assertPage('book');
assert.ok(!indexHtml.includes('Hijiki%20harvested%20on%20Camp%20Courtney'),
  'An Okinawa comparison photo still appears as a Setouchi discovery cover');

// The first photo on these essays should match the directly relevant,
// copyright-vetted photo chosen on their discovery cards.
for(const [slug,fileHint] of [
  ['kojima-from-cotton-to-jeans','Kojima%20Jeans%20Street'],
  ['imabari-why-shipbuilding','ImabariShipbuilding-Dockyard'],
  ['shodoshima-open-island','Hishio-no-sato%20Shodo'],
  ['takamatsu-sea-castle-to-gateway','Takamatsu%20Castle%20-%20Tamamo']
]){
  const html=assertPage('book/'+slug);
  const heroIndex=html.indexOf('class="book-hero-photo"');
  assert.ok(heroIndex>=0,'Essay hero missing: '+slug);
  assert.ok(html.slice(heroIndex,heroIndex+850).includes(fileHint),
    'Essay hero and verified subject-matched index photograph differ: '+slug);
}

const collectionHtml=assertPage(collection);
const sitemap=readFileSync(path.join(dist,'sitemap-0.xml'),'utf8');
const sitemapUrls=[...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m=>m[1]);
assert.ok(!sitemapUrls.some(url=>url.includes('/book/kada-sea-bream-distribution-ecosystem/')), 'Unverified Kada draft must not be indexed');
for(const slug of ['fish-waste-to-feed-and-citrus','citrus-pomace-cascade','ports-that-needed-waiting']) assert.ok(!sitemapUrls.some(url=>url.includes('/book/'+slug+'/')), 'Withdrawn essay indexed: '+slug);
assert.ok(!sitemapUrls.some(url=>url.includes('/collections/port-towns/')), 'Retired port collection still indexed');
for(const pathname of [collection,...collectionEssays.map(slug=>'book/'+slug)]){
  assert.ok(sitemapUrls.some(url=>url.includes('/'+pathname+'/')),`Missing sitemap entry: /${pathname}/`);
}

// Check all discovery surfaces, all essay "read next" cards, and every regional entry.
// Traverse actual build output so generated tags and editorial overrides are covered.
const { readdirSync } = await import('node:fs');
const htmlChildren=(directory)=>existsSync(path.join(dist,directory))
  ? readdirSync(path.join(dist,directory),{withFileTypes:true})
    .filter((entry)=>entry.isDirectory() && existsSync(built(directory+'/'+entry.name)))
    .map((entry)=>directory+'/'+entry.name+'/index.html')
  : [];
const important=[
  'index.html',
  'book/index.html',
  'book/nature/index.html',
  'book/culture/index.html',
  collection+'/index.html',
  'collections/port-towns/index.html',
  ...htmlChildren('book'),
  ...htmlChildren('places')
];
for(const relative of important){
  assert.ok(existsSync(path.join(dist,relative)),`Discovery page missing: ${relative}`);
}

const missing=new Map();
let checked=0;
for(const relative of important){
  const html=readFileSync(path.join(dist,relative),'utf8')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,''); // Ignore JavaScript-built map links.
  for(const match of html.matchAll(/\bhref=(["'])(.*?)\1/g)){
    const raw=match[2].replaceAll('&amp;','&').trim();
    if(!raw || raw.startsWith('#') || raw.startsWith('//') || /^[a-z][a-z\d+.-]*:/i.test(raw)) continue;
    let target=raw.split(/[?#]/,1)[0];
    if(target.startsWith(legacy)) target=target.slice(legacy.length);
    else if(target.startsWith('/')) target=target.slice(1);
    else continue; // same-page and relative anchors do not define article routes
    if(!target.startsWith('book/')&&!target.startsWith('collections/')&&!target.startsWith('places/'))continue;
    const normalized=target.replace(/\/+$/,'');
    if(!normalized || !normalized.includes('/')) continue;
    checked++;
    if(!existsSync(built(normalized))){
      const list=missing.get(normalized)||[];
      list.push(relative);
      missing.set(normalized,list);
    }
  }
}
assert.equal(missing.size,0,'Broken editorial links: '+JSON.stringify(Object.fromEntries(missing)));
// Guard the main navigation and independently generated tag index pages.
for(const page of ['book/nature','book/culture']){
  const html=assertPage(page);
  assert.ok(html.includes('book/'),`No story links in ${page}`);
}
const researchPage=assertPage('chapters');
assert.ok(researchPage.includes('調査と研究ノート') && researchPage.includes('調査の姿勢') && researchPage.includes('研究・資料ノートの書架'),'Public research page must include methods, findings and archive');
assert.ok(researchPage.includes('研究ノートではその過程と結果を残します'),'Research-notes methodology connection missing');
assert.ok(researchPage.includes('次のエッセイへつながる知見'),'Research index must prioritize writing-useful findings');
assert.ok(!researchPage.includes('アトラスの編集方法') && !researchPage.includes('エッセイ→研究ノート更新フロー'),'Internal editorial workflow leaked into research index');
const footerStart=researchPage.indexOf('<footer');
const footerEnd=researchPage.indexOf('</footer>',footerStart);
const footerHtml=footerStart>=0 && footerEnd>footerStart ? researchPage.slice(footerStart,footerEnd+9) : researchPage;
assert.ok(footerHtml.includes('調査と研究ノート'),'Unified footer link missing');
assert.ok(!footerHtml.includes('編集・調査の方法'),'Old footer label should be removed');
for(const legacyPage of ['methodology','editorial-methodology','research-workflow']){
  const retired=assertPage(legacyPage);
  assert.ok(retired.includes('noindex') && retired.includes('setouchi-atlas.pia2.org/chapters/'), `Retired public page should redirect to research index: ${legacyPage}`);
  assert.ok(!sitemapUrls.some(url=>url.includes('/'+legacyPage+'/')), `Retired research/editorial page still in sitemap: ${legacyPage}`);
}
const homepage=readFileSync(path.join(dist,'index.html'),'utf8');
for(const fragment of ['初めての3篇','3つの読書の旅','塩田の、その先。']){
  assert.ok(homepage.includes(fragment),`Missing homepage editorial section: ${fragment}`);
}
// Photo-first layout should preserve all three entry points, three expandable
// story trails, the contrasting salt-landscape pair, and the essay search.
assert.ok(homepage.includes('visual-home-feature-grid'),'Homepage photo feature mosaic is missing');
assert.equal((homepage.match(/class="visual-home-trail"/g)||[]).length,3,'Three reading-trail cards should be present');
assert.equal((homepage.match(/class="visual-home-salt-card"/g)||[]).length,2,'Two salt comparison photo cards should be present');
assert.ok(homepage.includes('data-atlas-search'),'Homepage keyword search must remain available');
assert.ok(collectionHtml.includes('七つの土地、七つの問い'), 'Seven-place salt collection is missing');
assert.ok(collectionHtml.includes('伯方島'), 'Salt collection is missing Hakata Island');
assert.ok(collectionHtml.includes('今治'), 'Salt collection is missing Imabari');
assert.ok(!collectionHtml.includes('/book/four-salt-fields/'), 'Retired comparison essay remains linked from collection');
assert.ok(collectionHtml.includes('坂出の番の州は塩田跡ではなく、沖合を新たに埋め立てた土地'), 'Sakaide geographical caveat is missing');
console.log(`Published route checks passed: ${requiredSlugs.length} required essays, ${important.length} discovery/essay/region pages, ${checked} editorial links, collection and sitemap.`);

// The approved portrait must be the actual essay hero and discovery cover.
const setodaPhoto='images/editorial/setoda-lemon-post.webp';
assert.ok(existsSync(path.join(dist,setodaPhoto)), 'Setoda lemon post photograph missing from built site');
const setodaEssay=assertPage('book/tatara-bridge-citrus-seasons');
const setodaHero=setodaEssay.match(/<figure class="book-hero-photo"[^>]*>[\s\S]*?<\/figure>/)?.[0]||'';
assert.ok(setodaHero.includes(setodaPhoto) && setodaHero.includes('No.6201'), 'Setoda article hero or photo credit missing');
assert.ok(indexHtml.includes(setodaPhoto), 'Setoda discovery card must use the approved post photo');

// Homepage trails represent nine distinct current essays, separate from the three featured works.
for(const title of ["潮が動かす世界","土地と水に向き合う","名産が生まれるまで"]) assert.ok(homepage.includes(title),'Missing refreshed trail: '+title);
for(const slug of ["setouchi-250-submarine-caldrons","kurushima-tides-and-navigation","setouchi-shrimp-middle-layer","hiketa-castle-port-town","sanuki-store-the-rain","mikan-slope-and-varieties","tatara-bridge-citrus-seasons","shodoshima-somen-to-sesame-oil","ibuki-fat-sardines-revalued"]) assert.ok(homepage.includes('/book/'+slug+'/'),'Missing reading trail essay: '+slug);
