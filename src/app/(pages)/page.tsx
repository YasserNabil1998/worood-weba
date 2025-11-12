import HeroSection from "@/src/components/home/HeroSection";
import OccasionsSection from "@/src/components/common/OccasionsSection";
import ProductsSlider from "@/src/components/home/ProductsSlider";
import FeaturedBouquets from "@/src/components/FeaturedBouquets";
import CustomBouquetSection from "@/src/components/common/CustomBouquetSection";
import CustomerReviewsSlider from "@/src/components/home/CustomerReviewsSlider";
import FeaturesSection from "@/src/components/FeaturesSection";
import NewsletterSection from "@/src/components/NewsletterSection";
import { fetchBouquets } from "@/src/lib/api/bouquets";

export default async function Home() {
  // جلب الباقات وتصفيتها لإظهار الأكثر طلباً
  const allBouquets = await fetchBouquets();
  const mostRequestedBouquets = allBouquets.filter(
    (bouquet) => bouquet.category === "الأكثر مبيعاً" || bouquet.badge === "الأكثر مبيعاً"
  );

  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeaturedBouquets bouquets={mostRequestedBouquets} />
        <OccasionsSection />
        <CustomBouquetSection />
        <ProductsSlider />
        <CustomerReviewsSlider />
        <FeaturesSection />
        <NewsletterSection />
      </main>
    </div>
  );
}
