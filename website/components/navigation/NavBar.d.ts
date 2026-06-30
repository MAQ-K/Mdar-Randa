/**
 * Sticky dark navigation bar. Navy background with blur, scrolls to add shadow.
 * Includes logo (image or wordmark fallback), centered nav links, and persistent CTA button.
 * Supports full RTL / Arabic mode.
 *
 * ```jsx
 * // With logo image
 * <NavBar logoSrc="assets/logos/logo.png" ctaHref="#contact" />
 *
 * // Arabic / RTL
 * <NavBar rtl logoSrc="assets/logos/logo.png" />
 *
 * // Custom links
 * <NavBar links={[
 *   { label: 'Products', href: '/products' },
 *   { label: 'Services', href: '/services' },
 * ]} />
 * ```
 *
 * @startingPoint section="Navigation" subtitle="Sticky dark nav · bilingual · CTA always visible" viewport="1200x68"
 */
export interface NavBarProps {
  /** Logo image src. If omitted, shows text wordmark fallback */
  logoSrc?: string;
  logoAlt?: string;
  /** Nav links. Default: Products, Services, Projects, About, Contact */
  links?: Array<{ label: string; labelAr?: string; href: string }>;
  /** CTA button text. Default: "Request a Quote" / "اطلب عرض سعر" */
  ctaText?: string;
  ctaHref?: string;
  /** RTL / Arabic mode */
  rtl?: boolean;
  style?: React.CSSProperties;
}
