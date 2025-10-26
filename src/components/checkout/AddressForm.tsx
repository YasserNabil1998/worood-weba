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
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <h2
        className="text-lg font-semibold mb-3"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        عنوان التوصيل
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            className={`rounded-lg border px-3 py-2 w-full ${
              errors.address?.city
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-[#5A5E4D] focus:ring-[#5A5E4D]"
            }`}
            aria-invalid={!!errors.address?.city}
            aria-describedby={errors.address?.city ? "city-error" : undefined}
          />
          {errors.address?.city && (
            <p id="city-error" className="text-red-500 text-xs mt-1">
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
            className={`rounded-lg border px-3 py-2 w-full ${
              errors.address?.district
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-[#5A5E4D] focus:ring-[#5A5E4D]"
            }`}
            aria-invalid={!!errors.address?.district}
            aria-describedby={
              errors.address?.district ? "district-error" : undefined
            }
          />
          {errors.address?.district && (
            <p id="district-error" className="text-red-500 text-xs mt-1">
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
            className={`rounded-lg border px-3 py-2 w-full ${
              errors.address?.street
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-[#5A5E4D] focus:ring-[#5A5E4D]"
            }`}
            aria-invalid={!!errors.address?.street}
            aria-describedby={
              errors.address?.street ? "street-error" : undefined
            }
          />
          {errors.address?.street && (
            <p id="street-error" className="text-red-500 text-xs mt-1">
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
            className={`rounded-lg border px-3 py-2 w-full ${
              errors.address?.landmark
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-[#5A5E4D] focus:ring-[#5A5E4D]"
            }`}
            aria-invalid={!!errors.address?.landmark}
            aria-describedby={
              errors.address?.landmark ? "landmark-error" : undefined
            }
          />
          {errors.address?.landmark && (
            <p id="landmark-error" className="text-red-500 text-xs mt-1">
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
            placeholder="رقم الجوال *"
            value={address.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`rounded-lg border px-3 py-2 w-full ${
              errors.address?.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-[#5A5E4D] focus:ring-[#5A5E4D]"
            }`}
            aria-invalid={!!errors.address?.phone}
            aria-describedby={errors.address?.phone ? "phone-error" : undefined}
          />
          {errors.address?.phone && (
            <p id="phone-error" className="text-red-500 text-xs mt-1">
              {errors.address.phone}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
