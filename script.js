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
     7. Copy-to-clipboard on contact cards
     The card itself is a real mailto:/tel: link (so it's clickable
     and works without JS); the nested .copy-btn copies the value
     without triggering navigation.
  --------------------------------------------------- */
  document.querySelectorAll(".copy-btn[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const value = btn.getAttribute("data-copy");
      const flag = btn.closest(".contact-card")?.querySelector(".copy-flag");
      try {
        await navigator.clipboard.writeText(value);
        if (flag) {
          flag.textContent = "Copied";
          flag.classList.add("is-shown");
          setTimeout(() => flag.classList.remove("is-shown"), 1600);
        }
      } catch (err) {
        /* Clipboard may be unavailable — fail silently, link still works */
      }
    });
  });

  /* ---------------------------------------------------
     8. Magnetic buttons (subtle pull toward cursor)
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
     9. Custom cursor dot (desktop, decorative only)
  --------------------------------------------------- */
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    const cursor = document.createElement("div");
    cursor.className = "cursor-dot";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);

    window.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }, { passive: true });

    document.querySelectorAll("a, button, .project-card").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hovering"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hovering"));
    });
  }

  /* ---------------------------------------------------
     10. Hero background — subtle animated flowing lines
     Pure SVG + CSS animation, no libraries.
  --------------------------------------------------- */
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    const paths = [
      "M -100 150 C 200 50, 500 350, 900 120 S 1400 300, 1700 100",
      "M -100 300 C 250 450, 550 100, 950 320 S 1400 150, 1700 350",
      "M -100 480 C 300 350, 600 550, 1000 400 S 1450 500, 1700 420",
    ];
    const colors = ["var(--accent-wp)", "var(--accent-shopify)", "var(--accent-wp)"];
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 1600 600");
    svg.setAttribute("preserveAspectRatio", "none");

    paths.forEach((d, i) => {
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "flow-line");
      path.setAttribute("stroke", colors[i % colors.length]);
      svg.appendChild(path);

      if (!prefersReducedMotion) {
        const length = 2200;
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);
        path.animate(
          [
            { strokeDashoffset: length },
            { strokeDashoffset: 0 },
          ],
          {
            duration: 5000 + i * 900,
            delay: i * 300,
            easing: "cubic-bezier(0.16,1,0.3,1)",
            fill: "forwards",
          }
        );
        path.animate(
          [
            { transform: "translateY(0px)" },
            { transform: `translateY(${i % 2 === 0 ? "-" : ""}14px)` },
            { transform: "translateY(0px)" },
          ],
          {
            duration: 7000 + i * 500,
            delay: 5000,
            iterations: Infinity,
            easing: "ease-in-out",
          }
        );
      }
    });

    heroBg.appendChild(svg);
  }

  /* ---------------------------------------------------
     10b. Hero — mouse-reactive particle field
     Small dots drift slowly and gently part around the cursor,
     like ripples on water. Confined to the hero section only.
  --------------------------------------------------- */
  const particleHost = document.querySelector(".hero-particles");
  if (particleHost && !prefersReducedMotion) {
    const canvas = document.createElement("canvas");
    particleHost.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let width, height, dpr;
    const mouse = { x: -9999, y: -9999 };
    let particles = [];

    const rootStyles = getComputedStyle(document.documentElement);
    const colorWp = rootStyles.getPropertyValue("--accent-wp").trim() || "#7c93ff";
    const colorShopify = rootStyles.getPropertyValue("--accent-shopify").trim() || "#6fbf8a";

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = particleHost.clientWidth;
      height = particleHost.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(90, Math.floor((width * height) / 16000));
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: 0,
        baseY: 0,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.6 + 0.6,
        color: Math.random() > 0.5 ? colorWp : colorShopify,
      })).map((p) => ({ ...p, baseX: p.x, baseY: p.y }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        // gentle drift
        p.baseX += p.vx;
        p.baseY += p.vy;
        if (p.baseX < 0 || p.baseX > width) p.vx *= -1;
        if (p.baseY < 0 || p.baseY > height) p.vy *= -1;

        // ripple away from cursor
        const dx = p.baseX - mouse.x;
        const dy = p.baseY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 130;
        let x = p.baseX;
        let y = p.baseY;
        if (dist < radius) {
          const force = (radius - dist) / radius;
          x += (dx / (dist || 1)) * force * 26;
          y += (dy / (dist || 1)) * force * 26;
        }

        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.55;
        ctx.fill();
      });
      requestAnimationFrame(step);
    }

    const heroSection = particleHost.closest(".hero") || particleHost;
    heroSection.addEventListener("mousemove", (e) => {
      const rect = particleHost.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    heroSection.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    window.addEventListener("resize", resize, { passive: true });
    resize();
    requestAnimationFrame(step);
  }

  /* ---------------------------------------------------
     11. Footer year
  --------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
