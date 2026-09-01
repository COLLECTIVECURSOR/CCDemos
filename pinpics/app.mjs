const record = (id, ppNumber, name, character, set, year, rarity, edition, editionType, origin, prototype, releaseDate, art, position, description, relatedSet, image = '', imageAlt = '', sprite = '') => ({ id, ppNumber, name, character, set, year, rarity, edition, editionType, origin, prototype, releaseDate, art, position, description, relatedSet, image, imageAlt, sprite, demo:true });

export const pins = [
  record('pp-158214','PP#158214','Midnight Celestial Crest','Archive Icons','Classic Character Archive',2025,'Limited edition','LE 750','limited-edition','Disney Parks',false,'2025-06-12','hero','50% 50%','A midnight-blue celestial crest with polished gold edging and layered enamel.','archive','./assets/images/pins/midnight-celestial-crest.webp','Midnight-blue circular celestial crest pin with three moon forms and polished gold edging on white.'),
  record('pp-157908','PP#157908','Enchanted Castle Anniversary','Park Heritage','Park Heritage',2024,'Featured','Open edition','open-edition','Disney Parks',false,'2024-10-03','hero','50% 50%','An ivory and gold castle commemorative pin celebrating collector history.','archive','./assets/images/pins/enchanted-castle-anniversary.webp','Ivory enamel anniversary castle pin with blue roofs and warm gold metalwork on a white studio background.'),
  record('pp-156772','PP#156772','Winter Crystal Emblem','Seasonal Icons','Seasonal Icons',2024,'Rare','LE 1000','limited-edition','WDI',false,'2024-01-18','hero','50% 50%','A dimensional winter crystal emblem in translucent ice-blue enamel.','seasonal','./assets/images/pins/winter-crystal-emblem.webp','Faceted ice-blue crystal enamel pin with silver metal edges and a soft studio shadow on white.'),
  record('pp-155431','PP#155431','Ocean Wayfinder Compass','Adventure Voyagers','Adventure Voyagers',2023,'Limited edition','LE 500','limited-edition','Disney Auctions',false,'2023-08-02','finale','50% 50%','A turquoise compass record with antique-gold wayfinding details.','voyagers','./assets/images/pins/ocean-wayfinder-compass.webp','Turquoise enamel compass pin with antique-gold points and dimensional metal construction on white.'),
  record('pp-153219','PP#153219','Storybook Apple','Classic Storybook','Classic Storybook',2022,'Featured','Open edition','open-edition','Disney Parks',false,'2022-04-14','finale','50% 50%','A rich red storybook apple with botanical and open-book detailing.','storybook','./assets/images/pins/storybook-apple.webp','Red enamel apple pin with a raised gold open book and green botanical details on a white studio sweep.'),
  record('pp-151884','PP#151884','Midnight Gala Bow','Classic Friends','Classic Friends Gala',2021,'Rare','LE 1500','limited-edition','WDI',false,'2021-11-19','finale','50% 50%','A formal black and ruby bow finished with warm gold trim and glitter enamel.','gala','./assets/images/pins/midnight-gala-bow.webp','Black and ruby glitter enamel gala bow pin with polished gold trim and a soft shadow on white.'),
  record('pp-150103','PP#150103','Glass Slipper Story','Storytime Icons','Storytime Collection',2020,'Limited edition','LE 800','limited-edition','Disney Parks',false,'2020-07-09','hero','50% 50%','A translucent pale-blue glass slipper record with a silver frame.','storytime','./assets/images/pins/glass-slipper-story.webp','Translucent pale-blue glass slipper pin with a silver edge and jewel detail on a white studio background.'),
  record('pp-150102','PP#150102','Enchanted Rose Story','Storytime Icons','Storytime Collection',2020,'Limited edition','LE 800','limited-edition','Disney Parks',false,'2020-06-11','finale','50% 50%','A layered red rose displayed inside a gold-framed glass dome.','storytime','./assets/images/pins/enchanted-rose-story.webp','Deep red rose enamel pin inside a dimensional gold-framed glass dome on a white studio background.'),
  record('pp-150101','PP#150101','Storytime Floating Lantern','Rapunzel','Storytime Collection',2020,'Limited edition','LE 800','limited-edition','Disney Parks',false,'2020-05-08','finale','25% 47%','One of three missing Storytime Collection records with warm lantern enamel.','storytime','./assets/images/pins/enchanted-rose-story.webp','Illustrative warm-gold storybook lantern enamel pin photographed on white.'),
  record('pp-148840','PP#148840','Figment Imagination Portal','Figment','EPCOT Icons',2019,'Limited release','Limited release','limited-release','Disney Parks',false,'2019-09-21','hero','61% 50%','A portal-shaped release celebrating imaginative park history.','epcot','./assets/images/pins/ocean-wayfinder-compass.webp','Illustrative turquoise imagination portal enamel pin photographed on white.'),
  record('pp-146500','PP#146500','Maleficent Dragon Crest','Maleficent','Disney Villains',2018,'Rare','LE 500','limited-edition','Disney Auctions',false,'2018-10-05','hero','73% 48%','A dramatic dragon crest with deep violet translucent enamel.','villains','./assets/images/pins/midnight-gala-bow.webp','Illustrative midnight dragon crest enamel pin photographed on white.'),
  record('pp-143201','PP#143201','Tiana Bayou Bloom','Tiana','Royal Gardens',2017,'Featured','Open edition','open-edition','Disney Parks',false,'2017-04-22','finale','12% 49%','A botanical enamel design with water-lily and brass details.','gardens','./assets/images/pins/storybook-apple.webp','Illustrative botanical bayou bloom enamel pin photographed on white.'),
  record('pp-139914','PP#139914','Baymax Care Companion','Baymax','Tomorrowland Friends',2016,'Prototype','Pre-production','unknown-edition','Studio Store',true,'2016-02-09','hero','47% 54%','An illustrative pre-production record used to demonstrate prototype filtering.','tomorrow','./assets/images/pins/winter-crystal-emblem.webp','Illustrative pre-production care companion emblem photographed on white.'),
  record('pp-136720','PP#136720','Ariel Ocean Jewel','Ariel','Undersea Treasures',2015,'Limited release','Limited release','limited-release','WDI',false,'2015-07-16','finale','32% 52%','A jewel-like ocean emblem with layered pearlescent enamel.','undersea','./assets/images/pins/glass-slipper-story.webp','Illustrative pearlescent ocean jewel enamel pin photographed on white.'),
  record('pp-132440','PP#132440','Pooh Hundred Acre Badge','Winnie the Pooh','Storybook Friends',2014,'Featured','Open edition','open-edition','Disney Parks',false,'2014-03-28','hero','30% 48%','A soft-gold badge inspired by well-loved storybook collections.','storybook','./assets/images/pins/enchanted-castle-anniversary.webp','Illustrative soft-gold storybook badge enamel pin photographed on white.'),
  record('pp-128880','PP#128880','Archive Proof Medallion','Mickey Mouse','Disney Archives',2013,'Prototype','Artist proof','unknown-edition','Disney Auctions',true,'2013-01-12','finale','70% 48%','An illustrative artist-proof record for comparison and filter demos.','archive','./assets/images/pins/midnight-celestial-crest.webp','Illustrative artist-proof archive medallion photographed on white.'),
  record('demo-160101','DEMO PP#160101','Moonlit Observatory Medallion','Celestial Icons','Night at the Archive',2026,'Limited edition','LE 500','limited-edition','Demo Park Collection',false,'2026-08-19','studio','50% 50%','An original observatory medallion with midnight enamel, a crescent moon, and warm gold telescope details.','celestial','./assets/images/pin-sheets/demo-pin-sheet-4.webp','Original moonlit observatory enamel medallion on a white studio background.','0% 0%'),
  record('demo-160102','DEMO PP#160102','Art Deco Theatre Marquee','Park Architecture','Night at the Archive',2026,'Limited release','Limited release','limited-release','Demo Studio Collection',false,'2026-08-15','studio','50% 50%','An original ruby, navy, and gold theatre marquee inspired by evening collector events.','celestial','./assets/images/pin-sheets/demo-pin-sheet-4.webp','Original art deco theatre marquee enamel pin on a white studio background.','100% 0%'),
  record('demo-160103','DEMO PP#160103','Jungle Wayfinder Compass','Adventure Icons','Expedition Keepsakes',2026,'Featured','Open edition','open-edition','Demo Park Collection',false,'2026-08-08','studio','50% 50%','A deep teal compass framed by enamel jungle leaves and polished antique-gold points.','expedition','./assets/images/pin-sheets/demo-pin-sheet-4.webp','Original teal jungle compass enamel pin on a white studio background.','0% 100%'),
  record('demo-160104','DEMO PP#160104','Ivory Carousel Crest','Attraction Icons','Heritage Attractions',2026,'Limited edition','LE 900','limited-edition','Demo Imagineering Collection',false,'2026-07-30','studio','50% 50%','An ivory and ruby carousel crest with dimensional horses and ornate warm-gold trim.','heritage','./assets/images/pin-sheets/demo-pin-sheet-4.webp','Original ivory carousel crest enamel pin on a white studio background.','100% 100%'),
  record('demo-160105','DEMO PP#160105','Crimson Lantern Crest','Storybook Objects','Storybook After Dark',2026,'Limited edition','LE 650','limited-edition','Demo Park Collection',false,'2026-07-22','studio','50% 50%','A glowing crimson lantern surrounded by an original thorn-and-flame crest in polished gold.','after-dark','./assets/images/pin-sheets/demo-pin-sheet-1.webp','Original crimson lantern crest enamel pin on a white studio background.','0% 0%'),
  record('demo-160106','DEMO PP#160106','Frostline Railway Badge','Attraction Icons','Mountain Railways',2026,'Featured','Open edition','open-edition','Demo Resort Collection',false,'2026-07-14','studio','50% 50%','A frosted mountain railway badge with icy blue enamel, silver rails, and dimensional scenery.','railways','./assets/images/pin-sheets/demo-pin-sheet-1.webp','Original frosted mountain railway enamel badge on a white studio background.','100% 0%'),
  record('demo-160107','DEMO PP#160107','Violet Dragon Scale Shield','Fantasy Creatures','Mythic Shields',2026,'Limited edition','LE 400','limited-edition','Demo Studio Collection',false,'2026-07-02','studio','50% 50%','A violet scale shield with sculpted wings and antiqued silver edges, created for this demo archive.','mythic','./assets/images/pin-sheets/demo-pin-sheet-1.webp','Original violet dragon-scale shield enamel pin on a white studio background.','0% 100%'),
  record('demo-160108','DEMO PP#160108','Coral Reef Pearl Emblem','Ocean Icons','Undersea Treasures',2026,'Limited release','Limited release','limited-release','Demo Cruise Collection',false,'2026-06-23','studio','50% 50%','A coral shell and pearl emblem with translucent sea-glass details and warm-gold metalwork.','undersea','./assets/images/pin-sheets/demo-pin-sheet-1.webp','Original coral reef pearl enamel emblem on a white studio background.','100% 100%'),
  record('demo-160109','DEMO PP#160109','Midnight Library Key','Storybook Objects','Archive Keys',2026,'Limited edition','LE 750','limited-edition','Demo Archive Collection',false,'2026-06-15','studio','50% 50%','An ornate midnight-blue key crowned with tiny books, candlelight, and a crescent archive window.','archive-keys','./assets/images/pin-sheets/demo-pin-sheet-3.webp','Original midnight library key enamel pin on a white studio background.','0% 0%'),
  record('demo-160110','DEMO PP#160110','Golden Harvest Wreath','Seasonal Icons','Seasonal Icons',2026,'Featured','Open edition','open-edition','Demo Park Collection',false,'2026-06-01','studio','50% 50%','A warm-gold harvest wreath with amber enamel berries, leaves, and an autumn sunflower.','seasonal','./assets/images/pin-sheets/demo-pin-sheet-3.webp','Original golden harvest wreath enamel pin on a white studio background.','100% 0%'),
  record('demo-160111','DEMO PP#160111','Constellation Hourglass','Celestial Icons','Night at the Archive',2026,'Limited edition','LE 600','limited-edition','Demo Archive Collection',false,'2026-05-20','studio','50% 50%','A sapphire hourglass filled with two original constellation patterns and tiny polished stars.','celestial','./assets/images/pin-sheets/demo-pin-sheet-3.webp','Original blue constellation hourglass enamel pin on a white studio background.','0% 100%'),
  record('demo-160112','DEMO PP#160112','Emerald Riverboat Wheel','Attraction Icons','Heritage Attractions',2026,'Limited release','Limited release','limited-release','Demo Resort Collection',false,'2026-05-05','studio','50% 50%','An emerald riverboat wheel medallion with a dimensional paddle steamer and misty forest enamel.','heritage','./assets/images/pin-sheets/demo-pin-sheet-3.webp','Original emerald riverboat wheel enamel medallion on a white studio background.','100% 100%'),
  record('demo-160113','DEMO PP#160113','Winter Castle Snow Globe','Seasonal Icons','Winter Keepsakes',2026,'Limited edition','LE 800','limited-edition','Demo Park Collection',false,'2026-04-18','studio','50% 50%','A silver snow-globe silhouette with a completely original winter castle and floating enamel snow.','winter','./assets/images/pin-sheets/demo-pin-sheet-2.webp','Original silver winter castle snow-globe enamel pin on a white studio background.','0% 0%'),
  record('demo-160114','DEMO PP#160114','Turquoise Desert Star','Adventure Icons','Expedition Keepsakes',2026,'Featured','Open edition','open-edition','Demo Resort Collection',false,'2026-04-02','studio','50% 50%','A turquoise compass star over an original desert river landscape with gold-edged mountains.','expedition','./assets/images/pin-sheets/demo-pin-sheet-2.webp','Original turquoise desert star compass enamel pin on a white studio background.','100% 0%'),
  record('demo-160115','DEMO PP#160115','Rose Masquerade Fan','Celebration Icons','Midnight Gala',2026,'Limited edition','LE 550','limited-edition','Demo Studio Collection',false,'2026-03-17','studio','50% 50%','A rose-gold folding fan with a sculpted masquerade mask and pearl-white enamel panels.','gala','./assets/images/pin-sheets/demo-pin-sheet-2.webp','Original rose-gold masquerade fan enamel pin on a white studio background.','0% 100%'),
  record('demo-160116','DEMO PP#160116','Cobalt Lighthouse Beacon','Ocean Icons','Coastal Beacons',2026,'Limited release','Limited release','limited-release','Demo Cruise Collection',false,'2026-03-01','studio','50% 50%','A cobalt lighthouse badge with a dimensional gold light beam, midnight sky, and rolling enamel waves.','coastal','./assets/images/pin-sheets/demo-pin-sheet-2.webp','Original cobalt lighthouse beacon enamel pin on a white studio background.','100% 100%'),
];

