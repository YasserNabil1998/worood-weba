import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import OccasionsSection from '@/components/OccasionsSection';
import FeaturedBouquets from '@/components/FeaturedBouquets';
import type { BouquetItem } from '@/types';
import CustomBouquetSection from '@/components/CustomBouquetSection';
import CustomerReviews from '@/components/CustomerReviews';
import BlogSection from '@/components/BlogSection';
import FeaturesSection from '@/components/FeaturesSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import TestCartButton from '@/components/TestCartButton';
import DebugCart from '@/components/DebugCart';

async function fetchProducts(): Promise<BouquetItem[]> {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=4', { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    const mapped: BouquetItem[] = (data.products || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      image: Array.isArray(p.images) && p.images.length ? p.images[0] : p.thumbnail,
      price: Math.round(p.price),
      currency: 'ر.س',
    }));
    return mapped;
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const products = await fetchProducts();
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <OccasionsSection />
        <FeaturedBouquets bouquets={products} isLoading={false} />
        <CustomBouquetSection />
        <CustomerReviews />
        <BlogSection />
        <FeaturesSection /> 
        <NewsletterSection />
      </main>
      <Footer />
      <TestCartButton />
      <DebugCart />
    </div>
  );
}
