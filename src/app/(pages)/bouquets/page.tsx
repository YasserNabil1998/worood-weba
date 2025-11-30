import { Suspense } from "react";
import BouquetsListingClient from "@/src/components/BouquetsListingClient";
import { BouquetItem } from "@/src/@types/bouquets/index.type";
import { fetchBouquets } from "@/src/lib/api/bouquets";

export default async function BouquetsPage() {
  const items = await fetchBouquets();
  return (
    <div className="min-h-screen bg-[#fbfaf2]" dir="rtl">
      <main>
        {/* Page Title Section */}
        <section className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
            <h1 className="text-[32px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
              الباقات الجاهزة
            </h1>
            <p className="text-[16px] font-normal leading-[20px] text-[#5A5E4D] tracking-[0px]">
              اختر من تشكيلتنا الواسعة من الباقات المصممة بعناية لتناسب جميع المناسبات والأذواق
            </p>
          </div>
        </section>

        {/* Content - starts directly with sorting/search and bouquets listing */}
        <section id="bouquets-section" className="pt-6 pb-12">
          <div className="max-w-[1448px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Listing (sidebar + grid handled inside the client component) */}
            <Suspense fallback={<div className="text-center py-8">جاري التحميل...</div>}>
              <BouquetsListingClient items={items} />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}
