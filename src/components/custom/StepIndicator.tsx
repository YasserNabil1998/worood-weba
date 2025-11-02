interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
  onStepChange: (step: 1 | 2 | 3 | 4) => void;
}

export default function StepIndicator({ currentStep, onStepChange }: StepIndicatorProps) {
  const steps = [
    { n: 1, t: "اختيار الزهور" },
    { n: 2, t: "الحجم والتغليف" },
    { n: 3, t: "التخصيص" },
    { n: 4, t: "التوصيل" },
  ] as const;

  return (
    <div className="flex items-center justify-between text-[10px] sm:text-[12px] text-gray-600 mb-3 overflow-x-auto pb-2">
      {steps.map((s) => (
        <button
          key={s.n}
          onClick={() => onStepChange(s.n)}
          className={`flex items-center gap-1 sm:gap-2 px-1 sm:px-4 py-1 rounded-full transition-colors flex-shrink-0 ${
            currentStep === s.n ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50"
          }`}
          aria-pressed={currentStep === s.n}
        >
          <span
            className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-[10px] sm:text-sm ${
              currentStep === s.n ? "bg-[#5A5E4D] text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {s.n}
          </span>
          <span className="whitespace-nowrap">{s.t}</span>
        </button>
      ))}
    </div>
  );
}
