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
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    wa:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    pin:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
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

    /* mobile links (flat, includes dropdown children) */
    var mobileHtml = nav.links.map(function (l) {
      var label = esc(ar ? l.ar : l.en);
      var html = '<a href="' + esc(l.href) + '" class="mob__link">' + label + '</a>';
      if (l.dropdown) {
        html += l.dropdown.map(function (d) {
          return '<a href="' + esc(d.href) + '" class="mob__link mob__link--sub">' + esc(ar ? d.ar : d.en) + '</a>';
        }).join('');
      }
      return html;
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
              '<span class="nav__phone-num">' + esc(cfg.contact.phone) + '</span>' +
            '</a>' +
            '<div class="lang-switcher" role="group" aria-label="Language switcher">' +
              '<button class="lang-switcher__btn' + (!ar ? ' lang-switcher__btn--active' : '') + '" ' +
                'onclick="MadarApp.setLang(\'en\')" aria-label="Switch to English" aria-pressed="' + (!ar) + '">EN</button>' +
              '<button class="lang-switcher__btn' + (ar ? ' lang-switcher__btn--active' : '') + '" ' +
                'onclick="MadarApp.setLang(\'ar\')" aria-label="التبديل إلى العربية" aria-pressed="' + ar + '">ع</button>' +
            '</div>' +
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

  /* ── Homepage Hero Slider ─────────────────────────── */
  function renderHero() {
    var ar    = isAr();
    var h     = cfg.hero;
    if (!h) return '';

    var slidesHtml = h.slides.map(function (s, i) {
      var lines = (ar ? s.titleAr : s.titleEn);
      var titleHtml = lines.map(function (line) {
        return '<span class="hs__title-line"><span>' + esc(line) + '</span></span>';
      }).join('');
      return '<div class="hs__slide' + (i === 0 ? ' hs__slide--active' : '') + '" ' +
        'style="background-image:url(\'' + esc(s.img) + '\')" aria-hidden="' + (i !== 0) + '">' +
        '<div class="hs__slide-overlay"></div>' +
        '<div class="hs__slide-content container">' +
          '<p class="hs__badge animate-fade-up">' + esc(ar ? s.badgeAr : s.badgeEn) + '</p>' +
          '<h1 class="hs__title animate-fade-up anim-delay-1">' + titleHtml + '</h1>' +
          '<div class="hs__actions animate-fade-up anim-delay-2">' +
            '<a href="' + esc(h.ctaPrimary.href) + '" class="btn btn--accent btn--lg">' + esc(ar ? h.ctaPrimary.ar : h.ctaPrimary.en) + '</a>' +
            '<a href="' + esc(h.ctaSecondary.href) + '" class="btn btn--outline-white btn--lg">' + esc(ar ? h.ctaSecondary.ar : h.ctaSecondary.en) + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    var dotsHtml = h.slides.map(function (s, i) {
      return '<button class="hs__dot' + (i === 0 ? ' hs__dot--active' : '') + '" data-index="' + i + '" aria-label="Slide ' + (i+1) + '"></button>';
    }).join('');

    var statsHtml = h.stats.map(function (s, i) {
      return (i > 0 ? '<div class="hs__stat-div" aria-hidden="true"></div>' : '') +
        '<div class="hs__stat">' +
          '<span class="hs__stat-num">' + esc(ar ? s.numAr : s.numEn) + '</span>' +
          '<span class="hs__stat-label">' + esc(ar ? s.labelAr : s.labelEn) + '</span>' +
        '</div>';
    }).join('');

    return '<section class="hero-slider" id="hero-slider" aria-label="' + (ar ? 'الصفحة الرئيسية' : 'Homepage hero') + '">' +
      slidesHtml +

      /* Stats bar */
      '<div class="hs__stats">' +
        '<div class="container hs__stats-inner">' + statsHtml + '</div>' +
      '</div>' +

      /* Controls */
      '<div class="hs__controls">' +
        '<div class="hs__dots">' + dotsHtml + '</div>' +
        '<div class="hs__counter">' +
          '<span class="hs__cur">01</span>' +
          '<span class="hs__sep"> / </span>' +
          '<span class="hs__total">0' + h.slides.length + '</span>' +
        '</div>' +
      '</div>' +

      '<button class="hs__nav hs__prev" id="hs-prev" aria-label="Previous slide">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>' +
      '</button>' +
      '<button class="hs__nav hs__next" id="hs-next" aria-label="Next slide">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
      '</button>' +

      /* Scroll hint */
      '<div class="hs__scroll-hint" aria-hidden="true">' +
        '<div class="hs__scroll-line"></div>' +
        '<span>' + (ar ? 'مرر' : 'Scroll') + '</span>' +
      '</div>' +
    '</section>';
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

    var contactItems = [
      { icon: ICON.phone, text: cfg.contact.phone,                         href: 'tel:' + cfg.contact.phoneTel },
      { icon: ICON.email, text: cfg.contact.email,                         href: 'mailto:' + cfg.contact.email },
      { icon: ICON.wa,    text: 'WhatsApp',                                href: 'https://wa.me/' + cfg.whatsapp.number },
      { icon: ICON.pin,   text: ar ? cfg.contact.addressAr : cfg.contact.addressEn, href: '#' },
    ].map(function (c) {
      return '<a href="' + esc(c.href) + '" class="footer__link footer__contact-item">' +
        '<span class="footer__contact-icon">' + c.icon + '</span>' +
        '<span>' + esc(c.text) + '</span>' +
      '</a>';
    }).join('');

    return '<footer class="footer" role="contentinfo">' +
      '<div class="container">' +
        '<div class="footer__grid">' +
          '<div>' +
            '<img src="' + esc(cfg.logo.src) + '" alt="' + esc(cfg.logo.alt) + '" class="footer__logo" onerror="this.style.display=\'none\'">' +
            '<div class="footer__brand-name">' + esc(cfg.company.nameAr) + '</div>' +
            '<span class="footer__brand-tag">' + esc(cfg.company.taglineEn) + '</span>' +
            '<p class="footer__brand-text">' + esc(ar ? f.taglineAr : f.taglineEn) + '</p>' +
          '</div>' +
          columnsHtml +
          '<div>' +
            '<span class="footer__col-title">' + (ar ? 'تواصل معنا' : 'Contact') + '</span>' +
            contactItems +
          '</div>' +
        '</div>' +
        '<div class="footer__bottom">' +
          '<span class="footer__legal">' + esc(ar ? f.legalAr : f.legalEn) + '</span>' +
          '<img src="' + esc(f.visionLogo) + '" alt="Saudi Vision 2030" class="footer__vision">' +
        '</div>' +
      '</div>' +
    '</footer>';
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

  /* ── Mount ────────────────────────────────────────── */
  window.MadarComponents = {
    renderHeader:   renderHeader,
    renderHero:     renderHero,
    renderFooter:   renderFooter,
    renderWhatsApp: renderWhatsApp,

    mount: function (activeHref) {
      var isHomepage = !activeHref || activeHref === 'index.html';

      /* Header */
      var hEl = document.getElementById('site-header');
      if (hEl) hEl.innerHTML = renderHeader(activeHref, isHomepage);

      /* Hero (homepage only) */
      var heroEl = document.getElementById('site-hero');
      if (heroEl) heroEl.innerHTML = renderHero();

      /* Footer */
      var fEl = document.getElementById('site-footer');
      if (fEl) fEl.innerHTML = renderFooter();

      /* FABs */
      var wa = document.getElementById('whatsapp-btn');
      if (wa) wa.innerHTML = renderWhatsApp() + renderBackToTop();

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
