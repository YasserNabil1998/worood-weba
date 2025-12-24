"use client";

import { useState } from "react";
import Link from "next/link";

import FavoriteProductCard from "@/components/product/FavoriteProductCard";
import AOSWrapper from "@/components/common/AOSWrapper";
import FavoritesEmptyState from "@/components/favorites/FavoritesEmptyState";
import CustomBouquetCard from "@/components/favorites/CustomBouquetCard";
import CustomBouquetPreviewModal from "@/components/favorites/CustomBouquetPreviewModal";
import ReadyMadeBouquetPreviewModal from "@/components/favorites/ReadyMadeBouquetPreviewModal";
import { CustomBouquet } from "@/types/favorites";
import { BouquetItem } from "@/types/bouquets";
import { useFavorites } from "@/hooks/useFavorites";
import { useCustomBouquetFavorites } from "@/hooks/useCustomBouquetFavorites";
import { UI_TEXTS } from "@/constants";

export default function FavoritesPage() {
  const { favorites, loading: favoritesLoading, removeFromFavorites } = useFavorites();
  const {
    customBouquets,
    loading: customLoading,
    removeFromFavorites: removeCustomBouquet,
    addToCart: addCustomBouquetToCart,
    editCustomBouquet,
  } = useCustomBouquetFavorites();

  const [selectedBouquet, setSelectedBouquet] = useState<CustomBouquet | null>(null);
  const [selectedReadyMadeBouquet, setSelectedReadyMadeBouquet] = useState<BouquetItem | null>(
    null
  );
  const [showPreview, setShowPreview] = useState(false);
  const [showReadyMadePreview, setShowReadyMadePreview] = useState(false);

  const loading = favoritesLoading || customLoading;

  const openPreview = (bouquet: CustomBouquet) => {
    setSelectedBouquet(bouquet);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedBouquet(null);
  };

  const openReadyMadePreview = (bouquet: BouquetItem) => {
    setSelectedReadyMadeBouquet(bouquet);
    setShowReadyMadePreview(true);
  };

  const closeReadyMadePreview = () => {
    setShowReadyMadePreview(false);
    setSelectedReadyMadeBouquet(null);
  };

  const handleAddToCart = (bouquet: CustomBouquet) => {
    addCustomBouquetToCart(bouquet);
    closePreview();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#5A5E4D] mx-auto"></div>
            <p className="mt-6 text-gray-600 text-lg">{UI_TEXTS.LOADING}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <AOSWrapper animation="fade-in" delay={50} duration={800}>
            <div className="mb-4">
              <nav className="flex items-center gap-2 text-[18px] text-[#a0a0a0] justify-start">
                <Link href="/" className="hover:text-[#5A5E4D] transition-colors">
                  الرئيسية
                </Link>
                <span> / </span>
                <span className="text-[#5A5E4D]">المفضلة</span>
              </nav>
            </div>
          </AOSWrapper>

          {/* Page Title */}
          <AOSWrapper animation="fade-up" delay={100} duration={800}>
            <div className="mb-8 md:mb-12 flex justify-start">
              <h1 className="text-[32px] font-bold leading-[40px] text-[rgba(0,0,0,0.72)]">
                المنتجات التي أضفتها إلى قائمة المفضلة
              </h1>
            </div>
          </AOSWrapper>

          {favorites.length === 0 && customBouquets.length === 0 ? (
            <FavoritesEmptyState />
          ) : (
            <>
              {/* المنتجات العادية */}
              {favorites.length > 0 && (
                <AOSWrapper animation="fade-up" delay={100} duration={800}>
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favorites.map((item, index) => (
                        <AOSWrapper
                          key={item.id}
                          animation="fade-up"
                          delay={index * 50}
                          duration={600}
                        >
                          <FavoriteProductCard item={item} onPreviewClick={openReadyMadePreview} />
                        </AOSWrapper>
                      ))}
                    </div>
                  </div>
                </AOSWrapper>
              )}

              {/* التصاميم المخصصة */}
              {customBouquets.length > 0 && (
                <AOSWrapper animation="fade-up" delay={150} duration={800}>
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {customBouquets.map((bouquet, index) => (
                        <CustomBouquetCard
                          key={bouquet.id}
                          bouquet={bouquet}
                          index={index}
                          onPreviewClick={openPreview}
                          onRemove={removeCustomBouquet}
                          onEdit={editCustomBouquet}
                          onAddToCart={addCustomBouquetToCart}
                        />
                      ))}
                    </div>
                  </div>
                </AOSWrapper>
              )}

              {/* Browse Packages Button */}
              {(favorites.length > 0 || customBouquets.length > 0) && (
                <AOSWrapper animation="fade-up" delay={200} duration={800}>
                  <div className="flex justify-center mt-8">
                    <Link
                      href="/bouquets"
                      className="bg-[#5f664f] h-[70px] rounded-[10px] px-8 flex items-center justify-center hover:bg-[#4A4E3D] transition-all duration-300"
                    >
                      <span className="text-white font-bold text-[22px] text-right">
                        تصفح الباقات
                      </span>
                    </Link>
                  </div>
                </AOSWrapper>
              )}
            </>
          )}
        </div>
      </main>

      {/* Modal معاينة الباقة المخصصة */}
      {selectedBouquet && (
        <CustomBouquetPreviewModal
          bouquet={selectedBouquet}
          isOpen={showPreview}
          onClose={closePreview}
          onAddToCart={handleAddToCart}
          onEdit={editCustomBouquet}
          onRemove={removeCustomBouquet}
        />
      )}

      {/* Modal معاينة الباقة الجاهزة */}
      {selectedReadyMadeBouquet && (
        <ReadyMadeBouquetPreviewModal
          bouquet={selectedReadyMadeBouquet}
          isOpen={showReadyMadePreview}
          onClose={closeReadyMadePreview}
          onRemove={(id) => {
            const itemId = typeof id === "number" ? id : Number(id);
            removeFromFavorites(itemId);
          }}
        />
      )}
    </div>
  );
}
