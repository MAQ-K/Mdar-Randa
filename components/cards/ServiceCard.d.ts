/**
 * Product/service card with left accent border, icon or image, bilingual title, description, and arrow link.
 * Used in 3-column services grids on the homepage and services page.
 *
 * ```jsx
 * <ServiceCard
 *   imageSrc="/assets/images/product-glass-door.jpg"
 *   title="Automatic Glass Doors"
 *   titleAr="الأبواب الزجاجية الأوتوماتيكية"
 *   description="CE-certified motor-driven sliding, swing, and revolving doors for commercial lobbies."
 *   href="/products/glass-doors"
 * />
 *
 * // With emoji icon (for demos / when no image available)
 * <ServiceCard icon="🚪" title="Automatic Glass Doors" description="…" />
 * ```
 *
 * @startingPoint section="Cards" subtitle="Service product card with accent border + bilingual title" viewport="700x340"
 */
export interface ServiceCardProps {
  /** Emoji or unicode character icon (shown when no imageSrc) */
  icon?: string;
  /** Product image URL — overrides icon */
  imageSrc?: string;
  /** English product name */
  title: string;
  /** Arabic product name (optional, shown below English) */
  titleAr?: string;
  /** Short description — 1–2 sentences */
  description?: string;
  /** Arrow link href */
  href?: string;
  style?: React.CSSProperties;
}
