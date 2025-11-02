import { Truck, Heart, Gift } from "lucide-react";
import { FeatureItem } from "@/types";

export const localFeatures: FeatureItem[] = [
  {
    id: 1,
    icon: <Truck className="w-7 h-7 md:w-8 md:h-8" />,
    title: "توصيل سريع",
    description: "خدمة توصيل في نفس اليوم لجميع مناطق المدينة.",
  },
  {
    id: 2,
    icon: <Heart className="w-7 h-7 md:w-8 md:h-8" />,
    title: "ضمان الجودة",
    description: "نضمن لك أعلى جودة من الزهور الطازجة",
  },
  {
    id: 3,
    icon: <Gift className="w-7 h-7 md:w-8 md:h-8" />,
    title: "تغليف مميز",
    description: "تغليف راقي يليق بمناسباتك الخاصة",
  },
];
