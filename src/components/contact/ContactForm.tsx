"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp, Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
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
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
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

  const selectedSubject = watch("subject");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subjectDropdownRef.current &&
        !subjectDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSubjectDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    const baseClasses = `w-full rounded-[10px] border pr-3 pl-3 sm:pr-4 sm:pl-4 text-right focus:outline-none transition-all duration-200 text-[16px] sm:text-[18px] lg:text-[20px]`;
    const heightClass = isTextarea
      ? "h-[150px] sm:h-[170px] lg:h-[197px] pt-3 sm:pt-4"
      : "h-[48px] sm:h-[50px] lg:h-[51px]";
    const borderClass = hasError ? "border-red-300" : "border-[#dad3d3]";
    const bgClass = "bg-[#fbfbfb] focus:bg-white";
    const textColor = "text-black placeholder:text-[#9ea2a9]";

    return cn(baseClasses, heightClass, borderClass, bgClass, textColor);
  };

  return (
    <div
      className="bg-white rounded-[20px] min-h-[726px] p-4 sm:p-6 md:p-8 lg:p-12 order-1 lg:order-1"
      style={{ fontFamily: "var(--font-almarai)" }}
    >
      <div className="text-right mb-6 sm:mb-8">
        <h3
          className="text-[18px] sm:text-[19px] lg:text-[20px] font-bold text-black mb-2"
          style={{ fontFamily: "var(--font-almarai)" }}
        >
          {data.title}
        </h3>
      </div>

      {/* Status messages */}
      {isSuccess && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="font-medium">{MESSAGES.FORM_SUCCESS}</span>
        </div>
      )}

      {isError && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="font-medium">{MESSAGES.FORM_ERROR}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
      >
        {/* Name field */}
        <div>
          <label
            className="block text-[16px] sm:text-[18px] lg:text-[20px] text-black mb-2 text-right"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            {data.fields.name.label}
          </label>
          <input
            type="text"
            placeholder="أدخل الاسم كامل "
            className={getInputClasses(!!errors.name)}
            style={{ fontFamily: "var(--font-almarai)" }}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <span>•</span> {errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label
            className="block text-[16px] sm:text-[18px] lg:text-[20px] text-black mb-2 text-right"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            {data.fields.email.label}
          </label>
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني "
            className={getInputClasses(!!errors.email)}
            style={{ fontFamily: "var(--font-almarai)" }}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <span>•</span> {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label
            className="block text-[16px] sm:text-[18px] lg:text-[20px] text-black mb-2 text-right"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            {data.fields.phone.label}
          </label>
          <input
            type="tel"
            placeholder="أدخل رقم هاتفك "
            className={getInputClasses(!!errors.phone)}
            style={{ fontFamily: "var(--font-almarai)" }}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <span>•</span> {errors.phone.message}
            </p>
          )}
        </div>

        {/* Subject field */}
        <div className="min-w-0">
          <label
            className="block text-[16px] sm:text-[18px] lg:text-[20px] text-black mb-2 text-right"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            {data.fields.subject.label}
          </label>
          <div className="relative" ref={subjectDropdownRef}>
            <button
              type="button"
              onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
              className={cn(
                getInputClasses(!!errors.subject),
                "appearance-none cursor-pointer pr-12 flex items-center justify-between text-right"
              )}
              style={{
                direction: "rtl",
                fontFamily: "var(--font-almarai)",
                backgroundColor: "#f3f4f6",
              }}
            >
              <span className="flex-1 text-right">
                {selectedSubject || data.fields.subject.options[0]}
              </span>
              {isSubjectDropdownOpen ? (
                <ChevronUp
                  size={22}
                  className="absolute left-2 sm:left-3 lg:left-4 top-1/2 -translate-y-1/2 text-[#5c5a57] pointer-events-none w-5 h-5 sm:w-[22px] sm:h-[22px]"
                />
              ) : (
                <ChevronDown
                  size={22}
                  className="absolute left-2 sm:left-3 lg:left-4 top-1/2 -translate-y-1/2 text-[#5c5a57] pointer-events-none w-5 h-5 sm:w-[22px] sm:h-[22px]"
                />
              )}
            </button>
            <input type="hidden" {...register("subject")} value={selectedSubject} />
            {isSubjectDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-[#dad3d3] rounded-[10px] shadow-lg max-h-[200px] overflow-y-auto">
                {data.fields.subject.options.map((option: string) => (
                  <div
                    key={option}
                    onClick={() => {
                      setValue("subject", option);
                      setIsSubjectDropdownOpen(false);
                    }}
                    className={cn(
                      "px-4 py-3 text-[16px] sm:text-[18px] lg:text-[20px] text-right cursor-pointer hover:bg-[#f3f4f6] transition-colors",
                      selectedSubject === option ? "bg-[#f3f4f6] font-semibold" : ""
                    )}
                    style={{ fontFamily: "var(--font-almarai)" }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.subject && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <span>•</span> {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message field */}
        <div className="md:col-span-2">
          <label
            className="block text-[16px] sm:text-[18px] lg:text-[20px] text-black mb-2 text-right"
            style={{ fontFamily: "var(--font-almarai)" }}
          >
            {data.fields.message.label}
          </label>
          <textarea
            rows={8}
            className={cn(getInputClasses(!!errors.message, true), "resize-none")}
            placeholder="اكتب رسالتك هنا...."
            style={{ fontFamily: "var(--font-almarai)" }}
            {...register("message")}
          />
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
              "w-full h-[50px] sm:h-[55px] lg:h-[60px] rounded-[10px] text-white font-bold text-[16px] sm:text-[18px] lg:text-[20px] transition-all duration-300 flex items-center justify-center gap-2",
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#5f664f] hover:bg-[#4A4E3D]"
            )}
            style={{ fontFamily: "var(--font-almarai)" }}
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
