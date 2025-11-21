"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./SplashScreen.css";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [petalPositions, setPetalPositions] = useState<
    Array<{
      left: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    // توليد مواضع البتلات مرة واحدة
    const positions = [...Array(12)].map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 2,
    }));
    setPetalPositions(positions);

    // بعد 1.8 ثانية نبدأ التلاشي
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1800);

    // بعد 2.3 ثانية نخفي الصفحة تماماً
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`splash-screen ${isFadingOut ? "fade-out" : ""}`}>
      <div className="splash-content">
        {/* دوائر زخرفية خلفية */}
        <div className="decorative-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>

        {/* الورود الطافية */}
        <div className="floating-flowers">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="floating-flower"
              style={{
                left: `${15 + index * 12}%`,
                animationDelay: `${index * 0.3}s`,
                animationDuration: `${3 + (index % 3) * 0.5}s`,
              }}
            >
              <svg viewBox="0 0 50 50" className="flower-icon">
                <defs>
                  <radialGradient id={`flower-grad-${index}`}>
                    <stop offset="0%" stopColor="#7A7E6D" />
                    <stop offset="100%" stopColor="#5A5E4D" />
                  </radialGradient>
                </defs>
                {/* بتلات بسيطة */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx="25"
                    cy="15"
                    rx="5"
                    ry="10"
                    fill={`url(#flower-grad-${index})`}
                    opacity="0.6"
                    transform={`rotate(${angle} 25 25)`}
                  />
                ))}
                <circle cx="25" cy="25" r="4" fill="#9A9E8D" opacity="0.8" />
              </svg>
            </div>
          ))}
        </div>

        {/* الشعار الرئيسي */}
        <div className="logo-container-center">
          <div className="logo-background">
            <div className="logo-ring-elegant"></div>
            <div className="logo-ring-elegant-2"></div>
          </div>

          <div className="logo-main">
            <Image
              src="/assets/Logo.svg"
              alt="شعار ورود الشمس"
              width={260}
              height={95}
              priority
              className="logo-image"
            />
          </div>

          {/* نص ترحيبي لطيف */}
          <div className="welcome-text">أهلاً بك</div>
        </div>

        {/* البتلات المتساقطة */}
        <div className="falling-petals">
          {petalPositions.map((position, index) => (
            <div
              key={index}
              className="petal"
              style={{
                left: `${position.left}%`,
                animationDelay: `${position.delay}s`,
                animationDuration: `${position.duration}s`,
              }}
            >
              <svg viewBox="0 0 20 30" className="petal-svg">
                <ellipse cx="10" cy="15" rx="8" ry="14" fill="#7A7E6D" opacity="0.4" />
              </svg>
            </div>
          ))}
        </div>

        {/* شريط التحميل الأنيق */}
        <div className="elegant-loader">
          <div className="loader-track">
            <div className="loader-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
