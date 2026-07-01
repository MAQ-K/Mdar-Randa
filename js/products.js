/**
 * Products page — floating nav, scroll-spy, FAQ accordion, gallery tabs, animations
 */
(function () {
  'use strict';

  var SECTIONS = ['overhead', 'sectional', 'glass', 'pvc', 'hangar'];

  function smoothScrollTo(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -110, duration: 1.4 });
    } else {
      var top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }

  /* ── Floating Nav ─────────────────────────────────────── */
  function initFloatNav() {
    var nav = document.getElementById('pp-float-nav');
    var header = document.getElementById('pp-hero');
    if (!nav || !header) return;

    /* show after page-header scrolls out of view */
    var headerObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        nav.classList.toggle('pp-float-nav--visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });
    headerObs.observe(header);

    /* scroll-spy: highlight active section */
    var items = nav.querySelectorAll('.pp-float-nav__item');

    var sectionEls = SECTIONS.map(function (id) {
      return document.getElementById('prod-' + id);
    }).filter(Boolean);

    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id.replace('prod-', '');
          items.forEach(function (item) {
            item.classList.toggle('pp-float-nav__item--active', item.dataset.target === id);
          });
        }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });

    sectionEls.forEach(function (el) { spyObs.observe(el); });

    /* click to scroll */
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        smoothScrollTo('prod-' + item.dataset.target);
      });
    });
  }

  /* ── Nav Cards ────────────────────────────────────────── */
  function initNavCards() {
    document.querySelectorAll('.pp-nav-card[data-target]').forEach(function (card) {
      card.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScrollTo('prod-' + card.dataset.target);
      });
    });
  }

  /* ── FAQ Accordion ────────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('#pp-faq .faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        var wasOpen = item.classList.contains('faq-item--open');
        document.querySelectorAll('#pp-faq .faq-item--open').forEach(function (el) {
          el.classList.remove('faq-item--open');
          el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('faq-item--open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ── Gallery Tabs ─────────────────────────────────────── */
  function initGalleryTabs() {
    var tabs = document.querySelectorAll('.pp-gallery__tab');
    var items = document.querySelectorAll('.pp-gallery-item');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var cat = tab.dataset.cat;
        tabs.forEach(function (t) {
          t.classList.remove('pp-gallery__tab--active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('pp-gallery__tab--active');
        tab.setAttribute('aria-selected', 'true');
        items.forEach(function (item) {
          item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }

  /* ── Scroll animations ────────────────────────────────── */
  function initAnimations() {
    if (!('IntersectionObserver' in window)) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    /* elements that already carry animate-* classes from HTML */
    var preTagged = [
      '.pp-page-header__inner',
      '.pp-nav-cards__header',
      '.pp-nav-card',            /* already have animate-fade-up + anim-delay-N in HTML */
    ];
    preTagged.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { obs.observe(el); });
    });

    /* elements to auto-tag with animation classes */
    var autoFadeUp = [
      '.pp-intro-block__body',
      '.pp-sh',
      '.pp-split__content',
      '.pp-why-card',
      '.pp-section-cta',
      '.pp-cta-final__inner',
      '.pp-compare-table',
      '.faq-item',
    ];
    var autoScale = [
      '.pp-split__img-wrap',
    ];
    var autoFadeIn = [
      '.pp-gallery-item',
      '.pp-sub-card',
    ];

    autoFadeUp.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!hasAnimClass(el)) el.classList.add('animate-fade-up');
        obs.observe(el);
      });
    });
    autoScale.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!hasAnimClass(el)) el.classList.add('animate-scale');
        obs.observe(el);
      });
    });
    autoFadeIn.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!hasAnimClass(el)) el.classList.add('animate-fade-in');
        obs.observe(el);
      });
    });

    /* stagger: sub-cards, why-cards, gallery items, faq items */
    ['.pp-sub-grid', '.pp-why__grid', '.pp-gallery__grid', '.faq-list'].forEach(function (parentSel) {
      document.querySelectorAll(parentSel).forEach(function (parent) {
        parent.querySelectorAll(':scope > *').forEach(function (child, i) {
          if (!child.classList.contains('anim-delay-1') &&
              !child.classList.contains('anim-delay-2')) {
            child.classList.add('anim-delay-' + Math.min(i + 1, 5));
          }
        });
      });
    });
  }

  function hasAnimClass(el) {
    return el.classList.contains('animate-fade-up') ||
           el.classList.contains('animate-fade-in') ||
           el.classList.contains('animate-scale') ||
           el.classList.contains('animate-slide-left') ||
           el.classList.contains('animate-slide-right');
  }

  /* ── Boot ─────────────────────────────────────────────── */
  function init() {
    initFloatNav();
    initNavCards();
    initFAQ();
    initGalleryTabs();
    initAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.__initProductsPage = init;
})();
