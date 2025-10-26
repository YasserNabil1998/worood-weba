import HeroSection from "@/src/components/home/HeroSection";
import OccasionsSection from "@/src/components/common/OccasionsSection";
import ProductsSlider from "@/src/components/home/ProductsSlider";
import FeaturedBouquets from "@/src/components/FeaturedBouquets";
import CustomBouquetSection from "@/src/components/common/CustomBouquetSection";
import CustomerReviewsSlider from "@/src/components/home/CustomerReviewsSlider";
import FeaturesSection from "@/src/components/FeaturesSection";
import NewsletterSection from "@/src/components/NewsletterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD]">
      <main>
        <HeroSection />
        <OccasionsSection />
        <ProductsSlider />
        <FeaturedBouquets />
        <CustomBouquetSection />
        <CustomerReviewsSlider />
        <FeaturesSection />
        <NewsletterSection />
      </main>
    </div>
  );
}
