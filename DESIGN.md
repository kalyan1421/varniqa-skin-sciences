---
name: Varniqa Skin Sciences
description: A porcelain-grounded clinical world in Midnight Steel and linen, built on 25px corners and a graduated-dot brandmark.
colors:
  midnight-steel: "#364A62"
  midnight-deep: "#2D3F54"
  calm-grey: "#ACB6BF"
  slate-grey: "#5C6873"
  frost-blue: "#D8E2E4"
  natural-linen: "#C1B6A3"
  deep-linen: "#7A6D55"
  mineral-grey: "#E2E1DC"
  porcelain: "#F8F7F2"
  white: "#ffffff"
  border-subtle: "rgba(54,74,98,.10)"
typography:
  display:
    fontFamily: "EB Garamond, Garamond, Times New Roman, serif"
    fontSize: "clamp(1.9rem, 4.2vw, 3.1rem)"
    fontWeight: 700
    lineHeight: 1.18
  headline:
    fontFamily: "EB Garamond, Garamond, Times New Roman, serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "EB Garamond, Garamond, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Red Hat Display, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Red Hat Display, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "2px"
rounded:
  card: "25px"
  panel: "20px"
  inset: "16px"
  callout: "14px"
  button: "40px"
  pill: "999px"
  circle: "50%"
spacing:
  tight: "10px"
  snug: "16px"
  base: "22px"
  card: "30px"
  gutter: "70px"
  section: "76px"
  hero: "90px"
  band: "100px"
components:
  button-primary:
    backgroundColor: "{colors.midnight-steel}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "15px 35px"
  button-primary-hover:
    backgroundColor: "{colors.midnight-deep}"
  button-secondary:
    textColor: "{colors.midnight-steel}"
    rounded: "{rounded.button}"
    padding: "15px 35px"
  button-secondary-hover:
    backgroundColor: "{colors.midnight-steel}"
    textColor: "{colors.white}"
  button-on-dark-primary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.midnight-steel}"
    rounded: "{rounded.button}"
  button-on-dark-primary-hover:
    backgroundColor: "{colors.frost-blue}"
  card-on-white:
    backgroundColor: "{colors.porcelain}"
    rounded: "{rounded.card}"
    padding: "30px 28px"
  card-on-tint:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "30px 30px 32px"
  chip-concern:
    backgroundColor: "{colors.white}"
    textColor: "{colors.slate-grey}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  accordion-item:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.inset}"
    padding: "0 22px"
  callout:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.callout}"
    padding: "24px 26px"
  nav-link:
    textColor: "{colors.midnight-steel}"
    padding: "4px 0"
  nav-link-active:
    textColor: "{colors.deep-linen}"
  icon-disc:
    backgroundColor: "{colors.frost-blue}"
    textColor: "{colors.midnight-steel}"
    rounded: "{rounded.circle}"
    size: "60px"
  icon-disc-active:
    backgroundColor: "{colors.midnight-steel}"
    textColor: "{colors.white}"
  pathway-step:
    backgroundColor: "{colors.frost-blue}"
    textColor: "{colors.midnight-steel}"
    rounded: "{rounded.circle}"
    size: "44px"
  sticky-action-book:
    backgroundColor: "{colors.midnight-steel}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    height: "44px"
---

# Design System: Varniqa Skin Sciences

## Overview

**Creative North Star: "The Quiet Consulting Room"**

The world is a room, not a brochure. Everything sits on Porcelain — a warm off-white that is never quite paper and never quite grey — and the only saturated element in the palette is Midnight Steel, which is reserved for the things that actually carry weight: the logo, the headings, the buttons, and the two dark bands that anchor each page. There is no gradient behind a headline, no glass panel floating over a photograph, no colour used to make a section feel exciting. A visitor arriving anxious about a skin condition should feel the same thing they feel in a well-run clinic: that the room is calm, the person in it is qualified, and nothing is being sold to them.