export const storyChapters = [
  { id:'beginnings', label:'Chapter I', title:'Once upon a pin', owned:9, total:12, copy:'Nine Storytime pins are safely catalogued. Three chapters are still waiting to be found.' },
  { id:'adventures', label:'Chapter II', title:'Beyond the castle', owned:7, total:10, copy:'Your adventure chapter follows wayfinders, dreamers, and collectors across the parks.' },
  { id:'friendship', label:'Chapter III', title:'Friends along the way', owned:11, total:12, copy:'One final friendship pin will complete this almost-finished page.' },
  { id:'finale', label:'Chapter IV', title:'Happily collected', owned:6, total:9, copy:'The finale chapter brings rare crests and evening editions together.' },
];

export const demoSets = [
  { id:'storytime',name:'Storytime Collection',type:'Nearly complete set',pinIds:['pp-150103','pp-150102','pp-150101','pp-153219'],owned:3,total:4 },
  { id:'celestial',name:'Night at the Archive',type:'Limited edition set',pinIds:['pp-158214','demo-160101','demo-160102','demo-160111'],owned:3,total:4 },
  { id:'expedition',name:'Expedition Keepsakes',type:'Attraction collection',pinIds:['pp-155431','demo-160103','demo-160114'],owned:2,total:3 },
  { id:'heritage',name:'Heritage Attractions',type:'Starter set',pinIds:['pp-157908','demo-160104','demo-160112'],owned:1,total:3 },
  { id:'seasonal',name:'Seasonal Icons',type:'Seasonal collection',pinIds:['pp-156772','demo-160110','demo-160113'],owned:2,total:3 },
  { id:'undersea',name:'Undersea Treasures',type:'Character collection',pinIds:['pp-136720','demo-160108','pp-155431'],owned:1,total:3 },
  { id:'gala',name:'Midnight Gala',type:'Personal custom set',pinIds:['pp-151884','demo-160115','demo-160102'],owned:3,total:3 },
  { id:'archive-keys',name:'Archive Keys',type:'Complete set',pinIds:['demo-160109','pp-128880','pp-158214'],owned:3,total:3 },
];

