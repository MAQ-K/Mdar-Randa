/**
 * Client testimonial card. Uses initials-only avatar (no photos per brand guidelines).
 * Sector shown as blue uppercase label below role.
 *
 * ```jsx
 * <TestimonialCard
 *   quote="The door system has operated without issue for three years. Their engineers respond faster than anyone we've worked with."
 *   initials="KA"
 *   role="Facility Manager"
 *   sector="Healthcare"
 * />
 * ```
 */
export interface TestimonialCardProps {
  /** The client quote (without quotation marks — component adds them) */
  quote: string;
  /** 2-letter initials for the avatar circle */
  initials: string;
  /** Sector badge label (e.g. "Healthcare", "Aviation") */
  sector?: string;
  /** Role / title of the client */
  role?: string;
  style?: React.CSSProperties;
}