Density is deliberately low and the rhythm is legible from a distance. Pages alternate white and Porcelain bands (`.section-white` / `.section-tint`, and on the homepage the semantic `.about` / `.doctor` / `.services` / `.faq` / `.contact` classes that do the same job), so the eye can count sections without reading them. Long-form pages narrow to a centred 768px reading column and then break out to a full-width dark band only to close; that alternation between narrow prose and full-width band *is* the page structure. Corners are consistently and generously rounded — 25px on every card — which is what keeps a palette this quiet from reading as institutional.

This is an extension of a binding identity dated March 2026, not a new world. The palette, the two type families, the 25px radius and the graduated-dot brandmark all pre-exist this codebase and are inherited unchanged; everything documented below either came from that identity or was derived from it under a constraint (WCAG AA, or a card that had to sit on two different grounds). The visual anti-reference is the neighbouring aesthetic-clinic template: stock-photo hero collages, price banners, gold-on-black luxury cues, and the heavy coloured left-border callout that marks a page as generated rather than built.

**Key Characteristics:**
- Porcelain ground, Midnight Steel structure, linen used only as punctuation
- Two families, four font files, no third face anywhere
- 25px corners on cards; nothing is square except 1px hairlines
- Hairline borders instead of shadows; shadows are reserved for photographs and the map
- The graduated-dot brandmark echoed as a motif at five different scales
- One 24×24 line-icon sprite, styled entirely from CSS
- AA contrast held by derived tints, not by the raw brand colours

## Colors

A near-monochrome clinical palette: one steel blue doing all the structural work, a warm linen used as punctuation, and three greys separating surface from surface.

### Primary

- **Midnight Steel** (`--midnight-steel`): The single structural colour. Headings, body text, nav links, primary buttons, the dark `why-us` panel, the `.cta-band` close on every page, and the footer. It is also the `theme-color` meta value, so the browser chrome joins the page on mobile.
- **Midnight Deep** (`--midnight-deep`): Exists only so that a primary button has somewhere to go on hover. Midnight Steel is already dark enough that a lighten-on-hover would read as a disabled state, so the hover darkens instead. Also the `::selection` text colour.

### Secondary

- **Natural Linen** (`--natural-linen`, aliased `--accent`): The warm counterweight to all that blue. It never fills a surface. It appears as the 9px dot on `.concern-list` and `.callout` headings, the underline colour under a hovered `.service-cta`, the nav's active/hover underline, the review stars, and the icon colour inside the dark panel.
- **Deep Linen** (`--deep-linen`, aliased `--accent-text`): Natural Linen darkened to 4.7:1 on Porcelain. This is the one that touches text. Every uppercase micro-label, the doctor's `.designation`, the FAQ chevron, the icon strokes in `.clinic-facts` and `.post-meta`, and the hover colour on secondary links.

### Tertiary

- **Frost Blue** (`--frost-blue`): The tint that means "supporting". It fills the round `.service-icon` disc and the numbered `.pathway` step, and it carries all text that sits on a Midnight Steel ground — the `why-us` subtitle and feature copy, the footer tagline, NAP and nav, and the `.cta-band` paragraph. Calm Grey on Midnight Steel measures 4.4:1, just under AA at these sizes, so Frost Blue is used for reversed text instead and the tagline separates from the legal line by weight and tracking rather than by colour. It is also the `:focus-visible` outline colour inside the dark panel, where a Midnight Steel ring would be invisible.

### Neutral

- **Porcelain** (`--porcelain`, aliased `--background`): The page ground, the tinted half of the section alternation, and the card surface on white sections.
- **White** (`--white`): The other half of the alternation, and the card surface on tinted sections.
- **Calm Grey** (`--calm-grey`): Never text. It is the resting `text-decoration-color` under links, the breadcrumb chevron, the `.post-meta` separator dot, the scrollbar thumb, and the border a `.related-card` or `.post-card` picks up on hover.
- **Slate Grey** (`--slate-grey`, aliased `--text-light`): Calm Grey darkened to 5.3:1 on Porcelain. All secondary body copy — descriptions, card paragraphs, FAQ answers, prose, captions.
- **Mineral Grey** (`--mineral-grey`): Two uses only, both structural: the placeholder ground behind the lazy map iframe, and the low end of the `.pathway` connector gradient.
- **Border Subtle** (`--border-subtle`): The 1px hairline that separates every card from its ground. It is Midnight Steel at 10% opacity rather than a grey, so it tints toward the page rather than muddying it.

