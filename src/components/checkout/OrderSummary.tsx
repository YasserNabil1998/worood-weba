import { CartItem } from "@/src/@types/checkout/CartItem.type";
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
    <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 h-fit">
      <h2
        className="text-lg font-semibold mb-3"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        ملخص الطلب
      </h2>

      {/* قائمة المنتجات */}
      <ul className="mb-3 divide-y">
        {items.map((item) => {
          const itemPrice = item.isCustom
            ? item.price ?? 0
            : item.total ?? item.price ?? 0;

          return (
            <li
              key={item.id}
              className="py-2 flex items-center justify-between text-sm"
            >
              <span className="text-gray-700">{item.title}</span>
              <span className="font-semibold">
                {APP_CONFIG.CURRENCY} {itemPrice.toFixed(2)}
              </span>
            </li>
          );
        })}
      </ul>

      {/* تفاصيل السعر */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">الإجمالي الفرعي</span>
          <span>
            {APP_CONFIG.CURRENCY} {totals.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            ضريبة القيمة المضافة {(APP_CONFIG.VAT_RATE * 100).toFixed(0)}%
          </span>
          <span>
            {APP_CONFIG.CURRENCY} {totals.vat.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between font-bold border-t pt-2">
          <span>المجموع</span>
          <span className="text-lg" style={{ color: COLORS.PRIMARY }}>
            {APP_CONFIG.CURRENCY} {totals.grand.toFixed(2)}
          </span>
        </div>
      </div>

      {/* زر تأكيد الطلب */}
      <button
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className={`mt-4 w-full rounded-md py-2 font-medium transition-colors ${
          isSubmitting
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-[#5A5E4D] text-white hover:bg-[#4A4E3D]"
        }`}
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            جاري المعالجة...
          </span>
        ) : (
          "تأكيد الطلب"
        )}
      </button>
    </aside>
  );
}
