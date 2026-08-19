# Varniqa Skin Sciences — Website Audit

Audit date: 14 August 2026  
Scope: local static-source review plus desktop (1440 px) and mobile (390 px) rendering  
Business type: local dermatology, aesthetics, and hair-restoration clinic (YMYL healthcare)

## Executive summary

| Area | Score | Assessment |
|---|---:|---|
| Design / UX | 74/100 | Calm, coherent and accessible baseline; too text-heavy and brochure-like for a high-consideration medical journey. |
| SEO | 79/100 | Excellent single-page technical foundation; organic reach is capped by the one-URL architecture and incomplete medical authority proof. |
| Services / conversion | 61/100 | Responsible service descriptions and good local access; weak decision support, trust proof and service-level next actions. |

The site is stronger than a typical local-clinic landing page in semantics, metadata, accessibility, image handling, schema and AI-search formatting. Its main constraint is structural: six clinically distinct offerings, thirteen FAQs, the doctor profile and all local-intent content are compressed into one long page. The result is credible but difficult to scan, impossible to rank deeply for individual treatments, and short on the evidence patients need before contacting a clinic.

## Design audit

### What works

- A restrained healthcare palette, semantic tokens, two-family type system and consistent 25 px radii create a calm identity (`css/style.css:11-40`).
- The hero establishes clinic type, location, hours, clinician credential and two obvious booking routes above the fold (`index.html:188-239`).
- Strong accessibility fundamentals: skip link, visible focus treatment, reduced-motion handling, semantic headings/lists, labelled map and an accessible hours table (`css/style.css:82-130`; `index.html:68`; `index.html:717-736`).
- Responsive layout collapses predictably at 900 px; rendered pages showed no horizontal overflow at 1440 px or 390 px.
- Photography is authentic clinic/doctor imagery rather than generic stock imagery.

### Phase 1 — Critical

1. **Turn the services grid into a decision surface.** Each card is a non-interactive `<li>` with a long paragraph and a decorative hover animation (`index.html:384-468`; `css/style.css:593-676`). Add a short patient-intent label, 2–4 scannable concerns, a `Learn more` link and a contextual `Book consultation` action. A hover affordance on a non-clickable card creates false interactivity.
2. **Reduce the mobile reading burden.** The rendered mobile page is about 13,145 px tall. Six dense service paragraphs plus thirteen fully expanded FAQ answers produce fatigue. Keep critical answers visible, group FAQs by intent, and use accessible `<details>` disclosure for secondary questions; preserve crawlable HTML.
3. **Add persistent conversion access on small screens.** The hero actions disappear after the first screen and the next action is far down the page. Add a restrained sticky mobile bar for `Call` and `WhatsApp / Book`, with safe-area spacing and no content obstruction.
4. **Replace generic trust claims with proof.** The dark “Why Choose Varniqa?” section is visually prominent but its four cards assert expertise, diagnostics and patient-first care without registration, institutions, device details, review evidence or process proof (`index.html:476-513`). Show verifiable evidence or reduce the visual weight.
5. **Add legal/privacy wayfinding.** The footer has no privacy, medical disclaimer, terms or WhatsApp-data guidance (`index.html:773-797`). For a healthcare conversion flow, this is both a trust and usability gap.

### Phase 2 — Refinement

1. **Tighten hierarchy and density.** Global section padding is 90 px, service gaps reach 40 px and body line-height is 1.8 (`css/style.css:58-65`; `css/style.css:463-465`; `css/style.css:579-605`). Preserve generous whitespace in the hero, but reduce repetitive vertical gaps in services/FAQ and cap paragraph measure around 60–70 characters.
2. **Introduce a proof-led doctor module.** Keep the strong portrait and credential hierarchy, then add compact chips/rows for council registration, education, languages, memberships and consultation focus. Do not publish placeholders.
3. **Use patient-led service grouping.** Reorganize presentation as Skin conditions, Hair & scalp, Lasers & devices, Aesthetic treatments, Minor skin surgery and Hair transplant. Current categories overlap: hair appears under Dermatology and Trichology; acne scars appear under Dermatology and Lasers (`index.html:388-465`).
4. **Make arrival information practical.** The contact section has exact NAP, hours and map (`index.html:681-769`) but should include landmark, lift/accessibility, parking/transit and a clear `Get directions` button.
5. **Clarify link/button states.** Define active navigation state and stronger pressed/keyboard states. Current interactions focus on hover and border colour (`css/style.css:214-230`; `css/style.css:413-455`), while service hover motion has no functional meaning.

