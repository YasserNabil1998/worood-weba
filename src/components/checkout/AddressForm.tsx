import { Address, CheckoutFormErrors } from "@/src/@types/checkout/CheckoutForm.type";

interface AddressFormProps {
  address: Address;
  errors: CheckoutFormErrors;
  onAddressChange: (addressUpdates: Partial<Address>) => void;
}

export default function AddressForm({ address, errors, onAddressChange }: AddressFormProps) {
  const handleInputChange = (field: keyof Address, value: string) => {
    onAddressChange({ [field]: value });
  };

  return (
    <section className="bg-white rounded-[10px] border border-gray-200 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6">
      <h2
        className="text-[20px] font-bold mb-6 text-black text-right"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        معلومات الشحن والمستلم
      </h2>

      <div className="space-y-5">
        {/* اسم المستلم */}
        <div>
          <label htmlFor="recipientName" className="block text-[20px] font-normal text-black mb-2 text-right" style={{ fontFamily: "var(--font-almarai)" }}>
            اسم المستلم
          </label>
          <input
            id="recipientName"
            type="text"
            placeholder="أحمد  علي"
            value={address.recipientName || ""}
            onChange={(e) => handleInputChange("recipientName", e.target.value)}
            className={`rounded-[10px] border h-[65px] px-4 py-3 w-full transition-all duration-200 outline-none text-right text-[20px] ${
              errors.address?.recipientName
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50"
                : "border-[#e1dada] focus:border-[#5A5E4D] focus:ring-2 focus:ring-[#5A5E4D]/20 bg-white hover:border-gray-300"
            }`}
            style={{ fontFamily: "var(--font-almarai)", color: (address.recipientName?.trim() && !errors.address?.recipientName) ? "black" : "#9ea2a9" }}
            aria-invalid={!!errors.address?.recipientName}
            aria-describedby={errors.address?.recipientName ? "recipientName-error" : undefined}
          />
          {errors.address?.recipientName && (
            <p id="recipientName-error" className="text-red-500 text-xs mt-1.5 font-medium animate-fadeIn">
              {errors.address.recipientName}
            </p>
          )}
        </div>

        {/* رقم الهاتف */}
        <div>
          <label htmlFor="phone" className="block text-[20px] font-normal text-black mb-2 text-right" style={{ fontFamily: "var(--font-almarai)" }}>
            رقم الهاتف
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="05954705256"
            value={address.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            dir="rtl"
            className={`rounded-[10px] border h-[65px] px-4 py-3 w-full transition-all duration-200 outline-none text-right text-[20px] ${
              errors.address?.phone
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50"
                : "border-[#e1dada] focus:border-[#5A5E4D] focus:ring-2 focus:ring-[#5A5E4D]/20 bg-white hover:border-gray-300"
            }`}
            style={{ fontFamily: "var(--font-almarai)", color: (address.phone?.trim() && !errors.address?.phone) ? "black" : "#9ea2a9" }}
            aria-invalid={!!errors.address?.phone}
            aria-describedby={errors.address?.phone ? "phone-error" : undefined}
          />
          {errors.address?.phone && (
            <p id="phone-error" className="text-red-500 text-xs mt-1.5 font-medium animate-fadeIn">
              {errors.address.phone}
            </p>
          )}
        </div>

        {/* عنوان التوصيل */}
        <div>
          <label htmlFor="address" className="block text-[20px] font-normal text-black mb-2 text-right" style={{ fontFamily: "var(--font-almarai)" }}>
            عنوان التوصيل
          </label>
          <input
            id="address"
            type="text"
            placeholder="مكة ,  شارع الملك سعود"
            value={address.street || ""}
            onChange={(e) => handleInputChange("street", e.target.value)}
            className={`rounded-[10px] border h-[65px] px-4 py-3 w-full transition-all duration-200 outline-none text-right text-[20px] ${
              errors.address?.street
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/50"
                : "border-[#e1dada] focus:border-[#5A5E4D] focus:ring-2 focus:ring-[#5A5E4D]/20 bg-white hover:border-gray-300"
            }`}
            style={{ fontFamily: "var(--font-almarai)", color: (address.street?.trim() && !errors.address?.street) ? "black" : "#9ea2a9" }}
            aria-invalid={!!errors.address?.street}
            aria-describedby={errors.address?.street ? "address-error" : undefined}
          />
          {errors.address?.street && (
            <p id="address-error" className="text-red-500 text-xs mt-1.5 font-medium animate-fadeIn">
              {errors.address.street}
            </p>
          )}
        </div>

        {/* اختيار العنوان */}
        <div>
          <label htmlFor="addressSelect" className="block text-[20px] font-normal text-black mb-2 text-right" style={{ fontFamily: "var(--font-almarai)" }}>
            إختيار العنوان
          </label>
          <div className="relative">
            <div className="rounded-[10px] border border-[#b9b9b9] overflow-hidden">
              <div className="h-[148px] bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-almarai)" }}>
                  خريطة العنوان
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
