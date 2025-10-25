export interface Flower   { id: number; name: string; price: number; image: string; availableColors?: number[] };
export interface BouquetSize   { key: string; label: string; price: number; stems: string; icon?: string };
export interface BouquetStyle   {
    key: string;
    label: string;
    price: number;
    image: string;
};
export interface Vase   { id: number; name: string; price: number; image: string };
export interface Color   { id: number; color: string; name: string };
export interface Occasion   {
    id: number;
    name: string;
    message: string;
};
export interface DeliveryTime   { id: number; label: string; value: string };
export interface PaymentMethod   { key: string; label: string; icon: string };
export interface Config   { vatRate: number; cardPrice: number };
export type PackagingType = 'paper' | 'vase';