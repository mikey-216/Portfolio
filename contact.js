/* ==========================================================================
   CONTACT PAGE — JAVASCRIPT
   Navbar Effects | Scroll Reveal | Mouse Glow | Button Ripple
   Form Validation | Success Popup | Back To Top | Scroll Progress
   Hover Tilt Effect | Particles
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- NAVBAR SCROLL EFFECT + PROGRESS BAR ---------------- */
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");
  const scrollProgress = document.getElementById("scrollProgress");

  function handleScrollEffects() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    navbar.classList.toggle("scrolled", scrollY > 40);
    backToTop.classList.toggle("visible", scrollY > 500);

    if (scrollProgress) scrollProgress.style.width = progress + "%";
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

  /* ---------------- SCROLL REVEAL (INTERSECTION OBSERVER) ---------------- */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("active"), i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

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

  /* ---------------- HOVER TILT EFFECT (CONTACT INFO CARDS) ---------------- */
  document.querySelectorAll(".contact-info-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(700px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  /* ---------------- PARTICLES (CANVAS) ---------------- */
  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let width, height;

    function resizeCanvas() {
      const header = document.querySelector(".page-header");
      width = canvas.width = header.offsetWidth;
      height = canvas.height = header.offsetHeight;
    }

    function createParticles() {
      const count = Math.min(50, Math.floor((width * height) / 24000));
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

  /* ---------------- CONTACT FORM VALIDATION ---------------- */
  const form = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");
  const successPopup = document.getElementById("successPopup");
  const popupOverlay = document.getElementById("popupOverlay");
  const closePopup = document.getElementById("closePopup");

  const fields = {
    fullName: {
      el: document.getElementById("fullName"),
      validate: (v) => v.trim().length >= 2
    },
    email: {
      el: document.getElementById("email"),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
    },
    subject: {
      el: document.getElementById("subject"),
      validate: (v) => v.trim().length >= 3
    },
    message: {
      el: document.getElementById("message"),
      validate: (v) => v.trim().length >= 10
    }
  };

  function validateField(key) {
    const { el, validate } = fields[key];
    const group = el.closest(".form-group");
    const isValid = validate(el.value);

    group.classList.toggle("error", !isValid);
    return isValid;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener("blur", () => validateField(key));
    fields[key].el.addEventListener("input", () => {
      const group = fields[key].el.closest(".form-group");
      if (group.classList.contains("error")) validateField(key);
    });
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let allValid = true;
      Object.keys(fields).forEach((key) => {
        if (!validateField(key)) allValid = false;
      });

      if (!allValid) {
        const firstError = form.querySelector(".form-group.error .form-input");
        if (firstError) firstError.focus();
        return;
      }

      sendBtn.disabled = true;
      const btnLabel = sendBtn.querySelector("span");
      const originalLabel = btnLabel.textContent;
      btnLabel.textContent = "Sending...";

      // Simulate sending (no backend attached)
      setTimeout(() => {
        sendBtn.disabled = false;
        btnLabel.textContent = originalLabel;
        openSuccessPopup();
        form.reset();
        Object.keys(fields).forEach((key) => {
          fields[key].el.closest(".form-group").classList.remove("error");
        });
      }, 900);
    });

    form.addEventListener("reset", () => {
      Object.keys(fields).forEach((key) => {
        fields[key].el.closest(".form-group").classList.remove("error");
      });
    });
  }

  function openSuccessPopup() {
    successPopup.classList.add("active");
    popupOverlay.classList.add("active");
  }

  function closeSuccessPopup() {
    successPopup.classList.remove("active");
    popupOverlay.classList.remove("active");
  }

  if (closePopup) closePopup.addEventListener("click", closeSuccessPopup);
  if (popupOverlay) popupOverlay.addEventListener("click", closeSuccessPopup);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSuccessPopup();
  });

  /* ---------------- REDUCED MOTION CHECK ---------------- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("active"));
  }

});