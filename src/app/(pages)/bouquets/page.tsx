import BouquetsListingClient from "@/src/components/BouquetsListingClient";
import ShopByOccasionSection from "@/src/components/common/ShopByOccasionSection";
import BouquetsHero from "@/src/components/home/BouquetsHero";
import { BouquetItem } from "@/src/@types/bouquets/index.type";
import { fetchBouquets } from "@/src/lib/api/bouquets";

// Hero component is now in components/home/BouquetsHero.tsx

export default async function BouquetsPage() {
  const items = await fetchBouquets();
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD]"
      dir="rtl"
    >
      <main>
        <BouquetsHero />

        {/* Content */}
        <section id="bouquets-section" className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Listing (sidebar + grid handled inside the client component) */}
            <BouquetsListingClient items={items} />

            {/* Pagination (static) */}
          </div>
        </section>

        {/* Occasions Section */}
        <ShopByOccasionSection
          title="تسوق حسب المناسبة"
          description="اختر من تشكيلتنا المميزة حسب المناسبة"
        />
      </main>
    </div>
  );
}
