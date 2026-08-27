# Phase 2 Content Briefs

Status: ready for drafting and clinical review. Do not index a page until Dr. Manvitha Poluri approves its visible copy and structured data.

## Existing query owner

`/blog/acne-treatment-nallagandla` owns the primary â€œacne treatment in Nallagandlaâ€ intent. Do not create `/conditions/acne-treatment-nallagandla`; that would duplicate intent and divide ranking signals.

## Existing query owners (expand; do not duplicate)

- `/services/trichology` owns hair-loss treatment in Nallagandla. Expand it with transplant-vs-medical-management guidance after clinical review; do not create `/conditions/hair-loss-treatment-nallagandla`.
- `/services/laser-treatments` owns laser hair reduction in Nallagandla. Expand its hair-reduction sections and FAQs after device/operator facts are confirmed; do not create `/treatments/laser-hair-reduction-nallagandla`.
- `/services/dermatosurgery` owns mole and skin-tag removal in Nallagandla. Strengthen its procedure and aftercare detail after clinical review; do not create `/treatments/mole-skin-tag-removal-nallagandla`.

## Melasma and pigmentation treatment

- URL: `/conditions/melasma-pigmentation-treatment-nallagandla`
- Parent: `/services/dermatology`
- Intent: distinguish melasma and post-inflammatory pigmentation before treatment.
- Cover: patterns, triggers, diagnosis, treatment categories, recurrence, sun protection, Indian-skin considerations, FAQs.
- Proof needed: confirmed procedures and any device-specific claims.

## Dandruff and scalp treatment

- URL: `/conditions/dandruff-scalp-treatment-nallagandla`
- Parent: `/services/trichology`
- Intent: persistent flaking, itching or inflamed scalp.
- Cover: dandruff vs dermatitis, psoriasis or infection; examination, triggers, treatment categories, recurrence, FAQs.
- Proof needed: clinician-approved differential-diagnosis and testing language.

## Shared publishing gate

- Unique title, description, H1 and canonical.
- At least 800 words of useful, non-repetitive visible content.
- Doctor author/reviewer block and genuine publication/modified dates.
- Medical disclaimer, contextual CTA, breadcrumbs and three to six internal links.
- Matching visible FAQs and JSON-LD.
- Appropriate medical-page, service/entity, breadcrumb and FAQ markup.
- HTTP 200, `index, follow`, sitemap entry and `llms.txt` summary only after approval.
