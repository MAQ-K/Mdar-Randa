/**
 * Form input supporting text, select, and textarea modes. Includes bilingual label (EN + AR),
 * validation error state, focus ring, and disabled state.
 *
 * ```jsx
 * // Text input
 * <Input label="Full Name" labelAr="الاسم" placeholder="Eng. Mohammed" required />
 *
 * // Select
 * <Input label="Product Type" options={['Glass Doors', 'Sectional Doors', 'Hangar Doors']} />
 *
 * // Textarea
 * <Input label="Project Details" multiline rows={4} placeholder="Describe your project..." />
 *
 * // With validation
 * <Input label="Phone" error="Phone number is required" value={phone} onChange={setPhone} />
 * ```
 */
export interface InputProps {
  label?: string;
  /** Arabic label shown alongside English label */
  labelAr?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  /** Error message — shown in red below field */
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** Renders as <textarea> */
  multiline?: boolean;
  rows?: number;
  /** Renders as <select> when provided */
  options?: Array<string | { value: string; label: string }>;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}
