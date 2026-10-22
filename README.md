# AREUM Skin Care & Beauty

واجهة متجر AREUM جاهزة للتشغيل في أي محرر أكواد، ومُعدّة للربط مع باك إند لاحقًا.

## التشغيل

```bash
npm install
npm run dev
```

ثم افتح `http://localhost:3000`.

| الأمر               | الوظيفة              |
| ------------------- | -------------------- |
| `npm run dev`       | تشغيل التطوير        |
| `npm run build`     | بناء الإنتاج         |
| `npm run start`     | تشغيل النسخة المبنية |
| `npm run typecheck` | فحص TypeScript       |

المتطلب الوحيد: Node.js 18 أو أحدث. لا حاجة لقاعدة بيانات.

## التقنيات

- **React 19** لبناء الواجهة
- **TypeScript** لأنواع البيانات
- **Bootstrap 5 RTL** للتخطيط المتجاوب
- **CSS مخصص** في `src/styles/` لهوية AREUM
- **Vite** للتطوير والبناء

طبقة الصفحات والخدمات منفصلة عن العرض، مما يسهل الربط مع أي باك إند مستقبلاً دون إعادة كتابة منطق السلة أو الكتالوج.

## للتصدير لمبرمج الباك إند

1. سلّم المجلد كاملًا (بدون `node_modules` و`.next`).
2. التشغيل كما أعلاه.
3. الربط المستقبلي يتم عبر `src/services/`:
   - `catalog.service.ts` للمنتجات والتصنيفات
   - `order.service.ts` للطلبات
   - `account.service.ts` للحسابات
   - `api-client.ts` لاستدعاءات HTTP
4. عنوان الـ API من المتغير:

```
NEXT_PUBLIC_API_BASE_URL=
```

لا تُخزَّن أسرار في الواجهة الأمامية.

## الهيكل

```
public/images/   الشعار وأصول الصور
src/pages/       الصفحات
src/components/  مكونات الواجهة
src/context/     السلة والمفضلة والحساب
src/data/        بيانات المنتجات والتصنيفات
src/services/    طبقة الخدمات للربط مع الخادم
src/styles/      Bootstrap يُستورد + CSS الهوية
src/types/       أنواع TypeScript
```
