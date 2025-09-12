import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import FavoriteButton from '@/components/FavoriteButton';
import QuantitySelector from '@/components/QuantitySelector';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Product data structure
interface Product {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  tags: string[];
  isPopular: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
  features: string[];
  careInstructions: string[];
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Red Rose Bouquet",
    nameAr: "باقة الورود الحمراء الكلاسيكية",
    description: "باقة رائعة من الورود الحمراء الطازجة، مثالية للتعبير عن الحب والعاطفة. تحتوي على 12 وردة حمراء فاخرة مع أوراق خضراء طبيعية.",
    price: 120,
    originalPrice: 150,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop&crop=center"
    ],
    category: "الورود الحمراء",
    tags: ["رومانسية", "زفاف", "عيد الحب"],
    isPopular: true,
    inStock: true,
    rating: 4.8,
    reviews: 156,
    features: [
      "12 وردة حمراء طازجة",
      "تغليف فاخر",
      "شريط حريري",
      "بطاقة تهنئة مجانية"
    ],
    careInstructions: [
      "قص السيقان بزاوية 45 درجة",
      "غير الماء كل يومين",
      "تجنب أشعة الشمس المباشرة",
      "أزل الأوراق المغمورة في الماء"
    ]
  },
  {
    id: 2,
    name: "Mixed Rose Bouquet",
    nameAr: "باقة الورود المختلطة",
    description: "باقة جميلة من الورود بألوان متدرجة، تجمع بين الأحمر والوردي والأبيض. مثالية للاحتفالات والمناسبات الخاصة.",
    price: 95,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop&crop=center"
    ],
    category: "الورود المختلطة",
    tags: ["احتفال", "تهنئة", "هدية"],
    isPopular: false,
    inStock: true,
    rating: 4.6,
    reviews: 89,
    features: [
      "8 ورود مختلطة الألوان",
      "تنسيق احترافي",
      "ورق تغليف شفاف",
      "شريط ذهبي"
    ],
    careInstructions: [
      "قص السيقان تحت الماء الجاري",
      "استخدم مغذيات الزهور",
      "غير الماء كل يوم",
      "احتفظ في مكان بارد"
    ]
  },
  {
    id: 3,
    name: "White Rose Elegance",
    nameAr: "أناقة الورود البيضاء",
    description: "باقة أنيقة من الورود البيضاء النقية، ترمز للنقاء والبراءة. مثالية لحفلات الزفاف والمناسبات الرسمية.",
    price: 110,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop&crop=center"
    ],
    category: "الورود البيضاء",
    tags: ["زفاف", "نقاء", "أناقة"],
    isPopular: true,
    inStock: true,
    rating: 4.9,
    reviews: 203,
    features: [
      "10 ورود بيضاء نقية",
      "تغليف كلاسيكي",
      "شريط أبيض حريري",
      "صندوق هدايا فاخر"
    ],
    careInstructions: [
      "قص السيقان بزاوية حادة",
      "استخدم ماء نظيف",
      "تجنب المسودات",
      "غير الماء كل يومين"
    ]
  }
];

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3E6D8] to-[#D1D6C4]">
      <Header />
      
      {/* Breadcrumb */}
      <section className="py-4 bg-white/50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 space-x-reverse text-sm" style={{fontFamily:'var(--font-almarai)'}}>
            <Link href="/" className="text-gray-600 hover:text-[#5A5E4D]">الرئيسية</Link>
            <span className="text-gray-400">/</span>
            <Link href="/bouquets" className="text-gray-600 hover:text-[#5A5E4D]">الباقات</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#5A5E4D] font-medium">{product.nameAr}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
                <Image
                  src={product.image}
                  alt={product.nameAr}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.isPopular && (
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-sm font-semibold text-[#5A5E4D]" style={{fontFamily:'var(--font-almarai)'}}>
                      الأكثر شهرة
                    </span>
                  </div>
                )}
                <button className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                    <Image
                      src={image}
                      alt={`${product.nameAr} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product Title & Rating */}
              <div>
                <h1 className="text-3xl font-bold text-[#5A5E4D] mb-2" style={{fontFamily:'var(--font-almarai)'}}>
                  {product.nameAr}
                </h1>
                <p className="text-lg text-gray-600 mb-4" style={{fontFamily:'var(--font-almarai)'}}>
                  {product.name}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600" style={{fontFamily:'var(--font-almarai)'}}>
                      {product.rating} ({product.reviews} تقييم)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[#5A5E4D]" style={{fontFamily:'var(--font-almarai)'}}>
                  {product.price} ريال
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through" style={{fontFamily:'var(--font-almarai)'}}>
                    {product.originalPrice} ريال
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3" style={{fontFamily:'var(--font-almarai)'}}>
                  الوصف
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{fontFamily:'var(--font-almarai)'}}>
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3" style={{fontFamily:'var(--font-almarai)'}}>
                  المميزات
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600" style={{fontFamily:'var(--font-almarai)'}}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3" style={{fontFamily:'var(--font-almarai)'}}>
                  التاغات
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm" style={{fontFamily:'var(--font-almarai)'}}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700" style={{fontFamily:'var(--font-almarai)'}}>
                    الكمية:
                  </span>
                  <QuantitySelector />
                </div>
                
                <div className="flex gap-4">
                  <AddToCartButton
                    productId={product.id.toString()}
                    productName={product.nameAr}
                    productPrice={product.price}
                    productImage={product.image}
                  />
                  <FavoriteButton productId={product.id.toString()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Instructions */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#5A5E4D] mb-8 text-center" style={{fontFamily:'var(--font-almarai)'}}>
              تعليمات العناية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.careInstructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-[#5A5E4D] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700" style={{fontFamily:'var(--font-almarai)'}}>
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
