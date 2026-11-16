import { useState, useEffect } from "react";

const LOGO_SRC = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAf//AACgAgAEAAAAAQAAAaWgAwAEAAAAAQAAAaMAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/iAihJQ0NfUFJPRklMRQABAQAAAhhhcHBsBAAAAG1udHJSR0IgWFlaIAfmAAEAAQAAAAAAAGFjc3BBUFBMAAAAAEFQUEwAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtYXBwbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmRlc2MAAAD8AAAAMGNwcnQAAAEsAAAAUHd0cHQAAAF8AAAAFHJYWVoAAAGQAAAAFGdYWVoAAAGkAAAAFGJYWVoAAAG4AAAAFHJUUkMAAAHMAAAAIGNoYWQAAAHsAAAALGJUUkMAAAHMAAAAIGdUUkMAAAHMAAAAIG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAFAAAABwARABpAHMAcABsAGEAeQAgAFAAM21sdWMAAAAAAAAAAQAAAAxlblVTAAAANAAAABwAQwBvAHAAeQByAGkAZwBoAHQAIABBAHAAcABsAGUAIABJAG4AYwAuACwAIAAyADAAMgAyWFlaIAAAAAAAAPbVAAEAAAAA0yxYWVogAAAAAAAAg98AAD2/////u1hZWiAAAAAAAABKvwAAsTcAAAq5WFlaIAAAAAAAACg4AAARCwAAyLlwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW3NmMzIAAAAAAAEMQgAABd7///MmAAAHkwAA/ZD///ui///9owAAA9wAAMBu/8AAEQgBowGlAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAgEBAgMCAgIDBQMDAwMFBgUFBQUFBgcGBgYGBgYHBwcHBwcHBwgICAgICAoKCgoKCwsLCwsLCwsLC//bAEMBAgICAwMDBQMDBQwIBggMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/dAAQAG//aAAwDAQACEQMRAD8A/v4ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0P7+KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9H+/iiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/S/v4ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKK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4Sfs4/GH42a1DoXgfRri8mmbb8oOBn1Nf0Z/sZf8EH/La28YftJXHy8P9gi7+xJpykg5T+eP4J/sv/Hj9oHWo9H+GPh+4vt7BfN2kRj6k8V/Tv8AsZf8EJ/AvhfT7bxf+0pJ/aOpHEi2MR/dr9a/eb4WfBP4ZfBjw/D4b+HWkQafbxqF/dqMnHqa9crOUxxiedfDv4V+A/hToEPhnwFpkGnWkC7VWJQK9FooqBhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9b+/iiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBrKGGDXiXxF/Z2+Cnxaj2eP/Dlnf8A+08Yz+Yr2+igDxz4Z/Ab4R/CC1Nt8O9BtdLDfeMS8n8TzXsdFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9f+/iiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/Q/v4ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0f7+KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9k=";

// ─── عنوان الخادم (Backend) ────────────────────────────────
// المبرمج: غيّر هذا لعنوان دومينك بعد رفع الخادم
const API_BASE = "https://madaranda.com/api";

