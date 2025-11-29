"use client";

import { UserData } from "@/src/@types/profile/UserData.type";

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
    <div className="bg-white rounded-[25px] p-8 mb-6" style={fontStyle}>
      <h2 className="text-[25px] font-bold text-black mb-6" style={fontStyle}>
        تفاصيل الملف الشخصي
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label className="block text-[25px] font-bold text-black mb-2" style={fontStyle}>
            الاسم الكامل
          </label>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            className="w-full px-4 py-4 border border-[#817f7f] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#5f664f] text-[25px] text-[#716d6d]"
            style={fontStyle}
            placeholder="أدخل الاسم الكامل"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-[25px] font-bold text-black mb-2" style={fontStyle}>
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={editData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className={`w-full px-4 py-4 border rounded-[10px] focus:outline-none focus:ring-2 text-[25px] ${
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
          <label className="block text-[25px] font-bold text-black mb-2" style={fontStyle}>
            رقم الهاتف
          </label>
          <input
            type="tel"
            value={editData.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            className={`w-full px-4 py-4 border rounded-[10px] focus:outline-none focus:ring-2 text-[25px] ${
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
          <label className="block text-[25px] font-bold text-black mb-2" style={fontStyle}>
            عنوان المنزل
          </label>
          <input
            type="text"
            value={editData.address || ""}
            onChange={(e) => onInputChange("address", e.target.value)}
            className="w-full px-4 py-4 border border-[#817f7f] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#5f664f] text-[20px] text-[#727272]"
            style={fontStyle}
            placeholder="أدخل العنوان"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-[25px] font-bold text-black mb-2" style={fontStyle}>
            كلمة المرور
          </label>
          <input
            type="password"
            value={editData.password || ""}
            onChange={(e) => onInputChange("password", e.target.value)}
            className="w-full px-4 py-4 border border-[#817f7f] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#5f664f] text-[20px] text-[#727272]"
            style={fontStyle}
            placeholder="أدخل كلمة المرور"
          />
        </div>

        {/* Address 2 Field */}
        <div>
          <label className="block text-[25px] font-bold text-black mb-2" style={fontStyle}>
            عنوان آخر
          </label>
          <input
            type="text"
            value={editData.address2 || ""}
            onChange={(e) => onInputChange("address2", e.target.value)}
            className="w-full px-4 py-4 border border-[#817f7f] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#5f664f] text-[20px] text-[#727272]"
            style={fontStyle}
            placeholder="أدخل العنوان الآخر"
          />
        </div>
      </div>
    </div>
  );
}