export const collectors = [
  { id:'collector-jamie',username:'Jamie M.',location:'Toronto, Canada',feedback:148,badge:'Trusted Trader demo',demo:true },
  { id:'collector-avery',username:'Avery K.',location:'Orlando, USA',feedback:203,badge:'Archive contributor demo',demo:true },
  { id:'collector-river',username:'RiverPins',location:'Portland, USA',feedback:91,badge:'Set builder demo',demo:true },
  { id:'collector-lantern',username:'LanternLass',location:'London, UK',feedback:176,badge:'Event regular demo',demo:true },
  { id:'collector-maple',username:'MaplePins',location:'Montreal, Canada',feedback:122,badge:'Community helper demo',demo:true },
];

export const demoProfile = {
  username:'Jamie M.',collectorId:'collector-jamie',memberSince:'Demo profile · 2018',
  owns:['pp-158214','pp-157908','pp-156772','pp-155431','pp-153219','pp-150103','demo-160101','demo-160103','demo-160109'],
  wants:['pp-150101','demo-160104','demo-160108','demo-160113'],
  trades:['pp-151884','demo-160102','demo-160110'],completedSets:2,badges:['Trade ready','Archive helper','Event regular'],
  disclosure:'Fictional collector profile for this interface demo.',
};

export const tradeMatches = [
  { id:'trade-1',collectorId:'collector-avery',score:97,status:'New Match',youOffer:['pp-151884'],theyOffer:['pp-150101'] },
  { id:'trade-2',collectorId:'collector-river',score:92,status:'Proposed',youOffer:['demo-160102'],theyOffer:['demo-160104'] },
  { id:'trade-3',collectorId:'collector-lantern',score:88,status:'Awaiting Reply',youOffer:['demo-160110'],theyOffer:['demo-160113'] },
  { id:'trade-4',collectorId:'collector-maple',score:84,status:'Accepted',youOffer:['pp-151884','demo-160102'],theyOffer:['demo-160108'] },
  { id:'trade-5',collectorId:'collector-avery',score:79,status:'Completed',youOffer:['demo-160110'],theyOffer:['pp-150101'] },
  { id:'trade-6',collectorId:'collector-river',score:74,status:'New Match',youOffer:['pp-151884'],theyOffer:['demo-160113'] },
];

export const forumCategories = [
  ['Introductions & help','Meet collectors and learn how PinPics works.','2.3K','ViciousLady · 4 hours ago'],
  ['Disney pin discussion','Release news, collection stories, and pinformation.','18.6K','TheTwins · 28 minutes ago'],
  ['Pin ID help','Share clear photos and ask the archive community.','7.4K','PinHunter · 2 hours ago'],
  ['Trade your Disney pins','Collector-to-collector trade conversations.','12.1K','Avery K. · 16 minutes ago'],
  ['Selling section','Member listings and marketplace guidance.','5.8K','MaplePins · 1 hour ago'],
  ['Fantasy pins','Discuss and trade Disney-themed fantasy pins.','3.2K','EnamelDreamer · 3 hours ago'],
];

export const discussions = [
  ['Welcome to the demo collector community','Member Introductions','NewCollector22',8,124,'MaplePins','18 min ago'],
  ['How do you catalogue a newly found pin?','PinPics Site Help','ArchiveGuide',14,302,'RiverPins','27 min ago'],
  ['Help identifying this midnight crest','Pin ID Help','LanternLass',6,188,'Jamie M.','42 min ago'],
  ['Looking to complete a Storytime set','Trade Your Disney Pins','Jamie M.',21,487,'Avery K.','1 hr ago'],
  ['Show us your attraction collections','Disney Pin Discussion','MaplePins',35,912,'RiverPins','2 hrs ago'],
  ['Tips for photographing pin backs clearly','PinPics Site Help','Avery K.',11,255,'LanternLass','3 hrs ago'],
  ['Toronto trading night planning thread','Events Discussion','Jamie M.',18,401,'MaplePins','4 hrs ago'],
  ['What makes a good fair trade package?','Trade Your Disney Pins','RiverPins',27,766,'Avery K.','5 hrs ago'],
  ['Seasonal set completion showcase','Pin Showroom','LanternLass',16,530,'Jamie M.','Yesterday'],
  ['Fantasy pin disclosure and forum etiquette','Fantasy Disney-themed Pins','ArchiveGuide',9,318,'RiverPins','Yesterday'],
  ['Database search: less can be more','Pin ID Help','MaplePins',13,604,'Avery K.','2 days ago'],
  ['Share your first completed collector set','Member Introductions','NewCollector22',24,845,'LanternLass','3 days ago'],
].map(([title,category,author,replies,views,latest,time],index)=>({ id:`discussion-${index+1}`,title,category,author,replies,views,latest,time,demo:true }));

export const events = [
  { id:'event-1', title:'PinPics live pin show', date:'2026-08-29', type:'online', place:'Demo community livestream', image:'event-live-show.webp',demo:true },
  { id:'event-2', title:'Toronto collector trading night', date:'2026-09-12', type:'in-person', place:'Toronto, Ontario · illustrative venue', image:'event-toronto-trading.webp',demo:true },
  { id:'event-3', title:'Storytime set spotlight', date:'2026-09-18', type:'online', place:'Demo community stage', image:'event-storytime-spotlight.webp',demo:true },
  { id:'event-4', title:'Orlando pin trading meetup', date:'2026-10-03', type:'in-person', place:'Orlando, Florida · illustrative venue', image:'event-orlando-meetup.webp',demo:true },
  { id:'event-5', title:'Archive search workshop', date:'2026-10-10', type:'online', place:'Demo help room', image:'event-live-show.webp',demo:true },
  { id:'event-6', title:'Autumn pin folio exchange', date:'2026-10-17', type:'in-person', place:'Chicago, Illinois · illustrative venue', image:'event-toronto-trading.webp',demo:true },
  { id:'event-7', title:'Trade package clinic', date:'2026-10-24', type:'online', place:'Demo Trade Assist room', image:'event-storytime-spotlight.webp',demo:true },
  { id:'event-8', title:'Coastal collector meetup', date:'2026-11-07', type:'in-person', place:'San Diego, California · illustrative venue', image:'event-orlando-meetup.webp',demo:true },
];

