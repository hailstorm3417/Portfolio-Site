# Portfolio Site

Personal portfolio and journal for Halie — a static site, no build step.
Open `index.html` in a browser and it runs.

## Structure

```
index.html          Homepage — hero, bio, work index, writing, Q&A, contact
journal.html        Both journal posts
case-studies.html   All four roles
styles.css          Shared palette and repeated components
homepage.js         Homepage interactivity
case-studies.js     Medbridge workstream carousel
assets/             Portrait
uploads/            Case study imagery
```

Pages are plain HTML with a shared stylesheet. The only JavaScript is the
per-page interactivity below — no framework, no bundler, no dependencies.

## Interactivity

**Homepage** (`homepage.js`)
- Hero title glitches between "Director of Product Design" and
  "Design Engineer" every 5s — slice displacement plus rose and sage
  colour ghosts, stepped rather than eased
- "How I got here" expands on click
- Hovering a role in The Work swaps the preview image
- Recommendation quotes paginate two at a time
- Q&A answers switch by tab

**Case studies** (`case-studies.js`)
- Medbridge workstreams switch by tab or arrow

## Local preview

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Design source

Built from mockups designed in Claude Design. The original `.dc.html`
prototypes are kept in the handoff bundle, not in this repo.

## Still open

- Resume download and "view in browser" links point to `#` — need the PDF
- LinkedIn links point to `#` — need the URL
- Medbridge "Keystone" panel and three workstream tabs (Educate, Growth,
  GTM) are placeholder copy from the mockup
- Striped blocks mark imagery not yet supplied: the CareCloud scheduler,
  the RBI micro-brand and franchisee portal, a Storybook screen, and two
  slots in "Crossing the Chasm"
- Several `uploads/` files are very large (two GIFs are ~5.7MB each) and
  should be compressed or converted to video before this goes live
