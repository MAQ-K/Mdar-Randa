export function RFQForm({
  onSubmit,
  rtl = false,
  style: styleProp,
  ...props
}) {
  const [form, setForm] = React.useState({
    name: '', company: '', phone: '', email: '',
    productType: '', sector: '', message: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const t = {
    name:        rtl ? 'الاسم الكامل' : 'Full Name',
    company:     rtl ? 'اسم الشركة' : 'Company Name',
    phone:       rtl ? 'رقم الجوال' : 'Phone Number',
    email:       rtl ? 'البريد الإلكتروني' : 'Email Address',
    productType: rtl ? 'نوع المنتج' : 'Product Type',
    sector:      rtl ? 'القطاع' : 'Sector',
    message:     rtl ? 'تفاصيل المشروع' : 'Project Details',
    submit:      rtl ? 'إرسال طلب عرض السعر' : 'Submit Request for Quotation',
    submitting:  rtl ? 'جاري الإرسال...' : 'Submitting...',
    successTitle: rtl ? 'تم استلام طلبك' : 'Request Received',
    successBody:  rtl ? 'سيتواصل معك مهندسونا خلال 24 ساعة.' : 'Our engineers will contact you within 24 hours.',
    errRequired:  rtl ? 'هذا الحقل مطلوب' : 'This field is required',
  };

  const products = rtl
    ? ['الأبواب الزجاجية الأوتوماتيكية', 'الأبواب المقطعية', 'الأبواب السريعة', 'معدات رصيف التحميل', 'حواجز الطرق', 'بوابات أمنية', 'نوافذ أوتوماتيكية', 'أبواب الفلل والقصور', 'محركات أبواب', 'أبواب هناجر', 'صيانة وخدمة']
    : ['Automatic Glass Doors', 'Sectional Industrial Doors', 'Fast-Action Doors', 'Loading Dock Systems', 'Road Barriers', 'Security Entrances', 'Automatic Windows & Shutters', 'Villa & Palace Gates', 'Sliding Door Motors', 'Aircraft Hangar Doors', 'Maintenance & Service'];

  const sectors = rtl
    ? ['تجاري', 'صناعي', 'رعاية صحية', 'طيران', 'حكومي', 'ضيافة', 'سكني']
    : ['Commercial', 'Industrial', 'Healthcare', 'Aviation', 'Government', 'Hospitality', 'Residential'];

  const update = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(e2 => ({ ...e2, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = t.errRequired;
    if (!form.phone.trim()) e.phone = t.errRequired;
    if (!form.productType)  e.productType = t.errRequired;
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
    onSubmit && onSubmit(form);
  };

  const fieldBase = (key) => ({
    width: '100%',
    padding: '11px 14px',
    fontFamily: rtl ? 'var(--font-arabic)' : 'var(--font-body)',
    fontSize: '15px',
    color: 'var(--color-charcoal)',
    background: '#FFFFFF',
    border: errors[key] ? '1px solid #C53030' : '1px solid var(--color-border-strong)',
    borderRadius: 'var(--radius-sm)',
    outline: 'none',
    boxSizing: 'border-box',
    direction: rtl ? 'rtl' : 'ltr',
  });

  const labelStyle = {
    display: 'block',
    fontFamily: rtl ? 'var(--font-arabic)' : 'var(--font-display)',
    fontSize: rtl ? '13px' : '11px',
    fontWeight: 700,
    letterSpacing: rtl ? 0 : '0.12em',
    textTransform: rtl ? 'none' : 'uppercase',
    color: 'var(--color-steel)',
    marginBottom: '6px',
  };

  if (submitted) {
    return (
      <div style={{
        background: '#F0FFF4',
        border: '1px solid #C6F6D5',
        borderRadius: 'var(--radius)',
        padding: '3rem',
        textAlign: 'center',
        ...styleProp,
      }}>
        <div style={{
          width: 56, height: 56,
          background: '#276749',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
          color: '#fff',
          fontSize: 24,
        }}>✓</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: '#276749', marginBottom: '8px' }}>
          {t.successTitle}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-steel)', fontSize: '15px' }}>
          {t.successBody}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ direction: rtl ? 'rtl' : 'ltr', ...styleProp }} noValidate {...props}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>{t.name} <span style={{ color: 'var(--color-accent)' }}>*</span></label>
          <input style={fieldBase('name')} value={form.name} onChange={update('name')} placeholder={rtl ? 'م. محمد العتيبي' : 'Eng. Mohammed Al-Harbi'} />
          {errors.name && <div style={{ fontSize: '12px', color: '#C53030', marginTop: '4px' }}>{errors.name}</div>}
        </div>
        <div>
          <label style={labelStyle}>{t.company}</label>
          <input style={fieldBase('company')} value={form.company} onChange={update('company')} placeholder={rtl ? 'اسم المؤسسة أو الشركة' : 'Company or Institution'} />
        </div>
        <div>
          <label style={labelStyle}>{t.phone} <span style={{ color: 'var(--color-accent)' }}>*</span></label>
          <input style={fieldBase('phone')} value={form.phone} onChange={update('phone')} placeholder="+966 5X XXX XXXX" type="tel" />
          {errors.phone && <div style={{ fontSize: '12px', color: '#C53030', marginTop: '4px' }}>{errors.phone}</div>}
        </div>
        <div>
          <label style={labelStyle}>{t.email}</label>
          <input style={fieldBase('email')} value={form.email} onChange={update('email')} placeholder="engineer@company.sa" type="email" />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>{t.productType} <span style={{ color: 'var(--color-accent)' }}>*</span></label>
          <select style={fieldBase('productType')} value={form.productType} onChange={update('productType')}>
            <option value="">{rtl ? '— اختر نوع المنتج —' : '— Select product type —'}</option>
            {products.map((p, i) => <option key={i} value={p}>{p}</option>)}
          </select>
          {errors.productType && <div style={{ fontSize: '12px', color: '#C53030', marginTop: '4px' }}>{errors.productType}</div>}
        </div>
        <div>
          <label style={labelStyle}>{t.sector}</label>
          <select style={fieldBase('sector')} value={form.sector} onChange={update('sector')}>
            <option value="">{rtl ? '— اختر القطاع —' : '— Select sector —'}</option>
            {sectors.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>{t.message}</label>
        <textarea
          style={{ ...fieldBase('message'), resize: 'vertical', minHeight: '100px' }}
          value={form.message}
          onChange={update('message')}
          rows={4}
          placeholder={rtl ? 'أوصف متطلبات مشروعك — الأبعاد، الموقع، المواصفات...' : 'Describe your project — dimensions, location, specifications, timeline...'}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          background: loading ? 'var(--color-steel)' : 'var(--color-accent)',
          color: '#FFFFFF',
          fontFamily: rtl ? 'var(--font-arabic)' : 'var(--font-display)',
          fontSize: rtl ? '15px' : '13px',
          fontWeight: 700,
          letterSpacing: rtl ? 0 : '0.06em',
          textTransform: rtl ? 'none' : 'uppercase',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: loading ? 'wait' : 'pointer',
          transition: 'background 0.15s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {loading ? (
          <>
            <span style={{
              width: 14, height: 14,
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'mr-spin 0.75s linear infinite',
            }} />
            {t.submitting}
          </>
        ) : (
          <>{t.submit} {rtl ? '←' : '→'}</>
        )}
      </button>
      <style>{`@keyframes mr-spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
