/**
 * Products page — floating nav, scroll-spy, FAQ accordion, gallery tabs, animations
 */
(function () {
  'use strict';

  var navItems = document.querySelectorAll('.pp-float-nav__item[data-target]');
  var SECTIONS = navItems.length
    ? Array.prototype.slice.call(navItems).map(function(el) { return el.dataset.target; })
    : ['overhead', 'sectional', 'glass', 'pvc', 'hangar'];

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

  /* ── Nav cards row: prev/next buttons + mouse drag ────── */
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  function initNavScroll() {
    document.querySelectorAll('.pp-nav-cards__grid').forEach(function (track) {
      if (track.dataset.scrollInit) return;
      track.dataset.scrollInit = '1';

      var nav = document.createElement('div');
      nav.className = 'pp-nav-scroll';
      nav.innerHTML =
        '<button type="button" class="pp-nav-scroll__btn pp-nav-scroll__btn--prev" aria-label="Previous">' + ARROW + '</button>' +
        '<button type="button" class="pp-nav-scroll__btn pp-nav-scroll__btn--next" aria-label="Next">' + ARROW + '</button>';
      track.parentNode.insertBefore(nav, track.nextSibling);
      var prevBtn = nav.children[0], nextBtn = nav.children[1];

      function rtl() { return document.documentElement.dir === 'rtl'; }
      function step() {
        var card = track.querySelector('.pp-nav-card');
        return card ? card.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 16) : 280;
      }
      function update() {
        var max = track.scrollWidth - track.clientWidth - 2;
        var pos = Math.abs(track.scrollLeft);           /* RTL scrollLeft is negative */
        nav.hidden = max <= 0;                          /* all cards fit: no buttons */
        prevBtn.disabled = pos <= 2;
        nextBtn.disabled = pos >= max;
      }
      prevBtn.addEventListener('click', function () { track.scrollBy({ left: step() * (rtl() ? 1 : -1), behavior: 'smooth' }); });
      nextBtn.addEventListener('click', function () { track.scrollBy({ left: step() * (rtl() ? -1 : 1), behavior: 'smooth' }); });
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();

      /* mouse drag-to-scroll (touch scrolls natively) */
      var down = false, startX = 0, startScroll = 0, moved = false;
      track.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return;
        down = true; moved = false; startX = e.pageX; startScroll = track.scrollLeft;
        e.preventDefault();
      });
      window.addEventListener('mousemove', function (e) {
        if (!down) return;
        var dx = e.pageX - startX;
        if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('pp-nav-cards__grid--dragging'); }
        if (moved) track.scrollLeft = startScroll - dx;
      });
      window.addEventListener('mouseup', function () {
        if (!down) return;
        down = false;
        track.classList.remove('pp-nav-cards__grid--dragging');
      });
      /* a drag must not also count as a click on the card under the pointer */
      track.addEventListener('click', function (e) {
        if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
      }, true);
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
    initNavScroll();
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
