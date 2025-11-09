import { Star } from "lucide-react";
import FavoriteButton from "@/src/components/FavoriteButton";

interface ProductInfoProps {
  productId: string;
  title: string;
  price: number;
  currency: string;
  description: string;
}

export default function ProductInfo({
  productId,
  title,
  price,
  currency,
  description,
}: ProductInfoProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-2xl font-bold text-gray-900 flex-1">{title}</h1>
        <FavoriteButton productId={productId} />
      </div>

      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
        ))}
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-[#5A5E4D]">{price}</span>
        <span className="text-base text-gray-600">{currency}</span>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