### Named Rules

**The Derived-Tint Rule.** Brand colours set surfaces; their darkened derivatives set text. Natural Linen and Calm Grey never carry text on Porcelain — `--deep-linen` and `--slate-grey` exist for exactly that, and every text colour in the stylesheet resolves to Midnight Steel, Deep Linen, Slate Grey, Frost Blue or white. If a new surface needs an accent in text, derive a tint that clears 4.5:1 and record its ratio in a comment, as the existing three do.

**The Two-Surface Rule.** A card never hard-codes its background. It picks `--surface-sunken` (Porcelain) on a white section or `--surface-elevated` (white) on a tinted one, so the same component stays visible as the page alternates. `.callout` demonstrates the switch explicitly: it defaults to white and is flipped to the sunken tint under `.section-white`, `.services`, `.about` and `.contact`.

**The Punctuation Rule.** Natural Linen is a dot, a stroke, a star or an underline. It is never a fill behind text and never a background band. Its scarcity is what makes the Deep Linen labels read as emphasis at 0.75rem.

## Typography

**Display Font:** EB Garamond (with Garamond, Times New Roman, serif)
**Body Font:** Red Hat Display (with system-ui, -apple-system, sans-serif)

**Character:** A humanist serif with real old-style warmth for anything that names something, against a geometric sans with open apertures and a low-drama personality for everything that explains it. The pairing is deliberately unfashionable in medical marketing — no condensed grotesque, no all-caps luxury serif — and it is what makes a page of cautious clinical prose read as considered rather than clinical-cold.

Both families are self-hosted from `fonts/` and weight-trimmed to four woff2 files (latin and latin-ext per family), which removes the render-blocking round trip to `fonts.googleapis.com` and the second connection to `fonts.gstatic.com`. All four use `font-display: swap` and the two latin files are `<link rel=preload>`ed on every page. The `unicode-range` values are Google's own and must be copied verbatim if the files are ever regenerated — they are what stops the latin-ext files downloading on a page with no latin-ext characters.

### Hierarchy

- **Display** (700, `clamp(1.9rem, 4.2vw, 3.1rem)`, 1.18): The homepage `h1`. The upper bound is held down deliberately — the headline carries the primary keyword and runs longer than a slogan, so 3.1rem keeps it to about three lines. `.page-hero h1` is the quieter subpage variant (`clamp(1.9rem, 3.6vw, 2.9rem)`, capped at `20ch`).
- **Headline** (700, `clamp(2rem, 4vw, 3rem)`, 1.2): Section `h2`. Inside `.prose` it steps down to `clamp(1.5rem, 2.6vw, 2rem)`, because an article heading competing with a section heading flattens the hierarchy.
- **Title** (700, `clamp(1.5rem, 2.5vw, 2rem)`, 1.3): Card and feature `h3`. Steps down again in dense contexts — `1.15rem` in `.pathway`, `.related-card` and `.author-box`, `1.05rem` in `.callout`, `clamp(1.12rem, 1.6vw, 1.3rem)` in a FAQ summary.
- **Body** (400, 1rem, 1.7): The global default. Secondary copy inside cards runs `.92–.97rem` at the same 1.6–1.7 leading. Constrained to `--measure` (66ch, ~65 characters).
- **Label** (600, 0.75rem, 2px tracking, uppercase): `.faq-group-label`, `.contact-label`, `.footer-tagline` and the `.toc` heading. Always Deep Linen or Frost Blue, never Midnight Steel.

### Named Rules

**The Three-Heading Rule.** `--serif` is applied to `h1`, `h2` and `h3` and nowhere else, and all three render at the UA bold default. That is the entire reason EB Garamond ships one weight (700) and Red Hat Display ships one variable file covering 400–600. A serif at 400, 500 or 600 has no file behind it and will synthesise or fall back to Garamond. If a new surface needs a lighter serif, that is a decision to add a font file, not a CSS property.

