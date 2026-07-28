# Alfaiz Khan — Portfolio

Static HTML / CSS / JS portfolio. No build step, no framework, no npm required.

## Structure

```
portfolio/
├── index.html
├── css/
│   ├── style.css        Core tokens, layout, components
│   ├── dashboard.css    WordPress & Shopify admin styles
│   └── responsive.css   Breakpoints & motion prefs
├── js/
│   ├── projects.js      All project + skill data (edit here)
│   ├── dashboard.js     Renders WP + Shopify dashboards
│   ├── animations.js    Reveal, counters, tilt, cursor glow
│   └── main.js          Loader, nav, back-to-top
└── assets/
    ├── images/
    └── icons/
```

## Deploy to GitHub Pages

Upload the contents of this `portfolio/` folder to the root of your GitHub Pages
repo (or push into a `gh-pages` branch). No build, no server.

## Editing projects

All content lives in `js/projects.js`:

- `WORDPRESS_PROJECTS[]` — WordPress case studies
- `SHOPIFY_PROJECTS[]` — Shopify case studies
- `SKILLS[]` — Skill cards

Change a value, refresh the page. Everything else is generated dynamically.