### Phase 3 — Polish

1. Add a compact “What to expect” sequence: choose concern → dermatologist assessment → transparent plan/consent → treatment and aftercare.
2. Use subtle section dividers or alternating content rhythm to prevent the very long page from reading as repeated heading/paragraph blocks.
3. Add purposeful microcopy near WhatsApp: expected reply time, appointment-only purpose, and a warning not to send urgent or sensitive medical information.
4. Add designed loading/fallback treatment for the third-party map and verify mobile menu focus management beyond Escape-close behavior (`js/script.js:29-65`).
5. If genuine, add consented testimonials or a visible Google-rating link; never fabricate proof or outcomes.

### Design-system updates proposed

- Add semantic tokens for `surface-elevated`, `border-subtle`, `success/trust`, sticky-action height and content measure.
- Add standard components: service-card/link, proof-row, clinician-credential list, mobile booking bar, disclosure/FAQ, review card and legal-link group.
- Retain the existing palette, typography pairing, radii and icon style. The visual identity does not need a redesign; it needs stronger information architecture and proof.

## SEO audit

### Scorecard

| Category | Score |
|---|---:|
| Technical SEO | 88 |
| Content / E-E-A-T | 68 |
| On-page SEO | 70 |
| Schema | 86 |
| Performance risk | 84 |
| AI search readiness | 90 |
| Images | 95 |
| Local SEO | 82 |

### High-priority findings

1. **Only one indexable commercial page.** Navigation targets fragments and the sitemap contains one URL (`index.html:158-170`; `sitemap.xml:3-8`). Create dedicated service and high-demand condition pages, each with unique intent, clinician review, risks/alternatives, FAQs and local conversion paths.
2. **Medical E-E-A-T is incomplete.** The doctor profile gives name, MBBS/MD, role and 5+ years, while source TODOs explicitly identify missing Telangana registration, education and memberships (`index.html:318-349`). Publish verified credentials, author/reviewer blocks and reviewed/updated dates.
3. **Review proof exists only in schema.** `aggregateRating` claims 5.0 from 17 reviews (`index.html:914-920`) but users see no corresponding proof. Add a visible, current GBP link/rating or consented reviews and maintain synchronization. Do not expect self-serving clinic schema to generate review stars.
4. **No healthcare trust-policy layer.** Add privacy, terms, medical-information disclaimer, editorial/review policy and booking/consent policy. This also addresses GTM, email and WhatsApp data handling.

### Medium-priority findings

- Shorten/test the long title (`index.html:16`), e.g. `Dermatologist in Nallagandla | Varniqa Clinic`, while retaining the strong local meta description.
- Expand visible and schema `sameAs` beyond Google Maps only (`index.html:905-907`) using verified professional/social profiles and medical directories.
- Refine schema: add verified physician `identifier`, `alumniOf` and `memberOf`; model services with stable `@id` and dedicated URLs; link `primaryImageOfPage` to an `ImageObject` (`index.html:980-1025`).
- Validate live schema after deployment and confirm the production 404 returns HTTP 404, not merely a `noindex` document.
- Self-host/subset the two Google font families and remove unused weights (`index.html:48-51`). Audit GTM tags loaded in the head (`index.html:8-14`). Use content-hashed CSS/JS with immutable caching instead of one-hour cache (`firebase.json:29-32`).

### Strong foundations to preserve

- Correct `lang`, canonical, viewport, title/description, Open Graph and Twitter metadata (`index.html:2-45`).
- Search-targeted single H1, semantic HTML and substantial visible content independent of JavaScript.
- Responsive WebP images, dimensions, descriptive alt text, lazy loading below fold and preloaded high-priority hero (`index.html:53-58`; `index.html:245-273`).
- Rich linked entity graph for MedicalClinic, Physician, WebSite, WebPage and FAQPage (`index.html:882-1032`).
- Open search/AI crawler policy, declared sitemap and unusually useful `llms.txt` anti-hallucination notes (`robots.txt:1-37`; `llms.txt:1-67`).
- Repository FAQ consistency checker passes all 13 entries.

