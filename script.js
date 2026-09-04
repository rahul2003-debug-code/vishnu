/**
 * Vishnu Pratap Singh — Ransomware Solutions & Data Recovery
 * Dynamic Cyber particle grid (touch & mouse), sticky navigation,
 * mobile drawer, floating quick consultation bar, and interactive form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initCyberCanvas();
  initScrollSpy();
  initContactForm();
  initBackToTop();
  initMobileFloatingBar();
  initDynamicScrollReveals();
});

/* ==========================================================================
   1. Navbar Scroll Transition
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    toggleBtn.classList.add('active');
    drawer.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('active');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. Interactive Cyber Canvas Background (Mouse & Mobile Touch Reactive)
   ========================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let pointer = { x: null, y: null, radius: 130 };

  // Desktop Mouse Events
  window.addEventListener('mousemove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseout', () => {
    pointer.x = null;
    pointer.y = null;
  });

  // Mobile Touch Events (Dynamic finger interaction)
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      pointer.x = e.touches[0].clientX;
      pointer.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      pointer.x = e.touches[0].clientX;
      pointer.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    pointer.x = null;
    pointer.y = null;
  }, { passive: true });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.size = Math.random() * 2 + 1;
      this.isGold = Math.random() > 0.4;
      this.color = this.isGold ? 'rgba(212, 175, 55, ' : 'rgba(45, 212, 191, ';
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Pointer collision / subtle repulsion on touch or cursor
      if (pointer.x !== null && pointer.y !== null) {
        const dx = pointer.x - this.x;
        const dy = pointer.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < pointer.radius) {
          const force = (pointer.radius - distance) / pointer.radius;
          const dirX = dx / distance;
          const dirY = dy / distance;
          this.x -= dirX * force * 1.6;
          this.y -= dirY * force * 1.6;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.baseAlpha + ')';
      ctx.fill();
    }
  }

  let particles = [];
  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 18000), 70);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const maxDist = 120;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.16;
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  initParticles();

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. ScrollSpy: Highlight Active Nav Link
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-menu .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-drawer .mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        setActiveLink(currentId);
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  function setActiveLink(id) {
    desktopLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
    mobileLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }
}

/* ==========================================================================
   5. Dynamic Scroll Reveals
   ========================================================================== */
function initDynamicScrollReveals() {
  const elements = document.querySelectorAll(
    '.service-card, .why-card, .process-step, .expertise-card, .about-card, .emergency-cta-section, .hero-contact-card'
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

/* ==========================================================================
   6. Mobile Floating Bar Hide Near Footer
   ========================================================================== */
function initMobileFloatingBar() {
  const bar = document.getElementById('mobileFloatingBar');
  const footer = document.querySelector('footer');
  if (!bar || !footer) return;

  const handleScroll = () => {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (footerRect.top <= windowHeight - 30) {
      bar.classList.add('hide');
    } else {
      bar.classList.remove('hide');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   7. Contact Form Client-Side Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('formName');
  const phoneInput = document.getElementById('formPhone');
  const messageInput = document.getElementById('formMessage');

  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const messageError = document.getElementById('messageError');
  const statusBox = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    nameError.textContent = '';
    phoneError.textContent = '';
    messageError.textContent = '';
    nameInput.classList.remove('error');
    phoneInput.classList.remove('error');
    messageInput.classList.remove('error');
    statusBox.className = 'form-status';
    statusBox.textContent = '';
    statusBox.style.display = 'none';

    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const messageVal = messageInput.value.trim();

    if (!nameVal) {
      nameError.textContent = 'Please enter your name.';
      nameInput.classList.add('error');
      isValid = false;
    }

    if (!phoneVal) {
      phoneError.textContent = 'Please enter your contact phone number.';
      phoneInput.classList.add('error');
      isValid = false;
    } else if (phoneVal.length < 7) {
      phoneError.textContent = 'Please enter a valid phone number.';
      phoneInput.classList.add('error');
      isValid = false;
    }

    if (!messageVal) {
      messageError.textContent = 'Please describe your ransomware or data recovery situation.';
      messageInput.classList.add('error');
      isValid = false;
    }

    if (!isValid) return;

    // Compose email details
    const subject = encodeURIComponent(`Incident Inquiry: Ransomware / Data Recovery — ${nameVal}`);
    const body = encodeURIComponent(
      `Name: ${nameVal}\n` +
      `Phone: ${phoneVal}\n\n` +
      `Inquiry Details:\n${messageVal}\n\n` +
      `[Sent via Vishnu Pratap Singh Portfolio Portal]`
    );

    const mailtoUri = `mailto:?subject=${subject}&body=${body}`;

    // Display clear client-side response and copy option
    statusBox.className = 'form-status success';
    statusBox.innerHTML = `
      <strong>Inquiry prepared successfully!</strong><br>
      Opening your default email client to send your message to Vishnu Pratap Singh...<br>
      <div style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
        <button type="button" id="copyMsgBtn" class="btn btn-outline" style="padding: 6px 12px; font-size: 0.82rem;">
          📋 Copy Details to Clipboard
        </button>
        <a href="https://wa.me/919170409556?text=${encodeURIComponent('Hi Vishnu, I would like to inquire about ransomware/data recovery assistance.\nName: ' + nameVal + '\nPhone: ' + phoneVal + '\nDetails: ' + messageVal)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding: 6px 12px; font-size: 0.82rem;">
          Send directly via WhatsApp
        </a>
      </div>
    `;
    statusBox.style.display = 'block';

    const copyBtn = document.getElementById('copyMsgBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const fullText = `Name: ${nameVal}\nPhone: ${phoneVal}\nDetails: ${messageVal}`;
        navigator.clipboard.writeText(fullText).then(() => {
          copyBtn.textContent = '✓ Copied to Clipboard!';
          setTimeout(() => {
            copyBtn.textContent = '📋 Copy Details to Clipboard';
          }, 2500);
        }).catch(() => {
          copyBtn.textContent = 'Failed to copy';
        });
      });
    }

    window.location.href = mailtoUri;
  });
}

/* ==========================================================================
   8. Back to Top Smooth Scroll
   ========================================================================== */
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
