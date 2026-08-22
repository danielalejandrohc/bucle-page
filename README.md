# Bucle Studio — bucle.studio

The website for Bucle Studio, a residential architecture and interior design
practice in San Salvador, El Salvador. One page, two languages (EN/ES),
vanilla HTML/CSS/JS, deployed from this repo's root to GitHub Pages.

---

## The one rule

**Never type a phone number, email address, or Instagram URL into a file.**

They live in exactly one place — [`site.config.json`](site.config.json) — and
are stamped into every consumer (`index.html`, `script.js`, `llms.txt`,
`index.md`, `README.md`, `.well-known/ai-catalog.json`) by:

```bash
npm run sync
```

`npm run sync:check` verifies the tree is in sync and exits non-zero if it
isn't — use it in CI or a pre-commit hook. This exists because the phone
number was once updated in `script.js` only, leaving a dead number in the
structured data, the pre-JS `href`, and `llms.txt` for months.

---

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local server at http://localhost:5173 |
| `npm test` | jsdom smoke test — rendering, i18n, menu, dialog, image paths |
| `npm run sync` | Stamp `site.config.json` into every file |
| `npm run sync:check` | Verify sync without writing (CI-friendly) |
| `npm run images` | Generate responsive WebP derivatives (incremental) |
| `npm run images:force` | Rebuild every derivative from scratch |
| `npm run markdown` | Regenerate `index.md` from `script.js` |
| `npm run build` | `images` → `markdown` → `sync` |

Run `npm install` once first. `sharp` and `jsdom` are build-time only —
GitHub Pages serves the static files and never sees them.

---

## Editing content

### Projects

All project data is the `projects` object at the top of
[`script.js`](script.js). Each entry:

```js
{
  title: { en: 'LOMAS 500', es: 'LOMAS 500' },
  meta: {
    location: { en: 'San Salvador', es: 'San Salvador' },
    year: '2024',                      // optional
    type:  { en: 'Apartment', es: 'Apartamento' },
    area:  '120 m²',                   // optional
    credit: 'Faby Salmerón',           // photographer, optional
  },
  description: { en: '…', es: '…' },   // \n\n between paragraphs
  preview_image: './assets/projects/…',
  images: ['./assets/projects/…'],
}
```

Every `meta` field is optional — anything empty is simply not rendered, so
they can be filled in over time.

> **Open TODO:** `year` and `area` are blank on all four projects. Real
> values there make the portfolio read as a working practice rather than a
> gallery — it's the highest-value content edit left.

After adding or changing images:

```bash
npm run build
```

### Copy

UI strings are the `translations` object in [`script.js`](script.js), keyed
by the `data-i18n` attributes in `index.html`. **Both `en` and `es` must be
present** — `npm test` fails if any rendered string is empty or `undefined`.

The English text in `index.html` is the pre-JS fallback and what a crawler
without JavaScript sees. Keep it in step with `translations.en`.

---

## Images

Originals in `assets/` are the archive and are never modified.
`npm run images` reads every image referenced by `script.js`/`index.html` and
writes WebP derivatives to `assets/derived/`, plus `manifest.js` mapping each
original to its available widths. The front-end builds `<picture>`/`srcset`
from that manifest, and falls back to the original if the manifest is absent.

Widths: 480 / 960 / 1440 / 2000, plus the source's own width when it sits
meaningfully above those rungs.

`assets/derived/` **is committed** — GitHub Pages has no build step.

For scale: the largest original (`otaku/fabysalmeronphoto-0020.jpg`) is
6.0 MB. A phone now loads its 480px derivative at 32 KB.

---

## Agent readiness

The site is tuned for https://isitagentready.com. Everything achievable from
a static repo is done:

| Check | Status | Where |
| --- | --- | --- |
| robots.txt | ✅ | [`robots.txt`](robots.txt) |
| sitemap | ✅ | [`sitemap.xml`](sitemap.xml) |
| AI bot rules | ✅ | `robots.txt` — named allows for GPTBot, ClaudeBot, PerplexityBot, Applebot, etc. |
| Content Signals | ✅ | `robots.txt` — `search=yes, ai-input=yes, ai-train=yes` |
| ARD capability manifest | ✅ | [`.well-known/ai-catalog.json`](.well-known/ai-catalog.json) + `Agentmap:` in robots.txt + `<link rel="ai-catalog">` |
| Structured data | ✅ | JSON-LD `LocalBusiness`/`ProfessionalService` in `index.html` |
| Markdown surfaces | ✅ | [`llms.txt`](llms.txt) (index) and [`index.md`](index.md) (full content, generated) |
| Link headers | ⛔ | Needs response headers — see below |
| Markdown content negotiation | ⛔ | Needs server-side `Accept` handling — see below |
| DNS-AID | ⛔ | Needs DNS records — see below |
| MCP / A2A / OAuth / API catalog | n/a | The studio publishes no API or agent; a stub would be dishonest |

> **Decision to review:** `ai-train=yes` in `robots.txt` permits AI training
> on the site's content, matching the previously published allows for CCBot
> and Google-Extended. For a practice whose portfolio photography is its
> product, `ai-train=no` is a defensible alternative — it keeps search and
> citation while excluding training. It's a one-word change on line 10.

### Remaining checks (need Cloudflare / DNS access)

`bucle.studio` is proxied through Cloudflare, so the three ⛔ rows above are
reachable without leaving GitHub Pages.

**Link headers** — Cloudflare → Rules → Transform Rules → Modify Response
Header. On `hostname eq "bucle.studio"`, set:

```
Link: </llms.txt>; rel="alternate"; type="text/markdown", </.well-known/ai-catalog.json>; rel="ai-catalog"
```

**Markdown content negotiation** — a Cloudflare Worker on `bucle.studio/*`:

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = request.headers.get('Accept') || '';
    if (url.pathname === '/' && /text\/markdown/.test(accept)) {
      const md = await env.ASSETS.fetch(new URL('/index.md', url));
      return new Response(md.body, {
        headers: { 'content-type': 'text/markdown; charset=utf-8' },
      });
    }
    return fetch(request);
  },
};
```

**DNS-AID** — only meaningful once the studio actually exposes an agent or
MCP endpoint. The scanner probes `_index._agents.bucle.studio` (SVCB/HTTPS/
TXT) and `_catalog._agents.bucle.studio` (TXT). A TXT record on
`_catalog._agents` pointing at the ai-catalog URL is the cheapest legitimate
step; skip the rest until there is a real endpoint to announce.

Re-scan after deploying:

```bash
curl -s -X POST https://isitagentready.com/api/scan \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://bucle.studio"}'
```

---

## Structure

```
index.html                    Markup, meta, JSON-LD (EN text = no-JS fallback)
styles.css                    Design system + all styling
script.js                     Project data, translations, rendering, behaviour
site.config.json              ← contact details live HERE and nowhere else
index.md                      Generated Markdown mirror of the page
llms.txt                      Hand-written agent-facing summary
robots.txt  sitemap.xml       Crawler directives
.well-known/ai-catalog.json   ARD capability manifest
assets/                       Original images (the archive)
assets/derived/               Generated WebP derivatives + manifest.js
scripts/
  sync-site.mjs               site.config.json → everywhere
  optimize-images.mjs         WebP derivative generation
  build-markdown.mjs          script.js → index.md
  smoke-test.mjs              jsdom test suite
```

---

## Deploying

GitHub Pages serves `main` at the repo root; `CNAME` points it at
`bucle.studio`. Before pushing:

```bash
npm run build && npm test
```

then commit — including anything new under `assets/derived/`.