export const faqs = [
  ['How do I join PinPics?','The live service offers account registration. This modernization is an interface demo and does not create accounts.'],
  ['How does Trade Assist work?','Trade Assist compares what you want with pins another collector has marked for trade.'],
  ['How do I add a missing pin?','Search carefully first, then use Add Pin to preview the submission flow. Live submissions remain subject to PinPics rules and approval.'],
  ['Does PinPics authenticate pins?','PinPics does not authenticate pins. Collectors can share observations and comparisons in the community.'],
  ['What is mobile image search?','The mobile experience can use a pin photo to help narrow database results. This demo represents the entry point without uploading data.'],
  ['Where can I get account help?','Use the live PinPics contact and support routes for account-specific assistance.'],
  ['What is a PP number?','PinPics uses PP numbers to identify database listings. The records in this modernization use clearly marked demo identifiers unless otherwise disclosed.'],
  ['How should I search for a pin?','Start with a small number of distinctive words, then narrow by year, origin, edition, or another relevant filter.'],
  ['What are OWNS, WANTS, and TRADES?','These are the collector list terms used by PinPics for pins you own, want, or have available to trade.'],
  ['Can I compare pins?','The live database offers comparison for signed-in members. This demo lets you select up to three illustrative records.'],
  ['When can a member submit a pin?','The live FAQ says members may submit after 30 days and should search carefully first; submissions are reviewed and must follow photo guidelines.'],
  ['How do I suggest a listing correction?','The live FAQ directs eligible members to the Suggest Changes control on a pin listing. This demo does not send corrections.'],
  ['Can members buy and sell?','The live FAQ says registered members gain access to the Buying & Selling forum after 30 days. This demo has no marketplace or payment flow.'],
  ['Can I catalogue fantasy pins?','PinPics says it no longer accepts fantasy-pin database submissions, while dedicated forum boards support discussion, trading, and selling with disclosure.'],
  ['How do subscriptions affect core trading?','PinPics states that its database and Trade Assist remain free. Paid subscriptions add organizational and mobile features.'],
  ['Where can I read the official rules?','Use the Rules and Terms links on the live PinPics website. This concept summarizes navigation but does not replace official policies.'],
];

export const notifications = [
  ['Trade match found','A demo collector matches two pins on your WANTS list.','trade.html'],
  ['Storytime record updated','Demo edition information changed for PP#150103.','pin-detail.html?id=pp-150103'],
  ['Toronto trading night','Illustrative event reminder for September 12.','events.html'],
  ['New forum reply','MaplePins replied to a demo identification topic.','community.html'],
  ['Set progress','Your demo Storytime Collection is now 75% complete.','sets.html'],
  ['Pin added to archive','A new illustrative catalogue record is ready to view.','database.html?sort=newest'],
  ['Trade proposal received','RiverPins sent a simulated trade proposal.','trade.html'],
  ['Help article saved','The PP-number guide is ready in Help.','help.html#general'],
].map(([title,copy,href],index)=>({ id:`notification-${index+1}`,title,copy,href,demo:true }));

export const normalizeQuery = (value) => String(value ?? '').trim().toLowerCase();
export const parseStoryChapterParams = (searchParams) => {
  const requested = searchParams.get('chapter') ?? '';
  return storyChapters.some(({ id }) => id === requested) ? requested : storyChapters[0].id;
};

export function parseDatabaseParams(searchParams = new URLSearchParams()) {
  const value = (key, fallback = '') => String(searchParams.get(key) ?? fallback).trim();
  return { query:value('query'), character:value('character'), origin:value('origin'), edition:value('edition'), year:value('year'), prototype:value('prototype','ignore'), includeDescription:value('description') === 'true', sort:value('sort','newest') === 'oldest' ? 'oldest' : 'newest' };
}

export function filterPins(items, queryOrParams = '', character = '') {
  if (!Array.isArray(items)) return [];
  const params = typeof queryOrParams === 'object' && queryOrParams !== null ? { ...parseDatabaseParams(), ...queryOrParams } : { ...parseDatabaseParams(), query:queryOrParams, character };
  const query = normalizeQuery(params.query); const characterQuery = normalizeQuery(params.character);
  return items.filter((pin) => {
    const searchable = [pin.name,pin.character,pin.set,pin.ppNumber,pin.year];
    if (params.includeDescription) searchable.push(pin.description);
    return (!query || searchable.map(normalizeQuery).join(' ').includes(query))
      && (!characterQuery || normalizeQuery(pin.character) === characterQuery)
      && (!params.origin || normalizeQuery(pin.origin) === normalizeQuery(params.origin))
      && (!params.edition || pin.editionType === params.edition)
      && (!params.year || String(pin.year) === String(params.year))
      && (params.prototype === 'ignore' || (params.prototype === 'only' ? pin.prototype : !pin.prototype));
  }).sort((a,b) => {
    const aDate = String(a.releaseDate ?? a.year ?? '');
    const bDate = String(b.releaseDate ?? b.year ?? '');
    return params.sort === 'oldest' ? aDate.localeCompare(bDate) : bDate.localeCompare(aDate);
  });
}

export const getPinById = (id) => pins.find((pin) => pin.id === id) ?? null;
export function getPinActivityStats(id) {
  const index = pins.findIndex((pin) => pin.id === id);
  if (index < 0) return null;
  return { ownedBy:142+(index*17),wantedBy:Math.max(48,381-(index*7)),tradingBy:37+(index*3) };
}
export const comparePins = (ids = []) => [...new Set(ids)].slice(0,3).map(getPinById).filter(Boolean);

export function toggleCollectionState(state = {}, action) {
  const next = { ...state }; if (['own','want','trade'].includes(action)) next[action] = !Boolean(next[action]); return next;
}

export function applyPinDecision(state = {}, decision) {
  const base = { own:false,want:false,trade:false,skipped:false,...state };
  if (!['skip','want','trade','own'].includes(decision)) return { ...base };
  return { ...base, own:decision === 'own', want:decision === 'want', trade:decision === 'trade', skipped:decision === 'skip' };
}

export const normalizeForumView = (value) => value === 'cards' ? 'cards' : 'rows';

export function filterEvents(items, filters = {}) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => (!filters.type || filters.type === 'all' || item.type === filters.type)
    && (!filters.from || item.date >= filters.from));
}

export function buildCalendarMonth(year, monthIndex, items = []) {
  const first = new Date(Date.UTC(year,monthIndex,1));
  const start = new Date(first); start.setUTCDate(1-first.getUTCDay());
  return Array.from({ length:42 },(_,index) => {
    const date = new Date(start); date.setUTCDate(start.getUTCDate()+index);
    const iso = date.toISOString().slice(0,10);
    return { date:iso,day:date.getUTCDate(),inMonth:date.getUTCMonth()===monthIndex,events:items.filter((item)=>item.date===iso) };
  });
}

export function searchSummary(count, query = '', character = '') {
  const q = String(query ?? '').trim(); const c = String(character ?? '').trim();
  if (!count) { if (q && c) return `No pins found for “${q}” in ${c}`; if (q) return `No pins found for “${q}”`; if (c) return `No ${c} pins found`; return 'No demo pins available'; }
  if (q) return `${count} ${count === 1 ? 'pin' : 'pins'} found for “${q}”`;
  if (c) return `${count} ${c} ${count === 1 ? 'pin' : 'pins'} found`;
  return `Showing ${count} demo pins`;
}

export const PINS_PER_PAGE = 12;

