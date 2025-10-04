import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OccasionsSection from "@/components/OccasionsSection";
import ProductsSlider from "@/components/ProductsSlider";
import OccasionsSlider from "@/components/OccasionsSlider";
import FeaturedBouquets from "@/components/FeaturedBouquets";
import CustomBouquetSection from "@/components/CustomBouquetSection";
import CustomerReviews from "@/components/CustomerReviews";
import BlogSection from "@/components/BlogSection";
import FeaturesSection from "@/components/FeaturesSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                <HeroSection />
                <OccasionsSection />
                <ProductsSlider />
                <OccasionsSlider />
                <FeaturedBouquets />
                <CustomBouquetSection />
                <CustomerReviews />
                <BlogSection />
                <FeaturesSection />
                <NewsletterSection />
            </main>
            <Footer />
        </div>
    );
}
