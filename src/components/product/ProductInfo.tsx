import FavoriteButton from "@/components/product/FavoriteButton";
import type { BouquetItem } from "@/types/bouquets";

interface ProductInfoProps {
  productId: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  product?: BouquetItem;
  // خيارات المنتج الحالية (للإضافات)
  productOptions?: {
    selectedSize?: string;
    color?: string;
    addCard?: boolean;
    cardMessage?: string;
    addChocolate?: boolean;
    giftWrap?: boolean;
    totalPrice?: number;
  };
}

export default function ProductInfo({
  productId,
  title,
  price,
  currency,
  description,
  product,
  productOptions,
}: ProductInfoProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-2xl font-bold text-gray-900 flex-1">{title}</h1>
        <FavoriteButton 
          productId={productId} 
          product={product}
          productOptions={productOptions}
        />
      </div>

      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-xl sm:text-2xl font-bold text-[#5A5E4D]">{price}</span>
        <span className="text-sm sm:text-base text-[#5A5E4D]">ر.س</span>
      </div>
    </div>
  );
}
