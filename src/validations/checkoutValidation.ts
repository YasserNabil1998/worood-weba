import { VALIDATION_MESSAGES } from "@/src/constants";
import { Address, CheckoutFormErrors } from "@/src/@types/checkout/CheckoutForm.type";

export const validateAddress = (address: Address): Partial<Address> => {
  const errors: Partial<Address> = {};

  // التحقق من اسم المستلم
  if (!address.recipientName || !address.recipientName.trim()) {
    errors.recipientName = VALIDATION_MESSAGES.REQUIRED_FIELD;
  } else if (address.recipientName.trim().length < 2) {
    errors.recipientName = VALIDATION_MESSAGES.MIN_LENGTH(2);
  }

  // التحقق من رقم الهاتف
  if (!address.phone.trim()) {
    errors.phone = VALIDATION_MESSAGES.REQUIRED_FIELD;
  } else if (address.phone.trim().length < 9) {
    errors.phone = VALIDATION_MESSAGES.MIN_LENGTH(9);
  }

  // التحقق من عنوان التوصيل
  if (!address.street.trim()) {
    errors.street = VALIDATION_MESSAGES.REQUIRED_FIELD;
  } else if (address.street.trim().length < 5) {
    errors.street = VALIDATION_MESSAGES.MIN_LENGTH(5);
  }

  // الحقول الاختيارية (city, district, landmark) لم تعد مطلوبة في التصميم الجديد
  // لكن إذا كانت موجودة، نتحقق منها
  if (address.city && address.city.trim() && address.city.trim().length < 2) {
    errors.city = VALIDATION_MESSAGES.MIN_LENGTH(2);
  }

  if (address.district && address.district.trim() && address.district.trim().length < 2) {
    errors.district = VALIDATION_MESSAGES.MIN_LENGTH(2);
  }

  if (address.landmark && address.landmark.trim() && address.landmark.trim().length < 2) {
    errors.landmark = VALIDATION_MESSAGES.MIN_LENGTH(2);
  }

  return errors;
};

export const validateCheckoutForm = (formData: {
  address: Address;
  notes: string;
}): CheckoutFormErrors => {
  const addressErrors = validateAddress(formData.address);
  const hasAddressErrors = Object.keys(addressErrors).length > 0;

  return {
    address: addressErrors,
    general: hasAddressErrors ? "يرجى تصحيح الأخطاء في العنوان" : undefined,
  };
};

export const isFormValid = (errors: CheckoutFormErrors): boolean => {
  return Object.keys(errors.address).length === 0 && !errors.general;
};
