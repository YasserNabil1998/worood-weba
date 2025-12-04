# دليل الألوان - Color Guide

هذا الملف يوثق جميع الألوان المستخدمة في التطبيق.

## الألوان الأساسية (Primary Colors)

| اللون | القيمة | الاستخدام |
|------|--------|----------|
| `PRIMARY` | `#5A5E4D` | اللون الأساسي للتطبيق |
| `PRIMARY_DARK` | `#4A4E3D` | اللون الأساسي الداكن |
| `PRIMARY_HOVER` | `#6b6f5e` | اللون الأساسي عند hover (للـ scrollbar) |

## الألوان الثانوية (Secondary Colors)

| اللون | القيمة | الاستخدام |
|------|--------|----------|
| `SECONDARY` | `#5f664f` | اللون الثانوي (أزرار) |
| `SECONDARY_DARK` | `#4b5244` | اللون الثانوي الداكن |
| `SECONDARY_HOVER` | `#5a6550` | اللون الثانوي عند hover |

## ألوان الأزرار (Button Colors)

| اللون | القيمة | الاستخدام |
|------|--------|----------|
| `EDIT_BUTTON` | `#6e7b5a` | زر التعديل |
| `DANGER` | `#800020` | زر الحذف |
| `DANGER_HOVER` | `#9a0026` | زر الحذف عند hover |

## ألوان النصوص (Text Colors)

| اللون | القيمة | الاستخدام |
|------|--------|----------|
| `TEXT_SECONDARY` | `#727272` | النص الثانوي |
| `TEXT_MUTED` | `#9ea2a9` | النص الخافت |
| `FOREGROUND` | `#171717` | لون النص الأساسي |

## ألوان الخلفية (Background Colors)

| اللون | القيمة | الاستخدام |
|------|--------|----------|
| `BACKGROUND` | `#fbfaf2` | لون الخلفية الأساسي |

## ألوان Scrollbar

### Scrollbar العادي
| اللون | القيمة | الاستخدام |
|------|--------|----------|
| `SCROLLBAR_TRACK` | `#f1f1f1` | خلفية شريط التمرير |
| `SCROLLBAR_THUMB` | `#c1c1c1` | شريط التمرير |
| `SCROLLBAR_THUMB_HOVER` | `#a8a8a8` | شريط التمرير عند hover |

### Custom Scrollbar
| اللون | القيمة | الاستخدام |
|------|--------|----------|
| `CUSTOM_SCROLLBAR_TRACK` | `#f8f9fa` | خلفية شريط التمرير المخصص |
| `CUSTOM_SCROLLBAR_THUMB` | `#cbd5e1` | شريط التمرير المخصص |
| `CUSTOM_SCROLLBAR_THUMB_HOVER` | `#94a3b8` | شريط التمرير المخصص عند hover |

## ألوان Gradient

| اللون | القيمة | الاستخدام |
|------|--------|----------|
| `GRADIENT_START` | `rgba(90, 94, 77, 0.1)` | بداية التدرج (PRIMARY مع opacity 0.1) |
| `GRADIENT_END` | `rgba(90, 94, 77, 0.05)` | نهاية التدرج (PRIMARY مع opacity 0.05) |

## الاستخدام

```typescript
import { COLORS } from "@/src/constants";

// في المكونات
<div style={{ backgroundColor: COLORS.PRIMARY }}>...</div>

// في CSS
.custom-class {
  color: var(--primary); /* استخدام CSS variable */
}
```

## CSS Variables

يتم تعريف بعض الألوان كـ CSS variables في `globals.css`:

- `--background`: `#fbfaf2`
- `--foreground`: `#171717`
- `--primary`: `#5A5E4D`
- `--primary-dark`: `#4A4E3D`

## ملاحظات

- جميع الألوان محددة في `src/constants/index.ts`
- الألوان المستخدمة في CSS موجودة في `src/app/globals.css`
- يجب استخدام الثوابت من `COLORS` بدلاً من القيم المباشرة في الكود

