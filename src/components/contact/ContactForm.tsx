"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  ContactFormProps,
  ContactFormData,
  ContactFormErrors,
} from "../../@types/contact/index.type";
import {
  validateContactForm,
  hasFormErrors,
  cleanFormData,
} from "../../validations/contactValidation";
import {
  INPUT_HEIGHT,
  TEXTAREA_ROWS,
  FORM_SUCCESS_TIMEOUT,
  MESSAGES,
  BORDER_COLORS,
  BACKGROUND_COLORS,
} from "../../constants/contact";
import { cn } from "../../lib/utils";

export default function ContactForm({ data, onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: data.fields.subject.options[0],
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // TODO: Add form persistence to localStorage

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({ ...prev, [name]: value }));

    // Clear field error when user types
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev: ContactFormErrors) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const cleanedData = cleanFormData(formData);
    const validationErrors = validateContactForm(cleanedData);

    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setIsError(false);
    setErrors({});

    try {
      await onSubmit(cleanedData);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: data.fields.subject.options[0],
        message: "",
      });

      // Hide success message after timeout - could be improved with better UX
      setTimeout(() => {
        setIsSuccess(false);
      }, FORM_SUCCESS_TIMEOUT);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClasses = (fieldName: keyof ContactFormErrors) => {
    const baseClasses = `w-full rounded-lg border px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 transition-colors`;
    const heightClass =
      fieldName === "message" ? "py-3" : `h-${INPUT_HEIGHT / 4}`;
    const borderClass = errors[fieldName]
      ? BORDER_COLORS.ERROR
      : BORDER_COLORS.DEFAULT;
    const focusBorderClass = errors[fieldName]
      ? "focus:border-red-500"
      : "focus:border-[#5A5E4D]";

    return cn(baseClasses, heightClass, borderClass, focusBorderClass);
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 order-1 lg:order-1">
      <h3
        className="text-xl font-bold text-gray-900 mb-6"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        {data.title}
      </h3>

      {/* Status messages */}
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {MESSAGES.FORM_SUCCESS}
        </div>
      )}

      {isError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {MESSAGES.FORM_ERROR}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {data.fields.name.label}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="أدخل اسمك الكامل"
            className={getInputClasses("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {data.fields.email.label}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="أدخل بريدك الإلكتروني"
            className={getInputClasses("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {data.fields.phone.label}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="أدخل رقم هاتفك"
            className={getInputClasses("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Subject field */}
        <div className="min-w-0">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {data.fields.subject.label}
          </label>
          <div className="relative">
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={cn(
                getInputClasses("subject"),
                "pl-4 pr-10 appearance-none bg-white text-sm md:text-base"
              )}
              style={{
                direction: "rtl",
                maxWidth: "100%",
              }}
            >
              {data.fields.subject.options.map((option: string) => (
                <option
                  key={option}
                  value={option}
                  style={{ direction: "rtl" }}
                >
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        {/* Message field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {data.fields.message.label}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={TEXTAREA_ROWS}
            className={cn(getInputClasses("message"), "resize-none")}
            placeholder={data.fields.message.placeholder}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Submit button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full rounded-lg text-white font-semibold transition-colors duration-200",
              `h-${INPUT_HEIGHT / 4}`,
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : cn(BACKGROUND_COLORS.PRIMARY, BACKGROUND_COLORS.PRIMARY_HOVER)
            )}
          >
            {isSubmitting
              ? MESSAGES.LOADING
              : isSuccess
              ? data.submitButton.sentText
              : data.submitButton.text}
          </button>
        </div>
      </form>
    </div>
  );
}
