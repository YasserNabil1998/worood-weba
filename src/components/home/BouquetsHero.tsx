import Link from "next/link";
import Image from "next/image";

/**
 * Hero section component for the bouquets page
 * Displays a hero image with call-to-action button
 */
export default function BouquetsHero() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src="/images/hero/DIV-133.png"
            alt="متجر زهور"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />

          {/* Gradient blur overlay from right */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%)",
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%)",
            }}
          />

          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#5A5E4D",
              opacity: 0.08,
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/15 to-transparent" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full px-6 md:px-10 text-right">
              <div className="max-w-2xl ml-auto">
                <h2 className="text-[36px] font-bold leading-[40px] text-white mb-3 tracking-[0px]">
                  الباقات الجاهزة
                </h2>
                <p className="text-[18px] font-normal leading-[28px] text-white/90 mb-6 tracking-[0px]">
                  اختر من تشكيلتنا الواسعة من الباقات المصممة بعناية لتناسب جميع المناسبات والأذواق
                </p>
                <Link
                  href="#bouquets-section"
                  className="inline-block bg-white hover:bg-[#5A5E4D] text-[#5A5E4D] hover:text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
                >
                  تصفح الباقات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
