import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Sample user data
const userData = {
  name: "أحمد محمد",
  email: "ahmed@example.com",
  phone: "+966501234567",
  joinDate: "يناير 2024",
  totalOrders: 12,
  totalSpent: 2450
};

// Sample orders data
const orders = [
  {
    id: "ORD-001",
    date: "15 ديسمبر 2024",
    status: "تم التسليم",
    total: 120,
    items: [
      { name: "باقة الورود الحمراء الكلاسيكية", quantity: 1, price: 120, productId: 1 }
    ],
    tracking: [
      { status: "تم الطلب", date: "15 ديسمبر 2024", time: "10:30 ص" },
      { status: "قيد التحضير", date: "15 ديسمبر 2024", time: "11:00 ص" },
      { status: "قيد التوصيل", date: "15 ديسمبر 2024", time: "2:00 م" },
      { status: "تم التسليم", date: "15 ديسمبر 2024", time: "4:30 م" }
    ]
  },
  {
    id: "ORD-002",
    date: "10 ديسمبر 2024",
    status: "قيد التوصيل",
    total: 95,
    items: [
      { name: "باقة الورود المختلطة", quantity: 1, price: 95, productId: 2 }
    ],
    tracking: [
      { status: "تم الطلب", date: "10 ديسمبر 2024", time: "9:15 ص" },
      { status: "قيد التحضير", date: "10 ديسمبر 2024", time: "9:45 ص" },
      { status: "قيد التوصيل", date: "10 ديسمبر 2024", time: "1:30 م" }
    ]
  },
  {
    id: "ORD-003",
    date: "5 ديسمبر 2024",
    status: "تم التسليم",
    total: 200,
    items: [
      { name: "أناقة الورود البيضاء", quantity: 1, price: 110, productId: 3 },
      { name: "باقة الورود المختلطة", quantity: 1, price: 90, productId: 2 }
    ],
    tracking: [
      { status: "تم الطلب", date: "5 ديسمبر 2024", time: "2:00 م" },
      { status: "قيد التحضير", date: "5 ديسمبر 2024", time: "2:30 م" },
      { status: "قيد التوصيل", date: "5 ديسمبر 2024", time: "5:00 م" },
      { status: "تم التسليم", date: "5 ديسمبر 2024", time: "7:00 م" }
    ]
  }
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3E6D8] to-[#D1D6C4]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-[#5A5E4D] rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold" style={{fontFamily:'var(--font-almarai)'}}>
                  {userData.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 text-center md:text-right">
                <h1 className="text-3xl font-bold text-[#5A5E4D] mb-2" style={{fontFamily:'var(--font-almarai)'}}>
                  {userData.name}
                </h1>
                <p className="text-gray-600 mb-1" style={{fontFamily:'var(--font-almarai)'}}>
                  {userData.email}
                </p>
                <p className="text-gray-600 mb-4" style={{fontFamily:'var(--font-almarai)'}}>
                  {userData.phone}
                </p>
                <div className="flex justify-center md:justify-start gap-6 text-sm text-gray-500">
                  <span style={{fontFamily:'var(--font-almarai)'}}>
                    عضو منذ {userData.joinDate}
                  </span>
                  <span style={{fontFamily:'var(--font-almarai)'}}>
                    {userData.totalOrders} طلب
                  </span>
                  <span style={{fontFamily:'var(--font-almarai)'}}>
                    {userData.totalSpent} ريال
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#5A5E4D] mb-6" style={{fontFamily:'var(--font-almarai)'}}>
              طلباتي
            </h2>
            
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1" style={{fontFamily:'var(--font-almarai)'}}>
                        طلب #{order.id}
                      </h3>
                      <p className="text-gray-600 text-sm" style={{fontFamily:'var(--font-almarai)'}}>
                        {order.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'تم التسليم' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'قيد التوصيل'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`} style={{fontFamily:'var(--font-almarai)'}}>
                        {order.status}
                      </span>
                      <span className="text-lg font-bold text-[#5A5E4D]" style={{fontFamily:'var(--font-almarai)'}}>
                        {order.total} ريال
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2" style={{fontFamily:'var(--font-almarai)'}}>
                      المنتجات:
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => {
                        // صور ورود مختلفة حسب نوع المنتج
                        const getProductImage = (productId: number) => {
                          switch(productId) {
                            case 1: return "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=48&h=48&fit=crop&crop=center";
                            case 2: return "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=48&h=48&fit=crop&crop=center";
                            case 3: return "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=48&h=48&fit=crop&crop=center";
                            default: return "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=48&h=48&fit=crop&crop=center";
                          }
                        };
                        
                        return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={getProductImage(item.productId)}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1">
                            <Link 
                              href={`/product/${item.productId}`}
                              className="text-sm font-medium text-[#5A5E4D] hover:text-[#4A4E3D] transition-colors"
                              style={{fontFamily:'var(--font-almarai)'}}
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-500" style={{fontFamily:'var(--font-almarai)'}}>
                              الكمية: {item.quantity}
                            </p>
                          </div>
                          <div className="text-sm font-semibold text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>
                            {item.price} ريال
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tracking */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3" style={{fontFamily:'var(--font-almarai)'}}>
                      تتبع الطلب:
                    </h4>
                    <div className="space-y-2">
                      {order.tracking.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            index === order.tracking.length - 1 
                              ? 'bg-green-500' 
                              : 'bg-gray-300'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800" style={{fontFamily:'var(--font-almarai)'}}>
                              {step.status}
                            </p>
                            <p className="text-xs text-gray-500" style={{fontFamily:'var(--font-almarai)'}}>
                              {step.date} - {step.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#5A5E4D] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{fontFamily:'var(--font-almarai)'}}>
                تعديل الملف الشخصي
              </h3>
              <p className="text-sm text-gray-600" style={{fontFamily:'var(--font-almarai)'}}>
                تحديث معلوماتك الشخصية
              </p>
            </button>

            <button className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#5A5E4D] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{fontFamily:'var(--font-almarai)'}}>
                المفضلة
              </h3>
              <p className="text-sm text-gray-600" style={{fontFamily:'var(--font-almarai)'}}>
                المنتجات المفضلة لديك
              </p>
            </button>

            <button className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#5A5E4D] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{fontFamily:'var(--font-almarai)'}}>
                المساعدة
              </h3>
              <p className="text-sm text-gray-600" style={{fontFamily:'var(--font-almarai)'}}>
                مركز المساعدة والدعم
              </p>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
