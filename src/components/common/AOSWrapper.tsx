"use client";

import { ReactNode } from "react";

interface AOSWrapperProps {
  children: ReactNode;
  /**
   * نوع الأنيميشن من AOS
   * fade-up, fade-down, fade-left, fade-right, fade-in, zoom-in, zoom-out, etc.
   */
  animation?: string;
  /**
   * التأخير قبل بدء الأنيميشن (بالميلي ثانية)
   */
  delay?: number;
  /**
   * مدة الأنيميشن (بالميلي ثانية)
   */
  duration?: number;
  /**
   * المسافة من العنصر قبل بدء الأنيميشن
   */
  offset?: number;
  /**
   * هل يجب تشغيل الأنيميشن مرة واحدة فقط؟
   */
  once?: boolean;
  /**
   * CSS classes إضافية
   */
  className?: string;
}

/**
 * مكون بسيط يستخدم AOS (Animate On Scroll) مباشرة
 * مشابه لموقع meq-dar.com
 */
export default function AOSWrapper({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 1000,
  offset = 80,
  once = true,
  className = "",
}: AOSWrapperProps) {
  return (
    <div
      data-aos={animation}
      data-aos-delay={delay}
      data-aos-duration={duration}
      data-aos-offset={offset}
      data-aos-once={once}
      data-aos-easing="ease-out-quart"
      className={className}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
