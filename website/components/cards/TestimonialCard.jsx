export function TestimonialCard({
  quote,
  initials = 'MR',
  sector,
  role,
  style: styleProp,
  ...props
}) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: 'var(--shadow-sm)',
        ...styleProp,
      }}
      {...props}
    >
      {/* Opening quote mark */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '56px',
        fontWeight: 700,
        color: 'var(--color-silver-light)',
        lineHeight: 0.8,
        userSelect: 'none',
      }}>
        &ldquo;
      </div>

      {/* Quote text */}
      <blockquote style={{
        fontFamily: 'var(--font-body)',
        fontSize: '15px',
        fontStyle: 'italic',
        color: 'var(--color-charcoal)',
        lineHeight: 1.75,
        margin: 0,
        flex: 1,
      }}>
        {quote}
      </blockquote>

      {/* Attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'var(--color-navy)',
          color: '#FFFFFF',
          fontFamily: 'var(--font-display)',
          fontSize: '14px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          letterSpacing: '0.05em',
        }}>
          {initials}
        </div>
        <div>
          {role && (
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-charcoal)',
              lineHeight: 1.3,
            }}>
              {role}
            </div>
          )}
          {sector && (
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginTop: '2px',
            }}>
              {sector}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
