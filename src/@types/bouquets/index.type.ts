export interface BouquetItem {
    id: number;
    title: string;
    image: string;
    price: number;
    badge?: string;
    isPopular?: boolean;
    color?: string;
    occasion?: string;
    currency?: string;
}

// Keep the old interface for backward compatibility
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Item extends BouquetItem {}
