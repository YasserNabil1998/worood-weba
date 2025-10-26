import BouquetsListingClient from "@/src/components/BouquetsListingClient";
import OccasionsSection from "@/src/components/common/OccasionsSection";
import CustomBouquetSection from "@/src/components/common/CustomBouquetSection";
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
        {/* Page Title Section */}
        <section className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
            <h1 className="text-[36px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
              الباقات الجاهزة
            </h1>
            <p className="text-[16px] font-normal leading-[24px] text-[#5A5E4D] tracking-[0px]">
              تشكيلة واسعة من الباقات المميزة لجميع المناسبات
            </p>
          </div>
        </section>

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
        <OccasionsSection
          title="تسوق حسب المناسبة"
          description="اختر من تشكيلتنا المميزة حسب المناسبة"
        />

        {/* Custom Bouquet Section */}
        <CustomBouquetSection
          title="لم تجد ما تبحث عنه؟"
          description="دعنا نساعدك في تصميم باقة فريدة تناسب ذوقك ومناسبتك الخاصة"
          buttonText="ابدأ التصميم الآن"
        />
      </main>
    </div>
  );
}
