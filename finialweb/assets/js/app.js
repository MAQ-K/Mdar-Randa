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
    // Remount header/footer/whatsapp with correct language
    MadarComponents.remount(activeHref);
    // Reinitialize page-specific interactives
    initInteractives();
  }

  function setLang(lang) {
    applyLang(lang);
  }

  /* ── Init ─────────────────────────────────────────── */
  function init(href) {
    activeHref = href || '';
    currentLang = getLang();
    applyLang(currentLang);
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
    if (!service) {
      container.innerHTML = '<p>Service not found.</p>';
      return;
    }

    // Update page title
    document.title = (ar ? service.titleAr : service.title) + ' — ' + (ar ? 'مدار رندا' : 'Madar Randa');

    var title = ar ? service.titleAr : service.title;
    var desc  = ar ? service.descAr  : service.desc;
    var features = ar ? service.featuresAr : service.features;

    container.innerHTML =
      '<section class="section section--white">' +
        '<div class="container">' +
          '<div class="service-detail-grid">' +
            '<div>' +
              '<img src="' + service.img + '" alt="' + title + '" class="service-detail__img">' +
            '</div>' +
            '<div>' +
              '<span class="eyebrow">' + (ar ? 'حلول هندسية' : 'Engineering Solution') + '</span>' +
              '<h1 class="section-title">' + title + '</h1>' +
              '<p class="section-subtitle" style="margin-bottom:24px">' + desc + '</p>' +
              '<ul class="service-detail__features">' +
                features.map(function (f) { return '<li class="service-detail__feature">' + f + '</li>'; }).join('') +
              '</ul>' +
              '<div class="btn-group">' +
                '<a href="contact.html" class="btn btn--accent btn--lg">' + (ar ? 'اطلب عرض سعر ←' : 'Request a Quote →') + '</a>' +
                '<a href="tel:' + SITE_CONFIG.contact.phoneTel + '" class="btn btn--ghost">' + SITE_CONFIG.contact.phone + '</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  /* ── Run all interactives ─────────────────────────── */
  function initInteractives() {
    initFAQ();
    initProjectFilter();
    initRFQForm();
    initServicePage();
    initLazyImages();
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
    img: '../assets/images/product-glass-door.jpg',
    features: ['CE certified to EN 16005','Sliding, swing & revolving configurations','Sensor-activated and timer-controlled','Aluminium frame – powder coated or anodised','24/7 emergency service contract available'],
    featuresAr: ['معتمدة CE وفق EN 16005','تصميمات انزلاقية ومفصلية ودوارة','تعمل بالحساسات والمؤقتات','إطار ألومنيوم – طلاء بودرة أو أكسدة','عقد خدمة طوارئ على مدار الساعة'],
  },
  {
    slug: 'sectional-doors',
    title: 'Sectional Doors', titleAr: 'الأبواب المقطعية',
    desc: 'Heavy-duty insulated sectional industrial doors for warehouses, factories, and logistics centres. Wind-load rated and automated.',
    descAr: 'أبواب مقطعية صناعية معزولة عالية الأداء للمستودعات والمصانع ومراكز اللوجستيات. مقدّرة لحمل الرياح وأوتوماتيكية التشغيل.',
    img: '../assets/images/product-sectional-door.jpg',
    features: ['Insulated steel panels (40–80mm)','Wind-load rated to EN 13241','Manual override for power outages','Integrated pedestrian door option','Annual maintenance contracts'],
    featuresAr: ['ألواح فولاذية معزولة (40–80 ملم)','مقدّرة لحمل الرياح وفق EN 13241','تشغيل يدوي عند انقطاع الكهرباء','خيار باب مشاة متكامل','عقود صيانة سنوية'],
  },
  {
    slug: 'fast-doors',
    title: 'Fast-Action Doors', titleAr: 'الأبواب السريعة',
    desc: 'High-speed roll-up doors for cold storage, pharmaceutical, and high-traffic industrial facilities. Speeds up to 2m/s.',
    descAr: 'أبواب لفافية سريعة للمخازن الباردة والمرافق الدوائية والصناعية عالية الحركة. سرعة تصل إلى 2 م/ث.',
    img: '../assets/images/product-fast-door.jpg',
    features: ['Opening speed up to 2 m/s','Self-repairing fabric on impact','IP65-rated motor enclosure','Temperature range -30°C to +60°C','Energy-saving: minimises cold air loss'],
    featuresAr: ['سرعة فتح تصل إلى 2 م/ث','قماش ذاتي الإصلاح عند الاصطدام','محرك بحماية IP65','نطاق درجات حرارة من -30 إلى +60°م','توفير الطاقة: تقليل فقدان الهواء البارد'],
  },
  {
    slug: 'loading-dock',
    title: 'Loading Dock Systems', titleAr: 'أنظمة رصيف التحميل',
    desc: 'Complete dock solutions: hydraulic dock levellers, dock shelters, bumpers, and vehicle restraints for logistics operations.',
    descAr: 'حلول رصيف متكاملة: موازنات رصيف هيدروليكية ومظلات رصيف ومصدات وقيود مركبات لعمليات اللوجستيات.',
    img: '../assets/images/product-loading-dock.jpg',
    features: ['Hydraulic & mechanical dock levellers','Capacity up to 6 tonnes','Vehicle restraints for safety','Dock shelters & inflatable seals','Integrated dock management system'],
    featuresAr: ['موازنات هيدروليكية وميكانيكية','حمولة تصل إلى 6 أطنان','قيود مركبات للسلامة','مظلات رصيف وأختام قابلة للنفخ','نظام إدارة رصيف متكامل'],
  },
  {
    slug: 'road-barriers',
    title: 'Road Barriers & Parking Control', titleAr: 'حواجز الطرق والتحكم في المواقف',
    desc: 'Automatic boom gates and full parking management systems for commercial, government, and residential facilities.',
    descAr: 'بوابات أوتوماتيكية وأنظمة إدارة مواقف متكاملة للمرافق التجارية والحكومية والسكنية.',
    img: '../assets/images/project-barrier.jpg',
    features: ['Boom arms 3m–6m length','RFID, barcode & intercom integration','Traffic loop & photocell safety','ANPR camera-ready','Remote monitoring capability'],
    featuresAr: ['أذرع من 3 إلى 6 أمتار','تكامل RFID والباركود والاتصال الداخلي','حلقة مرورية وفوتوسيل للسلامة','جاهز لكاميرات ANPR','قدرة المراقبة عن بُعد'],
  },
  {
    slug: 'security-entrances',
    title: 'Security Entrances', titleAr: 'البوابات الأمنية',
    desc: 'Turnstiles, speed gates, and full-height security entrances for high-security environments including government and data centres.',
    descAr: 'بوابات دوارة وبوابات سريعة ومداخل أمنية بالارتفاع الكامل للبيئات عالية الأمان بما فيها الجهات الحكومية ومراكز البيانات.',
    img: '../assets/images/project-security.jpg',
    features: ['Waist-height & full-height turnstiles','Speed lane gates up to 40 persons/min','Biometric & access card integration','Anti-passback & tailgate detection','CE certified'],
    featuresAr: ['بوابات دوارة على مستوى الخصر والارتفاع الكامل','بوابات مسرع تصل لـ 40 شخص/دقيقة','تكامل البصمة وبطاقة الوصول','كشف التمرير العكسي والمصاحبة','معتمدة CE'],
  },
  {
    slug: 'auto-windows',
    title: 'Automatic Windows & Roller Shutters', titleAr: 'النوافذ الأوتوماتيكية وستائر التدحرج',
    desc: 'Aluminium roller shutters and automatic window systems for commercial and residential buildings. Remote and timer-controlled.',
    descAr: 'ستائر أوتوماتيكية ونوافذ آلية للمباني التجارية والسكنية. تعمل عن بُعد وبالمؤقتات.',
    img: '../assets/images/product-auto-window.jpg',
    features: ['Extruded aluminium slats','Manual override crank','Solar-powered motor option','Remote control & smart home integration','Fire-rated versions available'],
    featuresAr: ['شرائح ألومنيوم مبثوقة','تشغيل يدوي بالمدور','خيار محرك يعمل بالطاقة الشمسية','تحكم عن بُعد وتكامل المنزل الذكي','إصدارات مقاومة للحريق'],
  },
  {
    slug: 'villa-gates',
    title: 'Villa & Palace Gates', titleAr: 'أبواب الفلل والقصور',
    desc: 'Custom-engineered entrance gates for premium residential properties, villas, and private estates. Sliding and swing configurations.',
    descAr: 'بوابات هندسية مخصصة للفلل والقصور والمنازل الراقية. تصميمات انزلاقية ومفصلية.',
    img: '../assets/images/product-villa-door.jpg',
    features: ['Custom steel or aluminium fabrication','Swing & sliding gate automation','Intercom & video doorbell integration','GSM remote control','Decorative finishes & custom designs'],
    featuresAr: ['تصنيع مخصص من فولاذ أو ألومنيوم','أتمتة بوابات مفصلية وانزلاقية','تكامل الاتصال الداخلي وجرس الباب بالفيديو','تحكم عن بُعد GSM','تشطيبات زخرفية وتصاميم مخصصة'],
  },
  {
    slug: 'sliding-motors',
    title: 'Sliding Door Motors', titleAr: 'محركات الأبواب الانزلاقية',
    desc: 'Retrofit automation motors for existing iron and steel sliding gates. Supply, installation, and full maintenance service.',
    descAr: 'محركات أتمتة لتجديد أبواب الحديد والفولاذ الانزلاقية الموجودة. توريد وتركيب وصيانة شاملة.',
    img: '../assets/images/product-iron-motor.jpg',
    features: ['Compatible with gates up to 800kg','24V DC rack & pinion drive','Remote control & loop detector','Soft-start & soft-stop','Battery backup for power outages'],
    featuresAr: ['متوافق مع بوابات حتى 800 كغ','محرك 24 فولت DC بنظام الرف والترس','تحكم عن بُعد وكاشف حلقة','بدء ناعم وإيقاف ناعم','احتياطي بطارية عند انقطاع الكهرباء'],
  },
  {
    slug: 'hangar-doors',
    title: 'Aircraft Hangar Doors', titleAr: 'أبواب هناجر الطائرات',
    desc: 'Custom-engineered bi-folding and sliding hangar doors to aviation-grade specifications. Clear widths from 10m to 50m+.',
    descAr: 'أبواب هناجر مطوية ومنزلقة مخصصة وفق المواصفات الطيرانية. فتحات صافية من 10 إلى أكثر من 50 متراً.',
    img: '../assets/images/hero-hangar.jpg',
    features: ['Clear opening widths to 50m+','Bi-folding, sliding & bottom-rolling','Wind-load structural engineering','Aviation-grade specifications','Full installation & commissioning'],
    featuresAr: ['فتحات صافية تصل لأكثر من 50م','طي ثنائي وانزلاق وتدحرج سفلي','هندسة هيكلية لحمل الرياح','مواصفات طيرانية','تركيب وتشغيل كاملان'],
  },
];
