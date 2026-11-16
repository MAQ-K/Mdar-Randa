# خطوات الرفع على cPanel — مدار راندا

## قبل أي شيء
غيّر `API_BASE` في `client-portal.jsx` و`staff-app.jsx` إن كان عنوان الدومين غير
`https://madaranda.com/api` (ثم أعد البناء `npm run build` إذا عدّلت).

## 1) الباك-إند (server-backend.zip)
1. cPanel → **Setup Node.js App** → Create Application.
2. Node version: أي إصدار LTS (18 أو 20).
3. Application mode: **Production**.
4. Application root: مجلد خارج public_html، مثلاً `madaranda-api`.
5. Application URL: `madaranda.com/api`.
6. ارفع محتوى `server-backend.zip` (يحتوي `server.js` + `package.json`) داخل الـ Application root وفك الضغط.
7. من صفحة التطبيق: **Run NPM Install** ثم **Start App**.
8. تأكد إن الـ Taqnyat token/sender صحيحين داخل `server.js` (موجودين مسبقاً).

## 2) بوابة العملاء (client-portal-dist.zip) → على madaranda.com
1. ارفع محتوى `client-portal-dist.zip` (index.html + assets/) مباشرة داخل `public_html/`.
2. تأكد `public_html/index.html` موجود بعد فك الضغط.

## 3) تطبيق الموظفين (staff-app-dist.zip) → على madaranda.com/staff
1. أنشئ مجلد `public_html/staff/`.
2. ارفع محتوى `staff-app-dist.zip` داخل هذا المجلد.
3. لا تربط هذا الرابط من الموقع العام — الوصول فقط عبر كتابة الرابط مباشرة كما طلب العميل.
4. (اختياري) أضف قاعدة في `public_html/robots.txt`: `Disallow: /staff`

## 4) SSL
تأكد AutoSSL (Let's Encrypt) مفعّل على madaranda.com من cPanel.

## 5) اختبار شامل
- إرسال طلب صيانة حقيقي من الموقع → تأكد وصول SMS لتأكيد الطلب.
- تسجيل دخول كمشرف (`super` / `super123`) على `/staff` → إسناد الطلب لمجموعة → تأكد وصول SMS برمز الإغلاق.
- تسجيل دخول كفني بنفس المجموعة → إغلاق الطلب بالرمز.
- تسجيل دخول كإدارة (`admin` / `admin123`) → تأكد ظهور كل الطلبات.

## ملاحظات مهمة يجب معرفتها
- **التخزين لا يزال في الذاكرة**: أي إعادة تشغيل لتطبيق Node.js تمسح كل الطلبات. يجب ربط
  قاعدة بيانات (MySQL/MongoDB) قبل الإطلاق الفعلي — هذه أعلى أولوية.
- **حسابات الموظفين والفنيين والمجموعات محلية بالكامل** (داخل المتصفح فقط) — الخادم لا
  يحتوي endpoints لها بعد. أي تعديل (إضافة فني، تعديل مجموعة) لا يتزامن بين الأجهزة ويُفقد
  عند تحديث الصفحة. Login الحالي: admin/admin123, super/super123, kalam/kalam123, إلخ.
- **كلمات المرور نصّية** (غير مشفّرة) — يفضل bcrypt قبل الإطلاق الفعلي.
- **رفع صورة عقد الضمان** في بوابة العميل غير متصل بالخادم بعد (الخادم يستقبل JSON فقط،
  لا يدعم رفع ملفات حالياً).
