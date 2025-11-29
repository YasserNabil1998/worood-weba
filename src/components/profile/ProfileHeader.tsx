"use client";

import Image from "next/image";
import { Edit } from "lucide-react";
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
  const fontStyle = { fontFamily: "var(--font-almarai)" };

  return (
    <div className="bg-white rounded-[25px] p-6 mb-4 relative" style={fontStyle}>
      <div className="flex items-center gap-4 mb-0">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#5f664f] flex items-center justify-center">
            {displayData.profileImage ? (
              <Image
                src={displayData.profileImage}
                alt="Profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            ) : (
              <span className="text-white text-[20px] font-bold" style={fontStyle}>
                {userData.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* User Name */}
        <div className="flex-1">
          <h1 className="text-[20px] font-bold text-black" style={fontStyle}>
            {userData.name}
          </h1>
        </div>

        {/* Edit Data Button */}
        {!isEditing && (
            <button
              onClick={onEdit}
              className="bg-[#5f664f] text-white px-5 py-3 rounded-[10px] flex items-center gap-2 hover:bg-[#4f5440] transition-colors cursor-pointer"
              style={fontStyle}
            >
              <Edit className="w-[18px] h-[18px]" />
              <span className="text-[16px]">تعديل البيانات</span>
            </button>
        )}

        {/* Save/Cancel Buttons when editing */}
        {isEditing && (
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-3 rounded-[10px] border border-gray-300 transition-colors cursor-pointer hover:border-gray-400"
              style={fontStyle}
            >
              إلغاء
            </button>
            <button
              onClick={onSave}
              disabled={isLoading}
              className="bg-[#5f664f] text-white px-6 py-3 rounded-[10px] hover:bg-[#4f5440] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
              style={fontStyle}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "حفظ"
              )}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
