/**
 * Types for Checkout Form
 * أنواع البيانات لنموذج الدفع
 */

export interface Address {
  city: string;
  district: string;
  street: string;
  landmark: string;
  phone: string;
}

export type PaymentMethod = "mada" | "visa" | "apple" | "cod";

export interface CheckoutFormData {
  address: Address;
  notes: string;
  paymentMethod: PaymentMethod;
}

export interface CheckoutFormErrors {
  address: Partial<Address>;
  general?: string;
}

export interface PaymentMethodOption {
  key: PaymentMethod;
  label: string;
  icon: string;
}

export interface CheckoutTotals {
  subtotal: number;
  vat: number;
  grand: number;
}
