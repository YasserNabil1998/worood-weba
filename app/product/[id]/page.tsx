'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  currency: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'مزهرية زهور حمراء أنيقة',
    price: 490,
    image: '/images/Products/Products-5.jpg',
    images: [
      '/images/Products/Products-5.jpg',
      '/images/Products/Products-6.jpg',
      '/images/Products/Products-4.jpg',
      '/images/Products/Products-3.jpg',
    ],
    description: 'باقة رائعة من الورود الطازجة بألوان متنوعة، مرتبة بعناية فائقة لتعبر عن مشاعركم. تحتوي على مجموعة مختارة من أجود أنواع الورود مع أوراق خضراء طبيعية. مناسبة لجميع المناسبات السعيدة.',
    currency: 'ر.س'
  },
  {
    id: 2,
    title: 'مزهرية الكمال الوردي',
    price: 665,
    image: '/images/Products/Products-6.jpg',
    images: [
      '/images/Products/Products-6.jpg',
      '/images/Products/Products-5.jpg',
      '/images/Products/Products-4.jpg',
      '/images/Products/Products-3.jpg',
    ],
    description: 'تشكيلة فاخرة من الورود الوردية والبيضاء، منسقة بأسلوب عصري أنيق. مثالية للتعبير عن الحب والتقدير في المناسبات الخاصة.',
    currency: 'ر.س'
  },
  {
    id: 3,
    title: 'مزهرية زهور فاخرة',
    price: 585,
    image: '/images/Products/Products-4.jpg',
    images: [
      '/images/Products/Products-4.jpg',
      '/images/Products/Products-5.jpg',
      '/images/Products/Products-6.jpg',
      '/images/Products/Products-3.jpg',
    ],
    description: 'باقة ورود متنوعة الألوان بتنسيق احترافي، تجمع بين الجمال والأناقة. مناسبة لكل المناسبات السعيدة.',
    currency: 'ر.س'
  },
  {
    id: 4,
    title: 'فازة حوري الجمال الدافئ | 30 زهرة',
    price: 429,
    image: '/images/Products/Products-3.jpg',
    images: [
      '/images/Products/Products-3.jpg',
      '/images/Products/Products-4.jpg',
      '/images/Products/Products-5.jpg',
      '/images/Products/Products-6.jpg',
    ],
    description: 'تشكيلة دافئة من الورود بألوان الخريف الجميلة، تحتوي على 30 زهرة منسقة بعناية فائقة.',
    currency: 'ر.س'
  },
  {
    id: 5,
    title: 'باقة الورد الأحمر الفاخرة',
    price: 550,
    image: '/images/Products/Products-1.jpg',
    images: [
      '/images/Products/Products-1.jpg',
      '/images/Products/Products-2.jpg',
      '/images/Products/Products-3.jpg',
      '/images/Products/Products-4.jpg',
    ],
    description: 'باقة ورود حمراء فاخرة معبرة عن الحب والعاطفة، مرتبة بأسلوب راقي ومميز.',
    currency: 'ر.س'
  },
  {
    id: 6,
    title: 'مزهرية الزهور المميزة',
    price: 720,
    image: '/images/Products/Products-2.jpg',
    images: [
      '/images/Products/Products-2.jpg',
      '/images/Products/Products-1.jpg',
      '/images/Products/Products-3.jpg',
      '/images/Products/Products-4.jpg',
    ],
    description: 'تشكيلة مميزة من أجمل الورود، منسقة بطريقة احترافية لتناسب الأذواق الراقية.',
    currency: 'ر.س'
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find(p => p.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [addCard, setAddCard] = useState(false);
  const [cardMessage, setCardMessage] = useState('');
  const [addChocolate, setAddChocolate] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>المنتج غير موجود</div>;
  }

  const addToCart = () => {
    if (typeof window !== 'undefined') {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: quantity,
          image: product.image,
          size: selectedSize,
          addCard,
          cardMessage,
          addChocolate,
          giftWrap
        };
        
        const existingIndex = cart.findIndex((item: any) => item.id === product.id);
        if (existingIndex >= 0) {
          cart[existingIndex].quantity += quantity;
        } else {
          cart.push(cartItem);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        
        const notification = document.createElement('div');
        notification.textContent = 'تم إضافة المنتج إلى السلة';
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg z-50 shadow-lg';
        notification.style.fontFamily = 'var(--font-almarai)';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      } catch (error) {
        console.error('خطأ:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Gallery - Right Side */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                    selectedImage === idx ? 'ring-2 ring-[#5A5E4D]' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
        </div>

          {/* Main Image - Center */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#F5F3ED]">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

          {/* Product Info - Left Side */}
          <div className="lg:col-span-5 order-3 space-y-6" dir="rtl">
              <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-almarai)' }}>
                      {product.currency}
                    </span>
                    <span className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'var(--font-almarai)' }}>
                      {product.price}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'var(--font-almarai)' }}>
                    الأسعار شاملة الضرائب
                  </span>
                </div>
                
                <div className="flex items-center gap-2 bg-[#5A5E4D] text-white px-3 py-2 rounded-lg" style={{ fontFamily: 'var(--font-almarai)' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                  <div className="text-xs text-right">
                    <div className="font-bold">اربح 508</div>
                    <div className="text-[10px]">من نقاط الولاء</div>
                  </div>
                </div>
              </div>

              <h1 className="text-xl font-bold text-gray-800 mb-4 text-right" style={{ fontFamily: 'var(--font-almarai)' }}>
                {product.title}
              </h1>
              </div>



            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="w-full bg-[#5A5E4D] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#5A5E4D] transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: 'var(--font-almarai)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              أضف إلى سلة التسوق
            </button>

            {/* Features */}
            <div className="bg-[#F9F9F9] rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#5A5E4D]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm mb-1" style={{ fontFamily: 'var(--font-almarai)' }}>
                    ليست بحاجة لمزهرية العنوان
                  </h4>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-almarai)' }}>
                    فريقنا سيفعل ذلك نيابة عنك
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#5A5E4D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm mb-1" style={{ fontFamily: 'var(--font-almarai)' }}>
                    توصيل سريع
                  </h4>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-almarai)' }}>
                    اطلبها الآن وسنقوم بتوصيلها في خلال 90 دقيقة
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#5A5E4D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm mb-1" style={{ fontFamily: 'var(--font-almarai)' }}>
                    أجود أنواع الزهور
                  </h4>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-almarai)' }}>
                    منتقاة من أفضل المزارع
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#5A5E4D]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm mb-1" style={{ fontFamily: 'var(--font-almarai)' }}>
                    توصيل مجاني
                  </h4>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'var(--font-almarai)' }}>
                    على الطلبات بقيمة أكثر من ريس 400
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <img src="/images/Products/fmaster.svg" alt="Mastercard" className="h-6" />
                  <img src="/images/Products/ApplePay3x.png" alt="Apple Pay" className="h-6" />
                  <img src="/images/Products/fvisa.svg" alt="Visa" className="h-6" />
                  <img src="/images/Products/fpaypala.svg" alt="PayPal" className="h-6" />
                  <img src="/images/Products/fMadaa.svg" alt="mada" className="h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-800">
                  طرق الدفع
                </h3>
              </div>
              
              {/* Tamara */}
              <div className="border-t border-gray-200 pt-4 mb-4 flex items-center gap-3">
                <Link href="#" className="text-xs text-[#5A5E4D] underline whitespace-nowrap">
                  لمعرفة المزيد
                </Link>
                <p className="text-xs text-gray-700 flex-1 text-right">
                  قسمها على 4 دفعات مع تمارا
                </p>
                <img src="/images/Products/TamaraARColored.png" alt="Tamara" className="h-5" />
              </div>

              {/* Tabby */}
              <div className="border-t border-gray-200 pt-4 flex items-center gap-3">
                <Link href="#" className="text-xs text-[#5A5E4D] underline whitespace-nowrap">
                  لمعرفة المزيد
                </Link>
                <p className="text-xs text-gray-700 flex-1 text-right">
                  أو قسمها على 4 دفعات شهرية بقيمة SAR 146.25
                </p>
                <img src="/images/Products/tabby-badge.png" alt="Tabby" className="h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Description Tabs */}
        <div className="mt-12" dir="rtl">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-gray-800 font-bold text-gray-800">
                الوصف
              </button>
              <button className="pb-4 font-medium text-gray-500 hover:text-gray-800">
                نصائح للعناية
              </button>
            </div>
          </div>

          <div className="mt-8 text-right">
            <p className="text-sm text-gray-700 leading-[1.8] mb-6">
              اجعل لحظاتك أكثر جمالاً مع تنسيق زهور يعكس مشاعر الحب والتقدير بألوان نابضة بالحياة. تجمع هذه الهدية بين الكارنيشن الوردي الذي يرمز
              إلى الإعجاب والاهتمام، والجوري البرتقالي الذي يعبر عن الدفء والحيوية، مع جوري برتقالي فاتح يضيف لمسة من الرقة. كل زهرة منتقاة
              بعناية لتشكل تنسيقاً مميزاً يبرز أي مساحة بأناقة. تُقدم هذه الزهور في مزهرية سيراميك أنيقة، مما يجعلها هدية مثالية للمناسبات
              الخاصة أو لإضافة جو من الجمال والفرح. مع هذه الهدية تعكس ذوقك واهتمامك بالتفاصيل.
            </p>

            <h3 className="text-base font-bold text-gray-800 mb-4">
              محتويات التنسيق:
            </h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
                <span>كارنيشن وردي: 20</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
                <span>جوري برتقالي: 15</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
                <span>جوري برتقالي فاتح: 13</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
