export function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  arrow = false,
  fullWidth = false,
  children,
  style: styleProp,
  ...props
}) {
  const sizeMap = {
    sm: { fontSize: '11px', padding: '8px 16px', letterSpacing: '0.06em' },
    md: { fontSize: '13px', padding: '12px 24px', letterSpacing: '0.05em' },
    lg: { fontSize: '15px', padding: '16px 32px', letterSpacing: '0.04em' },
  };

  const variantMap = {
    primary: {
      background: 'var(--color-navy)',
      color: '#FFFFFF',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-navy)',
      border: '1.5px solid var(--color-navy)',
    },
    accent: {
      background: 'var(--color-accent)',
      color: '#FFFFFF',
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-steel)',
      border: '1px solid var(--color-border-strong)',
    },
    'outline-white': {
      background: 'transparent',
      color: '#FFFFFF',
      border: '1.5px solid rgba(255,255,255,0.35)',
    },
    danger: {
      background: '#C53030',
      color: '#FFFFFF',
      border: 'none',
    },
  };

  const style = {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4em',
    textDecoration: 'none',
    transition: 'opacity 0.15s ease, background 0.15s ease, border-color 0.15s ease',
    opacity: disabled ? 0.5 : 1,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(fullWidth ? { width: '100%', justifyContent: 'center' } : {}),
    ...sizeMap[size],
    ...variantMap[variant],
    ...styleProp,
  };

  const inner = (
    <>
      {children}
      {arrow && <span aria-hidden="true" style={{ marginLeft: '0.1em' }}>→</span>}
    </>
  );

  if (href) {
    return <a href={href} style={style} {...props}>{inner}</a>;
  }

  return (
    <button onClick={onClick} disabled={disabled} style={style} {...props}>
      {inner}
    </button>
  );
}