// ═══════════════════════════════════════════
// نظام اللغة — Language System
// ═══════════════════════════════════════════
const TXT = {
  ar: {
    dir: "rtl", align: "right", locale: "ar-SA",
    company: "مدار راندا", portal: "بوابة طلبات الصيانة",
    langBtn: "EN", langSwitch: "English",
    // تبويبات
    tabNew: "طلب جديد", tabTrack: "تتبع طلباتي",
    // نموذج
    formTitle: "بيانات طلب الصيانة",
    fullName: "الاسم الكامل", phName: "محمد العمري",
    phoneLabel: "رقم الجوال",
    city: "المدينة", phCity: "الرياض",
    district: "الحي", phDistrict: "حي النزهة",
    serviceType: "نوع الخدمة",
    svcInWarranty: "صيانة داخل الضمان", svcOutWarranty: "صيانة خارج الضمان",
    problemDesc: "وصف المشكلة", phDesc: "اشرح المشكلة بالتفصيل...",
    submitBtn: "إرسال الطلب",
    // OTP
    sendCode: "إرسال رمز", sending: "جاري الإرسال...",
    enterCode: "أدخل الرمز", verify: "تحقق", change: "تغيير",
    resend: "إعادة إرسال الرمز", expiresIn: "ينتهي خلال",
    verified: "تم التحقق",
    otpWrong: "الرمز غير صحيح، حاول مرة أخرى",
    otpVerifyError: "خطأ في التحقق، حاول مجدداً",
    smsError: "تعذّر إرسال الرمز، تحقق من الرقم وحاول مجدداً",
    submitError: "تعذّر إرسال الطلب، حاول مجدداً",
    // رسوم وضمان
    feeTitle: "تنبيه: رسوم الزيارة",
    feeText1: "رسوم الزيارة", feeAmount: "100 ريال", feeText2: "تُحسب عند إرسال الفني",
    warrantyTitle: "مطلوب: صورة عقد الضمان",
    warrantySub: "للتأكد من أن الطلب داخل فترة الضمان",
    contractLabel: "صورة العقد", uploadHint: "اضغط لرفع صورة العقد",
    fileTypes: "JPG, PNG, PDF",
    warnPhone: "يرجى التحقق من رقم الجوال أولاً",
    warnContract: "يرجى رفع صورة العقد أولاً",
    // نجاح
    successTitle: "تم إرسال طلبك بنجاح!",
    successSub: "نعمل على مراجعة الطلب وإرسال موعدك",
    // تتبع
    trackLabel: "ادخل رقم جوالك لمتابعة طلباتك", search: "بحث",
    noRequests: "لا يوجد طلبات لهذا الرقم",
    otpBoxLabel: "رمز إغلاق الطلب (OTP) — أعطه للفني بعد الانتهاء فقط",
    closedOk: "تم إغلاق الطلب بنجاح",
    // حالات
    stPending: "قيد الانتظار", stAssigned: "مُسند للفني",
    stSuspended: "معلق", stClosed: "مُغلق",
    // فوتر
    footer: "© 2026 مدار راندا — جميع الحقوق محفوظة",
    errSend: "فشل الإرسال", errCreate: "فشل إنشاء الطلب",
  },
  en: {
    dir: "ltr", align: "left", locale: "en-US",
    company: "Madar Randa", portal: "Maintenance Request Portal",
    langBtn: "ع", langSwitch: "عربي",
    tabNew: "New Request", tabTrack: "Track My Requests",
    formTitle: "Maintenance Request Details",
    fullName: "Full Name", phName: "Mohammed Al-Omari",
    phoneLabel: "Phone Number",
    city: "City", phCity: "Riyadh",
    district: "District", phDistrict: "Al-Nuzha District",
    serviceType: "Service Type",
    svcInWarranty: "In-Warranty Maintenance", svcOutWarranty: "Out-of-Warranty Maintenance",
    problemDesc: "Problem Description", phDesc: "Describe the problem in detail...",
    submitBtn: "Submit Request",
    sendCode: "Send Code", sending: "Sending...",
    enterCode: "Enter code", verify: "Verify", change: "Change",
    resend: "Resend code", expiresIn: "Expires in",
    verified: "Verified",
    otpWrong: "Incorrect code, please try again",
    otpVerifyError: "Verification error, please try again",
    smsError: "Could not send the code. Check the number and try again",
    submitError: "Could not submit the request, please try again",
    feeTitle: "Notice: Visit Fee",
    feeText1: "A visit fee of", feeAmount: "100 SAR", feeText2: "applies when a technician is dispatched",
    warrantyTitle: "Required: Warranty Contract Photo",
    warrantySub: "To confirm the request is within the warranty period",
    contractLabel: "Contract Photo", uploadHint: "Tap to upload contract photo",
    fileTypes: "JPG, PNG, PDF",
    warnPhone: "Please verify your phone number first",
    warnContract: "Please upload the contract photo first",
    successTitle: "Your request was submitted successfully!",
    successSub: "We are reviewing your request and will send your appointment",
    trackLabel: "Enter your phone number to track your requests", search: "Search",
    noRequests: "No requests found for this number",
    otpBoxLabel: "Closing code (OTP) — give it to the technician only after the work is done",
    closedOk: "Request closed successfully",
    stPending: "Pending", stAssigned: "Assigned to Technician",
    stSuspended: "Suspended", stClosed: "Closed",
    footer: "© 2026 Madar Randa — All Rights Reserved",
    errSend: "Failed to send", errCreate: "Failed to create request",
  },
};

