export function NavBar({
  logoSrc,
  logoAlt = 'Madar Randa',
  links,
  ctaText,
  ctaHref = '#contact',
  rtl = false,
  style: styleProp,
  ...props
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < 900 : false
  );

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const defaultLinks = [
    { label: 'Products', labelAr: 'المنتجات', href: '#products' },
    { label: 'Services', labelAr: 'الخدمات',  href: '#services' },
    { label: 'Projects', labelAr: 'المشاريع',  href: '#projects' },
    { label: 'About',    labelAr: 'عن الشركة', href: '#about'    },
    { label: 'Contact',  labelAr: 'اتصل بنا',  href: '#contact'  },
  ];
  const navLinks = links || defaultLinks;
  const cta = ctaText || (rtl ? 'اطلب عرض سعر' : 'Request a Quote');

  /* ── Hamburger icon ─────────────────── */
  const Hamburger = () => (
    <div style={{ width: 22, height: 14, position: 'relative', flexShrink: 0 }}>
      {[
        { top: 0,  transform: menuOpen ? 'rotate(45deg) translate(0,6px)'  : 'none' },
        { top: 6,  opacity:   menuOpen ? 0 : 1 },
        { top: 12, transform: menuOpen ? 'rotate(-45deg) translate(0,-6px)' : 'none' },
      ].map((s, i) => (
        <span key={i} style={{
          display: 'block', height: 2, width: 22,
          background: 'var(--color-silver)', borderRadius: 1,
          position: 'absolute', left: 0,
          transition: 'transform 0.22s ease, opacity 0.22s ease',
          ...s,
        }} />
      ))}
    </div>
  );

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: 'rgba(12,30,60,0.98)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(43,108,176,0.2)',
      boxShadow: scrolled ? '0 2px 20px rgba(12,30,60,0.25)' : 'none',
      transition: 'box-shadow 0.2s ease',
      direction: rtl ? 'rtl' : 'ltr',
      ...styleProp,
    }} {...props}>
      {/* ── Main bar ── */}
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto',
        padding: '0 var(--container-pad)',
        display: 'flex', alignItems: 'center',
        height: 'var(--nav-height)', gap: 12,
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          {logoSrc
            ? <img src={logoSrc} alt={logoAlt} style={{ height: 36, width: 'auto' }}
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
            : null}
          <div style={{ lineHeight: 1.1, display: logoSrc ? 'none' : 'block' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
              {rtl ? 'مدار رندا' : 'MADAR RANDA'}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 600, color: 'var(--color-accent-light)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Engineering Access
            </div>
          </div>
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
            {navLinks.map((l, i) => (
              <a key={i} href={l.href} style={{
                fontFamily: rtl ? 'var(--font-arabic)' : 'var(--font-display)',
                fontSize: rtl ? 14 : 12, fontWeight: 600,
                letterSpacing: rtl ? 0 : '0.08em',
                textTransform: rtl ? 'none' : 'uppercase',
                color: 'var(--color-silver)', textDecoration: 'none',
                padding: '8px 13px', whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}>
                {rtl && l.labelAr ? l.labelAr : l.label}
              </a>
            ))}
          </div>
        )}
        {isMobile && <div style={{ flex: 1 }} />}

        {/* CTA */}
        <a href={ctaHref} style={{
          fontFamily: rtl ? 'var(--font-arabic)' : 'var(--font-display)',
          fontSize: rtl ? 13 : 11, fontWeight: 700,
          letterSpacing: rtl ? 0 : '0.06em',
          textTransform: rtl ? 'none' : 'uppercase',
          background: 'var(--color-accent)', color: '#fff',
          padding: isMobile ? '8px 12px' : '10px 20px',
          borderRadius: 'var(--radius-sm)', textDecoration: 'none',
          whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.15s',
        }}>
          {cta}
        </a>

        {/* Hamburger button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexShrink: 0, display: 'flex', alignItems: 'center' }}
          >
            <Hamburger />
          </button>
        )}
      </div>

      {/* ── Mobile dropdown menu ── */}
      {isMobile && menuOpen && (
        <div style={{ background: '#0B1B38', borderTop: '1px solid rgba(43,108,176,0.2)', paddingBottom: 8 }}>
          {navLinks.map((l, i) => (
            <a key={i} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '14px 24px',
              fontFamily: rtl ? 'var(--font-arabic)' : 'var(--font-display)',
              fontSize: rtl ? 16 : 14, fontWeight: 700,
              letterSpacing: rtl ? 0 : '0.08em',
              textTransform: rtl ? 'none' : 'uppercase',
              color: 'var(--color-silver)', textDecoration: 'none',
              borderBottom: '1px solid rgba(43,108,176,0.1)',
              direction: rtl ? 'rtl' : 'ltr',
            }}>
              {rtl && l.labelAr ? l.labelAr : l.label}
            </a>
          ))}
          <a href={ctaHref} onClick={() => setMenuOpen(false)} style={{
            display: 'block', margin: '12px 16px 4px',
            padding: '13px 16px', textAlign: 'center',
            background: 'var(--color-accent)', color: '#fff',
            fontFamily: rtl ? 'var(--font-arabic)' : 'var(--font-display)',
            fontSize: rtl ? 15 : 13, fontWeight: 700,
            letterSpacing: rtl ? 0 : '0.06em',
            textTransform: rtl ? 'none' : 'uppercase',
            borderRadius: 'var(--radius-sm)', textDecoration: 'none',
          }}>
            {cta}
          </a>
        </div>
      )}
    </nav>
  );
}
