"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";
import Script from "next/script";

import DataLoader from "@/components/shared/DataLoader";
import {
  ProductImageGallery,
  ProductInfo,
  SizeSelector,
  ProductAddons,
  ProductActions,
  ColorSelector,
} from "@/components/product";
import AOSWrapper from "@/components/common/AOSWrapper";
import { useProductDetails } from "@/hooks/useProductDetails";
import { PRODUCT_DATA } from "@/constants/productData";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/structuredData";

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
    isEditMode,
  } = useProductDetails(id);

  // Generate structured data for SEO
  const productSchema = product
    ? generateProductSchema({
        id: product.id,
        name: product.title,
        description: product.description,
        image: `https://shamsflowers.com${product.images[0]}`,
        price: product.price,
        currency: product.currency,
      })
    : null;

  const breadcrumbSchema = product
    ? generateBreadcrumbSchema([
        { name: "الرئيسية", url: "https://shamsflowers.com/" },
        { name: "الباقات", url: "https://shamsflowers.com/bouquets" },
        { name: product.title, url: `https://shamsflowers.com/product/${product.id}` },
      ])
    : null;

  return (
    <DataLoader isLoading={isLoading} loadingText="جاري تحميل المنتج...">
      {/* Structured Data for SEO */}
      {productSchema && (
        <Script id="product-schema" type="application/ld+json">
          {JSON.stringify(productSchema)}
        </Script>
      )}
      {breadcrumbSchema && (
        <Script id="breadcrumb-schema" type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </Script>
      )}

      <div className="min-h-screen">
        {!product ? (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-[#5A5E4D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-[#5A5E4D]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود</h1>
              <p className="text-gray-600 mb-6">عذراً، لم نتمكن من العثور على المنتج المطلوب</p>
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
            <AOSWrapper animation="fade-in" delay={50} duration={800}>
              <nav className="flex items-center gap-2 text-sm mb-8">
                <Link href="/" className="text-gray-500 hover:text-[#5A5E4D] transition-colors">
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
                <span className="text-[#5A5E4D] font-medium">{product.title}</span>
              </nav>
            </AOSWrapper>

            {/* Product Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <AOSWrapper animation="fade-left" delay={100} duration={800}>
                <ProductImageGallery
                  images={product.images}
                  title={product.title}
                  selectedImage={selectedImage}
                  onImageSelect={setSelectedImage}
                />
              </AOSWrapper>

              {/* Product Info */}
              <AOSWrapper animation="fade-right" delay={150} duration={800}>
                <div className="space-y-4">
                  {/* Title & Price */}
                  <ProductInfo
                    productId={product.id.toString()}
                    title={product.title}
                    price={product.price}
                    currency={product.currency}
                    description={product.description}
                    product={{
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      currency: product.currency,
                      image: product.image,
                    }}
                    productOptions={{
                      selectedSize: options.selectedSize,
                      color: options.color,
                      addCard: options.addCard,
                      cardMessage: options.cardMessage,
                      addChocolate: options.addChocolate,
                      giftWrap: options.giftWrap,
                      totalPrice: getTotalPrice(),
                    }}
                  />

                  <div className="border-t border-gray-200 pt-4">
                    {/* Size Selection */}
                    <SizeSelector
                      sizes={[...PRODUCT_DATA.sizes]}
                      selectedSize={options.selectedSize}
                      onSizeChange={(size) => updateOption("selectedSize", size)}
                      currency={product.currency}
                    />

                    {/* Color Selection */}
                    <ColorSelector
                      colors={PRODUCT_DATA.colors}
                      selectedColor={options.color}
                      onColorChange={(color) => updateOption("color", color)}
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
                      onChocolateToggle={(checked) => updateOption("addChocolate", checked)}
                      onGiftWrapToggle={(checked) => updateOption("giftWrap", checked)}
                      onCardMessageChange={(message) => updateOption("cardMessage", message)}
                    />

                    {/* Quantity & Add to Cart */}
                    <ProductActions
                      quantity={options.quantity}
                      totalPrice={getTotalPrice()}
                      currency={product.currency}
                      onQuantityChange={(quantity) => updateOption("quantity", quantity)}
                      onAddToCart={handleAddToCart}
                      isEditMode={isEditMode}
                    />
                  </div>
                </div>
              </AOSWrapper>
            </div>
          </main>
        )}
      </div>
    </DataLoader>
  );
}
