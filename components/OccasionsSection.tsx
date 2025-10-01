import type { OccasionItem } from "../types";

type OccasionsSectionProps = {
  occasions?: OccasionItem[];
  isLoading?: boolean;
};

const defaultOccasions: OccasionItem[] = [
    {
      id: 1,
      title: 'زواج',
      image: '/images/occasions/DIV-46.png',
      icon: ''
    },
    {
      id: 2,
      title: 'خطوبة',
      image: '/images/occasions/DIV-56.png',
      icon: ''
    },
    {
      id: 3,
      title: 'نجاح',
      image: '/images/occasions/DIV-64.png',
      icon: ''
    },
    {
      id: 4,
      title: 'مولود جديد',
      image: '/images/occasions/DIV-74.png',
      icon: ''
    }
];

const OccasionsSection = ({ occasions = defaultOccasions, isLoading = false }: OccasionsSectionProps) => {

  return (
    <section className="py-12 bg-[#F5F3ED]">
      <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <div className="text-right mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2" style={{fontFamily: 'var(--font-almarai)'}}>
            المناسبات
          </h2>
          <p className="text-sm text-gray-600" style={{fontFamily: 'var(--font-almarai)'}}>
            اختر من تشكيلتنا المميزة حسب المناسبة
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {isLoading && (
            <div className="col-span-full text-center text-gray-600" style={{fontFamily:'var(--font-almarai)'}}>جاري التحميل...</div>
          )}
          {occasions.map((occasion) => (
            <div
              key={occasion.id}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={occasion.image}
                  alt={occasion.title}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-base md:text-lg font-semibold text-white" style={{fontFamily: 'var(--font-almarai)'}}>
                    {occasion.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionsSection;
