export interface CartItem {
    id: number;
    title: string;
    size: string;
    style: string;
    color: string;
    total: number;
    image?: string;
    isCustom?: boolean;
    price?: number;
}