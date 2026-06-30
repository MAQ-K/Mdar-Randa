export function ServiceCard({
  icon,
  imageSrc,
  title,
  titleAr,
  description,
  href = '#',
  style: styleProp,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderLeft: '3px solid var(--color-accent)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'box-shadow 0.2s ease',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        ...styleProp,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {(icon || imageSrc) && (
        <div style={{
          width: 48,
          height: 48,
          background: 'var(--color-silver-pale)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: 22 }}>{icon}</span>
          )}
        </div>
      )}

      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '17px',
          fontWeight: 700,
          color: 'var(--color-navy)',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
          marginBottom: '4px',
        }}>
          {title}
        </div>
        {titleAr && (
          <div style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: '13px',
            color: 'var(--color-steel-mid)',
            direction: 'rtl',
            textAlign: 'right',
            marginBottom: '6px',
          }}>
            {titleAr}
          </div>
        )}
        {description && (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--color-steel)',
            lineHeight: 1.6,
          }}>
            {description}
          </div>
        )}
      </div>

      <a
        href={href}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '4px',
        }}
      >
        Learn more →
      </a>
    </div>
  );
}
