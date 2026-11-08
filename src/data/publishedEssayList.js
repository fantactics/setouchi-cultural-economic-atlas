// One canonical discovery pool for internal links.
// The dedicated archived research versions are intentionally excluded.
import { orderedBookArticles } from './bookArticles.js';
import { withMarkdownMetadata } from './essayMarkdownMetadata.js';
import { kadaEssays } from './kadaEssays.js';
import { kadaIndustryEssay } from './kadaIndustryEssay.js';
import { cycleTourismEssay } from './cycleTourismEssay.js';
import { shimotsuiHijikiEssay } from './shimotsuiHijikiEssay.js';
import { tomoTwoActPortEssay } from './tomoTwoActPortEssay.js';
import { portSystemEssays } from './portSystemEssays.js';
import { niboshiShirasuEssay } from './niboshiShirasuEssay.js';
import { setouchiSushiEssay } from './setouchiSushiEssay.js';
import { setouchiShrimpEssay } from './setouchiShrimpEssay.js';
import { setouchiItinerantTradeBoatsEssay } from './setouchiItinerantTradeBoatsEssay.js';
import { setouchiShipMaterialsEssay } from './setouchiShipMaterialsEssay.js';
import { kojimaCircularEssay } from './kojimaCircularEssay.js';
import { kojimaIslandEssays } from './kojimaIslandEssays.js';
import { quageoSetouchiEssays } from './quageoSetouchiEssays.js';

export const publishedEssays=[...new Map([
  ...orderedBookArticles,
  ...kadaEssays,kadaIndustryEssay,cycleTourismEssay,shimotsuiHijikiEssay,
  tomoTwoActPortEssay,...portSystemEssays,niboshiShirasuEssay,
  setouchiSushiEssay,setouchiShrimpEssay,setouchiItinerantTradeBoatsEssay,
  setouchiShipMaterialsEssay,kojimaCircularEssay,
  ...kojimaIslandEssays,...quageoSetouchiEssays
].filter((article)=>article?.slug).map((article)=>[article.slug,withMarkdownMetadata(article)])).values()];
