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
          {/* Main card - matching Figma: border-[#e0dede], rounded-[20px], h-[403px], gradient background, shadow */}
          <div
            className="relative border border-[#e0dede] border-solid rounded-[20px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[403px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full"
            style={{
              overflow: "visible",
              background: "linear-gradient(to right, #5F664F, #C5CDC2)",
            }}
          >
            {/* Image on the left - matching Figma: 500px × 445px, positioned to overflow upward from container */}
            <div className="absolute left-[2px] sm:left-[3px] top-[-15px] sm:top-[-20px] md:top-[-25px] lg:top-[-30px] xl:top-[-35px] w-[150px] h-[135px] sm:w-[220px] sm:h-[198px] md:w-[300px] md:h-[270px] lg:w-[380px] lg:h-[342px] xl:w-[450px] xl:h-[405px] 2xl:w-[500px] 2xl:h-[445px] z-20">
              <Image
                src="/assets/home/design-your-own-package-section.png"
                alt="تصميم باقة خاصة"
                width={500}
                height={445}
                className="object-contain w-full h-full"
                loading="lazy"
              />
            </div>

            {/* Content on the right - matching Figma: positioned from right, centered vertically */}
            <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end w-full lg:w-auto z-10">
              <div className="w-full px-3 sm:px-4 md:px-8 lg:px-16 xl:pr-24 pl-[155px] sm:pl-[225px] md:pl-[305px] lg:pl-[385px] xl:pl-[455px] 2xl:pl-0">
                <div className="text-right flex flex-col items-start justify-center h-full py-3 sm:py-4 md:py-6 lg:py-8 xl:py-0">
                  {/* Title - matching Figma: 35px Bold, black, leading-[36px], pb-[16px] */}
                  <div
                    className="pb-[10px] sm:pb-[12px] md:pb-[14px] lg:pb-[16px] w-full"
                    style={{ maxWidth: "672px" }}
                  >
                    <h2
                      className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[35px] font-bold text-black leading-tight sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[34px] 2xl:leading-[36px] text-right"
                      style={{
                        fontFamily: "var(--font-almarai)",
                      }}
                      dir="auto"
                    >
                      {title}
                    </h2>
                  </div>

                  {/* Description - matching Figma: 25px Regular, black, leading-[28px], pb-[32px] */}
                  <div className="pb-[15px] sm:pb-[18px] md:pb-[22px] lg:pb-[28px] xl:pb-[32px] 2xl:pb-[35px] w-full">
                    <p
                      className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[23px] 2xl:text-[25px] text-black leading-relaxed sm:leading-[20px] md:leading-[22px] lg:leading-[24px] xl:leading-[26px] 2xl:leading-[28px] text-right"
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
                    className="bg-[#5a5e4d] hover:bg-[#4b5244] h-[45px] sm:h-[50px] md:h-[55px] lg:h-[60px] xl:h-[63px] 2xl:h-[65px] w-[160px] sm:w-[180px] md:w-[200px] lg:w-[215px] xl:w-[220px] 2xl:w-[223px] px-[20px] sm:px-[24px] md:px-[28px] lg:px-[32px] py-[8px] sm:py-[10px] md:py-[11px] lg:py-[12px] rounded-[4px] font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[23px] 2xl:text-[25px] leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[23px] xl:leading-[24px] transition-all duration-300 flex items-center justify-center text-center whitespace-pre"
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
