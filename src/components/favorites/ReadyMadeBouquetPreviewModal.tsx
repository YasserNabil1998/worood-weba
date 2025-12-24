import Image from "next/image";
import { X, ShoppingCart, Trash2, Sparkles } from "lucide-react";
import { BouquetItem } from "@/types/bouquets";
import { PRODUCT_DATA } from "@/constants/productData";

interface ReadyMadeBouquetPreviewModalProps {
  bouquet: BouquetItem;
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: number) => void;
}

/**
 * مكون Modal معاينة الباقة الجاهزة
 * Ready-Made Bouquet Preview Modal Component
 */
export default function ReadyMadeBouquetPreviewModal({
  bouquet,
  isOpen,
  onClose,
  onRemove,
}: ReadyMadeBouquetPreviewModalProps) {
  if (!isOpen) return null;

  const handleRemove = () => {
    const itemId = typeof bouquet.id === "number" ? bouquet.id : Number(bouquet.id);
    onRemove(itemId);
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
          >
            <Sparkles className="w-5 h-5" />
            {bouquet.title}
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
                <div className="absolute inset-0 rounded-full bg-white shadow-lg overflow-hidden">
                  <Image
                    src={bouquet.image}
                    alt={bouquet.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 170px, (max-width: 768px) 220px, (max-width: 1024px) 240px, 270px"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Elegant curved underline */}
              <svg
                className="w-[200px] sm:w-[250px] md:w-[280px] lg:w-[350px] h-[60px] pointer-events-none"
                viewBox="0 0 220 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="shadowGradientReadyMade"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#5A5E4D" stopOpacity="0" />
                    <stop offset="20%" stopColor="#5A5E4D" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#5A5E4D" stopOpacity="0.5" />
                    <stop offset="80%" stopColor="#5A5E4D" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#5A5E4D" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 20 Q110 90, 210 30"
                  stroke="url(#shadowGradientReadyMade)"
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
                >
                  الإجمالي
                </p>
                <div
                  className="flex items-center justify-center gap-2 text-3xl font-bold text-white"
                >
                  <span>{bouquet.totalPrice || bouquet.price}</span>
                  <span className="text-2xl">ريال</span>
                </div>
                <p
                  className="text-xs mt-2 opacity-75"
                >
                  غير شامل الضريبة
                </p>
              </div>

              {/* تفاصيل الباقة */}
              {(bouquet.selectedSize ||
                bouquet.selectedColor ||
                bouquet.addCard ||
                bouquet.addChocolate ||
                bouquet.giftWrap) && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4
                    className="text-xs sm:text-[13px] font-semibold text-gray-800 mb-3"
                  >
                    تفاصيل الباقة
                  </h4>
                  <div className="text-xs sm:text-sm rounded-lg overflow-hidden space-y-0">
                    {bouquet.selectedSize && (
                      <div className="flex items-center justify-between bg-gray-100 px-3 py-2">
                        <span
                          className="text-gray-600"
                        >
                          الحجم
                        </span>
                        <span>
                          {PRODUCT_DATA.sizes.find((s) => s.value === bouquet.selectedSize)?.label ||
                            bouquet.selectedSize}
                        </span>
                      </div>
                    )}
                    {bouquet.selectedColorLabel && (
                      <div className="flex items-center justify-between bg-gray-100/70 px-3 py-2">
                        <span
                          className="text-gray-600"
                        >
                          اللون
                        </span>
                        <div className="flex items-center gap-2">
                          <span>
                            {bouquet.selectedColorLabel}
                          </span>
                          {bouquet.selectedColor && (
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{
                                backgroundColor: bouquet.selectedColor,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* الإضافات */}
              {(bouquet.addCard || bouquet.addChocolate || bouquet.giftWrap) && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4
                    className="text-xs font-semibold text-gray-700 mb-3"
                  >
                    الإضافات المختارة
                  </h4>
                  <div className="space-y-2">
                    {bouquet.addCard && (
                      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-200">
                        <span
                          className="text-gray-700 text-xs"
                        >
                          {PRODUCT_DATA.addons.card.label}
                        </span>
                        <span className="text-xs text-[#5A5E4D] font-medium">
                          +{PRODUCT_DATA.addons.card.price} {PRODUCT_DATA.currency}
                        </span>
                      </div>
                    )}
                    {bouquet.addChocolate && (
                      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-200">
                        <span
                          className="text-gray-700 text-xs"
                        >
                          {PRODUCT_DATA.addons.chocolate.label}
                        </span>
                        <span className="text-xs text-[#5A5E4D] font-medium">
                          +{PRODUCT_DATA.addons.chocolate.price} {PRODUCT_DATA.currency}
                        </span>
                      </div>
                    )}
                    {bouquet.giftWrap && (
                      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-200">
                        <span
                          className="text-gray-700 text-xs"
                        >
                          {PRODUCT_DATA.addons.giftWrap.label}
                        </span>
                        <span className="text-xs text-[#5A5E4D] font-medium">
                          +{PRODUCT_DATA.addons.giftWrap.price} {PRODUCT_DATA.currency}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* رسالة البطاقة */}
              {bouquet.addCard && bouquet.cardMessage && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4
                    className="text-xs font-semibold text-gray-700 mb-2"
                  >
                    رسالة البطاقة
                  </h4>
                  <p
                    className="text-xs text-gray-600 bg-white p-3 rounded-lg border border-gray-200"
                  >
                    {bouquet.cardMessage}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#5A5E4D] text-white py-3 px-6 rounded-xl text-sm font-semibold hover:bg-[#4A4E3D] transition-all duration-300 active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  إضافة إلى السلة
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 px-6 rounded-xl text-sm font-semibold hover:bg-red-100 transition-all duration-300 active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

