// Short reader-facing blurbs for cards. Keep article subtitles and source data unchanged.
// A photoId here only changes discovery cards, never the article hero or credits.
export const essayCardCopy = {
  "four-salt-fields": {
    "teaser": "塩田が消えた四つの町。それぞれに残ったものは、なぜ違うのだろう。"
  },
  "kojima-from-cotton-to-jeans": {
    "teaser": "ジーンズストリートから、足袋と学生服の町だった頃へさかのぼる。",
    "photoId": "photo-kojima-jeans"
  },
  "ports-that-needed-waiting": {
    "teaser": "船が潮や風を待つ時間が、瀬戸内の港町を育ててきた。",
    "photoId": "photo-tomonoura-port"
  },
  "imabari-why-shipbuilding": {
    "teaser": "急流の海峡と静かな入り江。船を直す仕事から始まる今治の物語。",
    "photoId": "photo-imabari-shipyard"
  },
  "niihama-after-copper": {
    "teaser": "山の銅を掘る仕事は、どうして海辺の工場へ姿を変えたのか。"
  },
  "shodoshima-open-island": {
    "teaser": "醤油、そうめん、オリーブ。島の味は海を渡ってきたものから生まれた。",
    "photoId": "photo-shodoshima-hishio-yamasan"
  },
  "faith-as-transport-map": {
    "teaser": "海を渡って伝わった信仰をたどると、昔の航路が見えてくる。"
  },
  "sanuki-store-the-rain": {
    "teaser": "雨の少ない讃岐で、人々は水を貯め、分け合う方法を育ててきた。"
  },
  "iwakuni-river-city": {
    "teaser": "何度も流される橋を、なぜ架け続けたのか。錦帯橋から城下町を読む。"
  },
  "onomichi-capital-to-culture-and-ships": {
    "teaser": "寺の屋根の向こうに造船所。港町の二つの歴史を眺める。"
  },
  "takehara-salt-capital-to-townscape": {
    "teaser": "塩づくりの富は、竹原の白壁と町家になって残った。"
  },
  "mitarai-economy-of-waiting": {
    "teaser": "船が待つあいだ、人が泊まり、商いが生まれた島の港。",
    "photoId": "photo-mitarai-townscape"
  },
  "yanai-trade-profit-to-whitewalls": {
    "teaser": "白壁の商家が続く柳井。港の商いは町に何を残したのか。"
  },
  "mihara-castle-to-multimodal-city": {
    "teaser": "駅の下に城の本丸がある。三原の街を変えた交通の選択。"
  },
  "matsuyama-three-centers-one-city": {
    "teaser": "港、駅、城下町。松山の中心は、なぜ一か所ではないのか。"
  },
  "hiketa-castle-port-town": {
    "teaser": "城のある岬を仰ぎながら、引田の港町の時間を歩く。"
  },
  "ako-after-salt-fields": {
    "teaser": "塩田はなくなった。それでも塩をつくり続ける赤穂の仕事。"
  },
  "takamatsu-sea-castle-to-gateway": {
    "teaser": "海に開いた城下町から、四国の玄関口へ。高松の水辺を歩く。",
    "photoId": "photo-takamatsu-seawater-moat"
  },
  "shimotsui-tako-meshi": {
    "teaser": "潮の速い海で獲れるタコは、どうしてこの土地のご飯になったのか。",
    "photoId": "photo-shimotsui-dried-octopus"
  },
  "oysters-taste-of-small-seas": {
    "teaser": "牡蠣の筏が浮かぶ海を、食卓からもう一度眺める。"
  },
  "hijiki-tidal-time": {
    "teaser": "ひじきの暮らしは、満ち潮と引き潮のあいだにある。"
  },
  "mikan-slope-and-varieties": {
    "teaser": "海へ向かう石垣の斜面に、みかんを育てる理由がある。"
  },
  "oyster-shells-after-the-meal": {
    "teaser": "広島の牡蠣殻が、畑の肥料から白い壁や車の部品に変わる。"
  },
  "sea-bream-scales-to-collagen": {
    "teaser": "宇和海の鯛から取り除かれたウロコが、遠くの研究所へ渡る。"
  },
  "fish-waste-to-feed-and-citrus": {
    "teaser": "魚をさばいたあとに残るものが、みかん畑の土を支える。"
  },
  "olive-pomace-to-cattle": {
    "teaser": "オリーブの実を搾ったあと、残りものは牛の牧場へ向かう。"
  },
  "soy-sauce-lees-to-chomeiso": {
    "teaser": "小豆島の醤油蔵から長命草の畑へ。島の新しい挑戦。"
  },
  "ibuki-fat-sardines-revalued": {
    "teaser": "伊吹島のイワシは、脂がのったとき別の行き先を見つけた。"
  },
  "citrus-pomace-cascade": {
    "teaser": "ジュースの搾りかすも、剪定した枝も。愛媛のみかんには、収穫後も仕事が続く。"
  },
  "kinkai-salt-field-to-solar": {
    "teaser": "かつて海だった錦海塩田。広い土地を太陽光に使い直す。"
  },
  "sakaide-salt-fields-to-industry": {
    "teaser": "工場が立つ海辺は、昔の塩田か、新しく造った陸地か。",
    "photoId": "photo-sakaide-bannosu"
  },
  "ako-salt-fields-to-city": {
    "teaser": "塩田がなくなったあと、工場と住宅地と公園が生まれた。"
  },
};

export const cardTeaser = (article) => essayCardCopy[article.slug]?.teaser || ((article.subtitle || article.lead || '').slice(0,65).replace(/[、。・\s]+$/u,'') + '。');
export const cardPhotoId = (article) => essayCardCopy[article.slug]?.photoId || article.heroPhotoId;