const C = {
  bg: "#F4F6F9", surface: "#FFFFFF", card: "#FFFFFF", border: "#DDE3ED",
  navy: "#1E2D6B", navyDim: "#E8ECF7", green: "#1A7A4A", greenBg: "#E8F5EE",
  red: "#C0392B", redBg: "#FDECEA", orange: "#B7600A", orangeBg: "#FEF3E2",
  blue: "#1A5FAB", blueBg: "#E6F0FB",
  textPrimary: "#1A2340", textSecondary: "#5A6A8A", textMuted: "#9AAABF",
};

// أنواع الخدمة — المفتاح ثابت والنص يُترجم
const SERVICE_TYPES = [
  { key: "svcInWarranty",  warranty: true,  visitFee: false },
  { key: "svcOutWarranty", warranty: false, visitFee: true },
];

const statusKey = { pending: "stPending", assigned: "stAssigned", suspended: "stSuspended", closed: "stClosed" };
const statusColor = {
  pending:   { color: C.orange, bg: C.orangeBg },
  assigned:  { color: C.blue,   bg: C.blueBg },
  suspended: { color: C.red,    bg: C.redBg },
  closed:    { color: C.green,  bg: C.greenBg },
};

// ─── الاتصال بالخادم (Backend) ─────────────────────────────
// الخادم هو من يرسل الرسائل عبر تقنيات (التوكن محفوظ هناك بأمان)
async function apiSendOtp(phone, t) {
  const res = await fetch(`${API_BASE}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || t.errSend);
  return data;
}

async function apiVerifyOtp(phone, otp) {
  const res = await fetch(`${API_BASE}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  });
  return res.ok;
}

