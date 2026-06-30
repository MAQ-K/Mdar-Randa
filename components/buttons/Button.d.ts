/**
 * Primary interactive element for all CTAs, form actions, and navigation.
 * Use `accent` variant for hero and maintenance-section CTAs.
 * Use `outline-white` on dark navy sections.
 * Never use rounded-pill style — this component enforces 4px border-radius.
 *
 * ```jsx
 * <Button variant="accent" size="lg" arrow>Request a Quote</Button>
 * <Button variant="outline-white" size="lg">View Projects</Button>
 * <Button variant="secondary" href="/services">Explore Services</Button>
 * <Button variant="primary" fullWidth>Submit</Button>
 * ```
 *
 * @startingPoint section="Buttons" subtitle="Engineering-precision CTA button · 6 variants × 3 sizes" viewport="700x240"
 */
export interface ButtonProps {
  /** Visual variant controlling color and fill style */
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline-white' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** When set, renders as an anchor <a> tag */
  href?: string;
  /** Append → arrow symbol after children */
  arrow?: boolean;
  /** Expand to full container width */
  fullWidth?: boolean;
  /** Disabled state — reduces opacity, blocks interaction */
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
