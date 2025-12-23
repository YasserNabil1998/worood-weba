import Image from "next/image";
import { Heart, Pencil } from "lucide-react";
import AOSWrapper from "@/components/common/AOSWrapper";
import { CustomBouquet } from "@/types/favorites";
import { fontStyle } from "@/lib/styles";
import { UI_TEXTS } from "@/constants";

interface CustomBouquetCardProps {
  bouquet: CustomBouquet;
  index: number;
  onPreviewClick: (bouquet: CustomBouquet) => void;
  onRemove: (id: number) => void;
  onEdit: (bouquet: CustomBouquet) => void;
  onAddToCart: (bouquet: CustomBouquet) => void;
}

/**
 * مكون بطاقة الباقة المخصصة في المفضلة
 * Custom Bouquet Card Component for Favorites
 */
export default function CustomBouquetCard({
  bouquet,
  index,
  onPreviewClick,
  onRemove,
  onEdit,
  onAddToCart,
}: CustomBouquetCardProps) {
  return (
    <AOSWrapper animation="fade-up" delay={index * 50} duration={600}>
      <div
        className="bg-white border border-[#eae9e9] rounded-[20px] h-[149px] flex overflow-hidden relative cursor-pointer w-full"
        dir="rtl"
        onClick={() => onPreviewClick(bouquet)}
      >
        {/* Image Section */}
        <div className="relative w-[140px] h-full shrink-0">
          <Image
            src="/assets/custom-bouquet/معاينة الباقة.png"
            alt="باقة مخصصة"
            fill
            className="object-cover"
            sizes="140px"
            loading="lazy"
            onError={(e) => {
              // Fallback to saved bouquet image (from bouquetImage) if the preview image doesn't exist
              const target = e.target as HTMLImageElement;
              if (bouquet.image && target.src !== bouquet.image) {
                target.src = bouquet.image;
              }
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(bouquet.id);
            }}
            className="absolute top-2 left-2 z-10 cursor-pointer hover:scale-110 transition-transform duration-200"
            dir="rtl"
            aria-label="إزالة من المفضلة"
          >
            <div className="relative w-8 h-8 rounded-full shadow-lg">
              <div className="absolute inset-0 bg-white/80 rounded-full backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-5 h-5" fill="currentColor" style={{ color: "#9F0712" }} />
              </div>
            </div>
          </button>
        </div>
        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between p-4 pl-5">
          <div className="flex items-start justify-start">
            <h3
              className="font-bold text-[16px] text-gray-800 text-right leading-[24px]"
              style={fontStyle}
            >
              باقة مخصصة - {bouquet.occasion}
            </h3>
          </div>
          <div className="flex items-center justify-between gap-3 mt-auto">
            <span
              className="text-[16px] font-bold text-[#3c3d39] text-right whitespace-nowrap"
              style={fontStyle}
            >
              {bouquet.total} ر.س
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(bouquet);
                }}
                className="bg-[#5A5E4D]/10 text-[#5A5E4D] rounded-[4px] w-[44px] h-[37px] flex items-center justify-center hover:bg-[#5A5E4D]/20 transition-all duration-300 cursor-pointer shrink-0"
                aria-label="تعديل الباقة"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(bouquet);
                }}
                className="bg-[#5f664f] rounded-[4px] w-[44px] h-[37px] flex items-center justify-center hover:bg-[#4a4e3d] transition-all duration-300 cursor-pointer shrink-0"
                aria-label={UI_TEXTS.ADD_TO_CART}
              >
                <Image
                  src="/assets/add-to-cart-icon.svg"
                  alt={UI_TEXTS.ADD_TO_CART}
                  width={27}
                  height={27}
                  className="object-contain"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AOSWrapper>
  );
}

