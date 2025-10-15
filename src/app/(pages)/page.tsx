import HeroSection from "@/src/components/HeroSection";
import OccasionsSection from "@/src/components/OccasionsSection";
import ProductsSlider from "@/src/components/ProductsSlider";
import OccasionsSlider from "@/src/components/OccasionsSlider";
import FeaturedBouquets from "@/src/components/FeaturedBouquets";
import CustomBouquetSection from "@/src/components/CustomBouquetSection";
import CustomerReviewsSlider from "@/src/components/CustomerReviewsSlider";
import BlogSection from "@/src/components/BlogSection";
import FeaturesSection from "@/src/components/FeaturesSection";
import NewsletterSection from "@/src/components/NewsletterSection";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD]">
            <main>
                <HeroSection />
                <OccasionsSection />
                <ProductsSlider />
                <OccasionsSlider />
                <FeaturedBouquets />
                <CustomBouquetSection />
                <CustomerReviewsSlider />
                <BlogSection />
                <FeaturesSection />
                <NewsletterSection />
            </main>
        </div>
    );
}
