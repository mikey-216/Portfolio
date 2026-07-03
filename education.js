/* =========================================================
   Education Page JS
   Note: shared behaviors (loader, cursor, particles, mouse
   glow, navbar scroll, scroll progress, hamburger, scroll
   reveal, ripple, magnetic buttons, back-to-top) already
   live in script.js and are loaded on this page too.
   This file only adds Education-page-specific interactions.

   Table of Contents:
   1. Decimal-aware Counter Animation (CGPA / Semester)
   2. Timeline Item Stagger on Reveal
   3. Floating Shapes Parallax
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= 1. DECIMAL-AWARE COUNTERS ================= */
  const eduCounters = document.querySelectorAll(".edu-counter");

  const animateEduCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      el.textContent = value.toFixed(decimals);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    };
    requestAnimationFrame(step);
  };

  if (eduCounters.length) {
    const eduCounterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateEduCounter(entry.target);
            eduCounterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    eduCounters.forEach((el) => eduCounterObserver.observe(el));
  }

  /* ================= 2. TIMELINE ITEM STAGGER ================= */
  const timelineItems = document.querySelectorAll(".edu-timeline .timeline__item");

  if (timelineItems.length) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 0.12}s`;
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    timelineItems.forEach((item) => timelineObserver.observe(item));
  }

  /* ================= 3. FLOATING SHAPES PARALLAX ================= */
  const shapes = document.querySelectorAll(".page-header__shapes .shape");
  const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

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

});