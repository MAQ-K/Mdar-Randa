/**
 * Compact status label, sector tag, or certification indicator.
 * Use `on-dark` variant inside dark navy sections.
 * Use `success` for certified/active states, `silver` for informational.
 *
 * ```jsx
 * <Badge variant="success">✓ CE Certified</Badge>
 * <Badge variant="accent" dot>Active Contract</Badge>
 * <Badge variant="on-dark">30+ Years</Badge>
 * <Badge variant="silver">Industrial</Badge>
 * <Badge variant="primary">Installed</Badge>
 * ```
 */
export interface BadgeProps {
  /** Visual variant */
  variant?: 'primary' | 'accent' | 'outline' | 'silver' | 'success' | 'warning' | 'danger' | 'on-dark';
  /** Show a small circular dot indicator before children */
  dot?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
