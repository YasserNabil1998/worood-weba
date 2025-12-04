import Script from "next/script";
import HeroSection from "@/src/components/home/HeroSection";
import OccasionsSection from "@/src/components/common/OccasionsSection";
import FeaturedBouquets from "@/src/components/FeaturedBouquets";
import ProductsSlider from "@/src/components/home/ProductsSlider";
import CustomBouquetSection from "@/src/components/common/CustomBouquetSection";
import FeaturesSection from "@/src/components/FeaturesSection";
import CustomerReviewsSlider from "@/src/components/home/CustomerReviewsSlider";
import NewsletterSection from "@/src/components/NewsletterSection";
import AOSWrapper from "@/src/components/common/AOSWrapper";
import { fetchBouquets } from "@/src/lib/api/bouquets";
import { generateBreadcrumbSchema } from "@/src/lib/structuredData";

// Generate Breadcrumb Schema for home page
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "الرئيسية", url: "https://shamsflowers.com/" },
]);

export default async function Home() {
  // جلب الباقات وتصفيتها لإظهار الأكثر طلباً
  const allBouquets = await fetchBouquets();
  const mostRequestedBouquets = allBouquets.filter(
    (bouquet) => bouquet.category === "الأكثر مبيعاً" || bouquet.badge === "الأكثر مبيعاً"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Schema for SEO */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        {/* 1. Hero Section - قسم البطل */}
        <HeroSection />

        {/* 2. Occasions Section - قسم المناسبات */}
        <AOSWrapper animation="fade-up" delay={0} duration={1000}>
          <OccasionsSection />
        </AOSWrapper>

        {/* 3. Most Popular Bouquets - الباقات الأكثر طلباً */}
        <AOSWrapper animation="zoom-in" delay={150} duration={1000}>
          <FeaturedBouquets bouquets={mostRequestedBouquets} />
        </AOSWrapper>

        {/* 4. Design Your Own Bouquet - صمم باقتك الخاصة */}
        <CustomBouquetSection />

        {/* 5. Vase Happiness Section - سعادة في مزهرية */}
        <AOSWrapper animation="fade-up" delay={0} duration={1000}>
          <ProductsSlider />
        </AOSWrapper>

        {/* 6. Why Choose Us Section - لماذا تختارنا ؟ */}
        <AOSWrapper animation="fade-up" delay={100} duration={1000}>
          <FeaturesSection />
        </AOSWrapper>

        {/* 7. Customer Reviews Section - آراء عملائنا */}
        <AOSWrapper animation="fade-up" delay={0} duration={1000}>
          <CustomerReviewsSlider />
        </AOSWrapper>

        {/* 8. Newsletter Section - قسم النشرة البريدية */}
        <AOSWrapper animation="zoom-in" delay={150} duration={1000}>
          <NewsletterSection />
        </AOSWrapper>
      </main>
    </div>
  );
}
