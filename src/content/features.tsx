import Image from "next/image";
import { FeatureItem } from "@/types";

export const localFeatures: FeatureItem[] = [
  {
    id: 3,
    icon: (
      <Image
        src="/assets/home/why-choose-us/ribbon-icon.svg"
        alt="تغليف فاخر"
        width={65}
        height={65}
        className="w-[60px] h-[60px] md:w-[65px] md:h-[65px]"
      />
    ),
    title: "تغليف فاخر",
    description: "كل باقة تُقدم بتغليف أنيق يناسب كل مناسبة.",
  },
  {
    id: 2,
    icon: (
      <Image
        src="/assets/home/why-choose-us/guarantee-icon.svg"
        alt="ضمان الجودة"
        width={67}
        height={67}
        className="w-[63px] h-[63px] md:w-[67px] md:h-[67px]"
      />
    ),
    title: "ضمان الجودة",
    description: "نختار أجمل الزهور من الموردين يوميًا.",
  },
  {
    id: 1,
    icon: (
      <Image
        src="/assets/home/why-choose-us/delivery-icon.svg"
        alt="توصيل فوري"
        width={69}
        height={69}
        className="w-[65px] h-[65px] md:w-[69px] md:h-[69px]"
      />
    ),
    title: "توصيل فوري",
    description: "نوصلك الباقة بنفس اليوم داخل المدينة.",
  },
];
