/**
 * Products page — floating nav, scroll-spy, FAQ accordion, gallery tabs
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
    var hero = document.getElementById('pp-hero');
    if (!nav || !hero) return;

    /* show/hide based on hero visibility */
    var heroObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          nav.classList.remove('pp-float-nav--visible');
        } else {
          nav.classList.add('pp-float-nav--visible');
        }
      });
    }, { threshold: 0.1 });
    heroObs.observe(hero);

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
    }, { rootMargin: '-30% 0px -60% 0px' });

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
        tabs.forEach(function (t) { t.classList.remove('pp-gallery__tab--active'); });
        tab.classList.add('pp-gallery__tab--active');
        items.forEach(function (item) {
          if (cat === 'all' || item.dataset.cat === cat) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
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
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    var selectors = [
      '.pp-hero__inner', '.pp-nav-card',
      '.pp-intro-block__body',
      '.pp-split__img-wrap', '.pp-split__content',
      '.pp-sub-card', '.pp-why-card',
      '.pp-gallery-item', '.faq-item',
      '.pp-section-cta', '.pp-cta-final__inner',
      '.pp-compare-table',
    ];

    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.classList.contains('animate-fade-up') &&
            !el.classList.contains('animate-fade-in') &&
            !el.classList.contains('animate-scale')) {
          el.classList.add('animate-fade-up');
        }
        obs.observe(el);
      });
    });

    /* stagger grid children */
    ['.pp-nav-cards__grid', '.pp-sub-grid', '.pp-why__grid', '.pp-gallery__grid'].forEach(function (parentSel) {
      document.querySelectorAll(parentSel).forEach(function (parent) {
        parent.querySelectorAll(':scope > *').forEach(function (child, i) {
          child.classList.add('anim-delay-' + Math.min(i + 1, 5));
        });
      });
    });
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

  /* re-run on language switch (MadarApp calls initInteractives which re-mounts components) */
  window.__initProductsPage = init;
})();
