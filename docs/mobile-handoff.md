# Handoff: Mobile portfolio (390pt)

## Overview
Mobile version of a personal portfolio site for Halie — a design leader moving back to IC design-engineering work. Three screens: **Homepage**, **Case study (Medbridge)**, and **Journal post (Crossing the Chasm)**. The desktop version of these pages already exists as separate prototypes; this handoff covers the mobile layouts and the interactions unique to them.

## About the design files
`Mobile Screens.dc.html` in this bundle is a **design reference created in HTML** — a prototype showing intended look and behavior, not production code to copy. All three screens live side-by-side in one file, each inside a 390px-wide card, so you can see them together.

The task is to **recreate these layouts in the target codebase** using its existing framework, component library and conventions (React, Next, Vue, SwiftUI, whatever is there). If no environment exists yet, pick the framework that fits the project and implement there. The prototype's internal mechanics (inline styles, a small state class) are prototype scaffolding — ignore them and use the codebase's patterns.

Also included for reference: `Portfolio Homepage.dc.html`, `Case Studies.dc.html`, `Journal.dc.html` — the desktop counterparts. Use them to keep copy and structure consistent; **do not** treat their layout as the mobile layout.

## Fidelity
**High fidelity.** Colors, type sizes, weights, spacing and interactions are final. Recreate pixel-accurately at 390pt width, using the codebase's existing primitives where they match. Touch targets are 44pt minimum throughout — keep that.

## Design tokens

### Color
| Role | Value |
| --- | --- |
| Page background (card surface) | `#f6f2ee` |
| Canvas behind the phone cards (prototype only) | `#e6e0dc` |
| Ink / primary text | `#423b3f` |
| Accent (plum) | `#6a5567` |
| Body text | `rgba(66,59,63,.88)` |
| Muted text / eyebrows | `rgba(66,59,63,.5)` – `rgba(66,59,63,.62)` |
| Hairline rule | `rgba(66,59,63,.14)` (rows), `rgba(66,59,63,.22)` (section rules) |
| Warm panel (writing cards, contact block) | `#efe9e2` |
| Pink panel (quote card, keystone, stat panel) | `#efe6e9` |
| Row hover tint | `#efe6e9` |
| Text on plum | `#f6f2ee`, body `rgba(246,242,238,.8–.84)`, eyebrow `rgba(246,242,238,.55)` |

### Type
Single family: **Archivo** (Google Fonts), weights 200 / 300 / 400.

| Use | Size / line-height / weight |
| --- | --- |
| Hero H1 | 52px / 1.02 / 200, `letter-spacing:-.005em` ("Halie." is 400) |
| Hero subtitle (rotating) | 20px / 1.3 / 300, `letter-spacing:.01em`, color `#6a5567` |
| Case-study H1 | 44px / 1.04 / 200 |
| Journal H1 | 40px / 1.08 / 200 |
| Section H2 | 34px / 1.1 / 200 |
| Chapter H2 | 32px / 1.15 / 200 (28px on the plum chapter-two panel) |
| H3 / card title | 22–23px / 1.25–1.3 / 300 |
| Lede paragraph | 18px / 1.6 / **400** |
| Body | 15.5px / 1.8 / 400 (16px / 1.85 in journal post) |
| Body on plum (chapter two) | 15.5px / 1.8 / **300** |
| Pull statement | 21px / 1.5 / 200 |
| Eyebrow / label | 10.5–11px, weight 300–400, `letter-spacing:.14–.24em`, uppercase |
| Work row title | 24px / 1.2 / 300 |
| Button label | 13px / 400, `letter-spacing:.06–.08em`, uppercase |

### Spacing, radius, shadow
- Horizontal page gutter: **24px**. Full-bleed panels run edge to edge with 24px inner padding.
- Vertical section rhythm: 40–52px top/bottom per section; 48px on colored panels.
- Radius: **8px** everywhere (cards, images, buttons, panels). No other radius.
- No shadows inside the screens. The phone card in the prototype has one; that's presentation chrome, not part of the design.
- Hairline dividers are 1px.

## Screens

### 1. Homepage

Order of sections, top to bottom:

