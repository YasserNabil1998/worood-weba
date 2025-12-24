import Link from "next/link";
import { Heart } from "lucide-react";

export default function ProfileQuickActions() {

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Orders Link */}
      <Link
        href="/orders"
        className="group bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#5A5E4D]/20"
      >
        <div className="w-14 h-14 bg-[#5A5E4D] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3
          className="font-bold text-gray-800 mb-2 text-lg group-hover:text-[#5A5E4D] transition-colors duration-300"
        >
          طلباتي
        </h3>
        <p
          className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
        >
          عرض جميع طلباتي
        </p>
      </Link>

      {/* Favorites Link */}
      <Link
        href="/favorites"
        className="group bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#5A5E4D]/20"
      >
        <div className="w-14 h-14 bg-[#5A5E4D] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Heart className="w-7 h-7 text-white" />
        </div>
        <h3
          className="font-bold text-gray-800 mb-2 text-lg group-hover:text-[#5A5E4D] transition-colors duration-300"
        >
          المفضلة
        </h3>
        <p
          className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
        >
          المنتجات المفضلة لديك
        </p>
      </Link>

      {/* Contact Link */}
      <Link
        href="/contact"
        className="group bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#5A5E4D]/20"
      >
        <div className="w-14 h-14 bg-[#5A5E4D] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3
          className="font-bold text-gray-800 mb-2 text-lg group-hover:text-[#5A5E4D] transition-colors duration-300"
        >
          تواصل معنا
        </h3>
        <p
          className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
        >
          مركز المساعدة والدعم
        </p>
      </Link>
    </div>
  );
}
