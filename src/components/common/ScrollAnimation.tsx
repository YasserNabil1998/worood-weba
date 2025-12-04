"use client";

import { ReactNode, useRef, useEffect, useState } from "react";

type AnimationType = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleIn" | "fadeUpStagger";

interface ScrollAnimationProps {
  /**
   * المحتوى المراد إظهاره مع الأنيميشن
   */
  children: ReactNode;
  /**
   * نوع الأنيميشن المطلوب
   */
  animationType?: AnimationType;
  /**
   * المسافة من العنصر قبل بدء الأنيميشن (بالنسبة المئوية)
   */
  threshold?: number;
  /**
   * التأخير قبل بدء الأنيميشن (بالميلي ثانية)
   */
  delay?: number;
  /**
   * مدة الأنيميشن (بالميلي ثانية)
   */
  duration?: number;
  /**
   * هل يجب إعادة تشغيل الأنيميشن عند الخروج من الشاشة ثم العودة؟
   */
  repeat?: boolean;
  /**
   * المسافة من أسفل الشاشة قبل بدء الأنيميشن
   */
  rootMargin?: string;
  /**
   * CSS classes إضافية
   */
  className?: string;
}

/**
 * Component للأنيميشن عند التمرير
 * يغلف أي محتوى ويضيف أنيميشن جميل عند ظهوره في الشاشة
 */
export default function ScrollAnimation({
  children,
  animationType = "fadeUp",
  threshold = 0.1,
  delay = 0,
  duration = 800,
  repeat = false,
  rootMargin = "0px 0px -50px 0px",
  className = "",
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // إذا تم تشغيل الأنيميشن من قبل ولا نريد التكرار، لا نفعل شيء
    if (hasAnimated && !repeat) return;

    // فحص أولي: إذا كان العنصر مرئياً بالفعل عند التحميل، أظهره فوراً
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect();
      const isInViewport =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;

      if (isInViewport && !hasAnimated) {
        // إذا كان مرئياً، أظهره بعد تأخير بسيط
        setTimeout(() => {
          setIsVisible(true);
          setHasAnimated(true);
        }, Math.min(delay, 100)); // تأخير قصير للعناصر المرئية
        return true;
      }
      return false;
    };

    // إذا كان مرئياً بالفعل، لا نحتاج للمراقبة
    if (checkInitialVisibility()) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // تأخير بسيط لجعل الأنيميشن أكثر سلاسة
            setTimeout(() => {
              setIsVisible(true);
              if (!hasAnimated) {
                setHasAnimated(true);
              }
            }, delay);

            // إذا لم نكن نريد التكرار، نتوقف عن المراقبة
            if (!repeat) {
              observer.unobserve(entry.target);
            }
          } else if (repeat && hasAnimated) {
            // إذا خرج العنصر من الشاشة ونريد التكرار، نعيد تعيين الحالة
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, delay, repeat, hasAnimated, rootMargin]);

  // تحديد class الأنيميشن بناءً على النوع
  const getAnimationClass = () => {
    if (!isVisible) {
      return `scroll-animate-${animationType}-hidden`;
    }
    return `scroll-animate-${animationType}-visible`;
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
}

