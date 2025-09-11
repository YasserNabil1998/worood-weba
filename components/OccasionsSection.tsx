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
      icon: '💕'
    },
    {
      id: 2,
      title: 'خطوبة',
      image: '/images/occasions/DIV-56.png',
      icon: '💕'
    },
    {
      id: 3,
      title: 'نجاح',
      image: '/images/occasions/DIV-64.png',
      icon: '🎓'
    },
    {
      id: 4,
      title: 'مولود جديد',
      image: '/images/occasions/DIV-74.png',
      icon: '👶'
    }
];

const OccasionsSection = ({ occasions = defaultOccasions, isLoading = false }: OccasionsSectionProps) => {

  return (
    <section className="py-16" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: 'var(--font-almarai)'}}>
            المناسبات
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            اختر من تشكيلتنا المميزة حسب المناسبة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading && (
            <div className="col-span-full text-center text-gray-600" style={{fontFamily:'var(--font-almarai)'}}>جاري التحميل...</div>
          )}
          {occasions.map((occasion) => (
            <div
              key={occasion.id}
              className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-96 overflow-hidden">
                <img
                  src={occasion.image}
                  alt={occasion.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Gradient overlay from bottom to top */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-10">
                <div className="text-2xl mb-2 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{occasion.icon}</div>
                <h3 className="text-lg font-bold text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-300" style={{fontFamily: 'var(--font-almarai)'}}>
                  {occasion.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionsSection;
