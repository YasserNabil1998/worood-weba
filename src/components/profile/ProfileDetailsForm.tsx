"use client";

import { UserData } from "@/types/profile";

interface ProfileDetailsFormProps {
  userData: UserData;
  editData: UserData;
  isEditing: boolean;
  onInputChange: (field: keyof UserData, value: string) => void;
  isValidEmail: (email: string) => boolean;
  isValidPhone: (phone: string) => boolean;
}

export default function ProfileDetailsForm({
  userData,
  editData,
  isEditing,
  onInputChange,
  isValidEmail,
  isValidPhone,
}: ProfileDetailsFormProps) {
  const fontStyle = { fontFamily: "var(--font-almarai)" };

  if (!isEditing) {
    return null;
  }

  return (
    <div className="bg-white rounded-[25px] p-6 mb-4" style={fontStyle}>
      <h2 className="text-[20px] font-bold text-black mb-4" style={fontStyle}>
        تفاصيل الملف الشخصي
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Field */}
        <div>
          <label className="block text-[16px] font-bold text-black mb-2" style={fontStyle}>
            الاسم الكامل
          </label>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            className="w-full px-4 py-4 border border-[#817f7f] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#5f664f] text-[16px] text-[#716d6d]"
            style={fontStyle}
            placeholder="أدخل الاسم الكامل"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-[16px] font-bold text-black mb-2" style={fontStyle}>
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={editData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className={`w-full px-4 py-4 border rounded-[10px] focus:outline-none focus:ring-2 text-[16px] ${
              editData.email && !isValidEmail(editData.email)
                ? "border-red-500 bg-red-50 focus:ring-red-500"
                : "border-[#817f7f] focus:ring-[#5f664f]"
            }`}
            style={fontStyle}
            placeholder="example@email.com"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-[16px] font-bold text-black mb-2" style={fontStyle}>
            رقم الهاتف
          </label>
          <input
            type="tel"
            value={editData.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            className={`w-full px-4 py-4 border rounded-[10px] focus:outline-none focus:ring-2 text-[16px] ${
              editData.phone && !isValidPhone(editData.phone)
                ? "border-red-500 bg-red-50 focus:ring-red-500"
                : "border-[#817f7f] focus:ring-[#5f664f]"
            }`}
            style={fontStyle}
            placeholder="05xxxxxxxx"
            inputMode="tel"
            dir="ltr"
          />
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-[16px] font-bold text-black mb-2" style={fontStyle}>
            عنوان المنزل
          </label>
          <input
            type="text"
            value={editData.address || ""}
            onChange={(e) => onInputChange("address", e.target.value)}
            className="w-full px-4 py-4 border border-[#817f7f] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#5f664f] text-[16px] text-[#727272]"
            style={fontStyle}
            placeholder="المدينة, الحي, الشارع (مثال: الرياض, حي النخيل, شارع الملك فهد)"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-[16px] font-bold text-black mb-2" style={fontStyle}>
            كلمة المرور
          </label>
          <input
            type="password"
            value={editData.password || ""}
            onChange={(e) => onInputChange("password", e.target.value)}
            className="w-full px-4 py-4 border border-[#817f7f] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#5f664f] text-[16px] text-[#727272]"
            style={fontStyle}
            placeholder="أدخل كلمة المرور"
          />
        </div>

        {/* Address 2 Field */}
        <div>
          <label className="block text-[16px] font-bold text-black mb-2" style={fontStyle}>
            عنوان آخر
          </label>
          <input
            type="text"
            value={editData.address2 || ""}
            onChange={(e) => onInputChange("address2", e.target.value)}
            className="w-full px-4 py-4 border border-[#817f7f] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#5f664f] text-[16px] text-[#727272]"
            style={fontStyle}
            placeholder="المدينة, الحي, الشارع (مثال: جدة, حي الزهراء, شارع التحلية)"
          />
        </div>
      </div>
    </div>
  );
}
