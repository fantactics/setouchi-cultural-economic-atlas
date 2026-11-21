// Reader-facing "read next" choices. Match published essays only.
import { essayEntryBySlug } from './essayEntryCategories.js';
import { getNaturalConditionTags } from './naturalEnvironmentTags.js';
import { getCultureTags } from './cultureTraditionTags.js';
// Explicit connections outrank broad theme similarity; no research notes are included.
const curated = {
  'iwagi-salt-pans-to-shrimp-ponds':['ushimado-nagahama-kinkai-two-reclaimed-landscapes','kinkai-salt-field-to-solar','four-salt-fields'],
  'ushimado-nagahama-kinkai-two-reclaimed-landscapes':['kinkai-salt-field-to-solar','iwagi-salt-pans-to-shrimp-ponds','awaji-onion-rice-field'],
  'kinkai-salt-field-to-solar':['after-the-solar-farm','ushimado-nagahama-kinkai-two-reclaimed-landscapes','four-salt-fields'],
  'kojima-from-cotton-to-jeans':['kojima-jeans-circular-economy','imabari-why-shipbuilding','takehara-salt-capital-to-townscape'],
  'imabari-why-shipbuilding':['setouchi-ship-materials','tadano-shido-industrial-ecosystem','niihama-after-copper'],
  'onomichi-capital-to-culture-and-ships':['mihara-castle-to-multimodal-city','jinori-okinori-navigation-system','imabari-why-shipbuilding'],
  'four-salt-fields':['ako-after-salt-fields','takehara-salt-capital-to-townscape','sakaide-salt-fields-to-industry'],
  'ako-after-salt-fields':['four-salt-fields','takehara-salt-capital-to-townscape','sakaide-salt-fields-to-industry'],
  'sakaide-salt-fields-to-industry':['four-salt-fields','kinkai-salt-field-to-solar','after-the-solar-farm'],
  'shodoshima-open-island':['shodoshima-somen-to-sesame-oil','olive-pomace-to-cattle','tatsuno-water-castle-and-soy-sauce'],
  'olive-pomace-to-cattle':['shodoshima-open-island','citrus-pomace-cascade','fish-waste-to-feed-and-citrus'],
  'citrus-pomace-cascade':['fish-waste-to-feed-and-citrus','mikan-slope-and-varieties','olive-pomace-to-cattle'],
  'mikan-slope-and-varieties':['citrus-pomace-cascade','tatara-bridge-citrus-seasons','fish-waste-to-feed-and-citrus'],
  'fish-waste-to-feed-and-citrus':['citrus-pomace-cascade','mikan-slope-and-varieties','oyster-shells-after-the-meal'],
  'ports-that-needed-waiting':['tomo-two-act-tidal-port','mitarai-economy-of-waiting','jinori-okinori-navigation-system'],
  'mitarai-economy-of-waiting':['jinori-okinori-navigation-system','gangi-tide-port-functions','ports-that-needed-waiting'],
  'faith-as-transport-map':['gangi-tide-port-functions','mitarai-economy-of-waiting','ports-that-needed-waiting'],
  'tomo-two-act-tidal-port':['gangi-tide-port-functions','ports-that-needed-waiting','jinori-okinori-navigation-system'],
  'gangi-tide-port-functions':['tomo-two-act-tidal-port','mitarai-economy-of-waiting','faith-as-transport-map'],
  'jinori-okinori-navigation-system':['mitarai-economy-of-waiting','tomo-two-act-tidal-port','ports-that-needed-waiting'],
  'shimotsui-tako-meshi':['tai-meshi-two-seas','setouchi-sushi-not-nigiri','setouchi-shrimp-middle-layer'],
  'takehara-salt-capital-to-townscape':['four-salt-fields','yanai-trade-profit-to-whitewalls','onomichi-capital-to-culture-and-ships'],
  'yanai-trade-profit-to-whitewalls':['takehara-salt-capital-to-townscape','mitarai-economy-of-waiting','iwakuni-river-city'],
  'niihama-after-copper':['imabari-why-shipbuilding','tadano-shido-industrial-ecosystem','miura-matsuyama-small-boiler-revolution'],
  'oysters-taste-of-small-seas':['oyster-shells-where-they-go','oyster-shells-after-the-meal','tai-meshi-two-seas'],
  'oyster-shells-where-they-go':['oyster-shells-after-the-meal','oysters-taste-of-small-seas','fish-waste-to-feed-and-citrus'],
  'naoshima-water-across-sea':['sanuki-store-the-rain','kojima-island-infrastructure-per-capita','shodoshima-somen-to-sesame-oil'],
  'sanuki-store-the-rain':['naoshima-water-across-sea','awaji-onion-rice-field','shodoshima-somen-to-sesame-oil'],
  'awaji-onion-rice-field':['sanuki-store-the-rain','ushimado-nagahama-kinkai-two-reclaimed-landscapes','mikan-slope-and-varieties'],
  'chichibugahama-sky-in-tide':['hijiki-tidal-time','what-cyclists-leave-behind','tomo-two-act-tidal-port'],
  'tatsuno-water-castle-and-soy-sauce':['shodoshima-open-island','shodoshima-somen-to-sesame-oil','yanai-trade-profit-to-whitewalls'],
  'kojima-island-infrastructure-per-capita':['naoshima-water-across-sea','sanuki-store-the-rain','what-cyclists-leave-behind'],
  'takamatsu-sea-castle-to-gateway':['mihara-castle-to-multimodal-city','onomichi-capital-to-culture-and-ships','matsuyama-three-centers-one-city'],
  'mihara-castle-to-multimodal-city':['takamatsu-sea-castle-to-gateway','onomichi-capital-to-culture-and-ships','matsuyama-three-centers-one-city'],
  'what-cyclists-leave-behind':['tatara-bridge-citrus-seasons','ports-that-needed-waiting','chichibugahama-sky-in-tide'],
  'tatara-bridge-citrus-seasons':['mikan-slope-and-varieties','what-cyclists-leave-behind','awaji-onion-rice-field'],
  'kada-sea-bream-one-line':['kada-sea-bream-distribution-ecosystem','kitan-strait-tai-to-shirasu','tai-meshi-two-seas'],
  'kada-sea-bream-distribution-ecosystem':['kada-sea-bream-one-line','kitan-strait-tai-to-shirasu','shimonoseki-resource-made-by-market'],
  'kitan-strait-tai-to-shirasu':['kada-sea-bream-one-line','niboshi-shirasu-two-food-cultures','sawara-spring-two-gates'],
  'setouchi-sushi-not-nigiri':['sawara-spring-two-gates','shimotsui-tako-meshi','tai-meshi-two-seas'],
  'niboshi-shirasu-two-food-cultures':['ibuki-fat-sardines-revalued','kitan-strait-tai-to-shirasu','setouchi-shrimp-middle-layer'],
  'oyster-shells-after-the-meal':['oyster-shells-where-they-go','oysters-taste-of-small-seas','fish-waste-to-feed-and-citrus'],
  'shodoshima-somen-to-sesame-oil':['shodoshima-open-island','tatsuno-water-castle-and-soy-sauce','sanuki-store-the-rain'],
  'iwakuni-river-city':['sanuki-store-the-rain','mihara-castle-to-multimodal-city','takamatsu-sea-castle-to-gateway'],
  'shimonoseki-resource-made-by-market':['kada-sea-bream-distribution-ecosystem','oysters-taste-of-small-seas','shimotsui-tako-meshi'],
  'matsuyama-three-centers-one-city':['takamatsu-sea-castle-to-gateway','setouchi-itinerant-trade-boats','mihara-castle-to-multimodal-city'],
  'hiketa-castle-port-town':['takamatsu-sea-castle-to-gateway','iwagi-salt-pans-to-shrimp-ponds','ushimado-nagahama-kinkai-two-reclaimed-landscapes'],
  'tai-meshi-two-seas':['setouchi-sushi-not-nigiri','kada-sea-bream-one-line','shimotsui-tako-meshi'],
  'hijiki-tidal-time':['chichibugahama-sky-in-tide','tomo-two-act-tidal-port','shimotsui-tako-meshi'],
  'ibuki-fat-sardines-revalued':['niboshi-shirasu-two-food-cultures','setouchi-shrimp-middle-layer','citrus-pomace-cascade'],
  'after-the-solar-farm':['kinkai-salt-field-to-solar','ushimado-nagahama-kinkai-two-reclaimed-landscapes','sakaide-salt-fields-to-industry'],
  'tadano-shido-industrial-ecosystem':['miura-matsuyama-small-boiler-revolution','imabari-why-shipbuilding','niihama-after-copper'],
  'miura-matsuyama-small-boiler-revolution':['tadano-shido-industrial-ecosystem','imabari-why-shipbuilding','niihama-after-copper'],
  'sawara-spring-two-gates':['setouchi-sushi-not-nigiri','kitan-strait-tai-to-shirasu','oysters-taste-of-small-seas'],
  'kada-steel-data-center-transition':['niihama-after-copper','after-the-solar-farm','imabari-why-shipbuilding'],
  'setouchi-shrimp-middle-layer':['shodoshima-somen-to-sesame-oil','shimotsui-tako-meshi','niboshi-shirasu-two-food-cultures'],
  'setouchi-itinerant-trade-boats':['ports-that-needed-waiting','yanai-trade-profit-to-whitewalls','setouchi-ship-materials'],
  'setouchi-ship-materials':['imabari-why-shipbuilding','niihama-after-copper','setouchi-itinerant-trade-boats'],
  'kojima-jeans-circular-economy':['kojima-from-cotton-to-jeans','citrus-pomace-cascade','olive-pomace-to-cattle'],
};


