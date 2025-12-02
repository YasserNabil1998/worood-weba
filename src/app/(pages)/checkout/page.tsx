"use client";

import { useCheckout } from "@/src/hooks/useCheckout";
import AddressForm from "@/src/components/checkout/AddressForm";
import PaymentMethodSelector from "@/src/components/checkout/PaymentMethodSelector";
import OrderSummary from "@/src/components/checkout/OrderSummary";
import { fontStyle } from "@/src/lib/styles";

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
        <div className="text-center animate-fadeIn">
          <div className="w-16 h-16 border-4 border-[#5A5E4D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir="rtl">
      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-10 animate-fadeIn"
            style={{
              ...fontStyle,
              background: "linear-gradient(135deg, #5A5E4D 0%, #4A4E3D 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            متابعة الدفع
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-fadeIn">
            {/* ملخص الطلب */}
            <OrderSummary
              items={items}
              totals={totals}
              onPlaceOrder={placeOrder}
              isSubmitting={isSubmitting}
            />

            {/* Form */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* عنوان التوصيل */}
              <AddressForm
                address={formData.address}
                errors={errors}
                onAddressChange={updateAddress}
              />

              {/* طريقة الدفع */}
              <PaymentMethodSelector
                selectedMethod={formData.paymentMethod}
                onMethodChange={(method) => updateFormData({ paymentMethod: method })}
              />

              {/* ملاحظات إضافية */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800" style={fontStyle}>
                  ملاحظات إضافية
                </h2>
                <textarea
                  placeholder="ملاحظات إضافية (اختياري)"
                  value={formData.notes}
                  onChange={(e) => updateFormData({ notes: e.target.value })}
                  className="rounded-lg border border-gray-200 px-4 py-3 w-full resize-none transition-all duration-200 focus:border-[#5A5E4D] focus:ring-2 focus:ring-[#5A5E4D]/20 outline-none"
                  rows={4}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
