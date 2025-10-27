interface Addon {
  label: string;
  price: number;
}

interface ProductAddonsProps {
  cardAddon: Addon;
  chocolateAddon: Addon;
  giftWrapAddon: Addon;
  currency: string;
  addCard: boolean;
  addChocolate: boolean;
  giftWrap: boolean;
  cardMessage: string;
  onCardToggle: (checked: boolean) => void;
  onChocolateToggle: (checked: boolean) => void;
  onGiftWrapToggle: (checked: boolean) => void;
  onCardMessageChange: (message: string) => void;
}

export default function ProductAddons({
  cardAddon,
  chocolateAddon,
  giftWrapAddon,
  currency,
  addCard,
  addChocolate,
  giftWrap,
  cardMessage,
  onCardToggle,
  onChocolateToggle,
  onGiftWrapToggle,
  onCardMessageChange,
}: ProductAddonsProps) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">
        إضافات اختيارية
      </h3>
      <div className="space-y-1.5">
        {/* بطاقة تهنئة */}
        <label className="flex items-center justify-between p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={addCard}
              onChange={(e) => onCardToggle(e.target.checked)}
              className="w-3.5 h-3.5 text-[#5A5E4D] rounded focus:ring-[#5A5E4D]"
            />
            <span className="text-xs text-gray-700">{cardAddon.label}</span>
          </div>
          <span className="text-xs text-[#5A5E4D] font-medium">
            +{cardAddon.price} {currency}
          </span>
        </label>

        {/* شوكولاتة */}
        <label className="flex items-center justify-between p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={addChocolate}
              onChange={(e) => onChocolateToggle(e.target.checked)}
              className="w-3.5 h-3.5 text-[#5A5E4D] rounded focus:ring-[#5A5E4D]"
            />
            <span className="text-xs text-gray-700">
              {chocolateAddon.label}
            </span>
          </div>
          <span className="text-xs text-[#5A5E4D] font-medium">
            +{chocolateAddon.price} {currency}
          </span>
        </label>

        {/* تغليف هدية */}
        <label className="flex items-center justify-between p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={giftWrap}
              onChange={(e) => onGiftWrapToggle(e.target.checked)}
              className="w-3.5 h-3.5 text-[#5A5E4D] rounded focus:ring-[#5A5E4D]"
            />
            <span className="text-xs text-gray-700">{giftWrapAddon.label}</span>
          </div>
          <span className="text-xs text-[#5A5E4D] font-medium">
            +{giftWrapAddon.price} {currency}
          </span>
        </label>
      </div>

      {/* رسالة البطاقة */}
      {addCard && (
        <div className="mt-2 animate-fadeIn">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            رسالة البطاقة
          </label>
          <textarea
            value={cardMessage}
            onChange={(e) => onCardMessageChange(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="w-full px-2.5 py-2 border border-gray-300 rounded-lg focus:border-[#5A5E4D] focus:ring-1 focus:ring-[#5A5E4D] transition-all resize-none text-xs"
            rows={2}
          />
        </div>
      )}
    </div>
  );
}
