import { OccasionWithHref } from "@/types/home";
import ASSETS from "../assets";

export const defaultOccasions: OccasionWithHref[] = [
  {
    id: 1,
    title: "مولود جديد",
    image: "/assets/home/occasions-img/newborn.png",
    icon: ASSETS.icons.occasions.newborn,
    href: "/bouquets?occasion=newborn&openFilter=occasion",
  },
  {
    id: 2,
    title: "نجاح",
    image: "/assets/home/occasions-img/Success.png",
    icon: ASSETS.icons.occasions.graduation,
    href: "/bouquets?occasion=graduation&openFilter=occasion",
  },
  {
    id: 3,
    title: "خطوبة",
    image: "/assets/home/occasions-img/Engagement.png",
    icon: ASSETS.icons.occasions.engagement,
    href: "/bouquets?occasion=engagement&openFilter=occasion",
  },
  {
    id: 4,
    title: "زواج",
    image: "/assets/home/occasions-img/Wedding.png",
    icon: ASSETS.icons.occasions.wedding,
    href: "/bouquets?occasion=wedding&openFilter=occasion",
  },
];
