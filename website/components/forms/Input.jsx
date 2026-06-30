export function Input({
  label,
  labelAr,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  multiline = false,
  rows = 4,
  options,
  style: styleProp,
  inputStyle: inputStyleProp,
  ...props
}) {
  const [focused, setFocused] = React.useState(false);

  const fieldStyle = {
    width: '100%',
    padding: '11px 14px',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    color: 'var(--color-charcoal)',
    background: disabled ? 'var(--color-silver-pale)' : '#FFFFFF',
    border: error
      ? '1px solid #C53030'
      : focused
      ? '1px solid var(--color-accent)'
      : '1px solid var(--color-border-strong)',
    borderRadius: 'var(--radius-sm)',
    outline: 'none',
    boxShadow: focused && !error ? '0 0 0 3px var(--color-focus-ring)' : 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    resize: multiline ? 'vertical' : undefined,
    boxSizing: 'border-box',
    opacity: disabled ? 0.65 : 1,
    cursor: disabled ? 'not-allowed' : undefined,
    ...inputStyleProp,
  };

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: error ? '#C53030' : 'var(--color-steel)',
    marginBottom: '6px',
  };

  const sharedEvents = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <div style={{ ...styleProp }}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && (
            <span style={{ color: 'var(--color-accent)', marginLeft: '2px' }}>*</span>
          )}
          {labelAr && (
            <span style={{
              fontFamily: 'var(--font-arabic)',
              fontWeight: 500,
              letterSpacing: 0,
              textTransform: 'none',
              marginRight: '6px',
              marginLeft: '6px',
              color: 'var(--color-steel-mid)',
              fontSize: '12px',
            }}>
              {labelAr}
            </span>
          )}
        </label>
      )}

      {options ? (
        <select
          style={{ ...fieldStyle, cursor: disabled ? 'not-allowed' : 'pointer' }}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...sharedEvents}
          {...props}
        >
          {options.map((opt, i) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return <option key={i} value={val}>{lbl}</option>;
          })}
        </select>
      ) : multiline ? (
        <textarea
          style={fieldStyle}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          disabled={disabled}
          {...sharedEvents}
          {...props}
        />
      ) : (
        <input
          type={type}
          style={fieldStyle}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...sharedEvents}
          {...props}
        />
      )}

      {error && (
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: '#C53030',
          marginTop: '5px',
          lineHeight: 1.4,
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
