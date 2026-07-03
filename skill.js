/* =========================================================
   Skills Page JS
   Note: shared behaviors (loader, cursor, particles, mouse
   glow, navbar scroll, scroll progress, hamburger, scroll
   reveal, skill-bar fill, counters, ripple, magnetic buttons,
   back-to-top) already live in script.js and are loaded on
   this page too. This file only adds Skills-page-specific
   interactions.

   Table of Contents:
   1. Skill Percentage Counters
   2. Learning Path Stagger on Reveal
   3. Floating Shapes Parallax (Page Header)
   4. Hover Tilt Effect (Category Cards)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ================= 1. SKILL PERCENTAGE COUNTERS ================= */
  const pctEls = document.querySelectorAll(".skill-row__pct");

  const animatePct = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.floor(eased * target)}%`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}%`;
      }
    };
    requestAnimationFrame(step);
  };

  if (pctEls.length) {
    const pctObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animatePct(entry.target);
            pctObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    pctEls.forEach((el) => pctObserver.observe(el));
  }

  /* ================= 2. LEARNING PATH STAGGER ================= */
  const pathSteps = document.querySelectorAll(".path__step");

  if (pathSteps.length) {
    const pathObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 0.1}s`;
            pathObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    pathSteps.forEach((step) => pathObserver.observe(step));
  }

  /* ================= 3. FLOATING SHAPES PARALLAX ================= */
  const shapes = document.querySelectorAll(".page-header__shapes .shape");

  if (shapes.length && !isTouchDevice) {
    const pageHeader = document.querySelector(".page-header");
    pageHeader.addEventListener("mousemove", (e) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX / innerWidth - 0.5) * 24;
      const offsetY = (e.clientY / innerHeight - 0.5) * 24;

      shapes.forEach((shape, i) => {
        const depth = (i + 1) * 0.6;
        shape.style.translate = `${offsetX * depth}px ${offsetY * depth}px`;
      });
    });
  }

  /* ================= 4. HOVER TILT EFFECT (CATEGORY CARDS) ================= */
  if (!isTouchDevice) {
    document.querySelectorAll(".category-card, .intro-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -6;
        const rotateY = ((x - rect.width / 2) / rect.width) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

});