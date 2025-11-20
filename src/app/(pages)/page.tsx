import HeroSection from "@/src/components/home/HeroSection";
import OccasionsSection from "@/src/components/common/OccasionsSection";
import FeaturedBouquets from "@/src/components/FeaturedBouquets";
import ProductsSlider from "@/src/components/home/ProductsSlider";
import CustomBouquetSection from "@/src/components/common/CustomBouquetSection";
import FeaturesSection from "@/src/components/FeaturesSection";
import CustomerReviewsSlider from "@/src/components/home/CustomerReviewsSlider";
import NewsletterSection from "@/src/components/NewsletterSection";
import { fetchBouquets } from "@/src/lib/api/bouquets";

export default async function Home() {
  // جلب الباقات وتصفيتها لإظهار الأكثر طلباً
  const allBouquets = await fetchBouquets();
  const mostRequestedBouquets = allBouquets.filter(
    (bouquet) => bouquet.category === "الأكثر مبيعاً" || bouquet.badge === "الأكثر مبيعاً"
  );

  return (
    <div className="min-h-screen bg-[#fbfaf2]">
      <main>
        {/* 1. Hero Section - قسم البطل */}
        <HeroSection />

        {/* 2. Occasions Section - قسم المناسبات */}
        <OccasionsSection />

        {/* 3. Most Popular Bouquets - الباقات الأكثر طلباً */}
        <FeaturedBouquets bouquets={mostRequestedBouquets} />

        {/* 4. Vase Happiness Section - سعادة في مزهرية */}
        <ProductsSlider />

        {/* 5. Design Your Own Bouquet - صمم باقتك الخاصة */}
        <CustomBouquetSection />

        {/* 6. Why Choose Us Section - لماذا تختارنا ؟ */}
        <FeaturesSection />

        {/* 7. Customer Reviews Section - آراء عملائنا */}
        <CustomerReviewsSlider />

        {/* 8. Newsletter Section - قسم النشرة البريدية */}
        <NewsletterSection />
      </main>
    </div>
  );
}
