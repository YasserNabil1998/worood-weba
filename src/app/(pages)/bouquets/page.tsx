import BouquetsListingClient from "@/src/components/BouquetsListingClient";
import { BouquetItem } from "@/src/@types/bouquets/index.type";
import { fetchBouquets } from "@/src/lib/api/bouquets";

export default async function BouquetsPage() {
  const items = await fetchBouquets();
  return (
    <div className="min-h-screen bg-[#fbfaf2]" dir="rtl">
      <main>
        {/* Content - starts directly with sorting/search and bouquets listing */}
        <section id="bouquets-section" className="pt-6 pb-12">
          <div className="max-w-[1448px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Listing (sidebar + grid handled inside the client component) */}
            <BouquetsListingClient items={items} />
          </div>
        </section>
      </main>
    </div>
  );
}