export const pageCount = (total, perPage = PINS_PER_PAGE) =>
  Math.max(1, Math.ceil(Math.max(0, Number(total) || 0) / perPage));

/** Clamp a requested page into the valid range for a result set. */
export const clampPage = (page, total, perPage = PINS_PER_PAGE) =>
  Math.min(Math.max(1, Math.trunc(Number(page) || 1)), pageCount(total, perPage));

/** The slice of results shown on `page`. Operates on the already filtered+sorted set. */
export function paginate(items = [], page = 1, perPage = PINS_PER_PAGE) {
  if (!Array.isArray(items)) return [];
  const current = clampPage(page, items.length, perPage);
  const start = (current - 1) * perPage;
  return items.slice(start, start + perPage);
}

/**
 * Compact page window: first and last are always present, the current page keeps a
 * neighbour either side, and gaps collapse to an ellipsis. Returns numbers and '…'.
 */
export function paginationRange(current, total, maxSlots = 7) {
  const pages = Math.max(1, Math.trunc(Number(total) || 1));
  const page = Math.min(Math.max(1, Math.trunc(Number(current) || 1)), pages);
  if (pages <= maxSlots) return Array.from({ length: pages }, (_, i) => i + 1);
  const keep = new Set([1, pages, page]);
  const neighbours = Math.max(1, Math.floor((maxSlots - 4) / 2));
  for (let d = 1; d <= neighbours; d += 1) { keep.add(page - d); keep.add(page + d); }
  // Pull the window toward whichever end the current page is nearest.
  let list = [...keep].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  for (let n = 2; list.length < maxSlots - 2 && n < pages; n += 1) if (!keep.has(n)) { keep.add(n); list = [...keep].filter((x) => x >= 1 && x <= pages).sort((a, b) => a - b); }
  const out = [];
  list.forEach((n, i) => { if (i && n - list[i - 1] > 1) out.push('…'); out.push(n); });
  return out;
}

/** Result count that reflects the visible slice, e.g. "Showing 13\u201324 of 32 demo pins". */
export function paginationSummary(total, page = 1, perPage = PINS_PER_PAGE, query = '', character = '') {
  const count = Math.max(0, Number(total) || 0);
  if (!count || count <= perPage) return searchSummary(count, query, character);
  const current = clampPage(page, count, perPage);
  const start = (current - 1) * perPage + 1;
  const end = Math.min(current * perPage, count);
  const q = String(query ?? '').trim(); const c = String(character ?? '').trim();
  const noun = count === 1 ? 'pin' : 'pins';
  if (q && c) return `Showing ${start}\u2013${end} of ${count} ${c} ${noun} for \u201c${q}\u201d`;
  if (q) return `Showing ${start}\u2013${end} of ${count} ${noun} for \u201c${q}\u201d`;
  if (c) return `Showing ${start}\u2013${end} of ${count} ${c} ${noun}`;
  return `Showing ${start}\u2013${end} of ${count} demo pins`;
}

export function paginationTemplate(current, total) {
  if (total <= 1) return '';
  const page = clampPage(current, total * PINS_PER_PAGE);
  const item = (n) => n === '\u2026'
    ? '<li><span class="pagination__gap" aria-hidden="true">\u2026</span></li>'
    : `<li><button type="button" class="pagination__page" data-page="${n}"${n === page ? ' aria-current="page"' : ''} aria-label="${n === page ? `Page ${n}, current page` : `Go to page ${n}`}">${n}</button></li>`;
  const arrow = (dir, disabled, label, glyph) =>
    `<li><button type="button" class="pagination__arrow pagination__arrow--${dir}" data-page-step="${dir === 'prev' ? -1 : 1}"${disabled ? ' disabled' : ''} aria-label="${label}"><span aria-hidden="true">${glyph}</span></button></li>`;
  return `<ul class="pagination__list">${arrow('prev', page <= 1, 'Previous page', '\u2190')}${paginationRange(page, total).map(item).join('')}${arrow('next', page >= total, 'Next page', '\u2192')}</ul><p class="pagination__status" aria-live="polite">Page ${page} of ${total}</p>`;
}

export function pinCardTemplate(pin, state = {}, options = {}) {
  const artClass = pin.image ? 'studio-pin-art' : (pin.art === 'finale' ? 'finale-art' : 'hero-art');
  const artImage = pin.sprite
    ? `<span class="pin-sheet-crop" role="img" aria-label="${pin.imageAlt}" style="--pin-sheet:url('${pin.image}');--pin-sprite:${pin.sprite}"></span>`
    : pin.image ? `<img src="${pin.image}" alt="${pin.imageAlt}" width="800" height="600" loading="lazy" decoding="async">` : '';
  const compare = options.compare ? `<label class="compare-control"><input type="checkbox" data-compare="${pin.id}" ${options.selected ? 'checked' : ''}> Compare</label>` : '';
  const decisions = options.decisions ? `<div class="pin-decision-controls" aria-label="Pin decision controls"><button type="button" data-pin-decision="skip" aria-label="Not interested in ${pin.name}">← <span>Skip</span></button><button type="button" data-pin-decision="want" aria-label="Want ${pin.name}">♡ <span>Want</span></button><button type="button" data-pin-decision="trade" aria-label="Trade ${pin.name}">↑ <span>Trade</span></button><button type="button" data-pin-decision="own" aria-label="Own ${pin.name}">✓ <span>Own</span></button></div>` : '';
  return `<article class="pin-card landscape-card" data-pin-id="${pin.id}" ${options.decisions ? 'tabindex="-1" data-swipe-card' : ''}><div class="pin-art ${artClass}" style="--art-position: ${pin.position ?? '50% 50%'}">${artImage}<span class="rarity-badge">${pin.rarity ?? 'Collector record'}</span><button class="save-button" type="button" data-action="want" aria-pressed="${Boolean(state.want)}" aria-label="${state.want ? 'Remove' : 'Add'} ${pin.name} ${state.want ? 'from' : 'to'} wants">♡</button>${compare}</div><div class="pin-card-body"><a class="pin-title-link" href="./pin-detail.html?id=${encodeURIComponent(pin.id)}"><h4>${pin.name}</h4></a><p class="pin-set">${pin.set}</p><p class="pin-meta">${pin.ppNumber} · ${pin.year} · ${pin.edition}</p></div>${decisions}</article>`;
}

