/**
 * Madar Randa — Shared Components
 * Renders header, footer, and WhatsApp button into the DOM.
 * All content comes from SITE_CONFIG (js/config.js).
 */

(function (cfg) {
  'use strict';

  /* ── Helpers ──────────────────────────────────────── */
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isAr() {
    return document.documentElement.dir === 'rtl';
  }

  function t(en, ar) {
    return isAr() ? ar : en;
  }

  /* ── Header ───────────────────────────────────────── */
  function renderHeader(activeHref) {
    const logo = cfg.logo;
    const nav = cfg.nav;
    const ar = isAr();

    const linksHtml = nav.links.map(function (l) {
      const isActive = activeHref && l.href === activeHref;
      return '<a href="' + esc(l.href) + '" class="nav__link' + (isActive ? ' nav__link--active' : '') + '">' +
        esc(ar ? l.ar : l.en) + '</a>';
    }).join('');

    const mobileLinksHtml = nav.links.map(function (l) {
      return '<a href="' + esc(l.href) + '" class="nav__mobile-link">' + esc(ar ? l.ar : l.en) + '</a>';
    }).join('');

    return '<nav class="nav" id="main-nav" role="navigation" aria-label="Main navigation">' +
      '<div class="nav__inner">' +
        '<a href="index.html" class="nav__logo" aria-label="' + esc(cfg.company.nameEn) + ' – Home">' +
          '<img src="' + esc(logo.src) + '" alt="' + esc(logo.alt) + '" height="' + logo.height + '" width="auto" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">' +
          '<div class="nav__logo-text" style="display:none">' +
            '<span class="nav__logo-name">' + esc(ar ? cfg.company.nameAr : cfg.company.nameEn.toUpperCase()) + '</span>' +
            '<span class="nav__logo-tagline">' + esc(cfg.company.taglineEn) + '</span>' +
          '</div>' +
        '</a>' +
        '<div class="nav__links" role="list">' + linksHtml + '</div>' +
        '<div class="nav__spacer"></div>' +
        '<div class="lang-switcher" role="group" aria-label="Language switcher">' +
          '<button class="lang-switcher__btn' + (!ar ? ' lang-switcher__btn--active' : '') + '" onclick="MadarApp.setLang(\'en\')" aria-label="Switch to English" aria-pressed="' + (!ar) + '">EN</button>' +
          '<button class="lang-switcher__btn' + (ar ? ' lang-switcher__btn--active' : '') + '" onclick="MadarApp.setLang(\'ar\')" aria-label="التبديل إلى العربية" aria-pressed="' + ar + '">عربي</button>' +
        '</div>' +
        '<a href="' + esc(nav.cta.href) + '" class="nav__cta">' + esc(ar ? nav.cta.ar : nav.cta.en) + '</a>' +
        '<button class="nav__toggle" id="nav-toggle" aria-label="' + (ar ? 'فتح القائمة' : 'Open menu') + '" aria-expanded="false" aria-controls="nav-mobile">' +
          '<span class="nav__toggle-bar"></span>' +
          '<span class="nav__toggle-bar"></span>' +
          '<span class="nav__toggle-bar"></span>' +
        '</button>' +
      '</div>' +
      '<div class="nav__mobile" id="nav-mobile" role="dialog" aria-label="Mobile navigation">' +
        mobileLinksHtml +
        '<a href="' + esc(nav.cta.href) + '" class="nav__mobile-cta">' + esc(ar ? nav.cta.ar : nav.cta.en) + '</a>' +
      '</div>' +
    '</nav>';
  }

  /* ── Footer ───────────────────────────────────────── */
  function renderFooter() {
    const f = cfg.footer;
    const ar = isAr();

    const columnsHtml = f.columns.map(function (col) {
      const linksHtml = col.links.map(function (l) {
        return '<a href="' + esc(l.href) + '" class="footer__link">' + esc(ar ? l.ar : l.en) + '</a>';
      }).join('');
      return '<div>' +
        '<span class="footer__col-title">' + esc(ar ? col.titleAr : col.titleEn) + '</span>' +
        linksHtml +
      '</div>';
    }).join('');

    const contactHtml = [
      { icon: '📞', text: cfg.contact.phone, href: 'tel:' + cfg.contact.phoneTel },
      { icon: '📧', text: cfg.contact.email, href: 'mailto:' + cfg.contact.email },
      { icon: '💬', text: 'WhatsApp', href: 'https://wa.me/' + cfg.whatsapp.number },
      { icon: '📍', text: ar ? cfg.contact.addressAr : cfg.contact.addressEn, href: '#' },
    ].map(function (c) {
      return '<a href="' + esc(c.href) + '" class="footer__link">' + c.icon + ' ' + esc(c.text) + '</a>';
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
            contactHtml +
          '</div>' +
        '</div>' +
        '<div class="footer__bottom">' +
          '<span class="footer__legal">' + esc(ar ? f.legalAr : f.legalEn) + '</span>' +
          '<img src="' + esc(f.visionLogo) + '" alt="Saudi Vision 2030" class="footer__vision">' +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  /* ── WhatsApp Button ──────────────────────────────── */
  function renderWhatsApp() {
    const wa = cfg.whatsapp;
    const ar = isAr();
    const msg = encodeURIComponent(ar ? wa.messageAr : wa.messageEn);
    const label = ar ? wa.ariaLabelAr : wa.ariaLabelEn;
    const href = 'https://wa.me/' + wa.number + '?text=' + msg;

    return '<a href="' + esc(href) + '" class="whatsapp-fab" target="_blank" rel="noopener noreferrer" aria-label="' + esc(label) + '" title="' + esc(label) + '">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
      '</svg>' +
    '</a>';
  }

  /* ── Mount ────────────────────────────────────────── */
  window.MadarComponents = {
    renderHeader: renderHeader,
    renderFooter: renderFooter,
    renderWhatsApp: renderWhatsApp,

    mount: function (activeHref) {
      var h = document.getElementById('site-header');
      if (h) h.innerHTML = renderHeader(activeHref);

      var f = document.getElementById('site-footer');
      if (f) f.innerHTML = renderFooter();

      var wa = document.getElementById('whatsapp-btn');
      if (wa) wa.innerHTML = renderWhatsApp();

      // Nav scroll shadow
      var nav = document.getElementById('main-nav');
      if (nav) {
        window.addEventListener('scroll', function () {
          nav.classList.toggle('nav--scrolled', window.scrollY > 8);
        }, { passive: true });
      }

      // Mobile menu toggle
      var toggle = document.getElementById('nav-toggle');
      var mobile = document.getElementById('nav-mobile');
      if (toggle && mobile) {
        toggle.addEventListener('click', function () {
          var open = mobile.classList.toggle('nav__mobile--open');
          toggle.classList.toggle('nav__toggle--open', open);
          toggle.setAttribute('aria-expanded', open);
        });
        // Close on link click
        mobile.querySelectorAll('a').forEach(function (a) {
          a.addEventListener('click', function () {
            mobile.classList.remove('nav__mobile--open');
            toggle.classList.remove('nav__toggle--open');
            toggle.setAttribute('aria-expanded', false);
          });
        });
      }
    },

    remount: function (activeHref) {
      this.mount(activeHref);
    },
  };

})(SITE_CONFIG);