async function apiCreateRequest(payload, t) {
  const res = await fetch(`${API_BASE}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || t.errCreate);
  return data;
}

function Card({ children, style = {} }) {
  return <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, boxShadow: "0 1px 6px rgba(30,45,107,.07)", ...style }}>{children}</div>;
}

function Btn({ children, color = C.navy, textColor = "#fff", outline, onClick, style = {}, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "11px 20px", borderRadius: 10, fontFamily: "inherit", fontWeight: 700, fontSize: 14,
      cursor: disabled ? "not-allowed" : "pointer",
      border: outline ? `1.5px solid ${color}` : "none",
      background: outline ? "transparent" : color,
      color: outline ? color : textColor,
      opacity: disabled ? .5 : 1, ...style,
    }}>{children}</button>
  );
}

function FieldLabel({ children }) {
  return <label style={{ color: C.textSecondary, fontSize: 13, display: "block", marginBottom: 6, fontWeight: 600 }}>{children}</label>;
}

const inputStyle = {
  width: "100%", padding: "11px 14px", borderRadius: 10,
  border: `1.5px solid ${C.border}`, background: C.bg,
  color: C.textPrimary, fontSize: 14, fontFamily: "inherit",
  outline: "none", boxSizing: "border-box",
};

// ── نموذج الطلب ────────────────────────────────────────────
function NewRequestTab({ onSubmit, t }) {
  const [form, setForm] = useState({
    client: "", phone: "", city: "", district: "",
    typeKey: SERVICE_TYPES[0].key, desc: "", contractImage: null,
  });

  const [phoneStep, setPhoneStep] = useState("idle"); // idle | sending | otp | verified
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [smsError, setSmsError] = useState("");
  const [timer, setTimer] = useState(0);

  const selectedService = SERVICE_TYPES.find(s => s.key === form.typeKey) || SERVICE_TYPES[0];

  useEffect(() => {
    if (timer <= 0) return;
    const iv = setInterval(() => setTimer(p => p <= 1 ? (clearInterval(iv), 0) : p - 1), 1000);
    return () => clearInterval(iv);
  }, [timer]);

  const formatTimer = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const sendOtp = async () => {
    if (form.phone.length < 10) return;
    setPhoneStep("sending");
    setSmsError("");
    try {
      await apiSendOtp(form.phone, t);
      setPhoneStep("otp");
      setTimer(120);
      setOtpInput("");
      setOtpError("");
    } catch (e) {
      console.error("OTP error:", e);
      setSmsError(t.smsError);
      setPhoneStep("idle");
    }
  };

  const verifyOtp = async () => {
    try {
      const ok = await apiVerifyOtp(form.phone, otpInput);
      if (ok) { setPhoneStep("verified"); setOtpError(""); }
      else { setOtpError(t.otpWrong); setOtpInput(""); }
    } catch (e) {
      setOtpError(t.otpVerifyError);
      setOtpInput("");
    }
  };

  const handleSubmit = async () => {
    if (!form.client || !form.city || !form.district || !form.desc) return;
    if (phoneStep !== "verified") return;
    if (selectedService.warranty && !form.contractImage) return;

    try {
      await apiCreateRequest({
        client:   form.client,
        phone:    form.phone,
        city:     form.city,
        district: form.district,
        type:     t[form.typeKey],
        desc:     form.desc,
      }, t);
      onSubmit(form);
    } catch (e) {
      console.error("Request error:", e);
      alert(t.submitError);
    }
  };

  return (
    <Card>
      <h3 style={{ color: C.textPrimary, margin: "0 0 22px", fontSize: 17, fontWeight: 800 }}>{t.formTitle}</h3>

      {/* الاسم */}
      <div style={{ marginBottom: 16 }}>
        <FieldLabel>{t.fullName}</FieldLabel>
        <input type="text" placeholder={t.phName} value={form.client}
          onChange={e => setForm({ ...form, client: e.target.value })} style={inputStyle} />
      </div>

      {/* ── خانة الجوال مع التحقق ── */}
      <div style={{ marginBottom: 16 }}>
        <FieldLabel>{t.phoneLabel}</FieldLabel>

        {(phoneStep === "idle" || phoneStep === "sending") && (
          <div>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="tel" placeholder="05XXXXXXXX" value={form.phone}
                onChange={e => { setForm({ ...form, phone: e.target.value }); setPhoneStep("idle"); setSmsError(""); }}
                style={{ ...inputStyle, flex: 1 }} />
              <button onClick={sendOtp} disabled={form.phone.length < 10 || phoneStep === "sending"} style={{
                padding: "11px 14px", borderRadius: 10, border: "none", fontFamily: "inherit",
                fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap",
                background: form.phone.length >= 10 ? C.navy : C.border,
                color: "#fff", opacity: phoneStep === "sending" ? .7 : 1,
              }}>
                {phoneStep === "sending" ? t.sending : t.sendCode}
              </button>
            </div>
            {smsError && <div style={{ color: C.red, fontSize: 12, marginTop: 6 }}>{smsError}</div>}
          </div>
        )}

        {phoneStep === "otp" && (
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <div style={{ flex: 1, padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: C.navyDim, color: C.navy, fontSize: 14, fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{form.phone}</span>
                <button onClick={() => { setPhoneStep("idle"); setOtpInput(""); setOtpError(""); }}
                  style={{ background: "none", border: "none", color: C.blue, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>{t.change}</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="tel" maxLength={4} placeholder={t.enterCode} value={otpInput}
                onChange={e => { setOtpInput(e.target.value); setOtpError(""); }}
                onKeyDown={e => e.key === "Enter" && verifyOtp()}
                autoFocus
                style={{ ...inputStyle, flex: 1, fontSize: 24, fontWeight: 900, textAlign: "center", letterSpacing: 10, fontFamily: "monospace", border: `1.5px solid ${C.navy}` }} />
              <button onClick={verifyOtp} style={{ padding: "11px 16px", borderRadius: 10, border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{t.verify}</button>
            </div>
            {otpError && <div style={{ color: C.red, fontSize: 12, marginTop: 6 }}>{otpError}</div>}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              {timer > 0
                ? <span style={{ color: C.textMuted, fontSize: 12 }}>{t.expiresIn} <strong style={{ color: C.navy }}>{formatTimer(timer)}</strong></span>
                : <button onClick={sendOtp} style={{ background: "none", border: "none", color: C.blue, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{t.resend}</button>
              }
            </div>
          </div>
        )}

        {phoneStep === "verified" && (
          <div style={{ padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.green}`, background: C.greenBg, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: C.green, fontWeight: 700 }}>{form.phone} — {t.verified}</span>
            <button onClick={() => { setPhoneStep("idle"); setForm({ ...form, phone: "" }); }}
              style={{ background: "none", border: "none", color: C.textSecondary, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{t.change}</button>
          </div>
        )}
      </div>

      {/* المدينة والحي */}
      {[
        { key: "city",     label: t.city,     ph: t.phCity },
        { key: "district", label: t.district, ph: t.phDistrict },
      ].map(f => (
        <div key={f.key} style={{ marginBottom: 16 }}>
          <FieldLabel>{f.label}</FieldLabel>
          <input type="text" placeholder={f.ph} value={form[f.key]}
            onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={inputStyle} />
        </div>
      ))}

      {/* نوع الخدمة */}
      <div style={{ marginBottom: 16 }}>
        <FieldLabel>{t.serviceType}</FieldLabel>
        <select value={form.typeKey} onChange={e => setForm({ ...form, typeKey: e.target.value, contractImage: null })}
          style={{ ...inputStyle, appearance: "auto" }}>
          {SERVICE_TYPES.map(s => <option key={s.key} value={s.key}>{t[s.key]}</option>)}
        </select>
      </div>

      {/* تنبيه رسوم الزيارة */}
      {selectedService.visitFee && (
        <div style={{ marginBottom: 16, padding: "12px 16px", background: C.orangeBg, border: `1px solid ${C.orange}44`, borderRadius: 10 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 14 }}>{t.feeTitle}</div>
          <div style={{ color: C.textSecondary, fontSize: 13, marginTop: 3 }}>{t.feeText1} <strong style={{ color: C.textPrimary }}>{t.feeAmount}</strong> {t.feeText2}</div>
        </div>
      )}

      {/* رفع عقد الضمان */}
      {selectedService.warranty && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ padding: "12px 16px", background: C.blueBg, border: `1px solid ${C.blue}44`, borderRadius: 10, marginBottom: 10 }}>
            <div style={{ color: C.blue, fontWeight: 700, fontSize: 14 }}>{t.warrantyTitle}</div>
            <div style={{ color: C.textSecondary, fontSize: 13, marginTop: 3 }}>{t.warrantySub}</div>
          </div>
          <FieldLabel>{t.contractLabel} <span style={{ color: C.red }}>*</span></FieldLabel>
          <div style={{ border: `2px dashed ${form.contractImage ? C.green : C.border}`, borderRadius: 10, padding: "18px", textAlign: "center", background: form.contractImage ? C.greenBg : C.bg, cursor: "pointer" }}
            onClick={() => document.getElementById("contractInput").click()}>
            {form.contractImage
              ? <div style={{ color: C.green, fontWeight: 700, fontSize: 13 }}>{form.contractImage.name}</div>
              : <div><div style={{ color: C.textSecondary, fontSize: 13, fontWeight: 600 }}>{t.uploadHint}</div><div style={{ color: C.textMuted, fontSize: 12, marginTop: 3 }}>{t.fileTypes}</div></div>
            }
          </div>
          <input id="contractInput" type="file" accept="image/*,.pdf" style={{ display: "none" }}
            onChange={e => setForm({ ...form, contractImage: e.target.files[0] || null })} />
        </div>
      )}

      {/* وصف المشكلة */}
      <div style={{ marginBottom: 22 }}>
        <FieldLabel>{t.problemDesc}</FieldLabel>
        <textarea placeholder={t.phDesc} value={form.desc}
          onChange={e => setForm({ ...form, desc: e.target.value })} rows={4}
          style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      {phoneStep !== "verified" && form.client && (
        <div style={{ marginBottom: 10, color: C.orange, fontSize: 13, textAlign: "center" }}>{t.warnPhone}</div>
      )}
      {selectedService.warranty && !form.contractImage && form.client && (
        <div style={{ marginBottom: 10, color: C.red, fontSize: 13, textAlign: "center" }}>{t.warnContract}</div>
      )}

      <Btn onClick={handleSubmit} style={{ width: "100%", padding: 14, fontSize: 16 }}>{t.submitBtn}</Btn>
    </Card>
  );
}

