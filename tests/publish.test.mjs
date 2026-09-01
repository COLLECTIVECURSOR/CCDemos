import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicBase = 'https://collectivecursor.github.io/CCDemos/pinpics/';
const pages = [
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

test('the CCDemos hub links to the published PinPics experience', async () => {
  const html = await readFile(resolve(root, 'index.html'), 'utf8');
  assert.match(html, /href="\.\/pinpics\/"/);
  assert.match(html, /PinPics Modernization Concept/);
});

test('the PinPics publication includes every approved page and runtime asset', async () => {
  await access(resolve(root, '.nojekyll'));
  await Promise.all([
    ...pages.map((page) => access(resolve(root, 'pinpics', page))),
    access(resolve(root, 'pinpics', 'styles.css')),
    access(resolve(root, 'pinpics', 'app.mjs')),
    access(resolve(root, 'pinpics', 'standalone.html')),
  ]);
});

test('published metadata uses the real GitHub Pages origin and no placeholder domain', async () => {
  for (const page of pages) {
    const html = await readFile(resolve(root, 'pinpics', page), 'utf8');
    assert.doesNotMatch(html, /pinpics-demo\.example/, `${page} still uses the placeholder domain`);
    assert.match(html, new RegExp(`(?:canonical|og:url)[^>]+${publicBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
  }
});

test('all relative image, script, and stylesheet references resolve inside the publication', async () => {
  for (const page of pages) {
    const html = await readFile(resolve(root, 'pinpics', page), 'utf8');
    const references = [
      ...html.matchAll(/(?:src|href|srcset)="(\.\/[^"]+)"/g),
    ].map((match) => match[1].split(/[?#\s]/)[0]);

    for (const reference of references) {
      await access(resolve(root, 'pinpics', reference), undefined).catch(() => {
        assert.fail(`${page} references missing file ${reference}`);
      });
    }
  }
});
