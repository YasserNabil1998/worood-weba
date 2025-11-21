import { OccasionWithHref } from "../@types/home/index.type";
import ASSETS from "../assets";

export const defaultOccasions: OccasionWithHref[] = [
  {
    id: 1,
    title: "مولود جديد",
    image: "/assets/home/occasions-img/newborn.png",
    icon: ASSETS.icons.occasions.newborn,
    href: "/occasions/newborn",
  },
  {
    id: 2,
    title: "نجاح",
    image: "/assets/home/occasions-img/Success.png",
    icon: ASSETS.icons.occasions.graduation,
    href: "/occasions/graduation",
  },
  {
    id: 3,
    title: "خطوبة",
    image: "/assets/home/occasions-img/Engagement.png",
    icon: ASSETS.icons.occasions.engagement,
    href: "/occasions/engagement",
  },
  {
    id: 4,
    title: "زواج",
    image: "/assets/home/occasions-img/Wedding.png",
    icon: ASSETS.icons.occasions.wedding,
    href: "/occasions/wedding",
  },
];
