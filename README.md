# Varniqa Skin Sciences — varniqaclinic.com

Static marketing site for the clinic. No build step: every page is hand-written
HTML that shares one stylesheet and one script. The repo root **is** the web
root, so anything committed at the top level is publicly served unless
`firebase.json` ignores it.

## Layout

```
/                       web root — served as-is
├── index.html          home
├── contact.html        contact / booking
├── 404.html
├── blog/               article index + posts
├── services/           service index + one page per service
├── css/style.css       the whole stylesheet
├── js/script.js        the whole script
├── images/             webp/svg assets (with -640 variants for srcset)
├── fonts/              self-hosted woff2 (see fonts/README.md)
├── robots.txt · sitemap.xml · llms.txt · favicon.ico · CNAME
│
├── docs/               internal — never deployed
│   ├── audit/          pre-redesign audit of the live site + screenshots
│   └── proposals/      client-facing deliverables
├── scripts/            dev tooling — never deployed
└── PRODUCT.md          product brief
```

`docs/`, `scripts/`, and all `.md`/`.py`/`.docx` files are excluded from
deploys via the `ignore` list in `firebase.json`. Keep that list in sync when
adding a new non-public directory.

## Working on it

Serve locally on <http://127.0.0.1:8899>:

```
node scripts/serve.js
```

Or, for byte-identical production behaviour including the response headers:

```
firebase emulators:start --only hosting
```

**Do not preview this site with VS Code Live Server, `file://`, or any other
plain static server.** `firebase.json` sets `cleanUrls: true`, so the public
URL of `services/dermatology.html` is `/services/dermatology` and every link
in the site is written that way. A plain server looks for a file literally
named `services/dermatology`, does not find one, and answers
`Cannot GET /services/dermatology` — every page appears broken while the site
is in fact fine. The two servers above implement the rule; Live Server cannot
be configured to. Never "fix" this by adding `.html` back to the links: that
would break the real URLs in production.

Before deploying, run the SEO/AEO gate from the repo root:

```
node scripts/check-seo.js
```

It exits non-zero on the failures a browser cannot show you: FAQ markup that
has drifted from the visible copy, titles disagreeing with the JSON-LD graph,
broken internal links or missing assets, a stale sitemap, and — because the
header and footer are physically duplicated in every page — shared chrome that
has diverged between pages. Read its docstring before changing nav or footer
markup.

## Deploying

Firebase Hosting serves the repo root (`"public": "."`), and `CNAME` points
`varniqaclinic.com` at the deployment.

```
firebase deploy --only hosting
```

## Scripts

Everything here is Node with no dependencies — there is no `package.json` and
nothing to install. Keep it that way: the site has no build step, and the
tooling should not acquire one.

| Script | Purpose |
| --- | --- |
| `scripts/check-seo.js` | Pre-deploy site-wide SEO/AEO check. Node stdlib only. |
| `scripts/serve.js` | Local preview that mirrors the hosting rules. Node stdlib only. |

`docs/proposals/` also holds two Python scripts that generated the client
proposal `.docx` and its PDF. They are one-off document tooling, not part of
the website, and they need `python-docx` and `reportlab` to run. The generated
`.docx` is checked in beside them, so nothing needs Python to build or ship
this site.
