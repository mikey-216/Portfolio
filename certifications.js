/* =========================================================
   Certifications & Experience Page JS
   Note: shared behaviors (loader, cursor, particles, mouse
   glow, navbar scroll, scroll progress, hamburger, scroll
   reveal, counters, ripple, magnetic buttons, back-to-top)
   already live in script.js and are loaded on this page too.
   This file only adds page-specific interactions.

   Table of Contents:
   1. Experience Timeline Stagger on Reveal
   2. Roadmap Card Stagger on Reveal
   3. Floating Shapes Parallax (Page Header)
   4. Hover Tilt Effect (Showcase / Experience Cards)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ================= 1. EXPERIENCE TIMELINE STAGGER ================= */
  const timelineItems = document.querySelectorAll(".exp-timeline .timeline__item");

  if (timelineItems.length) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 0.1}s`;
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    timelineItems.forEach((item) => timelineObserver.observe(item));
  }

  /* ================= 2. ROADMAP CARD STAGGER ================= */
  const roadmapCards = document.querySelectorAll(".roadmap-card");

  if (roadmapCards.length) {
    const roadmapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${(i % 4) * 0.08}s`;
            roadmapObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    roadmapCards.forEach((card) => roadmapObserver.observe(card));
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

  /* ================= 4. HOVER TILT EFFECT ================= */
  if (!isTouchDevice) {
    document.querySelectorAll(".cert-showcase-card, .experience-card, .intro-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -5;
        const rotateY = ((x - rect.width / 2) / rect.width) * 5;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

});