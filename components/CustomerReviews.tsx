import type { ReviewItem } from '../types';

type CustomerReviewsProps = {
  reviews?: ReviewItem[];
  isLoading?: boolean;
};

const defaultReviews: ReviewItem[] = [
    {
      id: 1,
      name: 'سارة أحمد',
      rating: 5,
      comment: 'باقات رائعة وخدمة ممتازة وصلت الباقة في الوقت المحدد وكانت أجمل مما توقعت.'
    },
    {
      id: 2,
      name: 'محمد علي',
      rating: 5,
      comment: 'أهديت زوجتي باقة من تنسيقي الخاص وكانت سعيدة جدا بها سأكرر التجربة مرة أخرى.'
    },
    {
      id: 3,
      name: 'نورة خالد',
      rating: 5,
      comment: 'جودة الورود ممتازة والتغليف راقي جدا أنصح الجميع بالتعامل معهم'
    }
];

const CustomerReviews = ({ reviews = defaultReviews, isLoading = false }: CustomerReviewsProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: 'var(--font-almarai)'}}>
            آراء عملائنا
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading && (
            <div className="col-span-full text-center text-gray-600" style={{fontFamily:'var(--font-almarai)'}}>جاري التحميل...</div>
          )}
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2" style={{fontFamily: 'var(--font-almarai)'}}>{review.name}</h3>
                  <div className="flex items-center mb-3">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm" style={{fontFamily: 'var(--font-almarai)'}}>
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
