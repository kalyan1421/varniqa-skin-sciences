#!/usr/bin/env node
/**
 * Pre-deploy SEO/AEO check for the whole site. Run: node scripts/check-seo.js
 *
 * Catches the failures that are invisible in a browser and silently cost rich
 * results or trust:
 *
 *   * FAQ markup that has drifted from the visible copy, on any page
 *   * <title> disagreeing with the JSON-LD graph, or running past ~65 chars
 *   * the visible review figures drifting from aggregateRating
 *   * speakable selectors pointing at classes that no longer exist
 *   * referenced images or self-hosted fonts that 404
 *   * internal links and in-page anchors pointing at nothing
 *   * the sitemap and the built pages disagreeing about what exists
 *   * the shared chrome (nav, footer NAP, sticky bar) drifting between pages
 *   * files that would be published, or withheld, by mistake on deploy
 *
 * That chrome check matters because this site has no build step: the header
 * and footer are physically duplicated in every page, so nothing but this
 * check stops them diverging.
 *
 * Node stdlib only, no dependencies, no test framework. The exit code is what
 * CI would read: 0 clean, 1 if anything failed.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// The site is the repo root; this script lives one level down in scripts/.
const ROOT = path.dirname(__dirname);
const SITE = 'https://varniqaclinic.com';

const failures = [];
const warnings = [];
const fail = (m) => failures.push(m);
const warn = (m) => warnings.push(m);

// ---------------------------------------------------------------- helpers --
// Named entities are written as escapes, not literal glyphs: this file gets
// opened by editors and shells whose default codepage is not UTF-8, and a
// mangled table would silently report drift that is not there.
const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  mdash: '—', ndash: '–', hellip: '…', deg: '°',
  times: '×', rsquo: '’', lsquo: '‘',
  ldquo: '“', rdquo: '”', eacute: 'é', uuml: 'ü',
};
function unescapeHtml(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z][a-z0-9]*);/gi, (m, g) => {
    if (g[0] === '#') {
      const cp = g[1] === 'x' || g[1] === 'X'
        ? parseInt(g.slice(2), 16)
        : parseInt(g.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : m;
    }
    const v = ENTITIES[g.toLowerCase()];
    return v === undefined ? m : v;
  });
}
// Strip tags, unescape entities, collapse whitespace. Tags are removed rather
// than replaced with a space, so "<b>a</b>b" normalises to "ab" — replacing
// them would insert a space that the JSON-LD answer string does not have, and
// every FAQ containing inline markup would report false drift.
const stripTags = (s) => String(s).replace(/<[^>]+>/g, '');
const norm = (s) => unescapeHtml(stripTags(s)).replace(/\s+/g, ' ').trim();

const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const first = (src, re) => { const m = src.match(re); return m ? m[1] : null; };
const all = (src, re) => [...src.matchAll(re)].map((m) => m[1]);

/** Read a <meta> content value by name= or property=. The attributes wrap
 *  across source lines in these pages, so this cannot be a one-line regex. */
function meta(src, key) {
  for (const tag of src.match(/<meta\b[^>]*>/g) || []) {
    const k = tag.match(/\s(?:name|property)="([^"]+)"/);
    if (!k || k[1].toLowerCase() !== key.toLowerCase()) continue;
    const c = tag.match(/\scontent="([^"]*)"/);
    if (c) return c[1];
  }
  return null;
}

/** Map a source file to the URL Firebase serves it at (cleanUrls, no slash). */
function pageUrl(p) {
  if (p === 'index.html') return SITE + '/';
  if (p.endsWith('/index.html')) return SITE + '/' + p.slice(0, -'/index.html'.length);
  return SITE + '/' + p.slice(0, -'.html'.length);
}
/** Inverse of pageUrl, for checking internal links resolve. */
function urlToFile(url) {
  let p = url.split('#')[0].split('?')[0];
  if (p.startsWith(SITE)) p = p.slice(SITE.length);
  if (!p.startsWith('/')) return null;
  p = p.replace(/\/+$/, '');
  if (p === '') return 'index.html';
  const bare = p.slice(1);
  if (exists(bare + '.html')) return bare + '.html';
  if (exists(bare + '/index.html')) return bare + '/index.html';
  if (exists(bare)) return bare;
  return null;
}

