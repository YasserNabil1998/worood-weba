import Image from "next/image";
import { FeatureItem } from "@/types";

export const localFeatures: FeatureItem[] = [
  {
    id: 3,
    icon: (
      <Image
        src="/assets/home/why-choose-us/ribbon-icon.svg"
        alt="تغليف فاخر"
        width={77}
        height={77}
        className="w-[73px] h-[73px] md:w-[77px] md:h-[77px]"
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
        width={79}
        height={79}
        className="w-[75px] h-[75px] md:w-[79px] md:h-[79px]"
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
        width={81}
        height={81}
        className="w-[77px] h-[77px] md:w-[81px] md:h-[81px]"
      />
    ),
    title: "توصيل فوري",
    description: "نوصلك الباقة بنفس اليوم داخل المدينة.",
  },
];
