/**
 * DeleteConfirmationModal Component
 * مكون بوب أب تأكيد الحذف
 */

"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { fontStyle } from "@/lib/styles";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemTitle?: string;
}

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemTitle,
}: DeleteConfirmationModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleModalClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  // منع التمرير عند فتح الـ modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white border border-[#f9f3f3] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 max-w-md w-full"
        onClick={handleModalClick}
        dir="rtl"
      >
        {/* نص السؤال */}
        <div className="text-start mb-6">
          <p className="text-[20px] font-bold text-black leading-normal" style={fontStyle}>
            هل أنت متأكد أنك تريد حذف الباقة ؟
          </p>
        </div>

        {/* الأزرار */}
        <div className="flex gap-3 justify-start items-center">
          {/* زر حذف */}
          <button
            onClick={handleConfirm}
            className="bg-[#5f664f] text-white rounded-[10px] h-[45px] w-[110px] flex items-center justify-center transition-all duration-200 hover:bg-[#4d5240] hover:scale-105 active:scale-95"
            style={fontStyle}
          >
            <span className="text-[16px] font-bold">حذف</span>
          </button>

          {/* زر تراجع */}
          <button
            onClick={onClose}
            className="bg-[#fcfcfc] border border-black rounded-[10px] h-[45px] w-[110px] flex items-center justify-center transition-all duration-200 hover:bg-gray-50 hover:scale-105 active:scale-95"
            style={fontStyle}
          >
            <span className="text-[16px] font-bold text-[#403f3e]">تراجع</span>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default memo(DeleteConfirmationModal);
