export function Badge({
  variant = 'primary',
  dot = false,
  children,
  style: styleProp,
  ...props
}) {
  const variantMap = {
    primary:      { background: 'var(--color-navy)',          color: '#FFFFFF' },
    accent:       { background: 'rgba(43,108,176,0.1)',       color: 'var(--color-accent)',       border: '1px solid rgba(43,108,176,0.2)' },
    outline:      { background: 'transparent',                color: 'var(--color-navy)',          border: '1px solid var(--color-navy)' },
    silver:       { background: 'var(--color-silver-pale)',   color: 'var(--color-steel)',         border: '1px solid var(--color-border-strong)' },
    success:      { background: '#C6F6D5',                    color: '#276749' },
    warning:      { background: '#FEFCBF',                    color: '#744210' },
    danger:       { background: '#FED7D7',                    color: '#9B2C2C' },
    'on-dark':    { background: 'rgba(255,255,255,0.08)',     color: 'var(--color-silver-light)',  border: '1px solid rgba(255,255,255,0.15)' },
  };

  const style = {
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    borderRadius: '3px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    lineHeight: 1.2,
    flexShrink: 0,
    ...variantMap[variant],
    ...styleProp,
  };

  return (
    <span style={style} {...props}>
      {dot && (
        <span
          aria-hidden="true"
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'currentColor',
            flexShrink: 0,
            display: 'inline-block',
          }}
        />
      )}
      {children}
    </span>
  );
}
