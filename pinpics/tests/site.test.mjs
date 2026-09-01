import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';

import {
  PINS_PER_PAGE,
  clampPage,
  pageCount,
  paginate,
  paginationRange,
  paginationSummary,
  paginationTemplate,
  filterPins,
  normalizeQuery,
  parseStoryChapterParams,
  pinCardTemplate,
  searchSummary,
  toggleCollectionState,
} from '../app.mjs';
import * as app from '../app.mjs';

const fixtures = [
  {
    id: 'pp-1001',
    ppNumber: 'PP#1001',
    name: 'Stitch Space Adventure',
    character: 'Stitch',
    set: 'Galactic Mischief',
    year: 2025,
    edition: 'LE 750',
    rarity: 'Limited edition',
  },
  {
    id: 'pp-1002',
    ppNumber: 'PP#1002',
    name: 'Mickey Through the Years',
    character: 'Mickey Mouse',
    set: 'Disney Archives',
    year: 2024,
  },
  {
    id: 'pp-1003',
    ppNumber: 'PP#1003',
    name: 'Elsa Winter Crest',
    character: 'Elsa',
    set: 'Frozen Icons',
    year: 2023,
  },
];

test('normalizeQuery makes human-entered searches comparable', () => {
  assert.equal(normalizeQuery('  PP#1001  '), 'pp#1001');
  assert.equal(normalizeQuery(null), '');
});

test('filterPins searches name, character, set, PP number, and year case-insensitively', () => {
  assert.deepEqual(filterPins(fixtures, 'SPACE', '').map(({ id }) => id), ['pp-1001']);
  assert.deepEqual(filterPins(fixtures, 'mickey mouse', '').map(({ id }) => id), ['pp-1002']);
  assert.deepEqual(filterPins(fixtures, 'frozen icons', '').map(({ id }) => id), ['pp-1003']);
  assert.deepEqual(filterPins(fixtures, 'pp#1002', '').map(({ id }) => id), ['pp-1002']);
  assert.deepEqual(filterPins(fixtures, '2023', '').map(({ id }) => id), ['pp-1003']);
});

test('filterPins composes character and text filters', () => {
  assert.deepEqual(filterPins(fixtures, '2025', 'Stitch').map(({ id }) => id), ['pp-1001']);
  assert.deepEqual(filterPins(fixtures, '2024', 'Stitch'), []);
});

test('filterPins returns every pin when no filters are active', () => {
  assert.deepEqual(filterPins(fixtures, '', '').map(({ id }) => id), [
    'pp-1001',
    'pp-1002',
    'pp-1003',
  ]);
});

test('toggleCollectionState changes only the requested Own Want or Trade flag', () => {
  const initial = { own: false, want: true, trade: false };
  assert.deepEqual(toggleCollectionState(initial, 'own'), {
    own: true,
    want: true,
    trade: false,
  });
  assert.deepEqual(toggleCollectionState(initial, 'want'), {
    own: false,
    want: false,
    trade: false,
  });
  assert.deepEqual(toggleCollectionState(initial, 'trade'), {
    own: false,
    want: true,
    trade: true,
  });
  assert.deepEqual(initial, { own: false, want: true, trade: false });
});

test('toggleCollectionState ignores unknown actions', () => {
  const initial = { own: false, want: false, trade: false };
  assert.deepEqual(toggleCollectionState(initial, 'archive'), initial);
  assert.notEqual(toggleCollectionState(initial, 'archive'), initial);
});

test('searchSummary gives useful empty filtered and default announcements', () => {
  assert.equal(searchSummary(6, '', ''), 'Showing 6 demo pins');
  assert.equal(searchSummary(1, 'stitch', ''), '1 pin found for “stitch”');
  assert.equal(searchSummary(2, '', 'Mickey Mouse'), '2 Mickey Mouse pins found');
  assert.equal(searchSummary(0, 'missing', 'Elsa'), 'No pins found for “missing” in Elsa');
});

test('pinCardTemplate exposes a compact archive record with a working want control', () => {
  const html = pinCardTemplate(fixtures[0], { own: true, want: false, trade: false });
  assert.match(html, /data-pin-id="pp-1001"/);
  assert.match(html, /Stitch Space Adventure/);
  assert.match(html, /Galactic Mischief/);
  assert.match(html, /PP#1001 · 2025 · LE 750/);
  assert.match(html, /data-action="want"[^>]+aria-pressed="false"/);
  assert.doesNotMatch(html, /data-action="own"/);
  assert.doesNotMatch(html, /data-action="trade"/);
  assert.doesNotMatch(html, /collection-actions|pin-demand|want this/i);
});

test('page artifacts distribute the complete accessible product contract', async () => {
    const [home, database, sets, trade] = await Promise.all(['index.html','database.html','sets.html','trade.html'].map((file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')));
    assert.match(home, /<header\b/); assert.match(home, /<main\b/); assert.match(home, /<footer\b/);
    assert.match(home, /id="home-pin-grid"/);
    assert.match(home, /assets\/images\/heroes\/pinpics-discover-fantasy\.webp/);
    assert.match(home, /assets\/images\/pinpics-cartoon-finale-cta\.webp/);
    assert.match(home, /Search the PinPics database/);
    assert.match(home, /concept demo/i);
    assert.match(home, /family=Montserrat:wght@400;500;600;700;800/);
    assert.match(database, /id="database-pin-grid"/);
    assert.match(database, /id="search-status"[^>]+aria-live="polite"/);
    assert.match(sets, /Collection progress/i); assert.match(sets, /Featured sets/i);
    assert.match(trade, /id="trade-result"/); assert.match(trade, /Trade Assist/i);
    assert.doesNotMatch(home, /Three icons\. One living collector story\./i);
});

test('the modernization exposes nine real page artifacts with a shared navigation contract', async () => {
  const pageFiles = [
    'index.html',
    'database.html',
    'pin-detail.html',
    'sets.html',
    'trade.html',
    'community.html',
    'events.html',
    'help.html',
    'membership.html',
  ];
  const pages = await Promise.all(
    pageFiles.map(async (file) => [file, await readFile(new URL(`../${file}`, import.meta.url), 'utf8')]),
  );

  for (const [file, html] of pages) {
    assert.match(html, /<body[^>]+data-page=/, `${file} identifies its page initializer`);
    assert.match(html, /href="\.\/database\.html"/, `${file} links to the database`);
    assert.match(html, /href="\.\/sets\.html"/, `${file} links to sets`);
    assert.match(html, /href="\.\/trade\.html"/, `${file} links to trade`);
    assert.match(html, /href="\.\/community\.html"/, `${file} links to community`);
    assert.match(html, /href="\.\/events\.html"/, `${file} links to events`);
    assert.match(html, /href="\.\/help\.html"/, `${file} links to help`);
    assert.match(html, /href="\.\/membership\.html"/, `${file} links to membership`);
    assert.match(html, /PinPics Modernization Concept[\s\S]*Demo content/i, `${file} discloses demo status`);
  }
});

test('homepage defines the gold hero search action and an eight-record preview', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /class="[^\"]*hero-primary[^\"]*"[^>]+type="submit"[^>]*>Explore pins</);
  assert.match(html, /id="home-pin-grid"[^>]+data-limit="8"/);
  assert.match(html, /class="credibility[^\"]*"/);
});

test('homepage closing CTA uses the selected cartoon artwork and responsive crop contract', async () => {
  const [html, css] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../styles.css', import.meta.url), 'utf8'),
  ]);

  assert.match(html, /assets\/images\/pinpics-cartoon-finale-cta\.webp/);
  assert.match(html, /assets\/images\/pinpics-cartoon-finale-cta\.png/);
  assert.doesNotMatch(html, /assets\/images\/pinpics-finale-panorama\.(?:webp|png)/);
  await Promise.all([
    access(new URL('../assets/images/pinpics-cartoon-finale-cta.png', import.meta.url)),
    access(new URL('../assets/images/pinpics-cartoon-finale-cta.webp', import.meta.url)),
  ]);
  assert.match(css, /\.finale-panorama img\s*\{[^}]*object-position:/s);
  assert.match(css, /@media\s*\(max-width:\s*720px\)[\s\S]*\.finale-panorama img\s*\{[^}]*object-position:/s);
});

test('expanded database interfaces expose a thirty-two record demo archive and query-aware filtering', () => {
  assert.equal(typeof app.getPinById, 'function');
  assert.equal(typeof app.parseDatabaseParams, 'function');
  assert.equal(typeof app.comparePins, 'function');
  assert.equal(app.pins.length, 32);

  const params = app.parseDatabaseParams(
    new URLSearchParams('query=storytime&edition=limited-edition&sort=oldest&prototype=exclude'),
  );
  assert.deepEqual(params, {
    query: 'storytime',
    character: '',
    origin: '',
    edition: 'limited-edition',
    year: '',
    prototype: 'exclude',
    includeDescription: false,
    sort: 'oldest',
  });
  assert.ok(app.filterPins(app.pins, params).every((pin) => pin.editionType === 'limited-edition'));
});

