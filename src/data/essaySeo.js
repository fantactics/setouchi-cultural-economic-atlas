// Search-facing metadata: retain the literary on-page H1 while using an
// explicit question and place when this improves search-intent clarity.
// Re-check curated entries when the corresponding essay is rewritten.
const normalize=(value)=>String(value||'').replace(/\s+/g,' ').trim();

const firstSentence=(value)=>{
  const text=normalize(value);
  return text.match(/^[^。！？!?]+[。！？!?]/u)?.[0]||text;
};

const finishSentence=(value)=>{
  const text=normalize(value).replace(/[。！？!?]+$/u,'');
  return text?`${text}。`:'';
};

// These are hypotheses about reader questions, not measured search volumes.
// The title shown to readers in the article remains article.title.
export const essaySeoFocus={
  'onomichi-capital-to-culture-and-ships':{
    title:'尾道に寺と坂道が多いのはなぜ？寺領と鉄道がつくった町',
    description:'尾道の山門と本堂を鉄道が隔てるのはなぜか。寺有地、斜面、市街地の発展と交通の変化から、尾道の坂道と寺の風景を読み解く。'
  },
  'sanuki-store-the-rain':{
    title:'香川・讃岐平野にため池が多いのはなぜ？少雨と水配分',
    description:'雨が少ない讃岐平野に数多くのため池がある理由を、短い河川、降水条件、水利の工夫からたどる。線香で水を分ける約束の背景にも迫る。'
  },
  'kojima-from-cotton-to-jeans':{
    title:'児島はなぜジーンズの産地に？綿花・足袋・学生服の歴史',
    description:'岡山県児島がジーンズの町になった理由とは。干拓地の綿花から足袋、学生服、デニムへ。土地の条件と縫製技術の変化をたどる。'
  },
  'kojima-jeans-circular-economy':{
    title:'児島のノーリベットジーンズはなぜ鋲を外したのか',
    description:'丈夫さの象徴だったリベットを、なぜ児島のジーンズ職人は外したのか。繊維の再利用や裁断くずの循環から、産地の新しい技術を読む。'
  },
  'oyster-shells-where-they-go':{
    title:'広島の牡蠣殻はどう処理される？年20万立方メートルの行方',
    description:'広島県で年約20万立方メートル発生する牡蠣殻は、どこへ行くのか。海中保管から肥料・飼料、海底の環境改善まで、産地の物流をたどる。'
  },
  'ports-that-needed-waiting':{
    title:'瀬戸内の港はなぜ潮待ち・風待ちをしたのか',
    description:'潮待ち・風待ちの港は、なぜ商いと宿の町になったのか。鞆の浦、御手洗、多度津、尾道に残る港の時間と産業の変化をたどる。'
  },
  'tomo-two-act-tidal-port':{
    title:'鞆の浦が潮待ちの港として栄えた理由とは',
    description:'鞆の浦の雁木や港町の建物は、どんな船の往来を支えてきたのか。潮汐と瀬戸内の航海、港の役割の変遷から景観を読み解く。'
  },
  'yanai-trade-profit-to-whitewalls':{
    title:'柳井の白壁の町並みはなぜできた？木綿と菜種油の交易',
    description:'山口県柳井の白壁の町並みは、どんな商いから生まれたのか。川の港、木綿と菜種油の流通、商家や蔵が並ぶ町の構造を読み解く。'
  },
  'takehara-salt-capital-to-townscape':{
    title:'竹原の町並みと塩田はどうつながる？塩づくりが残した白壁',
    description:'広島県竹原の歴史的町並みと、かつての塩田の関係とは。干拓地の塩づくりで蓄えた富が、白壁の商家の景観へ変わる歴史をたどる。'
  },
  'imabari-why-shipbuilding':{
    title:'今治で造船業が発達したのはなぜ？波止浜の海と産業の転換',
    description:'今治・波止浜では、塩田のあった海辺がどのように造船の産地になったのか。遠浅の海と深い海、船の大型化から地域産業を読み解く。'
  }
};

export const essaySearchMeta=(article)=>{
  const title=normalize(article?.title)||'地域エッセイ';
  const subtitle=normalize(article?.subtitle);
  const lead=firstSentence(article?.lead);
  const focus=essaySeoFocus[article?.slug];
  const seoTitle=focus?.title?`${focus.title}｜SETOUCHI ATLAS`:`${title}｜SETOUCHI ATLAS`;
  const first=finishSentence(subtitle||title);
  const fallbackDescription=lead&&lead!==first&&first.length+lead.length<=170?first+lead:first;
  return {title:seoTitle,description:focus?.description||fallbackDescription};
};
