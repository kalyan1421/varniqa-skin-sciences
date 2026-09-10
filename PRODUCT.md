# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing: hand-authored static HTML and CSS, no framework and no build step, deployed to Firebase Hosting at `varniqaclinic.com`. One vanilla JS file for the mobile nav. Fonts are self-hosted in `fonts/`. `scripts/check-seo.js` is a stdlib-only pre-deploy gate that validates FAQ/schema parity, title/schema agreement, review-figure parity, speakable selectors, and asset existence.

The absence of a build step is load-bearing: every page is written by hand, so shared chrome (header, footer, sticky mobile bar, icon sprite) is duplicated per page rather than templated, and drift between copies is a real maintenance risk that any multi-page work must plan for.

## Users

Prospective patients in west Hyderabad — Nallagandla, Gopanpalle, Tellapur, Gachibowli, Kondapur, Lingampally, Serilingampally — plus the surrounding Financial District and HITEC City. They are researching a skin, hair or nail concern, often on a phone, and are deciding whether this clinic is credible enough to contact.

The journey is high-consideration and medical, not transactional. Concerns range from routine (acne, fungal infection) to appearance-sensitive and expensive (melasma, hair transplant), so the same page set serves anxious first-time patients and people comparison-shopping a surgical procedure.

Booking happens by phone call or WhatsApp message. Walk-ins are accepted during opening hours. There is no online booking system and no patient portal.

## Product Purpose

Establish that Varniqa is a real dermatologist-led clinic worth travelling to, and convert that belief into a call or WhatsApp message. Success is a booked consultation, measured through call and WhatsApp conversions, Google Business Profile actions, and organic visibility for local treatment queries.

## Positioning

Diagnosis-first. Every treatment plan follows a clinical assessment rather than a package menu, procedures are performed by an MD (DVL) dermatologist rather than a technician, and diagnostics (dermoscopy, trichoscopy) precede recommendations. Cost is quoted after assessment, never promised in advance.

This is a claim a neighbouring aesthetic chain could not truthfully copy, and it is already the site's dominant voice — cautious expectation-setting, explicit candidacy caveats, and refusal to quote prices sight-unseen.

## Operating Context

- Single clinic location, second floor of Hytek Arcade, Block A, Kanchi Gachibowli Rd, Gopanpalle, Nallagandla, Hyderabad, Telangana 500046.
- Open seven days, 10:00 am – 8:00 pm.
- Phone and WhatsApp: +91 90001 53463. Email: care@varniqaskinsciences.com.
- WhatsApp is used for appointment coordination and general queries, not clinical consultation. The site explicitly tells patients not to send urgent or sensitive medical information through it.
- Traffic is expected to be mobile-majority and local-intent, arriving from Google Search and the Google Business Profile.

## Capabilities and Constraints

Six confirmed service areas: Dermatology, Trichology, Aesthetic Medicine, Laser Treatments, Dermatosurgery, Hair Transplant.

Constraints that future work must respect:

- **YMYL healthcare.** Clinical claims require the dermatologist's review. Never publish outcome promises, invented statistics, fabricated testimonials, or categorical claims about pain, safety or results.
- **No published pricing.** Cost is confirmed after clinical assessment. Do not invent price bands or "starting from" figures.
- **No fabricated proof.** Review counts, ratings, credentials and memberships must match a verifiable source.
- **FAQ/schema parity.** Any FAQ answer must match its FAQPage markup character-for-character, enforced by `scripts/check-seo.js`.
- **NAP consistency.** Name, address, phone and hours must stay identical across the site, schema, `llms.txt` and the Google Business Profile.

Explicitly undecided / outstanding:

- Whether paediatric dermatology is offered. It appears in the doctor's biography and in `Physician.knowsAbout` schema but not in the visible service list. Unresolved contradiction.
- Telangana State Medical Council registration number, medical college, year of qualification, professional memberships (IADVL/ISHRS/ACSI). Stubbed in source with paste-ready schema; not yet supplied.
- Consultation fee and duration policy, and expected WhatsApp reply time.
- Lift access, parking and nearest landmark for the second-floor location.
- Blog authorship and medical-review workflow. No editorial policy exists yet.
- Privacy policy, terms, medical disclaimer and editorial policy pages do not exist.

## Brand Commitments

- Name: **Varniqa Skin Sciences**. Registered alternate name **Varniqa Clinic**, which matches the domain.
- Tagline in use: "Confidence Through Care". Footer descriptor: "Dermatology | Aesthetics | Hair Transplant".
- Clinician: **Dr. Manvitha Poluri, MBBS, MD (DVL)**, Founder & Chief Consultant Dermatologist, Trichologist & Hair Transplant Surgeon, 5+ years across paediatric, cosmetic, aesthetic and surgical dermatology.
- Existing visual system is binding and must be extended, not replaced: brand palette (Midnight Steel `#364A62`, Calm Grey, Frost Blue, Natural Linen, Mineral Grey, Porcelain), EB Garamond + Red Hat Display type pairing, 25px radii, the graduated-dot brandmark motif, and the existing line-icon sprite. Brand identity dates to March 2026.
- Voice: plain-language, cautious, non-promotional. Sets realistic expectations, names risks, and says when someone is not a candidate.
- Assets on hand: `images/` (authentic clinic and doctor photography, not stock), logo SVGs, brandmark, OG image.

## Evidence on Hand

- Google Business Profile verified. Place ID `ChIJV-0YXIWTyzsRct_w2uwMwic`, coordinates 17.4618473, 78.308865. **Rated 5.0 from 17 reviews** — real, and now shown visibly on the homepage as well as in `aggregateRating`.
- Authentic clinic interior and doctor photography.
- 13 existing FAQ entries, live and schema-synced.
- **Absences future work must not fill by invention:** no consented patient testimonials, no before/after imagery, no published credentials beyond MBBS/MD (DVL), no directory profiles wired into `sameAs` beyond Google Maps, no case studies, no press. Verified Instagram, YouTube, LinkedIn, Facebook and Pinterest profiles are present in the footer and clinic schema.

## Product Principles

1. **Diagnosis before treatment, in copy as in clinic.** Every page should make it obvious that the plan follows an assessment. Never let a page imply a treatment can be chosen from a menu.
2. **Proof over assertion.** Prefer a verifiable, linked fact to an adjective. If proof does not exist yet, reduce the claim rather than dress it up.
3. **Name the limits.** Candidacy caveats, session counts, variability of outcome and "this may not be for you" are features of this clinic's voice, not disclaimers to bury.
4. **Local specificity is the moat.** Nallagandla, the surrounding suburbs, exact NAP and real hours outrank generic dermatology content for this business.
5. **Every page must offer a next action.** Call or WhatsApp, contextual to what the visitor was just reading.

## Accessibility & Inclusion

The existing site sets a floor that new work must hold: skip link, visible `:focus-visible` treatment, `prefers-reduced-motion` handling, semantic headings and lists, labelled map iframe, an accessible hours table with a caption, 44px minimum touch targets on the sticky mobile bar, and WCAG AA contrast — the palette already carries darkened token variants (`--deep-linen`, `--slate-grey`) derived specifically to clear AA on Porcelain.

Content is English (`en-IN`). Patients span a wide age and literacy range, so plain language and scannable structure are accessibility requirements, not style preferences.
