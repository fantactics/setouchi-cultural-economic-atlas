// Reader-facing "read next" choices. Match published essays only.
import { essayEntryBySlug } from './essayEntryCategories.js';
import { getNaturalConditionTags } from './naturalEnvironmentTags.js';
import { getCultureTags } from './cultureTraditionTags.js';
// Explicit connections outrank broad theme similarity; no research notes are included.
const curated = {
  'iwagi-salt-pans-to-shrimp-ponds':['four-salt-fields','oysters-taste-of-small-seas','ushimado-nagahama-kinkai-two-reclaimed-landscapes'],
  'ushimado-nagahama-kinkai-two-reclaimed-landscapes':['kinkai-salt-field-to-solar','farmland-or-solar','iwagi-salt-pans-to-shrimp-ponds'],
  'kinkai-salt-field-to-solar':['ushimado-nagahama-kinkai-two-reclaimed-landscapes','four-salt-fields','sakaide-salt-fields-to-industry','iwagi-salt-pans-to-shrimp-ponds'],
  'kojima-from-cotton-to-jeans':['kojima-jeans-circular-economy','imabari-why-shipbuilding','takehara-salt-capital-to-townscape'],
  'imabari-why-shipbuilding':['onomichi-capital-to-culture-and-ships','ports-that-needed-waiting','setouchi-ship-materials'],
  'onomichi-capital-to-culture-and-ships':['imabari-why-shipbuilding','mitarai-economy-of-waiting','ports-that-needed-waiting'],
  'four-salt-fields':['ako-after-salt-fields','takehara-salt-capital-to-townscape','sakaide-salt-fields-to-industry'],
  'ako-after-salt-fields':['ako-salt-fields-to-city','four-salt-fields','takehara-salt-capital-to-townscape'],
  'ako-salt-fields-to-city':['ako-after-salt-fields','four-salt-fields','sakaide-salt-fields-to-industry'],
  'sakaide-salt-fields-to-industry':['four-salt-fields','kinkai-salt-field-to-solar','ako-salt-fields-to-city'],
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
  'niihama-after-copper':['imabari-why-shipbuilding','kojima-from-cotton-to-jeans','setouchi-ship-materials'],
  'oysters-taste-of-small-seas':['oyster-shells-where-they-go','oyster-shells-after-the-meal','tai-meshi-two-seas'],
  'oyster-shells-where-they-go':['oysters-taste-of-small-seas','oyster-shells-after-the-meal','fish-waste-to-feed-and-citrus']
};


// A small set of deliberately edited bridges: the next card offers a new
// question, not merely a matching tag. Keys are "current > next".
const editorialBridges = {
  'kojima-from-cotton-to-jeans>imabari-why-shipbuilding':'土地の条件から生まれた産業は、どう技術の町になった？',
  'kojima-from-cotton-to-jeans>kojima-jeans-circular-economy':'ジーンズを作る町は、使い終わった服をどう扱う？',
  'imabari-why-shipbuilding>onomichi-capital-to-culture-and-ships':'同じ造船の海で、町の歩みはなぜ違った？',
  'onomichi-capital-to-culture-and-ships>imabari-why-shipbuilding':'隣の造船都市は、何を強みに発展した？',
  'niihama-after-copper>imabari-why-shipbuilding':'鉱山と造船。それぞれの技術は何を残した？',
  'takehara-salt-capital-to-townscape>yanai-trade-profit-to-whitewalls':'白壁の町は、別の土地では何の商いから生まれた？',
  'yanai-trade-profit-to-whitewalls>takehara-salt-capital-to-townscape':'同じ白壁でも、町を富ませた商いは違う？',
  'four-salt-fields>ako-after-salt-fields':'塩田が消えたあとの赤穂には、何が残った？',
  'ako-after-salt-fields>takehara-salt-capital-to-townscape':'塩の富は、別の町でどんな風景になった？',
  'sakaide-salt-fields-to-industry>kinkai-salt-field-to-solar':'塩田のあとを、工場ではなく太陽光が埋めたら？',
  'ports-that-needed-waiting>mitarai-economy-of-waiting':'船が待つ時間は、島にどんな仕事を生んだ？',
  'mitarai-economy-of-waiting>faith-as-transport-map':'港を行き交った人々は、どんな信仰を残した？',
  'tomo-two-act-tidal-port>ports-that-needed-waiting':'潮待ちの港が待たなくなったあと、何が残る？',
  'shodoshima-open-island>olive-pomace-to-cattle':'島のオリーブは、搾ったあとも役立つ？',
  'olive-pomace-to-cattle>fish-waste-to-feed-and-citrus':'島の副産物利用は、海とみかん山でも起きている？',
  'citrus-pomace-cascade>fish-waste-to-feed-and-citrus':'みかん山と漁港は、資源を分け合える？',
  'fish-waste-to-feed-and-citrus>citrus-pomace-cascade':'搾りかすや剪定枝は、別の資源になれる？',
  'shimotsui-tako-meshi>tai-meshi-two-seas':'同じ瀬戸内の魚料理でも、土地で味は変わる？',
  'tai-meshi-two-seas>shimotsui-tako-meshi':'魚と米の組み合わせは、別の港でどう変わる？',
  'oysters-taste-of-small-seas>oyster-shells-where-they-go':'牡蠣を食べたあと、大量の殻はどこへ行く？',
  'oyster-shells-where-they-go>oysters-taste-of-small-seas':'牡蠣のおいしさは、海のどんな条件で決まる？'
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
    selected.push({...candidate,relatedReason:reason,relatedQuestion:editorialBridges[`${article.slug}>${candidate.slug}`] || null});
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
  const culture=getCultureTags(article);
  const entrances=essayEntryBySlug[article.slug]||[];
  const ranked=pool.filter((a)=>!visited.has(a.slug)).map((a)=>{
    const cities=intersection(subjectPlaces,readerPlaces(a.cities));
    const keywords=intersection(article.keywords,a.keywords);
    const natural=intersection(nature,getNaturalConditionTags(a));
    const cultural=intersection(culture,getCultureTags(a));
    const candidateEntrances=essayEntryBySlug[a.slug]||[];
    const topics=intersection(entrances,candidateEntrances);
    const primaryTopic=entrances[0] && entrances[0]===candidateEntrances[0];
    const part=article.part===a.part;
    // Prefer a genuinely shared place, then environmental cause or editorial entrance.
    // Broad keywords and generic prefecture names alone should not dominate the links.
    const score=9*cities+3*Math.min(2,natural)+2*Math.min(2,cultural)+3*Number(primaryTopic)+2*Math.min(2,topics)
      +Math.min(3,keywords)*2+Number(part);
    return {a,cities,keywords,natural,cultural,topics,part,score};
  }).sort((a,b)=>b.score-a.score||b.cities-a.cities||b.natural-a.natural||b.topics-a.topics||a.a.title.localeCompare(b.a.title,'ja'));
  for(const row of ranked){
    if(selected.length>=limit||row.score===0) break;
    add(row.a,row.cities?'同じ土地の、別の物語':row.natural?'同じ自然条件から':row.cultural?'同じ文化・風習から':row.topics?'同じ風景のテーマから':row.keywords?'同じ話題から広がる':'同じテーマでもう一篇');
  }
  // All published essays should have a readable next stop, even when topics are unique.
  for(const row of ranked){
    if(selected.length>=limit) break;
    add(row.a,'ほかの瀬戸内の物語');
  }
  return selected;
};
