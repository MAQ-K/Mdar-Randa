/**
 * Madar Randa — Main Application
 * Language management, page initialization, interactive components.
 */

var MadarApp = (function () {
  'use strict';

  var STORAGE_KEY = 'madar-lang';
  var currentLang = 'en';
  var activeHref = '';

  /* ── Language ─────────────────────────────────────── */
  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) { return 'en'; }
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function applyLang(lang) {
    currentLang = lang;
    var html = document.documentElement;
    html.lang = lang;
    html.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    saveLang(lang);
    /* Update <title> from data-title-en / data-title-ar on <html> */
    var newTitle = lang === 'ar' ? html.dataset.titleAr : html.dataset.titleEn;
    if (newTitle) document.title = newTitle;
    // Remount header/footer/whatsapp with correct language
    MadarComponents.remount(activeHref);
    // Reinitialize page-specific interactives
    initInteractives();
  }

  function setLang(lang) {
    applyLang(lang);
  }

  /* ── Lenis smooth scroll ──────────────────────────── */
  var _lenis = null; /* guard: init once only */
  function initLenis() {
    if (typeof Lenis === 'undefined' || _lenis) return;
    try {
      _lenis = new Lenis({
        duration:        1.6,     /* long enough to feel like a slide */
        easing: function (t) {    /* exponential ease-out: fast start, gliding stop */
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        },
        smoothWheel:     true,
        smoothTouch:     false,
        wheelMultiplier: 1.4,     /* slightly amplified so each tick travels further */
      });
      (function raf(time) { _lenis.raf(time); requestAnimationFrame(raf); })(0);
      window.__lenis = _lenis;
    } catch (e) { _lenis = null; } /* fall back to native if anything fails */
  }

  /* ── Init ─────────────────────────────────────────── */
  function init(href) {
    activeHref = href || '';
    currentLang = getLang();
    applyLang(currentLang);
    initLenis(); /* only runs once; skipped on language re-mount */
  }

  /* ── FAQ Accordion ────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.onclick = function () {
        var item = btn.closest('.faq-item');
        var wasOpen = item.classList.contains('faq-item--open');
        // Close all
        document.querySelectorAll('.faq-item--open').forEach(function (el) {
          el.classList.remove('faq-item--open');
          el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        // Open clicked if was closed
        if (!wasOpen) {
          item.classList.add('faq-item--open');
          btn.setAttribute('aria-expanded', 'true');
        }
      };
    });
  }

  /* ── Project Filter ───────────────────────────────── */
  function initProjectFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sector = btn.getAttribute('data-sector');
        // Update active button
        filterBtns.forEach(function (b) { b.classList.remove('filter-btn--active'); });
        btn.classList.add('filter-btn--active');
        // Show/hide cards
        document.querySelectorAll('.project-card').forEach(function (card) {
          if (sector === 'all') {
            card.classList.remove('project-card--hidden');
          } else {
            var cardSector = card.getAttribute('data-sector');
            card.classList.toggle('project-card--hidden', cardSector !== sector);
          }
        });
      });
    });
  }

  /* ── RFQ Form ─────────────────────────────────────── */
  function initRFQForm() {
    var form = document.getElementById('rfq-form');
    if (!form) return;

    var ar = document.documentElement.dir === 'rtl';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = validateForm(form);
      if (!valid) return;

      var submitBtn = form.querySelector('.form-submit');
      var originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spin"></span> ' + (ar ? 'جاري الإرسال...' : 'Submitting...');

      // Simulate async submission
      setTimeout(function () {
        form.style.display = 'none';
        var success = document.getElementById('rfq-success');
        if (success) success.classList.add('form-success--show');
      }, 1400);
    });

    // Live validation
    form.querySelectorAll('.form-input,.form-select,.form-textarea').forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.classList.contains('form-input--error') || field.classList.contains('form-select--error') || field.classList.contains('form-textarea--error')) {
          validateField(field);
        }
      });
    });
  }

  function validateField(field) {
    var ar = document.documentElement.dir === 'rtl';
    var required = field.hasAttribute('data-required');
    var errorEl = field.parentElement.querySelector('.form-error');
    var errorClass = field.tagName === 'SELECT' ? 'form-select--error' : (field.tagName === 'TEXTAREA' ? 'form-textarea--error' : 'form-input--error');

    if (required && !field.value.trim()) {
      field.classList.add(errorClass);
      if (errorEl) { errorEl.textContent = ar ? 'هذا الحقل مطلوب' : 'This field is required'; errorEl.classList.add('form-error--show'); }
      return false;
    }
    field.classList.remove(errorClass);
    if (errorEl) errorEl.classList.remove('form-error--show');
    return true;
  }

  function validateForm(form) {
    var fields = form.querySelectorAll('[data-required]');
    var allValid = true;
    fields.forEach(function (f) { if (!validateField(f)) allValid = false; });
    return allValid;
  }

  /* ── Lazy images ──────────────────────────────────── */
  function initLazyImages() {
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
            obs.unobserve(img);
          }
        });
      }, { rootMargin: '100px' });
      document.querySelectorAll('img[data-src]').forEach(function (img) { obs.observe(img); });
    } else {
      document.querySelectorAll('img[data-src]').forEach(function (img) { img.src = img.dataset.src; });
    }
  }

  /* ── Service Detail Page ──────────────────────────── */
  function initServicePage() {
    var container = document.getElementById('service-content');
    if (!container) return;

    var params = new URLSearchParams(window.location.search);
    var slug = params.get('slug') || 'glass-doors';
    var ar = document.documentElement.dir === 'rtl';

    var service = SERVICES_DATA.find(function (s) { return s.slug === slug; });
    if (!service) { container.innerHTML = '<p style="padding:80px 32px;text-align:center">Service not found.</p>'; return; }

    document.title = (ar ? service.titleAr : service.title) + ' — ' + (ar ? 'مدار رندا' : 'Madar Randa');

    var title    = ar ? service.titleAr    : service.title;
    var desc     = ar ? service.descAr     : service.desc;
    var features = ar ? service.featuresAr : service.features;
    var benefits = ar ? (service.benefitsAr || []) : (service.benefits || []);
    var apps     = ar ? (service.applicationsAr || []) : (service.applications || []);

    /* sidebar list */
    var sidebarItems = SERVICES_DATA.map(function (s) {
      var isActive = s.slug === slug;
      return '<a href="service.html?slug=' + s.slug + '" class="service-sidebar__item' + (isActive ? ' service-sidebar__item--active' : '') + '">' +
        '<span class="service-sidebar__dot"></span>' +
        '<span class="service-sidebar__item-text">' + (ar ? s.titleAr : s.title) + '</span>' +
      '</a>';
    }).join('');

    var sidebar =
      '<aside class="service-sidebar animate-fade-in">' +
        '<div class="service-sidebar__head">' +
          '<div class="service-sidebar__icon">' +
            '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
          '</div>' +
          '<div class="service-sidebar__name">' + (ar ? 'جميع المنتجات' : 'All Products') + '</div>' +
        '</div>' +
        '<nav class="service-sidebar__list">' + sidebarItems + '</nav>' +
      '</aside>';

    /* feature list */
    var featureListHtml = features.map(function (f) {
      return '<li>' +
        '<span class="feature-list__check"><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></span>' +
        '<span>' + f + '</span>' +
      '</li>';
    }).join('');

    /* benefits */
    var benefitIcons = [
      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
      '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
      '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/>',
      '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
      '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    ];
    var benefitsHtml = benefits.length ? benefits.map(function (b, i) {
      return '<div class="benefit-card animate-fade-up anim-delay-' + Math.min(i + 1, 5) + '">' +
        '<div class="benefit-card__icon"><svg viewBox="0 0 24 24" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">' + (benefitIcons[i % benefitIcons.length]) + '</svg></div>' +
        '<div class="benefit-card__title">' + (b.title || b) + '</div>' +
        (b.body ? '<div class="benefit-card__body">' + b.body + '</div>' : '') +
      '</div>';
    }).join('') : '';

    /* applications */
    var appIconPaths = [
      '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
      '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
      '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>',
      '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
      '<path d="M22 12h-4l-3 3-4-6-3 3H2"/>',
      '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
    ];
    var appsHtml = apps.length ? apps.map(function (a, i) {
      return '<div class="application-item">' +
        '<div class="application-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (appIconPaths[i % appIconPaths.length]) + '</svg></div>' +
        '<div class="application-item__label">' + a + '</div>' +
      '</div>';
    }).join('') : '';

    /* specs */
    var specsHtml = service.specs ? service.specs.map(function (s) {
      return '<tr><td>' + (ar ? s.labelAr : s.label) + '</td><td>' + (ar ? s.valueAr : s.value) + '</td></tr>';
    }).join('') : '';

    var mainContent =
      '<div>' +
        /* hero block */
        '<div class="svc-hero-block">' +
          '<img src="' + service.img + '" alt="' + title + '" class="svc-hero-img animate-scale">' +
          '<div>' +
            '<span class="eyebrow animate-fade-up">' + (ar ? 'حل هندسي' : 'Engineering Solution') + '</span>' +
            '<h1 class="section-title animate-fade-up anim-delay-1">' + title + '</h1>' +
            '<p class="section-subtitle animate-fade-up anim-delay-2" style="margin-bottom:24px">' + desc + '</p>' +
            '<ul class="feature-list animate-fade-up anim-delay-3">' + featureListHtml + '</ul>' +
            '<div class="btn-group animate-fade-up anim-delay-4" style="margin-top:28px">' +
              '<a href="contact.html" class="btn btn--accent btn--lg">' + (ar ? 'اطلب عرض سعر ←' : 'Request a Quote →') + '</a>' +
              '<a href="tel:' + SITE_CONFIG.contact.phoneTel + '" class="btn btn--ghost" dir="ltr">' + SITE_CONFIG.contact.phone + '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +

        /* key benefits */
        (benefitsHtml ? (
          '<div class="section-divider"></div>' +
          '<div class="animate-fade-up">' +
            '<span class="eyebrow">' + (ar ? 'المزايا الرئيسية' : 'Key Benefits') + '</span>' +
            '<h2 class="section-title" style="margin-bottom:24px">' + (ar ? 'لماذا تختار هذا المنتج؟' : 'Why Choose This Product?') + '</h2>' +
          '</div>' +
          '<div class="benefits-grid">' + benefitsHtml + '</div>'
        ) : '') +

        /* applications */
        (appsHtml ? (
          '<div class="section-divider"></div>' +
          '<div class="animate-fade-up">' +
            '<span class="eyebrow">' + (ar ? 'التطبيقات' : 'Applications') + '</span>' +
            '<h2 class="section-title" style="margin-bottom:24px">' + (ar ? 'القطاعات التي نخدمها' : 'Sectors We Serve') + '</h2>' +
          '</div>' +
          '<div class="applications-grid">' + appsHtml + '</div>'
        ) : '') +

        /* specs */
        (specsHtml ? (
          '<div class="section-divider"></div>' +
          '<div class="animate-fade-up">' +
            '<span class="eyebrow">' + (ar ? 'المواصفات' : 'Specifications') + '</span>' +
            '<h2 class="section-title" style="margin-bottom:24px">' + (ar ? 'المواصفات التقنية' : 'Technical Specifications') + '</h2>' +
          '</div>' +
          '<div class="animate-fade-up" style="background:#fff;border:1px solid var(--color-border);border-radius:var(--radius);overflow:hidden">' +
            '<table class="specs-table">' + specsHtml + '</table>' +
          '</div>'
        ) : '') +

        /* final CTA */
        '<div class="svc-cta-block animate-fade-up">' +
          '<div>' +
            '<p class="svc-cta-block__title">' + (ar ? 'مستعد للحصول على عرض سعر؟' : 'Ready to get a quote?') + '</p>' +
            '<p class="svc-cta-block__sub">' + (ar ? 'مهندسونا يستجيبون خلال 24 ساعة في جميع أنحاء المملكة.' : 'Our engineers respond within 24 hours across Saudi Arabia.') + '</p>' +
          '</div>' +
          '<div class="btn-group">' +
            '<a href="contact.html" class="btn btn--accent btn--lg">' + (ar ? 'اطلب عرض سعر ←' : 'Request a Quote →') + '</a>' +
            '<a href="tel:' + SITE_CONFIG.contact.phoneTel + '" class="btn btn--outline-white" dir="ltr">' + SITE_CONFIG.contact.phone + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    container.innerHTML =
      '<section class="section section--white">' +
        '<div class="container">' +
          '<div class="service-detail-layout">' +
            sidebar +
            mainContent +
          '</div>' +
        '</div>' +
      '</section>';

    initScrollAnimations();
  }

  /* ── Hero Slider ──────────────────────────────────── */
  function initHeroSlider() {
    var slider = document.getElementById('hero-slider');
    if (!slider) return;

    /* Hero entrance reveal — homepage skips the scroll-triggered
       .animated class (initScrollAnimations), so the hero's own
       fade-up content (badge/title/sub/actions/card) must be
       revealed here instead, or it stays at opacity:0 forever. */
    requestAnimationFrame(function () {
      slider.querySelectorAll('.animate-fade-up').forEach(function (el) {
        el.classList.add('animated');
      });
    });

    var slides   = slider.querySelectorAll('.hs__slide');
    var dots     = slider.querySelectorAll('.hs__dot');
    var curEl    = slider.querySelector('.hs__cur');
    var prevBtn  = document.getElementById('hs-prev');
    var nextBtn  = document.getElementById('hs-next');
    var current  = 0;
    var total    = slides.length;
    var timer;

    function goTo(idx) {
      slides[current].classList.remove('hs__slide--active');
      slides[current].setAttribute('aria-hidden', 'true');
      dots[current].classList.remove('hs__dot--active');
      current = (idx + total) % total;
      slides[current].classList.add('hs__slide--active');
      slides[current].setAttribute('aria-hidden', 'false');
      dots[current].classList.add('hs__dot--active');
      if (curEl) curEl.textContent = String(current + 1).padStart(2, '0');
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 5500);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); startAuto(); });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () { goTo(parseInt(dot.dataset.index)); startAuto(); });
    });

    /* touch + mouse drag swipe */
    var dragX = 0, dragging = false;

    function dragEnd(x) {
      if (!dragging) return;
      dragging = false;
      slider.classList.remove('hero-slider--dragging');
      var dx = x - dragX;
      if (Math.abs(dx) > 50) { goTo(dx < 0 ? current + 1 : current - 1); startAuto(); }
    }

    slider.addEventListener('touchstart', function (e) { dragX = e.touches[0].clientX; dragging = true; }, { passive: true });
    slider.addEventListener('touchend', function (e) { dragEnd(e.changedTouches[0].clientX); }, { passive: true });

    slider.addEventListener('mousedown', function (e) {
      if (e.target.closest('button, a')) return;
      dragX = e.clientX;
      dragging = true;
      slider.classList.add('hero-slider--dragging');
      e.preventDefault();
    });
    window.addEventListener('mouseup', function (e) { dragEnd(e.clientX); });
    slider.addEventListener('mouseleave', function (e) { dragEnd(e.clientX); });

    startAuto();
  }

  /* ── Products Slider (homepage) ──────────────────── */
  function initProductsSlider() {
    var track = document.getElementById('sv-track');
    if (!track || track.dataset.svInit) return;
    track.dataset.svInit = '1';

    var section = track.closest('.sv-section');
    var prevBtn = section && section.querySelector('.sv-prev');
    var nextBtn = section && section.querySelector('.sv-next');
    if (!prevBtn || !nextBtn) return;

    function isRtl() { return document.documentElement.dir === 'rtl'; }

    function cardStep() {
      var card = track.querySelector('.sv-card');
      if (!card) return 300;
      var style = getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap) || 20;
      return card.getBoundingClientRect().width + gap;
    }

    function updateButtons() {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (isRtl()) {
        prevBtn.disabled = track.scrollLeft >= -2;
        nextBtn.disabled = Math.abs(track.scrollLeft) >= max;
      } else {
        prevBtn.disabled = track.scrollLeft <= 2;
        nextBtn.disabled = track.scrollLeft >= max;
      }
    }

    prevBtn.addEventListener('click', function () {
      var step = cardStep() * (isRtl() ? 1 : -1);
      track.scrollBy({ left: step, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function () {
      var step = cardStep() * (isRtl() ? -1 : 1);
      track.scrollBy({ left: step, behavior: 'smooth' });
    });
    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();

    /* mouse drag-to-scroll (touch already works natively via overflow-x) */
    var isDown = false, startX = 0, scrollStart = 0, moved = false;

    track.addEventListener('mousedown', function (e) {
      isDown = true;
      moved = false;
      startX = e.pageX;
      scrollStart = track.scrollLeft;
      track.classList.add('sv-track--dragging');
      e.preventDefault();
    });
    window.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      var dx = e.pageX - startX;
      if (Math.abs(dx) > 5) moved = true;
      track.scrollLeft = scrollStart - dx;
    });
    window.addEventListener('mouseup', function () {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('sv-track--dragging');
    });
    /* swallow the click that follows a drag so cards don't navigate unintentionally */
    track.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); }
    }, true);
  }

  /* ── Product Pages — auto-assign animation classes ── */
  function initProductAnimationClasses() {
    if (!document.querySelector('.pd-intro, .pd-features, .pd-apps, .pd-why')) return;

    function hasAnim(el) {
      return el.classList.contains('animate-fade-up') ||
        el.classList.contains('animate-fade-in') ||
        el.classList.contains('animate-slide-left') ||
        el.classList.contains('animate-slide-right') ||
        el.classList.contains('animate-scale');
    }

    function tag(sel, cls) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (hasAnim(el)) return;
        cls.split(' ').forEach(function (c) { if (c) el.classList.add(c); });
      });
    }

    function tagStagger(parentSel, childSel, cls) {
      document.querySelectorAll(parentSel).forEach(function (parent) {
        parent.querySelectorAll(childSel).forEach(function (el, i) {
          if (hasAnim(el)) return;
          cls.split(' ').forEach(function (c) { if (c) el.classList.add(c); });
          el.classList.add('anim-delay-' + Math.min(i + 1, 5));
        });
      });
    }

    // Section headers
    tag('.pd-section-header', 'animate-fade-up');
    tag('.pd-features__intro', 'animate-fade-up');
    tag('.pd-apps__header', 'animate-fade-up');

    // Intro
    tag('.pd-intro__eyebrow', 'animate-fade-up');
    tag('.pd-intro__h2', 'animate-fade-up anim-delay-1');
    tag('.pd-intro__body', 'animate-fade-up anim-delay-2');
    tag('.pd-intro__img-wrap', 'animate-scale anim-delay-1');

    // Feature cards
    tagStagger('.pd-features__grid', '.pd-feat', 'animate-fade-up');

    // Application cards
    tagStagger('.pd-apps__grid', '.pd-app', 'animate-fade-up');

    // Trust bar
    tagStagger('.pd-trust__row', '.pd-badge', 'animate-fade-in');

    // Why section
    tag('.pd-why__text', 'animate-slide-left');
    tag('.pd-why__card', 'animate-slide-right anim-delay-2');

    // Numbers
    tagStagger('.pd-numbers__grid', '.pd-num', 'animate-fade-up');

    // Steps
    tagStagger('.pd-how-steps', '.pd-step', 'animate-slide-left');

    // Standards
    tagStagger('.pd-standards', '.pd-standard', 'animate-slide-left');

    // Related cards
    tagStagger('.pd-related__grid', '.pd-rel-card', 'animate-fade-up');

    // Energy stats & finishes
    tagStagger('.pd-energy__grid', '.pd-energy__stat', 'animate-fade-up');
    tag('.pd-finishes', 'animate-fade-up anim-delay-2');

    // CTA band
    tag('.pd-cta__content', 'animate-fade-up');
    tag('.pd-cta__actions', 'animate-fade-up anim-delay-2');

    // Activation methods
    tagStagger('.pd-activations', '.pd-activation', 'animate-fade-up');

    // Problem cards
    tagStagger('.pd-problems', '.pd-problem', 'animate-fade-up');

    // Compare table
    tag('.pd-compare-wrap', 'animate-fade-up');

    // BMS triggers & integrations
    tagStagger('.pd-triggers', '.pd-trigger', 'animate-fade-up');
    tagStagger('.pd-integrations', '.pd-int-item', 'animate-slide-right');

    // Type tabs
    tagStagger('.pd-type-tabs', '.pd-type-tab', 'animate-fade-in');
  }

  /* ── Scroll Animations (inner pages only) ─────────── */
  function initScrollAnimations() {
    /* Skip on homepage — user requested no animations there */
    if (activeHref === 'index.html' || !activeHref) return;

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.animate-fade-up,.animate-fade-in,.animate-slide-left,.animate-slide-right,.animate-scale').forEach(function (el) {
        el.classList.add('animated');
      });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.animate-fade-up,.animate-fade-in,.animate-slide-left,.animate-slide-right,.animate-scale').forEach(function (el) {
      obs.observe(el);
    });
  }

  /* ── Back to Top ──────────────────────────────────── */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('back-to-top--visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Run all interactives ─────────────────────────── */
  function initInteractives() {
    initFAQ();
    initProjectFilter();
    initRFQForm();
    initServicePage();
    initLazyImages();
    initHeroSlider();
    initProductsSlider();
    initProductAnimationClasses();
    initScrollAnimations();
    initBackToTop();
  }

  /* ── Public API ───────────────────────────────────── */
  return {
    init: init,
    setLang: setLang,
    getLang: getLang,
  };

})();

