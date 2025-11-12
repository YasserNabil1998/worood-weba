import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/src/constants/routes";

type CustomBouquetSectionProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
};

const CustomBouquetSection = ({
  title = "نسقها بنفسك",
  description = "نساعدك في تصميم باقة فريدة تناسب ذوقك ومناسبتك الخاصة.",
  buttonText = "ابدأ التصميم الآن",
  buttonHref = ROUTES.CUSTOM,
}: CustomBouquetSectionProps) => {
  return (
    <section className="py-6 sm:py-8 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-56 sm:h-64 md:h-72 rounded-xl sm:rounded-2xl overflow-hidden">
          <Image
            src="/images/hero/DIV-133.png"
            alt="متجر زهور"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            loading="lazy"
          />
          {/* Blur تدريجي من اليمين */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%)",
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%)",
            }}
          ></div>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#5A5E4D", opacity: 0.08 }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/15 to-transparent"></div>
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full pr-4 sm:pr-6 md:pr-10">
              <div className="ml-auto max-w-sm sm:max-w-md md:max-w-xl text-right">
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  {title}
                </h2>
                <p className="text-white/90 text-base sm:text-lg md:text-xl mb-4 sm:mb-6 font-normal">
                  {description}
                </p>
                <Link
                  href={buttonHref}
                  className="inline-block bg-white hover:bg-[#5A5E4D] text-[#5A5E4D] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 text-sm sm:text-base"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  {buttonText}
                </Link>
              </div>
            </div>
          </div>
          {/* Close hero wrapper */}
        </div>
        {/* Close container */}
      </div>
    </section>
  );
};

export default CustomBouquetSection;
