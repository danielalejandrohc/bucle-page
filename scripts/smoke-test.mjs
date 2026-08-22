#!/usr/bin/env node
/**
 * smoke-test.mjs — load index.html in jsdom and assert the page actually
 * builds itself: projects render, i18n swaps both ways, the mobile menu
 * toggles, and every image the cards emit resolves to a real file.
 *
 *   npm test
 *
 * This is not a substitute for looking at the site, but it catches the
 * class of breakage that silently ships on a static page: a renamed class,
 * a missing derivative, a translation key that resolves to undefined.
 */

import { JSDOM } from 'jsdom';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

let failures = 0;
const ok = (cond, label, detail = '') => {
  if (cond) console.log(`  ✓ ${label}`);
  else {
    console.error(`  ✗ ${label}${detail ? ` — ${detail}` : ''}`);
    failures++;
  }
};

const dom = new JSDOM(readFileSync(join(root, 'index.html'), 'utf8'), {
  url: pathToFileURL(join(root, 'index.html')).href,
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});

const { window } = dom;
const { document } = window;

// jsdom has no IntersectionObserver; the site uses it for reveal + header.
window.IntersectionObserver = class {
  constructor(cb) { this.cb = cb; }
  observe() {}
  unobserve() {}
  disconnect() {}
};
window.matchMedia = window.matchMedia || ((q) => ({
  matches: false, media: q, addEventListener() {}, removeEventListener() {},
  addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false,
}));

// Load the generated image manifest, then the site script, as the page does.
window.eval(readFileSync(join(root, 'assets/derived/manifest.js'), 'utf8'));
window.eval(readFileSync(join(root, 'script.js'), 'utf8'));
window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

console.log('\nRendering');
const cards = document.querySelectorAll('.project-card');
ok(cards.length === 5, `5 project cards rendered`, `got ${cards.length}`);
ok(
  document.querySelectorAll('[data-section="interior"] .project-card').length === 3,
  'interior section has 3 projects'
);
ok(
  document.querySelectorAll('.project-card .project-title').length === cards.length,
  'every card has a title'
);
ok(
  document.querySelectorAll('.project-media picture source[srcset]').length > 0,
  'cards emit <source srcset> from the manifest'
);

console.log('\nImages');
let badImg = 0;
const imgRefs = [];
document.querySelectorAll('.project-media img, .hero-media img').forEach((img) => imgRefs.push(img.getAttribute('src')));
document.querySelectorAll('.project-media source, .hero-media source').forEach((s) => {
  (s.getAttribute('srcset') || '').split(',').forEach((c) => {
    const url = c.trim().split(/\s+/)[0];
    if (url) imgRefs.push(url);
  });
});
for (const ref of imgRefs) {
  const p = join(root, ref.replace(/^\.\//, ''));
  if (!existsSync(p)) { console.error(`    missing: ${ref}`); badImg++; }
}
ok(badImg === 0, `all ${imgRefs.length} rendered image URLs exist on disk`, `${badImg} missing`);

console.log('\nTranslations');
const toggle = document.getElementById('lang-toggle');
ok(!!toggle, 'language toggle present');
ok(document.documentElement.lang === 'en', 'defaults to English');

const untranslated = () =>
  Array.from(document.querySelectorAll('[data-i18n]'))
    .filter((el) => !el.textContent.trim() || el.textContent.includes('undefined'))
    .map((el) => el.getAttribute('data-i18n'));

ok(untranslated().length === 0, 'no empty/undefined EN strings', untranslated().join(', '));

toggle.dispatchEvent(new window.Event('click', { bubbles: true }));
ok(document.documentElement.lang === 'es', 'toggles to Spanish');
ok(untranslated().length === 0, 'no empty/undefined ES strings', untranslated().join(', '));
ok(
  document.querySelector('#whatsapp-link').href.includes('50366894973'),
  'WhatsApp link carries the configured number'
);
ok(
  /Hola/.test(decodeURIComponent(document.querySelector('#whatsapp-link').href)),
  'WhatsApp message is localised to Spanish'
);

toggle.dispatchEvent(new window.Event('click', { bubbles: true }));
ok(document.documentElement.lang === 'en', 'toggles back to English');

console.log('\nNavigation');
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('primary-nav');
ok(navToggle.getAttribute('aria-expanded') === 'false', 'menu starts closed');
navToggle.dispatchEvent(new window.Event('click', { bubbles: true }));
ok(navToggle.getAttribute('aria-expanded') === 'true', 'menu opens');
ok(nav.classList.contains('is-open'), 'nav panel gets .is-open');
ok(document.body.classList.contains('is-locked'), 'body scroll locks while open');
nav.querySelector('a').dispatchEvent(new window.Event('click', { bubbles: true }));
ok(navToggle.getAttribute('aria-expanded') === 'false', 'menu closes when a link is followed');
ok(!document.body.classList.contains('is-locked'), 'body scroll unlocks');

console.log('\nDialog');
cards[0].dispatchEvent(new window.Event('click', { bubbles: true }));
const dlg = document.getElementById('project-info');
ok(dlg && dlg.classList.contains('is-open'), 'clicking a card opens the info dialog');
ok(document.getElementById('info-title').textContent.length > 0, 'dialog shows a title');
ok(document.getElementById('info-desc').textContent.length > 100, 'dialog shows the description');
window.document.dispatchEvent(
  new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
);
ok(!dlg.classList.contains('is-open'), 'Escape closes the dialog');

console.log('\nMetadata');
ok(!!document.querySelector('link[rel="canonical"]'), 'canonical link present');
ok(document.querySelectorAll('link[hreflang]').length === 3, 'hreflang alternates present');
ok(!!document.querySelector('link[rel="ai-catalog"]'), 'ai-catalog link present');
ok(!/Buble/.test(document.documentElement.outerHTML), 'no "Buble" typo anywhere');
ok(!/v1\.\d+\.\d+/.test(document.body.textContent), 'no version badge in the footer');

const jsonld = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
const biz = jsonld['@graph'].find((n) => [].concat(n['@type']).includes('LocalBusiness'));
ok(biz.telephone === '+50366894973', 'JSON-LD telephone is strict E.164', biz.telephone);

console.log(
  failures === 0 ? '\n✓ All smoke tests passed\n' : `\n✗ ${failures} check(s) failed\n`
);
process.exit(failures ? 1 : 0);
