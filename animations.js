/* ============================================
   Animations — reveal, counters, tilt, cursor
   ============================================ */

(function () {
  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  function scanReveals() {
    document
      .querySelectorAll(
        ".section__head, .glass-card, .service, .quote, .timeline__item, .skill, .about__bio, .about__cards, .hero__stats"
      )
      .forEach((el) => {
        if (!el.classList.contains("reveal-up")) el.classList.add("reveal-up");
        io.observe(el);
      });
  }
  scanReveals();

  // Counter animation
  const counters = document.querySelectorAll(".stat__num[data-count]");
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + (p === 1 ? "+" : "");
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => counterIO.observe(c));

  // Card tilt
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -6;
      const ry = ((x / r.width) - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      card.style.setProperty("--mx", x + "px");
      card.style.setProperty("--my", y + "px");
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Glass-card spotlight
  document.querySelectorAll(".glass-card").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  // Cursor glow
  const cursor = document.getElementById("cursorGlow");
  if (cursor && matchMedia("(pointer:fine)").matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });
    function loop() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
      requestAnimationFrame(loop);
    }
    loop();
  } else if (cursor) {
    cursor.style.display = "none";
  }
})();
