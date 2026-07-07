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
        en: 'Products', ar: 'المنتجات', href: 'products.html',
        dropdown: [
          /* ── Door categories all live inside products.html ── */
          { en: 'Overhead & Automatic Door Systems',                     ar: 'الأبواب السحابة لأعلى  ', href: 'products.html'       },
          /* ── Standalone product pages ── */
          { en: 'Aluminum Rolling Shutters',        ar: 'النوافذ الألمنيوم السحابة (الشتر)', href: 'product-shutters.html'          },
          { en: 'Gate & Iron Door Motors',          ar: 'محركات الأبواب الحديدية',           href: 'product-gate-motors.html'       },
          { en: 'Road Barriers & Entrance Control', ar: 'حواجز الطرق والمداخل',              href: 'product-road-barriers.html'     },
          { en: 'Loading Dock Equipment',           ar: 'رصيف معدات التحميل والتفريغ',       href: 'product-loading-dock.html'      },
          { en: 'Security Gates & Entrances',       ar: 'بوابات ومداخل أمنية',               href: 'product-security-entrance.html' },
        ],
      },
      { en: 'Projects',    ar: 'المشاريع',  href: 'projects.html'    },
      { en: 'After-Sales Services', ar: 'خدمات ما بعد البيع',   href: 'maintenance.html' },
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
        img: 'assets/images/project-install-1.png',
        badgeEn: '30+ Years of Engineering Excellence',
        badgeAr: 'أكثر من 30 عاماً من التميز الهندسي',
        titleEn: ['30 Years of', 'Engineering', 'Access Solutions'],
        titleAr: ['30 عاماً من', 'هندسة حلول الوصول'],
        subEn: 'Three decades of continuous operation, trusted by government, hospitals, and industrial clients nationwide.',
        subAr: 'ثلاثة عقود من التشغيل المتواصل، موثوقون من الجهات الحكومية والمستشفيات والصناعية في جميع المملكة.',
      },
    ],
    ctaPrimary:   { en: 'Request a Quote →', ar: 'اطلب عرض سعر ←', href: 'contact.html' },
    ctaSecondary: { en: 'View Projects',      ar: 'استعرض المشاريع',  href: 'projects.html' },
    infoCard: {
      numEn: '30', numSuffixEn: '+',
      numAr: '30', numSuffixAr: '+',
      labelEn: 'Years of Engineering Experience',
      labelAr: 'عاماً من الخبرة الهندسية',
      checklist: [
        { en: 'CE Certified Systems',      ar: 'أنظمة معتمدة CE'        },
        { en: '24-Hour Engineer Response', ar: 'استجابة مهندسين 24 ساعة' },
        { en: 'Nationwide Coverage',       ar: 'تغطية على مستوى المملكة' },
      ],
    },
    stats: [
      { numEn: '30+',  numAr: '30+',  labelEn: 'Years of Operation',  labelAr: 'سنة خبرة'     },
      { numEn: '500+', numAr: '500+', labelEn: 'Projects Completed',  labelAr: 'مشروع منجز'   },
      { numEn: '10+',  numAr: '10+',  labelEn: 'Product Categories',  labelAr: 'فئة منتجات'   },
    ],
  },

  /* ── Footer ───────────────────────────────────────── */
  footer: {
    taglineEn: '30+ years engineering access solutions across Saudi Arabia.',
    taglineAr: 'أكثر من 30 عاماً من هندسة حلول الوصول في المملكة العربية السعودية.',
    columns: [
      {
        titleEn: 'Overhead & Industrial Doors',
        titleAr: 'الأبواب السحابة والصناعية',
        links: [
          { en: 'Overhead Lifting Doors',   ar: 'الأبواب السحابة لأعلى',           href: 'products.html#prod-overhead'  },
          { en: 'Sectional Doors',          ar: 'الأبواب المقطعية',                href: 'products.html#prod-sectional' },
          { en: 'Automatic Glass Doors',    ar: 'الأبواب الزجاجية الأوتوماتيكية', href: 'products.html#prod-glass'     },
          { en: 'High-Speed PVC Doors',     ar: 'الأبواب السريعة PVC',             href: 'products.html#prod-pvc'       },
          { en: 'Aircraft Hangar Doors',    ar: 'أبواب هناجر الطائرات',            href: 'products.html#prod-hangar'    },
        ],
      },
      {
        titleEn: 'More Products',
        titleAr: 'منتجات أخرى',
        links: [
          { en: 'Automatic Sliding Doors',  ar: 'الأبواب الانزلاقية',    href: 'product-sliding-doors.html'    },
          { en: 'Automatic Swing Doors',    ar: 'الأبواب المفصلية',      href: 'product-swing-doors.html'      },
          { en: 'Automatic Revolving Doors',ar: 'الأبواب الدوارة',       href: 'product-revolving-doors.html'  },
          { en: 'Security Gates & Barriers',ar: 'البوابات الأمنية',      href: 'product-road-barriers.html'},
          { en: 'Loading Dock Systems',     ar: 'رصيف التحميل',           href: 'product-loading-dock.html'    },
          { en: 'Villa & Palace Gates',     ar: 'أبواب الفلل والقصور',   href: 'product-villa-gates.html'     },
        ],
      },
      {
        titleEn: 'Company',
        titleAr: 'الشركة',
        links: [
          { en: 'About',       ar: 'عن الشركة', href: 'about.html'       },
          { en: 'Projects',    ar: 'مشاريعنا',   href: 'projects.html'    },
          { en: 'After-Sales Services', ar: 'خدمات ما بعد البيع',    href: 'maintenance.html' },
          { en: 'Contact',     ar: 'اتصل بنا',   href: 'contact.html'     },
        ],
      },
    ],
    legalEn: '© 2025 Madar Randa. All rights reserved.',
    legalAr: '© 2025 مدار رندا. جميع الحقوق محفوظة.',
    visionLogo: 'assets/partners/vision-2030.png',
  },

  /* ── Partner logos ────────────────────────────────── */
  partners: [
    { src: 'assets/partners/assa-abloy-logo-2048x281-1-320x110.webp', alt: 'ASSA ABLOY' },
    { src: 'assets/partners/BFT-320x110.webp',                        alt: 'BFT'        },
    { src: 'assets/partners/CAME_logo-320x110.webp',                  alt: 'CAME'       },
    { src: 'assets/partners/jielong-373x248-1-320x110.webp',          alt: 'Jielong'    },
    { src: 'assets/partners/826bf0869e09f07552985e7574126b9d-320x110.webp', alt: 'ACM'  },
    { src: 'assets/partners/OIP-320x110.webp',                        alt: 'PROTECO'    },
    { src: 'assets/partners/R-320x110.webp',                          alt: 'Elsamec'    },
    { src: 'assets/partners/s-320x110.webp',                          alt: 'FAAC'       },
  ],

  /* ── SEO defaults ─────────────────────────────────── */
  seo: {
    siteUrl: 'https://www.madaranda.com',
    ogImage: 'assets/logos/logo-bg.png',
    twitterHandle: '@madaranda',
  },

};

Object.freeze(SITE_CONFIG);
