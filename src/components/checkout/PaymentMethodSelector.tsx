import { CreditCard, Smartphone, DollarSign } from "lucide-react";
import { PaymentMethod, PaymentMethodOption } from "@/src/@types/checkout/CheckoutForm.type";
import { PAYMENT_METHODS, PAYMENT_METHOD_LABELS } from "@/src/constants";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const paymentMethodOptions: PaymentMethodOption[] = [
  {
    key: PAYMENT_METHODS.MADA,
    label: PAYMENT_METHOD_LABELS[PAYMENT_METHODS.MADA],
    icon: "💳",
  },
  {
    key: PAYMENT_METHODS.VISA,
    label: PAYMENT_METHOD_LABELS[PAYMENT_METHODS.VISA],
    icon: "💳",
  },
  {
    key: PAYMENT_METHODS.APPLE_PAY,
    label: PAYMENT_METHOD_LABELS[PAYMENT_METHODS.APPLE_PAY],
    icon: "🍎",
  },
  {
    key: PAYMENT_METHODS.COD,
    label: PAYMENT_METHOD_LABELS[PAYMENT_METHODS.COD],
    icon: "💵",
  },
];

const getPaymentIcon = (method: PaymentMethod) => {
  switch (method) {
    case PAYMENT_METHODS.MADA:
    case PAYMENT_METHODS.VISA:
      return <CreditCard size={22} className="text-gray-700" />;
    case PAYMENT_METHODS.APPLE_PAY:
      return <Smartphone size={22} className="text-gray-700" />;
    case PAYMENT_METHODS.COD:
      return <DollarSign size={22} className="text-gray-700" />;
    default:
      return <CreditCard size={22} className="text-gray-700" />;
  }
};

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <h2
        className="text-lg font-semibold mb-5 text-gray-800"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        طريقة الدفع
      </h2>

      <div className="space-y-3">
        {paymentMethodOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onMethodChange(option.key)}
            className={`w-full flex items-center justify-between rounded-lg border px-4 py-3.5 text-right transition-all duration-200 ${
              selectedMethod === option.key
                ? "border-[#5A5E4D] bg-[#5A5E4D]/10 shadow-sm"
                : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm"
            }`}
            aria-pressed={selectedMethod === option.key}
          >
            <span className="flex items-center gap-3">
              <span
                className={`transition-transform duration-200 ${
                  selectedMethod === option.key ? "scale-110" : ""
                }`}
              >
                {getPaymentIcon(option.key)}
              </span>
              <span
                className={`text-sm font-medium transition-colors ${
                  selectedMethod === option.key ? "text-[#5A5E4D]" : "text-gray-800"
                }`}
              >
                {option.label}
              </span>
            </span>
            <span
              className={`h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                selectedMethod === option.key
                  ? "border-[#5A5E4D] ring-2 ring-[#5A5E4D]/30 bg-[#5A5E4D] scale-110"
                  : "border-gray-300 bg-white"
              }`}
            >
              {selectedMethod === option.key && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
