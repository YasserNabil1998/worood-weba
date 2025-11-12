"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
  Loader2,
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
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
    const baseClasses = `w-full rounded-xl border-2 pr-11 pl-4 text-right focus:outline-none focus:ring-2 focus:ring-[#5A5E4D]/20 transition-all duration-200 bg-gray-50 focus:bg-white`;
    const heightClass = isTextarea ? "py-3" : "h-12";
    const borderClass = hasError ? "border-red-300" : "border-gray-200 hover:border-gray-300";
    const focusBorderClass = hasError ? "focus:border-red-500" : "focus:border-[#5A5E4D]";

    return cn(baseClasses, heightClass, borderClass, focusBorderClass);
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-8 order-1 lg:order-1">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-[#2D3319] mb-2">{data.title}</h3>
        <p className="text-gray-600 text-sm">نحن هنا لمساعدتك، املأ النموذج وسنتواصل معك قريباً</p>
      </div>

      {/* Status messages */}
      {isSuccess && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{MESSAGES.FORM_SUCCESS}</span>
        </div>
      )}

      {isError && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{MESSAGES.FORM_ERROR}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name field */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            {data.fields.name.label}
          </label>
          <div className="relative">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <User size={20} />
            </div>
            <input
              type="text"
              placeholder="أدخل اسمك الكامل"
              className={getInputClasses(!!errors.name)}
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <span>•</span> {errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            {data.fields.email.label}
          </label>
          <div className="relative">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={20} />
            </div>
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className={getInputClasses(!!errors.email)}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <span>•</span> {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            {data.fields.phone.label}
          </label>
          <div className="relative">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Phone size={20} />
            </div>
            <input
              type="tel"
              placeholder="أدخل رقم هاتفك"
              className={getInputClasses(!!errors.phone)}
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <span>•</span> {errors.phone.message}
            </p>
          )}
        </div>

        {/* Subject field */}
        <div className="min-w-0">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            {data.fields.subject.label}
          </label>
          <div className="relative">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
              <FileText size={20} />
            </div>
            <select
              className={cn(
                getInputClasses(!!errors.subject),
                "appearance-none text-sm md:text-base cursor-pointer"
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
          {errors.subject && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <span>•</span> {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            {data.fields.message.label}
          </label>
          <div className="relative">
            <div className="absolute right-3 top-3 text-gray-400">
              <MessageSquare size={20} />
            </div>
            <textarea
              rows={TEXTAREA_ROWS}
              className={cn(getInputClasses(!!errors.message, true), "resize-none pr-11")}
              placeholder={data.fields.message.placeholder}
              {...register("message")}
            />
          </div>
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <span>•</span> {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full h-14 rounded-xl text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl",
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#5A5E4D] hover:bg-[#4A4E3D] hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {MESSAGES.LOADING}
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                {data.submitButton.sentText}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {data.submitButton.text}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
