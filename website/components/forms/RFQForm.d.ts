/**
 * Complete bilingual Request for Quotation form. Includes name, company, phone, email,
 * product type, sector, and project details fields. Validates required fields, shows
 * loading spinner on submit, and displays a success confirmation.
 *
 * ```jsx
 * // English (LTR)
 * <RFQForm onSubmit={(data) => console.log(data)} />
 *
 * // Arabic (RTL)
 * <RFQForm rtl onSubmit={handleSubmit} />
 * ```
 *
 * @startingPoint section="Forms" subtitle="Complete bilingual RFQ form with validation + loading state" viewport="700x540"
 */
export interface RFQFormProps {
  /** Called with collected form data on successful submission */
  onSubmit?: (data: {
    name: string;
    company: string;
    phone: string;
    email: string;
    productType: string;
    sector: string;
    message: string;
  }) => void;
  /** Arabic / RTL mode — switches all labels and copy to Arabic */
  rtl?: boolean;
  style?: React.CSSProperties;
}
