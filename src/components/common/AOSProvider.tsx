"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Provider component لتهيئة مكتبة AOS (Animate On Scroll)
 * يجب استخدامه في layout.tsx
 * مشابه لموقع meq-dar.com
 */
export default function AOSProvider() {
  useEffect(() => {
    // تهيئة AOS بعد تحميل الصفحة - إعدادات عصرية ومحسّنة
    AOS.init({
      // إعدادات عصرية ومحسّنة
      duration: 1000, // مدة الأنيميشن أطول قليلاً لحركة أكثر سلاسة
      easing: "ease-out-quart", // نوع حركة أكثر عصرية وسلاسة
      once: true, // تشغيل الأنيميشن مرة واحدة فقط عند أول ظهور
      offset: 80, // مسافة أقل لظهور أسرع وأكثر تفاعلية
      delay: 0, // تأخير افتراضي
      anchorPlacement: "top-bottom", // نقطة البداية للأنيميشن
      disable: false, // مفعّل على جميع الأجهزة
      startEvent: "DOMContentLoaded", // حدث البدء
      mirror: false, // لا يعيد الأنيميشن عند الخروج من الشاشة
      useClassNames: false, // استخدام data-aos attributes فقط
    });

    // تحديث AOS عند تغيير حجم الشاشة
    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}

