import { CreditCard, Smartphone, DollarSign } from "lucide-react";
import {
  PaymentMethod,
  PaymentMethodOption,
} from "@/src/@types/checkout/CheckoutForm.type";
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
      return <CreditCard size={20} className="text-gray-700" />;
    case PAYMENT_METHODS.APPLE_PAY:
      return <Smartphone size={20} className="text-gray-700" />;
    case PAYMENT_METHODS.COD:
      return <DollarSign size={20} className="text-gray-700" />;
    default:
      return <CreditCard size={20} className="text-gray-700" />;
  }
};

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <h2
        className="text-lg font-semibold mb-3"
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
            className={`w-full flex items-center justify-between rounded-md border px-3 py-2 text-right transition-colors ${
              selectedMethod === option.key
                ? "border-[#5A5E4D] bg-[#5A5E4D]/5"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
            aria-pressed={selectedMethod === option.key}
          >
            <span className="flex items-center gap-3">
              {getPaymentIcon(option.key)}
              <span className="text-sm text-gray-800">{option.label}</span>
            </span>
            <span
              className={`h-4 w-4 rounded-full border transition-colors ${
                selectedMethod === option.key
                  ? "border-[#5A5E4D] ring-2 ring-[#5A5E4D]/30 bg-[#5A5E4D]"
                  : "border-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
