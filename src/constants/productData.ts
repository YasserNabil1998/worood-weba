import { Size } from "@/src/@types/product/Product.type";

interface ProductDataType {
    bouquetImages: string[];
    productImages: string[];
    sizes: Size[];
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

