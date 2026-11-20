/**
 * Madar Randa — Main Application
 * Language management, page initialization, interactive components.
 */

var MadarApp = (function () {
  'use strict';

  var STORAGE_KEY = 'madar-lang';
  var currentLang = 'ar';
  var activeHref = '';

  /* ── Language ─────────────────────────────────────── */
  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) || 'ar'; } catch (e) { return 'ar'; }
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
    /* Update form placeholders from data-placeholder-en / data-placeholder-ar */
    document.querySelectorAll('[data-placeholder-en]').forEach(function (el) {
      var text = lang === 'ar' ? el.dataset.placeholderAr : el.dataset.placeholderEn;
      if (text) el.setAttribute('placeholder', text);
    });
    /* Update plain-text elements such as <option> prompts */
    document.querySelectorAll('[data-text-en]').forEach(function (el) {
      var text = lang === 'ar' ? el.dataset.textAr : el.dataset.textEn;
      if (text) el.textContent = text;
    });
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

  /* ── RFQ Form ─────────────────────────────────────── */
  function initRFQForm() {
    var form = document.getElementById('rfq-form');
    if (!form || form.dataset.rfqInit) return;   /* runs again on every language switch */
    form.dataset.rfqInit = '1';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = validateForm(form);
      if (!valid) return;
      var ar = document.documentElement.dir === 'rtl';

      // ponytail: no backend — the request is delivered as a pre-filled WhatsApp message.
      // Swap for a real POST endpoint when one exists.
      var lines = [ar ? 'طلب عرض سعر من الموقع' : 'Quote request from the website'];
      form.querySelectorAll('.form-input,.form-select,.form-textarea').forEach(function (f) {
        var val = f.tagName === 'SELECT' ? (f.value ? f.options[f.selectedIndex].text : '') : f.value.trim();
        if (!val) return;
        var label = form.querySelector('label[for="' + f.id + '"] .lang-' + (ar ? 'ar' : 'en'));
        lines.push((label ? label.textContent.trim() : f.name) + ': ' + val);
      });
      window.open('https://wa.me/' + SITE_CONFIG.whatsapp.number + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');

      form.style.display = 'none';
      var success = document.getElementById('rfq-success');
      if (success) success.classList.add('form-success--show');
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
    var total    = slides.length;

    /* single slide: no controls, no autoplay, nothing left to wire up */
    if (total <= 1) return;

    var dots     = slider.querySelectorAll('.hs__dot');
    var curEl    = slider.querySelector('.hs__cur');
    var prevBtn  = document.getElementById('hs-prev');
    var nextBtn  = document.getElementById('hs-next');
    var current  = 0;
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

  /* ── Auto-assign scroll-animation classes (all pages) ── */
  function initProductAnimationClasses() {
    function hasAnim(el) {
      return /animate-(fade-up|fade-in|slide-left|slide-right|scale)/.test(el.className);
    }
    function tag(sel, cls) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (hasAnim(el) || el.closest('.hero-slider')) return;
        cls.split(' ').forEach(function (c) { el.classList.add(c); });
      });
    }
    function tagStagger(parentSel, childSel, cls) {
      document.querySelectorAll(parentSel).forEach(function (parent) {
        parent.querySelectorAll(childSel).forEach(function (el, i) {
          if (hasAnim(el)) return;
          el.classList.add(cls, 'anim-delay-' + Math.min(i + 1, 5));
        });
      });
    }
    tag('.section-header, .cta-final .container > *, .note-text, .center-actions', 'animate-fade-up');
    tag('.hero--page .hero__inner', 'animate-fade-up');
    tag('.about-grid > :first-child', 'animate-slide-left');
    tag('.about-grid > :last-child', 'animate-slide-right');
    tagStagger('.values-grid', '.value-card', 'animate-fade-up');
    tagStagger('.steps-grid', '.step-card', 'animate-fade-up');
    tagStagger('.trust-bar__grid', '.trust-bar__item', 'animate-fade-up');
    tagStagger('.vm-grid', '.vm-card', 'animate-fade-up');
    tagStagger('.stat-cards', '.stat-card', 'animate-fade-up');
    tagStagger('.partners-row', '.partner-item', 'animate-fade-in');
    tagStagger('.faq-list', '.faq-item', 'animate-fade-up');
    tagStagger('.sv-track', '.sv-card', 'animate-fade-up');
    tag('.sv-left', 'animate-slide-right');
    tag('.prose__p, .container--narrow > .spec-list', 'animate-fade-up');
  }

  /* ── Scroll Animations (inner pages only) ─────────── */
  function initScrollAnimations() {
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

  function isRtl() { return document.documentElement.dir === 'rtl'; }

  /* ── WhatsApp links with a pre-filled message per request type ──
     <a data-wa="maintenance" href="https://wa.me/...">; text comes from SITE_CONFIG.whatsapp.messages */
  function initWaLinks() {
    var wa = SITE_CONFIG.whatsapp;
    document.querySelectorAll('a[data-wa]').forEach(function (a) {
      var m = wa.messages && wa.messages[a.dataset.wa];
      if (!m) return;
      a.href = 'https://wa.me/' + wa.number + '?text=' + encodeURIComponent(isRtl() ? m.ar : m.en);
    });
  }

  /* ── Image galleries: big image, prev/next arrows, thumbnails, swipe ──
     <div class="mr-gallery"> .mr-gallery__main > img.pp-split__img + .mr-gallery__thumbs > button[data-src][data-alt] */
  var GAL_ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';
  function initGalleries() {
    document.querySelectorAll('.mr-gallery').forEach(function (g) {
      var main = g.querySelector('.mr-gallery__main');
      var img = main && main.querySelector('img');
      var thumbs = Array.prototype.slice.call(g.querySelectorAll('.mr-gallery__thumb'));
      if (!img || thumbs.length < 2) return;
      var ar = isRtl();

      if (!g.dataset.galInit) {
        g.dataset.galInit = '1';
        main.insertAdjacentHTML('beforeend',
          '<button type="button" class="mr-gallery__nav mr-gallery__nav--prev">' + GAL_ARROW + '</button>' +
          '<button type="button" class="mr-gallery__nav mr-gallery__nav--next">' + GAL_ARROW.replace('15 18 9 12 15 6', '9 18 15 12 9 6') + '</button>' +
          '<span class="mr-gallery__count" aria-hidden="true"></span>');
        var current = 0;
        var show = function (i) {
          current = (i + thumbs.length) % thumbs.length;
          var t = thumbs[current];
          thumbs.forEach(function (b, k) {
            b.classList.toggle('is-active', k === current);
            b.setAttribute('aria-current', k === current ? 'true' : 'false');
          });
          if (img.getAttribute('src') !== t.dataset.src) {
            img.classList.add('is-swapping');
            var pre = new Image();
            pre.onload = pre.onerror = function () {
              img.src = t.dataset.src;
              img.alt = t.dataset.alt || '';
              img.classList.remove('is-swapping');
            };
            pre.src = t.dataset.src;
          }
          main.querySelector('.mr-gallery__count').textContent = (current + 1) + ' / ' + thumbs.length;
        };
        thumbs.forEach(function (b, k) { b.addEventListener('click', function () { show(k); }); });
        main.querySelector('.mr-gallery__nav--prev').addEventListener('click', function () { show(current - 1); });
        main.querySelector('.mr-gallery__nav--next').addEventListener('click', function () { show(current + 1); });

        /* swipe (touch) - in RTL a swipe to the right moves forward */
        var x0 = null, y0 = 0;
        main.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
        main.addEventListener('touchend', function (e) {
          if (x0 === null) return;
          var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
          x0 = null;
          if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
          var forward = isRtl() ? dx > 0 : dx < 0;
          show(current + (forward ? 1 : -1));
        }, { passive: true });
        /* keyboard: arrow keys while focus is inside the gallery */
        g.addEventListener('keydown', function (e) {
          if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
          var forward = (e.key === 'ArrowRight') !== isRtl();
          show(current + (forward ? 1 : -1));
          e.preventDefault();
        });
        show(0);
      }

      /* labels follow the language (re-run on every language switch) */
      main.querySelector('.mr-gallery__nav--prev').setAttribute('aria-label', ar ? 'الصورة السابقة' : 'Previous image');
      main.querySelector('.mr-gallery__nav--next').setAttribute('aria-label', ar ? 'الصورة التالية' : 'Next image');
      thumbs.forEach(function (b, k) {
        b.setAttribute('aria-label', (ar ? 'عرض الصورة ' : 'Show image ') + (k + 1));
      });
    });
  }

  /* ── PDF catalogs in a popup: <a class="catalog-btn" href="x.pdf" data-pdf> ──
     Browsers without a built-in PDF viewer (most phones) just open the file in a new tab. */
  var pdfModal = null;
  function openPdf(href, title) {
    if (navigator.pdfViewerEnabled === false) { window.open(href, '_blank', 'noopener'); return; }
    var ar = isRtl();
    if (!pdfModal) {
      pdfModal = document.createElement('dialog');
      pdfModal.className = 'pdf-modal';
      pdfModal.innerHTML =
        '<div class="pdf-modal__bar">' +
          '<h2 class="pdf-modal__title"></h2>' +
          '<a class="pdf-modal__open" target="_blank" rel="noopener"></a>' +
          '<button type="button" class="pdf-modal__close">&times;</button>' +
        '</div>' +
        '<iframe class="pdf-modal__frame"></iframe>';
      document.body.appendChild(pdfModal);
      pdfModal.querySelector('.pdf-modal__close').addEventListener('click', function () { pdfModal.close(); });
      pdfModal.addEventListener('click', function (e) { if (e.target === pdfModal) pdfModal.close(); }); /* backdrop */
      pdfModal.addEventListener('close', function () {
        pdfModal.querySelector('iframe').src = 'about:blank';
        document.documentElement.style.overflow = '';
        if (window.__lenis) window.__lenis.start();
      });
    }
    pdfModal.querySelector('.pdf-modal__title').textContent = title;
    var open = pdfModal.querySelector('.pdf-modal__open');
    open.href = href;
    open.textContent = ar ? 'فتح في نافذة جديدة' : 'Open in new tab';
    pdfModal.querySelector('.pdf-modal__close').setAttribute('aria-label', ar ? 'إغلاق' : 'Close');
    pdfModal.querySelector('iframe').title = title;
    pdfModal.querySelector('iframe').src = href;
    document.documentElement.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();
    if (pdfModal.showModal) pdfModal.showModal(); else window.open(href, '_blank', 'noopener');
  }
  function initPdfLinks() {
    document.querySelectorAll('a[data-pdf]').forEach(function (a) {
      if (a.dataset.pdfInit) return;
      a.dataset.pdfInit = '1';
      a.addEventListener('click', function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;   /* let "open in new tab" work */
        e.preventDefault();
        var label = a.querySelector('.catalog-btn__label');
        openPdf(a.getAttribute('href'), label ? label.textContent : a.textContent);
      });
    });
  }

  /* ── Run all interactives ─────────────────────────── */
  function initInteractives() {
    initWaLinks();
    initGalleries();
    initPdfLinks();
    initFAQ();
    initRFQForm();
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