**The Label-Not-Kicker Rule.** The uppercase 2px-tracked micro-label names a group (`.faq-group-label`), a field (`.contact-label`) or a widget (`.toc h2`). It exists to make a list of thirteen collapsed rows scannable. It does not go above a headline as a decorative eyebrow.

**The Lining-Figures Rule.** Anywhere numerals must align in a column or a disc — currently the `.pathway` counters — set `font-variant-numeric: lining-nums tabular-nums` so they share a baseline and a width.

## Layout

**Containers.** One shared rule sets `.container`, `.section-container`, `.nav-container` and `.hero-content` to `width: 90%; max-width: 1200px; margin: auto`, dropping to `92%` below 480px. Text-led sections add `.container-narrow`, which caps the same container at 768px.

**The two-column grid.** `.hero-content` and `.section-container` are `1fr 1fr` with a 70px gap, `align-items: center`. `.reverse` swaps the columns by `order` on `.image-column` / `.text-column` rather than the `direction: rtl` bidi hack, and at 900px the reversed image drops below the copy so the picture always follows the prose on one column.

**Grids.** Three-up for `.services-grid` (26px 24px), `.related-grid` and `.contact-routes` (20px); two-up for `.features` (30px) and `.concern-list` (12px 26px); a single stacked column for `.post-list` (22px). The 1024px step takes every three-up grid to two, and the 900px step takes everything to one.

**Vertical rhythm.** The hero gets 90px, the dark `why-us` panel gets 100px, and every repeating `section` gets 76px — deliberately tightened from the hero's 90px, because at 90px each the page read as one long undifferentiated run of heading-plus-paragraph blocks. Below 900px, sections go to 64px and the hero to 56px.

**Breakpoints.** Three, and only three: **1024px** (three-up grids become two-up, column gaps 70px → 45px), **900px** (everything becomes one column, the hamburger appears, the sticky mobile action bar appears), **480px** (containers widen to 92%, button padding tightens). New responsive work belongs at one of these three; a fourth breakpoint fragments the system.

**The sticky bar reserve.** Below 900px a fixed `.mobile-cta` bar sits at the bottom of the viewport, and `body` takes `padding-bottom: calc(var(--sticky-bar-height) + env(safe-area-inset-bottom))` so the document ends above it rather than under it. The bar is `display: none` by default and only switched on inside the query, so it cannot flash in during first paint on desktop; it is also hidden in `@media print`.

### Named Rules

**The Reading-Column Rule.** Text-led sections centre `.container-narrow` (**640px**) and the *container* owns the measure. Every block inside it — `.prose`, `.section-intro`, `.callout`, `.pathway`, `.toc`, `.reviewed-by`, `.author-box`, `.page-lead`, FAQ answers, post-card copy — has its own `max-width` reset to `none`, so the left edge of every heading, paragraph and callout lines up on one rule, and only one thing decides the width. Grids inside the narrow column stay inside it too, at reduced gap and padding. Only the dark `.cta-band` breaks out to full width, and it is unmistakably a band.

**The Measure Rule.** Two mechanisms, and which one applies depends on whether the block sits in a reading column:

- **Inside `.container-narrow`** the container is the measure and `--measure` is switched off. 640px against `.prose`'s 17px reading size measures **~72 characters** on real copy.
- **Outside it** — homepage `.text-column p`, `.faq-item p` in the homepage grid, `.areas-served` — the block carries `--measure: 66ch` itself. Centred copy in a band uses the tighter `56ch`, because a centred line is harder to track back.

**Never set the column width in `ch`.** The `ch` unit is the advance width of `0`, which in Red Hat Display is far wider than average lowercase. A column sized `70ch` renders roughly **95** characters of real prose, not 70. This is not theoretical: the first build of this column shipped at 768px on that reasoning and had to be measured in a browser and cut to 640px. Size the reading column in px, and verify by counting characters per rendered line.

## Elevation & Depth

The system is essentially flat and separates surfaces by tone and hairline, not by shadow. Depth comes from three devices: the white/Porcelain band alternation, a 1px `--border-subtle` outline around every card, and two dark full-bleed Midnight Steel bands (`why-us`, `.cta-band`) that read as the deepest layer on the page.

