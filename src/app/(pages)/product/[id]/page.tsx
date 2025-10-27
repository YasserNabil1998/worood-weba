"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";

import DataLoader from "@/src/components/DataLoader";
import {
  ProductImageGallery,
  ProductInfo,
  SizeSelector,
  ProductAddons,
  ProductActions,
} from "@/src/components/product";
import { useProductDetails } from "@/src/hooks/useProductDetails";
import { PRODUCT_DATA } from "@/src/constants/productData";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const {
    product,
    isLoading,
    selectedImage,
    setSelectedImage,
    options,
    updateOption,
    getTotalPrice,
    handleAddToCart,
  } = useProductDetails(id);

  return (
    <DataLoader isLoading={isLoading} loadingText="جاري تحميل المنتج...">
      <div className="min-h-screen bg-gradient-to-br from-[#faf9f6] to-white">
        {!product ? (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-[#5A5E4D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-[#5A5E4D]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                المنتج غير موجود
              </h1>
              <p className="text-gray-600 mb-6">
                عذراً، لم نتمكن من العثور على المنتج المطلوب
              </p>
              <Link
                href="/bouquets"
                className="inline-block bg-[#5A5E4D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#4A4E3D] transition-all transform hover:scale-105"
              >
                العودة إلى الباقات
              </Link>
            </div>
          </div>
        ) : (
          <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8">
              <Link
                href="/"
                className="text-gray-500 hover:text-[#5A5E4D] transition-colors"
              >
                الرئيسية
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href="/bouquets"
                className="text-gray-500 hover:text-[#5A5E4D] transition-colors"
              >
                الباقات
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-[#5A5E4D] font-medium">
                {product.title}
              </span>
            </nav>

            {/* Product Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <ProductImageGallery
                images={product.images}
                title={product.title}
                selectedImage={selectedImage}
                onImageSelect={setSelectedImage}
              />

              {/* Product Info */}
              <div className="space-y-4">
                {/* Title & Price */}
                <ProductInfo
                  productId={product.id.toString()}
                  title={product.title}
                  price={product.price}
                  currency={product.currency}
                  description={product.description}
                />

                <div className="border-t border-gray-200 pt-4">
                  {/* Size Selection */}
                  <SizeSelector
                    sizes={[...PRODUCT_DATA.sizes]}
                    selectedSize={options.selectedSize}
                    onSizeChange={(size) => updateOption("selectedSize", size)}
                    currency={product.currency}
                  />

                  {/* Addons */}
                  <ProductAddons
                    cardAddon={PRODUCT_DATA.addons.card}
                    chocolateAddon={PRODUCT_DATA.addons.chocolate}
                    giftWrapAddon={PRODUCT_DATA.addons.giftWrap}
                    currency={product.currency}
                    addCard={options.addCard}
                    addChocolate={options.addChocolate}
                    giftWrap={options.giftWrap}
                    cardMessage={options.cardMessage}
                    onCardToggle={(checked) => updateOption("addCard", checked)}
                    onChocolateToggle={(checked) =>
                      updateOption("addChocolate", checked)
                    }
                    onGiftWrapToggle={(checked) =>
                      updateOption("giftWrap", checked)
                    }
                    onCardMessageChange={(message) =>
                      updateOption("cardMessage", message)
                    }
                  />

                  {/* Quantity & Add to Cart */}
                  <ProductActions
                    quantity={options.quantity}
                    totalPrice={getTotalPrice()}
                    currency={product.currency}
                    onQuantityChange={(quantity) =>
                      updateOption("quantity", quantity)
                    }
                    onAddToCart={handleAddToCart}
                  />
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    </DataLoader>
  );
}
