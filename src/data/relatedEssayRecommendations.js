// Reader-facing "read next" choices. Match published essays only.
import { essayEntryBySlug } from './essayEntryCategories.js';
import { getNaturalConditionTags } from './naturalEnvironmentTags.js';
// Explicit connections outrank broad theme similarity; no research notes are included.
const curated = {
  'kojima-from-cotton-to-jeans':['kojima-jeans-circular-economy','imabari-why-shipbuilding','takehara-salt-capital-to-townscape'],
  'imabari-why-shipbuilding':['onomichi-capital-to-culture-and-ships','ports-that-needed-waiting','setouchi-ship-materials'],
  'onomichi-capital-to-culture-and-ships':['imabari-why-shipbuilding','mitarai-economy-of-waiting','ports-that-needed-waiting'],
  'four-salt-fields':['ako-after-salt-fields','takehara-salt-capital-to-townscape','sakaide-salt-fields-to-industry'],
  'ako-after-salt-fields':['ako-salt-fields-to-city','four-salt-fields','takehara-salt-capital-to-townscape'],
  'ako-salt-fields-to-city':['ako-after-salt-fields','four-salt-fields','sakaide-salt-fields-to-industry'],
  'sakaide-salt-fields-to-industry':['four-salt-fields','kinkai-salt-field-to-solar','ako-salt-fields-to-city'],
  'kinkai-salt-field-to-solar':['four-salt-fields','sakaide-salt-fields-to-industry','ako-salt-fields-to-city'],
  'soy-sauce-lees-to-chomeiso':['shodoshima-open-island','olive-pomace-to-cattle','citrus-pomace-cascade'],
  'shodoshima-open-island':['soy-sauce-lees-to-chomeiso','olive-pomace-to-cattle','setouchi-sushi-not-nigiri'],
  'olive-pomace-to-cattle':['shodoshima-open-island','soy-sauce-lees-to-chomeiso','fish-waste-to-feed-and-citrus'],
  'citrus-pomace-cascade':['fish-waste-to-feed-and-citrus','mikan-slope-and-varieties'],
  'mikan-slope-and-varieties':['citrus-pomace-cascade','fish-waste-to-feed-and-citrus'],
  'fish-waste-to-feed-and-citrus':['citrus-pomace-cascade','mikan-slope-and-varieties','oyster-shells-after-the-meal'],
  'ports-that-needed-waiting':['mitarai-economy-of-waiting','faith-as-transport-map','tomo-two-act-tidal-port'],
  'mitarai-economy-of-waiting':['faith-as-transport-map','ports-that-needed-waiting','tomo-two-act-tidal-port'],
  'faith-as-transport-map':['mitarai-economy-of-waiting','ports-that-needed-waiting','tomo-two-act-tidal-port'],
  'tomo-two-act-tidal-port':['ports-that-needed-waiting','mitarai-economy-of-waiting','faith-as-transport-map'],
  'shimotsui-tako-meshi':['tai-meshi-two-seas','shimotsui-hijiki-peperoncino','setouchi-sushi-not-nigiri'],
  'sea-bream-scales-to-collagen':['tai-meshi-two-seas','fish-waste-to-feed-and-citrus','citrus-pomace-cascade'],
  'takehara-salt-capital-to-townscape':['four-salt-fields','yanai-trade-profit-to-whitewalls','onomichi-capital-to-culture-and-ships'],
  'yanai-trade-profit-to-whitewalls':['takehara-salt-capital-to-townscape','mitarai-economy-of-waiting','iwakuni-river-city'],
  'niihama-after-copper':['imabari-why-shipbuilding','kojima-from-cotton-to-jeans','setouchi-ship-materials']
};

const intersection = (a,b) => {
  const set=new Set(Array.isArray(a)?a:[]);
  return (Array.isArray(b)?b:[]).filter((x)=>set.has(x)).length;
};

export const relatedEssaysFor=(article,articles,limit=3)=>{
  const pool=[...new Map(articles.filter((a)=>a?.slug).map((a)=>[a.slug,a])).values()]
    .filter((a)=>a.slug!==article.slug);
  const bySlug=new Map(pool.map((a)=>[a.slug,a]));
  const selected=[];
  const visited=new Set([article.slug]);
  const add=(candidate,reason)=>{
    if(!candidate || visited.has(candidate.slug) || selected.length>=limit) return;
    visited.add(candidate.slug);
    selected.push({...candidate,relatedReason:reason});
  };
  for(const slug of curated[article.slug]||[]){
    const candidate=bySlug.get(slug);
    if(!candidate) continue;
    const samePlace=intersection(article.cities,candidate.cities)>0;
    add(candidate,samePlace?'同じ土地の、別の物語':'あわせて読みたい');
  }
  if(selected.length>=limit) return selected;
  const genericAreas=new Set(['瀬戸内','瀬戸内海','愛媛','香川','広島','岡山','和歌山','大阪']);
  const readerPlaces=(cities)=>(cities||[]).filter((city)=>city&&!genericAreas.has(city));
  const subjectPlaces=readerPlaces(article.cities);
  const nature=getNaturalConditionTags(article);
  const entrances=essayEntryBySlug[article.slug]||[];
  const ranked=pool.filter((a)=>!visited.has(a.slug)).map((a)=>{
    const cities=intersection(subjectPlaces,readerPlaces(a.cities));
    const keywords=intersection(article.keywords,a.keywords);
    const natural=intersection(nature,getNaturalConditionTags(a));
    const candidateEntrances=essayEntryBySlug[a.slug]||[];
    const topics=intersection(entrances,candidateEntrances);
    const primaryTopic=entrances[0] && entrances[0]===candidateEntrances[0];
    const part=article.part===a.part;
    // Prefer a genuinely shared place, then environmental cause or editorial entrance.
    // Broad keywords and generic prefecture names alone should not dominate the links.
    const score=9*cities+3*Math.min(2,natural)+3*Number(primaryTopic)+2*Math.min(2,topics)
      +Math.min(3,keywords)*2+Number(part);
    return {a,cities,keywords,natural,topics,part,score};
  }).sort((a,b)=>b.score-a.score||b.cities-a.cities||b.natural-a.natural||b.topics-a.topics||a.a.title.localeCompare(b.a.title,'ja'));
  for(const row of ranked){
    if(selected.length>=limit||row.score===0) break;
    add(row.a,row.cities?'同じ土地の、別の物語':row.natural?'同じ自然条件から':row.topics?'同じ風景のテーマから':row.keywords?'同じ話題から広がる':'同じテーマでもう一篇');
  }
  // All published essays should have a readable next stop, even when topics are unique.
  for(const row of ranked){
    if(selected.length>=limit) break;
    add(row.a,'ほかの瀬戸内の物語');
  }
  return selected;
};
