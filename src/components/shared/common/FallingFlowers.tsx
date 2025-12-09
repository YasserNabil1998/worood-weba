"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

interface Flower {
  id: number;
  image: string;
  left: number; // موضع من اليسار (بالنسبة المئوية)
  delay: number; // تأخير البدء (بالثواني)
  duration: number; // مدة السقوط (بالثواني)
  size: number; // حجم الزهرة (بالبكسل)
  rotation: number; // زاوية الدوران
  startTop: number; // موضع البداية من الأعلى
}

const FLOWER_IMAGES = ["/flowerToScroll.svg", "/flowerToScroll2.svg"];

interface FallingFlowersProps {
  /**
   * عدد الورود على كل جانب
   */
  count?: number;
  /**
   * هل يجب إظهار الورود على الجانب الأيمن؟
   */
  showRight?: boolean;
  /**
   * هل يجب إظهار الورود على الجانب الأيسر؟
   */
  showLeft?: boolean;
  /**
   * سرعة السقوط (1 = عادي، 2 = سريع، 0.5 = بطيء)
   */
  speed?: number;
  /**
   * الشفافية (0 إلى 1)
   */
  opacity?: number;
}

/**
 * Component للورود المتساقطة على جوانب الصفحة
 * تتفاعل مع التمرير وتتحرك بشكل جميل
 */
export default function FallingFlowers({
  count = 6,
  showRight = true,
  showLeft = true,
  speed = 1,
  opacity = 0.25,
}: FallingFlowersProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(800);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [footerTop, setFooterTop] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // توليد الورود بشكل مختلط وعشوائي (ليس في عمود واحد)
  // فقط بعد mount على الـ client لتجنب hydration errors
  const flowers = useMemo(() => {
    // لا نولد الورود حتى يتم mount على الـ client
    if (!isMounted) return [];
    const generateFlowers = (side: "left" | "right"): Flower[] => {
      const sideFlowers: Flower[] = [];
      const sideCount = Math.floor(count / 2) + (side === "left" ? 0 : count % 2);

      // نطاق أفقي محصور في عمود رأسي واحد (توزيع منظم)
      const leftRange =
        side === "left"
          ? { min: 2, max: 5 } // 2% إلى 5% من اليسار (عمود رأسي واحد)
          : { min: 95, max: 98 }; // 95% إلى 98% من اليسار (عمود رأسي واحد)

      // إنشاء مصفوفة من الصور مخلوطة بشكل متساوي ومختلط
      // نضمن أن كل نوع يظهر بنفس العدد تقريباً ثم نخلطها
      const flowerImagesShuffled: string[] = [];
      const imagesPerType = Math.floor(sideCount / FLOWER_IMAGES.length);
      const remainder = sideCount % FLOWER_IMAGES.length;

      // إضافة الصور بشكل متساوي
      FLOWER_IMAGES.forEach((image, index) => {
        const count = imagesPerType + (index < remainder ? 1 : 0);
        for (let i = 0; i < count; i++) {
          flowerImagesShuffled.push(image);
        }
      });

      // خلط المصفوفة بشكل عشوائي (Fisher-Yates shuffle)
      for (let i = flowerImagesShuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flowerImagesShuffled[i], flowerImagesShuffled[j]] = [
          flowerImagesShuffled[j],
          flowerImagesShuffled[i],
        ];
      }

      // توزيع الورود في عمود رأسي واحد (منظم رأسياً)
      const verticalSpacing = 100; // المسافة الرأسية بين الورود
      const baseLeft = (leftRange.min + leftRange.max) / 2; // مركز العمود

      for (let i = 0; i < sideCount; i++) {
        // موضع أفقي في العمود (مع تباين بسيط جداً لتبدو طبيعية)
        const leftVariation = (Math.random() - 0.5) * (leftRange.max - leftRange.min) * 0.4;
        const finalLeft = baseLeft + leftVariation;

        // اختيار صورة من المصفوفة المخلوطة (مختلطة بشكل متساوي)
        const flowerImage =
          flowerImagesShuffled[i] ||
          FLOWER_IMAGES[Math.floor(Math.random() * FLOWER_IMAGES.length)];

        // مواضع رأسية منظمة في عمود واحد
        const verticalPosition = -100 - i * verticalSpacing;

        sideFlowers.push({
          id: i + (side === "left" ? 0 : sideCount * 1000),
          image: flowerImage,
          left: finalLeft,
          delay: i * 0.15 + Math.random() * 0.1, // تأخير متدرج مع تباين بسيط
          duration: (Math.random() * 2 + 6) / speed, // مدة من 6 إلى 8 ثواني
          size: Math.random() * 18 + 42, // حجم من 42 إلى 60 بكسل
          rotation: Math.random() * 360, // دوران عشوائي
          startTop: verticalPosition, // موضع رأسي منظم في عمود واحد
        });
      }

      return sideFlowers;
    };

    const leftFlowers = showLeft ? generateFlowers("left") : [];
    const rightFlowers = showRight ? generateFlowers("right") : [];
    return [...leftFlowers, ...rightFlowers];
  }, [count, showRight, showLeft, speed, isMounted]);

  // التأكد من mount على الـ client أولاً
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // تتبع التمرير وحجم الشاشة وموضع الفوتر
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // إظهار الورود بعد التمرير قليلاً
      if (currentScrollY > 200 && !isVisible) {
        setIsVisible(true);
      }

      // تحديث موضع الفوتر
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        setFooterTop(footerRect.top + window.scrollY);
      }

      // تحديث ارتفاع المستند
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      handleScroll(); // تحديث موضع الفوتر عند تغيير الحجم
    };

    // تهيئة أولية
    setViewportHeight(window.innerHeight);
    setDocumentHeight(document.documentElement.scrollHeight);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible, isMounted]);

  if (flowers.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 1s ease-in-out",
        zIndex: -1, // أسفل المحتوى
      }}
    >
      {flowers.map((flower) => {
        // حساب موضع السقوط بناءً على التمرير
        const scrollProgress = Math.min(scrollY / 2000, 1); // التقدم في التمرير
        const currentTop = flower.startTop + scrollProgress * (viewportHeight + 200);
        const rotation = flower.rotation + scrollProgress * 180;

        // حساب موضع الزهرة المطلق على الصفحة
        const absoluteTop = currentTop + scrollY;

        // إخفاء الزهرة إذا وصلت للفوتر (مع مسافة أمان 100px)
        const footerThreshold = footerTop - 100;
        const isNearFooter = footerTop > 0 && absoluteTop > footerThreshold;

        // إخفاء الزهرة إذا تجاوزت نهاية المستند
        const isPastDocument = absoluteTop > documentHeight;

        return (
          <div
            key={flower.id}
            className="absolute will-change-transform"
            style={{
              left: `${flower.left}%`,
              top: `${currentTop}px`,
              transform: `rotate(${rotation}deg) translateY(${Math.sin(scrollProgress * Math.PI * 2) * 8}px) scale(${1 + Math.sin(scrollProgress * Math.PI * 3) * 0.05})`,
              opacity: isNearFooter || isPastDocument ? 0 : opacity * (1 - scrollProgress * 0.2), // إخفاء عند الفوتر
              transition: "transform 0.08s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-in-out",
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
          >
            <Image
              src={flower.image}
              alt=""
              width={flower.size}
              height={flower.size}
              className="object-contain"
              style={{
                filter:
                  "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12)) drop-shadow(0 0 12px rgba(139, 69, 19, 0.15))",
                animation: `float ${flower.duration}s ease-in-out infinite`,
                animationDelay: `${flower.delay}s`,
                opacity: 0.85,
              }}
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
}
