/* ═══════════════════════════════════════════════════
   homepage.js  —  All JS for the homepage
   Combines design1.js + Swiper init + utilities:
   smooth scroll (CSS), cursor, nav, mobile menu,
   hero slider, language toggle, back-to-top,
   floating WhatsApp, scroll animations
═══════════════════════════════════════════════════ */

/* ── Custom cursor ───────────────────────────────── */
(function () {
  const cur  = document.getElementById('cur');
  if (!cur) return;
  const dot  = cur.querySelector('.cur-dot');
  const ring = cur.querySelector('.cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
  });
})();

/* ── Sticky nav ──────────────────────────────────── */
(function () {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ── Mobile menu ─────────────────────────────────── */
(function () {
  const burger  = document.getElementById('burger');
  const overlay = document.getElementById('mobOverlay');
  if (!burger || !overlay) return;
  let open = false;

  function toggle() {
    open = !open;
    overlay.classList.toggle('open', open);
    const [s1, s2] = burger.querySelectorAll('span');
    s1.style.transform = open ? 'translateY(7.5px) rotate(45deg)'   : '';
    s2.style.transform = open ? 'translateY(-7.5px) rotate(-45deg)' : '';
    s2.style.width     = open ? '26px' : '';
  }

  burger.addEventListener('click', toggle);
  overlay.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', toggle));
})();

/* ── Hero background slider ──────────────────────── */
(function () {
  const slides  = document.querySelectorAll('.hs-slide');
  const dots    = document.querySelectorAll('.hs-dot');
  const curEl   = document.querySelector('.hs-cur');
  const prevBtn = document.getElementById('hsPrev');
  const nextBtn = document.getElementById('hsNext');
  if (!slides.length) return;

  let current = 0;
  const DELAY     = 5000;
  const THRESHOLD = 60;
  const pad = n => String(n + 1).padStart(2, '0');

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    if (curEl) curEl.textContent = pad(current);
  }

  dots.forEach(dot =>
    dot.addEventListener('click', () => { goTo(+dot.dataset.index); resetTimer(); })
  );
  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetTimer(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetTimer(); }
  });

  const heroSection = document.getElementById('hero');
  let dragStartX = 0, dragging = false;

  heroSection?.addEventListener('mousedown', e => {
    if (e.target.closest('button, a')) return;
    dragStartX = e.clientX; dragging = true;
    heroSection.style.cursor = 'grabbing';
    e.preventDefault();
  });
  document.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    heroSection.style.cursor = '';
    const delta = e.clientX - dragStartX;
    if (Math.abs(delta) >= THRESHOLD) { delta < 0 ? goTo(current + 1) : goTo(current - 1); resetTimer(); }
  });
  document.addEventListener('mouseleave', () => { if (dragging) { dragging = false; heroSection.style.cursor = ''; } });

  heroSection?.addEventListener('touchstart', e => { dragStartX = e.touches[0].clientX; }, { passive: true });
  heroSection?.addEventListener('touchend',   e => {
    const delta = e.changedTouches[0].clientX - dragStartX;
    if (Math.abs(delta) >= THRESHOLD) { delta < 0 ? goTo(current + 1) : goTo(current - 1); resetTimer(); }
  }, { passive: true });

  let timer;
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DELAY);
  }
  resetTimer();
})();

/* ── Hero entrance animations ────────────────────── */
(function () {
  const badge   = document.querySelector('.hero-badge');
  const h1      = document.querySelector('.hero-h1');
  const sub     = document.querySelector('.hero-sub');
  const actions = document.querySelector('.hero-actions');
  const card    = document.querySelector('.hero-card');

  window.addEventListener('load', () => {
    setTimeout(() => badge?.classList.add('animate'),   100);
    setTimeout(() => h1?.classList.add('animate'),      280);
    setTimeout(() => sub?.classList.add('animate'),     440);
    setTimeout(() => actions?.classList.add('animate'), 560);
    setTimeout(() => card?.classList.add('animate'),    700);
  });
})();

/* ── Language toggle ─────────────────────────────── */
(function () {
  const btns = document.querySelectorAll('.lang-btn');
  if (!btns.length) return;

  function setLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    btns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    try { localStorage.setItem('hp-lang', lang); } catch(e) {}
  }

  btns.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  // restore saved preference
  try {
    const saved = localStorage.getItem('hp-lang');
    if (saved) setLang(saved);
  } catch(e) {}
})();

/* ── Custom slow smooth scroll ───────────────────── */
function scrollToY(targetY, duration) {
  duration = duration || 1200;
  const startY = window.scrollY;
  const dist   = targetY - startY;
  let   start  = null;

  function ease(t) {
    /* easeInOutQuart — slow start, slow end, smooth middle */
    return t < 0.5 ? 8*t*t*t*t : 1 - Math.pow(-2*t+2,4)/2;
  }

  function step(ts) {
    if (!start) start = ts;
    const elapsed  = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + dist * ease(progress));
    if (elapsed < duration) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

(function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('mainNav')?.offsetHeight || 80;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      scrollToY(top, 1200);
    });
  });
})();

/* ── Back to top ─────────────────────────────────── */
(function () {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => scrollToY(0, 1200));
})();

/* ── Scroll-reveal (IntersectionObserver) ────────── */
(function () {
  const els = document.querySelectorAll('.reveal, .img-reveal, .fade-up');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('img-reveal')) el.classList.add('revealed');
      else el.classList.add('visible');
      io.unobserve(el);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
})();

/* ── About section: image stack + content slide-in ── */
(function () {
  const images  = document.querySelector('.ab-images');
  const content = document.querySelector('.ab-content');
  if (!images && !content) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('ab-images'))  el.classList.add('ab-animate');
      if (el.classList.contains('ab-content')) el.classList.add('ab-animate');
      io.unobserve(el);
    });
  }, { threshold: 0.08 });

  if (images)  io.observe(images);
  if (content) io.observe(content);
})();

/* ── Vision section: slide-in + number count-up ──── */
(function () {
  const left  = document.querySelector('.v30-left');
  const right = document.querySelector('.v30-right');
  const numEl = document.querySelector('.v30-num');
  if (!left && !right) return;

  function countUp(el, target, suffix) {
    let current = 0;
    const duration = 1800;
    const steps    = 60;
    const step     = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
        return;
      }
      el.textContent = Math.floor(current);
    }, interval);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('v30-left')) {
        el.classList.add('v30-animate');
        if (numEl) {
          numEl.classList.add('v30-num-animate');
          countUp(numEl, 26, '+');
        }
      }
      if (el.classList.contains('v30-right')) el.classList.add('v30-animate');
      io.unobserve(el);
    });
  }, { threshold: 0.08 });

  if (left)  io.observe(left);
  if (right) io.observe(right);
})();

/* ── Swiper: services slider ─────────────────────── */
(function () {
  if (!document.getElementById('sv-swiper')) return;
  if (typeof Swiper === 'undefined') return;

  new Swiper('#sv-swiper', {
    slidesPerView: 2.4,
    spaceBetween: 20,
    grabCursor: true,
    loop: false,
    navigation: { nextEl: '.sv-next', prevEl: '.sv-prev' },
    breakpoints: {
      0:   { slidesPerView: 1.2, spaceBetween: 14 },
      576: { slidesPerView: 1.8, spaceBetween: 16 },
      768: { slidesPerView: 2.2, spaceBetween: 18 },
      992: { slidesPerView: 2.4, spaceBetween: 20 },
    }
  });
})();
