interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
  onStepChange: (step: 1 | 2 | 3 | 4) => void;
}

export default function StepIndicator({ currentStep, onStepChange }: StepIndicatorProps) {
  const steps = [
    { n: 1, t: "اختيار الزهور", icon: "/assets/custom-bouquet/اختيار الزهور.svg" },
    { n: 2, t: "الحجم والتغليف", icon: "/assets/custom-bouquet/الحجم والتغليف.svg" },
    { n: 3, t: "لمساتك الخاصة", icon: "/assets/custom-bouquet/لمساتك الخاصة.svg" },
    { n: 4, t: "التوصيل", icon: "/assets/custom-bouquet/التوصيل.svg" },
  ] as const;

  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6 overflow-x-hidden sm:overflow-x-auto pb-2 gap-1 sm:gap-4" dir="rtl">
      {steps.map((s, index) => {
        const isActive = currentStep === s.n;
        const isCompleted = currentStep > s.n;
        const isLast = index === steps.length - 1;

        return (
          <div key={s.n} className="flex items-center flex-shrink-0 flex-1">
            <button
              onClick={() => onStepChange(s.n)}
              className="flex flex-col items-center gap-0.5 sm:gap-2 transition-all w-full group cursor-pointer"
              aria-pressed={isActive}
            >
              {/* Step Circle */}
              <div className="relative">
                <div
                  className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px] rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-[#facd5a] border-2 border-[#facd5a]"
                      : isCompleted
                        ? "bg-white border-2 border-[#5A5E4D]"
                        : "bg-white border-2 border-gray-300 group-hover:border-gray-400"
                  }`}
                >
                  {/* Step Icon */}
                  <img
                    src={s.icon}
                    alt={s.t}
                    className={`w-[26px] h-[26px] sm:w-[35px] sm:h-[35px] lg:w-[40px] lg:h-[40px] object-contain transition-all ${
                      isActive
                        ? s.n === 3
                          ? "opacity-100"
                          : "opacity-100"
                        : isCompleted
                          ? "opacity-100"
                          : "opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                    }`}
                  />
                </div>
              </div>
              {/* Step Label */}
              <span
                className={`text-[12px] sm:text-[16px] font-bold sm:font-normal leading-[16px] sm:leading-[20px] whitespace-nowrap transition-colors text-center ${
                  isActive
                    ? "text-black"
                    : isCompleted
                      ? "text-gray-600"
                      : "text-gray-400"
                }`}
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {s.t}
              </span>
            </button>
            {/* Connecting Dots */}
            {!isLast && (
              <div className="flex items-center mx-0.5 sm:mx-2 gap-1 sm:gap-1 flex-1 justify-center">
                <div
                  className={`w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] lg:w-[13px] lg:h-[13px] rounded-full ${
                    isCompleted || isActive ? "bg-[#5A5E4D]" : "bg-[#d9d9d9]"
                  }`}
                />
                <div
                  className={`w-[7px] h-[7px] sm:w-[8px] sm:h-[8px] lg:w-[10px] lg:h-[10px] rounded-full ${
                    isCompleted || isActive ? "bg-[#5A5E4D]" : "bg-[#d9d9d9]"
                  }`}
                />
                <div
                  className={`w-[6px] h-[6px] sm:w-[6px] sm:h-[6px] lg:w-[8px] lg:h-[8px] rounded-full ${
                    isCompleted || isActive ? "bg-[#5A5E4D]" : "bg-[#d9d9d9]"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
