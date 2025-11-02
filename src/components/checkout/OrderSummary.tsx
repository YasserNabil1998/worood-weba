import { CartItem } from "@/src/@types/cart/CartItem.type";
import { CheckoutTotals } from "@/src/@types/checkout/CheckoutForm.type";
import { APP_CONFIG, COLORS } from "@/src/constants";

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
    <aside className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 h-fit lg:sticky lg:top-24">
      <h2
        className="text-lg font-semibold mb-6 text-gray-800"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
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
              <span className="font-semibold text-gray-900 whitespace-nowrap">
                {APP_CONFIG.CURRENCY} {itemPrice.toFixed(2)}
              </span>
            </li>
          );
        })}
      </ul>

      {/* تفاصيل السعر */}
      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between py-1">
          <span className="text-gray-600">الإجمالي الفرعي</span>
          <span className="font-medium text-gray-900">
            {APP_CONFIG.CURRENCY} {totals.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-gray-600">
            ضريبة القيمة المضافة {(APP_CONFIG.VAT_RATE * 100).toFixed(0)}%
          </span>
          <span className="font-medium text-gray-900">
            {APP_CONFIG.CURRENCY} {totals.vat.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between font-bold border-t-2 border-gray-200 pt-4 mt-4">
          <span className="text-gray-800">المجموع</span>
          <span className="text-xl font-extrabold" style={{ color: COLORS.PRIMARY }}>
            {APP_CONFIG.CURRENCY} {totals.grand.toFixed(2)}
          </span>
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
        style={{ fontFamily: "var(--font-almarai)" }}
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
