import { ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  quantity: number;
  totalPrice: number;
  currency: string;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  isEditMode?: boolean;
}

export default function ProductActions({
  quantity,
  totalPrice,
  currency,
  onQuantityChange,
  onAddToCart,
  isEditMode = false,
}: ProductActionsProps) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-900">الكمية</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-lg border border-gray-300 hover:border-[#5A5E4D] hover:bg-[#5A5E4D] hover:text-white flex items-center justify-center transition-all font-bold text-sm"
          >
            -
          </button>
          <span className="text-lg font-bold w-8 text-center text-[#5A5E4D]">{quantity}</span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-8 h-8 rounded-lg border border-gray-300 hover:border-[#5A5E4D] hover:bg-[#5A5E4D] hover:text-white flex items-center justify-center transition-all font-bold text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* الإجمالي */}
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700 font-medium">الإجمالي</span>
          <span className="text-xl font-bold text-[#5A5E4D]">
            {totalPrice} {currency}
          </span>
        </div>
      </div>

      {/* زر الإضافة للسلة */}
      <button
        onClick={onAddToCart}
        className="w-full bg-[#5A5E4D] text-white py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#4A4E3D] transition-all flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        {isEditMode ? "تحديث السلة" : "إضافة إلى السلة"}
      </button>
    </div>
  );
}
