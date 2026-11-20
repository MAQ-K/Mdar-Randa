/**
 * Madar Randa — Site Configuration
 * ─────────────────────────────────────────────────────
 * All nav, footer, contact, hero, and company data lives here.
 * Edit this ONE file to update any text visible on every page.
 */

/* Product pages — single source for nav dropdown + footer links. */
var MR_PRODUCTS = [
  { en: 'Garage Doors',                       ar: 'أبواب الكراجات',                     href: 'product-garage-doors.html'      },
  { en: 'Shutter & Roll-Up Doors',            ar: 'أبواب الشتر والرول',                  href: 'product-shutter-roll-doors.html' },
  { en: 'Industrial Doors & Loading Equipment', ar: 'الأبواب الصناعية ومعدات التحميل',   href: 'product-industrial-doors.html'  },
  { en: 'Automatic Glass Doors',              ar: 'الأبواب الزجاجية الأوتوماتيكية',      href: 'product-glass-doors.html'       },
  { en: 'Gate Motors',                        ar: 'محركات البوابات',                     href: 'product-gate-motors.html'       },
  { en: 'Security Barriers & Parking Systems', ar: 'الحواجز الأمنية وأنظمة المواقف',     href: 'product-security-entrance.html' },
  { en: 'Window Shutters',                    ar: 'شتر النوافذ',                         href: 'product-shutters.html'          },
  { en: 'Aircraft Hangar Doors',              ar: 'أبواب هناجر الطائرات',                href: 'product-hangar-doors.html'      },
];