/* ── Services data (used by service.html) ─────────────── */
var SERVICES_DATA = [
  {
    slug: 'glass-doors',
    title: 'Automatic Glass Doors', titleAr: 'الأبواب الزجاجية الأوتوماتيكية',
    desc: 'CE-certified sliding, swing, and revolving automatic glass doors for commercial lobbies, hospitals, hotels, and retail entrances.',
    descAr: 'أبواب زجاجية أوتوماتيكية معتمدة CE – انزلاقية ومفصلية ودوارة – للمستشفيات والمراكز التجارية والفنادق ومحلات التجزئة.',
    img: 'assets/images/product-glass-door.jpg',
    features: ['CE certified to EN 16005','Sliding, swing & revolving configurations','Sensor-activated and timer-controlled','Aluminium frame – powder coated or anodised','24/7 emergency service contract available'],
    featuresAr: ['معتمدة CE وفق EN 16005','تصميمات انزلاقية ومفصلية ودوارة','تعمل بالحساسات والمؤقتات','إطار ألومنيوم – طلاء بودرة أو أكسدة','عقد خدمة طوارئ على مدار الساعة'],
    benefits: [
      { title: 'CE Certified', body: 'Meets EN 16005 — accepted by all Saudi authorities.' },
      { title: 'Energy Efficient', body: 'Precision sensors minimise open time and HVAC loss.' },
      { title: 'Low Maintenance', body: 'Brushless DC motors with 1M+ cycle lifespan.' },
      { title: 'Custom Sizing', body: 'Single, double, bi-parting — any opening width.' },
    ],
    benefitsAr: [
      { title: 'معتمدة CE', body: 'تستوفي EN 16005 — مقبولة من جميع الجهات السعودية.' },
      { title: 'كفاءة طاقة', body: 'حساسات دقيقة تقلّل وقت الفتح وفقدان تكييف الهواء.' },
      { title: 'صيانة منخفضة', body: 'محركات DC بدون فرش — أكثر من مليون دورة.' },
      { title: 'أحجام مخصصة', body: 'مفردة أو مزدوجة أو منفتحة — أي عرض فتحة.' },
    ],
    applications: ['Hospitals','Hotels','Retail','Offices','Airports','Malls'],
    applicationsAr: ['المستشفيات','الفنادق','التجزئة','المكاتب','المطارات','المجمعات'],
    specs: [
      { label: 'Standard', labelAr: 'المعيار', value: 'EN 16005 / CE', valueAr: 'EN 16005 / CE' },
      { label: 'Speed', labelAr: 'السرعة', value: 'Up to 1.2 m/s', valueAr: 'حتى 1.2 م/ث' },
      { label: 'Opening Width', labelAr: 'عرض الفتحة', value: '600 – 4000 mm', valueAr: '600 – 4000 ملم' },
      { label: 'Frame', labelAr: 'الإطار', value: 'Aluminium alloy', valueAr: 'سبيكة ألومنيوم' },
      { label: 'Power', labelAr: 'الطاقة', value: '220V AC / 24V DC backup', valueAr: '220 فولت AC / احتياطي 24V DC' },
    ],
  },
  {
    slug: 'sectional-doors',
    title: 'Sectional Doors', titleAr: 'الأبواب المقطعية',
    desc: 'Heavy-duty insulated sectional industrial doors for warehouses, factories, and logistics centres. Wind-load rated and automated.',
    descAr: 'أبواب مقطعية صناعية معزولة عالية الأداء للمستودعات والمصانع ومراكز اللوجستيات. مقدّرة لحمل الرياح وأوتوماتيكية التشغيل.',
    img: 'assets/images/product-sectional-door.jpg',
    features: ['Insulated steel panels (40–80mm)','Wind-load rated to EN 13241','Manual override for power outages','Integrated pedestrian door option','Annual maintenance contracts'],
    featuresAr: ['ألواح فولاذية معزولة (40–80 ملم)','مقدّرة لحمل الرياح وفق EN 13241','تشغيل يدوي عند انقطاع الكهرباء','خيار باب مشاة متكامل','عقود صيانة سنوية'],
  },
  {
    slug: 'fast-doors',
    title: 'Fast-Action Doors', titleAr: 'الأبواب السريعة',
    desc: 'High-speed roll-up doors for cold storage, pharmaceutical, and high-traffic industrial facilities. Speeds up to 2m/s.',
    descAr: 'أبواب لفافية سريعة للمخازن الباردة والمرافق الدوائية والصناعية عالية الحركة. سرعة تصل إلى 2 م/ث.',
    img: 'assets/images/product-fast-door.jpg',
    features: ['Opening speed up to 2 m/s','Self-repairing fabric on impact','IP65-rated motor enclosure','Temperature range -30°C to +60°C','Energy-saving: minimises cold air loss'],
    featuresAr: ['سرعة فتح تصل إلى 2 م/ث','قماش ذاتي الإصلاح عند الاصطدام','محرك بحماية IP65','نطاق درجات حرارة من -30 إلى +60°م','توفير الطاقة: تقليل فقدان الهواء البارد'],
  },
  {
    slug: 'loading-dock',
    title: 'Loading Dock Systems', titleAr: 'أنظمة رصيف التحميل',
    desc: 'Complete dock solutions: hydraulic dock levellers, dock shelters, bumpers, and vehicle restraints for logistics operations.',
    descAr: 'حلول رصيف متكاملة: موازنات رصيف هيدروليكية ومظلات رصيف ومصدات وقيود مركبات لعمليات اللوجستيات.',
    img: 'assets/images/product-loading-dock.jpg',
    features: ['Hydraulic & mechanical dock levellers','Capacity up to 6 tonnes','Vehicle restraints for safety','Dock shelters & inflatable seals','Integrated dock management system'],
    featuresAr: ['موازنات هيدروليكية وميكانيكية','حمولة تصل إلى 6 أطنان','قيود مركبات للسلامة','مظلات رصيف وأختام قابلة للنفخ','نظام إدارة رصيف متكامل'],
  },
  {
    slug: 'road-barriers',
    title: 'Road Barriers & Parking Control', titleAr: 'حواجز الطرق والتحكم في المواقف',
    desc: 'Automatic boom gates and full parking management systems for commercial, government, and residential facilities.',
    descAr: 'بوابات أوتوماتيكية وأنظمة إدارة مواقف متكاملة للمرافق التجارية والحكومية والسكنية.',
    img: 'assets/images/project-barrier.jpg',
    features: ['Boom arms 3m–6m length','RFID, barcode & intercom integration','Traffic loop & photocell safety','ANPR camera-ready','Remote monitoring capability'],
    featuresAr: ['أذرع من 3 إلى 6 أمتار','تكامل RFID والباركود والاتصال الداخلي','حلقة مرورية وفوتوسيل للسلامة','جاهز لكاميرات ANPR','قدرة المراقبة عن بُعد'],
  },
  {
    slug: 'security-entrances',
    title: 'Security Entrances', titleAr: 'البوابات الأمنية',
    desc: 'Turnstiles, speed gates, and full-height security entrances for high-security environments including government and data centres.',
    descAr: 'بوابات دوارة وبوابات سريعة ومداخل أمنية بالارتفاع الكامل للبيئات عالية الأمان بما فيها الجهات الحكومية ومراكز البيانات.',
    img: 'assets/images/project-security.jpg',
    features: ['Waist-height & full-height turnstiles','Speed lane gates up to 40 persons/min','Biometric & access card integration','Anti-passback & tailgate detection','CE certified'],
    featuresAr: ['بوابات دوارة على مستوى الخصر والارتفاع الكامل','بوابات مسرع تصل لـ 40 شخص/دقيقة','تكامل البصمة وبطاقة الوصول','كشف التمرير العكسي والمصاحبة','معتمدة CE'],
  },
  {
    slug: 'auto-windows',
    title: 'Automatic Windows & Roller Shutters', titleAr: 'النوافذ الأوتوماتيكية وستائر التدحرج',
    desc: 'Aluminium roller shutters and automatic window systems for commercial and residential buildings. Remote and timer-controlled.',
    descAr: 'ستائر أوتوماتيكية ونوافذ آلية للمباني التجارية والسكنية. تعمل عن بُعد وبالمؤقتات.',
    img: 'assets/images/product-auto-window.jpg',
    features: ['Extruded aluminium slats','Manual override crank','Solar-powered motor option','Remote control & smart home integration','Fire-rated versions available'],
    featuresAr: ['شرائح ألومنيوم مبثوقة','تشغيل يدوي بالمدور','خيار محرك يعمل بالطاقة الشمسية','تحكم عن بُعد وتكامل المنزل الذكي','إصدارات مقاومة للحريق'],
  },
  {
    slug: 'villa-gates',
    title: 'Villa & Palace Gates', titleAr: 'أبواب الفلل والقصور',
    desc: 'Custom-engineered entrance gates for premium residential properties, villas, and private estates. Sliding and swing configurations.',
    descAr: 'بوابات هندسية مخصصة للفلل والقصور والمنازل الراقية. تصميمات انزلاقية ومفصلية.',
    img: 'assets/images/product-villa-door.jpg',
    features: ['Custom steel or aluminium fabrication','Swing & sliding gate automation','Intercom & video doorbell integration','GSM remote control','Decorative finishes & custom designs'],
    featuresAr: ['تصنيع مخصص من فولاذ أو ألومنيوم','أتمتة بوابات مفصلية وانزلاقية','تكامل الاتصال الداخلي وجرس الباب بالفيديو','تحكم عن بُعد GSM','تشطيبات زخرفية وتصاميم مخصصة'],
  },
  {
    slug: 'sliding-motors',
    title: 'Sliding Door Motors', titleAr: 'محركات الأبواب الانزلاقية',
    desc: 'Retrofit automation motors for existing iron and steel sliding gates. Supply, installation, and full maintenance service.',
    descAr: 'محركات أتمتة لتجديد أبواب الحديد والفولاذ الانزلاقية الموجودة. توريد وتركيب وصيانة شاملة.',
    img: 'assets/images/product-iron-motor.jpg',
    features: ['Compatible with gates up to 800kg','24V DC rack & pinion drive','Remote control & loop detector','Soft-start & soft-stop','Battery backup for power outages'],
    featuresAr: ['متوافق مع بوابات حتى 800 كغ','محرك 24 فولت DC بنظام الرف والترس','تحكم عن بُعد وكاشف حلقة','بدء ناعم وإيقاف ناعم','احتياطي بطارية عند انقطاع الكهرباء'],
  },
  {
    slug: 'hangar-doors',
    title: 'Aircraft Hangar Doors', titleAr: 'أبواب هناجر الطائرات',
    desc: 'Custom-engineered bi-folding and sliding hangar doors to aviation-grade specifications. Clear widths from 10m to 50m+.',
    descAr: 'أبواب هناجر مطوية ومنزلقة مخصصة وفق المواصفات الطيرانية. فتحات صافية من 10 إلى أكثر من 50 متراً.',
    img: 'assets/images/hero-hangar.jpg',
    features: ['Clear opening widths to 50m+','Bi-folding, sliding & bottom-rolling','Wind-load structural engineering','Aviation-grade specifications','Full installation & commissioning'],
    featuresAr: ['فتحات صافية تصل لأكثر من 50م','طي ثنائي وانزلاق وتدحرج سفلي','هندسة هيكلية لحمل الرياح','مواصفات طيرانية','تركيب وتشغيل كاملان'],
  },
];
