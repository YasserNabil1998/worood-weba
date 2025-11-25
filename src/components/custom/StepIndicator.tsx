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
    <div
      className="flex items-center justify-between mb-4 sm:mb-6 overflow-x-hidden sm:overflow-x-auto pb-2 gap-1 sm:gap-4 pt-4 sm:pt-6 lg:pt-8 overflow-y-hidden"
      dir="rtl"
    >
      {steps.map((s) => {
        const isActive = currentStep === s.n;
        const isCompleted = currentStep > s.n;

        return (
          <div key={s.n} className="flex items-center flex-shrink-0 flex-1">
            <button
              onClick={() => onStepChange(s.n)}
              className="flex flex-col items-center gap-0.5 sm:gap-2 transition-all w-full group cursor-pointer"
              aria-pressed={isActive}
            >
              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                {/* Sunbeam rays - only for active step */}
                {isActive && (
                  <>
                    {/* Mobile rays */}
                    <div
                      className="absolute pointer-events-none z-20 w-[100px] h-[100px] sm:hidden"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {Array.from({ length: 9 }).map((_, index) => {
                        const startAngle = -126;
                        const endAngle = 126;
                        const totalAngle = endAngle - startAngle;
                        const angleStep = totalAngle / (9 - 1);
                        const angle = startAngle + index * angleStep;
                        const angleRad = (angle * Math.PI) / 180;
                        const distanceFromCenter = 30;
                        const x = Math.sin(angleRad) * distanceFromCenter;
                        const y = -Math.cos(angleRad) * distanceFromCenter;

                        return (
                          <div
                            key={index}
                            className="absolute w-[2px] h-[12px] bg-[#facd5a] rounded-full"
                            style={{
                              left: "50%",
                              top: "50%",
                              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                              transformOrigin: "center",
                              opacity: 0.95,
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Tablet rays */}
                    <div
                      className="hidden sm:block lg:hidden absolute pointer-events-none z-20 w-[140px] h-[140px]"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {Array.from({ length: 9 }).map((_, index) => {
                        const startAngle = -126;
                        const endAngle = 126;
                        const totalAngle = endAngle - startAngle;
                        const angleStep = totalAngle / (9 - 1);
                        const angle = startAngle + index * angleStep;
                        const angleRad = (angle * Math.PI) / 180;
                        const distanceFromCenter = 55;
                        const x = Math.sin(angleRad) * distanceFromCenter;
                        const y = -Math.cos(angleRad) * distanceFromCenter;

                        return (
                          <div
                            key={index}
                            className="absolute w-[2.5px] h-[18px] bg-[#facd5a] rounded-full"
                            style={{
                              left: "50%",
                              top: "50%",
                              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                              transformOrigin: "center",
                              opacity: 0.95,
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Desktop rays */}
                    <div
                      className="hidden lg:block absolute pointer-events-none z-20 w-[160px] h-[160px]"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {Array.from({ length: 9 }).map((_, index) => {
                        const startAngle = -126;
                        const endAngle = 126;
                        const totalAngle = endAngle - startAngle;
                        const angleStep = totalAngle / (9 - 1);
                        const angle = startAngle + index * angleStep;
                        const angleRad = (angle * Math.PI) / 180;
                        const distanceFromCenter = 60; 
                        const x = Math.sin(angleRad) * distanceFromCenter;
                        const y = -Math.cos(angleRad) * distanceFromCenter;

                        return (
                          <div
                            key={index}
                            className="absolute w-[3px] h-[20px] bg-[#facd5a] rounded-full"
                            style={{
                              left: "50%",
                              top: "50%",
                              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                              transformOrigin: "center",
                              opacity: 0.95,
                            }}
                          />
                        );
                      })}
                    </div>
                  </>
                )}
                <div
                  className={`w-[44px] h-[44px] sm:w-[76px] sm:h-[76px] lg:w-[88px] lg:h-[88px] rounded-full flex items-center justify-center transition-all relative z-10 ${
                    isActive
                      ? "bg-[#facd5a] border-2 border-[#facd5a]"
                      : isCompleted
                        ? "bg-white border-2 border-gray-300"
                        : "bg-white border-2 border-gray-300 group-hover:border-gray-400"
                  }`}
                >
                  {/* Step Icon or Checkmark */}
                  {isCompleted ? (
                    <svg
                      className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] lg:w-[36px] lg:h-[36px] flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                        fill="#5A5E4D"
                      />
                    </svg>
                  ) : (
                    <img
                      src={s.icon}
                      alt={s.t}
                      className="w-[30px] h-[30px] sm:w-[42px] sm:h-[42px] lg:w-[48px] lg:h-[48px] object-contain transition-all flex-shrink-0"
                      style={{
                        filter: "none",
                        opacity: 1,
                      }}
                    />
                  )}
                </div>
              </div>
              {/* Step Label */}
              <span
                className={`text-[12px] sm:text-[16px] font-bold sm:font-normal leading-[16px] sm:leading-[20px] whitespace-nowrap transition-colors text-center ${
                  isActive ? "text-black" : isCompleted ? "text-gray-600" : "text-gray-400"
                }`}
                style={{ fontFamily: "var(--font-almarai)" }}
              >
                {s.t}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
