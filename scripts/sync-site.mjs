#!/usr/bin/env node
/**
 * sync-site.mjs — propagate site.config.json into every file that mentions
 * a phone number, email address or social handle.
 *
 * site.config.json is the ONLY place these values are authored. Everything
 * else is generated. Run `npm run sync` after editing it.
 *
 * `npm run sync:check` verifies the tree is already in sync (exit 1 if not),
 * which is what you want in CI or a pre-commit hook.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

const cfg = JSON.parse(readFileSync(join(root, 'site.config.json'), 'utf8'));
const phoneE164 = cfg.contact.phoneE164;                 // +50366894973
const phoneDigits = phoneE164.replace(/[^\d]/g, '');     // 50366894973
const phoneDisplay = cfg.contact.phoneDisplay;           // +503 6689 4973
const email = cfg.contact.email;
const ig = `https://www.instagram.com/${cfg.brand.instagramHandle}/`;

if (!/^\+\d{8,15}$/.test(phoneE164)) {
  console.error(`✗ contact.phoneE164 must be E.164 (e.g. "+50366894973"), got "${phoneE164}"`);
  process.exit(1);
}

/** Every substitution is a regex that matches ANY stale value, not just the previous one. */
const rules = [
  // wa.me/<digits> and api.whatsapp.com/send?phone=<digits>
  [/wa\.me\/\d{8,15}/g, `wa.me/${phoneDigits}`],
  [/(api\.whatsapp\.com\/send\?phone=)\d{8,15}/g, `$1${phoneDigits}`],
  // Human-readable "+503 6689 4973" in prose and link text.
  // A separator after the country code is REQUIRED so this does not also
  // match bare E.164 — see the ordering note below.
  [/\+503[\s-]\d{4}[\s-]?\d{4}/g, phoneDisplay],

  // tel: links and E.164 in JSON-LD / JSON.
  // These run AFTER the display rule and accept spaces and dashes, so a
  // machine-readable field that was previously rewritten into display form
  // is pulled back to strict E.164 rather than left broken.
  [/tel:\+?[\d\s-]{8,20}/g, `tel:${phoneE164}`],
  [/("telephone"\s*:\s*")\+?[\d\s-]{8,20}(")/g, `$1${phoneE164}$2`],
  // Email + Instagram
  [/[a-z0-9._%+-]+@bucle\.studio/gi, email],
  [/https:\/\/www\.instagram\.com\/[A-Za-z0-9._]+\/?/g, ig],
];

const targets = [
  'index.html',
  'script.js',
  'llms.txt',
  'index.md',
  'README.md',
  '.well-known/ai-catalog.json',
];

let changed = 0;
let stale = [];

for (const file of targets) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  const before = readFileSync(path, 'utf8');
  const after = rules.reduce((s, [re, to]) => s.replace(re, to), before);
  if (before === after) continue;
  changed++;
  stale.push(relative(root, path).split(sep).join('/'));
  if (!check) writeFileSync(path, after);
}

if (check) {
  if (stale.length) {
    console.error('✗ Out of sync with site.config.json:\n  ' + stale.join('\n  '));
    console.error('\n  Run: npm run sync');
    process.exit(1);
  }
  console.log('✓ All files match site.config.json');
} else {
  console.log(changed ? `✓ Synced ${changed} file(s):\n  ${stale.join('\n  ')}` : '✓ Already in sync');
  console.log(`  phone  ${phoneDisplay}  (wa.me/${phoneDigits})`);
  console.log(`  email  ${email}`);
}