## Services audit

### Scorecard

| Dimension | Score |
|---|---:|
| Clarity | 14/20 |
| Completeness / intent coverage | 11/20 |
| Trust and differentiation | 10/20 |
| CTAs and booking | 9/20 |
| Local relevance | 10/10 |
| Medical responsibility / compliance | 7/10 |

### Critical findings

1. **No service-detail journeys.** Six offerings are compressed into homepage cards with no dedicated URLs, candidacy, preparation, recovery, alternatives or service-specific FAQs (`index.html:386-466`). First-wave pages: medical dermatology, acne/acne scars, hair loss, hair transplant, laser hair reduction, melasma/pigmentation, aesthetic injectables/peels and mole/wart/skin-tag removal.
2. **Service cards are conversion dead ends.** The section promises consultation but provides no card-level action or post-grid CTA (`index.html:377-470`). Add `Learn more`, a contextual booking route and a post-grid primary CTA.
3. **WhatsApp medical-data handling is absent.** The booking FAQ asks for the main concern but no visible privacy warning, emergency disclaimer or secure alternative exists. Restrict WhatsApp to appointment coordination and advise against urgent/highly sensitive information.

### High-priority findings

- Convert generic differentiators into verifiable proof: registration, training, diagnostic workflow, who performs procedures, equipment only if confirmed, skin-of-colour safety and aftercare continuity (`index.html:487-511`).
- Add the missing paediatric dermatology offering only if genuinely provided; it currently appears in biography/schema but not visible services (`index.html:332-341`; `index.html:986-999`).
- Explain consultation sequence, duration/fee policy, expected reply time, confirmation/rescheduling and aftercare.
- Replace categorical hair-transplant wording that “the procedure itself is not painful” (`index.html:608-614`) with balanced wording: local anaesthesia minimises pain, but injections, pressure, discomfort, swelling or soreness may occur and experience varies.
- Add general medical-information and outcomes-vary disclaimers, with all clinical claims reviewed by the dermatologist.

### Strengths to preserve

- Diagnosis-first positioning and cautious expectation setting (`index.html:377-380`; `index.html:461-464`).
- Broad plain-language condition coverage; skin-of-colour laser caution; suspicious-lesion biopsy pathway; explicit transplant candidacy caveat (`index.html:386-466`).
- Strong local contact access, exact NAP, hours, areas served and call/WhatsApp options (`index.html:226-237`; `index.html:681-769`).
- Responsible cost FAQ: itemized price after assessment rather than unsupported promises (`index.html:651-659`).

## Recommended roadmap

### Weeks 1–2 — Trust and conversion fundamentals

- Publish verified clinician credentials and visible review/GBP proof.
- Add privacy, terms, medical disclaimer, editorial policy and WhatsApp microcopy.
- Add service-card actions, a post-service CTA and mobile persistent booking access.
- Correct categorical clinical wording and validate live schema/404 behavior.

### Weeks 3–6 — Information architecture

- Launch six service hubs and the first 5–8 high-demand condition pages.
- Add author/reviewer/freshness blocks, internal links and sitemap entries.
- Reframe service taxonomy around patient concerns and treatment modalities.
- Add “What to expect” and practical arrival information.

### Month 2 onward — Authority and measurement

- Publish medically reviewed patient education that supports service pages.
- Earn reputable local/medical citations and keep NAP, GBP, schema, review count and `llms.txt` aligned.
- Track GSC query/page performance, GBP calls/directions, WhatsApp/call conversions and real Core Web Vitals.

## Audit limitations

This audit used local source and local desktop/mobile rendering. It does not establish live status codes, redirects, indexation, backlink quality, GBP rankings, Lighthouse lab metrics, CrUX field data or conversion analytics. Those require a deployed-site crawl and connected Google/GBP data.