There is exactly one shadow token, and it is reserved for surfaces that behave like objects rather than containers: photographs (`.hero-image img`, `.section-image`, `.doctor-image`) and the map. Cards never take it.

The one place the system does layer optically is on the dark panel, where `.feature` and `.review-proof` use white at 8% with `backdrop-filter: blur(8px)`, and the sticky navbar and mobile bar use a 95–97% Porcelain fill with `backdrop-filter: blur(15px)`. Blur is used to keep a translucent surface legible over what scrolls under it, never as decoration on an opaque one.

### Shadow Vocabulary

- **Ambient object shadow** (`--shadow: 0 12px 40px rgba(54,74,98,.10)`): Photographic images and the contact map. Tinted with Midnight Steel rather than black, offset far and blurred wide at only 10% opacity, so it reads as the image sitting on the page rather than as a drop shadow.

### Named Rules

**The One-Shadow Rule.** There is one shadow and it belongs to photographs and the map. A card is separated from its ground by `1px solid var(--border-subtle)` and a surface-token background. Do not add a second shadow token, and do not put a shadow on a card to make it "pop" — flip its surface token instead.

**The Motion-Answers-The-Link Rule.** Hover motion is small, and it is keyed to a real interactive element. `.feature` lifts 8px, `.related-card` lifts 3px and swaps its border to Calm Grey, `.service-cta` slides its arrow 3px. The service card itself does not animate — it is a plain `<li>` whose only interactive child is the link at the bottom — so its icon disc inverts on `:focus-within` and `:has(.service-cta:hover)` rather than on hovering the card, which would advertise a click target that does not exist.

## Shapes

**The corner ramp.** `--radius: 25px` is the house corner, and it scales down as a container gets denser: 25px for cards and the map (`.service-card`, `.related-card`, `.post-card`, `.contact-route`, `.services-cta`, `.author-box`, images), 20px for the panel-weight `.feature` and the mobile `.review-proof`, 16px for compact insets (`details.faq-item`, `.reviewed-by`, `.toc`), 14px for the `.callout`. Fully round forms take 999px (concern chips, the review pill) or `50%` (icon discs, pathway counters, avatars). The only hard corners in the system are 1px rules and the 4px `:focus-visible` radius.

**Pill actions.** Every action is a pill at 40px: `.button`, `.directions-button`, and the sticky mobile bar's links. A rectangular button is off-system.

**Line over fill.** The icon language is single-weight line geometry on a 24×24 grid with round caps and joins. `#i-star` is the only filled icon in the sprite, and it is filled because a hollow star does not read as a rating.

### Named Rules

**The 25px Rule.** Cards are 25px. When a container is small enough that 25px eats its own padding, step down the ramp (20 → 16 → 14) rather than inventing a value; when it is round, go to 999px or 50%. Never introduce a radius between the steps.

**The Graduated-Dot Rule.** The brandmark is a ring of circles of graduated size, and that motif is the system's one recurring ornament. It appears as: the ten-stop `radial-gradient` field in `.why-us::before` (420px, dropping to 260px below 900px, white at 6–10%, `pointer-events: none`); the 9px linen dot on every `.concern-list` item; the 9px linen dot on a `.callout` heading; the 44px Frost Blue numbered discs in `.pathway`; the 3px Calm Grey separator dot in `.post-meta`; and the 60px Frost Blue `.service-icon` disc. When a new surface needs decoration, it gets dots — nothing else is ornament in this system.

**The No-Border-Left Rule.** `.callout` carries its accent as a 9px dot on the heading, positioned at `top: .58em` so it sits on the cap line. It is *not* a coloured left border, and that is a decision, not an omission: the thick accent edge is the single most recognisable tell of a generated interface, and the dot ties the callout to the brandmark motif instead. Do not "restore" a `border-left`.

## Components

