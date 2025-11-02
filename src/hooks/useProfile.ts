import { useState } from "react";
import { useNotification } from "@/src/providers/notification-provider";
import { UserData } from "@/src/@types/profile/UserData.type";
import isValidEmail from "@/src/validations/isValidEmail";
import isValidSaudiPhone from "@/src/validations/isValidSaudiPhone";
import { normalizeSaudiPhone } from "@/src/validations/isValidSaudiPhone";

export function useProfile(initialData: UserData) {
  const [userData, setUserData] = useState<UserData>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleEdit = () => {
    setEditData(userData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    // Validate email
    if (!isValidEmail(editData.email)) {
      showNotification("يرجى إدخال بريد إلكتروني صحيح", "error");
      return;
    }

    // Validate phone using Saudi phone validation
    if (!isValidSaudiPhone(editData.phone)) {
      showNotification("يرجى إدخال رقم هاتف سعودي صحيح", "error");
      return;
    }

    // Validate name
    if (!editData.name.trim()) {
      showNotification("يرجى إدخال الاسم", "error");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Normalize phone number before saving
      const normalizedData = {
        ...editData,
        phone: normalizeSaudiPhone(editData.phone),
      };

      setUserData(normalizedData);
      setIsEditing(false);
      showNotification("تم حفظ البيانات بنجاح!", "success");
    } catch (error) {
      showNotification("حدث خطأ أثناء حفظ البيانات", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification("حجم الصورة يجب أن يكون أقل من 5 ميجابايت", "error");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        showNotification("يرجى اختيار صورة صحيحة", "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData((prev) => ({
          ...prev,
          profileImage: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return {
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
  };
}
