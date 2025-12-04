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
    "/assets/home/most-requested-packages/Luxury-yellow-rose-bouquet.png",
    "/assets/home/most-requested-packages/Elegant-Violet-Bouquet.png",
    "/assets/home/most-requested-packages/Pink-Peach-Bouquet.png",
    "/assets/home/most-requested-packages/Orange-Tulip-Bouquet.png",
    "/assets/ready-packages-page1/باقة الورد الأبيض.png",
    "/assets/ready-packages-page1/باقة الورد الزهري.png",
    "/assets/ready-packages-page1/باقة الحب الأبدي.png",
    "/assets/ready-packages-page1/باقة الود الأبدي.png",
  ],
  productImages: [
    "/assets/product-images/main.png",
    "/assets/product-images/thumb-1.png",
    "/assets/product-images/thumb-2.png",
    "/assets/product-images/thumb-3.png",
    "/assets/home/most-requested-packages/Luxury-yellow-rose-bouquet.png",
    "/assets/home/most-requested-packages/Elegant-Violet-Bouquet.png",
    "/assets/ready-packages-page1/باقة الورد الأصفر الفاخر.png",
    "/assets/ready-packages-page1/باقة البنفسج الراقية.png",
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