### Buttons
- **Shape:** Full pill (40px radius), `15px 35px` padding, weight 500, tightening to `14px 26px` below 480px.
- **Primary:** Midnight Steel fill, white text; hover darkens to Midnight Deep.
- **Secondary:** 2px Midnight Steel outline, no fill, Midnight Steel text; hover fills to Midnight Steel with white text.
- **On dark:** Inside `.cta-band` the pair inverts — primary becomes a white fill with Midnight Steel text (hover to Frost Blue), secondary takes a Frost Blue border with white text (hover to a white fill).
- **Directions button:** A smaller outline pill (`11px 22px`, 0.92rem) with a leading 17px icon, used where an action is a utility rather than the page's close.

### Chips
- **Concern chips** (`.service-concerns li`): White fill, subtle hairline, 999px, `4px 12px`, 0.82rem Slate Grey. They are static descriptors in a patient's own words, not filters — nothing hovers, nothing selects.

### Cards / Containers
- **Corner style:** 25px.
- **Background:** By the Two-Surface Rule — `--surface-sunken` on white sections, `--surface-elevated` on tinted ones.
- **Border:** `1px solid var(--border-subtle)`. **Shadow:** none, per the One-Shadow Rule.
- **Internal padding:** `30px 28px` for a service card, `24px 22px` for a related card, `28px 26px` for a contact route, `30px 30px 32px` for a post card; all tighten to roughly `26px 22px` below 900px, and to `22px 20px` inside `.container-narrow`.
- **Service card:** A flex column with the actions pinned by `margin-top: auto`, so the calls-to-action line up across a row whatever the copy length. Structure is icon disc → `h3` → `.service-intent` (the one-line "is this you", in full-strength text at weight 500) → concern chips → `.service-links`, whose two links are ranked by size and colour: the booking link at 0.93rem Midnight Steel, the read-more at 0.89rem Slate Grey.
- **Post card:** The whole card is clickable, but the hit area is a stretched `::after` on the title link rather than a wrapper `<a>` around the card — so the link's accessible name stays the article title instead of swallowing the date, excerpt and byline into one long label. Border swaps to Calm Grey on hover.

### FAQ Accordion (signature)
- `<details class="faq-item">` on a white surface, 16px radius, `0 22px` padding, 10px apart. The summary is a flex row with `list-style: none` and a suppressed `::-webkit-details-marker`; the chevron is a 9px CSS box with two Deep Linen borders rotated 45°, flipping to 225° when open.
- `<details>` keeps every answer in the DOM whether or not it is open, which is what lets the copy stay crawlable and identical to the FAQPage markup while still collapsing several thousand pixels off the mobile page.
- Focus is explicit on the summary (`3px solid var(--primary)`, 2px offset), because a summary is the interactive element and the default ring is easy to lose against the card.

### Navigation
- Sticky, `z-index: 1000`, Porcelain at 95% with `backdrop-filter: blur(15px)` and an 8%-Midnight-Steel bottom hairline. 250px logo, 40px link gap, weight 500.
- Links are Midnight Steel with a 2px transparent bottom border that becomes Natural Linen on hover while the text goes Deep Linen. The current page is marked with `aria-current="page"` and takes the same treatment permanently — the underline answers "where am I" visually, the attribute answers it for assistive tech.
- Below 900px the container wraps, a 46px hamburger button appears, and the link list becomes a stacked panel toggled by `.is-open`. The three `.nav-toggle-bar` spans animate to an X off `aria-expanded="true"` — state lives on the ARIA attribute, not a separate class.

