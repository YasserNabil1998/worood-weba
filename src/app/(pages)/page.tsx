import HeroSection from "@/components/home/HeroSection";
import OccasionsSection from "@/components/common/OccasionsSection";
import FeaturedBouquets from "@/components/home/FeaturedBouquets";
import ProductsSlider from "@/components/home/ProductsSlider";
import CustomBouquetSection from "@/components/common/CustomBouquetSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CustomerReviewsSlider from "@/components/home/CustomerReviewsSlider";
import NewsletterSection from "@/components/home/NewsletterSection";
import AOSWrapper from "@/components/common/AOSWrapper";

export default async function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Occasions Section - قسم المناسبات */}
        <AOSWrapper animation="fade-up" delay={0} duration={1000}>
          <OccasionsSection />
        </AOSWrapper>

        {/* 3. Most Popular Bouquets - الباقات الأكثر طلباً */}
        <AOSWrapper animation="zoom-in" delay={150} duration={1000}>
          <FeaturedBouquets />
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
