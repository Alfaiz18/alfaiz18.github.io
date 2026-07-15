# Alfaiz Khan — Portfolio

A static, dependency-free portfolio site for **Alfaiz Khan, Senior WordPress & Shopify Developer**, built for GitHub Pages (no build step, no framework — plain HTML/CSS/JS).

Live target: `https://alfaiz18.github.io/`

---

## 1. Structure

```
portfolio/
├── index.html              → homepage (hero, about, skills, experience, projects, contact)
├── style.css                → all styles (single stylesheet, CSS variables/design tokens at the top)
├── script.js                 → all behaviour (nav, filters, reveal animations, counters, copy-to-clipboard)
├── robots.txt
├── sitemap.xml
├── projects/                 → one case-study page per project (18 pages)
│   ├── cometrank.html
│   ├── planet-ganges.html
│   └── ... (see full list below)
├── assets/
│   ├── images/                → portrait.jpg, og-cover.jpg (add these)
│   ├── projects/               → one preview image per project (add these)
│   ├── icons/                  → favicon.svg (placeholder provided)
│   ├── logos/                  → optional client/company logos
│   └── fonts/                  → optional self-hosted fonts (Google Fonts CDN used by default)
├── resume/
│   └── resume.pdf              → PLACEHOLDER — replace with your real resume
└── README.md
```

## 2. Deploying to GitHub Pages

1. Push the contents of this `portfolio/` folder to the root of your `alfaiz18.github.io` repository (or to a `docs/` folder / `gh-pages` branch, and set that as the Pages source in repo settings).
2. In the repo, go to **Settings → Pages** and confirm the source branch/folder.
3. Wait a minute for the build, then visit `https://alfaiz18.github.io/`.

No `npm install`, no build command, no config — every file works as-is once uploaded.

## 3. What's real vs. placeholder

Per your instructions, **nothing was invented**. Everything you supplied (name, title, stats, skills, company names, project names) is used exactly as given. Anywhere information wasn't provided, a clearly marked placeholder was left instead — search the codebase for `[Add` or `TODO` to find every one. Checklist:

- [ ] **Resume** — replace `resume/resume.pdf` with your real resume (a placeholder PDF is currently there).
- [ ] **Portrait** — add `assets/images/portrait.jpg` (About section).
- [ ] **Social share image** — add `assets/images/og-cover.jpg` (1200×630).
- [ ] **Hero intro paragraph** — `index.html`, hero section.
- [ ] **About bio paragraphs** — `index.html`, about section.
- [ ] **Experience** — role titles, employment dates, and descriptions for Brandshark and EvenDigit (`index.html`, experience section). Only the two company names were supplied.
- [ ] **Contact details** — real email, phone, LinkedIn URL (`index.html`, contact section + footer + `mailto:` link + JSON-LD).
- [ ] **Per-project content** — each page in `projects/` has placeholders for: description, role, year, live URL, technologies, challenges, solutions, screenshots, and performance/SEO scores. Fill these in with real details per project.
- [ ] **Project preview images** — add one image per project to `assets/projects/` (see `assets/projects/README.txt` for exact filenames).
- [ ] **"Visit Website" links** — currently `href="#"` on every project card and case-study page; add real live URLs once confirmed.
- [ ] **Social links** — footer LinkedIn/GitHub links are placeholders.

## 4. Project categorization note

You listed **Betterhood** under both the WordPress and Shopify project lists, so it's tagged and filterable as "WordPress + Shopify" everywhere (card badge, filter, case-study page). All other projects are tagged with the single platform you listed them under.

The project **filters** on the homepage use `All / WordPress / Shopify / WordPress + Shopify` — these map directly to the platform data you provided. Additional filter ideas mentioned in the brief (Development, Animations, AI, SEO, Headless, Performance) weren't wired up, since no project was actually specified as belonging to those categories — wiring them up with made-up tags would have meant guessing. If you want them, tag the relevant `.project-card` elements with an extra value in `data-category` (e.g. `data-category="shopify seo"`) and add a matching `<button class="filter-btn" data-filter="seo">SEO</button>` — the existing JS in `script.js` already supports any number of categories with no changes needed.

## 5. Full project list (18 pages)

**WordPress:** CometRank, Planet Ganges, Pelazzio, Procloz, Fidelis Pet, Softude AI, EvenDigit, Alhambra School of Music, India Talents, Trifid
**Shopify:** Oulac, Elan India, Bear Fruit Jewelry, Yokkao Asia, Ageless Zen, Pluscenta, PetGlow
**WordPress + Shopify:** Betterhood

Each project page includes: hero, overview, my role, technologies, challenges, solutions, screenshot grid, performance/SEO/responsive metrics, a visit-website CTA, and previous/next project navigation (pages are chained in the order listed above, wrapping from the last back to the first).

## 6. Technical notes

- **Fonts:** Syne (display), DM Sans (body), Space Mono (labels/mono) — loaded from Google Fonts via `<link>` tags. Self-host from `assets/fonts/` instead if you prefer (see the README in that folder).
- **Animations:** all hand-rolled with vanilla JS — `IntersectionObserver` for scroll reveals and the scrollspy nav indicator, the Web Animations API for the hero's animated SVG line background and stat counters, and CSS transitions for hover/filter states. No external animation library is required, so there's nothing to fail to load.
- **Nav:** hides on scroll down, reveals on scroll up, and highlights the active section as you scroll, per the brief.
- **Filters:** the project grid filters instantly with a CSS transition — no page reload, no fake routing.
- **Accessibility:** semantic landmarks (`nav`, `main`, `footer`), a skip-to-content link, visible focus states on every interactive element, `aria-label`/`aria-expanded` on the mobile menu toggle, and a `prefers-reduced-motion` fallback that disables all decorative motion (reveal animations, cursor, magnetic buttons, hero lines, counters) site-wide.
- **Performance:** no build tooling, no JS framework, no icon fonts, no unused CSS libraries — just two small files (`style.css`, `script.js`) and system-level lazy-loading is left ready for you to add `loading="lazy"` to `<img>` tags once real images are in place (all current `<img>` slots are still placeholders, so this wasn't added prematurely against empty containers).
- **SEO:** per-page `<title>`, meta description, canonical URL, Open Graph + Twitter Card tags, `robots.txt`, `sitemap.xml`, and a `Person` JSON-LD schema block on the homepage (currently using only confirmed facts — extend `sameAs`/`email` once you provide them).

## 7. Editing content later

- **Add a new project:** duplicate any file in `projects/`, update the text/links, add a matching `.project-card` block in `index.html`, and add the new URL to `sitemap.xml`.
- **Change colors/fonts:** everything is driven by the CSS custom properties at the top of `style.css` (`:root { ... }`) — change a value once, it updates everywhere.
- **Change copy:** all placeholder text is wrapped in `[Add ...]` or preceded by an HTML `<!-- TODO -->` comment so it's easy to find and replace.
