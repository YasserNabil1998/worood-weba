import { CartItem } from "@/types/cart";
import { CheckoutTotals } from "@/types/checkout";
import { APP_CONFIG, COLORS } from "@/constants";
import { fontStyle } from "@/lib/styles";

interface OrderSummaryProps {
  items: CartItem[];
  totals: CheckoutTotals;
  onPlaceOrder: () => void;
  isSubmitting: boolean;
}

export default function OrderSummary({
  items,
  totals,
  onPlaceOrder,
  isSubmitting,
}: OrderSummaryProps) {
  return (
    <aside className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 h-fit lg:sticky lg:top-24 lg:self-start lg:z-10" data-aos="none">
      <h2 className="text-lg font-semibold mb-6 text-gray-800" style={fontStyle}>
        ملخص الطلب
      </h2>

      {/* قائمة المنتجات */}
      <ul className="mb-6 divide-y divide-gray-100">
        {items.map((item, index) => {
          const itemPrice = item.isCustom ? (item.price ?? 0) : (item.total ?? item.price ?? 0);

          return (
            <li
              key={`${item.id}-${index}-${item.title}`}
              className="py-3 flex items-center justify-between text-sm transition-colors hover:bg-gray-50/50 -mx-2 px-2 rounded"
            >
              <span className="text-gray-700 flex-1 text-right pr-2">{item.title}</span>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-base font-bold text-[#5A5E4D]">
                  {itemPrice.toFixed(2)}
                </span>
                <span className="text-sm text-[#5A5E4D]">
                  {APP_CONFIG.CURRENCY}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* تفاصيل السعر */}
      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between items-center py-1">
          <span className="text-gray-600">الإجمالي الفرعي</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-bold text-[#5A5E4D]">
              {totals.subtotal.toFixed(2)}
            </span>
            <span className="text-sm sm:text-base text-[#5A5E4D]">
              {APP_CONFIG.CURRENCY}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-gray-600">
            ضريبة القيمة المضافة {(APP_CONFIG.VAT_RATE * 100).toFixed(0)}%
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-bold text-[#5A5E4D]">
              {totals.vat.toFixed(2)}
            </span>
            <span className="text-sm sm:text-base text-[#5A5E4D]">
              {APP_CONFIG.CURRENCY}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center font-bold border-t-2 border-gray-200 pt-4 mt-4">
          <span className="text-gray-800">المجموع</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-extrabold" style={{ color: COLORS.PRIMARY }}>
              {totals.grand.toFixed(2)}
            </span>
            <span className="text-sm sm:text-base text-[#5A5E4D]">
              {APP_CONFIG.CURRENCY}
            </span>
          </div>
        </div>
      </div>

      {/* زر تأكيد الطلب */}
      <button
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className={`mt-4 w-full rounded-lg py-3.5 font-semibold text-base transition-all duration-200 ${
          isSubmitting
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-[#5A5E4D] text-white hover:bg-[#4A4E3D] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        }`}
        style={fontStyle}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            جاري المعالجة...
          </span>
        ) : (
          "تأكيد الطلب"
        )}
      </button>
    </aside>
  );
}
