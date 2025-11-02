"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Loader2 } from "lucide-react";
import { ContactFormProps } from "@/src/@types/contact/index.type";
import { contactSchema, ContactFormData } from "@/src/validations/schemas/contactSchema";
import {
  INPUT_HEIGHT,
  TEXTAREA_ROWS,
  FORM_SUCCESS_TIMEOUT,
  MESSAGES,
  BORDER_COLORS,
  BACKGROUND_COLORS,
} from "@/src/constants/contact";
import { cn } from "@/src/lib/utils";

export default function ContactForm({ data, onSubmit }: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: data.fields.subject.options[0],
      message: "",
    },
  });

  // Handle form submission
  const onSubmitForm = async (formData: ContactFormData) => {
    setIsError(false);

    try {
      await onSubmit(formData);
      setIsSuccess(true);
      reset(); // Reset form after successful submission

      // Hide success message after timeout
      setTimeout(() => {
        setIsSuccess(false);
      }, FORM_SUCCESS_TIMEOUT);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsError(true);
    }
  };

  // Get input classes based on error state
  const getInputClasses = (hasError: boolean, isTextarea = false) => {
    const baseClasses = `w-full rounded-lg border px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/30 transition-colors`;
    const heightClass = isTextarea ? "py-3" : `h-${INPUT_HEIGHT / 4}`;
    const borderClass = hasError ? BORDER_COLORS.ERROR : BORDER_COLORS.DEFAULT;
    const focusBorderClass = hasError ? "focus:border-red-500" : "focus:border-[#5A5E4D]";

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

      <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {data.fields.name.label}
          </label>
          <input
            type="text"
            placeholder="أدخل اسمك الكامل"
            className={getInputClasses(!!errors.name)}
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {data.fields.email.label}
          </label>
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            className={getInputClasses(!!errors.email)}
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Phone field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {data.fields.phone.label}
          </label>
          <input
            type="tel"
            placeholder="أدخل رقم هاتفك"
            className={getInputClasses(!!errors.phone)}
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        {/* Subject field */}
        <div className="min-w-0">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {data.fields.subject.label}
          </label>
          <div className="relative">
            <select
              className={cn(
                getInputClasses(!!errors.subject),
                "pl-4 pr-10 appearance-none bg-white text-sm md:text-base"
              )}
              style={{
                direction: "rtl",
                maxWidth: "100%",
              }}
              {...register("subject")}
            >
              {data.fields.subject.options.map((option: string) => (
                <option key={option} value={option} style={{ direction: "rtl" }}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
        </div>

        {/* Message field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {data.fields.message.label}
          </label>
          <textarea
            rows={TEXTAREA_ROWS}
            className={cn(getInputClasses(!!errors.message, true), "resize-none")}
            placeholder={data.fields.message.placeholder}
            {...register("message")}
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        </div>

        {/* Submit button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full rounded-lg text-white font-semibold transition-colors duration-200 flex items-center justify-center gap-2",
              `h-${INPUT_HEIGHT / 4}`,
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : cn(BACKGROUND_COLORS.PRIMARY, BACKGROUND_COLORS.PRIMARY_HOVER)
            )}
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
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
