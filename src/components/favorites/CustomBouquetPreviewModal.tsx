import Image from "next/image";
import { X, ShoppingCart, Trash2, Pencil, Heart, Sparkles } from "lucide-react";
import { CustomBouquet } from "@/types/favorites";
import { UI_TEXTS } from "@/constants";
import { formatTimeToArabic, formatDateEnglish } from "@/lib/utils";
import { getFlowerColors, getSizeLabel, getStyleLabel } from "@/lib/utils/favorites";
import bouquetsData from "@/app/(pages)/custom/bouquets.json";

interface CustomBouquetPreviewModalProps {
  bouquet: CustomBouquet;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (bouquet: CustomBouquet) => void;
  onEdit: (bouquet: CustomBouquet) => void;
  onRemove: (id: number) => void;
}

/**
 * مكون Modal معاينة الباقة المخصصة
 * Custom Bouquet Preview Modal Component
 */
export default function CustomBouquetPreviewModal({
  bouquet,
  isOpen,
  onClose,
  onAddToCart,
  onEdit,
  onRemove,
}: CustomBouquetPreviewModalProps) {
  if (!isOpen) return null;

  const handleAddToCart = () => {
    onAddToCart(bouquet);
    onClose();
  };

  const handleEdit = () => {
    onEdit(bouquet);
    onClose();
  };

  const handleRemove = () => {
    onRemove(bouquet.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-[#5A5E4D] to-[#4A4E3D] px-6 py-4 sticky top-0 z-10 flex items-center justify-between border-b border-[#5A5E4D]/20">
          <h2
            className="text-lg md:text-xl font-bold text-white flex items-center gap-2"
            style={{
              fontFamily: "var(--font-almarai)",
            }}
          >
            <Sparkles className="w-5 h-5" />
            باقة مخصصة - {bouquet.occasion}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1" dir="ltr">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
            {/* Image */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-[200px] w-[170px] sm:h-[250px] sm:w-[220px] md:h-[280px] md:w-[240px] lg:h-[318px] lg:w-[270px] mb-3 sm:mb-4">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src={bouquet.image || "/assets/custom-bouquet/معاينة الباقة.png"}
                    alt="باقة مخصصة"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 170px, (max-width: 768px) 220px, (max-width: 1024px) 240px, 270px"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== "/assets/custom-bouquet/معاينة الباقة.png") {
                        target.src = "/assets/custom-bouquet/معاينة الباقة.png";
                      }
                    }}
                  />
                </div>
              </div>
              {/* Elegant curved underline - subtle reflective shadow */}
              <svg
                className="w-[200px] sm:w-[250px] md:w-[280px] lg:w-[350px] h-[60px] pointer-events-none"
                viewBox="0 0 220 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5A5E4D" stopOpacity="0" />
                    <stop offset="20%" stopColor="#5A5E4D" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#5A5E4D" stopOpacity="0.5" />
                    <stop offset="80%" stopColor="#5A5E4D" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#5A5E4D" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 20 Q110 90, 210 30"
                  stroke="url(#shadowGradient)"
                  strokeWidth="1.5"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Details */}
            <div className="space-y-4">
              {/* السعر */}
              <div className="bg-linear-to-br from-[#5A5E4D] to-[#4A4E3D] text-white p-5 rounded-xl text-center shadow-lg">
                <p
                  className="text-sm mb-1 opacity-90"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  الإجمالي
                </p>
                <div
                  className="flex items-center justify-center gap-2 text-3xl font-bold text-white"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  <span>{bouquet.total.toFixed(0)}</span>
                  <span className="text-2xl">ريال</span>
                </div>
                <p
                  className="text-xs mt-2 opacity-75"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  غير شامل الضريبة
                </p>
              </div>

              {/* تفاصيل الباقة */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4
                  className="text-xs sm:text-[13px] font-semibold text-gray-800 mb-3"
                  style={{
                    fontFamily: "var(--font-almarai)",
                  }}
                >
                  تفاصيل الباقة
                </h4>
                <div className="text-xs sm:text-sm rounded-lg overflow-hidden space-y-0">
                  <div className="flex items-center justify-between bg-gray-100 px-3 py-2">
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "var(--font-almarai)" }}
                    >
                      الحجم
                    </span>
                    <span style={{ fontFamily: "var(--font-almarai)" }}>
                      {getSizeLabel(bouquet.size)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100/70 px-3 py-2">
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "var(--font-almarai)" }}
                    >
                      عدد الزهور
                    </span>
                    <span style={{ fontFamily: "var(--font-almarai)" }}>
                      {bouquet.flowers.reduce((sum, item) => sum + item.quantity, 0)} زهرة
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100/70 px-3 py-2">
                    <span
                      className="text-gray-600"
                      style={{ fontFamily: "var(--font-almarai)" }}
                    >
                      التغليف
                    </span>
                    <span style={{ fontFamily: "var(--font-almarai)" }}>
                      {getStyleLabel(bouquet.style)}
                    </span>
                  </div>
                </div>
              </div>

              {/* الزهور المختارة */}
              {bouquet.flowers.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4
                    className="text-xs font-semibold text-gray-700 mb-3"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    الزهور المختارة
                  </h4>
                  <div className="space-y-2">
                    {bouquet.flowers.map((item) => {
                      const flowerColorIds = getFlowerColors(item.flower, bouquet.colors);

                      return (
                        <div
                          key={`flower-${item.flower.id}`}
                          className="flex items-center justify-between py-2 px-2 bg-gray-50 rounded-md"
                        >
                          <div className="flex-1">
                            <div
                              className="text-xs font-medium text-gray-800"
                              style={{ fontFamily: "var(--font-almarai)" }}
                            >
                              {item.flower.name}
                            </div>
                            <div
                              className="text-xs text-gray-500"
                              style={{ fontFamily: "var(--font-almarai)" }}
                            >
                              {item.quantity} زهرة
                            </div>
                          </div>
                          {flowerColorIds.length > 0 && (
                            <div className="flex gap-1">
                              {flowerColorIds.map((colorId: number) => {
                                const color = bouquetsData.colors.find((c) => c.id === colorId);
                                if (!color) return null;

                                return (
                                  <span
                                    key={`flower-${item.flower.id}-color-${colorId}`}
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{
                                      backgroundColor: color.color,
                                    }}
                                    title={color.name}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* البطاقة والملاحظات */}
              {bouquet.cardMessage && (
                <div className="bg-linear-to-br from-pink-50 to-pink-100/50 p-4 rounded-xl border border-pink-200/50">
                  <h5
                    className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    <Heart className="w-4 h-4 text-pink-500" />
                    رسالة البطاقة
                  </h5>
                  <p
                    className="text-gray-700 text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {bouquet.cardMessage}
                  </p>
                </div>
              )}

              {bouquet.notes && (
                <div className="bg-linear-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
                  <h5
                    className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    ملاحظات
                  </h5>
                  <p
                    className="text-gray-700 text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {bouquet.notes}
                  </p>
                </div>
              )}

              {(bouquet.deliveryDate || bouquet.deliveryTime) && (
                <div className="bg-linear-to-br from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200/50">
                  <h5
                    className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-green-500" />
                    موعد التوصيل
                  </h5>
                  <p
                    className="text-gray-700 text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-almarai)",
                    }}
                  >
                    {bouquet.deliveryDate && <span>{formatDateEnglish(bouquet.deliveryDate)}</span>}
                    {bouquet.deliveryDate && bouquet.deliveryTime && <span className="mx-2">•</span>}
                    {bouquet.deliveryTime && (
                      <span>
                        {formatTimeToArabic(bouquet.deliveryTime) || bouquet.deliveryTime}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-gray-200">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-[#5A5E4D] text-white py-3 px-6 rounded-xl text-sm font-semibold hover:bg-[#4A4E3D] transition-all duration-300 hover:shadow-lg active:scale-95"
              style={{
                fontFamily: "var(--font-almarai)",
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              {UI_TEXTS.ADD_TO_CART}
            </button>
            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="flex-1 flex items-center justify-center gap-2 bg-[#5A5E4D]/10 text-[#5A5E4D] py-3 px-6 rounded-xl text-sm font-semibold hover:bg-[#5A5E4D]/20 transition-all duration-300 active:scale-95"
                style={{
                  fontFamily: "var(--font-almarai)",
                }}
              >
                <Pencil className="w-4 h-4" />
                تعديل
              </button>
              <button
                onClick={handleRemove}
                className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 px-6 rounded-xl text-sm font-semibold hover:bg-red-100 transition-all duration-300 active:scale-95"
                style={{
                  fontFamily: "var(--font-almarai)",
                }}
              >
                <Trash2 className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

