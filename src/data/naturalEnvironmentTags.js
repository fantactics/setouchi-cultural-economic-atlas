/**
 * 自然条件タグ / NATURAL ENVIRONMENT TAGS
 *
 * Reader-facing tags describe the physical or ecological circumstances behind
 * a landscape, NEVER the business, food, land-use decision or place name.
 *
 * Tags are generated from an editorially controlled vocabulary using the
 * article's lead, headings and prose. A few reviewed story anchors prevent
 * important but implicit natural conditions from being missed or mis-ranked.
 *
 * This is deterministic build-time generation: no API, personal data or
 * unreliable browser-side AI call. New essays are scanned automatically.
 * For ambiguous or merely incidental mentions, omit tags rather than guess.
 */
export const naturalConditionRules = [
  {tag:'少雨', pattern:/少雨|雨量が少な|雨が少な|降水量が少な|降水量は少な|水不足が続|乾燥した気候/},
  {tag:'雨陰', pattern:/雨陰|山地が雨雲を|山が雨を遮|雨雲を遮|湿った風を遮|山で雨を降らせ/},
  {tag:'急流', pattern:/急流|急潮|速い潮|潮が速|潮流が速|激しい潮流|速い流れ|川は短く.*急|急な川|川.{0,14}勾配が急/},
  {tag:'波浪', pattern:/波浪|波の強さ|打ち寄せる波|波を受け|波が荒い|波の影響/},
  {tag:'潮汐', pattern:/潮汐|干満|満潮|干潮|満ち潮|引き潮|潮の満ち引き|潮位|潮待ち|潮が引く|潮が満ちる/},
  {tag:'季節風', pattern:/季節風|冬の風|北西風|偏西風|風待ち|季節による風/},
  {tag:'干潟', pattern:/干潟|干出する砂泥|砂泥の浅瀬|干潮時の砂浜/},
  {tag:'遠浅', pattern:/遠浅|浅瀬|浅い海|浅い砂底|浅い磯/},
  {tag:'岩礁', pattern:/岩礁|岩場|岩の隙間|岩に付着|岩の割れ目/},
  {tag:'水温', pattern:/水温|海水温|高水温|温度躍層/},
  {tag:'黒潮', pattern:/黒潮|暖流の流れ込|太平洋由来の海水/},
  {tag:'海水交換', pattern:/海水の入れ替|海水が入れ替|水の入れ替わり|海水交換|潮による交換|水が滞り|潮の交換/},
  {tag:'河口', pattern:/河口|河川が流れ込|川が流れ込|川の水が流れ込|川から届く|川から運ばれ|河川から入る/},
  {tag:'栄養塩', pattern:/栄養塩|窒素やリン|窒素とリン|海の栄養|栄養を運ぶ|栄養が流れ込/},
  {tag:'植物プランクトン', pattern:/植物プランクトン|海のプランクトン/},
  {tag:'アマモ場', pattern:/アマモ場|アマモの藻場|アマモが育つ/},
  {tag:'多島海', pattern:/多島海|島々がつくる|多くの島|島が重な|島々に囲まれ|島と島の間/},
  {tag:'入り江', pattern:/入り江|入江|入り組んだ湾|湾奥|深い湾|内湾/},
  {tag:'海峡', pattern:/海峡|紀伊水道|豊後水道|来島海峡|関門海峡/},
  {tag:'リアス海岸', pattern:/リアス海岸|リアス式海岸|リアス地形/},
  {tag:'斜面', pattern:/急斜面|傾斜地|山の斜面|斜面の畑|斜面を開|斜面に築|傾斜の強い土地/},
  {tag:'日照', pattern:/日照|日射|太陽の光|日当たり|陽当たり|日差し|晴天|晴れの日|晴れた日|晴天率/},
  {tag:'潮風', pattern:/潮風|海風|潮を含んだ風/},
  {tag:'洪水', pattern:/洪水|氾濫|増水|決壊|水害|川があふれ/},
  {tag:'地質', pattern:/花崗岩|風化した岩|地質|岩質|地層|石灰岩|火山岩/},
  {tag:'鉱床', pattern:/鉱床|鉱脈|地下の銅|銅鉱石ができ|銅の鉱石/},
  {tag:'土壌', pattern:/土壌|土質|砂質土|粘土質|水はけのよい土/},
  {tag:'塩分', pattern:/塩分|塩分濃度|汽水|汽水域/},
  {tag:'津波', pattern:/津波|津波浸水|津波被害|津波リスク/},
  {tag:'台風', pattern:/台風|暴風雨|高潮/},
  {tag:'砂州', pattern:/砂州|砂嘴|州が伸び|砂が堆積/}
];
export const naturalConditionVocabulary=naturalConditionRules.map(({tag})=>tag);

