/**
 * Madar Randa — Shared Components
 * Renders: fixed navbar, homepage hero slider, footer, WhatsApp FAB, back-to-top.
 * All content comes from SITE_CONFIG (js/config.js).
 */

(function (cfg) {
  'use strict';

  /* ── Helpers ──────────────────────────────────────── */
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function isAr() { return document.documentElement.dir === 'rtl'; }
  function t(en, ar) { return isAr() ? ar : en; }

  /* ── SVG icon set ─────────────────────────────────── */
  var ICON = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    chevU: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>',
    chevD: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    arrR:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  };

  /* ── Header (navbar) ──────────────────────────────── */
  function renderHeader(activeHref, isHomepage) {
    var ar  = isAr();
    var nav = cfg.nav;
    var logo = cfg.logo;

    var linksHtml = nav.links.map(function (l) {
      var isActive = activeHref && (l.href === activeHref || (l.dropdown && l.dropdown.some(function(d){ return d.href === activeHref; })));
      var label    = esc(ar ? l.ar : l.en);

      if (l.dropdown) {
        var dropItems = l.dropdown.map(function (d) {
          return '<a href="' + esc(d.href) + '" class="nav__dd-item">' +
            '<span class="nav__dd-icon">' + ICON.arrR + '</span>' +
            esc(ar ? d.ar : d.en) +
          '</a>';
        }).join('');

        return '<li class="nav__item nav__item--has-dd">' +
          '<a href="' + esc(l.href) + '" class="nav__link' + (isActive ? ' nav__link--active' : '') + '" aria-haspopup="true" aria-expanded="false">' +
            label + '<span class="nav__dd-caret" aria-hidden="true">' + ICON.chevD + '</span>' +
          '</a>' +
          '<div class="nav__dropdown" role="region">' +
            '<div class="nav__dd-grid">' + dropItems + '</div>' +
          '</div>' +
        '</li>';
      }

      return '<li class="nav__item">' +
        '<a href="' + esc(l.href) + '" class="nav__link' + (isActive ? ' nav__link--active' : '') + '">' +
          label +
        '</a>' +
      '</li>';
    }).join('');

    /* mobile links — dropdowns become collapsible accordions */
    var mobileHtml = nav.links.map(function (l) {
      var label = esc(ar ? l.ar : l.en);
      if (l.dropdown) {
        var subItems = l.dropdown.map(function (d) {
          return '<a href="' + esc(d.href) + '" class="mob__link mob__link--sub">' + esc(ar ? d.ar : d.en) + '</a>';
        }).join('');
        return '<div class="mob__group">' +
          '<button type="button" class="mob__link mob__group-toggle" aria-expanded="false">' +
            label +
            '<span class="mob__group-chevron" aria-hidden="true">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
            '</span>' +
          '</button>' +
          '<div class="mob__group-items" aria-hidden="true">' + subItems + '</div>' +
        '</div>';
      }
      return '<a href="' + esc(l.href) + '" class="mob__link">' + label + '</a>';
    }).join('');

    /* initial nav class: on homepage start transparent, on other pages start solid */
    var navClass = 'nav' + (isHomepage ? '' : ' nav--solid');

    return '<header>' +
      '<nav class="' + navClass + '" id="main-nav" role="navigation" aria-label="Main navigation">' +
        '<div class="nav__inner">' +

          /* Logo */
          '<a href="index.html" class="nav__logo" aria-label="' + esc(cfg.company.nameEn) + ' – Home">' +
            '<img src="' + esc(logo.src) + '" alt="' + esc(logo.alt) + '" height="' + logo.height + '" ' +
              'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
            '<span class="nav__logo-text" style="display:none">' +
              '<span class="nav__logo-name">' + esc(ar ? cfg.company.nameAr : cfg.company.nameEn) + '</span>' +
            '</span>' +
          '</a>' +

          /* Centre links */
          '<ul class="nav__links" role="list">' + linksHtml + '</ul>' +

          /* Right cluster */
          '<div class="nav__right">' +
            '<a href="tel:' + esc(cfg.contact.phoneTel) + '" class="nav__phone" aria-label="Call us">' +
              '<span class="nav__phone-icon">' + ICON.phone + '</span>' +
              '<span class="nav__phone-num" dir="ltr">' + esc(cfg.contact.phone) + '</span>' +
            '</a>' +
            '<a href="' + esc(nav.cta.href) + '" class="nav__cta">' + esc(ar ? nav.cta.ar : nav.cta.en) + '</a>' +
            '<button class="nav__burger" id="nav-burger" aria-label="' + (ar ? 'القائمة' : 'Menu') + '" aria-expanded="false">' +
              '<span></span><span></span>' +
            '</button>' +
          '</div>' +

        '</div>' +
      '</nav>' +

      /* Mobile overlay */
      '<div class="mob-overlay" id="mob-overlay" aria-hidden="true">' +
        '<div class="mob-inner">' +
          mobileHtml +
          '<a href="' + esc(nav.cta.href) + '" class="mob__cta">' + esc(ar ? nav.cta.ar : nav.cta.en) + '</a>' +
        '</div>' +
      '</div>' +
    '</header>';
  }

  /* ── Footer ───────────────────────────────────────── */
  function renderFooter() {
    var f  = cfg.footer;
    var ar = isAr();

    var columnsHtml = f.columns.map(function (col) {
      var linksHtml = col.links.map(function (l) {
        return '<a href="' + esc(l.href) + '" class="footer__link">' + esc(ar ? l.ar : l.en) + '</a>';
      }).join('');
      return '<div>' +
        '<span class="footer__col-title">' + esc(ar ? col.titleAr : col.titleEn) + '</span>' +
        linksHtml +
      '</div>';
    }).join('');

    var c = cfg.contact;
    var contactHtml = '<div class="footer__contact">' +
      '<span class="footer__col-title">' + (ar ? 'تواصل معنا' : 'Contact Us') + '</span>' +
      '<p class="footer__contact-name">' + esc(ar ? cfg.company.nameAr : cfg.company.nameEn) + '</p>' +
      '<a href="tel:' + esc(c.phoneTel) + '" class="footer__link"><bdi class="ltr-num">' + esc(c.phone) + '</bdi></a>' +
      '<a href="mailto:' + esc(c.email) + '" class="footer__link"><bdi class="ltr-num">' + esc(c.email) + '</bdi></a>' +
      '<p class="footer__brand-text">' + esc(ar ? c.addressAr : c.addressEn) + '</p>' +
      '<a href="' + esc(c.mapsUrl) + '" class="footer__link footer__map-link" target="_blank" rel="noopener">' +
        (ar ? 'موقعنا على خرائط Google' : 'Our location on Google Maps') + '</a>' +
    '</div>';

    return '<footer class="footer" role="contentinfo">' +
      '<div class="container">' +
        '<div class="footer__grid">' +
          '<div>' +
            '<img src="' + esc(cfg.logo.src) + '" alt="' + esc(cfg.logo.alt) + '" class="footer__logo" onerror="this.style.display=\'none\'">' +
            '<p class="footer__brand-text">' + esc(ar ? f.taglineAr : f.taglineEn) + '</p>' +
          '</div>' +
          columnsHtml +
          contactHtml +
        '</div>' +
        '<iframe class="footer__map" src="' + esc(c.mapsEmbed) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ' +
          'title="' + (ar ? 'موقع مدار رندا على الخريطة' : 'Madar Randa location map') + '"></iframe>' +
        '<div class="footer__bottom">' +
          '<span class="footer__legal">' + esc(ar ? f.legalAr : f.legalEn) + '</span>' +
          '<img src="' + esc(f.visionLogo) + '" alt="Saudi Vision 2030" class="footer__vision">' +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  /* ── Google reviews strip ────────────────────────────
     Auto-scrolling cards; every card opens the Google reviews in a new tab.
     Renders into [data-reviews] slots, or a band above the footer on pages without one. */
  var G_ICON = '<svg class="rv-card__g" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"/><path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>';
  function stars(n) {
    var out = '';
    for (var i = 1; i <= 5; i++) out += '<span class="rv-star' + (i <= Math.round(n) ? ' rv-star--on' : '') + '">★</span>';
    return '<span class="rv-stars" role="img" aria-label="' + n + '/5">' + out + '</span>';
  }
  var liveReviews = null;   /* filled from the Google Places API when configured */
  function renderReviewCards() {
    var r = liveReviews || cfg.reviews;
    if (!r || !r.items || !r.items.length) return '';
    var ar = isAr();
    var link = function (inner, cls) {
      return '<a class="rv-card ' + (cls || '') + '" href="' + esc(r.url) + '" target="_blank" rel="noopener">' + inner + '</a>';
    };
    var cards = r.items.map(function (it) {
      return link(
        '<span class="rv-card__top">' + G_ICON + stars(it.rating) + '</span>' +
        '<span class="rv-card__text">' + esc(it.text) + '</span>' +
        '<span class="rv-card__meta"><strong>' + esc(it.name) + '</strong>' + (it.date ? ' · ' + esc(it.date) : '') + '</span>');
    }).join('');
    var summary = r.rating ? link(
      G_ICON + '<span class="rv-card__score">' + esc(r.rating) + '</span>' + stars(r.rating) +
      (r.count ? '<span class="rv-card__meta">' + esc(r.count) + (ar ? ' تقييم على Google' : ' Google reviews') + '</span>' : '') +
      '<span class="rv-card__cta">' + (ar ? 'اطلع على تقييماتنا في جوجل' : 'See our Google reviews') + '</span>', 'rv-card--summary') : '';
    /* track is duplicated so the CSS marquee loops seamlessly */
    return '<div class="rv-strip" aria-label="' + (ar ? 'تقييمات Google' : 'Google reviews') + '">' + summary +
      '<div class="rv-viewport"><div class="rv-track">' + cards + '<span class="rv-dup" aria-hidden="true">' + cards + '</span></div></div></div>';
  }

  /* Google reviews: fill slots, or add one band above the footer */
  function fillReviewSlots() {
    var fEl = document.getElementById('site-footer');
    var rvHtml = renderReviewCards();
    var slots = document.querySelectorAll('[data-reviews]');
    if (!slots.length && rvHtml && fEl) {
      var band = document.createElement('section');
      band.className = 'section section--pale rv-band';
      band.innerHTML = '<div class="container"><h2 class="section-title rv-band__title" data-reviews-title></h2><div data-reviews></div></div>';
      fEl.parentNode.insertBefore(band, fEl);
      slots = document.querySelectorAll('[data-reviews]');
    }
    document.querySelectorAll('[data-reviews-title]').forEach(function (t) { t.textContent = isAr() ? 'آراء عملائنا' : 'Client Reviews'; });
    slots.forEach(function (el) { el.innerHTML = rvHtml; });
  }

  /* Live Google reviews (Places API New, via Maps JS). Needs reviews.apiKey + reviews.placeId in config.
     Google returns at most 5 reviews plus the overall rating and count. */
  function loadLiveReviews() {
    var r = cfg.reviews;
    if (!r || !r.apiKey || !r.placeId || window.__mrReviewsLoading) return;
    window.__mrReviewsLoading = true;
    window.__mrReviewsReady = function () {
      google.maps.importLibrary('places').then(function (lib) {
        var place = new lib.Place({ id: r.placeId, requestedLanguage: isAr() ? 'ar' : 'en' });
        return place.fetchFields({ fields: ['rating', 'userRatingCount', 'reviews'] }).then(function () {
          liveReviews = {
            url: r.url,
            rating: place.rating,
            count: place.userRatingCount,
            items: (place.reviews || []).map(function (rv) {
              return {
                name: rv.authorAttribution ? rv.authorAttribution.displayName : '',
                rating: rv.rating,
                date: rv.relativePublishTimeDescription || '',
                text: rv.text || ''
              };
            }).filter(function (it) { return it.text; })
          };
          fillReviewSlots();
        });
      }).catch(function () { /* keep the static fallback (buttons) on any API error */ });
    };
    var sc = document.createElement('script');
    sc.async = true;
    sc.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(r.apiKey) +
      '&v=weekly&loading=async&callback=__mrReviewsReady&language=' + (isAr() ? 'ar' : 'en');
    document.head.appendChild(sc);
  }

  /* ── WhatsApp FAB ─────────────────────────────────── */
  function renderWhatsApp() {
    var wa  = cfg.whatsapp;
    var ar  = isAr();
    var msg = encodeURIComponent(ar ? wa.messageAr : wa.messageEn);
    var lbl = ar ? wa.ariaLabelAr : wa.ariaLabelEn;
    var href = 'https://wa.me/' + wa.number + '?text=' + msg;

    return '<a href="' + esc(href) + '" class="whatsapp-fab" target="_blank" rel="noopener noreferrer" ' +
      'aria-label="' + esc(lbl) + '" title="' + esc(lbl) + '">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
      '</svg>' +
    '</a>';
  }

  /* ── Back-to-top ──────────────────────────────────── */
  function renderBackToTop() {
    return '<button class="back-to-top" id="back-to-top" aria-label="Back to top">' + ICON.chevU + '</button>';
  }

  /* ── Language FAB (floating, fixed to the left — never moves with dir) */
  function renderLangFab() {
    var ar = isAr();
    return '<button type="button" class="lang-fab lang-switcher" id="lang-fab" role="switch" aria-checked="' + ar + '" ' +
      'aria-label="' + (ar ? 'Switch to English' : 'التبديل إلى العربية') + '" ' +
      'onclick="MadarApp.setLang(\'' + (ar ? 'en' : 'ar') + '\')">' +
      '<span class="lang-switcher__thumb' + (ar ? ' lang-switcher__thumb--ar' : '') + '" aria-hidden="true"></span>' +
      '<span class="lang-switcher__option lang-switcher__option--en' + (!ar ? ' lang-switcher__option--active' : '') + '">EN</span>' +
      '<span class="lang-switcher__option lang-switcher__option--ar' + (ar ? ' lang-switcher__option--active' : '') + '">ع</span>' +
    '</button>';
  }

  /* ── Mount ────────────────────────────────────────── */
  window.MadarComponents = {
    renderHeader:   renderHeader,
    renderFooter:   renderFooter,
    renderReviews:  renderReviewCards,
    loadLiveReviews: loadLiveReviews,
    renderWhatsApp: renderWhatsApp,

    mount: function (activeHref) {
      var isHomepage = !activeHref || activeHref === 'index.html';

      /* Header */
      var hEl = document.getElementById('site-header');
      if (hEl) hEl.innerHTML = renderHeader(activeHref, isHomepage);

      /* Hero video (homepage, static markup): defer network cost until visible */
      var hsVid = document.getElementById('hs-video');
      if (hsVid && !hsVid.dataset.loaded) {
        hsVid.dataset.loaded = '1';
        var loadHeroVid = function () {
          hsVid.querySelectorAll('source[data-src]').forEach(function (s) {
            s.setAttribute('src', s.getAttribute('data-src'));
            s.removeAttribute('data-src');
          });
          hsVid.load();
          var p = hsVid.play();
          if (p) p.catch(function () {});
        };
        if ('IntersectionObserver' in window) {
          new IntersectionObserver(function (entries, obs) {
            if (entries[0].isIntersecting) { loadHeroVid(); obs.disconnect(); }
          }, { threshold: 0 }).observe(hsVid);
        } else {
          loadHeroVid();
        }
      }

      /* Footer */
      var fEl = document.getElementById('site-footer');
      if (fEl) fEl.innerHTML = renderFooter();

      fillReviewSlots();
      loadLiveReviews();

      /* FABs */
      var wa = document.getElementById('whatsapp-btn');
      if (wa) wa.innerHTML = renderWhatsApp() + renderBackToTop();

      /* Language FAB — lives directly on <body>, fixed to the left,
         independent of the header/footer markup so language switches
         never move or rebuild its position. */
      var langFab = document.getElementById('lang-fab');
      if (langFab) {
        langFab.outerHTML = renderLangFab();
      } else {
        document.body.insertAdjacentHTML('beforeend', renderLangFab());
      }

      /* ── Nav behaviour ──────────────────────────── */
      var nav    = document.getElementById('main-nav');
      var burger = document.getElementById('nav-burger');
      var mob    = document.getElementById('mob-overlay');

      /* scroll: transparent → solid (homepage) / always solid (other pages) */
      if (nav) {
        if (!isHomepage) {
          nav.classList.add('nav--solid');
        } else {
          var onScroll = function () {
            nav.classList.toggle('nav--solid', window.scrollY > 60);
          };
          window.addEventListener('scroll', onScroll, { passive: true });
          onScroll();
        }
      }

      /* burger / mobile overlay */
      if (burger && mob) {
        burger.addEventListener('click', function () {
          var open = mob.classList.toggle('mob-overlay--open');
          burger.classList.toggle('nav__burger--open', open);
          burger.setAttribute('aria-expanded', String(open));
          mob.setAttribute('aria-hidden', String(!open));
          document.body.classList.toggle('body--nav-open', open);
        });
        mob.querySelectorAll('a').forEach(function (a) {
          a.addEventListener('click', function () {
            mob.classList.remove('mob-overlay--open');
            burger.classList.remove('nav__burger--open');
            burger.setAttribute('aria-expanded', 'false');
            mob.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('body--nav-open');
          });
        });
        /* close on outside click */
        document.addEventListener('click', function (e) {
          if (!nav.contains(e.target) && !mob.contains(e.target)) {
            mob.classList.remove('mob-overlay--open');
            burger.classList.remove('nav__burger--open');
            burger.setAttribute('aria-expanded', 'false');
            mob.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('body--nav-open');
          }
        });
      }

      /* mobile accordion — Products dropdown toggle */
      document.querySelectorAll('.mob__group-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var group = btn.closest('.mob__group');
          var items = group.querySelector('.mob__group-items');
          var open  = group.classList.toggle('mob__group--open');
          btn.setAttribute('aria-expanded', String(open));
          items.setAttribute('aria-hidden', String(!open));
        });
      });

      /* desktop dropdown: click-toggle (touch-friendly) */
      document.querySelectorAll('.nav__item--has-dd').forEach(function (item) {
        var link = item.querySelector('.nav__link');
        link.addEventListener('click', function (e) {
          e.preventDefault();
          var isOpen = item.classList.toggle('nav__item--dd-open');
          link.setAttribute('aria-expanded', String(isOpen));
          /* close others */
          document.querySelectorAll('.nav__item--has-dd').forEach(function (other) {
            if (other !== item) {
              other.classList.remove('nav__item--dd-open');
              other.querySelector('.nav__link').setAttribute('aria-expanded', 'false');
            }
          });
        });
        /* close on outside click */
        document.addEventListener('click', function (e) {
          if (!item.contains(e.target)) {
            item.classList.remove('nav__item--dd-open');
            link.setAttribute('aria-expanded', 'false');
          }
        });
      });
    },

    remount: function (activeHref) { this.mount(activeHref); },
  };

})(SITE_CONFIG);