// ── تتبع الطلبات ───────────────────────────────────────────
function TrackTab({ t }) {
  const [trackPhone, setTrackPhone] = useState("");
  const [tracked, setTracked] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleTrack = async () => {
    setSearched(true);
    try {
      const res = await fetch(`${API_BASE}/requests/phone/${trackPhone.trim()}`);
      const data = await res.json();
      setTracked(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Track error:", e);
      setTracked([]);
    }
  };

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <FieldLabel>{t.trackLabel}</FieldLabel>
        <div style={{ display: "flex", gap: 10 }}>
          <input type="tel" placeholder="05XXXXXXXX" value={trackPhone}
            onChange={e => setTrackPhone(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleTrack()}
            style={{ ...inputStyle, flex: 1 }} />
          <Btn onClick={handleTrack} style={{ padding: "11px 20px" }}>{t.search}</Btn>
        </div>
      </Card>

      {tracked.map(r => {
        const sc = statusColor[r.status] || statusColor.pending;
        const borderSide = t.dir === "rtl" ? "borderRight" : "borderLeft";
        return (
          <Card key={r.id} style={{ marginBottom: 12, [borderSide]: `4px solid ${sc.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <span style={{ color: C.navy, fontWeight: 700, fontSize: 13 }}>{r.id}</span>
                <div style={{ color: C.textPrimary, fontWeight: 700, marginTop: 4 }}>{r.type}</div>
              </div>
              <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}55`, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700, height: "fit-content", whiteSpace: "nowrap" }}>
                {t[statusKey[r.status]] || r.status}
              </span>
            </div>
            <div style={{ color: C.textSecondary, fontSize: 13, lineHeight: 1.8 }}>{r.desc}</div>
            {r.assignedTo && (
              <div style={{ color: C.textSecondary, fontSize: 13, marginBottom: 8, marginTop: 6 }}>{r.assignedTo}</div>
            )}
            {r.status === "assigned" && r.otp && (
              <div style={{ marginTop: 12, textAlign: "center", padding: "14px", background: C.navyDim, borderRadius: 10, border: `1.5px dashed ${C.navy}` }}>
                <div style={{ color: C.textSecondary, fontSize: 12, marginBottom: 6 }}>{t.otpBoxLabel}</div>
                <div style={{ color: C.navy, fontWeight: 900, fontSize: 34, letterSpacing: 12, fontFamily: "monospace" }}>{r.otp}</div>
              </div>
            )}
            {r.status === "closed" && (
              <div style={{ marginTop: 10, padding: "8px 12px", background: C.greenBg, borderRadius: 8, color: C.green, fontSize: 13 }}>{t.closedOk}</div>
            )}
          </Card>
        );
      })}

      {searched && tracked.length === 0 && (
        <div style={{ textAlign: "center", color: C.textMuted, padding: 48, background: C.surface, borderRadius: 14, border: `1px solid ${C.border}` }}>
          {t.noRequests}
        </div>
      )}
    </div>
  );
}

// ── التطبيق الرئيسي ────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("ar");
  const [tab, setTab] = useState("new");
  const [submitted, setSubmitted] = useState(false);

  const t = TXT[lang];
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  const handleSubmit = () => { setSubmitted(true); setTimeout(() => { setSubmitted(false); }, 5000); };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', 'Tajawal', 'Cairo', Arial, sans-serif", direction: t.dir }}>

      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 24px", boxShadow: "0 2px 8px rgba(30,45,107,.07)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, overflow: "hidden", background: "#fff", border: `1px solid ${C.border}`, flexShrink: 0 }}>
              <img src={LOGO_SRC} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <div style={{ color: C.navy, fontWeight: 900, fontSize: 16 }}>{t.company}</div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>{t.portal}</div>
            </div>
          </div>
          <button onClick={toggleLang} title={t.langSwitch} style={{
            background: C.navyDim, color: C.navy, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 800,
            cursor: "pointer", fontFamily: "inherit", minWidth: 44,
          }}>{t.langBtn}</button>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
        <div style={{ display: "flex", background: C.navyDim, borderRadius: 12, padding: 4, marginBottom: 24, gap: 4 }}>
          {[{ key: "new", label: t.tabNew }, { key: "track", label: t.tabTrack }].map(tb => (
            <button key={tb.key} onClick={() => { setTab(tb.key); setSubmitted(false); }} style={{
              flex: 1, padding: "11px", borderRadius: 9, border: "none", fontFamily: "inherit",
              background: tab === tb.key ? C.navy : "transparent",
              color: tab === tb.key ? "#fff" : C.textSecondary,
              fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}>{tb.label}</button>
          ))}
        </div>

        {tab === "new" ? (
          submitted ? (
            <Card style={{ textAlign: "center", padding: "52px 24px" }}>
              <div style={{ color: C.green, fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{t.successTitle}</div>
              <div style={{ color: C.textSecondary, fontSize: 15, lineHeight: 2 }}>{t.successSub}</div>
            </Card>
          ) : (
            <NewRequestTab onSubmit={handleSubmit} t={t} />
          )
        ) : (
          <TrackTab t={t} />
        )}
      </div>

      <div style={{ textAlign: "center", padding: "24px", color: C.textMuted, fontSize: 12, borderTop: `1px solid ${C.border}`, marginTop: 20 }}>
        {t.footer}
      </div>
    </div>
  );
}
