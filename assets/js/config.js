/**
 * Madar Randa — Site Configuration
 * ─────────────────────────────────────────────────────
 * Edit this file to update: WhatsApp, phone, email, address,
 * logo, navigation links, footer columns, partner logos.
 * No other files need to change for branding/contact updates.
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
    src: '../assets/logos/logo.png',
    alt: 'Madar Randa',
    height: 36,         // px
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
      { en: 'Products',    ar: 'المنتجات',  href: 'services.html'     },
      { en: 'Projects',    ar: 'المشاريع',   href: 'projects.html'     },
      { en: 'About',       ar: 'عن الشركة',  href: 'about.html'        },
      { en: 'Maintenance', ar: 'الصيانة',    href: 'maintenance.html'  },
      { en: 'Contact',     ar: 'اتصل بنا',   href: 'contact.html'      },
    ],
    cta: {
      en: 'Request a Quote',
      ar: 'اطلب عرض سعر',
      href: 'contact.html',
    },
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
          { en: 'Automatic Glass Doors',  ar: 'الأبواب الزجاجية',        href: 'service.html?slug=glass-doors'     },
          { en: 'Sectional Doors',         ar: 'الأبواب المقطعية',         href: 'service.html?slug=sectional-doors' },
          { en: 'Fast-Action Doors',       ar: 'الأبواب السريعة',          href: 'service.html?slug=fast-doors'      },
          { en: 'Loading Dock Systems',    ar: 'رصيف التحميل',             href: 'service.html?slug=loading-dock'    },
          { en: 'Road Barriers',           ar: 'حواجز الطرق',             href: 'service.html?slug=road-barriers'   },
          { en: 'Aircraft Hangar Doors',   ar: 'أبواب هناجر الطائرات',    href: 'service.html?slug=hangar-doors'   },
        ],
      },
      {
        titleEn: 'Company',
        titleAr: 'الشركة',
        links: [
          { en: 'About Us',       ar: 'عن الشركة',  href: 'about.html'       },
          { en: 'Projects',       ar: 'مشاريعنا',    href: 'projects.html'    },
          { en: 'Maintenance',    ar: 'الصيانة',     href: 'maintenance.html' },
          { en: 'Contact Us',     ar: 'اتصل بنا',    href: 'contact.html'     },
        ],
      },
    ],
    legalEn: '© 2025 Madar Randa. All rights reserved.',
    legalAr: '© ٢٠٢٥ مدار رندا. جميع الحقوق محفوظة.',
    visionLogo: '../assets/partners/vision-2030.png',
  },

  /* ── Partner logos ────────────────────────────────── */
  partners: [
    { src: '../assets/partners/assa-abloy.png', alt: 'ASSA ABLOY' },
    { src: '../assets/partners/bft.png',        alt: 'BFT'        },
    { src: '../assets/partners/came.png',        alt: 'CAME'       },
    { src: '../assets/partners/jielong.png',     alt: 'Jielong'    },
  ],

  /* ── SEO defaults ─────────────────────────────────── */
  seo: {
    siteUrl: 'https://www.madaranda.com',
    ogImage: '../assets/logos/logo-bg.png',
    twitterHandle: '@madaranda',
  },

};

// Freeze to prevent accidental mutation
Object.freeze(SITE_CONFIG);
