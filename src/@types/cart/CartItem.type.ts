export interface CartItem {
    id: number;
    title: string;
    price: number;
    subtotal?: number;
    vat?: number;
    quantity: number;
    image: string;
    isCustom?: boolean;
    customData?: any;
    // للباقات الجاهزة القديمة
    size?: string;
    style?: string;
    color?: string;
    total?: number;
};