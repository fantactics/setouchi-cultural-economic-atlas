/**
 * 文化・風習タグ：自然条件とは独立した、人が育てた営みの索引。
 * 記事の核心に関係する語だけを付ける。記事に書かれていない文化を推測しない。
 */
export const cultureTagRules=[
  {tag:'食文化',pattern:/料理|食卓|食べ方|食文化|郷土食|寿司|鮓|鯛めし|タコ飯|たこめし|かき揚げ|しらす|煮干し|ひじき|そうめん|素麺/},
  {tag:'漁撈・養殖',pattern:/漁師|漁業|漁法|漁獲|養殖|筏|漁場|漁村|底びき|一本釣り|網漁/},
  {tag:'農の知恵',pattern:/農家|農業|栽培|畑|棚田|ため池|灌漑|用水|果樹|収穫|みかん|玉ねぎ/},
  {tag:'塩づくり',pattern:/製塩|塩田|塩業|塩づくり|塩をつく|流下式塩田/},
  {tag:'港の商い',pattern:/問屋|廻船|港町|商家|商人|交易|商い|物流|船宿|仲買|荷揚げ|蔵屋敷/},
  {tag:'船と航海',pattern:/航路|船乗り|造船|潮待ち|風待ち|船旅|航海|帆船|渡船|船材|船大工/},
  {tag:'町並み・建築',pattern:/町家|白壁|建築|町並み|蔵|長屋門|伝統的建造物|家並み|石垣|城下町/},
  {tag:'信仰・寺社',pattern:/寺院|寺社|神社|信仰|巡礼|参詣|祭礼|宗教|本堂|神事/},
  {tag:'織物・衣服',pattern:/綿花|木綿|織物|繊維|染色|縫製|足袋|学生服|ジーンズ|デニム|反毛/},
  {tag:'醸造・発酵',pattern:/醤油|醸造|発酵|味噌|酒蔵|麹/},
  {tag:'工業・ものづくり',pattern:/製造|工場|技術者|産業|工業|機械|精錬|製錬|加工場|鋳造|職人/},
  {tag:'鉱山と労働',pattern:/鉱山|銅山|坑道|鉱夫|採鉱|鉱石|鉱業/},
  {tag:'島の暮らし',pattern:/島民|離島|島の暮らし|移動販売|生活航路|水道|下水|人口減少|別荘/},
  {tag:'水の管理',pattern:/水利|用水|ため池|溜池|治水|堤防|上水道|水道|灌漑|水の配分/},
  {tag:'土地の改変',pattern:/干拓|埋立|埋め立て|造成|土地改変|土地利用|採石|土砂採取/},
  {tag:'観光・余暇',pattern:/観光|旅人|宿泊|旅行|サイクリング|劇場|景勝|観光客/},
  {tag:'市場と流通',pattern:/市場|流通|卸売|出荷|買い手|販売|物流|サプライチェーン|運搬/},
  {tag:'再利用の工夫',pattern:/再資源化|再利用|循環|リサイクル|アップサイクル|廃棄物|搾りかす|裁断くず/}
];