1. **Hero** — `padding:40px 24px 0`, `position:relative; z-index:2; pointer-events:none`.
   H1 reads "Hi, I'm" / line break / "Halie." Below it, 20px block (min-height 26px) holding the rotating subtitle.
2. **Portrait** — `assets/halie-portrait.png`, width **78%**, right-aligned (`margin-left:auto`), `mix-blend-mode:multiply`, in a wrapper with `position:relative; z-index:1; margin-top:-56px` so the hero type **overlaps the top of the portrait**. This overlap is intentional and load-bearing for the layout.
3. **Intro copy** — 24px gutter, 1px rule above, two paragraphs at 15.5px/1.75, `gap:18px`, `padding:28px 0 48px`.
4. **"How I got here"** — full-bleed **plum** (`#6a5567`) panel, `padding:48px 24px 52px`. Eyebrow, then a 23px/1.45/200 opening paragraph in `#f6f2ee`, then a collapsible block of four paragraphs, then a full-width outlined toggle button ("Read the rest" / "Collapse"), min-height 48px, 1px border `rgba(246,242,238,.45)`; hover fills `#f6f2ee` with plum text.
   The collapse animates `max-height` **plus a gradient mask** so the text fades in from the top rather than hard-clipping: mask `linear-gradient(180deg,transparent 0px,#000 200px,#000 100%)`, mask-size `100% 900px`, mask-position moving from `0 -900px` (closed) to `0 -200px` (open). Open: max-height 640px, 0.6s max-height / 0.7s mask, `cubic-bezier(.45,0,.55,1)`. Close: 0.45s both.
5. **"The work"** — H2, then four rows in **reverse chronological order**:
   | Eyebrow | Title | Thumbnail |
   | --- | --- | --- |
   | Director · 2023–Present | Medbridge | `object-fit:contain`, background `#efe9e2` |
   | Product Designer · 2021–2023 | Optimize Health | `object-fit:cover` |
   | Brand Lead · 2020–2021 | Restaurant Brands Int'l | `object-fit:cover` |
   | UX Designer · 2018–2020 | CareCloud | `object-fit:cover` |

   Each row: `display:block; padding:20px 0`, 1px top rule; the last row also gets a bottom rule. Hover tints `#efe6e9`. Every row carries its own 150px-tall thumbnail (radius 8px) — unlike desktop, where one shared preview panel updates on hover. Rows link to the case study.
6. **"Writing" — carousel.** Header row: H2 "Writing" on the left, two 44×44px arrow buttons on the right (`←` / `→`), 8px gap, 1px border `rgba(66,59,63,.28)`, radius 8px, hover fills plum with `#f6f2ee`. Below: a horizontal scroller (`display:flex; gap:14px; overflow-x:auto`, scrollbar hidden) with two cards, each `flex:none; width:84%`, `padding:24px 22px`, background `#efe9e2`, radius 8px, 1px transparent border that turns `#6a5567` on hover. Card content: eyebrow, 22px/1.25/300 title, 14px/1.7 summary, "Read →" in plum 11px uppercase.
   Arrows scroll by `0.86 × container width`, clamped to `[0, scrollWidth − clientWidth]`. **Do not use CSS scroll-snap or `scroll-behavior:smooth`** — in the prototype's environment both silently cancelled programmatic scrolling. In a real app, native smooth scrolling is fine if you verify it works; otherwise assign `scrollLeft` directly.
7. **"Working with me"** — header row with H2 and the same 44×44 arrow pair. Below, one quote card at a time: background `#efe6e9`, radius 8px, `padding:22px 22px 20px`, min-height 190px, quote at 13.5px/1.75, then name (14px) and role (12px/300, muted). Under it, four dot indicators: 20×3px pills, radius 2px, 6px gap; active `#6a5567`, inactive `rgba(66,59,63,.25)`, 0.2s background transition. Arrows wrap around.
8. **Q&A** — a horizontal pill scroller (5 tabs: Day-to-day, A belief, With engineers, What scares me, Outside work) above a `min-height:280px` answer block: question at 21px/1.4/300, answer at 15.5px/1.8. Pill spec under *Pills* below. Selecting a pill must scroll the row so the selected pill is fully visible (see *Interactions*).
9. **Contact** — full-bleed `#efe9e2`, `padding:48px 24px 52px`. 34px/1.2/200 statement, then three stacked link rows (Email, Phone, LinkedIn) each with a 1px top rule (last also bottom), label 10.5px uppercase + value 18px/300; hover turns the rule plum. Then two full-width buttons, 10px gap, min-height 48px, radius 8px: primary plum fill with `↓` pushed right (hover `#423b3f`), secondary outlined `rgba(66,59,63,.45)` (hover fills `#423b3f`).

