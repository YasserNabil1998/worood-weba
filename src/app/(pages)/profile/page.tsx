"use client";

import { useEffect, useMemo } from "react";
import profileData from "./profile-data.json";
import type { UserData } from "@/types/profile";
import { useProfile } from "@/hooks/useProfile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDetailsForm from "@/components/profile/ProfileDetailsForm";
import OccasionsSection from "@/components/profile/OccasionsSection";
import SupportSection from "@/components/profile/SupportSection";
import OrdersSection from "@/components/profile/OrdersSection";
import FavoritesSection from "@/components/profile/FavoritesSection";
import { useProfileStore } from "@/stores";

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

  // Use store data for occasions and support
  const userOccasions = useProfileStore((state) => state.userOccasions);
  const supportData = useProfileStore((state) => state.supportData);
  const fetchUserOccasions = useProfileStore((state) => state.fetchUserOccasions);
  const fetchSupportData = useProfileStore((state) => state.fetchSupportData);
  const fetchOccasionTypes = useProfileStore((state) => state.fetchOccasionTypes);

  useEffect(() => {
    fetchUserOccasions();
    fetchSupportData();
    fetchOccasionTypes();
  }, [fetchUserOccasions, fetchSupportData, fetchOccasionTypes]);

  // Convert store occasions to component format
  // Use useMemo to prevent creating new array on every render
  const occasions = useMemo(() => {
    return userOccasions.map(occ => ({
      id: occ.id,
      name: occ.name,
      date: occ.date,
      type: occ.type || "مناسبة",
      icon: "🎉",
      reminder: occ.reminder,
    }));
  }, [userOccasions]);

  const supportContent = supportData ? {
    title: supportData.title,
    faqs: supportData.faqs.map(faq => ({
      question: faq.question,
      answer: Array.isArray(faq.answer) ? faq.answer : [faq.answer],
    })),
  } : { title: "الدعم والمساعدة", faqs: [] };

  const handleAddOccasion = async () => {
    // TODO: Open a modal to add occasion
    // This will be implemented when the modal component is ready
  };

  const handleEditOccasion = async (id: string) => {
    // TODO: Open a modal to edit occasion
    // This will be implemented when the modal component is ready
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
