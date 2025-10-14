# مجلد إدارة الأصول الثابتة - Static Assets

## الهدف

هذا المجلد يحتوي على ملف مركزي لإدارة جميع الأصول الثابتة في المشروع (الصور والأيقونات التي لن تتغير عند ربط API).

## الملفات

-   `index.ts` - الملف الرئيسي الذي يحتوي على جميع مسارات الأصول الثابتة

## الأصول المدارة

### 1. الشعارات (Logos)

-   `ASSETS.logos.main` - اللوجو الرئيسي SVG
-   `ASSETS.logos.alternate` - اللوجو البديل PNG

### 2. أيقونات الدفع (Payment Icons)

-   `ASSETS.payment.visa` - أيقونة Visa
-   `ASSETS.payment.mastercard` - أيقونة Mastercard
-   `ASSETS.payment.applePay` - أيقونة Apple Pay
-   `ASSETS.payment.paypal` - أيقونة PayPal

### 3. أيقونات المناسبات (Occasion Icons)

-   `ASSETS.icons.occasions.newborn` - أيقونة مولود جديد
-   `ASSETS.icons.occasions.graduation` - أيقونة التخرج
-   `ASSETS.icons.occasions.engagement` - أيقونة الخطوبة
-   `ASSETS.icons.occasions.wedding` - أيقونة الزفاف

### 4. أيقونات SVG (Static SVG Icons)

-   `ASSETS.svg.file` - أيقونة ملف
-   `ASSETS.svg.globe` - أيقونة الكرة الأرضية
-   `ASSETS.svg.window` - أيقونة النافذة
-   `ASSETS.svg.next` - أيقونة Next.js
-   `ASSETS.svg.vercel` - أيقونة Vercel

### 5. الصور الافتراضية (Placeholders)

-   `ASSETS.placeholders.product` - صورة افتراضية للمنتجات
-   `ASSETS.placeholders.default` - الصورة الافتراضية العامة

## كيفية الاستخدام

### في المكونات (Components)

```typescript
import { ASSETS } from "@/assets";
import Image from "next/image";

// مثال 1: استخدام اللوجو
<Image src={ASSETS.logos.main} alt="زهور الشمس" />

// مثال 2: استخدام أيقونات الدفع
<Image src={ASSETS.payment.visa} alt="Visa" />

// مثال 3: استخدام أيقونات المناسبات
<Image src={ASSETS.icons.occasions.newborn} alt="مولود جديد" />
```

### في الصفحات (Pages)

```typescript
import { ASSETS } from "@/assets";

const MyPage = () => {
    return (
        <div>
            <img src={ASSETS.logos.main} alt="Logo" />
        </div>
    );
};
```

## ملاحظات مهمة

### ما تم تضمينه ✅

-   الأصول الثابتة التي لن تتغير عند ربط API
-   الشعارات والأيقونات الأساسية
-   أيقونات طرق الدفع

### ما لم يتم تضمينه ❌

-   صور المنتجات (ستأتي من API)
-   صور الباقات (ستأتي من API)
-   صور المدونة (ستأتي من API)
-   صور المناسبات (ستأتي من API)
-   صور Hero Section (ستأتي من API)
-   صور OccasionsSlider (ستأتي من API)

## الفوائد

1. **تنظيم أفضل**: جميع الأصول الثابتة في مكان واحد
2. **Type Safety**: TypeScript يتحقق من صحة المسارات
3. **سهولة الصيانة**: تحديث المسارات من ملف واحد
4. **جاهزية API**: المحتوى الديناميكي لم يتأثر، جاهز للاستبدال بـ API
5. **توثيق تلقائي**: الملف يعمل كتوثيق لجميع الأصول

## التحديثات المستقبلية

عند ربط API:

-   لن تحتاج تعديل هذا الملف
-   الأصول الثابتة ستبقى كما هي
-   المحتوى الديناميكي سيأتي مباشرة من API responses

## المكونات المحدثة

تم تحديث المكونات التالية لاستخدام هذا الملف:

-   ✅ `Header.tsx` - اللوجو
-   ✅ `Footer.tsx` - أيقونات الدفع
-   ✅ `OccasionsSection.tsx` - أيقونات المناسبات

## مثال على ربط API (مستقبلاً)

```typescript
// قبل (ثابت)
const product = {
    id: 1,
    image: "/images/products/product-1.jpg",
};

// بعد (من API)
const product = await fetch("/api/products/1");
// product.image سيكون: "https://api.example.com/uploads/product-1.jpg"
```

---

**ملاحظة**: هذا الملف جزء من تحسين بنية المشروع لتسهيل ربط API لاحقاً.