const SITE_CONFIG = {

  /* ── Company ──────────────────────────────────────── */
  company: {
    nameEn: 'Madar Randa',
    nameAr: 'مدار رندا',
  },

  /* ── Logo ─────────────────────────────────────────── */
  logo: {
    src: 'assets/logos/logo.webp',
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
    /* Pre-filled message per request type. A link with data-wa="<key>" gets the
       message in the current language (see MadarApp.initWaLinks). */
    messages: {
      maintenance: {
        ar: 'مرحباً، أود طلب صيانة.\nنوع المنتج: \nوصف العطل: \nالموقع: \n(سأرفق صورة أو فيديو للعطل)',
        en: "Hello, I'd like to request maintenance.\nProduct type: \nFault description: \nLocation: \n(I'll attach a photo or video of the fault)",
      },
      contracts: {
        ar: 'مرحباً، أود الاستفسار عن عقود الصيانة الدورية للمنشأة.\nاسم المنشأة: \nعدد الأبواب/الأنظمة وأنواعها: \nالموقع: ',
        en: "Hello, I'd like to ask about periodic maintenance contracts for our facility.\nFacility name: \nNumber and types of doors/systems: \nLocation: ",
      },
      warranty: {
        ar: 'مرحباً، أود تقديم طلب ضمان.\nرقم الفاتورة أو بيانات الطلب: \nالاسم: \nموقع التركيب: \nوصف المشكلة: \n(سأرفق صورة أو فيديو إن أمكن)',
        en: "Hello, I'd like to submit a warranty request.\nInvoice number or order details: \nName: \nInstallation location: \nIssue description: \n(I'll attach a photo or video if possible)",
      },
      aftersales: {
        ar: 'مرحباً، لدي استفسار بخصوص خدمة ما بعد البيع لمنتج تم تركيبه.\nرقم الفاتورة أو بيانات الطلب: \nالاستفسار: ',
        en: 'Hello, I have an after-sales question about an installed product.\nInvoice number or order details: \nQuestion: ',
      },
      window: {
        ar: 'مرحباً، أحتاج مساعدة في اختيار شتر النوافذ المناسب (صندوق مخفي أو خارجي).\nسأرسل صورة النافذة ومقاساتها.',
        en: "Hello, I need help choosing the right window shutter (concealed or external box).\nI'll send a photo of the window and its dimensions.",
      },
      quote: {
        ar: 'مرحباً، أود طلب عرض سعر لحلول الأبواب لديكم.',
        en: "Hello, I'd like to request a quote for your door solutions.",
      },
    },
  },

  /* ── Contact ──────────────────────────────────────── */
  contact: {
    phone: '+966 50 800 9799',
    phoneTel: '+966508009799',
    email: 'info@madaranda.com',
    addressEn: 'Prince Sultan bin Abdulaziz Rd, Al-Fayziyah, Buraydah, Al-Qassim, Saudi Arabia',
    addressAr: 'طريق الأمير سلطان بن عبدالعزيز، حي الفايزية، بريدة، القصيم، المملكة العربية السعودية',
    /* Google Business Profile link (from the approved execution instructions) */
    mapsUrl: 'https://share.google/V15DhNAwxAjHoYN1G',
    /* Embed of the same Business Profile listing (place CID), not guessed coordinates */
    mapsEmbed: 'https://maps.google.com/maps?cid=12660875854452605789&output=embed',
    reviewsUrl: 'https://maps.app.goo.gl/Tk2GUo1TzbyfGwEt6',
  },

  /* ── Navigation ───────────────────────────────────── */
  nav: {
    links: [
      { en: 'Home',  ar: 'الرئيسية', href: 'index.html' },
      { en: 'About', ar: 'من نحن',   href: 'about.html' },
      { en: 'Products', ar: 'المنتجات', href: 'index.html#products', dropdown: MR_PRODUCTS },
      { en: 'Maintenance', ar: 'الصيانة', href: 'maintenance.html' },
      { en: 'After-Sales & Warranty', ar: 'خدمة ما بعد البيع والضمان', href: 'after-sales-warranty.html' },
      { en: 'Contact', ar: 'اتصل بنا', href: 'contact.html' },
    ],
    cta: {
      en: 'Maintenance Request',
      ar: 'طلب صيانة',
      href: 'maintenance.html',
    },
  },

  /* ── Google reviews strip (shown on every page) ───────
     Paste REAL reviews from the Google Business Profile only (exact text, name, stars, date).
     While `items` is empty, nothing is rendered and pages keep their "see our reviews" button.
     rating/count: the overall score shown on Google (leave null to hide the summary card). */
  reviews: {
    url: 'https://maps.app.goo.gl/Tk2GUo1TzbyfGwEt6',
    /* LIVE reviews from Google (option 1). Paste both to switch it on:
       apiKey  – Google Cloud key with "Places API (New)" + "Maps JavaScript API",
                 restricted to HTTP referrer madaranda.com/*
       placeId – from Google's Place ID Finder (starts with "ChIJ") */
    apiKey: '',
    placeId: '',
    rating: null,          // e.g. 4.9
    count: null,           // e.g. 120
    items: [
      // { name: 'اسم العميل', rating: 5, date: '2026-10', text: 'نص التقييم كما هو في جوجل' },
    ],
  },

  /* ── Footer ───────────────────────────────────────── */
  footer: {
    taglineEn: 'Madar Randa specializes in the supply, installation and maintenance of automatic doors, electric gates and security barriers. With over 30 years of experience, we provide solutions for homes and commercial and industrial facilities across all cities of Al-Qassim, with spare parts availability and technical support after installation.',
    taglineAr: 'مدار رندا متخصصة في توريد وتركيب وصيانة الأبواب الأوتوماتيكية والبوابات الكهربائية والحواجز الأمنية. بخبرة تتجاوز 30 عامًا، نقدم حلولًا للمنازل والمنشآت التجارية والصناعية في جميع مدن القصيم، مع توفر قطع الغيار والدعم الفني بعد التركيب.',
    columns: [
      {
        titleEn: 'Pages',
        titleAr: 'الصفحات',
        links: [
          { en: 'Home',                   ar: 'الرئيسية',                 href: 'index.html'                },
          { en: 'About Us',               ar: 'من نحن',                   href: 'about.html'                },
          { en: 'Maintenance',            ar: 'الصيانة',                  href: 'maintenance.html'          },
          { en: 'After-Sales & Warranty', ar: 'خدمة ما بعد البيع والضمان', href: 'after-sales-warranty.html' },
        ],
      },
      {
        titleEn: 'Products',
        titleAr: 'المنتجات',
        links: MR_PRODUCTS,
      },
    ],
    legalEn: '© 2026 Madar Randa. All rights reserved.',
    legalAr: '© 2026 مدار رندا. جميع الحقوق محفوظة.',
    visionLogo: 'assets/partners/vision-2030.webp',
  },

  /* ── SEO defaults ─────────────────────────────────── */
  seo: {
    siteUrl: 'https://www.madaranda.com',
    ogImage: 'assets/logos/logo-bg.png',
  },

};

Object.freeze(SITE_CONFIG);