test('pin lookup and comparison preserve order and cap comparisons at three records', () => {
  assert.equal(app.getPinById('pp-158214')?.name, 'Midnight Celestial Crest');
  assert.equal(app.getPinById('missing'), null);
  assert.deepEqual(
    app.comparePins(['pp-158214', 'pp-157908', 'pp-156772', 'pp-155431']).map(({ id }) => id),
    ['pp-158214', 'pp-157908', 'pp-156772'],
  );
});

test('illustrative activity stats stay deterministic for a record and reject unknown ids', () => {
  assert.deepEqual(app.getPinActivityStats('pp-158214'),{ ownedBy:142,wantedBy:381,tradingBy:37 });
  assert.equal(app.getPinActivityStats('missing'),null);
  assert.deepEqual(app.getPinActivityStats('pp-158214'),app.getPinActivityStats('pp-158214'));
});

test('storybook, community, events, help, and membership expose their planned demo states', async () => {
  assert.equal(app.storyChapters[0].owned, 9);
  assert.equal(app.storyChapters[0].total, 12);
  assert.equal(app.forumCategories.length, 6);
  assert.equal(app.discussions.length, 12);
  assert.equal(app.events.length, 8);
  assert.equal(app.events.filter(({ type }) => type === 'online').length, 4);
  assert.equal(app.faqs.length, 16);

  const [sets, trade, community, events, help, membership] = await Promise.all(
    ['sets.html','trade.html','community.html','events.html','help.html','membership.html']
      .map((file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')),
  );
  assert.match(sets, /id="chapter-progress"[^>]*>9 of 12/);
  assert.match(sets, /data-chapter="friendship"/);
  assert.match(trade, /id="find-match"/); assert.match(trade, /id="trade-result"[^>]+hidden/);
  assert.match(community, /Start new topic/); assert.match(community, /Fantasy Disney Pins/i);
  assert.match(events, /id="event-filter-form"/); assert.equal((events.match(/data-event-id=/g) ?? []).length, 8);
  assert.match(help, /id="help-search"/); assert.ok((help.match(/class="faq-item"/g) ?? []).length >= 6);
  assert.match(membership, /<table class="feature-table">/); assert.match(membership, /does not start checkout/i);
});

test('each primary destination declares the correct desktop current-page target', async () => {
  const currentTargets = new Map([
    ['index.html','index.html'],['database.html','database.html'],['pin-detail.html','database.html'],
    ['sets.html','sets.html'],['trade.html','trade.html'],['community.html','community.html'],
    ['events.html','events.html'],['help.html','help.html'],['membership.html','membership.html'],
  ]);
  for (const [file, target] of currentTargets) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.match(html, new RegExp(`href="\\./${target}"[^>]+aria-current="page"`), file);
  }
});

test('stylesheet artifact defines the responsive and accessible visual contract', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /--color-midnight:\s*#050a18/i);
  assert.match(css, /\.hero\s*\{/);
  assert.match(css, /\.finale\s*\{/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  assert.match(css, /--font-ui:\s*"Montserrat"/i);
  assert.match(css, /--color-gold:\s*#ffd700/i);
  assert.match(css, /\.pin-grid\s*\{[^}]*repeat\(4,\s*minmax\(/is);
  assert.doesNotMatch(css, /transform:\s*scale\(\s*0\.5\s*\)/i);
});

test('refinement image artifacts include PNG sources and optimized WebPs', async () => {
  // pinpics-collector-hero-v2 was retired with the Discover hero pass and is no longer bundled.
  const names = ['event-live-show','event-toronto-trading','event-storytime-spotlight','event-orlando-meetup'];
  await Promise.all(names.flatMap((name) => ['png','webp'].map((ext) =>
    access(new URL(`../assets/images/${name}.${ext}`, import.meta.url)),
  )));
});

test('pin decisions map skip want trade and own without mutating input', () => {
  const initial = { own:false, want:false, trade:false, skipped:false };
  assert.deepEqual(app.applyPinDecision(initial,'skip'), { own:false,want:false,trade:false,skipped:true });
  assert.deepEqual(app.applyPinDecision(initial,'want'), { own:false,want:true,trade:false,skipped:false });
  assert.deepEqual(app.applyPinDecision(initial,'trade'), { own:false,want:false,trade:true,skipped:false });
  assert.deepEqual(app.applyPinDecision(initial,'own'), { own:true,want:false,trade:false,skipped:false });
  assert.equal(initial.own,false);
});

test('forum view accepts rows or cards and defaults to rows', () => {
  assert.equal(app.normalizeForumView('cards'),'cards');
  assert.equal(app.normalizeForumView('rows'),'rows');
  assert.equal(app.normalizeForumView('anything'),'rows');
});

test('event filtering and calendar month share event data', () => {
  assert.equal(app.filterEvents(app.events,{ type:'online',from:'' }).length,4);
  const cells = app.buildCalendarMonth(2026,8,app.events);
  assert.equal(cells.length,42);
  assert.equal(cells.find((cell) => cell.date === '2026-09-12').events[0].id,'event-2');
});

test('Discover groups search and Explore pins and stages statistics below the hero', async () => {
  const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
  assert.match(html,/class="hero-search-cluster"[\s\S]*id="hero-search-form"[\s\S]*type="submit"[^>]*>Explore pins</);
  assert.match(html,/<\/section>\s*<div class="credibility-stage compact-credibility-stage">\s*<section class="credibility"/);
  assert.match(html,/pinpics-discover-fantasy\.webp/);
});

test('reusable records and Sets use the landscape card and restrained folio contracts', async () => {
  assert.match(app.pinCardTemplate(app.pins[0]),/landscape-card/);
  const [sets,css] = await Promise.all(['sets.html','styles.css'].map((file)=>readFile(new URL(`../${file}`,import.meta.url),'utf8')));
  assert.match(sets,/class="storybook collector-folio"/);
  assert.match(css,/\.storybook-section\.refined-storybook\{[^}]*background:\s*#eef1f7/s);
  assert.match(css,/\.landscape-card[^}]*aspect-ratio:\s*16\/9/s);
});

test('pin cards expose accessible decision controls matching mobile gestures', () => {
  const html = app.pinCardTemplate(app.pins[0],{}, { decisions:true });
  for (const decision of ['skip','want','trade','own']) assert.match(html,new RegExp(`data-pin-decision="${decision}"`));
  assert.match(html,/aria-label="Pin decision controls"/);
});

test('Community provides accessible rows and cards view controls', async () => {
  const html = await readFile(new URL('../community.html',import.meta.url),'utf8');
  assert.match(html,/id="forum-view"/);
  assert.match(html,/data-forum-view="rows"[^>]+aria-pressed="true"/);
  assert.match(html,/data-forum-view="cards"[^>]+aria-pressed="false"/);
});

test('Events includes image-led list cards and a navigable calendar surface', async () => {
  const html = await readFile(new URL('../events.html',import.meta.url),'utf8');
  assert.equal((html.match(/class="event-image"/g) ?? []).length,8);
  assert.match(html,/id="event-calendar-view"[^>]+hidden/);
  assert.match(html,/data-calendar-nav="previous"/);
  assert.match(html,/data-calendar-nav="next"/);
  assert.match(html,/id="event-month-title"/);
});

test('the demo ecosystem is populated and all cross-page pin references resolve', () => {
  assert.equal(app.demoSets.length,8);
  assert.equal(app.collectors.length,5);
  assert.equal(app.tradeMatches.length,6);
  assert.equal(app.notifications.length,8);
  assert.equal(app.demoProfile.username,'Jamie M.');
  assert.match(app.demoProfile.disclosure,/fictional|demo/i);

  const ids = new Set(app.pins.map(({ id }) => id));
  assert.equal(ids.size,app.pins.length);
  assert.ok(app.pins.every(({ image,imageAlt,description }) => image && imageAlt?.length > 24 && description?.length > 24));
  for (const set of app.demoSets) {
    assert.ok(set.pinIds.length >= 3);
    assert.ok(set.pinIds.every((id) => ids.has(id)),`${set.id} references only known pins`);
  }
  for (const trade of app.tradeMatches) {
    assert.ok([...trade.youOffer,...trade.theyOffer].every((id) => ids.has(id)),`${trade.id} references only known pins`);
  }
  assert.ok([...app.demoProfile.owns,...app.demoProfile.wants,...app.demoProfile.trades].every((id) => ids.has(id)));
});

test('mock records, events, discussions, collectors, and profile state are explicitly disclosed', () => {
  assert.ok(app.pins.every(({ demo }) => demo === true));
  assert.ok(app.events.every(({ demo }) => demo === true));
  assert.ok(app.discussions.every(({ demo }) => demo === true));
  assert.ok(app.collectors.every(({ demo }) => demo === true));
  assert.ok(app.notifications.every(({ demo }) => demo === true));
});

test('membership preserves the official free core and labels paid feature groups accurately', async () => {
  const html = await readFile(new URL('../membership.html',import.meta.url),'utf8');
  assert.match(html,/PinPics states that the Database and Trade Assist remain free/i);
  assert.match(html,/<th scope="row">Trade Assist<\/th><td>✓<\/td><td>✓<\/td><td>✓<\/td>/);
  assert.match(html,/Private notes fields/i);
  assert.match(html,/Expanded PDF export/i);
  assert.match(html,/Scrapper &amp; Fake Guide/i);
  assert.match(html,/Mobile app with image search/i);
  assert.match(html,/no price is presented as current/i);
});

test('every page exposes the three accessible header utility panels', async () => {
  for (const file of ['index.html','database.html','pin-detail.html','sets.html','trade.html','community.html','events.html','help.html','membership.html']) {
    const html = await readFile(new URL(`../${file}`,import.meta.url),'utf8');
    for (const name of ['add-pin','notifications','profile']) {
      assert.match(html,new RegExp(`data-utility-trigger="${name}"[^>]+aria-expanded="false"`),file);
      assert.match(html,new RegExp(`data-utility-panel="${name}"[^>]+hidden`),file);
    }
  }
});

test('homepage preview uses eight unique accessible local studio pin assets', async () => {
  const preview = app.pins.slice(0,8);
  assert.equal(preview.length,8);
  assert.equal(new Set(preview.map(({ image }) => image)).size,8);
  assert.ok(preview.every(({ image,imageAlt }) => image?.startsWith('./assets/images/pins/') && imageAlt?.length > 24));
  const card = app.pinCardTemplate(preview[0],{});
  assert.match(card,/<img[^>]+src="\.\/assets\/images\/pins\//);
  assert.match(card,/alt="[^"]{25,}"/);
  assert.match(card,/width="800" height="600" loading="lazy" decoding="async"/);
  assert.match(card,/class="pin-art studio-pin-art"/);

  await Promise.all(preview.flatMap(({ image }) => {
    const base = image.replace(/\.webp$/, '');
    return ['png','webp'].map((ext) => access(new URL(`../${base}.${ext}`,import.meta.url)));
  }));
});

test('homepage credibility ribbon and archive transition use the compact refinement contract', async () => {
  const css = await readFile(new URL('../styles.css',import.meta.url),'utf8');
  assert.match(css,/\.credibility-stage\.compact-credibility-stage\{[^}]*padding:\s*28px clamp\(12px,4vw,52px\)/s);
  assert.match(css,/\.compact-credibility-stage \.credibility\{[^}]*min-height:\s*112px;[^}]*padding:\s*22px 34px/s);
  assert.match(css,/\.home-database\{[^}]*padding-top:\s*70px/s);
  assert.match(css,/\.home-database \.results-heading\{[^}]*margin-top:\s*32px/s);
});

test('homepage targeted refinement gives the credibility ribbon balanced vertical breathing room', async () => {
  const [html,css] = await Promise.all(
    ['index.html','styles.css'].map((file) => readFile(new URL(`../${file}`,import.meta.url),'utf8')),
  );
  assert.doesNotMatch(html,/class="credibility-note"/);
  assert.match(css,/\.credibility-stage\.compact-credibility-stage\{[^}]*padding:\s*28px clamp\(12px,4vw,52px\)/s);
  assert.match(css,/\.compact-credibility-stage \.credibility\{[^}]*min-height:\s*112px;[^}]*padding:\s*22px 34px/s);
  assert.match(css,/\.compact-credibility-stage \.credibility \.metric\{[^}]*padding:\s*4px 28px;[^}]*row-gap:\s*6px/s);
});

test('hero secondary actions use the branded text-only utility treatment', async () => {
  const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
  const css = await readFile(new URL('../styles.css',import.meta.url),'utf8');
  assert.match(html,/<button class="text-action hero-utility-action"[^>]*>SEARCH BY PHOTO<\/button>/);
  assert.match(html,/<a class="text-action hero-utility-action hero-collection-action" href="\.\/sets\.html">MY COLLECTION <span class="hero-collection-arrow" aria-hidden="true">→<\/span><\/a>/);
  assert.doesNotMatch(html,/◎ Search by photo|My collection ↗/);
  assert.match(css,/\.hero-utility-action\{[^}]*color:\s*var\(--color-gold\);[^}]*text-decoration:\s*none;[^}]*text-transform:\s*uppercase;[^}]*letter-spacing:\s*\.14em;[^}]*font-size:\s*11px;[^}]*font-weight:\s*800/s);
  assert.match(css,/\.hero-collection-action:hover \.hero-collection-arrow\{[^}]*transform:\s*translateX\(3px\)/s);
});