export const cultureTagAnchors={
  'omishima-mountains-and-sea-faith':['信仰・寺社','船と航海'],
  'setouchi-sea-gods-and-power':['信仰・寺社','船と航海','港の商い'],
  'iwagi-salt-pans-to-shrimp-ponds':['塩づくり','漁撈・養殖'],
  'ushimado-nagahama-kinkai-two-reclaimed-landscapes':['農の知恵','塩づくり'],
  'oyster-shells-where-they-go':['漁撈・養殖','再利用の工夫'],
  'onomichi-capital-to-culture-and-ships':['信仰・寺社','町並み・建築'],
  'yanai-trade-profit-to-whitewalls':['港の商い','町並み・建築'],
  'hiketa-castle-port-town':['港の商い','町並み・建築'],
  'ako-after-salt-fields':['塩づくり','工業・ものづくり'],
  'tai-meshi-two-seas':['食文化','漁撈・養殖'],
  'shimotsui-tako-meshi':['食文化','漁撈・養殖'],
  'oysters-taste-of-small-seas':['食文化','漁撈・養殖'],
  'mikan-slope-and-varieties':['農の知恵','町並み・建築'],
  'oyster-shells-after-the-meal':['再利用の工夫','工業・ものづくり'],
  'olive-pomace-to-cattle':['農の知恵','再利用の工夫'],
  'citrus-pomace-cascade':['農の知恵','再利用の工夫'],
  'kojima-jeans-circular-economy':['織物・衣服','再利用の工夫'],
  'kojima-from-cotton-to-jeans':['織物・衣服','工業・ものづくり'],
  'sanuki-store-the-rain':['水の管理','農の知恵'],
  'takehara-salt-capital-to-townscape':['塩づくり','町並み・建築'],
  'sakaide-salt-fields-to-industry':['塩づくり','工業・ものづくり'],
  'tomo-two-act-tidal-port':['港の商い','船と航海'],
  'mitarai-economy-of-waiting':['港の商い','船と航海'],
  'ports-that-needed-waiting':['船と航海','港の商い'],
  'imabari-why-shipbuilding':['船と航海','工業・ものづくり'],
  'shodoshima-somen-to-sesame-oil':['食文化','工業・ものづくり'],
  'hijiki-tidal-time':['漁撈・養殖','食文化'],
  'niboshi-shirasu-two-food-cultures':['食文化','漁撈・養殖'],
  'setouchi-sushi-not-nigiri':['食文化'],
  'setouchi-shrimp-middle-layer':['漁撈・養殖','食文化'],
  'setouchi-itinerant-trade-boats':['船と航海','島の暮らし','市場と流通'],
  'setouchi-ship-materials':['船と航海','工業・ものづくり'],
  'niihama-after-copper':['鉱山と労働','工業・ものづくり'],
  'faith-as-transport-map':['信仰・寺社','船と航海'],
  'what-cyclists-leave-behind':['観光・余暇','島の暮らし']
};
const scoreArticle=(article)=>{
  const title=[article.title,article.subtitle].filter(Boolean).join(' ');
  const lead=String(article.lead||'');
  const headings=(article.sections||[]).map(s=>s.heading||'').join(' ');
  const body=(article.sections||[]).flatMap(s=>(s.paragraphs||[]).map(p=>typeof p==='string'?p:p?.text||'')).join(' ');
  const keywords=(article.keywords||[]).join(' ');
  return {title,lead,headings,body,keywords};
};
export const getCultureTags=(article,limit=3)=>{
  if(!article)return [];
  const anchors=cultureTagAnchors[article.slug]||[];
  const parts=scoreArticle(article);
  const scores=cultureTagRules.map(({tag,pattern})=>({
    tag,score:(pattern.test(parts.title)?7:0)+(pattern.test(parts.headings)?5:0)+(pattern.test(parts.lead)?3:0)+(pattern.test(parts.keywords)?2:0)+(pattern.test(parts.body)?1:0)
  }));
  const selected=[...anchors];
  scores.sort((a,b)=>b.score-a.score);
  for(const {tag,score} of scores){
    if(selected.length>=limit)break;
    if(score>=3 && !selected.includes(tag))selected.push(tag);
  }
  return selected.slice(0,limit);
};
export const cultureTagIndex=(essays)=>{
  const groups=new Map();
  for(const essay of essays){
    for(const tag of getCultureTags(essay)){
      if(!groups.has(tag))groups.set(tag,[]);
      groups.get(tag).push(essay);
    }
  }
  return [...groups].map(([tag,items])=>({tag,essays:items})).sort((a,b)=>b.essays.length-a.essays.length||a.tag.localeCompare(b.tag,'ja'));
};