if (typeof document !== 'undefined') {
  const page = document.body.dataset.page ?? 'discover';
  document.querySelector('.more-menu summary[aria-current]')?.removeAttribute('aria-current');
  const states = new Map(pins.map((pin) => [pin.id,{ own:false,want:false,trade:false }]));
  demoProfile.owns.forEach((id) => states.set(id,{ ...states.get(id),own:true }));
  demoProfile.wants.forEach((id) => states.set(id,{ ...states.get(id),want:true }));
  demoProfile.trades.forEach((id) => states.set(id,{ ...states.get(id),trade:true }));
  const toast = document.querySelector('#toast'); let toastTimer;
  const announce = (message) => { if (!toast) return; toast.textContent = message; toast.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.hidden = true; },2600); };
  const addPinForm = document.querySelector('#add-pin-form');
  if (addPinForm) addPinForm.innerHTML = `<button class="upload-placeholder" type="button" data-demo-action="Image upload is disabled in this local concept demo.">＋<span>Add front and back images</span></button><label>Pin title<input name="title" required placeholder="Name this pin"></label><label>Description<textarea name="description" required rows="3" placeholder="Describe the artwork, backstamp, and distinguishing details"></textarea></label><div class="form-pair"><label>Year<input name="year" inputmode="numeric" pattern="[0-9]{4}" placeholder="2026"></label><label>Edition<input name="edition" placeholder="Open, LR, or LE size"></label></div><div class="form-pair"><label>Series / set<input name="series" placeholder="Collection or set"></label><label>Origin<input name="origin" placeholder="Park, studio, event…"></label></div><label>Characters / subjects<input name="characters" placeholder="Add searchable subjects"></label><label>Dimensions<input name="dimensions" placeholder="Width × height"></label><label>Submission notes<textarea name="notes" rows="2" placeholder="Prototype, variation, or source notes"></textarea></label><p class="panel-note">The live workflow has eligibility, photo, duplicate-search, and approval requirements. This simulated form sends nothing.</p><div class="filter-actions"><button class="gold-button" type="submit">Preview submission</button><button type="reset" data-demo-action="Submission preview cleared.">Cancel</button></div>`;
  const notificationPanel = document.querySelector('[data-utility-panel="notifications"]');
  if (notificationPanel) notificationPanel.innerHTML = `<p class="kicker">Notifications · demo</p><h2>Collector updates</h2>${notifications.map((item,index) => `<button class="notification-item${index > 2 ? ' is-read' : ''}" type="button" data-notification data-notification-href="${item.href}"><strong>${item.title}</strong><span>${item.copy}</span></button>`).join('')}`;
  document.querySelectorAll('[data-utility-trigger="notifications"] span').forEach((count) => { count.textContent = '8'; });
  const profilePanel = document.querySelector('[data-utility-panel="profile"]');
  if (profilePanel) profilePanel.innerHTML = `<div class="profile-card"><div class="profile-card__head"><span class="profile-card__avatar" aria-hidden="true">JM</span><div class="profile-card__id"><p class="profile-card__eyebrow">Collector profile · demo</p><h2>${demoProfile.username}</h2><p class="profile-card__note">${demoProfile.disclosure}</p></div></div><dl class="profile-card__stats"><div><dt>Owned</dt><dd>${demoProfile.owns.length}</dd></div><div><dt>Want</dt><dd>${demoProfile.wants.length}</dd></div><div><dt>Trade</dt><dd>${demoProfile.trades.length}</dd></div></dl><p class="profile-card__chips">${demoProfile.badges.map((badge) => `<span>${badge}</span>`).join('')}</p><nav class="profile-card__menu" aria-label="Profile links"><a href="./sets.html"><span>My collections</span><span class="profile-card__arrow" aria-hidden="true">→</span></a><a href="./trade.html"><span>My trade matches</span><span class="profile-card__arrow" aria-hidden="true">→</span></a><a href="./membership.html"><span>Membership</span><span class="profile-card__arrow" aria-hidden="true">→</span></a><a href="./help.html"><span>Help &amp; settings</span><span class="profile-card__arrow" aria-hidden="true">→</span></a></nav><button class="profile-card__signout" type="button" data-demo-action="Sign out is disabled in this local concept demo.">Sign out</button></div>`;
  document.querySelectorAll('[data-demo-action]').forEach((control) => control.addEventListener('click',() => announce(control.dataset.demoAction)));
  document.querySelectorAll('[data-menu-toggle]').forEach((control) => control.addEventListener('click',() => { const drawer = document.querySelector('#site-drawer'); if (!drawer) return; drawer.hidden = !drawer.hidden; document.querySelectorAll('[data-menu-toggle]').forEach((button) => button.setAttribute('aria-expanded',String(!drawer.hidden))); }));

  const utilityTriggers = [...document.querySelectorAll('[data-utility-trigger]')];
  let activeUtilityTrigger = null;
  const closeUtilityPanels = (restoreFocus = false) => {
    document.querySelectorAll('[data-utility-panel]').forEach((panel) => { panel.hidden = true; });
    utilityTriggers.forEach((trigger) => trigger.setAttribute('aria-expanded','false'));
    if (restoreFocus) activeUtilityTrigger?.focus();
    activeUtilityTrigger = null;
  };
  utilityTriggers.forEach((trigger) => trigger.addEventListener('click',() => {
    const wasOpen = trigger.getAttribute('aria-expanded') === 'true';
    closeUtilityPanels();
    if (wasOpen) return;
    const panel = document.querySelector(`[data-utility-panel="${trigger.dataset.utilityTrigger}"]`);
    if (!panel) return;
    panel.hidden = false; trigger.setAttribute('aria-expanded','true'); activeUtilityTrigger = trigger;
    panel.querySelector('button,input,a')?.focus();
  }));
  document.addEventListener('keydown',(event) => { if (event.key === 'Escape' && activeUtilityTrigger) closeUtilityPanels(true); });
  document.addEventListener('click',(event) => { if (!activeUtilityTrigger || event.target.closest('[data-utility-trigger],[data-utility-panel]')) return; closeUtilityPanels(); });
  document.querySelectorAll('[data-notification]').forEach((item) => item.addEventListener('click',() => { item.classList.toggle('is-read'); announce(item.classList.contains('is-read') ? 'Notification marked read.' : 'Notification marked unread.'); }));
  document.querySelector('#add-pin-form')?.addEventListener('submit',(event) => { event.preventDefault(); announce('Submission preview ready. Nothing was uploaded or submitted.'); });

  const bindWantActions = (grid,rerender) => grid?.addEventListener('click',(event) => { const button = event.target.closest('[data-action="want"]'); if (!button) return; const pin = getPinById(button.closest('[data-pin-id]')?.dataset.pinId); if (!pin) return; const next = toggleCollectionState(states.get(pin.id),'want'); states.set(pin.id,next); rerender(); announce(`${pin.name} ${next.want ? 'added to' : 'removed from'} wants.`); });

  const homeGrid = document.querySelector('#home-pin-grid');
  if (homeGrid) { const renderHome = () => { homeGrid.innerHTML = pins.slice(0,Number(homeGrid.dataset.limit ?? 8)).map((pin) => pinCardTemplate(pin,states.get(pin.id))).join(''); }; renderHome(); bindWantActions(homeGrid,renderHome); }
  document.querySelector('#hero-search-form')?.addEventListener('submit',(event) => { event.preventDefault(); const query = new FormData(event.currentTarget).get('query'); location.href = `./database.html?query=${encodeURIComponent(String(query ?? ''))}`; });

  if (page === 'database') {
    const form = document.querySelector('#database-filter-form'); const grid = document.querySelector('#database-pin-grid'); const status = document.querySelector('#search-status'); const tray = document.querySelector('#compare-tray');
    const pagination = document.querySelector('#database-pagination'); const results = document.querySelector('.database-results');
    let params = parseDatabaseParams(new URLSearchParams(location.search)); let selected = []; let currentPage = 1;
    const syncForm = () => Object.entries(params).forEach(([key,val]) => { const field = form?.elements.namedItem(key === 'includeDescription' ? 'description' : key); if (!field) return; if (field.type === 'checkbox') field.checked = Boolean(val); else field.value = val; });
    const renderDatabase = () => { const visible = filterPins(pins,params); const totalPages = pageCount(visible.length); currentPage = clampPage(currentPage,visible.length); const pageItems = paginate(visible,currentPage);
      if (grid) grid.innerHTML = pageItems.length ? pageItems.map((pin) => pinCardTemplate(pin,states.get(pin.id),{ compare:true,selected:selected.includes(pin.id),decisions:true })).join('') : '<div class="empty-results"><strong>No pins found</strong><p>Change or clear a filter to return to the archive.</p><button type="button" data-clear-filters>Clear filters</button></div>'; if (status) status.textContent = paginationSummary(visible.length,currentPage,PINS_PER_PAGE,params.query,params.character);
      if (pagination) { pagination.innerHTML = paginationTemplate(currentPage,totalPages); pagination.hidden = totalPages <= 1; } const chosen = comparePins(selected); if (tray) { tray.hidden = !chosen.length; tray.querySelector('[data-compare-copy]').textContent = `${chosen.length} of 3 pins selected`; tray.querySelector('[data-compare-list]').innerHTML = chosen.map((pin) => `<span>${pin.ppNumber}<button type="button" data-remove-compare="${pin.id}" aria-label="Remove ${pin.name}">×</button></span>`).join(''); } };
    syncForm(); renderDatabase();
    form?.addEventListener('submit',(event) => { event.preventDefault(); const data = new FormData(form); params = parseDatabaseParams(new URLSearchParams([...data.entries()].map(([key,val]) => [key,String(val)]))); currentPage = 1; renderDatabase(); });
    form?.addEventListener('reset',() => setTimeout(() => { params = parseDatabaseParams(); currentPage = 1; renderDatabase(); },0));
    grid?.addEventListener('change',(event) => { const checkbox = event.target.closest('[data-compare]'); if (!checkbox) return; const id = checkbox.dataset.compare; if (checkbox.checked && !selected.includes(id)) { if (selected.length >= 3) { checkbox.checked = false; announce('Compare up to three pins at a time.'); return; } selected.push(id); } else selected = selected.filter((item) => item !== id); renderDatabase(); });
    const performDecision = (card,decision) => { const pin = getPinById(card?.dataset.pinId); if (!pin) return; const cards = [...grid.querySelectorAll('.pin-card')]; const index = cards.indexOf(card); states.set(pin.id,applyPinDecision(states.get(pin.id),decision)); renderDatabase(); const labels = { skip:'not interested',want:'added to wants',trade:'marked for trade',own:'marked as owned' }; announce(`${pin.name} ${labels[decision]}.`); const next = grid.querySelectorAll('.pin-card')[Math.min(index+1,grid.querySelectorAll('.pin-card').length-1)]; next?.focus({ preventScroll:true }); };
    grid?.addEventListener('click',(event) => { if (event.target.closest('[data-clear-filters]')) form?.reset(); const decision = event.target.closest('[data-pin-decision]'); if (decision) performDecision(decision.closest('.pin-card'),decision.dataset.pinDecision); });
    let swipeStart = null;
    grid?.addEventListener('pointerdown',(event) => { if (!matchMedia('(max-width: 720px)').matches) return; const card = event.target.closest('[data-swipe-card]'); if (card) swipeStart = { card,x:event.clientX,y:event.clientY }; });
    grid?.addEventListener('pointerup',(event) => { if (!swipeStart) return; const dx = event.clientX-swipeStart.x; const dy = event.clientY-swipeStart.y; const start = swipeStart; swipeStart = null; if (Math.max(Math.abs(dx),Math.abs(dy)) < 48) return; if (Math.abs(dx) > Math.abs(dy)) performDecision(start.card,dx > 0 ? 'want' : 'skip'); else if (dy < 0) performDecision(start.card,'trade'); });
    const goToPage = (next) => {
      const total = pageCount(filterPins(pins,params).length);
      const target = clampPage(next,total * PINS_PER_PAGE);
      if (target === currentPage) return;
      currentPage = target; renderDatabase();
      // Return to the top of the results, not the top of the site.
      const header = document.querySelector('.site-header');
      const offset = (header?.getBoundingClientRect().height ?? 0) + 16;
      const top = (results?.getBoundingClientRect().top ?? 0) + window.scrollY - offset;
      window.scrollTo({ top:Math.max(0,top), behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    };
    pagination?.addEventListener('click',(event) => {
      const step = event.target.closest('[data-page-step]');
      if (step && !step.disabled) { goToPage(currentPage + Number(step.dataset.pageStep)); return; }
      const jump = event.target.closest('[data-page]');
      if (jump) goToPage(Number(jump.dataset.page));
    });
    bindWantActions(grid,renderDatabase);
    tray?.addEventListener('click',(event) => { const remove = event.target.closest('[data-remove-compare]'); if (remove) { selected = selected.filter((id) => id !== remove.dataset.removeCompare); renderDatabase(); } if (event.target.closest('[data-run-compare]')) announce(`Comparison ready for ${comparePins(selected).length} pins.`); });
  }

  if (page === 'pin-detail') {
    const root = document.querySelector('#pin-detail-root'); const pin = getPinById(new URLSearchParams(location.search).get('id')) ?? pins[0]; const related = pins.filter((candidate) => candidate.relatedSet === pin.relatedSet && candidate.id !== pin.id).slice(0,4); const activity = getPinActivityStats(pin.id);
    const detailMedia = pin.sprite ? `<span class="pin-sheet-crop" role="img" aria-label="${pin.imageAlt}" style="--pin-sheet:url('${pin.image}');--pin-sprite:${pin.sprite}"></span>` : `<img src="${pin.image}" alt="${pin.imageAlt}" width="800" height="600">`;
    const renderDetail = () => { if (!root) return; const state = states.get(pin.id); root.innerHTML = `<div class="detail-art pin-art studio-pin-art">${detailMedia}<span class="rarity-badge">Illustrative demo record</span></div><div class="detail-copy"><p class="kicker">${pin.ppNumber}</p><h1>${pin.name}</h1><p>${pin.description}</p><dl class="pin-facts"><div><dt>Collection</dt><dd>${pin.set}</dd></div><div><dt>Origin</dt><dd>${pin.origin}</dd></div><div><dt>Released</dt><dd>${pin.releaseDate}</dd></div><div><dt>Edition</dt><dd>${pin.edition}</dd></div><div><dt>Subject</dt><dd>${pin.character}</dd></div><div><dt>Dimensions</dt><dd>Approx. 1.75 × 1.5 in · demo</dd></div></dl><dl class="pin-demand" aria-label="Illustrative collector activity"><div><dt>Owned</dt><dd>${activity.ownedBy}</dd></div><div><dt>Wanted</dt><dd>${activity.wantedBy}</dd></div><div><dt>Trading</dt><dd>${activity.tradingBy}</dd></div></dl><div class="detail-actions" role="group" aria-label="Collection status">${['own','want','trade'].map((action) => `<button type="button" data-detail-action="${action}" aria-pressed="${Boolean(state[action])}">${action[0].toUpperCase()+action.slice(1)}</button>`).join('')}</div><div class="premium-preview"><span>PLUS / PREMIUM preview</span><p>PinPics lists private valuation, storage location, and notes fields as paid-subscription features. This demo does not save private data.</p></div><div class="record-activity"><strong>Recent demo activity</strong><p>MaplePins added this record to WANTS · RiverPins reviewed the edition details · 2 hours ago</p></div></div><section class="related-records"><h2>Related set records</h2><div class="mini-record-grid">${(related.length ? related : pins.slice(1,5)).map((item) => `<a href="./pin-detail.html?id=${item.id}"><strong>${item.ppNumber}</strong><span>${item.name}</span></a>`).join('')}</div></section>`; };
    renderDetail(); root?.addEventListener('click',(event) => { const button = event.target.closest('[data-detail-action]'); if (!button) return; states.set(pin.id,toggleCollectionState(states.get(pin.id),button.dataset.detailAction)); renderDetail(); announce(`${pin.name} collection status updated.`); });
  }

  if (page === 'sets') {
    const tabs = document.querySelectorAll('[data-chapter]');
    const renderChapter = (id) => { const chapter = storyChapters.find((item) => item.id === id) ?? storyChapters[0]; document.querySelector('#chapter-title').textContent = chapter.title; document.querySelector('#chapter-copy').textContent = chapter.copy; document.querySelector('#chapter-progress').textContent = `${chapter.owned} of ${chapter.total}`; document.querySelector('#chapter-percent').textContent = `${Math.round((chapter.owned/chapter.total)*100)}% complete`; const bar = document.querySelector('#chapter-progressbar'); bar.setAttribute('aria-valuemax',chapter.total); bar.setAttribute('aria-valuenow',chapter.owned); bar.querySelector('span').style.width = `${(chapter.owned/chapter.total)*100}%`; document.querySelectorAll('.story-slot').forEach((slot,index) => slot.classList.toggle('is-missing',index >= chapter.owned)); tabs.forEach((tab) => tab.setAttribute('aria-selected',String(tab.dataset.chapter === chapter.id))); };
    tabs.forEach((tab) => tab.addEventListener('click',() => renderChapter(tab.dataset.chapter))); renderChapter(parseStoryChapterParams(new URLSearchParams(location.search)));
    const featured = document.querySelector('.featured-sets');
    if (featured) featured.insertAdjacentHTML('beforeend',`<section class="set-library" aria-labelledby="set-library-title"><div class="results-heading"><div><p class="kicker">Demo collection library</p><h2 id="set-library-title">Eight collection states.</h2></div><span>All records are illustrative</span></div><div class="set-library-grid">${demoSets.map((set) => { const percent = Math.round((set.owned/set.total)*100); const missing = set.total-set.owned; return `<article class="tier-card"><span>${set.type}</span><h3>${set.name}</h3><p><strong>${set.owned} / ${set.total}</strong> collected · ${percent}% complete · ${missing} missing</p><div class="progress-track" role="progressbar" aria-label="${set.name} progress" aria-valuemin="0" aria-valuemax="${set.total}" aria-valuenow="${set.owned}"><span style="width:${percent}%"></span></div><a href="./database.html?query=${encodeURIComponent(set.name)}">${missing ? `Find ${missing} missing ${missing === 1 ? 'pin' : 'pins'}` : 'Review complete set'} ↗</a></article>`; }).join('')}</div></section>`);
  }

  if (page === 'community') {
    const forumList = document.querySelector('.forum-list');
    if (forumList) forumList.insertAdjacentHTML('beforeend',discussions.map((topic,index) => `<article class="forum-category discussion-card landscape-card"><span class="forum-icon">${String(index+7).padStart(2,'0')}</span><div><p class="kicker">${topic.category} · demo topic</p><h3>${topic.title}</h3><p>Started by ${topic.author}; latest reply from ${topic.latest}.</p></div><strong>${topic.replies} replies · ${topic.views} views</strong><small>${topic.time}</small></article>`).join(''));
    document.querySelector('#forum-view')?.addEventListener('click',(event) => {
      const control = event.target.closest('[data-forum-view]');
      if (!control || !forumList) return;
      const view = normalizeForumView(control.dataset.forumView);
      forumList.dataset.view = view;
      document.querySelectorAll('[data-forum-view]').forEach((button) => button.setAttribute('aria-pressed',String(button === control)));
      announce(`Community view changed to ${view}.`);
    });
  }

  if (page === 'trade') {
    const board = document.querySelector('.trade-builder');
    if (board) board.insertAdjacentHTML('afterend',`<section class="trade-match-queue" aria-labelledby="trade-queue-title"><div class="results-heading"><div><p class="kicker">Demo match queue</p><h2 id="trade-queue-title">Six ways to continue.</h2></div><span>Illustrative collector activity</span></div><div class="trade-match-grid">${tradeMatches.map((match) => { const collector = collectors.find(({ id }) => id === match.collectorId); const offered = getPinById(match.youOffer[0]); const requested = getPinById(match.theyOffer[0]); return `<article class="tier-card"><span>${match.status}</span><h3>${collector.username} · ${match.score}% demo match</h3><p>You offer <a href="./pin-detail.html?id=${offered.id}">${offered.name}</a> for <a href="./pin-detail.html?id=${requested.id}">${requested.name}</a>.</p><button type="button" data-demo-action="Opened a simulated ${match.status.toLowerCase()} trade with ${collector.username}; no message was sent.">Review match</button></article>`; }).join('')}</div></section>`);
    document.querySelectorAll('.trade-match-queue [data-demo-action]').forEach((control) => control.addEventListener('click',() => announce(control.dataset.demoAction)));
  }
  document.querySelector('#find-match')?.addEventListener('click',(event) => { event.currentTarget.textContent = 'Match found'; event.currentTarget.disabled = true; const result = document.querySelector('#trade-result'); if (result) result.hidden = false; });
  if (page === 'events') {
    const listView = document.querySelector('#event-list-view'); const calendarView = document.querySelector('#event-calendar-view'); const calendarGrid = document.querySelector('#event-calendar-grid'); const monthTitle = document.querySelector('#event-month-title');
    let currentView = 'list'; let currentYear = 2026; let currentMonth = 8; let eventFilters = { type:'all',from:'' };
    const visibleEvents = () => filterEvents(events,eventFilters);
    const renderList = () => { const visibleIds = new Set(visibleEvents().map(({ id }) => id)); document.querySelectorAll('[data-event-id]').forEach((card) => { card.hidden = !visibleIds.has(card.dataset.eventId); }); };
    const renderCalendar = () => { if (!calendarGrid || !monthTitle) return; const monthName = new Intl.DateTimeFormat('en',{ month:'long',year:'numeric',timeZone:'UTC' }).format(new Date(Date.UTC(currentYear,currentMonth,1))); monthTitle.textContent = monthName; calendarGrid.innerHTML = buildCalendarMonth(currentYear,currentMonth,visibleEvents()).map((cell) => `<div class="calendar-cell${cell.inMonth ? '' : ' is-outside'}" data-date="${cell.date}"><time datetime="${cell.date}">${cell.day}</time>${cell.events.map((item) => `<span class="calendar-event ${item.type}">${item.title}</span>`).join('')}</div>`).join(''); };
    const renderView = () => { if (listView) listView.hidden = currentView !== 'list'; if (calendarView) calendarView.hidden = currentView !== 'calendar'; document.querySelectorAll('[data-event-view]').forEach((button) => button.setAttribute('aria-pressed',String(button.dataset.eventView === currentView))); };
    document.querySelector('#event-filter-form')?.addEventListener('submit',(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); eventFilters = { type:String(data.get('type') ?? 'all'),from:String(data.get('from') ?? '') }; renderList(); renderCalendar(); announce(`Showing ${visibleEvents().length} matching events.`); });
    document.querySelectorAll('[data-event-view]').forEach((button) => button.addEventListener('click',() => { currentView = button.dataset.eventView; renderView(); announce(`${currentView === 'list' ? 'List' : 'Calendar'} view active.`); }));
    document.querySelectorAll('[data-calendar-nav]').forEach((button) => button.addEventListener('click',() => { currentMonth += button.dataset.calendarNav === 'next' ? 1 : -1; if (currentMonth < 0) { currentMonth = 11; currentYear -= 1; } if (currentMonth > 11) { currentMonth = 0; currentYear += 1; } renderCalendar(); }));
    renderList(); renderCalendar(); renderView();
  }
  if (page === 'help') {
    const faqList = document.querySelector('.faq-list');
    const faqAnchors = new Map([[1,'trading'],[2,'submissions'],[4,'mobile'],[5,'support'],[15,'rules']]);
    if (faqList) faqList.innerHTML = faqs.map(([question,answer],index) => `<details class="faq-item" ${index === 0 ? 'open' : ''} ${faqAnchors.has(index) ? `id="${faqAnchors.get(index)}"` : ''}><summary>${question}<span aria-hidden="true">+</span></summary><p>${answer}</p></details>`).join('');
    document.querySelector('#help-search')?.addEventListener('input',(event) => { const query = normalizeQuery(event.currentTarget.value); document.querySelectorAll('.faq-item').forEach((item) => { item.hidden = !normalizeQuery(item.textContent).includes(query); }); });
  }
}
