export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    images: string[];
    description: string;
    currency: string;
}

export interface Size {
    value: string;
    label: string;
    price: number;
}

export interface ProductData {
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