test('homepage Storytime uses the approved scene with visible semantic content and working destinations', async () => {
  const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
  await Promise.all(['png','webp'].map((ext) => access(new URL(`../assets/images/storytime/pinpics-storytime-live-scene.${ext}`,import.meta.url))));
  assert.match(html,/<section class="storytime-banner" aria-labelledby="storytime-banner-title">/);
  assert.match(html,/<source srcset="\.\/assets\/images\/storytime\/pinpics-storytime-live-scene\.webp" type="image\/webp">/);
  assert.match(html,/<img src="\.\/assets\/images\/storytime\/pinpics-storytime-live-scene\.png" alt="" width="1983" height="793" loading="lazy" decoding="async">/);
  assert.match(html,/<p class="storytime-label"><span aria-hidden="true"><\/span>STORYTIME COLLECTION<span aria-hidden="true"><\/span><\/p>/);
  assert.match(html,/<h2 id="storytime-banner-title"><span class="storytime-line">Open the <em>collection<\/em><\/span><span class="storytime-line">like a <em>storybook\.<\/em><\/span><\/h2>/);
  assert.match(html,/<p class="storytime-description">Nine pins are catalogued\.<br>Three missing chapters are ready to be found\.<\/p>/);
  assert.match(html,/<a class="storytime-cta" href="\.\/sets\.html#storybook">OPEN MY STORYBOOK <span aria-hidden="true">→<\/span><\/a>/);
  assert.match(html,/<nav class="storytime-chapters" aria-label="Storytime chapter shortcuts">[\s\S]*?href="\.\/sets\.html\?chapter=beginnings#storybook"[^>]*aria-label="Open Chapter I"[^>]*>I<\/a>[\s\S]*?href="\.\/sets\.html\?chapter=adventures#storybook"[^>]*aria-label="Open Chapter II"[^>]*>II<\/a>[\s\S]*?href="\.\/sets\.html\?chapter=friendship#storybook"[^>]*aria-label="Open Chapter III"[^>]*>III<\/a>[\s\S]*?href="\.\/database\.html\?query=Storytime"[^>]*aria-label="Find missing Storytime pins"[^>]*>\?<\/a>[\s\S]*?<\/nav>/);
  assert.doesNotMatch(html,/pinpics-storytime-fantasy-banner|storytime-hit|storytime-open|<div class="sr-only"><h2 id="storytime-banner-title">/);
});

test('Storytime keeps a compressed image-led layout and stacks without a mobile scroller', async () => {
  const css = await readFile(new URL('../styles.css',import.meta.url),'utf8');
  assert.match(css,/\.storytime-banner\{[^}]*position:\s*relative;[^}]*width:\s*min\(1320px,calc\(100% - 48px\)\);[^}]*overflow:\s*hidden;[^}]*border-radius:\s*20px/s);
  assert.match(css,/\.storytime-banner__media\{[^}]*position:\s*absolute;[^}]*inset:\s*0/s);
  assert.match(css,/\.storytime-banner img\{[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*object-fit:\s*cover;[^}]*object-position:\s*center/s);
  assert.match(css,/\.storytime-content\{[^}]*position:\s*relative;[^}]*z-index:\s*2;[^}]*width:\s*min\(520px,48%\)/s);
  assert.match(css,/\.storytime-banner h2\{[^}]*font-family:\s*var\(--font-display\);[^}]*font-size:\s*clamp\(38px,4\.15vw,58px\)/s);
  assert.match(css,/\.storytime-banner h2 em\{[^}]*color:\s*var\(--color-gold\)/s);
  assert.match(css,/\.storytime-chapters a\{[^}]*width:\s*64px;[^}]*height:\s*64px;[^}]*border:\s*1px solid var\(--color-gold\)/s);
  assert.match(css,/@media\(max-width:720px\)\{[\s\S]*?\.storytime-banner\{[^}]*width:\s*calc\(100% - 28px\);[^}]*min-height:\s*640px[^}]*}[\s\S]*?\.storytime-content\{[^}]*width:\s*100%[^}]*}[\s\S]*?\.storytime-banner img\{[^}]*object-position:\s*66% center/s);
  assert.doesNotMatch(css,/\.storytime-banner__media\{[^}]*overflow-x:\s*auto|\.storytime-banner__canvas\{[^}]*width:\s*760px/s);
});

