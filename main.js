/* ============================================
   Main — page loader, nav, back-to-top, misc
   ============================================ */

(function () {
  // Page loader
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("pageLoader")?.classList.add("hidden");
    }, 300);
  });

  // Year in footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const nav = document.querySelector(".nav");
  const toggle = document.getElementById("navToggle");
  toggle?.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll(".nav__links a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );

  // Back to top
  const btt = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) btt.classList.add("visible");
    else btt.classList.remove("visible");
  });
  btt?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Smooth anchor scroll offset
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
})();