// Editorial anchors: main natural causes, not all incidental nature nouns.
// These are checked when the essay is revised; automatic matching supplies
// additional tags for new and updated essays.
export const naturalConditionAnchors = {
  'sanuki-store-the-rain':['少雨','急流','雨陰'],
  'four-salt-fields':['日照','干潟','潮汐'],
  'kojima-from-cotton-to-jeans':['干潟','少雨'],
  'ports-that-needed-waiting':['潮汐','季節風'],
  'imabari-why-shipbuilding':['急流','入り江'],
  'niihama-after-copper':['鉱床','斜面'],
  'shodoshima-open-island':['少雨','日照'],
  'faith-as-transport-map':['潮汐','季節風'],
  'iwakuni-river-city':['洪水','急流'],
  'onomichi-capital-to-culture-and-ships':['海峡','斜面'],
  'takehara-salt-capital-to-townscape':['日照','干潟','潮汐'],
  'mitarai-economy-of-waiting':['潮汐','季節風'],
  'yanai-trade-profit-to-whitewalls':['潮汐','入り江'],
  'mihara-castle-to-multimodal-city':['河口','洪水'],
  'matsuyama-three-centers-one-city':['河口','海峡'],
  'hiketa-castle-port-town':['入り江','潮汐'],
  'ako-after-salt-fields':['日照','干潟','潮汐'],
  'takamatsu-sea-castle-to-gateway':['潮汐','干潟'],
  'tai-meshi-two-seas':['急流','黒潮','リアス海岸'],
  'shimotsui-tako-meshi':['急流','岩礁'],
  'oysters-taste-of-small-seas':['河口','栄養塩','海水交換'],
  'hijiki-tidal-time':['潮汐','岩礁'],
  'mikan-slope-and-varieties':['斜面','日照','少雨'],
  'sea-bream-scales-to-collagen':['リアス海岸','黒潮'],
  'fish-waste-to-feed-and-citrus':['リアス海岸','斜面'],
  'olive-pomace-to-cattle':['少雨','日照'],
  'soy-sauce-lees-to-chomeiso':['潮風'],
  'ibuki-fat-sardines-revalued':['潮流','栄養塩'],
  'citrus-pomace-cascade':['斜面','日照'],
  'kinkai-salt-field-to-solar':['干潟','日照'],
  'sakaide-salt-fields-to-industry':['干潟','潮汐'],
  'ako-salt-fields-to-city':['干潟','潮汐'],
  'sawara-spring-two-gates':['水温','海峡'],
  'kada-sea-bream-one-line':['急流','海峡'],
  'kitan-strait-tai-to-shirasu':['急流','海峡'],
  'kada-sea-bream-distribution-ecosystem':['急流','海峡'],
  'kada-steel-data-center-transition':['津波','河口'],
  'shimotsui-hijiki-peperoncino':['潮流','波浪','岩礁'],
  'tomo-two-act-tidal-port':['潮汐','季節風'],
  'gangi-tide-port-functions':['潮汐'],
  'jinori-okinori-navigation-system':['潮汐','季節風'],
  'setouchi-shrimp-middle-layer':['海水交換','栄養塩'],
  'setouchi-life-year':['水温','干潟','アマモ場'],
  'setouchi-itinerant-trade-boats':['潮汐','季節風'],
  'niboshi-shirasu-two-food-cultures':['海峡','水温'],
  'kojima-island-infrastructure-per-capita':['多島海'],
  'kojima-island-cycling-without-consumption':['多島海'],
  'kojima-island-bubble-villas-second-life':['多島海']
};
// Older essays occasionally use 潮流 instead of 急流 (both are natural conditions).
naturalConditionRules.push({tag:'潮流',pattern:/潮流|潮の流れ|海流|流れの速い海|激しい潮/});
naturalConditionVocabulary.push('潮流');

// Terms can appear in unrelated contexts: e.g. soy-sauce salinity is not
// a marine salinity condition, and a fishing port's strait is not always a
// causal natural condition for an essay about commercial branding.
const excludedBySlug={
  'soy-sauce-lees-to-chomeiso':['塩分'],
  'fish-waste-to-feed-and-citrus':['海峡'],
  'shimonoseki-resource-made-by-market':['海峡'],
  'kojima-jeans-circular-economy':['少雨']
};

const articleParts = (article) => ({
  lead:String(article?.lead||'')+' '+String(article?.subtitle||''),
  headings:(article?.sections||[]).map((s)=>String(s.heading||'')),
  paragraphs:(article?.sections||[]).flatMap((s)=>(s.paragraphs||[]).map((p)=>typeof p==='string'?p:String(p?.text||'')))
});

/**
 * Extract up to three core natural conditions for a reader-facing essay.
 * Prioritized editorial anchors plus high-signal matches in the narrative.
 * Return [] for essays without substantiated environmental evidence.
 */
export const getNaturalConditionTags=(article, limit=3)=>{
  if(!article) return [];
  const parts=articleParts(article);
  const vocabulary=new Set(naturalConditionVocabulary);
  const excluded=new Set(excludedBySlug[article.slug]||[]);
  const anchors=(naturalConditionAnchors[article.slug]||[]).filter((t)=>vocabulary.has(t)&&!excluded.has(t));
  const candidates=naturalConditionRules.map(({tag,pattern},index)=>{
    const headingMatches=parts.headings.filter((x)=>pattern.test(x)).length;
    const paragraphMatches=parts.paragraphs.filter((x)=>pattern.test(x)).length;
    const score=(pattern.test(parts.lead)?4:0)+Math.min(headingMatches,2)*3+Math.min(paragraphMatches,5);
    return {tag,score,index};
  }).filter((x)=>x.score>=4 && !anchors.includes(x.tag) && !excluded.has(x.tag))
    .sort((a,b)=>b.score-a.score||a.index-b.index);
  return [...anchors,...candidates.map((x)=>x.tag)].slice(0,Math.max(0,limit));
};

export const naturalConditionTagIndex=(articles)=>{
  const index=new Map();
  for(const article of articles||[]){
    for(const tag of getNaturalConditionTags(article)){
      if(!index.has(tag))index.set(tag,[]);
      index.get(tag).push(article);
    }
  }
  return [...index.entries()].map(([tag,essays])=>({tag,essays}))
    .sort((a,b)=>b.essays.length-a.essays.length||a.tag.localeCompare(b.tag,'ja'));
};