test('Storytime chapter deep links select only valid collection chapters', () => {
  assert.equal(parseStoryChapterParams(new URLSearchParams('chapter=adventures')),'adventures');
  assert.equal(parseStoryChapterParams(new URLSearchParams('chapter=friendship')),'friendship');
  assert.equal(parseStoryChapterParams(new URLSearchParams('chapter=unknown')),'beginnings');
  assert.equal(parseStoryChapterParams(new URLSearchParams()),'beginnings');
});

test('homepage editorial board distinguishes verified PinPics references from demo content', async () => {
  const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
  assert.match(html,/Official PinPics update[\s\S]*?Announcing the Submit-a-Pin Weekend![\s\S]*?https:\/\/pinpics\.com\/forums\/topic\/4468-announcing-the-submit-a-pin-weekend\//);
  assert.match(html,/Official events[\s\S]*?Browse current PinPics events[\s\S]*?https:\/\/pinpics\.com\/events\//);
  assert.match(html,/Collector help[\s\S]*?Search before you submit[\s\S]*?Pin ID Help/);
});

test('desktop header anchors the full navigation directly before the right utility cluster', async () => {
  const css = await readFile(new URL('../styles.css',import.meta.url),'utf8');
  assert.match(css,/\.desktop-nav\{[^}]*margin-left:\s*auto;[^}]*margin-right:\s*0/s);
  assert.doesNotMatch(css,/\.desktop-nav\{[^}]*margin:\s*auto(?:;|\})/s);
  assert.match(css,/\.header-actions\{[^}]*align-items:\s*center;[^}]*flex-shrink:\s*0/s);
  assert.match(css,/@media\(max-width:1180px\)\{\.desktop-nav\{display:none\}\.menu-button\{display:block\}\.header-actions\{margin-left:auto\}/);
});

test('every page uses the approved transparent wide logo in linked header and footer brand blocks', async () => {
  const pageFiles = ['index.html','database.html','pin-detail.html','sets.html','trade.html','community.html','events.html','help.html','membership.html'];
  const disclosure = 'PinPics Modernization Concept — A reimagined collector experience for discovering, cataloguing, organizing, and trading pins. Demo content and illustrative data are used throughout this prototype.';
  for (const file of pageFiles) {
    const html = await readFile(new URL(`../${file}`,import.meta.url),'utf8');
    const brand = /<a class="site-logo (?:header|footer)-logo" href="\.\/index\.html" aria-label="PinPics home"><picture><source srcset="\.\/assets\/branding\/pinpics-logo-wide\.webp" type="image\/webp"><img src="\.\/assets\/branding\/pinpics-logo-wide-600\.png" alt="PinPics" width="600" height="200" decoding="async"><\/picture><\/a>/g;
    assert.equal((html.match(brand) ?? []).length,2,`${file} serves the logo twice via picture/WebP`);
    assert.match(html,/<header[^>]*>[\s\S]*?class="site-logo header-logo"/,`${file} header logo`);
    assert.match(html,/<footer class="site-footer">[\s\S]*?class="site-logo footer-logo"/,`${file} footer logo`);
    assert.doesNotMatch(html,/src="\.\/assets\/branding\/pinpics-logo-wide\.png"/,`${file} does not ship the 2172px source as delivery`);
    assert.doesNotMatch(html,/assets\/images\/pinpics-logo-modern\.png/,`${file} removes the superseded wide logo`);
    assert.ok(html.includes(disclosure),`${file} polished demo disclosure`);
    assert.doesNotMatch(html,/class="brand-mark"/,`${file} removes the old drawn mark`);
  }
  // Archival source is kept; delivery must stay small. The 2172x724 source is
  // ~1.73MB and was previously served on every page.
  await access(new URL('../assets/branding/pinpics-logo-wide.png',import.meta.url));
  const [webp,pngFallback] = await Promise.all([
    stat(new URL('../assets/branding/pinpics-logo-wide.webp',import.meta.url)),
    stat(new URL('../assets/branding/pinpics-logo-wide-600.png',import.meta.url)),
  ]);
  assert.ok(webp.size < 80_000,`logo WebP is ${webp.size} bytes, expected under 80KB`);
  assert.ok(pngFallback.size < 250_000,`logo PNG fallback is ${pngFallback.size} bytes, expected under 250KB`);
});

test('every global footer exposes only the three verified official PinPics social destinations', async () => {
  const pageFiles = ['index.html','database.html','pin-detail.html','sets.html','trade.html','community.html','events.html','help.html','membership.html'];
  const socialLinks = [
    ['Instagram','https://www.instagram.com/pinpics_website_app_official/'],
    ['Facebook','https://www.facebook.com/PinPics'],
    ['YouTube','https://www.youtube.com/channel/UCtvX5k9bU81vdVvPKUUzHHw'],
  ];
  for (const file of pageFiles) {
    const html = await readFile(new URL(`../${file}`,import.meta.url),'utf8');
    const footer = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] ?? '';
    assert.match(footer,/<div class="footer-brand-row">[\s\S]*?class="site-logo footer-logo"[\s\S]*?<nav class="footer-socials" aria-label="PinPics social media">/,`${file} groups the logo and social navigation`);
    for (const [platform,url] of socialLinks) {
      const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      const link = new RegExp(`<a href="${escapedUrl}" target="_blank" rel="noopener noreferrer" aria-label="PinPics on ${platform}" data-tooltip="${platform}"><svg[^>]*aria-hidden="true"[^>]*>[\\s\\S]*?<\\/svg><\\/a>`);
      assert.match(footer,link,`${file} ${platform} destination and accessible icon`);
      assert.equal(footer.split(url).length - 1,1,`${file} contains one ${platform} destination`);
    }
    assert.equal((footer.match(/class="footer-socials"/g) ?? []).length,1,`${file} contains one social group`);
    assert.doesNotMatch(footer,/(twitter\.com|x\.com|tiktok\.com|linkedin\.com)/i,`${file} contains no unverified social destination`);
  }
});

test('footer social controls use the responsive navy and gold interaction treatment', async () => {
  const css = await readFile(new URL('../styles.css',import.meta.url),'utf8');
  assert.match(css,/\.footer-brand-row\{[^}]*display:\s*flex;[^}]*align-items:\s*center;[^}]*gap:\s*24px/s);
  assert.match(css,/\.footer-socials\{[^}]*display:\s*flex;[^}]*gap:\s*12px/s);
  assert.match(css,/\.footer-socials a\{[^}]*width:\s*40px;[^}]*height:\s*40px;[^}]*border:[^}]*rgba\(255,215,0,[^)]+\)[^}]*transition:[^}]*\.22s/s);
  assert.match(css,/\.footer-socials svg\{[^}]*width:\s*19px;[^}]*height:\s*19px/s);
  assert.match(css,/\.footer-socials a:hover[^}]*\{[^}]*color:\s*var\(--color-gold\);[^}]*transform:\s*translateY\(-2px\) scale\(1\.04\)/s);
  assert.match(css,/@media\(max-width:720px\)\{[\s\S]*?\.footer-brand-row\{[^}]*align-items:\s*flex-start;[^}]*flex-direction:\s*column;[^}]*gap:\s*16px/s);
});

test('the supplied logo has responsive sizing and a restrained interactive glow', async () => {
  const css = await readFile(new URL('../styles.css',import.meta.url),'utf8');
  assert.match(css,/\.header-logo\{[^}]*width:\s*clamp\(160px,[^,]+,200px\)/s);
  assert.match(css,/\.header-logo img\{[^}]*filter:[^}]*drop-shadow\([^}]*drop-shadow\(/s);
  assert.match(css,/\.header-logo:hover img\{[^}]*transform:\s*scale\(1\.02\)/s);
  assert.match(css,/\.footer-logo\{[^}]*width:\s*clamp\(150px,[^,]+,190px\)/s);
  assert.match(css,/@media\(max-width:720px\)\{[^}]*\.header-logo\{width:\s*142px\}/s);
});

