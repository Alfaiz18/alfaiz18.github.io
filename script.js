/* ============================================================
   ALFAIZ KHAN — PORTFOLIO SCRIPT
   Vanilla JS only — no build step, safe for GitHub Pages.
   Sections: Nav behaviour, reveal-on-scroll, hero SVG lines,
   stat counters, project filters, copy-to-clipboard, cursor,
   magnetic buttons, mobile menu.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------
     1. Sticky nav — hide on scroll down, reveal on scroll up
  --------------------------------------------------- */
  const nav = document.querySelector(".site-nav");
  if (nav) {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 40);

      if (y > lastY && y > 160) {
        nav.classList.add("is-hidden");
      } else {
        nav.classList.remove("is-hidden");
      }
      lastY = y;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------
     2. Mobile menu toggle
  --------------------------------------------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------------------------------------------
     3. Active section indicator (scrollspy)
  --------------------------------------------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");

  if (sections.length && navLinks.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ---------------------------------------------------
     4. Reveal-on-scroll (Intersection Observer)
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach((el, i) => {
        el.style.setProperty("--i", i % 8);
        revealObserver.observe(el);
      });
    }
  }

  /* ---------------------------------------------------
     5. Animated stat counters (hero)
  --------------------------------------------------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const animateCount = (el) => {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      if (prefersReducedMotion) {
        el.textContent = target + suffix;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ---------------------------------------------------
     6. Project filters (no reload, animated)
  --------------------------------------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const filter = btn.getAttribute("data-filter");

        projectCards.forEach((card) => {
          const cats = (card.getAttribute("data-category") || "").split(" ");
          const match = filter === "all" || cats.includes(filter);
          card.style.transition = "opacity .35s ease, transform .35s ease";
          if (match) {
            card.classList.remove("is-hidden");
            requestAnimationFrame(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0) scale(1)";
            });
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(12px) scale(0.98)";
            setTimeout(() => {
              if (!cats.includes(filter) && filter !== "all") card.classList.add("is-hidden");
            }, 350);
          }
        });
      });
    });
  }

  /* ---------------------------------------------------
     7. Magnetic buttons (subtle pull toward cursor)
  --------------------------------------------------- */
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0, 0)";
      });
    });
  }

  /* ---------------------------------------------------
     8. Custom cursor — premium lagged glow ring (desktop only)
     Two-piece cursor (outer ring + inner dot) that eases toward
     the pointer with a soft lerp instead of snapping instantly,
     and blooms into an accent-colored ring over interactive elements.
  --------------------------------------------------- */
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.setAttribute("aria-hidden", "true");
    ring.innerHTML = '<span class="cursor-ring-dot"></span>';
    document.body.appendChild(ring);
    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };

    window.addEventListener("mousemove", (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      ring.style.opacity = "1";
    }, { passive: true });

    document.addEventListener("mouseleave", () => { ring.style.opacity = "0"; });

    function tick() {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    document.querySelectorAll("a, button, .project-card, .tech-tile, input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hovering"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hovering"));
    });
  }

  /* ---------------------------------------------------
     9. Site-wide background — dense, physics-based dust field
     Thousands of tiny particles drift slowly and are gently
     displaced by the cursor, then ease back — like dust or
     smoke currents. Runs as one fixed full-viewport canvas behind
     every section on every page, not just the hero. Pure canvas,
     no libraries.
  --------------------------------------------------- */
  (function initParticleField() {
    const canvas = document.createElement("canvas");
    canvas.className = "site-particles";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");

    let width, height, dpr;
    const mouse = { x: -9999, y: -9999, active: false };
    let particles = [];

    const rootStyles = getComputedStyle(document.documentElement);
    const colorWp = rootStyles.getPropertyValue("--accent-wp").trim() || "#7c93ff";
    const colorShopify = rootStyles.getPropertyValue("--accent-shopify").trim() || "#6fbf8a";
    const colorNeutral = "#f5f5f3";

    // Roughly one particle per ~1400px^2 of viewport, capped for performance.
    // Slightly sparser than a hero-only version since this now covers the
    // whole page continuously.
    function particleCount() {
      const area = width * height;
      return Math.min(1800, Math.max(400, Math.round(area / 1400)));
    }

    function makeParticle() {
      const homeX = Math.random() * width;
      const homeY = Math.random() * height;
      const roll = Math.random();
      return {
        homeX, homeY,
        x: homeX, y: homeY,
        vx: 0, vy: 0,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: 0.04 + Math.random() * 0.1,
        r: Math.random() * 1.2 + 0.35,
        alpha: Math.random() * 0.4 + 0.12,
        color: roll < 0.42 ? colorWp : roll < 0.8 ? colorNeutral : colorShopify,
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: particleCount() }, makeParticle);
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // slow ambient drift — the particle's "home" wanders gently
        p.driftAngle += (Math.random() - 0.5) * 0.06;
        p.homeX += Math.cos(p.driftAngle) * p.driftSpeed;
        p.homeY += Math.sin(p.driftAngle) * p.driftSpeed;
        if (p.homeX < -20) p.homeX = width + 20;
        if (p.homeX > width + 20) p.homeX = -20;
        if (p.homeY < -20) p.homeY = height + 20;
        if (p.homeY > height + 20) p.homeY = -20;

        // spring pulling current position toward the drifting home point
        const springK = 0.02;
        p.vx += (p.homeX - p.x) * springK;
        p.vy += (p.homeY - p.y) * springK;

        // cursor displacement — smooth radial falloff, like current in water
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const radius = 160;
          if (dist < radius) {
            const falloff = 1 - dist / radius;
            const force = falloff * falloff * 2.4;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // damping keeps motion smooth and organic instead of jittery
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(step);
    }

    // Reduced-motion: render the field once as a static, gently visible
    // texture instead of a continuous animation loop.
    function stepOnce() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.homeX, p.homeY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });
    document.addEventListener("mouseleave", () => { mouse.active = false; });

    window.addEventListener("resize", () => {
      resize();
      if (prefersReducedMotion) stepOnce();
    }, { passive: true });

    resize();
    if (prefersReducedMotion) {
      stepOnce();
    } else {
      requestAnimationFrame(step);
    }
  })();

  /* ---------------------------------------------------
     10. Footer year
  --------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
