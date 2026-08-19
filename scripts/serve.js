#!/usr/bin/env node
/**
 * Local preview server. Run: node scripts/serve.js [port]
 *
 * This exists because a plain static file server gets the routing wrong. The
 * deployed site runs behind Firebase Hosting with cleanUrls:true and
 * trailingSlash:false, so /services/dermatology is a real URL and
 * /services/dermatology.html is not — it redirects. A naive server does the
 * opposite, which means every internal link 404s locally and the 404 page
 * itself never renders. This mirrors the hosting rules instead:
 *
 *   /path        -> path.html, else path/index.html
 *   /path.html   -> 301 to /path
 *   /path/       -> 301 to /path
 *   anything else-> 404.html with a real 404 status
 *
 * It also applies the same ignore list as firebase.json, so a file that would
 * not be published is not reachable here either.
 *
 * Node stdlib only, no dependencies.
 */

'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const ROOT = path.dirname(__dirname);
const PORT = Number(process.argv[2]) || 8899;
const HOST = '127.0.0.1';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

// Reuse the deploy ignore list so local and published surfaces match.
const fb = JSON.parse(fs.readFileSync(path.join(ROOT, 'firebase.json'), 'utf8'));
function globToRe(g) {
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
}
const ignoreRes = (fb.hosting.ignore || []).map(globToRe);
const ignored = (f) => ignoreRes.some((re) => re.test(f));

/** Resolve a repo-relative path safely — never escape ROOT. */
function resolve(relPath) {
  const full = path.resolve(ROOT, relPath);
  if (full !== ROOT && !full.startsWith(ROOT + path.sep)) return null;
  if (!fs.existsSync(full) || !fs.statSync(full).isFile()) return null;
  return full;
}

function send(res, status, body, type, extra) {
  res.writeHead(status, Object.assign({
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(body),
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store',
  }, extra || {}));
  res.end(body);
}

function serveFile(res, full, status) {
  const body = fs.readFileSync(full);
  const type = TYPES[path.extname(full).toLowerCase()] || 'application/octet-stream';
  send(res, status || 200, body, type);
}

function notFound(res, url) {
  const f = resolve('404.html');
  if (f) return serveFile(res, f, 404);
  send(res, 404, `404 Not Found: ${url}\n`, 'text/plain; charset=utf-8');
}

const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, `http://${HOST}`).pathname); }
  catch { return send(res, 400, 'Bad request\n', 'text/plain; charset=utf-8'); }

  const redirect = (to) => send(res, 301, '', 'text/plain; charset=utf-8', { Location: to });

  // trailingSlash:false — /services/ is not the URL, /services is.
  if (pathname.length > 1 && pathname.endsWith('/')) return redirect(pathname.replace(/\/+$/, ''));
  // cleanUrls — .html is never the public URL.
  if (pathname.endsWith('.html')) {
    const clean = pathname === '/index.html' ? '/' : pathname.slice(0, -'.html'.length);
    return redirect(clean);
  }

  const relPath = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (relPath !== 'index.html' && ignored(relPath)) return notFound(res, pathname);

  // A real asset (has an extension) is served as-is.
  if (path.extname(relPath)) {
    const f = resolve(relPath);
    return f ? serveFile(res, f) : notFound(res, pathname);
  }

  // Otherwise it is a page route: foo.html, then foo/index.html.
  for (const cand of [relPath + '.html', path.posix.join(relPath, 'index.html'), relPath]) {
    if (ignored(cand)) continue;
    const f = resolve(cand);
    if (f) return serveFile(res, f);
  }
  notFound(res, pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`Varniqa site on http://${HOST}:${PORT}`);
  console.log('cleanUrls and trailingSlash match firebase.json. Ctrl+C to stop.');
});
