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
  title = "صمم باقتك الخاصة",
  description = "نساعدك في تصميم باقة فريدة تناسب ذوقك ومناسبتك الخاصة",
  buttonText = "ابدأ التصميم الآن",
  buttonHref = ROUTES.CUSTOM,
}: CustomBouquetSectionProps) => {
  return (
    <section
      className="py-6 sm:py-8 md:py-10 relative overflow-visible"
      style={{ backgroundColor: "#fbfaf2" }}
    >
      <div className="w-full flex justify-center px-4 sm:px-6">
        {/* Container - 95% width, max-w-[1440px] - matching Figma design exactly */}
        <div className="w-[95%] max-w-[1440px] relative">
          {/* Main card - matching Figma: border-[#e0dede], rounded-[20px], h-[403px] */}
          <div
            className="relative border border-[#e0dede] border-solid rounded-[20px] h-[403px] bg-[#E0DEDE] w-full"
            style={{ overflow: "visible" }}
          >
            {/* Image on the left - matching Figma: 500px × 445px, positioned to overflow upward from container */}
            <div className="absolute left-[3px] top-[-42px] w-[500px] h-[445px] hidden lg:block z-20">
              <Image
                src="/assets/home/design-your-own-package-section.png"
                alt="تصميم باقة خاصة"
                width={500}
                height={445}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>

            {/* Content on the right - matching Figma: positioned from right, centered vertically */}
            <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end w-full lg:w-auto z-10">
              <div className="max-w-[672px] w-full px-8 lg:px-16 xl:pr-24">
                <div className="text-right flex flex-col items-start justify-end h-full">
                  {/* Title - matching Figma: 35px Bold, black, leading-[36px], pb-[16px] */}
                  <div style={{ paddingBottom: "16px", width: "100%", maxWidth: "672px" }}>
                    <h2
                      className="text-[28px] sm:text-[32px] md:text-[35px] font-bold text-black leading-[36px] text-right"
                      style={{
                        fontFamily: "var(--font-almarai)",
                      }}
                      dir="auto"
                    >
                      {title}
                    </h2>
                  </div>

                  {/* Description - matching Figma: 25px Regular, #606060, leading-[28px], pb-[32px], max-w-[587px] */}
                  <div style={{ paddingBottom: "32px", maxWidth: "587px", width: "100%" }}>
                    <p
                      className="text-[20px] sm:text-[23px] md:text-[25px] text-[#606060] leading-[28px] text-right"
                      style={{
                        fontFamily: "var(--font-almarai)",
                      }}
                      dir="auto"
                    >
                      {description}
                    </p>
                  </div>

                  {/* Button - matching Figma: #5a5e4d bg, 223px × 65px, 25px Bold, #fcfcfe text, px-[32px] py-[12px] */}
                  <Link
                    href={buttonHref}
                    className="bg-[#5a5e4d] hover:bg-[#4b5244] h-[65px] w-[223px] px-[32px] py-[12px] rounded-[4px] font-bold text-[20px] sm:text-[23px] md:text-[25px] leading-[24px] transition-all duration-300 flex items-center justify-center text-center whitespace-pre"
                    style={{
                      fontFamily: "var(--font-almarai)",
                      color: "#fcfcfe",
                    }}
                  >
                    {buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomBouquetSection;
