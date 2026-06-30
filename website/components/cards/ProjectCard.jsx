const PROJECT_SECTOR_COLORS = {
  Commercial:  { bg: '#2B6CB0', text: '#fff' },
  Industrial:  { bg: '#1F2937', text: '#fff' },
  Healthcare:  { bg: '#2F855A', text: '#fff' },
  Aviation:    { bg: '#1E4D8C', text: '#fff' },
  Government:  { bg: '#744210', text: '#fff' },
  Hospitality: { bg: '#553C9A', text: '#fff' },
  Residential: { bg: '#4A5568', text: '#fff' },
};

export function ProjectCard({
  imageSrc,
  sector = 'Commercial',
  title,
  location,
  href = '#',
  style: styleProp,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const sc = PROJECT_SECTOR_COLORS[sector] || PROJECT_SECTOR_COLORS.Commercial;

  return (
    <a
      href={href}
      style={{
        display: 'block',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '4/3',
        textDecoration: 'none',
        background: 'var(--color-silver-pale)',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        ...styleProp,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={title || sector}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        />
      )}

      {/* gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(12,30,60,0.75) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* sector badge */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        background: sc.bg,
        color: sc.text,
        fontFamily: 'var(--font-display)',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '3px 9px',
        borderRadius: '3px',
      }}>
        {sector}
      </div>

      {/* title / location */}
      {(title || location) && (
        <div style={{
          position: 'absolute',
          bottom: 14,
          left: 14,
          right: 14,
        }}>
          {title && (
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              marginBottom: location ? '3px' : 0,
            }}>
              {title}
            </div>
          )}
          {location && (
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.7)',
            }}>
              {location}
            </div>
          )}
        </div>
      )}
    </a>
  );
}
