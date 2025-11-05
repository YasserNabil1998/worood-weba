"use client";

import profileData from "./profile-data.json";
import { UserData } from "@/src/@types/profile/UserData.type";
import { useProfile } from "@/src/hooks/useProfile";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfileDetailsForm from "@/src/components/profile/ProfileDetailsForm";
import ProfileQuickActions from "@/src/components/profile/ProfileQuickActions";

const initialUserData: UserData = profileData.userData;

export default function ProfilePage() {
  const {
    userData,
    isEditing,
    editData,
    isLoading,
    handleEdit,
    handleCancel,
    handleSave,
    handleInputChange,
    handleImageUpload,
    isValidEmail,
    isValidSaudiPhone,
  } = useProfile(initialUserData);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <ProfileHeader
            userData={userData}
            editData={editData}
            isEditing={isEditing}
            isLoading={isLoading}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onSave={handleSave}
            onImageUpload={handleImageUpload}
          />

          <ProfileDetailsForm
            userData={userData}
            editData={editData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            isValidEmail={isValidEmail}
            isValidPhone={isValidSaudiPhone}
          />

          <ProfileQuickActions />
        </div>
      </div>
    </div>
  );
}
