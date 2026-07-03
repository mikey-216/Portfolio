/* ==========================================================================
   ABOUT PAGE — JAVASCRIPT
   Typing Animation | Scroll Reveal | Navbar Effects | Mouse Glow
   Button Ripple | Counter Animation | Floating Icons | Back To Top
   Scroll Progress | Active Navigation | Particles
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- NAVBAR SCROLL EFFECT ---------------- */
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");
  const scrollProgress = document.getElementById("scrollProgress");
  const timelineProgress = document.getElementById("timelineProgress");

  function handleScrollEffects() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    navbar.classList.toggle("scrolled", scrollY > 40);
    backToTop.classList.toggle("visible", scrollY > 500);

    if (scrollProgress) scrollProgress.style.width = progress + "%";

    updateTimelineProgress();
  }

  window.addEventListener("scroll", handleScrollEffects, { passive: true });
  handleScrollEffects();

  /* ---------------- HAMBURGER MENU ---------------- */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    const isActive = navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isActive);
  });

  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- BACK TO TOP ---------------- */
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------- MOUSE GLOW ---------------- */
  const mouseGlow = document.getElementById("mouseGlow");
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    if (mouseGlow) {
      mouseGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    }
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  /* ---------------- TYPING ANIMATION ---------------- */
  const typingText = document.getElementById("typingText");
  const phrases = [
    "Passionate Learner",
    "AI Enthusiast",
    "Future Software Engineer"
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (!typingText) return;

    if (isDeleting) {
      charIndex--;
      typingText.textContent = current.substring(0, charIndex) + (phraseIndex < phrases.length ? " • " : "");
    } else {
      charIndex++;
      typingText.textContent = current.substring(0, charIndex);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      speed = 1400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 300;
    }

    setTimeout(typeLoop, speed);
  }
  typeLoop();

  /* ---------------- SCROLL REVEAL (INTERSECTION OBSERVER) ---------------- */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("active");
          }, i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ---------------- ACTIVE NAVIGATION ON SCROLL ---------------- */
  const sections = document.querySelectorAll("main section[id], main section");
  const navLinks = document.querySelectorAll(".nav-link");

  const navObserver = new IntersectionObserver(
    () => {
      // Keep "About" active since this is a dedicated page;
      // logic retained for future multi-section anchors.
    },
    { threshold: 0.4 }
  );
  sections.forEach((sec) => navObserver.observe(sec));

  /* ---------------- COUNTER ANIMATION ---------------- */
  const factNumbers = document.querySelectorAll(".fact-number[data-count]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  factNumbers.forEach((el) => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);

      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  /* ---------------- TIMELINE SCROLL PROGRESS ---------------- */
  function updateTimelineProgress() {
    const timeline = document.querySelector(".timeline");
    if (!timeline || !timelineProgress) return;

    const rect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;

    const total = rect.height;
    const visibleStart = windowH * 0.75;

    let progressPx = visibleStart - rect.top;
    progressPx = Math.max(0, Math.min(progressPx, total));

    const percent = total > 0 ? (progressPx / total) * 100 : 0;
    timelineProgress.style.height = percent + "%";
  }

  /* ---------------- BUTTON RIPPLE EFFECT ---------------- */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);

      ripple.classList.add("ripple");
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------------- MAGNETIC BUTTON EFFECT ---------------- */
  document.querySelectorAll(".magnetic-btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });

  /* ---------------- PARTICLES (CANVAS) ---------------- */
  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let width, height;

    function resizeCanvas() {
      const hero = document.querySelector(".hero-header");
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
    }

    function createParticles() {
      const count = Math.min(60, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.2
      }));
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
  }

  /* ---------------- REDUCED MOTION CHECK ---------------- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("active"));
  }

});