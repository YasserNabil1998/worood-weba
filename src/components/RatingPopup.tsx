"use client";

import { useState } from "react";
import { useNotification } from "@/providers/notification-provider";
import type { ReviewItem } from "@/types";
import { Star, X } from "lucide-react";
import { fontStyle } from "@/lib/styles";
import { TIMEOUTS } from "@/constants";

type RatingPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  productName: string;
  onRatingSubmit: (review: ReviewItem) => void;
  customerName: string;
  customerImage?: string | null;
};

export default function RatingPopup({
  isOpen,
  onClose,
  orderNumber,
  productName,
  onRatingSubmit,
  customerName,
  customerImage,
}: RatingPopupProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async () => {
    if (rating === 0) {
      showNotification("يرجى اختيار تقييم", "error");
      return;
    }

    if (comment.trim().length < 10) {
      showNotification("يرجى كتابة تعليق من 10 أحرف على الأقل", "error");
      return;
    }

    setIsSubmitting(true);

    // إنشاء التقييم الجديد
    const newReview: ReviewItem = {
      id: Date.now().toString(),
      orderId: orderNumber,
      customerName,
      customerImage,
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      productName,
    };

    // محاكاة إرسال البيانات
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.API_SIMULATION));

    onRatingSubmit(newReview);
    setIsSubmitting(false);
    showNotification("تم إرسال تقييمك بنجاح!", "success");

    // إعادة تعيين النموذج
    setRating(0);
    setComment("");
    onClose();
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    onClose();
  };

  const renderStars = (currentRating: number, isInteractive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        disabled={!isInteractive}
        onClick={() => isInteractive && setRating(index + 1)}
        onMouseEnter={() => isInteractive && setHoveredRating(index + 1)}
        onMouseLeave={() => isInteractive && setHoveredRating(0)}
        className={`w-8 h-8 transition-colors ${
          isInteractive ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <Star
          className={`w-full h-full ${
            index < (hoveredRating || currentRating) ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
        />
      </button>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800" style={fontStyle}>
              تقييم الطلب
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1" style={fontStyle}>
              رقم الطلب: {orderNumber}
            </p>
            <p className="text-sm text-gray-800 font-medium" style={fontStyle}>
              {productName}
            </p>
          </div>

          {/* Customer Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              {customerImage ? (
                <img
                  src={customerImage}
                  alt={customerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <span
                  className="text-green-600 font-bold text-lg"
                  style={fontStyle}
                >
                  {customerName.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-800" style={fontStyle}>
                {customerName}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3" style={fontStyle}>
              كيف تقيم تجربتك؟
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">{renderStars(rating, true)}</div>
              {rating > 0 && (
                <p className="text-sm font-medium text-gray-700" style={fontStyle}>
                  {rating === 1 && "سيء جداً"}
                  {rating === 2 && "سيء"}
                  {rating === 3 && "متوسط"}
                  {rating === 4 && "جيد"}
                  {rating === 5 && "ممتاز"}
                </p>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3" style={fontStyle}>
              شاركنا رأيك (اختياري)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A5E4D] focus:border-transparent resize-none"
              style={fontStyle}
            />
            <p className="text-xs text-gray-500 mt-1" style={fontStyle}>
              {comment.length} / 500 حرف
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              style={fontStyle}
            >
              إلغاء
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
              className="flex-1 px-4 py-2 bg-[#5A5E4D] text-white rounded-lg hover:bg-[#4A4E3D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              style={fontStyle}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الإرسال...
                </>
              ) : (
                "إرسال التقييم"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
