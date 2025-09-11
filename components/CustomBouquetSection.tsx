import Link from 'next/link';

const CustomBouquetSection = () => {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden">
          <img src="/images/hero/DIV-133.png" alt="متجر زهور" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: '#5A5E4D', opacity: 0.08 }}></div>
          <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/15 to-transparent"></div>
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full pr-6 md:pr-10">
              <div className="ml-auto max-w-xl text-right">
                <h2 className="text-[28px] md:text-[48px] font-extrabold text-white mb-4 md:mb-5 leading-[1.15] tracking-tight" style={{ fontFamily: 'var(--font-almarai)' }}>
                  صمم باقتك الخاصة
                </h2>
                <p className="text-white/85 text-[14px] md:text-[16px] mb-6 md:mb-7 leading-relaxed">
                  نساعدك في تصميم باقة فريدة تناسب ذوقك ومناسبتك الخاصة.
                </p>
                <Link
                  href="/custom"
                  className="inline-block bg-white text-gray-900 hover:bg-white/90 px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition-colors shadow"
                  style={{ fontFamily: 'var(--font-almarai)' }}
                >
                  ابدأ التصميم الآن
                </Link>
              </div>
            </div>
          </div>
          {/* Close hero wrapper */}
        </div>
        {/* Close container */}
      </div>
    </section>
  );
};

export default CustomBouquetSection;
