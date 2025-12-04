"use client";

import profileData from "./profile-data.json";
import { UserData } from "@/src/@types/profile/UserData.type";
import { useProfile } from "@/src/hooks/useProfile";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfileDetailsForm from "@/src/components/profile/ProfileDetailsForm";
import OccasionsSection from "@/src/components/profile/OccasionsSection";
import SupportSection from "@/src/components/profile/SupportSection";
import OrdersSection from "@/src/components/profile/OrdersSection";
import FavoritesSection from "@/src/components/profile/FavoritesSection";
import { logDebug } from "@/src/lib/logger";

const initialUserData: UserData = profileData.userData;
const occasions = profileData.occasions || [];
const supportContent = profileData.supportContent || { title: "الدعم والمساعدة", faqs: [] };

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

  const handleAddOccasion = () => {
    // Functionality will be implemented when occasion management feature is added
    logDebug("Add occasion");
  };

  const handleEditOccasion = (id: string) => {
    // Functionality will be implemented when occasion management feature is added
    logDebug("Edit occasion", { occasionId: id });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <main>
        {/* Page Title Section */}
        <section className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
            <h1 className="text-[32px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
              الملف الشخصي
            </h1>
            <p className="text-[16px] font-normal leading-[20px] text-[#5A5E4D] tracking-[0px]">
              إدارة معلوماتك الشخصية والطلبات والمناسبات المفضلة
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-[1248px] mx-auto">
              {/* Profile Header */}
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

              {/* Profile Details Form - Only shows when editing */}
              {isEditing && (
                <ProfileDetailsForm
                  userData={userData}
                  editData={editData}
                  isEditing={isEditing}
                  onInputChange={handleInputChange}
                  isValidEmail={isValidEmail}
                  isValidPhone={isValidSaudiPhone}
                />
              )}

              {/* Orders Section */}
              {!isEditing && <OrdersSection />}

              {/* Favorites Section */}
              {!isEditing && <FavoritesSection />}

              {/* Occasions Section */}
              {!isEditing && (
                <OccasionsSection
                  occasions={occasions}
                  onAddOccasion={handleAddOccasion}
                  onEditOccasion={handleEditOccasion}
                />
              )}

              {/* Support Section */}
              {!isEditing && (
                <SupportSection title={supportContent.title} faqs={supportContent.faqs} />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
