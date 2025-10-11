import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OccasionsSection from "@/components/OccasionsSection";
import ProductsSlider from "@/components/ProductsSlider";
import OccasionsSlider from "@/components/OccasionsSlider";
import FeaturedBouquets from "@/components/FeaturedBouquets";
import CustomBouquetSection from "@/components/CustomBouquetSection";
import CustomerReviewsSlider from "@/components/CustomerReviewsSlider";
import BlogSection from "@/components/BlogSection";
import FeaturesSection from "@/components/FeaturesSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD]">
            <Header />
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
            <Footer />
        </div>
    );
}
