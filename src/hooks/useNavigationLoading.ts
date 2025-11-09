"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useNavigationLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // إخفاء اللودر عند تحميل الصفحة الجديدة
    setIsLoading(false);
  }, [pathname]);

  // إضافة مستمعي الأحداث للنقر على الروابط
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // تجاهل النقر على الأزرار (مثل زر المفضلة أو إضافة للسلة)
      if (target.tagName === "BUTTON" || target.closest("button")) {
        return;
      }

      const link = target.closest("a[href]");

      if (link && link.getAttribute("href")?.startsWith("/")) {
        const href = link.getAttribute("href");
        const currentPath = window.location.pathname;

        // إظهار اللودر فقط إذا كان الرابط مختلف عن الصفحة الحالية
        if (href !== currentPath) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return { isLoading };
};
