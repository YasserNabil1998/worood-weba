import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[520px] md:h-[560px] rounded-2xl overflow-hidden shadow-sm">
          {/* Background Image */}
          <img
            src="/images/hero/DIV-19.png"
            alt="متجر زهور"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Single horizontal gradient: right (darker) -> left (transparent) */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/25 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full pr-6 md:pr-10">
              <div className="ml-auto max-w-xl text-right">
                <h1 className="text-[32px] md:text-[56px] font-extrabold text-white mb-4 md:mb-5 leading-[1.15] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] tracking-tight" style={{fontFamily: 'var(--font-almarai)'}}>
                  أجمل الباقات لأجمل
                  <br />
                  المناسبات
                </h1>
                <p className="text-white/85 text-[13px] md:text-[15px] mb-6 md:mb-7 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                  نقدم لكم أرقى تشكيلة من باقات الزهور المميزة والفريدة لجميع المناسبات.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Link
                    href="/bouquets"
                    className="bg-[#555c4c] text-white hover:bg-[#4b5244] px-7 py-3 rounded-[10px] font-bold text-[14px] md:text-[16px] transition-colors text-center shadow-sm border border-white/10"
                    style={{fontFamily: 'var(--font-almarai)'}}
                  >
                    تصفح الباقات
                  </Link>
                  <Link
                    href="/custom"
                    className="bg-white text-[#2d2f2e] hover:bg-white/95 px-7 py-3 rounded-[10px] font-bold text-[14px] md:text-[16px] transition-colors text-center shadow-sm border border-white/90"
                    style={{fontFamily: 'var(--font-almarai)'}}
                  >
                    تنسيق باقة خاصة
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
