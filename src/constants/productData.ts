import type { Size, ColorOption } from "@/src/@types/product/Product.type";

interface ProductDataType {
  bouquetImages: string[];
  productImages: string[];
  sizes: Size[];
  colors: ColorOption[];
  addons: {
    card: { price: number; label: string };
    chocolate: { price: number; label: string };
    giftWrap: { price: number; label: string };
  };
  defaultDescription: string;
  priceMultiplier: number;
  currency: string;
}

export const PRODUCT_DATA: ProductDataType = {
  bouquetImages: [
    "/images/bouquets/DIV-237.png",
    "/images/bouquets/IMG-196.png",
    "/images/bouquets/IMG-210.png",
    "/images/bouquets/IMG-224.png",
  ],
  productImages: [
    "/images/Products/Products-1.jpg",
    "/images/Products/Products-2.jpg",
    "/images/Products/Products-3.jpg",
    "/images/Products/Products-4.jpg",
    "/images/Products/Products-5.jpg",
    "/images/Products/Products-6.jpg",
  ],
  sizes: [
    {
      value: "small",
      label: "صغير",
      price: 0,
    },
    {
      value: "medium",
      label: "متوسط",
      price: 50,
    },
    {
      value: "large",
      label: "كبير",
      price: 100,
    },
  ],
  colors: [
    {
      value: "classic",
      label: "كما في الصورة",
      hex: "#E27281",
    },
    {
      value: "white",
      label: "أبيض",
      hex: "#F5F5F5",
    },
    {
      value: "pink",
      label: "وردي",
      hex: "#F4A6C6",
    },
    {
      value: "red",
      label: "أحمر",
      hex: "#D64550",
    },
    {
      value: "purple",
      label: "بنفسجي",
      hex: "#9A7EDA",
    },
  ],
  addons: {
    card: {
      price: 20,
      label: "إضافة بطاقة تهنئة",
    },
    chocolate: {
      price: 30,
      label: "إضافة شوكولاتة",
    },
    giftWrap: {
      price: 15,
      label: "تغليف هدية",
    },
  },
  defaultDescription:
    "باقة رائعة من الورود الطازجة بألوان متنوعة، مرتبة بعناية فائقة لتعبر عن مشاعركم. تحتوي على مجموعة مختارة من أجود أنواع الورود مع أوراق خضراء طبيعية. مناسبة لجميع المناسبات السعيدة.",
  priceMultiplier: 10,
  currency: "ر.س",
};
