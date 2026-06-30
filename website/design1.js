/* ═══════════════════════════════════════════════════════════
   ANTRA — design1.js
═══════════════════════════════════════════════════════════ */

// ── Custom Cursor ──────────────────────────────────────────
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

// ── Sticky Nav ────────────────────────────────────────────
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ── Mobile Menu ───────────────────────────────────────────
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

// ── Hero Background Slider ────────────────────────────────
(function () {
  const slider  = document.getElementById('heroSlider');
  const slides  = document.querySelectorAll('.hs-slide');
  const dots    = document.querySelectorAll('.hs-dot');
  const curEl   = document.querySelector('.hs-cur');
  const prevBtn = document.getElementById('hsPrev');
  const nextBtn = document.getElementById('hsNext');
  if (!slides.length) return;

  let current = 0;
  const DELAY     = 5000;
  const THRESHOLD = 60;         // px drag required to trigger slide
  const pad = n => String(n + 1).padStart(2, '0');

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    if (curEl) curEl.textContent = pad(current);
  }

  // ── Dot clicks ──
  dots.forEach(dot =>
    dot.addEventListener('click', () => { goTo(+dot.dataset.index); resetTimer(); })
  );

  // ── Arrow buttons ──
  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  // ── Keyboard ──
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetTimer(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetTimer(); }
  });

  // ── Mouse drag (hold & swipe) ──
  // Attach to #hero (the section), not #heroSlider, so the gradient overlay doesn't block events.
  const heroSection = document.getElementById('hero');
  let dragStartX = 0;
  let dragging   = false;

  heroSection.addEventListener('mousedown', e => {
    // Ignore clicks on buttons/dots
    if (e.target.closest('button, a')) return;
    dragStartX = e.clientX;
    dragging   = true;
    heroSection.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    heroSection.style.cursor = '';
    const delta = e.clientX - dragStartX;
    if (Math.abs(delta) >= THRESHOLD) {
      delta < 0 ? goTo(current + 1) : goTo(current - 1);
      resetTimer();
    }
  });

  document.addEventListener('mouseleave', () => {
    if (dragging) { dragging = false; heroSection.style.cursor = ''; }
  });

  // ── Touch swipe (mobile) ──
  heroSection.addEventListener('touchstart', e => {
    dragStartX = e.touches[0].clientX;
  }, { passive: true });

  heroSection.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - dragStartX;
    if (Math.abs(delta) >= THRESHOLD) {
      delta < 0 ? goTo(current + 1) : goTo(current - 1);
      resetTimer();
    }
  }, { passive: true });

  // ── Auto-advance ──
  let timer;
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DELAY);
  }
  resetTimer();
})();

// ── Scroll Observer (About + future sections) ─────────────
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // Image curtain reveal
      if (el.classList.contains('img-reveal'))  el.classList.add('revealed');

      // Fade-up elements
      if (el.classList.contains('fade-up'))     el.classList.add('visible');

      // Text line reveals (label, heading)
      if (el.classList.contains('about-label')) el.classList.add('animate');
      if (el.classList.contains('about-h2'))    el.classList.add('animate');

      io.unobserve(el);
    });
  }, { threshold: 0.15 });

  // Observe all animatable elements in about section (and future sections)
  document.querySelectorAll('.img-reveal, .fade-up, .about-label, .about-h2')
    .forEach(el => io.observe(el));
})();

// ── Hero Entrance Animations ──────────────────────────────
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
