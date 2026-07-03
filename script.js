/* =========================================================
   Ansh Gupta — Portfolio JS
   Table of Contents:
   1. Loader
   2. Custom Cursor
   3. Mouse Glow
   4. Particle Background
   5. Navbar Scroll Effect + Scroll Progress
   6. Hamburger / Mobile Sidebar
   7. Active Nav Link on Scroll
   8. Typing Animation
   9. Scroll Reveal (Intersection Observer)
   10. Counter Animation
   11. Skill Bars Animation
   12. Magnetic Buttons
   13. Button Ripple Effect
   14. Back To Top Button
   15. Smooth Scroll (native fallback safety)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= 1. LOADER ================= */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  });

  /* ================= 2. CUSTOM CURSOR ================= */
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (!isTouchDevice && cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    document.querySelectorAll("a, button, .magnetic, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => follower.classList.add("active"));
      el.addEventListener("mouseleave", () => follower.classList.remove("active"));
    });
  }

  /* ================= 3. MOUSE GLOW ================= */
  const mouseGlow = document.getElementById("mouseGlow");
  if (mouseGlow) {
    window.addEventListener("mousemove", (e) => {
      mouseGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }

  /* ================= 4. PARTICLE BACKGROUND ================= */
  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let width, height;

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const PARTICLE_COUNT = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    const colors = ["#6366F1", "#8B5CF6", "#06B6D4"];

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.6 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animateParticles);
    };
    animateParticles();
  }

  /* ================= 5. NAVBAR SCROLL + PROGRESS BAR ================= */
  const navbar = document.getElementById("navbar");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  const onScroll = () => {
    const scrollY = window.scrollY;

    // Navbar background
    navbar.classList.toggle("scrolled", scrollY > 40);

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;

    // Back to top visibility
    backToTop.classList.toggle("visible", scrollY > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ================= 6. HAMBURGER / MOBILE SIDEBAR ================= */
  const hamburger = document.getElementById("hamburger");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  const closeSidebar = () => {
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    mobileSidebar.classList.remove("open");
    sidebarOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  const openSidebar = () => {
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    mobileSidebar.classList.add("open");
    sidebarOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  hamburger.addEventListener("click", () => {
    const isOpen = mobileSidebar.classList.contains("open");
    isOpen ? closeSidebar() : openSidebar();
  });

  sidebarOverlay.addEventListener("click", closeSidebar);
  document.querySelectorAll("[data-nav-mobile]").forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  /* ================= 7. ACTIVE NAV LINK ON SCROLL ================= */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("[data-nav]");

  const activeLinkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => activeLinkObserver.observe(section));

  /* ================= 8. TYPING ANIMATION ================= */
  const typingTextEl = document.getElementById("typingText");
  const roles = [
    "AI Engineer",
    "Machine Learning Enthusiast",
    "Software Developer",
    "Problem Solver",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1500);
        return;
      }
    } else {
      typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = isDeleting ? 45 : 90;
    setTimeout(typeLoop, speed);
  };

  if (typingTextEl) typeLoop();

  /* ================= 9. SCROLL REVEAL ================= */
  const revealEls = document.querySelectorAll("[data-reveal]");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("in-view");
          }, i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ================= 10. COUNTER ANIMATION ================= */
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  /* ================= 11. SKILL BARS ANIMATION ================= */
  const skillBars = document.querySelectorAll(".skill-bar span");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("filled");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));

  /* ================= 12. MAGNETIC BUTTONS ================= */
  if (!isTouchDevice) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
      });
    });
  }

  /* ================= 13. BUTTON RIPPLE EFFECT ================= */
  document.querySelectorAll("[data-ripple]").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);

      ripple.classList.add("ripple");
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ================= 14. BACK TO TOP ================= */
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ================= 15. CONTACT FORM (demo submit) ================= */
  const contactForm = document.querySelector(".contact__form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      submitBtn.style.pointerEvents = "none";
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.pointerEvents = "auto";
        contactForm.reset();
      }, 2200);
    });
  }

});