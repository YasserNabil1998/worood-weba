import { useState, useEffect, useMemo, useRef } from "react";
import { useNotification } from "@/providers/notification-provider";
import type { UserData } from "@/types/profile";
import type { UserProfile } from "@/stores/profileStore";
import isValidEmail from "@/validations/isValidEmail";
import isValidSaudiPhone from "@/validations/isValidSaudiPhone";
import { normalizeSaudiPhone } from "@/validations/isValidSaudiPhone";
import { useProfileStore } from "@/stores";

// Helper function to convert address string to object
const parseAddressString = (addressString: string): UserProfile["address"] => {
  // Default values for required fields
  const defaultAddress: UserProfile["address"] = {
    city: "",
    district: "",
    street: "",
  };

  if (!addressString || !addressString.trim()) {
    return defaultAddress;
  }

  // Parse format: "الرياض، حي النخيل، شارع الملك فهد" or "Riyadh, Al Nakheel, King Fahd Street"
  // Support both Arabic comma (،) and English comma (,)
  const parts = addressString
    .split(/[،,]/)
    .map((part) => part.trim())
    .filter((part) => part);

  if (parts.length === 0) return defaultAddress;

  // Try to identify parts (usually: city, district, street)
  if (parts.length >= 3) {
    return {
      city: parts[0] || "",
      district: parts[1] || "",
      street: parts.slice(2).join("، ") || "",
    };
  } else if (parts.length === 2) {
    return {
      city: parts[0] || "",
      district: parts[1] || "",
      street: "",
    };
  } else {
    return {
      city: "",
      district: "",
      street: parts[0] || "",
    };
  }
};

// Helper function to convert address object to string
const formatAddressString = (address: UserProfile["address"]): string => {
  if (!address) return "";

  const parts: string[] = [];
  // الحقول المطلوبة: city, district, street
  // الترتيب: city, district, street (متسق مع parseAddressString)
  if (address.city) parts.push(address.city);
  if (address.district) parts.push(address.district);
  if (address.street) parts.push(address.street);

  return parts.join("، ");
};

export function useProfile(initialData: UserData) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserData>(initialData);
  const { showNotification } = useNotification();

  const storeUserData = useProfileStore((state) => state.userData);
  const storeIsLoading = useProfileStore((state) => state.isLoading);
  const fetchUserData = useProfileStore((state) => state.fetchUserData);
  const updateUserData = useProfileStore((state) => state.updateUserData);

  // Use store data if available, otherwise use initial data
  // Merge store data with initial data to ensure all required fields are present
  // Use useMemo to prevent creating new object on every render
  const userData: UserData = useMemo(() => {
    return storeUserData
      ? {
          ...initialData, // Keep all initial fields (gender, joinDate, totalOrders, totalSpent, etc.)
          name: storeUserData.name,
          email: storeUserData.email,
          phone: storeUserData.phone || initialData.phone,
          profileImage: storeUserData.image || initialData.profileImage,
          password: storeUserData.password || initialData.password,
          address: storeUserData.address
            ? formatAddressString(storeUserData.address) || initialData.address
            : initialData.address,
          address2: storeUserData.address2 || initialData.address2,
        }
      : initialData;
  }, [storeUserData, initialData]);

  const isLoading = storeIsLoading;

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Update editData when userData changes
  // Use useRef to track previous value and compare deeply to avoid infinite loops
  const prevUserDataRef = useRef<string>("");

  useEffect(() => {
    const currentStr = JSON.stringify(userData);

    // Only update if the data actually changed
    if (prevUserDataRef.current !== currentStr) {
      prevUserDataRef.current = currentStr;
      setEditData(userData);
    }
  }, [userData]);

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

    try {
      // Normalize phone number before saving
      const normalizedData = {
        ...editData,
        phone: normalizeSaudiPhone(editData.phone),
      };

      // Update via store
      // Convert address from string to object format (required field)
      const parsedAddress = parseAddressString(normalizedData.address || "");

      const result = await updateUserData({
        name: normalizedData.name,
        email: normalizedData.email,
        phone: normalizedData.phone || undefined,
        image: normalizedData.profileImage || undefined,
        password: normalizedData.password || undefined,
        address: parsedAddress, // Required field
        address2: normalizedData.address2 || undefined,
      });

      if (result.success) {
        setIsEditing(false);
        showNotification("تم حفظ البيانات بنجاح!", "success");
      } else {
        showNotification(result.error || "حدث خطأ أثناء حفظ البيانات", "error");
      }
    } catch {
      showNotification("حدث خطأ أثناء حفظ البيانات", "error");
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