### 2. Case study — Medbridge

1. **Back link** — "← Back", 11.5px uppercase, min-height 44px, `padding:24px 24px 0`.
2. **Header** — eyebrow "Director of Product Design · 2023 – Present" in plum; H1 "Medbridge" 44px/200; **lede paragraph at 18px/1.6 weight 400** (same weight as the body paragraph that follows — deliberate, they should not differ); then a 15.5px/1.8 paragraph.
3. **Hero image** — full-width, radius 8px, `padding:32px 24px 0`.
4. **Chapter one — "The workstreams"** — 1px rule, eyebrow, H2 32px/200, then a pill scroller with four tabs: **Pathways, Educate, Growth, GTM**. Selected tab drives: H3 title (23px/1.25/300), three paragraphs (15.5px/1.8; the third is a short punch line and may be empty), and a full-width image with radius 8px and **no background fill**. No caption under the image.
5. **Chapter two** — full-bleed plum panel, `margin-top:40px; padding:44px 24px 48px`. Eyebrow, H2 28px/1.25/200 "Building the team I wanted to lead", three paragraphs at 15.5px/1.8 **weight 300** (lighter than the rest of the page's body copy — intentional on the dark ground).
6. **Chapter three** — eyebrow, H2 32px/200, one long paragraph, then a 160px placeholder tile (radius 8px, `repeating-linear-gradient(135deg,#ede4e6 0 8px,#e4d8dc 8px 16px)`) labelled "storybook or internal tool shot". **Needs a real asset before ship.**
7. **Keystone panel** — `#efe6e9`, radius 8px, `padding:28px 24px`: plum eyebrow "Keystone", H3 23px/1.3/200, then two labelled blocks ("The what", "The why") with 14.5px/1.8 copy. Copy is **lorem ipsum placeholder** — needs real content.
8. **Contact** — same as homepage but with only Email and Phone rows and a single primary button.

Workstream tab content: only **Pathways** has final copy (the RFP story ending "We won."). Educate, Growth and GTM are lorem ipsum placeholders.

### 3. Journal post — Crossing the Chasm

1. Back link "← Back to writing".
2. Header: eyebrow "Writing", H1 40px/1.08/200, standfirst 18px/1.6/300, 1px rule.
3. Two opening paragraphs, 16px/1.85, `gap:22px`.
4. **Stat panel** — `#efe6e9`, radius 8px, `padding:28px 24px`: label, then a 2-column grid (`gap:24px 20px`) of six stats — number 36px/1/200 in plum, caption 10.5px/1.5 uppercase muted. Values: 61 production-ready components · 488 CSS custom properties · 722 Storybook stories · 88 unit test files · 193 releases · 7.5.1 current version. Below, a 170px placeholder tile ("storybook screenshot") — **needs a real asset**.
5. One more paragraph, then a pull statement: 21px/1.5/200 on `#efe9e2`, radius 8px, `padding:26px 24px`.
6. A mockup note in 11px uppercase muted type — **prototype scaffolding, drop it in production.**
7. Contact block, same as the case study's.

## Shared patterns

### Pills (Q&A tabs and workstream tabs)
Horizontal scroller: `display:flex; gap:8px; overflow-x:auto; padding-bottom:4px`, scrollbar hidden (`scrollbar-width:none`, `::-webkit-scrollbar{display:none}`).
Pill: `flex:none; white-space:nowrap; min-height:44px; padding:12px 16px` (18px for the Q&A row), radius 8px, 13px/400 Archivo, `letter-spacing:.04em`, `transition:all .2s ease`.
- Unselected: 1px border `rgba(66,59,63,.2)`, transparent background, text `#423b3f`.
- Selected: border and background `#6a5567`, text `#f6f2ee`.

### Arrow buttons
44×44px, radius 8px, 1px border `rgba(66,59,63,.28)`, transparent, 14px glyph. Hover: background and border `#6a5567`, text `#f6f2ee`.

## Interactions & behavior

| Interaction | Behavior |
| --- | --- |
| Hero subtitle | Cycles between "Director of Product Design" and "Design Engineer" every 5s. On each cycle: two offset ghost copies fade in (`#c4a7b6` at `translate(-3px,-1px)`, `#93a49c` at `translate(3px,1px)`, both `mix-blend-mode:multiply`, opacity ~0.9), the text swaps at 300ms, ghosts clear at 820ms. A brief chromatic-split glitch, not a slide or fade. |
| "How I got here" toggle | Expands/collapses with the masked max-height animation described above. Label toggles "Read the rest" / "Collapse". |
| Work rows | Tap → case study. Hover tint `#efe6e9`. |
| Writing carousel | Arrows scroll ±0.86 × container width, clamped at both ends. Touch drag scrolls natively. No snap. |
| Testimonial carousel | Arrows step the index with wraparound (4 quotes); dots jump directly. |
| Q&A tabs | Tap sets the visible question/answer **and auto-scrolls the pill row** so the tapped pill sits fully inside the viewport with 16px padding: if its right edge exceeds `scrollLeft + clientWidth − 16`, set `scrollLeft = right − clientWidth + 16`; if its left edge is under `scrollLeft + 16`, set `scrollLeft = left − 16`. |
| Workstream tabs | Same auto-scroll rule. This matters most for the last pill ("GTM"), which is otherwise clipped. |
| Focus states | Give every interactive element a visible keyboard focus ring in the accent (`2px solid #6a5567`, offset 2px). The prototype leans on hover; don't ship without focus states. |

## State
- `heroTitleIndex` (0/1) + `glitching` (bool) — driven by a 5s interval; clear the interval and its two timeouts on unmount.
- `howIGotHereOpen` (bool).
- `quoteIndex` (0–3).
- `qaTabIndex` (0–4).
- `workstreamTabIndex` (0–3).
No data fetching. All copy is static; the quote list, Q&A list and workstream list are arrays in the prototype's script block — lift them into content files or a CMS as the codebase prefers.

## Assets
All referenced files ship in this bundle under `assets/` and `uploads/`.

| File | Used for |
| --- | --- |
| `assets/halie-portrait.png` | Hero portrait (multiply blend) |
| `uploads/assets-1787975245904-t1i7.png` | Medbridge thumbnail (contain, warm background) |
| `uploads/assets-1787975017498-jzsn.gif` | Optimize Health thumbnail |
| `uploads/assets-1787974993322-50lf.avif` | RBI thumbnail |
| `uploads/assets-1787974982619-ut64.gif` | CareCloud thumbnail |
| `uploads/assets-1787975263498-fqw4.png` | Case-study hero (Pathways collection builder) |
| `uploads/assets-1787975191831-qtgz.png` | Workstream: Pathways |
| `uploads/assets-1787975326295-yi88.png` | Workstream: Educate |
| `uploads/assets-1787975255512-1u83.png` | Workstream: Growth |
| `uploads/assets-1787975331540-puu4.png` | Workstream: GTM |

Two striped placeholder tiles (chapter three, journal stat panel) have **no asset yet** — leave a slot.

Font: Archivo from Google Fonts, weights 200/300/400 — self-host if the codebase does that for other fonts.

## Open items before ship
- Real screenshots for the two placeholder tiles.
- Real copy for Educate / Growth / GTM workstreams and the Keystone panel (currently lorem ipsum).
- Resume PDF and LinkedIn URLs (buttons currently link to anchors).
- Remove the prototype-only "mockup note" paragraph in the journal screen.

## Files in this bundle
- `Mobile Screens.dc.html` — the mobile designs (all three screens).
- `Portfolio Homepage.dc.html`, `Case Studies.dc.html`, `Journal.dc.html` — desktop references for copy and structure.
- `assets/`, `uploads/` — images used by the designs.
