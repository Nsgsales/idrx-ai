// ── NAVIGATION SCROLL STATE ──
const nav = document.querySelector('.nav');
const onScroll = () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── MOBILE MENU ──
const mobileToggle = document.querySelector('.nav__mobile-toggle');
const mobileMenu = document.querySelector('.nav__mobile-menu');
const mobileClose = document.querySelector('.nav__mobile-close');

mobileToggle?.addEventListener('click', () => mobileMenu?.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileMenu?.classList.remove('open'));
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-item__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── VOICE TAGLINE CYCLER ──
const taglines = document.querySelectorAll('.voice-tagline');
let activeIdx = 0;
if (taglines.length) {
  taglines[0].classList.add('active');
  setInterval(() => {
    taglines[activeIdx].classList.remove('active');
    activeIdx = (activeIdx + 1) % taglines.length;
    taglines[activeIdx].classList.add('active');
  }, 1600);
}

// ── COUNTER ANIMATION ──
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const decimals = el.dataset.decimals || 0;
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = ease * target;
    el.textContent = prefix + value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── PROGRESS BAR ANIMATE ──
const progressBars = document.querySelectorAll('.progress-bar__fill');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      setTimeout(() => { entry.target.style.width = width + '%'; }, 300);
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
  bar.style.width = '0%';
  progressObserver.observe(bar);
});

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── DEMO FORM SUBMIT (mock) ──
const contactForm = document.querySelector('#demo-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Request Sent ✓';
  btn.disabled = true;
  btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
});