test('every page exposes the complete transparent PinPics favicon set', async () => {
  const pageFiles = ['index.html','database.html','pin-detail.html','sets.html','trade.html','community.html','events.html','help.html','membership.html'];
  for (const file of pageFiles) {
    const html = await readFile(new URL(`../${file}`,import.meta.url),'utf8');
    assert.match(html,/<link rel="icon" href="\.\/assets\/favicon\/favicon\.ico" sizes="any">/,`${file} ICO favicon`);
    assert.match(html,/<link rel="icon" type="image\/png" sizes="48x48" href="\.\/assets\/favicon\/favicon-48x48\.png">/,`${file} 48px favicon`);
    assert.match(html,/<link rel="icon" type="image\/png" sizes="32x32" href="\.\/assets\/favicon\/favicon-32x32\.png">/,`${file} 32px favicon`);
    assert.match(html,/<link rel="icon" type="image\/png" sizes="16x16" href="\.\/assets\/favicon\/favicon-16x16\.png">/,`${file} 16px favicon`);
    assert.match(html,/<link rel="apple-touch-icon" sizes="180x180" href="\.\/assets\/favicon\/apple-touch-icon\.png">/,`${file} Apple touch icon`);
  }
  await Promise.all([
    'pinpics-favicon-source.png','favicon.ico','favicon-16x16.png','favicon-32x32.png','favicon-48x48.png','apple-touch-icon.png',
  ].map((file) => access(new URL(`../assets/favicon/${file}`,import.meta.url))));
});

test('header logo and hero share one responsive left-axis gutter contract', async () => {
  const css = await readFile(new URL('../styles.css',import.meta.url),'utf8');
  assert.match(css,/:root\{[^}]*--header-gutter:\s*clamp\(20px,4vw,64px\);[^}]*--hero-gutter:\s*clamp\(24px,8vw,128px\)/s);
  assert.match(css,/\.site-header\{[^}]*padding:\s*0 var\(--header-gutter\)/s);
  assert.match(css,/\.hero-copy\{[^}]*margin-left:\s*var\(--hero-gutter\)/s);
  assert.match(css,/\.header-logo\{[^}]*margin-left:\s*calc\(var\(--hero-gutter\) - var\(--header-gutter\)\)/s);
  assert.match(css,/@media\(max-width:720px\)\{:root\{--header-gutter:16px;--hero-gutter:22px\}/s);
});

test('homepage hero renders the exact headline as two Titan One lines with three branded i tittles', async () => {
  const [html,css] = await Promise.all(
    ['index.html','styles.css'].map((file) => readFile(new URL(`../${file}`,import.meta.url),'utf8')),
  );
  assert.match(html,/<h1 id="hero-title" aria-label="The home of Disney pin collecting\.">/);
  const headline = html.match(/<h1 id="hero-title"[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
  const normalizedHeadline = headline.replace(/<span class="brand-i">i<\/span>/g,'i');
  assert.equal(normalizedHeadline.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim(),'The home of Disney pin collecting.');
  // hero-line now nests brand-word, so flatten the inner spans before splitting.
  const flattened = normalizedHeadline
    .replace(/<span class="brand-word">/g,'')
    .replace(/<\/span>(?=\s*(?:<span class="hero-line">|$))/g,'\u0000')
    .replace(/<\/span>/g,'');
  const lines = flattened
    .split('\u0000')
    .map((chunk) => chunk.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim())
    .filter(Boolean);
  assert.deepEqual(lines,['The home of Disney','pin collecting.']);
  assert.equal((headline.match(/class="brand-i"/g) ?? []).length,3);
  // The tittles are drawn in CSS over real "i" characters, so the heading stays
  // searchable, indexable and copyable. Dotless U+0131 must never come back.
  assert.equal((headline.match(/<span class="brand-i">i<\/span>/g) ?? []).length,3);
  assert.doesNotMatch(html,/ı/,'index.html must contain no dotless i');
  // brand-i is inline-block, which is a line-break opportunity: without the
  // nowrap wrapper the headline splits mid-word ("Di / sney") at 375px.
  assert.equal((headline.match(/class="brand-word"/g) ?? []).length,3);
  assert.match(html,/family=Titan\+One/);
  assert.match(css,/--font-display:"Titan One",[^;]+;/);
  assert.match(css,/\.hero #hero-title\{[^}]*font-family:var\(--font-display\);[^}]*font-weight:400;[^}]*line-height:var\(--hero-title-line\);[^}]*text-shadow:var\(--hero-title-shadow\)/s);
  assert.match(css,/--hero-title-line:\.93/);
  assert.match(css,/\.hero-line\{[^}]*display:block/s);
  assert.match(css,/\.brand-word\{white-space:nowrap\}/);
  assert.match(css,/@media\(max-width:720px\)\{:root\{[^}]*--hero-title-tracking:-\.045em/);
  assert.match(css,/--color-logo-gold:#fbc001/);
  assert.match(css,/\.hero #hero-title\{[^}]*color:var\(--hero-title-color\)/s);
  assert.match(css,/--hero-title-color:#fbc001/);
  assert.doesNotMatch(css,/\.hero-line\{[^}]*background-clip:text/s);
  // The tittle is a head-and-ears mark driven by custom properties so it can be
  // retuned without touching the shadow maths. Ears must stay smaller than the
  // head, and the cluster is nudged down so it clears the line above.
  const head = Number(css.match(/--mark-head:\.(\d+)em/)?.[1]);
  const ear  = Number(css.match(/--mark-ear:\.(\d+)em/)?.[1]);
  const drop = Number(css.match(/--mark-drop:\.(\d+)em/)?.[1]);
  assert.ok(head > 0 && ear > 0, 'head and ear diameters are defined');
  assert.ok(ear < head, `ear (${ear}) must be smaller than head (${head})`);
  assert.ok(head <= 100, 'head stays under .100em so it clears the line above');
  assert.ok(drop > 0, 'cluster is nudged down off the previous line');
  assert.match(css,/\.brand-i::before\{[^}]*width:var\(--mark-head\);[^}]*height:var\(--mark-head\);[^}]*background:var\(--color-logo-gold\)/s);
  assert.match(css,/\.brand-i::before\{[^}]*box-shadow:[^;]*var\(--mark-ear-x\)[^;]*var\(--mark-ear-y\)/s);
  assert.match(css,/@media\(max-width:720px\)\{:root\{--hero-title-size:clamp\(34px,8\.8vw,52px\)/s);
  assert.doesNotMatch(css,/\.hero-line\{display:inline\}/);
});

test('Discover and Database use distinct permanent local hero image pairs', async () => {
  const [home,database,css] = await Promise.all(
    ['index.html','database.html','styles.css'].map((file) => readFile(new URL(`../${file}`,import.meta.url),'utf8')),
  );
  assert.match(home,/pinpics-discover-fantasy\.webp/);
  assert.match(home,/pinpics-discover-fantasy\.png/);
  assert.doesNotMatch(home,/pinpics-database-vault/);
  assert.match(database,/class="page-hero compact-page-hero database-hero"/);
  assert.match(database,/pinpics-database-vault\.webp/);
  // Photographic hero: the non-WebP fallback is a JPEG, not a 1.3MB PNG.
  assert.match(database,/pinpics-database-vault-1600\.jpg/);
  assert.doesNotMatch(database,/pinpics-discover-fantasy/);
  assert.match(css,/\.hero-panorama img\{[^}]*object-position:right center/s);
  assert.match(css,/\.database-hero-media img\{[^}]*object-fit:cover;[^}]*object-position:78% 62%/s);
  await Promise.all([
    'pinpics-discover-fantasy.png','pinpics-discover-fantasy.webp',
    'pinpics-database-vault.png','pinpics-database-vault.webp','pinpics-database-vault-1600.jpg',
  ].map((file) => access(new URL(`../assets/images/heroes/${file}`,import.meta.url))));
});

test('homepage statistics center three equal blocks and distinguish sourced facts from demo data', async () => {
  const [html,css] = await Promise.all(
    ['index.html','styles.css'].map((file) => readFile(new URL(`../${file}`,import.meta.url),'utf8')),
  );
  assert.doesNotMatch(html,/The live PinPics Database showed 151,573 results/);
  assert.match(css,/\.compact-credibility-stage \.credibility \.metric\{[^}]*text-align:center;[^}]*display:flex;[^}]*align-items:center/s);
  assert.match(css,/\.credibility\{[^}]*grid-template-columns:repeat\(3,1fr\)/s);
});

test('every header search is an icon-only accessible database link', async () => {
  const pageFiles = ['index.html','database.html','pin-detail.html','sets.html','trade.html','community.html','events.html','help.html','membership.html'];
  for (const file of pageFiles) {
    const html = await readFile(new URL(`../${file}`,import.meta.url),'utf8');
    const control = html.match(/<a class="header-search"[\s\S]*?<\/a>/)?.[0] ?? '';
    const expectedTarget = file === 'database.html'
      ? '#database-search'
      : file === 'index.html' ? './database.html#database-search' : './database.html';
    assert.ok(control.includes(`href="${expectedTarget}"`),`${file} preserves its search target`);
    assert.match(control,/aria-label="Search PinPics"/);
    assert.match(control,/<svg[^>]+viewBox="0 0 24 24"[^>]+aria-hidden="true"[^>]*>[\s\S]*?<\/svg>/);
    assert.equal(control.replace(/<[^>]+>/g,'').trim(),'');
  }
  const css = await readFile(new URL('../styles.css',import.meta.url),'utf8');
  assert.match(css,/\.header-search\{[^}]*display:inline-grid;[^}]*place-items:center;[^}]*width:38px;[^}]*height:38px;[^}]*padding:0/s);
  assert.match(css,/\.header-search svg\{[^}]*width:18px;[^}]*height:18px/s);
});