### Icons (signature)
- One definitions-only sprite per page: `<svg class="sprite" aria-hidden="true" focusable="false">` wrapping a `<defs>` of `<symbol id="i-*" viewBox="0 0 24 24">`, hidden with `display: none` and referenced as `<svg aria-hidden="true"><use href="#i-name" /></svg>`.
- **Symbols carry geometry only.** No `fill`, `stroke`, or `stroke-width` attributes appear in the sprite. Every visual property is set by the CSS rule for the context the icon appears in: `fill: none; stroke: currentColor` (or `stroke: var(--accent-text)` where the icon is a label rather than part of a link), `stroke-linecap: round`, `stroke-linejoin: round`.
- **Stroke weight scales inversely with size,** so optical weight stays constant: 1.5 at 28–46px (`.service-icon`, `.feature-icon`), 1.6 at 19px (`.clinic-facts`), 1.7 at 15–18px (`.post-meta`, `.mobile-cta`, `.directions-button`), 1.8 at 16px (`.service-cta`).
- The vocabulary is `i-stethoscope`, `i-hair`, `i-sparkle`, `i-laser`, `i-scalpel`, `i-sprout` (the six services), `i-badge`, `i-microscope`, `i-heart`, `i-shield` (the four trust features), `i-pin`, `i-clock`, `i-arrow`, `i-phone`, `i-whatsapp`, `i-directions`, `i-star`, plus `i-calendar`, `i-mail`, `i-user` on subpages. A new icon is drawn into the sprite at 24×24 in the same line style; it is never an emoji, an icon font, or an `<img>`.
- **Icon disc:** 60px Frost Blue circle holding a 28px icon in Midnight Steel, left-aligned with the copy rather than centred above it — six centred 85px discs added real height to the mobile page without adding information. Inverts to a Midnight Steel fill with a white icon when the card's link is hovered or focused.

### Care Pathway (signature)
A numbered `<ol>`-style sequence where the order is genuinely information — this is the chronological route a patient takes, and step three cannot precede step two. Each step is a 44px Frost Blue circle bearing a CSS counter in lining tabular figures, with 64px of left padding for the copy, joined by a 2px vertical rule that gradients from Frost Blue to Mineral Grey and **stops at the last step** rather than trailing off. Below 900px the disc drops to 38px and the indent to 56px.

### Dark Panel (signature)
`.why-us` and `.cta-band` are the two Midnight Steel full-bleed bands. `.why-us` runs 100px tall with the graduated-dot gradient field bleeding off the top-right corner and a two-up grid of `.feature` tiles at white-8% with an 8px backdrop blur, each lifting 8px on hover. Inside these bands: headings and feature titles go white, all supporting copy goes Frost Blue, icons go Natural Linen, `::selection` flips to white-25%, and `:focus-visible` switches its ring to Frost Blue. `.cta-band` is the reduced version of the same panel and closes every page, so a page ends anchored instead of trailing into the footer.

### Review Proof
A centred 999px pill on the dark panel (white-8% fill, white-16% border, 8px backdrop blur) holding five filled Natural Linen stars, the rating and count at weight 600 in white, and a Frost Blue link out to the Google listing. It becomes a 20px-radius block below 900px, because `max-width: max-content` would push the pill past a narrow viewport. The visible figures and the `aggregateRating` markup are checked against each other by `scripts/check-seo.js`.

### Article Furniture
- **`.reviewed-by`** — a 46px round avatar beside two lines of 0.88rem text on a sunken 16px inset, placed *above* the article body rather than at the end.
- **`.toc`** — a 16px sunken inset whose heading is the sans micro-label, not a serif `h2`, so it reads as a widget rather than a section.
- **`.author-box`** — a 76px avatar beside the bio on a 25px sunken card, stacking to a column below 900px.
- **`.post-meta`** — a 0.85rem Slate Grey flex row of icon-plus-text groups separated by 3px Calm Grey dots.

### Contact Surfaces
- **Contact routes:** A three-up grid of 25px sunken cards, each an icon disc, an `h2` at 1.2rem, a line of expectation-setting copy, and a `.route-action` link pinned to the bottom by `margin-top: auto`.
- **Hours table:** A real `<table>` with a caption — `border-collapse`, `max-width: 360px`, day in Midnight Steel with `white-space: nowrap`, time in Slate Grey, both at `font-weight: 400` and `vertical-align: top`.
- **Map with fallback:** A 25px, 420px-minimum box on Mineral Grey whose `::after` renders the full street address centred in the box, with the lazy third-party iframe painting over it at `z-index: 1`. The embed is third-party and lazy-loaded, so there is a window — and on a blocked or offline client a permanent state — where an empty rounded rectangle would read as a broken component. The fallback text is the address itself, which is the information the map was there to give.