function discover() {
  const pages = ['index.html'];
  if (exists('contact.html')) pages.push('contact.html');
  if (exists('gallery.html')) pages.push('gallery.html');
  for (const d of ['services', 'blog', 'conditions']) {
    const full = path.join(ROOT, d);
    if (!fs.existsSync(full) || !fs.statSync(full).isDirectory()) continue;
    for (const name of fs.readdirSync(full).sort()) {
      if (name.endsWith('.html')) pages.push(`${d}/${name}`);
    }
  }
  return pages;
}

/** Every JSON-LD node on the page, flattened out of @graph. */
function graphOf(src, p) {
  const blocks = [...src.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (!blocks.length) { fail(`${p}: no JSON-LD block`); return []; }
  const nodes = [];
  for (const b of blocks) {
    let data;
    try { data = JSON.parse(b[1]); }
    catch (e) { fail(`${p}: JSON-LD does not parse (${e.message})`); continue; }
    for (const n of (data['@graph'] || [data])) nodes.push(n);
  }
  return nodes;
}
const byId = (graph, suffix) =>
  graph.find((n) => String(n['@id'] || '').endsWith(suffix)) || null;
const byType = (graph, t) =>
  graph.find((n) => n['@type'] === t || (Array.isArray(n['@type']) && n['@type'].includes(t))) || null;

// ------------------------------------------------------------- page checks --
/** Both shapes count as visible: <div class="faq-item"> and the <details>
 *  disclosures whose question sits inside <summary>. */
function checkFaqs(src, p, graph) {
  const visible = new Map();
  const re = /<(?:div|details) class="faq-item">\s*(?:<summary>\s*)?<h3>([\s\S]*?)<\/h3>\s*(?:<\/summary>\s*)?<p>([\s\S]*?)<\/p>/g;
  for (const m of src.matchAll(re)) visible.set(norm(m[1]), norm(m[2]));

  const faqNode = byType(graph, 'FAQPage');
  const marked = new Map();
  if (faqNode) {
    for (const e of (faqNode.mainEntity || [])) {
      marked.set(norm(e.name || ''), norm((e.acceptedAnswer || {}).text || ''));
    }
  }
  for (const [q, answer] of marked) {
    if (!visible.has(q)) fail(`${p}: FAQ question in markup but not on the page: "${q}"`);
    else if (visible.get(q) !== answer) fail(`${p}: FAQ answer drifted from visible copy: "${q}"`);
  }
  for (const q of visible.keys()) {
    if (!marked.has(q)) fail(`${p}: FAQ question on the page but not in markup: "${q}"`);
  }
  return marked.size;
}

function checkTitle(src, p, graph) {
  const raw = first(src, /<title>([\s\S]*?)<\/title>/i);
  if (raw === null) { fail(`${p}: no <title>`); return; }
  const title = norm(raw);
  if (title.length > 65) fail(`${p}: <title> is ${title.length} chars; Google truncates past ~65`);

  const webpage = byId(graph, '#webpage');
  if (webpage) {
    if (webpage.name !== title) fail(`${p}: <title> "${title}" != schema name "${webpage.name}"`);
  } else {
    // Article pages carry a headline matching the H1 instead.
    const art = byId(graph, '#article');
    const h1 = first(src, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (art && h1 && norm(h1) !== art.headline) fail(`${p}: <h1> != schema headline`);
  }
}

function checkCanonical(src, p) {
  const href = first(src, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  if (!href) { fail(`${p}: no canonical`); return; }
  const expected = pageUrl(p);
  if (href !== expected) fail(`${p}: canonical ${href} != expected ${expected}`);
  const og = meta(src, 'og:url');
  if (og && og !== expected) fail(`${p}: og:url ${og} != expected ${expected}`);
}

function checkAssets(src, p, css) {
  for (const img of new Set(all(src, /(?:src|href)="\/?(images\/[^"]+)"/g))) {
    if (!exists(img)) fail(`${p}: missing image: ${img}`);
  }
  // srcset carries the responsive variants, which are easy to forget to ship.
  for (const set of all(src, /srcset="([^"]+)"/g)) {
    for (const part of set.split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (!u || !/^\/?images\//.test(u)) continue;
      if (!exists(u.replace(/^\//, ''))) fail(`${p}: missing srcset image: ${u}`);
    }
  }
  for (const font of new Set(all(src, /href="\/?(fonts\/[^"]+)"/g))) {
    if (!exists(font)) fail(`${p}: preloaded font missing: ${font}`);
    else if (!css.includes(font)) fail(`${p}: font preloaded but never used in CSS: ${font}`);
  }
}

function checkIconRefs(src, p) {
  const syms = new Set(all(src, /<symbol id="([^"]+)"/g));
  const uses = new Set(all(src, /<use href="#([^"]+)"/g));
  for (const u of [...uses].sort()) {
    if (!syms.has(u)) fail(`${p}: <use> references undefined icon #${u}`);
  }
}

function checkInternalLinks(src, p) {
  for (const href of new Set(all(src, /href="(\/[^"#][^"]*)"/g))) {
    if (href.startsWith('//')) continue;
    if (/^\/(images|fonts|css|js|favicon)/.test(href)) continue;
    if (urlToFile(href) === null) fail(`${p}: internal link goes nowhere: ${href}`);
  }
}

/** In-page and cross-page #fragments must land on a real id. */
function checkAnchors(src, p, idsByPage) {
  const ids = idsByPage.get(p);
  for (const href of new Set(all(src, /href="(#[^"]+|\/[^"]*#[^"]+)"/g))) {
    const [target, frag] = href.split('#');
    if (!frag) continue;
    if (target === '') { // same page
      if (!ids.has(frag)) fail(`${p}: anchor #${frag} matches no id on the page`);
      continue;
    }
    const file = urlToFile(target);
    if (file && idsByPage.has(file) && !idsByPage.get(file).has(frag)) {
      fail(`${p}: ${target}#${frag}: no id "${frag}" on ${file}`);
    }
  }
}

// ------------------------------------------------------------------- main --
function main() {
  const css = read('css/style.css');
  const pages = discover();
  const sources = {};
  const idsByPage = new Map();
  let totalFaqs = 0;

  for (const p of pages) {
    const src = read(p);
    sources[p] = src;
    const ids = new Set(all(src, /\sid="([^"]+)"/g));
    for (const n of all(src, /<symbol id="([^"]+)"/g)) ids.add(n);
    idsByPage.set(p, ids);
  }

  for (const p of pages) {
    const src = sources[p];
    const graph = graphOf(src, p);
    totalFaqs += checkFaqs(src, p, graph);
    checkTitle(src, p, graph);
    checkCanonical(src, p);
    checkAssets(src, p, css);
    checkIconRefs(src, p);
    checkInternalLinks(src, p);
    checkAnchors(src, p, idsByPage);

    const desc = meta(src, 'description');
    if (!desc) fail(`${p}: no meta description`);
    else if (desc.length > 160) warn(`${p}: meta description is ${desc.length} chars; truncates past ~160`);
    if (!/<html[^>]*\slang="/.test(src)) fail(`${p}: <html> has no lang attribute`);
    if (!/<meta name="viewport"/.test(src)) fail(`${p}: no viewport meta`);
    const h1s = (src.match(/<h1[\s>]/gi) || []).length;
    if (h1s === 0) fail(`${p}: no <h1>`);
    else if (h1s > 1) warn(`${p}: ${h1s} <h1> elements`);
    for (const tag of src.match(/<img\b[^>]*>/gi) || []) {
      if (!/\salt=/i.test(tag)) fail(`${p}: <img> without alt: ${tag.slice(0, 80)}`);
    }
    const seen = new Set();
    for (const id of all(src, /\sid="([^"]+)"/g)) {
      if (seen.has(id)) fail(`${p}: duplicate id "${id}"`);
      seen.add(id);
    }
  }

  // --- shared chrome must not drift between hand-maintained copies ---------
  // Compare chrome with its tags and hrefs intact — norm() would strip them
  // and reduce this to a visible-text check, which would miss a page whose
  // nav pointed somewhere else entirely. Two variations are legitimate and
  // normalised away: the active-page marker, and the concern pre-filled into
  // the sticky bar's WhatsApp link, which is per-page by design.
  const block = (src, pattern) => {
    const m = src.match(pattern);
    if (!m) return null;
    return m[1]
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\s*aria-current="page"/g, '')
      .replace(/(wa\.me\/\d+\?text=)[^"]*/g, '$1');
  };
  // Anchored on the block's own closing tag at its own indent, never on
  // whatever happens to follow it — index.html carries a long comment between
  // the sticky bar and the script that the other pages do not.
  const CHROME = {
    'footer NAP': /<p class="footer-nap">([\s\S]*?)<\/p>/,
    'nav links': /<ul class="nav-links" id="nav-links">([\s\S]*?)<\/ul>/,
    'footer nav': /<nav class="footer-nav" aria-label="Footer">([\s\S]*?)<\/nav>/,
    'sticky bar': /<div class="mobile-cta"[^>]*>([\s\S]*?)\n {4}<\/div>/,
    'script tag': /(<script src=[^>]*js\/script\.js[^>]*>)/,
  };
  for (const [label, pattern] of Object.entries(CHROME)) {
    const seen = new Map();
    for (const p of pages) {
      const b = block(sources[p], pattern);
      if (b === null) { fail(`${p}: shared chrome missing: ${label}`); continue; }
      if (!seen.has(b)) seen.set(b, []);
      seen.get(b).push(p);
    }
    if (seen.size > 1) {
      const groups = [...seen.values()].map((v) => v.join(',')).join(' | ');
      fail(`shared chrome '${label}' differs between pages: ${groups}`);
    }
  }

  // --- the visible rating must equal the schema's -------------------------
  const home = sources['index.html'];
  const graph = graphOf(home, 'index.html');
  const clinic = byType(graph, 'MedicalClinic') || {};
  const agg = clinic.aggregateRating;
  const shownRating = first(home, /class="review-proof-rating">([\s\S]*?)</);
  const shownCount = first(home, /class="review-proof-count">([\s\S]*?)</);

  if (agg && !(shownRating && shownCount)) {
    fail('aggregateRating is in the schema but not visible on the page');
  } else if (agg) {
    if (norm(shownRating) !== String(agg.ratingValue)) {
      fail(`visible rating != schema ratingValue "${agg.ratingValue}"`);
    }
    if (norm(shownCount) !== String(agg.reviewCount)) {
      fail(`visible review count != schema reviewCount "${agg.reviewCount}"`);
    }
  } else if (shownRating || shownCount) {
    fail('a rating is shown on the page but there is no aggregateRating');
  }

  // --- speakable selectors must resolve -----------------------------------
  const webpage = byId(graph, '#webpage') || {};
  const speakable = (webpage.speakable || {}).cssSelector || [];
  for (const sel of speakable) {
    const cls = sel.replace(/^\./, '');
    const re = new RegExp(`class="[^"]*\\b${cls.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
    if (!re.test(home)) fail(`speakable selector "${sel}" matches no element`);
  }

  // --- @font-face sources must exist --------------------------------------
  for (const url of new Set(all(css, /url\('\.\.\/(fonts\/[^']+)'\)/g))) {
    if (!exists(url)) fail(`@font-face source missing: ${url}`);
  }

  // --- freshness + sitemap coverage ---------------------------------------
  const footerDate = first(home, /Last updated <time datetime="([\d-]+)"/);
  if (!footerDate) fail('index.html: no "Last updated" date in the footer');
  else if (footerDate !== webpage.dateModified) {
    fail(`footer date ${footerDate} != schema dateModified ${webpage.dateModified}`);
  }

  const sitemap = read('sitemap.xml');
  const listed = new Set(all(sitemap, /<loc>([^<]+)<\/loc>/g));

  // A noindex page in the sitemap is a contradictory instruction: the file
  // asks Google to crawl it, the tag asks Google to drop it. Draft articles
  // are the case that produces this, so it is checked rather than trusted.
  const noindex = new Set(pages
    .filter((p) => /<meta name="robots"[^>]*content="[^"]*noindex/.test(sources[p]))
    .map(pageUrl));
  const built = new Set(pages.map(pageUrl).filter((u) => !noindex.has(u)));

  for (const missing of [...built].filter((u) => !listed.has(u)).sort()) {
    fail(`page not in sitemap: ${missing}`);
  }
  for (const extra of [...listed].filter((u) => !built.has(u)).sort()) {
    if (noindex.has(extra)) fail(`noindex page must not be in the sitemap: ${extra}`);
    else fail(`sitemap lists a URL with no page: ${extra}`);
  }
  for (const d of all(sitemap, /<lastmod>([^<]+)<\/lastmod>/g)) {
    if (!/^\d{4}-\d{2}-\d{2}/.test(d.trim())) fail(`sitemap.xml: bad lastmod "${d}"`);
  }

  // --- robots.txt ---------------------------------------------------------
  if (!exists('robots.txt')) fail('robots.txt is missing');
  else {
    const rb = read('robots.txt');
    const sm = rb.match(/Sitemap:\s*(\S+)/i);
    if (!sm) fail('robots.txt has no Sitemap: directive');
    else if (sm[1] !== `${SITE}/sitemap.xml`) fail(`robots.txt Sitemap points at ${sm[1]}`);
    if (/^\s*Disallow:\s*\/\s*$/mi.test(rb)) fail('robots.txt has "Disallow: /" — would deindex the site');
  }

  // --- llms.txt must not cite pages that do not exist ---------------------
  if (exists('llms.txt')) {
    const t = read('llms.txt');
    const re = new RegExp(SITE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^\\s)\\]]*)', 'g');
    for (const m of t.matchAll(re)) {
      const u = (SITE + m[1]).replace(/[.,;]$/, '');
      if (/\.(png|jpe?g|webp|svg|ico|css|js|xml|txt|woff2?)$/i.test(u)) {
        if (!exists(u.slice(SITE.length + 1))) fail(`llms.txt: missing file ${u}`);
      } else if (urlToFile(u) === null) fail(`llms.txt: unknown route ${u}`);
    }
  }

  // --- what would actually be published -----------------------------------
  const fb = JSON.parse(read('firebase.json'));
  const globToRe = (g) => {
    let out = '';
    for (let i = 0; i < g.length; i++) {
      const c = g[i];
      if (c === '*') {
        if (g[i + 1] === '*') {
          if (g[i + 2] === '/') { out += '(?:.*/)?'; i += 2; } else { out += '.*'; i += 1; }
        } else out += '[^/]*';
      } else if (c === '?') out += '[^/]';
      else if ('.+^${}()|[]\\'.indexOf(c) !== -1) out += '\\' + c;
      else out += c;
    }
    return new RegExp('^' + out + '$');
  };
  const ignoreRes = (fb.hosting.ignore || []).map(globToRe);
  const ignored = (f) => ignoreRes.some((re) => re.test(f));
  const walk = (dir, acc = []) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name === '.git' || e.name === '.firebase' || e.name === 'node_modules') continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full, acc); else acc.push(rel(full));
    }
    return acc;
  };
  const shipping = walk(ROOT).filter((f) => !ignored(f));
  for (const f of shipping) {
    // Build artefacts and tool droppings are the ones that slip out: a stray
    // firebase-debug.log at the repo root is published like any other file.
    if (/\.(md|py|docx|log|patch|bak|orig|zip|sql|env)$/i.test(f)
        || /^(docs|scripts)\//.test(f) || /(^|\/)\.env/.test(f)) {
      fail(`${f} would be deployed but should not be — check firebase.json "ignore"`);
    }
  }
  for (const p of pages) {
    if (ignored(p)) fail(`${p} is a real page but firebase.json excludes it from deploys`);
  }

  // ------------------------------------------------------------- report ---
  for (const f of failures) console.log('FAIL ' + f);
  for (const w of warnings) console.log('WARN ' + w);
  console.log(
    `\n${pages.length} pages, ${totalFaqs} FAQ entries, ${shipping.length} files to publish` +
    ` — ${failures.length || 'no'} problem(s)` +
    (warnings.length ? `, ${warnings.length} warning(s)` : ''));
  return failures.length ? 1 : 0;
}

process.exit(main());