const ALL_PAGES = ['index.html','database.html','pin-detail.html','sets.html','trade.html','community.html','events.html','help.html','membership.html'];

test('every page busts the same stylesheet and script version', async () => {
  const versions = new Set();
  const scripts = new Set();
  for (const file of ALL_PAGES) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    const css = html.match(/styles\.css\?v=(\d+)/)?.[1];
    const js = html.match(/app\.mjs\?v=(\d+)/)?.[1];
    assert.ok(css, `${file} declares a stylesheet version`);
    assert.ok(js, `${file} declares a script version`);
    versions.add(css);
    scripts.add(js);
  }
  // Drift here silently serves a stale stylesheet to anyone with a warm cache.
  assert.equal(versions.size, 1, `stylesheet versions drifted: ${[...versions].join(', ')}`);
  assert.equal(scripts.size, 1, `script versions drifted: ${[...scripts].join(', ')}`);
});

test('the More panel never paints the current page in gold on white', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  // Gold on the white dropdown measures 1.4:1. The gold rule must stay scoped
  // to the dark navbar's direct children.
  assert.match(css, /\.desktop-nav>\[aria-current="page"\]\{[^}]*color:var\(--color-gold\)/);
  assert.doesNotMatch(css, /\.desktop-nav \[aria-current="page"\]\{[^}]*color:var\(--color-gold\)/);
  assert.match(css, /\.more-menu>div a\[aria-current="page"\]\{[^}]*color:var\(--color-royal\)/);
});

test('every image declares intrinsic dimensions', async () => {
  for (const file of ALL_PAGES) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    const unsized = (html.match(/<img\b[^>]*>/g) ?? []).filter((tag) => !/\bwidth=/.test(tag) || !/\bheight=/.test(tag));
    assert.deepEqual(unsized, [], `${file} has images without width/height`);
  }
});

test('every page exposes a complete link-preview card', async () => {
  for (const file of ALL_PAGES) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    for (const tag of ['og:type','og:title','og:description','og:url','og:image','og:image:width','og:image:height','og:image:alt']) {
      assert.match(html, new RegExp(`property="${tag}"`), `${file} declares ${tag}`);
    }
    assert.match(html, /name="twitter:card" content="summary_large_image"/, `${file} twitter card`);
    assert.match(html, /rel="canonical"/, `${file} canonical`);
    // og:image must be absolute for scrapers to resolve it.
    assert.match(html, /property="og:image" content="https?:\/\//, `${file} absolute og:image`);
  }
  await access(new URL('../assets/social/og-card.jpg', import.meta.url));
});

test('the retired concept artwork is no longer bundled', async () => {
  const orphans = [
    'assets/images/pinpics-finale-panorama.png',
    'assets/images/pinpics-hero-panorama.png',
    'assets/images/pinpics-collector-hero-v2.png',
    'assets/images/storytime/pinpics-storytime-fantasy-banner.png',
    'assets/images/pinpics-logo-modern.png',
    'assets/images/heroes/pinpics-database-collector.png',
    'assets/images/heroes/pinpics-database-collector.webp',
  ];
  for (const orphan of orphans) {
    await assert.rejects(
      access(new URL(`../${orphan}`, import.meta.url)),
      `${orphan} should have been removed; nothing references it`,
    );
  }
});

test('no competitor design system is bundled with the demo', async () => {
  await assert.rejects(access(new URL('../_ds', import.meta.url)), '_ds must not ship with the demo');
});

test('the display heading tier uses the hero and logo face on every page', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  // h1, section headings, tier names and the finale all share Titan One.
  const rule = css.match(/h1,\s*\.section-heading h2,\s*\.results-heading h2,\s*\.results-heading h3,\s*\.tier-card>h2,\s*\.finale h2\{([^}]*)\}/s);
  assert.ok(rule, 'display heading rule is present');
  assert.match(rule[1], /font-family:var\(--font-display\)/);
  assert.match(rule[1], /font-weight:400/, 'Titan One ships a single weight');

  // Card, panel and calendar headings deliberately stay in Montserrat.
  assert.doesNotMatch(css, /\.utility-panel h2\{[^}]*var\(--font-display\)/s);

  for (const file of ALL_PAGES) {
    const html = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.match(html, /family=Titan\+One/, `${file} loads Titan One`);
    assert.match(html, /family=Montserrat:wght@400;500;600;700;800/, `${file} still loads Montserrat`);
  }
});

test('the brand tittle mark is gated behind an opt-in class and is currently off', async () => {
  const [css, html] = await Promise.all(
    ['styles.css', 'index.html'].map((f) => readFile(new URL(`../${f}`, import.meta.url), 'utf8')),
  );
  // The mark must never apply from a bare .brand-i selector.
  assert.doesNotMatch(css, /(?<!brand-tittles )\.brand-i::before\{[^}]*content:""/s);
  assert.match(css, /#hero-title\.brand-tittles \.brand-i::before\{[^}]*content:""/s);
  // Off right now: the heading does not carry the opt-in class.
  assert.doesNotMatch(html, /<h1 id="hero-title"[^>]*class="[^"]*brand-tittles/);
  // The three spans stay in the markup so re-enabling is one class, not a re-edit.
  assert.equal((html.match(/<span class="brand-i">i<\/span>/g) ?? []).length, 3);
});

