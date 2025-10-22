import { OccasionWithHref } from "../@types/home/index.type";
import ASSETS from "../assets";

export const defaultOccasions: OccasionWithHref[] = [
    {
        id: 1,
        title: "مولود جديد",
        image: "/images/occasions/DIV-74.png",
        icon: ASSETS.icons.occasions.newborn,
        href: "/occasions/newborn",
    },
    {
        id: 2,
        title: "نجاح",
        image: "/images/occasions/DIV-64.png",
        icon: ASSETS.icons.occasions.graduation,
        href: "/occasions/graduation",
    },
    {
        id: 3,
        title: "خطوبة",
        image: "/images/occasions/DIV-56.png",
        icon: ASSETS.icons.occasions.engagement,
        href: "/occasions/engagement",
    },
    {
        id: 4,
        title: "زواج",
        image: "/images/occasions/DIV-46.png",
        icon: ASSETS.icons.occasions.wedding,
        href: "/occasions/wedding",
    },
];
