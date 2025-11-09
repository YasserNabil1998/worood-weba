import { VALIDATION_MESSAGES } from "@/src/constants";
import { Address, CheckoutFormErrors } from "@/src/@types/checkout/CheckoutForm.type";

export const validateAddress = (address: Address): Partial<Address> => {
  const errors: Partial<Address> = {};

  if (!address.city.trim()) {
    errors.city = VALIDATION_MESSAGES.REQUIRED_FIELD;
  } else if (address.city.trim().length < 2) {
    errors.city = VALIDATION_MESSAGES.MIN_LENGTH(2);
  }

  if (!address.district.trim()) {
    errors.district = VALIDATION_MESSAGES.REQUIRED_FIELD;
  } else if (address.district.trim().length < 2) {
    errors.district = VALIDATION_MESSAGES.MIN_LENGTH(2);
  }

  if (!address.street.trim()) {
    errors.street = VALIDATION_MESSAGES.REQUIRED_FIELD;
  } else if (address.street.trim().length < 5) {
    errors.street = VALIDATION_MESSAGES.MIN_LENGTH(5);
  }

  if (!address.phone.trim()) {
    errors.phone = VALIDATION_MESSAGES.REQUIRED_FIELD;
  }

  if (address.landmark && address.landmark.trim().length < 2) {
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
