import Image from "next/image";
import { Edit, Save } from "lucide-react";
import { UserData } from "@/src/@types/profile/UserData.type";

interface ProfileHeaderProps {
  userData: UserData;
  editData: UserData;
  isEditing: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileHeader({
  userData,
  editData,
  isEditing,
  isLoading,
  onEdit,
  onCancel,
  onSave,
  onImageUpload,
}: ProfileHeaderProps) {
  const displayData = isEditing ? editData : userData;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#5A5E4D]">
            {displayData.profileImage ? (
              <Image
                src={displayData.profileImage}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-[#5A5E4D] flex items-center justify-center">
                <span
                  className="text-white text-4xl font-bold"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  {displayData.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-[#5A5E4D] text-white p-2 rounded-full cursor-pointer hover:bg-[#4A4E3D] transition-colors">
              <Edit className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-right">
          <h1
            className="text-3xl font-bold text-[#5A5E4D] mb-2"
            style={{
              fontFamily: "var(--font-almarai)",
            }}
          >
            {userData.name}
          </h1>
          <p
            className="text-gray-600 mb-1"
            style={{
              fontFamily: "var(--font-almarai)",
            }}
          >
            {userData.email}
          </p>
          <p
            className="text-gray-600 mb-1"
            style={{
              fontFamily: "var(--font-almarai)",
            }}
          >
            {userData.phone}
          </p>
          <p
            className="text-gray-600 mb-1"
            style={{
              fontFamily: "var(--font-almarai)",
            }}
          >
            {userData.gender}
          </p>
          <p
            className="text-gray-600 mb-4 text-sm"
            style={{
              fontFamily: "var(--font-almarai)",
            }}
          >
            {userData.address}
          </p>
        </div>

        {/* Edit Button */}
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={onEdit}
              className="bg-gradient-to-r from-[#5A5E4D] to-[#4A4E3D] text-white px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 font-semibold"
              style={{
                fontFamily: "var(--font-almarai)",
              }}
            >
              <Edit className="w-5 h-5" />
              تعديل البيانات
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                style={{
                  fontFamily: "var(--font-almarai)",
                }}
              >
                إلغاء
              </button>
              <button
                onClick={onSave}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-semibold"
                style={{
                  fontFamily: "var(--font-almarai)",
                }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-5 h-5" />
                )}
                حفظ التغييرات
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