### Browser Surfaces
The parts of the page the stylesheet did not draw are themed too: `::selection` is Frost Blue on Midnight Deep (white-25% on the dark bands and footer), and the scrollbar is a Calm Grey 999px thumb on a Porcelain track with a 3px Porcelain border, darkening to Slate Grey on hover, declared both as `scrollbar-color` and in the `-webkit-scrollbar` pseudo-elements.

## Do's and Don'ts

### Do:

- **Do** pick a card background from the surface tokens (`--surface-sunken` on white sections, `--surface-elevated` on tinted ones) rather than hard-coding `#fff` or `--porcelain`.
- **Do** use the derived tints for anything that is text: `--deep-linen` for accented labels, `--slate-grey` for secondary copy, `--frost-blue` for anything on Midnight Steel. Ratios are recorded in the VARIABLES block; keep them there.
- **Do** wrap text-led sections in `.container-narrow` (768px) and let the container carry the measure — reset any child's own `max-width` to `none`, the way the existing block list does.
- **Do** draw new icons into the sprite at 24×24 in the same line style, with geometry only and all stroke properties set from the CSS rule for the context.
- **Do** echo the graduated-dot brandmark when a surface needs ornament — a dot, a disc, or a soft radial field. That motif is the ornament budget.
- **Do** end every page with the dark `.cta-band`, so the page closes anchored instead of trailing into the footer.
- **Do** keep FAQ answers in `<details>` accordions, and keep each answer character-for-character identical to its FAQPage JSON-LD. `scripts/check-seo.js` fails the build on drift, and a "small" copy edit in the visible answer is exactly how that drift happens.
- **Do** copy shared chrome — header, footer NAP, footer nav, sticky bar — byte-for-byte between pages. There is no build step, so the copies are physically duplicated and `scripts/check-seo.js` is the only thing holding them identical. A visual tweak to the nav is a change to every page, not one.
- **Do** stay on the three breakpoints: 1024, 900, 480.
- **Do** keep the accessibility floor the code already holds: a skip link, a visible `:focus-visible` ring (3px Midnight Steel, 3px offset, Frost Blue on dark grounds), a `prefers-reduced-motion` block that flattens all animation and transition to 0.01ms, `aria-current="page"` on the active nav link, `aria-expanded` driving the hamburger's own visual state, 44px minimum touch targets in the sticky bar, `env(safe-area-inset-bottom)` padding on anything fixed to the bottom, `width`/`height` attributes on every `<img>` against layout shift, and semantic elements — a real `<table>` for hours, real `<ul>`s for the service and feature grids, `.visually-hidden` where a label is needed but not seen.

### Don't:

- **Don't** give a card a shadow. There is one shadow token and it belongs to photographs and the map; separation comes from the hairline and the surface token.
- **Don't** put a coloured left border on a `.callout`. The accent is a 9px dot on the heading. This is a deliberate rejection, not an oversight.
- **Don't** apply `--serif` below an `h3` or at any weight other than bold — EB Garamond ships 700 only and there is no file behind a lighter serif. Don't add a third family; Red Hat Display's 400–600 variable range covers every non-heading need.
- **Don't** animate a card on hover unless the whole card is genuinely a link. Key the motion to the real interactive element, as `.service-card:has(.service-cta:hover)` does.
- **Don't** invent a radius between the ramp steps (25 / 20 / 16 / 14 / 999 / 50%), and don't ship a square-cornered button.
- **Don't** use Natural Linen or Calm Grey as a text colour on Porcelain, or Calm Grey as a text colour on Midnight Steel — the first two fail AA and the third measures 4.4:1.
- **Don't** fill a surface with Natural Linen. It is punctuation: a dot, a stroke, a star, an underline.
- **Don't** break a grid out of `.container-narrow` to the full 1200px container. Only `.cta-band` goes full width; anything else reads as misalignment rather than as rhythm.
- **Don't** add a fourth breakpoint or a second sticky element. One sticky navbar at `z-index: 1000` and one mobile action bar at `1100` is the whole fixed layer.
- **Don't** put a wrapper `<a>` around a card to make it clickable. Stretch a `::after` from the real title link, so the accessible name stays the title.
