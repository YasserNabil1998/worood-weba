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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-[#5A5E4D] mb-6" style={fontStyle}>
        تفاصيل الملف الشخصي
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-base font-bold text-[#5A5E4D] mb-2" style={fontStyle}>
            الاسم الكامل
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editData.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A5E4D] text-lg"
              style={fontStyle}
              placeholder="أدخل الاسم الكامل"
            />
          ) : (
            <p className="text-gray-900 py-3 text-base font-medium" style={fontStyle}>
              {userData.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-base font-bold text-[#5A5E4D] mb-2" style={fontStyle}>
            البريد الإلكتروني
          </label>
          {isEditing ? (
            <input
              type="email"
              value={editData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-lg ${
                editData.email && !isValidEmail(editData.email)
                  ? "border-red-500 bg-red-50 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#5A5E4D]"
              }`}
              style={fontStyle}
              placeholder="example@email.com"
            />
          ) : (
            <p className="text-gray-900 py-3 text-base font-medium" style={fontStyle}>
              {userData.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-base font-bold text-[#5A5E4D] mb-2" style={fontStyle}>
            رقم الهاتف
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={editData.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-lg ${
                editData.phone && !isValidPhone(editData.phone)
                  ? "border-red-500 bg-red-50 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#5A5E4D]"
              }`}
              style={fontStyle}
              placeholder="05xxxxxxxx"
              inputMode="tel"
              dir="ltr"
            />
          ) : (
            <p className="text-gray-900 py-3 text-base font-medium" style={fontStyle}>
              {userData.phone}
            </p>
          )}
        </div>

        {/* Gender Field */}
        <div className="border border-gray-200 rounded-lg p-4">
          <label className="block text-base font-bold text-[#5A5E4D] mb-2" style={fontStyle}>
            الجنس
          </label>
          {isEditing ? (
            <select
              value={editData.gender}
              onChange={(e) => onInputChange("gender", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A5E4D] text-lg"
              style={fontStyle}
            >
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
          ) : (
            <p className="text-gray-900 py-3 text-base font-medium" style={fontStyle}>
              {userData.gender}
            </p>
          )}
        </div>

        {/* Address Field */}
        <div className="border border-gray-200 rounded-lg p-4 md:col-span-2">
          <label className="block text-base font-bold text-[#5A5E4D] mb-2" style={fontStyle}>
            العنوان
          </label>
          {isEditing ? (
            <textarea
              value={editData.address}
              onChange={(e) => onInputChange("address", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A5E4D] resize-none text-lg"
              style={fontStyle}
              placeholder="أدخل العنوان الكامل"
            />
          ) : (
            <p className="text-gray-900 py-3 text-base font-medium" style={fontStyle}>
              {userData.address}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
