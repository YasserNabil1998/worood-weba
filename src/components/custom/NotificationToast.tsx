interface NotificationToastProps {
  message: string;
  visible: boolean;
}

export default function NotificationToast({ message, visible }: NotificationToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 py-2 sm:py-3 bg-[#5A5E4D] text-white rounded-lg shadow-lg text-xs sm:text-sm max-w-[90%] sm:max-w-none text-center">
      {message}
    </div>
  );
}
