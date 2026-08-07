"""Pre-deploy SEO/AEO check for index.html. Run: python check-seo.py

Catches the failures that are invisible in a browser and silently cost rich
results: FAQ markup that has drifted from the visible copy, the page name
disagreeing between <title> and the JSON-LD graph, speakable selectors
pointing at classes that no longer exist, and referenced images that 404.

ponytail: stdlib only, no test framework. Exit code is what CI would read.
"""

import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
PAGE = os.path.join(ROOT, "index.html")

# Visible answers wrap across source lines and carry entities (&mdash;); the
# markup carries the same text as one flat string. Compare them normalised.
strip_tags = lambda s: re.sub(r"<[^>]+>", "", s)
norm = lambda s: re.sub(r"\s+", " ", html.unescape(strip_tags(s))).strip()

failures = []
fail = failures.append


def main():
    src = open(PAGE, encoding="utf-8").read()
    graph = json.loads(
        re.search(r'<script type="application/ld\+json">(.*?)</script>', src, re.S).group(1)
    )["@graph"]
    node = lambda t: next(n for n in graph if n["@type"] == t)

    # --- FAQ markup must match the visible copy character-for-character -----
    visible = {
        norm(q): norm(a)
        for q, a in re.findall(
            r'<div class="faq-item">\s*<h3>(.*?)</h3>\s*<p>(.*?)</p>', src, re.S
        )
    }
    marked = {e["name"]: e["acceptedAnswer"]["text"] for e in node("FAQPage")["mainEntity"]}

    for q, answer in marked.items():
        if q not in visible:
            fail(f"FAQ question in markup but not on the page: {q!r}")
        elif visible[q] != answer:
            fail(f"FAQ answer drifted from visible copy: {q!r}")
    for q in visible:
        if q not in marked:
            fail(f"FAQ question on the page but not in markup: {q!r}")

    # --- one page, one name ------------------------------------------------
    title = norm(re.search(r"<title>(.*?)</title>", src, re.S).group(1))
    if title != node("WebPage")["name"]:
        fail(f"<title> {title!r} != WebPage.name {node('WebPage')['name']!r}")
    if len(title) > 65:
        fail(f"<title> is {len(title)} chars; Google truncates past ~65")

    # --- speakable selectors must resolve, or voice answers get nothing -----
    for sel in node("WebPage")["speakable"]["cssSelector"]:
        cls = sel.lstrip(".")
        if not re.search(rf'class="[^"]*\b{re.escape(cls)}\b', src):
            fail(f"speakable selector {sel!r} matches no element")

    # --- referenced local images must exist --------------------------------
    for path in sorted(set(re.findall(r'(?:src|href)="(images/[^"]+)"', src))):
        if not os.path.exists(os.path.join(ROOT, path)):
            fail(f"missing image: {path}")

    # --- freshness signals must agree --------------------------------------
    footer = re.search(r'Last updated <time datetime="([\d-]+)"', src).group(1)
    if footer != node("WebPage")["dateModified"]:
        fail(f"footer date {footer} != schema dateModified {node('WebPage')['dateModified']}")
    sitemap = open(os.path.join(ROOT, "sitemap.xml"), encoding="utf-8").read()
    lastmod = re.search(r"<lastmod>([\d-]+)</lastmod>", sitemap).group(1)
    if lastmod != footer:
        fail(f"sitemap lastmod {lastmod} != page last-updated {footer}")

    for f in failures:
        print("FAIL", f)
    print(f"\n{len(marked)} FAQ entries checked — {len(failures) or 'no'} problem(s)")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
