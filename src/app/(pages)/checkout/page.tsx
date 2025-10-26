"use client";

import { useCheckout } from "@/src/hooks/useCheckout";
import AddressForm from "@/src/components/checkout/AddressForm";
import PaymentMethodSelector from "@/src/components/checkout/PaymentMethodSelector";
import OrderSummary from "@/src/components/checkout/OrderSummary";

export default function CheckoutPage() {
  const {
    items,
    formData,
    errors,
    isLoading,
    isSubmitting,
    totals,
    updateAddress,
    updateFormData,
    placeOrder,
  } = useCheckout();

  // عرض loading أثناء التحميل
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-2xl mb-2">⏳</div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir="rtl">
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            متابعة الدفع
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* عنوان التوصيل */}
              <AddressForm
                address={formData.address}
                errors={errors}
                onAddressChange={updateAddress}
              />

              {/* طريقة الدفع */}
              <PaymentMethodSelector
                selectedMethod={formData.paymentMethod}
                onMethodChange={(method) =>
                  updateFormData({ paymentMethod: method })
                }
              />

              {/* ملاحظات إضافية */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <h2
                  className="text-lg font-semibold mb-3"
                  style={{ fontFamily: "var(--font-almarai)" }}
                >
                  ملاحظات إضافية
                </h2>
                <textarea
                  placeholder="ملاحظات إضافية (اختياري)"
                  value={formData.notes}
                  onChange={(e) => updateFormData({ notes: e.target.value })}
                  className="rounded-lg border border-gray-200 px-3 py-2 w-full resize-none"
                  rows={3}
                />
              </section>
            </div>

            {/* ملخص الطلب */}
            <OrderSummary
              items={items}
              totals={totals}
              onPlaceOrder={placeOrder}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