test('the database grid is six across and never stacks the badge on the compare control', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.database-pin-grid\{grid-template-columns:repeat\(6,minmax\(0,1fr\)\)/);
  // The 52px art strip was what made the badge and compare overlap.
  const artH = Number(css.match(/\.database-pin-grid \.pin-card\.landscape-card \.pin-art\{[^}]*min-height:(\d+)px/)?.[1]);
  assert.ok(artH >= 120, `database art strip is ${artH}px, expected >= 120px`);
  // Homepage archive must stay four across.
  assert.match(css, /\.pin-grid\{display:grid;grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
});

test('filter panel styling stays out of the Add Pin utility panel', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  // .filter-actions is reused by the Add Pin panel, so the compact button rules
  // must all be scoped to .filter-panel.
  for (const m of css.matchAll(/^\.filter-actions[^{]*\{([^}]*)\}/gm)) {
    assert.doesNotMatch(m[1], /padding:8px|font-size:11\.5px/, 'compact button rule leaked out of .filter-panel');
  }
  assert.match(css, /\.filter-panel \.filter-actions button\{/);
});

test('pagination slices the filtered set into twelve-card pages', () => {
  assert.equal(PINS_PER_PAGE, 12);
  const items = Array.from({ length: 32 }, (_, i) => i + 1);
  assert.equal(pageCount(32), 3);
  assert.equal(pageCount(26), 3);
  assert.equal(pageCount(12), 1);
  assert.equal(pageCount(0), 1, 'an empty result set is still one page');
  assert.deepEqual(paginate(items, 1).slice(0, 2), [1, 2]);
  assert.equal(paginate(items, 1).length, 12);
  assert.equal(paginate(items, 2)[0], 13);
  assert.equal(paginate(items, 3).length, 8, 'last page holds the remainder');
  // 26 results -> 12 / 12 / 2, exactly the spec's worked example.
  const filtered = Array.from({ length: 26 }, (_, i) => i + 1);
  assert.equal(paginate(filtered, 1).length, 12);
  assert.equal(paginate(filtered, 2).length, 12);
  assert.deepEqual(paginate(filtered, 3), [25, 26]);
});

test('page requests are clamped instead of producing an invalid state', () => {
  assert.equal(clampPage(0, 32), 1);
  assert.equal(clampPage(-5, 32), 1);
  assert.equal(clampPage(99, 32), 3, 'cannot page past the last page');
  assert.equal(clampPage(4, 26), 3);
  assert.equal(clampPage(NaN, 32), 1);
  // Landing on page 4 then filtering down to 2 results must not strand the UI.
  assert.equal(clampPage(4, 2), 1);
  assert.deepEqual(paginate([1, 2], 4), [1, 2]);
});

test('the page window stays compact instead of listing every page', () => {
  assert.deepEqual(paginationRange(1, 3), [1, 2, 3]);
  assert.deepEqual(paginationRange(1, 5), [1, 2, 3, 4, 5]);
  const wide = paginationRange(4, 20);
  assert.ok(wide.length <= 7, `window rendered ${wide.length} slots`);
  assert.equal(wide[0], 1, 'first page always reachable');
  assert.equal(wide[wide.length - 1], 20, 'last page always reachable');
  assert.ok(wide.includes(4), 'current page is present');
  assert.ok(wide.includes('…'), 'gaps collapse to an ellipsis');
  assert.ok(paginationRange(20, 20).includes(20));
});

test('the result count reflects the visible slice', () => {
  assert.equal(paginationSummary(32, 1), 'Showing 1–12 of 32 demo pins');
  assert.equal(paginationSummary(32, 2), 'Showing 13–24 of 32 demo pins');
  assert.equal(paginationSummary(32, 3), 'Showing 25–32 of 32 demo pins');
  // A single page keeps the original wording, so the existing copy is untouched.
  assert.equal(paginationSummary(6, 1), 'Showing 6 demo pins');
  assert.equal(paginationSummary(0, 1, 12, 'missing'), 'No pins found for “missing”');
  assert.equal(paginationSummary(26, 2, 12, 'stitch'), 'Showing 13–24 of 26 pins for “stitch”');
});

test('pagination markup is semantic, labelled and correctly disabled at the bounds', () => {
  assert.equal(paginationTemplate(1, 1), '', 'a single page renders no control');
  const first = paginationTemplate(1, 3);
  assert.match(first, /data-page-step="-1"[^>]*disabled/, 'previous disabled on page 1');
  assert.doesNotMatch(first, /data-page-step="1"[^>]*disabled/, 'next enabled on page 1');
  assert.match(first, /aria-label="Previous page"/);
  assert.match(first, /aria-label="Next page"/);
  assert.match(first, /data-page="2"[^>]*aria-label="Go to page 2"/);
  assert.match(first, /aria-current="page"/);
  assert.match(first, /Page 1 of 3/);
  const last = paginationTemplate(3, 3);
  assert.match(last, /data-page-step="1"[^>]*disabled/, 'next disabled on the last page');
  assert.doesNotMatch(last, /data-page-step="-1"[^>]*disabled/, 'previous enabled on the last page');
  // Real buttons, not decorative spans.
  assert.ok((first.match(/<button/g) ?? []).length >= 5);
});

test('the database page hosts a labelled pagination landmark and keeps its result count', async () => {
  const [html, css] = await Promise.all(
    ['database.html', 'styles.css'].map((f) => readFile(new URL(`../${f}`, import.meta.url), 'utf8')),
  );
  assert.match(html, /<nav class="pagination" id="database-pagination" aria-label="Pin database pagination"/);
  assert.match(html, /id="search-status"[^>]*aria-live="polite"/, 'result count survives');
  assert.match(html, /id="database-pin-grid"/);
  // Active page is not signalled by colour alone.
  assert.match(css, /\.pagination__page\[aria-current="page"\]\{[^}]*background:var\(--color-gold\)/s);
  assert.match(css, /\.pagination__arrow:disabled\{[^}]*cursor:not-allowed/s);
  assert.match(css, /\.pagination__page:focus-visible[^{]*\{[^}]*outline:/s);
  assert.match(css, /\.pagination__page[^{]*\{[^}]*font-family:var\(--font-ui\)/s);
});

test('retired panorama art is no longer referenced by any stylesheet rule', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  // These files were removed; a lingering url() would 404 on any imageless pin.
  assert.doesNotMatch(css, /url\(["']?\.\/assets\/images\/pinpics-hero-panorama/);
  assert.doesNotMatch(css, /url\(["']?\.\/assets\/images\/pinpics-finale-panorama/);
});

test('the homepage information cards are rebuilt on the premium card system', async () => {
  const [html, css] = await Promise.all(
    ['index.html', 'styles.css'].map((f) => readFile(new URL(`../${f}`, import.meta.url), 'utf8')),
  );
  assert.equal((html.match(/class="info-card"/g) ?? []).length, 3);

  // The old flat treatment and its gold top strip must not come back.
  assert.doesNotMatch(css, /border-top:4px solid var\(--color-gold\)/, 'gold top strip removed');
  assert.doesNotMatch(css, /\.editorial-board article\{/, 'old article styling removed');

  // Same component DNA as .pin-card: 14px radius, 1px cool border, layered shadow.
  const card = css.match(/\.info-card\{([^}]*)\}/s)?.[1] ?? '';
  assert.match(card, /border-radius:14px/, 'matches the house card radius');
  assert.match(card, /border:1px solid #e4e9f1/);
  assert.match(card, /transition:transform 220ms ease,box-shadow 220ms ease,border-color 220ms ease/);

  // Hover: subtle lift with the shadow responding underneath.
  const hover = css.match(/\.info-card:hover,\.info-card:focus-within\{([^}]*)\}/s)?.[1] ?? '';
  assert.match(hover, /transform:translateY\(-4px\)/, 'lifts 4px, inside the 3-5px band');
  assert.match(hover, /0 18px 34px -12px/, 'shadow drops lower and spreads');
  assert.ok(/focus-within/.test(css), 'keyboard focus gets the same response');
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)[\s\S]*?\.info-card:hover,\.info-card:focus-within\{transform:none\}/);

  // One real anchor per card, stretched over the tile — never nested links.
  assert.match(css, /\.info-card__cta::after\{content:"";position:absolute;inset:0/);
  assert.equal((html.match(/class="info-card__cta"/g) ?? []).length, 3);

  // Destinations are the audited live ones, with safe external attributes.
  assert.match(html, /href="https:\/\/pinpics\.com\/forums\/topic\/4468-announcing-the-submit-a-pin-weekend\/" target="_blank" rel="noopener noreferrer"/);
  assert.match(html, /href="https:\/\/pinpics\.com\/events\/" target="_blank" rel="noopener noreferrer"/);
  assert.match(html, /href="\.\/help\.html"/);
  assert.doesNotMatch(html.slice(html.indexOf('editorial-board'), html.indexOf('</section>', html.indexOf('editorial-board'))), /href="#"/);

  // Gold stays an accent, not a border: it appears only on the hover arrow.
  assert.match(css, /\.info-card:hover \.info-card__arrow[^{]*\{[^}]*color:var\(--color-gold\)/s);
});

test('every page hero shares one heading treatment with the Discover hero', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  // The treatment lives in tokens so the two rules cannot drift apart again —
  // previously the secondary heroes were flat #ffd700 with no navy stroke.
  for (const token of ['size', 'line', 'tracking', 'color', 'shadow']) {
    assert.match(css, new RegExp(`--hero-title-${token}:`), `--hero-title-${token} defined`);
  }
  const discover = css.match(/\.hero #hero-title\{([^}]*)\}/s)?.[1] ?? '';
  const pageHero = css.match(/\.page-hero h1\{([^}]*)\}/s)?.[1] ?? '';
  for (const prop of ['font-size:var(--hero-title-size)', 'line-height:var(--hero-title-line)',
                      'letter-spacing:var(--hero-title-tracking)', 'color:var(--hero-title-color)',
                      'text-shadow:var(--hero-title-shadow)', 'font-family:var(--font-display)']) {
    assert.ok(discover.includes(prop), `Discover hero uses ${prop}`);
    assert.ok(pageHero.includes(prop), `page heroes use ${prop}`);
  }
  // No hero may re-declare its own size or colour outside the token.
  assert.doesNotMatch(css, /\.page-hero h1\{[^}]*color:var\(--color-gold\)/s);
  assert.doesNotMatch(css, /@media\(max-width:720px\)[\s\S]{0,400}?\.page-hero h1\{font-size:42px\}/);
});

test('the standalone presentation build exposes only Discover and Database', async () => {
  const sa = await readFile(new URL('../standalone.html', import.meta.url), 'utf8');

  // Two views, both real content — not iframes.
  assert.doesNotMatch(sa, /<iframe/i, 'no iframe shortcut');
  assert.match(sa, /id="view-discover"/);
  assert.match(sa, /id="view-database"/);
  assert.match(sa, /id="database-pin-grid"/, 'database view carries the real grid');
  assert.match(sa, /id="home-pin-grid"/, 'discover view carries the real archive grid');
  assert.match(sa, /id="database-pagination"/);
  assert.match(sa, /id="database-filter-form"/);
  assert.match(sa, /class="info-card"/);

  // Navigation is limited to the two presented views.
  const nav = sa.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/)?.[0] ?? '';
  const navHrefs = [...nav.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(navHrefs, ['#discover', '#database']);
  assert.doesNotMatch(nav, /sets|trade|community|events|help|membership/i);
  assert.doesNotMatch(sa, /class="more-menu"/, 'no More menu in the presentation build');

  // Chrome navigation regions must not link out to excluded pages.
  for (const region of [/<nav class="desktop-nav"[\s\S]*?<\/nav>/, /<aside class="site-drawer"[\s\S]*?<\/aside>/,
                        /<nav class="mobile-nav"[\s\S]*?<\/nav>/, /<footer class="site-footer">[\s\S]*?<\/footer>/]) {
    const html = sa.match(region)?.[0] ?? '';
    assert.doesNotMatch(html, /href="\.\/(sets|trade|community|events|help|membership|index|pin-detail)\.html/,
      'navigation region links only to presented views');
  }

  // CSS and JS are inlined at build time so the file also opens from file://,
  // where an ES module would be blocked and the archive controller would die.
  assert.doesNotMatch(sa, /type="module"/, 'no module script under file://');
  assert.doesNotMatch(sa, /href="\.\/styles\.css/, 'stylesheet is inlined');
  assert.match(sa, /PINS_PER_PAGE = 12/, 'archive controller is inlined');
  assert.match(sa, /\.pin-card\{/, 'card styles are inlined');
  // Fully self-contained: images and fonts are embedded, so the single file can
  // be emailed on its own. Nothing may resolve against the surrounding folder.
  assert.doesNotMatch(sa, /\.\/assets\//, 'no relative asset paths remain');
  assert.doesNotMatch(sa, /fonts\.(googleapis|gstatic)\.com/, 'fonts are embedded, not fetched');
  assert.match(sa, /data:image\/webp;base64,/, 'artwork is embedded');
  assert.match(sa, /data:font\/woff2;base64,/, 'fonts are embedded');
  // Deduplicated: JS-referenced assets resolve through one shared lookup.
  assert.match(sa, /const __A=\[/, 'shared asset lookup present');
  // Guard against duplicated variants like logo-copy2.svg / hero-final-new.png.
  // (Word-boundary anchored so legitimate names such as "cartoon-finale-cta" pass.)
  assert.doesNotMatch(sa, /[-_](copy\d*|final\d+|new\d+|v\d+)\.(png|jpe?g|webp|svg|css|m?js)/i,
    'no duplicated asset variants');

  // Hash routing with history support.
  assert.match(sa, /addEventListener\('hashchange'/);
  assert.match(sa, /window\.scrollTo\(\{ top: 0/, 'each view starts at the top');
  assert.doesNotMatch(sa, /href="#"/, 'no placeholder anchors');
  // Strip embedded blobs first: megabytes of base64 will contain "todo" by chance.
  const prose = sa.replace(/data:[a-z/+]+;base64,[A-Za-z0-9+/=]+/g, '');
  assert.doesNotMatch(prose, /lorem ipsum|\bTODO\b|\bFIXME\b/i, 'presentation-safe copy');
});

test('the standalone build stays reproducible from the approved pages', async () => {
  const [sa, idx, db] = await Promise.all(
    ['standalone.html', 'index.html', 'database.html'].map((f) => readFile(new URL(`../${f}`, import.meta.url), 'utf8')),
  );
  // Content is extracted from the real pages by build-standalone.mjs, so key
  // approved strings must appear identically in the presentation build.
  for (const needle of ['The home of Disney', 'Search the collector archive.',
                        'Announcing the Submit-a-Pin Weekend!', 'Illustrative collector records']) {
    assert.ok(sa.includes(needle), `standalone carries "${needle}"`);
  }
  assert.ok(idx.includes('The home of Disney') && db.includes('Search the collector archive.'),
    'source pages remain intact');
  // The development build must keep its full navigation.
  const devNav = idx.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/)?.[0] ?? '';
  assert.ok([...devNav.matchAll(/href="/g)].length >= 6, 'dev site navigation untouched');
});

test('the hero search focus ring no longer runs under the attached CTA', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  // The global gold ring (3px + 3px offset) overlapped the button, whose left
  // edge meets the input at 0px. The indication moved to the assembly instead.
  assert.match(css, /\.hero-search input:focus-visible\{outline:none\}/);
  assert.match(css, /\.hero-search:focus-within\{[^}]*border-color:var\(--color-blue\)/s);
  assert.match(css, /\.hero-search:focus-within\{[^}]*box-shadow:0 0 0 3px rgba\(27,88,199/s);
  // A replacement must exist — never a bare outline:none.
  const block = css.match(/\.hero-search:focus-within\{([^}]*)\}/s)?.[1] ?? '';
  assert.ok(/box-shadow/.test(block) && /border-color/.test(block), 'focus stays visible');
  // The CTA itself is untouched.
  assert.match(css, /\.hero-search button\{[^}]*background:var\(--color-gold\)/s);
});

test('the notification count sits dead centre in a true circle', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  const badge = css.match(/\.icon-button span\{([^}]*)\}\s*$/m)?.[1]
    ?? css.match(/\.icon-button span\{([^}]*display:inline-flex[^}]*)\}/s)?.[1] ?? '';
  assert.match(badge, /display:inline-flex/);
  assert.match(badge, /align-items:center/);
  assert.match(badge, /justify-content:center/);
  assert.match(badge, /padding:0/, 'no asymmetric padding doing the centring');
  assert.match(badge, /width:18px;height:18px/, 'equal width and height');
  assert.match(badge, /border-radius:50%/);
  assert.match(css, /\.icon-button\{[^}]*display:inline-flex[^}]*\}/s);
  // No hand-tuned nudges.
  assert.doesNotMatch(badge, /margin-(top|left):-?\d/, 'no manual offset hacks');
  assert.doesNotMatch(badge, /position:relative;[^}]*top:/, 'no positional nudge');
});

test('the collector profile panel is rebuilt on the filter-panel design language', async () => {
  const [css, js] = await Promise.all(
    ['styles.css', 'app.mjs'].map((f) => readFile(new URL(`../${f}`, import.meta.url), 'utf8')),
  );
  // Markup rebuilt at its source (app.mjs renders this panel at runtime).
  for (const cls of ['profile-card__head', 'profile-card__avatar', 'profile-card__eyebrow',
                     'profile-card__stats', 'profile-card__chips', 'profile-card__menu',
                     'profile-card__signout']) {
    assert.ok(js.includes(cls), `app.mjs renders .${cls}`);
  }
  assert.doesNotMatch(js, /class="profile-summary"/, 'old generic markup removed');
  assert.doesNotMatch(js, /class="profile-counts"/, 'old counts markup removed');
  // Content preserved.
  for (const label of ['Owned', 'Want', 'Trade', 'Sign out']) assert.ok(js.includes(label));
  assert.match(js, /nav class="profile-card__menu" aria-label="Profile links"/, 'landmark label kept');

  // Shares the Filter Pins tokens rather than inventing a second system.
  const panel = css.match(/\[data-utility-panel="profile"\]\{([^}]*)\}/s)?.[1] ?? '';
  assert.match(panel, /border-radius:16px/);
  assert.match(panel, /border:1px solid #eef1f6/);
  assert.match(panel, /background:#fff/);
  assert.match(css, /\.profile-card__stats\{[^}]*background:#fafbfd[^}]*border:1px solid #eef1f6/s);
  assert.match(css, /\.profile-card__menu a\{[^}]*border-radius:8px/s);
  // Interaction states exist and reduced motion is honoured.
  assert.match(css, /\.profile-card__menu a:hover\{/);
  assert.match(css, /\.profile-card__menu a:focus-visible\{[^}]*outline:/s);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{\[data-utility-panel="profile"\]\{animation:none\}\}/);
  // The crude yellow rectangle on the active row is gone.
  assert.doesNotMatch(css, /\.profile-card__menu a\[aria-current="page"\]\{[^}]*outline:3px solid var\(--color-gold\)/s);
});

test('the embed pass keeps <picture> wrappers so full-bleed art still fills', async () => {
  const sa = await readFile(new URL('../standalone.html', import.meta.url), 'utf8');

  // Regression guard. The embed pass drops the <source> to avoid shipping the
  // PNG fallback, but the <picture> wrapper MUST stay: the layout classes live
  // on it, and rules like `.panorama img{width:100%;object-fit:cover}` stop
  // matching if the class is moved onto the <img>. That left the hero art at its
  // intrinsic 1536px with a white gap on wide screens.
  assert.match(sa, /<picture class="panorama hero-panorama"[^>]*><img/,
    'hero art keeps its picture wrapper');
  assert.match(sa, /<picture class="database-hero-media"[^>]*><img/,
    'database hero keeps its picture wrapper');
  assert.match(sa, /<picture class="storytime-banner__media"[^>]*><img/,
    'storytime art keeps its picture wrapper');

  // The class must never end up on the <img> itself.
  assert.doesNotMatch(sa, /<img[^>]*class="[^"]*\bpanorama\b/, 'panorama class stays on <picture>');
  assert.doesNotMatch(sa, /<img[^>]*class="[^"]*database-hero-media/, 'media class stays on <picture>');

  // <source> is gone (that is the whole point of the pass) and the img carries the WebP.
  assert.doesNotMatch(sa, /<source\s/, 'no <source> left to double the payload');
  const heroImg = sa.match(/<picture class="panorama hero-panorama"[^>]*><img([^>]*)>/)?.[1] ?? '';
  assert.match(heroImg, /src="data:image\/webp;base64,/, 'hero img points at the embedded WebP');
});
