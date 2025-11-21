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
    <div className="flex items-center justify-between mb-4 sm:mb-6 overflow-x-auto pb-2 gap-2 sm:gap-4" dir="rtl">
      {steps.map((s, index) => {
        const isActive = currentStep === s.n;
        const isCompleted = currentStep > s.n;
        const isLast = index === steps.length - 1;

        return (
          <div key={s.n} className="flex items-center flex-shrink-0">
            <button
              onClick={() => onStepChange(s.n)}
              className="flex flex-col items-center gap-1 sm:gap-2 transition-all"
              aria-pressed={isActive}
            >
              {/* Step Circle */}
              <div className="relative">
                <div
                  className={`w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[93px] lg:h-[93px] rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-[#facd5a] border-2 border-[#facd5a]"
                      : isCompleted
                        ? "bg-[#5A5E4D] border-2 border-[#5A5E4D]"
                        : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {/* Step Icon */}
                  <img
                    src={s.icon}
                    alt={s.t}
                    className={`w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[45px] lg:h-[45px] object-contain transition-all ${
                      isActive
                        ? "opacity-100"
                        : isCompleted
                          ? "opacity-100 brightness-0 invert"
                          : "opacity-60 grayscale"
                    }`}
                  />
                </div>
              </div>
              {/* Step Label */}
              <span
                className={`text-[12px] sm:text-[14px] lg:text-[16px] whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-black font-semibold"
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
              <div className="flex items-center mx-1 sm:mx-2 gap-0.5 sm:gap-1">
                <div
                  className={`w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] lg:w-[13px] lg:h-[13px] rounded-full ${
                    isCompleted || isActive ? "bg-[#5A5E4D]" : "bg-[#d9d9d9]"
                  }`}
                />
                <div
                  className={`w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] lg:w-[10px] lg:h-[10px] rounded-full ${
                    isCompleted || isActive ? "bg-[#5A5E4D]" : "bg-[#d9d9d9]"
                  }`}
                />
                <div
                  className={`w-[4px] h-[4px] sm:w-[6px] sm:h-[6px] lg:w-[8px] lg:h-[8px] rounded-full ${
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
