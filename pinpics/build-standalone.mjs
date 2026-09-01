/**
 * Assembles standalone.html from the real index.html / database.html sources so the
 * presentation build can never drift from the approved pages. Re-run after editing either.
 *   node build-standalone.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';

/* Inlined so standalone.html opens by double-click as well as over http://.
   ES modules are blocked under file://, which would kill the archive controller. */
const inlineCss = await readFile('styles.css', 'utf8');
const inlineJs = (await readFile('app.mjs', 'utf8'))
  .replace(/^export\s+(const|function|class|let)\s/gm, '$1 ')
  .replace(/^export\s+\{[^}]*\};?\s*$/gm, '');

const idx = await readFile('index.html', 'utf8');
const db  = await readFile('database.html', 'utf8');

const grab = (src, re, label) => {
  const m = src.match(re);
  if (!m) throw new Error(`standalone build: could not find ${label}`);
  return m[1] ?? m[0];
};

const discoverMain = grab(idx, /<main id="main">([\s\S]*?)<\/main>/, 'index main');
const databaseMain = grab(db,  /<main id="main">([\s\S]*?)<\/main>/, 'database main');
const utilityPanels = grab(idx, /(<div class="utility-panels">[\s\S]*?)(?=<aside class="site-drawer")/, 'utility panels');
const compareTray  = grab(db,  /<div class="compare-tray"[\s\S]*?<\/button><\/div>/, 'compare tray');
const toast        = grab(idx, /<[^>]*id="toast"[^>]*><\/[a-z]+>/, 'toast');
const favicons     = grab(idx, /(<link rel="icon"[\s\S]*?apple-touch-icon\.png">)/, 'favicons');
const fonts        = grab(idx, /(<link rel="preconnect"[\s\S]*?display=swap" rel="stylesheet">)/, 'font links');
// Stop at the original link columns — they are replaced below, not reused.
const footerBrand  = grab(idx, /(<div class="footer-lead">[\s\S]*?)(?=<div class="footer-links">)/, 'footer brand block');
const cssV  = grab(idx, /styles\.css\?v=(\d+)/, 'css version');
const jsV   = grab(idx, /app\.mjs\?v=(\d+)/, 'js version');

/* Only the two presented views appear in navigation. */
const nav = `<nav class="desktop-nav" aria-label="Main navigation">
      <a href="#discover" data-view-link="discover">Discover</a><a href="#database" data-view-link="database">Database</a>
    </nav>`;

const utilities = `<div class="header-actions"><a class="header-search" href="#database" data-view-link="database" data-focus-search aria-label="Search PinPics"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg></a><button class="header-link" type="button" data-utility-trigger="add-pin" aria-expanded="false" aria-controls="utility-add-pin">Add pin</button><button class="icon-button" type="button" data-utility-trigger="notifications" aria-expanded="false" aria-controls="utility-notifications" aria-label="Notifications"><span>2</span></button><button class="profile-button" type="button" data-utility-trigger="profile" aria-expanded="false" aria-controls="utility-profile" aria-label="Open profile">JM</button><button class="menu-button" data-menu-toggle aria-label="Open site menu">☰</button></div>`;

const drawer = `<aside class="site-drawer" id="site-drawer" hidden><a href="#discover" data-view-link="discover">Discover</a><a href="#database" data-view-link="database">Database</a></aside>`;

const mobileNav = `<nav class="mobile-nav" aria-label="Mobile navigation"><a href="#discover" data-view-link="discover">⌂<span>Home</span></a><a href="#database" data-view-link="database">⌕<span>Database</span></a></nav>`;

/* Footer keeps the brand row, socials and disclosure; link columns are trimmed to
   destinations that exist in this build plus verified live PinPics pages. */
const footerLinks = `<div class="footer-links"><div><strong>Explore</strong><a href="#discover" data-view-link="discover">Discover</a><a href="#database" data-view-link="database">Collector archive</a></div><div><strong>PinPics</strong><a href="https://pinpics.com/forums/" target="_blank" rel="noopener noreferrer">Forums</a><a href="https://pinpics.com/events/" target="_blank" rel="noopener noreferrer">Events</a><a href="https://pinpics.com/faqs/" target="_blank" rel="noopener noreferrer">FAQs</a></div></div>`;

/* The footer logo points at index.html in the dev build; keep it inside the presentation. */
const footerBrandLocal = footerBrand.replace('href="./index.html"', 'href="#discover" data-view-link="discover"');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="PinPics modernization concept — Discover and Collector Archive presentation build.">
  <title>PinPics Modernization — Concept Presentation</title>
  ${favicons}
  ${fonts}
  <style>\n${inlineCss}\n  </style>
  <style>
    /* View switching only — no visual redesign lives here. */
    .sa-view[hidden]{display:none}
    .sa-view{animation:sa-fade 180ms ease}
    @keyframes sa-fade{from{opacity:0}to{opacity:1}}
    @media(prefers-reduced-motion:reduce){.sa-view{animation:none}}
  </style>
</head>
<body data-page="database">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header solid-header"><a class="site-logo header-logo" href="#discover" data-view-link="discover" aria-label="PinPics home"><picture><source srcset="./assets/branding/pinpics-logo-wide.webp" type="image/webp"><img src="./assets/branding/pinpics-logo-wide-600.png" alt="PinPics" width="600" height="200" decoding="async"></picture></a>
    ${nav}
    ${utilities}
  </header>
  ${utilityPanels}${drawer}
  <main id="main">
    <div class="sa-view" id="view-discover" data-view="discover">${discoverMain}</div>
    <div class="sa-view" id="view-database" data-view="database" hidden>${databaseMain}</div>
  </main>
  ${compareTray}
  ${mobileNav}
  <footer class="site-footer">${footerBrandLocal}${footerLinks}</footer>
  ${toast}
  <script>\n${inlineJs}\n  </script>
  <script>
  (() => {
    const VIEWS = ['discover', 'database'];
    const viewFromHash = () => {
      const h = (location.hash || '').replace('#', '');
      return VIEWS.includes(h) ? h : 'discover';
    };

    const paint = (view, { scroll = true } = {}) => {
      document.querySelectorAll('.sa-view').forEach((v) => { v.hidden = v.dataset.view !== view; });
      document.querySelectorAll('[data-view-link]').forEach((a) => {
        const on = a.dataset.viewLink === view;
        if (a.closest('.desktop-nav') || a.closest('.mobile-nav')) {
          if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
        }
      });
      document.title = view === 'database'
        ? 'Collector archive — PinPics Modernization'
        : 'Discover — PinPics Modernization';
      if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
    };

    // Route on load and on Back/Forward, so refresh and history both restore the view.
    paint(viewFromHash(), { scroll: false });
    addEventListener('hashchange', () => paint(viewFromHash()));

    // Capture phase: runs before the app's own handlers so in-page destinations
    // that would leave the presentation are redirected to a view instead.
    addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const known = link.dataset.viewLink;
      if (known) {
        e.preventDefault();
        if (location.hash !== '#' + known) location.hash = known; else paint(known);
        if (link.hasAttribute('data-focus-search')) {
          setTimeout(() => document.getElementById('database-search')?.focus(), 60);
        }
        return;
      }
      if (/^(https?:|mailto:|#)/.test(href)) return;      // external + in-page anchors pass through
      // Any local .html destination not in this build resolves to the archive.
      if (/\\.html/.test(href)) {
        e.preventDefault();
        const q = (href.match(/[?&]query=([^&#]*)/) || [])[1];
        location.hash = 'database';
        if (q) {
          setTimeout(() => {
            const f = document.getElementById('database-filter-form');
            if (!f) return;
            f.elements.query.value = decodeURIComponent(q);
            f.requestSubmit();
          }, 60);
        }
      }
    }, true);

    // app.mjs writes the profile panel's innerHTML at runtime, with links to sections
    // this build does not present. Observe the panel so the retarget cannot lose a race.
    const trimProfilePanel = () => {
      const nav = document.querySelector('[data-utility-panel="profile"] nav[aria-label="Profile links"]');
      if (!nav || nav.dataset.saTrimmed) return false;
      nav.dataset.saTrimmed = '1';
      nav.innerHTML = '<a href="#discover" data-view-link="discover">Discover</a>'
        + '<a href="#database" data-view-link="database">My collection archive</a>';
      return true;
    };
    const profilePanel = document.querySelector('[data-utility-panel="profile"]');
    if (profilePanel) {
      trimProfilePanel();
      new MutationObserver(trimProfilePanel).observe(profilePanel, { childList: true, subtree: true });
    }

    // The hero search submits to ./database.html in the dev build; keep it in-page here.
    addEventListener('submit', (e) => {
      if (e.target.id !== 'hero-search-form') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const q = String(new FormData(e.target).get('query') || '');
      location.hash = 'database';
      setTimeout(() => {
        const f = document.getElementById('database-filter-form');
        if (!f) return;
        f.elements.query.value = q;
        f.requestSubmit();
      }, 60);
    }, true);
  })();
  </script>
</body>
</html>
`;

/* ---------------------------------------------------------------------------
 * Embed pass: turn the assembled page into ONE self-contained file that can be
 * emailed or dropped anywhere. Images and fonts become data URIs so nothing
 * depends on the surrounding folder.
 * ------------------------------------------------------------------------- */
import { readdir } from 'node:fs/promises';

const MIME = {
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.woff2': 'font/woff2',
};

/* Drop the <source> but KEEP the <picture> wrapper, pointing <img> at the WebP.
   Every browser we target takes the WebP, so embedding the PNG/JPEG fallback too
   would double the payload (the cartoon finale PNG alone is 4.7MB). The wrapper
   must stay: the classes live on <picture>, and rules like
   `.panorama img{width:100%;object-fit:cover}` stop matching if the class is
   moved onto the <img> — which left the hero art at its intrinsic 1536px. */
const flat = html.replace(
  /<picture([^>]*)>\s*<source srcset="([^"]+\.webp)"[^>]*>\s*<img([^>]*)>\s*<\/picture>/g,
  (_m, picAttrs, webp, imgAttrs) => {
    const src = imgAttrs.replace(/\ssrc="[^"]*"/, ` src="${webp}"`);
    return `<picture${picAttrs}><img${src}></picture>`;
  },
);

let embedded = flat;
let bytes = 0;

// 1. Every ./assets/... reference becomes a data URI — but stored ONCE.
//    Naively inlining per occurrence duplicated the pin sheets 4x each and cost
//    4.55MB, so JS references resolve through a shared lookup instead.
const assetRefs = [...new Set([...flat.matchAll(/\.\/(assets\/[A-Za-z0-9/._-]+)/g)].map((m) => m[1]))];
const uris = new Map();
for (const rel of assetRefs) {
  const ext = rel.slice(rel.lastIndexOf('.')).toLowerCase();
  const mime = MIME[ext];
  if (!mime) continue;
  let buf;
  try { buf = await readFile(rel); } catch { console.warn('  ! missing asset, left as a path:', rel); continue; }
  bytes += buf.length;
  uris.set(rel, `data:${mime};base64,${buf.toString('base64')}`);
}

// Split the document so JS string literals can use the lookup while HTML
// attributes (which cannot resolve a variable) keep literal data URIs.
const jsOpen = embedded.indexOf('<script>');
const jsClose = embedded.lastIndexOf('</script>');
let headHtml = embedded.slice(0, jsOpen);
let scripts = embedded.slice(jsOpen, jsClose);
let tailHtml = embedded.slice(jsClose);

// Only assets that JS actually references belong in the lookup — anything that
// lives solely in markup would otherwise be stored twice.
const jsUsed = [];
for (const rel of uris.keys()) {
  if (['"', "'", '`'].some((q) => scripts.includes(`${q}./${rel}${q}`))) jsUsed.push(rel);
}
jsUsed.forEach((rel, i) => {
  for (const q of ['"', "'", '`']) scripts = scripts.split(`${q}./${rel}${q}`).join(`__A[${i}]`);
});
const lookup = `const __A=[${jsUsed.map((k) => JSON.stringify(uris.get(k))).join(',')}];\n`;
scripts = scripts.replace('<script>', `<script>\n${lookup}`);

// Everything left over (markup attributes, CSS url()) takes a literal URI once.
for (const [rel, uri] of uris) {
  headHtml = headHtml.split(`./${rel}`).join(uri);
  scripts = scripts.split(`./${rel}`).join(uri);
  tailHtml = tailHtml.split(`./${rel}`).join(uri);
}
embedded = headHtml + scripts + tailHtml;

// 2. Google Fonts -> inlined @font-face with data URIs, so the file works offline.
try {
  const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Titan+One&display=swap';
  let fontCss = await (await fetch(cssUrl, { headers: { 'User-Agent': UA } })).text();
  // Google ships one @font-face per unicode-range, and several ranges reuse the
  // same woff2 — embedding them all repeated identical blobs 5x (0.88MB). This
  // demo is English, so keep only the Latin faces.
  const faces = fontCss.match(/@font-face\s*\{[^}]*\}/g) ?? [];
  const latin = faces.filter((f) => /unicode-range:[^;]*U\+0000-00FF/i.test(f));
  if (latin.length) fontCss = latin.join('\n');
  console.log(`  font faces: ${faces.length} -> ${latin.length || faces.length} (latin only)`);
  const urls = [...new Set([...fontCss.matchAll(/https:\/\/fonts\.gstatic\.com[^)]+\.woff2/g)].map((m) => m[0]))];
  for (const u of urls) {
    const b = Buffer.from(await (await fetch(u)).arrayBuffer());
    bytes += b.length;
    fontCss = fontCss.split(u).join(`data:font/woff2;base64,${b.toString('base64')}`);
  }
  // Drop the network <link>s and drop in the self-contained face definitions.
  embedded = embedded
    .replace(/<link rel="preconnect"[^>]*>/g, '')
    .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, `<style>\n${fontCss}\n  </style>`);
  console.log(`  fonts embedded: ${urls.length} files`);
} catch (err) {
  console.warn('  ! font embed skipped (offline?) — keeping the Google Fonts link:', err.message);
}

embedded = embedded.replace(/[ \t]+$/gm, '');
await writeFile('standalone.html', embedded);
console.log(`standalone.html — self-contained, ${(embedded.length / 1024 / 1024).toFixed(2)} MB (${assetRefs.length} assets inlined, ${(bytes / 1024 / 1024).toFixed(2)} MB raw)`);
