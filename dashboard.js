/* ============================================
   Dashboard renderers — WordPress & Shopify
   ============================================ */

(function () {
  // --- WordPress dashboard -------------------------------------------------
  const wpMenu = document.getElementById("wpProjectMenu");
  const wpContent = document.getElementById("wpContent");

  function renderWpMenu(activeSlug) {
    wpMenu.innerHTML = WORDPRESS_PROJECTS.map(
      (p) =>
        `<div class="wp-submenu__item ${p.slug === activeSlug ? "active" : ""}" data-slug="${p.slug}">${p.name}</div>`
    ).join("");
    wpMenu.querySelectorAll(".wp-submenu__item").forEach((el) => {
      el.addEventListener("click", () => renderWpProject(el.dataset.slug));
    });
  }

  function renderWpProject(slug) {
    const p = WORDPRESS_PROJECTS.find((x) => x.slug === slug) || WORDPRESS_PROJECTS[0];
    renderWpMenu(p.slug);

    wpContent.innerHTML = `
      <div class="wp-fade">
        <div class="wp-content__head">
          <h1 class="wp-content__title">
            ${p.name}
            <small>Edit Project · ID #${1000 + WORDPRESS_PROJECTS.indexOf(p)}</small>
          </h1>
          <div class="wp-content__actions">
            <a class="wp-btn" target="_blank" rel="noopener" href="${p.url}">View Live</a>
            <button class="wp-btn wp-btn--primary">Update</button>
          </div>
        </div>

        <div class="wp-meta">
          <span class="wp-tag wp-tag--status">● ${p.status}</span>
          <span class="wp-tag">Client: ${p.client}</span>
          <span class="wp-tag">Industry: ${p.industry}</span>
          <span class="wp-tag">Type: ${p.type}</span>
          <span class="wp-tag">Delivered: ${p.date}</span>
          <span class="wp-tag">Duration: ${p.duration}</span>
        </div>

        <div class="wp-grid">
          <div>
            <div class="wp-hero-img"><span>${p.name}</span></div>

            <div class="wp-postbox">
              <div class="wp-postbox__head">Project Description</div>
              <div class="wp-postbox__body">${p.description}</div>
            </div>

            <div class="wp-postbox">
              <div class="wp-postbox__head">Features Delivered</div>
              <div class="wp-postbox__body">
                <ul class="wp-list">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
              </div>
            </div>

            <div class="wp-postbox">
              <div class="wp-postbox__head">Responsibilities</div>
              <div class="wp-postbox__body">
                <ul class="wp-list">${p.responsibilities.map((f) => `<li>${f}</li>`).join("")}</ul>
              </div>
            </div>

            <div class="wp-postbox">
              <div class="wp-postbox__head">Challenges Solved</div>
              <div class="wp-postbox__body">${p.challenges}</div>
            </div>
          </div>

          <aside>
            <div class="wp-postbox">
              <div class="wp-postbox__head">Publish</div>
              <div class="wp-postbox__body" style="display:flex;flex-direction:column;gap:8px;">
                <div><strong>Status:</strong> ${p.status}</div>
                <div><strong>Visibility:</strong> Public</div>
                <div><strong>Delivered:</strong> ${p.date}</div>
                <a class="wp-btn wp-btn--primary" target="_blank" rel="noopener" href="${p.url}">Open Site ↗</a>
              </div>
            </div>

            <div class="wp-postbox">
              <div class="wp-postbox__head">Performance</div>
              <div class="wp-postbox__body">
                <div class="wp-stats">
                  <div class="wp-stat"><div class="wp-stat__num">${p.performance.speed}</div><div class="wp-stat__label">Speed</div></div>
                  <div class="wp-stat"><div class="wp-stat__num">${p.performance.seo}</div><div class="wp-stat__label">SEO</div></div>
                  <div class="wp-stat"><div class="wp-stat__num">${p.performance.a11y}</div><div class="wp-stat__label">A11y</div></div>
                  <div class="wp-stat"><div class="wp-stat__num">${p.performance.best}</div><div class="wp-stat__label">Best</div></div>
                </div>
              </div>
            </div>

            <div class="wp-postbox">
              <div class="wp-postbox__head">Tech Used</div>
              <div class="wp-postbox__body">
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                  ${p.tech.map((t) => `<span class="wp-tag">${t}</span>`).join("")}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  if (wpMenu && wpContent) {
    renderWpProject(WORDPRESS_PROJECTS[0].slug);
  }

  // --- Shopify dashboard ---------------------------------------------------
  const shMenu = document.getElementById("shProjectMenu");
  const shContent = document.getElementById("shContent");

  function renderShMenu(activeSlug) {
    shMenu.innerHTML = SHOPIFY_PROJECTS.map(
      (p) =>
        `<div class="sh-subnav__item ${p.slug === activeSlug ? "active" : ""}" data-slug="${p.slug}">${p.name}</div>`
    ).join("");
    shMenu.querySelectorAll(".sh-subnav__item").forEach((el) => {
      el.addEventListener("click", () => renderShProject(el.dataset.slug));
    });
  }

  function randomBars(n, seed) {
    const arr = [];
    let s = seed || 7;
    for (let i = 0; i < n; i++) {
      s = (s * 9301 + 49297) % 233280;
      arr.push(30 + (s / 233280) * 70);
    }
    return arr;
  }

  function renderShProject(slug) {
    const p = SHOPIFY_PROJECTS.find((x) => x.slug === slug) || SHOPIFY_PROJECTS[0];
    renderShMenu(p.slug);

    const bars = randomBars(14, p.name.length * 3);

    shContent.innerHTML = `
      <div class="sh-fade">
        <div class="sh-header">
          <div>
            <h1>${p.name}</h1>
            <div class="sh-header__sub">${p.industry} · ${p.theme} · Launched ${p.date}</div>
          </div>
          <div class="sh-header__actions">
            <a class="sh-btn" target="_blank" rel="noopener" href="${p.url}">View store ↗</a>
            <button class="sh-btn sh-btn--primary">Save</button>
          </div>
        </div>

        <div class="sh-stats">
          <div class="sh-stat">
            <div class="sh-stat__label">🛒 Products</div>
            <div class="sh-stat__num">${p.stats.products}</div>
            <div class="sh-stat__delta">+${Math.round(p.stats.products * 0.12)} this month</div>
          </div>
          <div class="sh-stat">
            <div class="sh-stat__label">📂 Collections</div>
            <div class="sh-stat__num">${p.stats.collections}</div>
            <div class="sh-stat__delta">Structured</div>
          </div>
          <div class="sh-stat">
            <div class="sh-stat__label">⚡ Speed score</div>
            <div class="sh-stat__num">${p.stats.speed}</div>
            <div class="sh-stat__delta">Core Web Vitals</div>
          </div>
          <div class="sh-stat">
            <div class="sh-stat__label">📈 Conversion lift</div>
            <div class="sh-stat__num">${p.stats.conversionLift}</div>
            <div class="sh-stat__delta">vs previous theme</div>
          </div>
        </div>

        <div class="sh-grid">
          <div>
            <div class="sh-hero"><span>${p.name}</span></div>

            <div class="sh-card">
              <div class="sh-card__head"><h3>Overview</h3><span class="sh-pill">${p.status}</span></div>
              <div class="sh-card__body">${p.description}</div>
            </div>

            <div class="sh-card">
              <div class="sh-card__head"><h3>Sales, last 14 days</h3><span class="sh-pill sh-pill--info">Demo data</span></div>
              <div class="sh-card__body">
                <div class="sh-bars">
                  ${bars.map((b) => `<div class="sh-bars__bar" style="height:${b}%"></div>`).join("")}
                </div>
              </div>
            </div>

            <div class="sh-card">
              <div class="sh-card__head"><h3>Custom Features</h3></div>
              <div class="sh-card__body">
                <ul class="sh-list">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
              </div>
            </div>

            <div class="sh-card">
              <div class="sh-card__head"><h3>Liquid Customisation</h3></div>
              <div class="sh-card__body">
                <ul class="sh-list">${p.liquid.map((f) => `<li>${f}</li>`).join("")}</ul>
              </div>
            </div>
          </div>

          <aside>
            <div class="sh-card">
              <div class="sh-card__head"><h3>Storefront</h3></div>
              <div class="sh-card__body">
                <div style="display:flex;flex-direction:column;gap:6px;">
                  <div><strong>Theme:</strong> ${p.theme}</div>
                  <div><strong>Industry:</strong> ${p.industry}</div>
                  <div><strong>Status:</strong> ${p.status}</div>
                  <a class="sh-btn sh-btn--primary" style="margin-top:8px" target="_blank" rel="noopener" href="${p.url}">Open store ↗</a>
                </div>
              </div>
            </div>

            <div class="sh-card">
              <div class="sh-card__head"><h3>Apps Installed</h3></div>
              <div class="sh-card__body">
                <table class="sh-table">
                  <tbody>
                    ${p.apps.map((a) => `<tr><td>${a}</td><td style="text-align:right"><span class="sh-pill">Active</span></td></tr>`).join("")}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="sh-card">
              <div class="sh-card__head"><h3>Tech Stack</h3></div>
              <div class="sh-card__body">
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                  ${p.tech.map((t) => `<span class="sh-pill sh-pill--info">${t}</span>`).join("")}
                </div>
              </div>
            </div>

            <div class="sh-card">
              <div class="sh-card__head"><h3>SEO Improvements</h3></div>
              <div class="sh-card__body">
                <ul class="sh-list">${p.seo.map((s) => `<li>${s}</li>`).join("")}</ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    `;

    // Animate the bar chart in
    requestAnimationFrame(() => {
      const barsEls = shContent.querySelectorAll(".sh-bars__bar");
      barsEls.forEach((b, i) => {
        const h = b.style.height;
        b.style.height = "0%";
        setTimeout(() => (b.style.height = h), 60 * i);
      });
    });
  }

  if (shMenu && shContent) {
    renderShProject(SHOPIFY_PROJECTS[0].slug);
  }

  // --- Skills grid ---------------------------------------------------------
  const skillsGrid = document.getElementById("skillsGrid");
  if (skillsGrid) {
    skillsGrid.innerHTML = SKILLS.map(
      (s) => `<div class="skill reveal-up"><div class="skill__ico">${s.ico}</div><div class="skill__name">${s.name}</div></div>`
    ).join("");
  }
})();
