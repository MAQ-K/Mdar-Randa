/**
 * Project photo card with sector badge overlay, gradient title area, and hover zoom.
 * Used in the homepage project showcase grid with sector filter buttons.
 *
 * ```jsx
 * <ProjectCard
 *   imageSrc="assets/images/project-hangar.jpg"
 *   sector="Aviation"
 *   title="Aircraft Hangar Door"
 *   location="Al-Qassim, KSA"
 * />
 * ```
 */
export interface ProjectCardProps {
  imageSrc?: string;
  sector?: 'Commercial' | 'Industrial' | 'Healthcare' | 'Aviation' | 'Government' | 'Hospitality' | 'Residential';
  title?: string;
  location?: string;
  href?: string;
  style?: React.CSSProperties;
}
