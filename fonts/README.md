# Self-hosted fonts

Both families are licensed under the **SIL Open Font License 1.1**, which
permits self-hosting and redistribution. They were fetched from the Google
Fonts CDN and are unmodified.

| File | Family | Weights | Subset |
|---|---|---|---|
| `eb-garamond-700-latin.woff2` | EB Garamond | 700 | latin |
| `eb-garamond-700-latin-ext.woff2` | EB Garamond | 700 | latin-ext |
| `red-hat-display-var-latin.woff2` | Red Hat Display | 400–600 (variable) | latin |
| `red-hat-display-var-latin-ext.woff2` | Red Hat Display | 400–600 (variable) | latin-ext |

## Why only these

`--serif` is applied to `h1`, `h2` and `h3` and nowhere else, and all three
render at the user-agent bold default, so EB Garamond is only ever needed at
700. The single-weight request returns a static instance, which is smaller
than the variable file.

Red Hat Display is used at 400, 500 and 600. Google serves all three from one
variable file, so it is declared once with a `400 600` weight range rather
than three times.

The previously hosted stylesheet loaded nine weights, five of which the site
never used.

## Replacing these

Request the same subsets from `fonts.googleapis.com/css2` with a browser
user-agent (the response is `woff2` only for modern UA strings), then update
the `unicode-range` values in `css/style.css` to match the new response. The
ranges must be copied verbatim — they are what stops the `latin-ext` files
downloading for pages that contain no `latin-ext` characters.
