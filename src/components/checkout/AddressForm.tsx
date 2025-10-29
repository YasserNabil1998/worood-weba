import {
  Address,
  CheckoutFormErrors,
} from "@/src/@types/checkout/CheckoutForm.type";

interface AddressFormProps {
  address: Address;
  errors: CheckoutFormErrors;
  onAddressChange: (addressUpdates: Partial<Address>) => void;
}

export default function AddressForm({
  address,
  errors,
  onAddressChange,
}: AddressFormProps) {
  const handleInputChange = (field: keyof Address, value: string) => {
    onAddressChange({ [field]: value });
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <h2
        className="text-lg font-semibold mb-6 text-gray-800"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        عنوان التوصيل
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {/* المدينة */}
        <div>
          <label htmlFor="city" className="sr-only">
            المدينة
          </label>
          <input
            id="city"
            type="text"
            placeholder="المدينة *"
            value={address.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className={`rounded-lg border px-4 py-3 w-full transition-all duration-200 outline-none ${
              errors.address?.city
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50"
                : "border-gray-200 focus:border-[#5A5E4D] focus:ring-2 focus:ring-[#5A5E4D]/20 bg-white hover:border-gray-300"
            }`}
            aria-invalid={!!errors.address?.city}
            aria-describedby={errors.address?.city ? "city-error" : undefined}
          />
          {errors.address?.city && (
            <p
              id="city-error"
              className="text-red-500 text-xs mt-1.5 font-medium animate-fadeIn"
            >
              {errors.address.city}
            </p>
          )}
        </div>

        {/* الحي */}
        <div>
          <label htmlFor="district" className="sr-only">
            الحي
          </label>
          <input
            id="district"
            type="text"
            placeholder="الحي *"
            value={address.district}
            onChange={(e) => handleInputChange("district", e.target.value)}
            className={`rounded-lg border px-4 py-3 w-full transition-all duration-200 outline-none ${
              errors.address?.district
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50"
                : "border-gray-200 focus:border-[#5A5E4D] focus:ring-2 focus:ring-[#5A5E4D]/20 bg-white hover:border-gray-300"
            }`}
            aria-invalid={!!errors.address?.district}
            aria-describedby={
              errors.address?.district ? "district-error" : undefined
            }
          />
          {errors.address?.district && (
            <p
              id="district-error"
              className="text-red-500 text-xs mt-1.5 font-medium animate-fadeIn"
            >
              {errors.address.district}
            </p>
          )}
        </div>

        {/* الشارع */}
        <div>
          <label htmlFor="street" className="sr-only">
            الشارع
          </label>
          <input
            id="street"
            type="text"
            placeholder="الشارع *"
            value={address.street}
            onChange={(e) => handleInputChange("street", e.target.value)}
            className={`rounded-lg border px-4 py-3 w-full transition-all duration-200 outline-none ${
              errors.address?.street
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50"
                : "border-gray-200 focus:border-[#5A5E4D] focus:ring-2 focus:ring-[#5A5E4D]/20 bg-white hover:border-gray-300"
            }`}
            aria-invalid={!!errors.address?.street}
            aria-describedby={
              errors.address?.street ? "street-error" : undefined
            }
          />
          {errors.address?.street && (
            <p
              id="street-error"
              className="text-red-500 text-xs mt-1.5 font-medium animate-fadeIn"
            >
              {errors.address.street}
            </p>
          )}
        </div>

        {/* المعلم */}
        <div>
          <label htmlFor="landmark" className="sr-only">
            أقرب معلم
          </label>
          <input
            id="landmark"
            type="text"
            placeholder="أقرب معلم (اختياري)"
            value={address.landmark}
            onChange={(e) => handleInputChange("landmark", e.target.value)}
            className={`rounded-lg border px-4 py-3 w-full transition-all duration-200 outline-none ${
              errors.address?.landmark
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50"
                : "border-gray-200 focus:border-[#5A5E4D] focus:ring-2 focus:ring-[#5A5E4D]/20 bg-white hover:border-gray-300"
            }`}
            aria-invalid={!!errors.address?.landmark}
            aria-describedby={
              errors.address?.landmark ? "landmark-error" : undefined
            }
          />
          {errors.address?.landmark && (
            <p
              id="landmark-error"
              className="text-red-500 text-xs mt-1.5 font-medium animate-fadeIn"
            >
              {errors.address.landmark}
            </p>
          )}
        </div>

        {/* رقم الجوال */}
        <div className="sm:col-span-2">
          <label htmlFor="phone" className="sr-only">
            رقم الجوال
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="* رقم الجوال "
            value={address.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            dir="rtl"
            className={`rounded-lg border px-4 py-3 w-full transition-all duration-200 outline-none text-right ${
              errors.address?.phone
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50"
                : "border-gray-200 focus:border-[#5A5E4D] focus:ring-2 focus:ring-[#5A5E4D]/20 bg-white hover:border-gray-300"
            }`}
            aria-invalid={!!errors.address?.phone}
            aria-describedby={errors.address?.phone ? "phone-error" : undefined}
          />
          {errors.address?.phone && (
            <p
              id="phone-error"
              className="text-red-500 text-xs mt-1.5 font-medium animate-fadeIn"
            >
              {errors.address.phone}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
