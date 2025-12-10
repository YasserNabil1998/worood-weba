"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./SplashScreen.css";
import { TIMEOUTS } from "@/constants";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // بعد 1.8 ثانية نبدأ التلاشي
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, TIMEOUTS.SPLASH_FADE_OUT);

    // بعد 2.3 ثانية نخفي الصفحة تماماً
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, TIMEOUTS.SPLASH_HIDE);

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
