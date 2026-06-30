/**
 * Madar Randa — Site Configuration
 * ─────────────────────────────────────────────────────
 * All nav, footer, contact, hero, and company data lives here.
 * Edit this ONE file to update any text visible on every page.
 */

const SITE_CONFIG = {

  /* ── Company ──────────────────────────────────────── */
  company: {
    nameEn: 'Madar Randa',
    nameAr: 'مدار رندا',
    taglineEn: 'Engineering Access Solutions',
    taglineAr: 'هندسة حلول الوصول',
    foundedYear: 1994,
    yearsActive: 30,
  },

  /* ── Logo ─────────────────────────────────────────── */
  logo: {
    src: 'assets/logos/logo.png',
    alt: 'Madar Randa',
    height: 52,
  },

  /* ── WhatsApp ─────────────────────────────────────── */
  whatsapp: {
    number: '966508009799',
    messageEn: "Hello, I'd like to request a quote for your door solutions.",
    messageAr: 'مرحباً، أود طلب عرض سعر لحلول الأبواب لديكم.',
    ariaLabelEn: 'Chat with us on WhatsApp',
    ariaLabelAr: 'تواصل معنا عبر واتساب',
  },

  /* ── Contact ──────────────────────────────────────── */
  contact: {
    phone: '+966 508 009 799',
    phoneTel: '+966508009799',
    email: 'info@madaranda.com',
    addressEn: 'Al-Fayiziyyah, Prince Sultan bin Abdulaziz Rd, Buraydah, Al-Qassim',
    addressAr: 'القصيم - بريدة – الفايزية – طريق الأمير سلطان بن عبدالعزيز',
  },

  /* ── Navigation ───────────────────────────────────── */
  nav: {
    links: [
      { en: 'Home',        ar: 'الرئيسية',  href: 'index.html'       },
      { en: 'About',       ar: 'عن الشركة', href: 'about.html'       },
      {
        en: 'Products', ar: 'المنتجات', href: 'services.html',
        /* dropdown items — rendered as mega-menu panel */
        dropdown: [
          { en: 'Automatic Glass Doors',  ar: 'الأبواب الزجاجية الأوتوماتيكية', href: 'service.html?slug=glass-doors'      },
          { en: 'Sectional Doors',         ar: 'الأبواب المقطعية',                href: 'service.html?slug=sectional-doors'  },
          { en: 'Fast-Action Doors',       ar: 'الأبواب السريعة',                 href: 'service.html?slug=fast-doors'       },
          { en: 'Loading Dock Systems',    ar: 'أنظمة رصيف التحميل',             href: 'service.html?slug=loading-dock'     },
          { en: 'Road Barriers',           ar: 'حواجز الطرق',                     href: 'service.html?slug=road-barriers'    },
          { en: 'Security Entrances',      ar: 'البوابات الأمنية',                href: 'service.html?slug=security-entrances'},
          { en: 'Automatic Windows',       ar: 'النوافذ الأوتوماتيكية',          href: 'service.html?slug=auto-windows'     },
          { en: 'Villa & Palace Gates',    ar: 'أبواب الفلل والقصور',            href: 'service.html?slug=villa-gates'      },
          { en: 'Sliding Door Motors',     ar: 'محركات الأبواب الانزلاقية',      href: 'service.html?slug=sliding-motors'   },
          { en: 'Aircraft Hangar Doors',   ar: 'أبواب هناجر الطائرات',           href: 'service.html?slug=hangar-doors'     },
        ],
      },
      { en: 'Projects',    ar: 'المشاريع',  href: 'projects.html'    },
      { en: 'Maintenance', ar: 'الصيانة',   href: 'maintenance.html' },
      { en: 'Contact',     ar: 'اتصل بنا',  href: 'contact.html'     },
    ],
    cta: {
      en: 'Get a Quote',
      ar: 'اطلب عرض سعر',
      href: 'contact.html',
    },
  },

  /* ── Hero (homepage only) ─────────────────────────── */
  hero: {
    slides: [
      {
        img: 'assets/images/hero-glass-door.jpg',
        badgeEn: 'CE Certified · Saudi Arabia',
        badgeAr: 'معتمدة CE · المملكة العربية السعودية',
        titleEn: ['Every Door', 'We Install', 'Still Works'],
        titleAr: ['كل باب نركّبه', 'لا يزال يعمل'],
        subEn: 'CE-certified sliding, swing, and revolving doors engineered for hospitals, airports, and commercial lobbies across Saudi Arabia.',
        subAr: 'أبواب أوتوماتيكية معتمدة CE للمستشفيات والمطارات والمراكز التجارية في جميع أنحاء المملكة.',
      },
      {
        img: 'assets/images/hero-hangar.jpg',
        badgeEn: 'Aviation Grade · 50m+ Widths',
        badgeAr: 'مواصفات طيرانية · أكثر من ٥٠م',
        titleEn: ['Aircraft Hangar', 'Doors Built', 'for Every Scale'],
        titleAr: ['أبواب هناجر', 'الطائرات'],
        subEn: 'Custom-engineered aviation-grade hangar doors — supplied, installed, and maintained to exact specifications.',
        subAr: 'أبواب هناجر مخصصة بمواصفات طيرانية، نوردها ونركّبها ونصونها بدقة تامة.',
      },
      {
        img: 'assets/images/project-install-1.png',
        badgeEn: '500+ Completed Projects',
        badgeAr: '٥٠٠+ مشروع منجز',
        titleEn: ['Trusted Across', 'Saudi Arabia', 'Since 1994'],
        titleAr: ['موثوقون في المملكة', 'منذ ١٩٩٤'],
        subEn: 'Three decades of continuous operation, trusted by government, healthcare, and industrial clients nationwide.',
        subAr: 'ثلاثة عقود من التشغيل المتواصل، موثوقون من الجهات الحكومية والصحية والصناعية في جميع المملكة.',
      },
    ],
    ctaPrimary:   { en: 'Request a Quote →', ar: 'اطلب عرض سعر ←', href: 'contact.html' },
    ctaSecondary: { en: 'View Projects',      ar: 'استعرض المشاريع',  href: 'projects.html' },
    infoCard: {
      numEn: '500', numSuffixEn: '+',
      numAr: '٥٠٠', numSuffixAr: '+',
      labelEn: 'Successful installations and counting',
      labelAr: 'تركيب ناجح وفي تزايد مستمر',
      checklist: [
        { en: 'CE Certified Systems',      ar: 'أنظمة معتمدة CE'        },
        { en: '24-Hour Engineer Response', ar: 'استجابة مهندسين ٢٤ ساعة' },
        { en: 'Nationwide Coverage',       ar: 'تغطية على مستوى المملكة' },
      ],
    },
    stats: [
      { numEn: '30+',  numAr: '٣٠+',  labelEn: 'Years of Operation',  labelAr: 'سنة خبرة'     },
      { numEn: '500+', numAr: '٥٠٠+', labelEn: 'Projects Completed',  labelAr: 'مشروع منجز'   },
      { numEn: '10+',  numAr: '١٠+',  labelEn: 'Product Categories',  labelAr: 'فئة منتجات'   },
    ],
  },

  /* ── Footer ───────────────────────────────────────── */
  footer: {
    taglineEn: '30+ years engineering access solutions across Saudi Arabia.',
    taglineAr: 'أكثر من ٣٠ عاماً من هندسة حلول الوصول في المملكة العربية السعودية.',
    columns: [
      {
        titleEn: 'Products',
        titleAr: 'المنتجات',
        links: [
          { en: 'Automatic Glass Doors', ar: 'الأبواب الزجاجية',     href: 'service.html?slug=glass-doors'     },
          { en: 'Sectional Doors',        ar: 'الأبواب المقطعية',      href: 'service.html?slug=sectional-doors' },
          { en: 'Fast-Action Doors',      ar: 'الأبواب السريعة',       href: 'service.html?slug=fast-doors'      },
          { en: 'Loading Dock Systems',   ar: 'رصيف التحميل',          href: 'service.html?slug=loading-dock'    },
          { en: 'Road Barriers',          ar: 'حواجز الطرق',           href: 'service.html?slug=road-barriers'   },
          { en: 'Aircraft Hangar Doors',  ar: 'أبواب هناجر الطائرات', href: 'service.html?slug=hangar-doors'    },
        ],
      },
      {
        titleEn: 'Company',
        titleAr: 'الشركة',
        links: [
          { en: 'About',       ar: 'عن الشركة', href: 'about.html'       },
          { en: 'Projects',    ar: 'مشاريعنا',   href: 'projects.html'    },
          { en: 'Maintenance', ar: 'الصيانة',    href: 'maintenance.html' },
          { en: 'Contact',     ar: 'اتصل بنا',   href: 'contact.html'     },
        ],
      },
    ],
    legalEn: '© 2025 Madar Randa. All rights reserved.',
    legalAr: '© ٢٠٢٥ مدار رندا. جميع الحقوق محفوظة.',
    visionLogo: 'assets/partners/vision-2030.png',
  },

  /* ── Partner logos ────────────────────────────────── */
  partners: [
    { src: 'assets/partners/assa-abloy.png', alt: 'ASSA ABLOY' },
    { src: 'assets/partners/bft.png',        alt: 'BFT'        },
    { src: 'assets/partners/came.png',        alt: 'CAME'       },
    { src: 'assets/partners/jielong.png',     alt: 'Jielong'    },
  ],

  /* ── SEO defaults ─────────────────────────────────── */
  seo: {
    siteUrl: 'https://www.madaranda.com',
    ogImage: 'assets/logos/logo-bg.png',
    twitterHandle: '@madaranda',
  },

};

Object.freeze(SITE_CONFIG);