// A small set of deliberately edited bridges: the next card offers a new
// question, not merely a matching tag. Keys are "current > next".
const editorialBridges = {
  'miura-matsuyama-small-boiler-revolution>niihama-after-copper':'全国でボイラを直す仕事と、鉱山の機械を直した仕事はどう違う？',
  'tadano-shido-industrial-ecosystem>niihama-after-copper':'クレーンの協力工場と、銅山の修理場から育った工場。どこが違う？',
  'niihama-after-copper>miura-matsuyama-small-boiler-revolution':'鉱山の機械から大型工場へ、精麦機から小型ボイラへ。仕事はどう変わった？',
  'niihama-after-copper>tadano-shido-industrial-ecosystem':'鉱山の工作方と高松の鉄工所。機械をつくる仕事の出発点は？',
  'imabari-why-shipbuilding>tadano-shido-industrial-ecosystem':'長い船体と長いクレーン。海辺の工場が必要とした広さは？',
  'oyster-shells-where-they-go>oyster-shells-after-the-meal':'大量の殻の一部は、折り鶴とどんな壁になった？',
  'oyster-shells-after-the-meal>oyster-shells-where-they-go':'白い壁の材料になる殻は、産地でどれほど余る？',
  'niboshi-shirasu-two-food-cultures>kitan-strait-tai-to-shirasu':'泉州のしらすは、どの海で生まれて港に来た？',
  'niboshi-shirasu-two-food-cultures>ibuki-fat-sardines-revalued':'出汁に向かなかった伊吹島のイワシは、どう食べる？',
  'faith-as-transport-map>gangi-tide-port-functions':'港の神社だけでなく、船着き場にも身分の違いがあった？',
  'imabari-why-shipbuilding>niihama-after-copper':'船の修理から育った港と、銅山の修理から育った工場。違いは？',
  'imabari-why-shipbuilding>setouchi-ship-materials':'船体を造る木材は、どこの山から来た？',
  'onomichi-capital-to-culture-and-ships>jinori-okinori-navigation-system':'尾道の港を通った船と、島の南を抜ける船の違いは？',
  'onomichi-capital-to-culture-and-ships>mihara-castle-to-multimodal-city':'鉄道は、隣の三原では城のどこを通った？',
  'jinori-okinori-navigation-system>tomo-two-act-tidal-port':'二つの航路の出発点、鞆では潮がどう動いた？',
  'jinori-okinori-navigation-system>mitarai-economy-of-waiting':'沖乗りの船は、御手洗にどんな仕事を残した？',
  'gangi-tide-port-functions>mitarai-economy-of-waiting':'御手洗の石段を上がると、どんな町があった？',
  'gangi-tide-port-functions>tomo-two-act-tidal-port':'石段の先の海では、東西の潮がいつ出会う？',
  'tomo-two-act-tidal-port>jinori-okinori-navigation-system':'鞆を出た船は、芸予の島々をどう抜けた？',
  'tomo-two-act-tidal-port>gangi-tide-port-functions':'鞆の潮の変化は、雁木の形にどう残った？',
  'mitarai-economy-of-waiting>gangi-tide-port-functions':'御手洗の雁木は、別の港の石段と何が違う？',
  'mitarai-economy-of-waiting>jinori-okinori-navigation-system':'御手洗へ向かう船は、島々のどちら側を通った？',
  'ports-that-needed-waiting>jinori-okinori-navigation-system':'港を選ぶ船の道は、地乗りと沖乗りでどう違った？',
  'ports-that-needed-waiting>tomo-two-act-tidal-port':'潮待ちの時刻は、月の動きでどう変わった？',
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
  'oysters-taste-of-small-seas>oyster-shells-where-they-go':'味を育てた牡蠣の殻は、食卓の前にどこへ集まる？',
  'oyster-shells-where-they-go>oysters-taste-of-small-seas':'牡蠣のおいしさは、海のどんな条件で決まる？',
  'naoshima-water-across-sea>sanuki-store-the-rain':'海の向こうから水を買う島と、雨をためる平野。何が違う？',
  'sanuki-store-the-rain>naoshima-water-across-sea':'ため池だけでは足りない島は、どうやって水を届ける？',
  'awaji-onion-rice-field>sanuki-store-the-rain':'田んぼの水を、雨の少ない土地はどう確保した？',
  'chichibugahama-sky-in-tide>hijiki-tidal-time':'同じ引き潮は、景色だけでなく人の仕事もつくる？',
  'tatsuno-water-castle-and-soy-sauce>shodoshima-open-island':'醤油づくりは、別の町ではどんな産業を生んだ？',
  'iwagi-salt-pans-to-shrimp-ponds>ushimado-nagahama-kinkai-two-reclaimed-landscapes':'海を仕切った土地は、別の湾では何に変わった？',
  'ushimado-nagahama-kinkai-two-reclaimed-landscapes>kinkai-salt-field-to-solar':'湿地と塩田の跡地は、太陽光発電とどう共存する？',
  'kojima-island-infrastructure-per-capita>naoshima-water-across-sea':'島に水を送るには、海の向こうとどうつながる？',
  'takamatsu-sea-castle-to-gateway>mihara-castle-to-multimodal-city':'海に面した城と、鉄道に貫かれた城。何が違う？',
  'mihara-castle-to-multimodal-city>takamatsu-sea-castle-to-gateway':'鉄道が横切った城と、埋立てで海から離れた城。',
  'what-cyclists-leave-behind>tatara-bridge-citrus-seasons':'橋の坂を越えた先に、どんな島の仕事がある？',
  'tatara-bridge-citrus-seasons>mikan-slope-and-varieties':'柑橘の斜面は、橋の先と宇和海ではどう違う？',
  'kada-sea-bream-one-line>kada-sea-bream-distribution-ecosystem':'一本の糸で釣った鯛は、港からどこへ行く？',
  'kada-sea-bream-distribution-ecosystem>kada-sea-bream-one-line':'港の仕事が守る鮮度は、海のどんな技から始まる？',
  'kitan-strait-tai-to-shirasu>niboshi-shirasu-two-food-cultures':'小さな魚は、釜と干し場でどんな味に変わる？',
  'kinkai-salt-field-to-solar>after-the-solar-farm':'発電所の契約期限を迎えたら、排水ポンプは誰が守る？',
  'ako-after-salt-fields>four-salt-fields':'赤穂だけでは見えない、塩田が残した四つの違いは？',
  'sakaide-salt-fields-to-industry>four-salt-fields':'塩田を失ったほかの町には、何が残った？',
  'shodoshima-open-island>shodoshima-somen-to-sesame-oil':'同じ島で、素麺がどうしてごま油工場を育てた？',
  'olive-pomace-to-cattle>shodoshima-open-island':'牛の飼料になるオリーブの島では、醤油の蔵から何が生まれた？',
  'mikan-slope-and-varieties>citrus-pomace-cascade':'斜面で収穫した柑橘は、搾ったあと何になる？',
  'takehara-salt-capital-to-townscape>four-salt-fields':'竹原の白壁と違い、別の塩田には何が残った？',
  'kitan-strait-tai-to-shirasu>kada-sea-bream-one-line':'同じ海峡の真鯛を、加太の漁師はどう釣る？',
  'setouchi-sushi-not-nigiri>sawara-spring-two-gates':'祝いの寿司に使う春のサワラは、どの海から来た？',
  'shodoshima-somen-to-sesame-oil>shodoshima-open-island':'麺の油とは別に、醤油の蔵からどんな食品が生まれた？',
  'iwakuni-river-city>sanuki-store-the-rain':'洪水に備える橋と、渇水に備えるため池。水の費用は？',
  'shimonoseki-resource-made-by-market>kada-sea-bream-distribution-ecosystem':'ふぐの市場と真鯛の生簀。港は魚の価値をどう守る？',
  'matsuyama-three-centers-one-city>takamatsu-sea-castle-to-gateway':'港が移った松山と、海から離れた高松城の違いは？',
  'hiketa-castle-port-town>takamatsu-sea-castle-to-gateway':'砂州の港町と海に開いた城。土地の条件はどう違う？',
  'tai-meshi-two-seas>setouchi-sushi-not-nigiri':'魚と米の料理は、なぜ握らない寿司にもなった？',
  'hijiki-tidal-time>chichibugahama-sky-in-tide':'夜の採集と夕日の写真。同じ引き潮をどう使う？',
  'ibuki-fat-sardines-revalued>niboshi-shirasu-two-food-cultures':'干さない脂イワシと、泉州のしらすは何が違う？',
  'after-the-solar-farm>kinkai-salt-field-to-solar':'2038年の先を考える前に、錦海の排水責任はどう生まれた？',
  'tadano-shido-industrial-ecosystem>miura-matsuyama-small-boiler-revolution':'同じ四国の機械メーカーが、大型化と小型化を選んだ理由は？',
  'miura-matsuyama-small-boiler-revolution>tadano-shido-industrial-ecosystem':'小型化と大型化。四国の機械企業が選んだ逆の道は？',
  'sawara-spring-two-gates>setouchi-sushi-not-nigiri':'春のサワラは、瀬戸内の祝いの寿司にどう使われた？',
  'kada-steel-data-center-transition>niihama-after-copper':'海辺で鉄をつくる町と、山から銅を下ろした町。何が違う？',
  'setouchi-shrimp-middle-layer>shodoshima-somen-to-sesame-oil':'小エビの出汁を受け止める素麺は、島でどうつくられる？',
  'setouchi-itinerant-trade-boats>ports-that-needed-waiting':'停泊船を客にした島と、船宿を開いた港。商いはどう違う？',
  'setouchi-ship-materials>imabari-why-shipbuilding':'九州の杉で船をつくった海は、鋼船の時代にどう変わった？',
  'kojima-jeans-circular-economy>kojima-from-cotton-to-jeans':'鋲を外すジーンズの町は、もともと何を縫っていた？',
  'shodoshima-somen-to-sesame-oil>tatsuno-water-castle-and-soy-sauce':'小豆島の素麺と龍野の醤油。水の使い方はどう違う？',
  'tadano-shido-industrial-ecosystem>imabari-why-shipbuilding':'長いクレーンのブームと巨大な船。工場に必要な土地は？',
  'miura-matsuyama-small-boiler-revolution>imabari-why-shipbuilding':'松山のボイラ技術は、造船の町とどうつながった？',
  'after-the-solar-farm>ushimado-nagahama-kinkai-two-reclaimed-landscapes':'発電所の外側には、どんな干拓地と湿地が広がる？',
  'setouchi-itinerant-trade-boats>yanai-trade-profit-to-whitewalls':'布を売り歩いた島と、木綿を運んだ白壁の町は？',
  'olive-pomace-to-cattle>citrus-pomace-cascade':'オリーブと柑橘の搾りかす。牛の餌にする工夫は？',
  'mikan-slope-and-varieties>tatara-bridge-citrus-seasons':'宇和海の石垣と、多々羅大橋の先の柑橘畑はどう違う？',
  'shimotsui-tako-meshi>setouchi-shrimp-middle-layer':'タコと小エビ。料理の違いは漁場の底から始まる？',
  'sakaide-salt-fields-to-industry>after-the-solar-farm':'太陽光発電を始めたあと、土地を引き継ぐ仕事は？',
  'shodoshima-open-island>tatsuno-water-castle-and-soy-sauce':'小豆島の醤油蔵と、龍野の淡口醤油。水の条件は？',
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
