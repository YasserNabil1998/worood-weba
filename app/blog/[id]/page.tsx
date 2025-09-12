import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Blog data structure
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
  tags: string[];
}

// Sample blog data (same as in main blog page)
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "أفضل أنواع الورود للزفاف",
    excerpt: "اكتشف أجمل أنواع الورود التي تناسب حفلات الزفاف وتضفي لمسة رومانسية على يومك المميز",
    content: `
      <p>الورود هي رمز الحب والرومانسية، ولا يوجد مكان أفضل لتظهر جمالها من حفلات الزفاف. في هذا المقال، سنستكشف أفضل أنواع الورود التي تناسب مناسبات الزفاف.</p>
      
      <h3>الورود الحمراء الكلاسيكية</h3>
      <p>الورود الحمراء هي الخيار الأكثر شعبية لحفلات الزفاف. تمثل الحب والعاطفة العميقة، وتضفي لمسة رومانسية لا تُنسى على اليوم المميز.</p>
      
      <h3>الورود البيضاء النقية</h3>
      <p>تمثل الورود البيضاء النقاء والبراءة، وهي مثالية للعروس. يمكن استخدامها وحدها أو مع ألوان أخرى لإنشاء تركيبات جميلة.</p>
      
      <h3>الورود الوردية الرقيقة</h3>
      <p>تضفي الورود الوردية لمسة من الأنوثة والرقة على باقة العروس. تأتي بدرجات مختلفة من الوردي، مما يسمح بإنشاء تركيبات متناسقة.</p>
      
      <h3>نصائح لاختيار الورود المناسبة</h3>
      <ul>
        <li>اختر الورود الطازجة والكثيفة</li>
        <li>تأكد من تناسق الألوان مع ديكور الحفل</li>
        <li>فكر في الموسم والطقس</li>
        <li>استشر خبير الورود للحصول على أفضل النتائج</li>
      </ul>
    `,
    author: "فريق شمس للورود",
    date: "15 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&h=800&fit=crop&crop=center",
    category: "الزفاف",
    readTime: "5 دقائق",
    tags: ["ورود", "زفاف", "رومانسية"]
  },
  {
    id: 2,
    title: "كيفية العناية بالورود في المنزل",
    excerpt: "نصائح مهمة للحفاظ على جمال الورود وطول عمرها في منزلك",
    content: `
      <p>العناية بالورود في المنزل تتطلب معرفة بعض الأساسيات المهمة. في هذا المقال، سنشارك معك أفضل النصائح للحفاظ على جمال ورودك.</p>
      
      <h3>الري الصحيح</h3>
      <p>الورود تحتاج إلى ري منتظم ولكن ليس مفرط. تأكد من أن التربة رطبة وليس مبللة، وازرع الورود في تربة جيدة التصريف.</p>
      
      <h3>التعرض للشمس</h3>
      <p>معظم أنواع الورود تحتاج إلى 6-8 ساعات من أشعة الشمس المباشرة يومياً. اختر مكاناً مشمساً في حديقتك أو شرفتك.</p>
      
      <h3>التسميد</h3>
      <p>استخدم سماداً متوازناً يحتوي على النيتروجين والفوسفور والبوتاسيوم. قم بالتسميد في الربيع والصيف.</p>
    `,
    author: "خبير النباتات",
    date: "12 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=center",
    category: "العناية",
    readTime: "7 دقائق",
    tags: ["عناية", "نباتات", "منزل"]
  },
  {
    id: 3,
    title: "تاريخ الورود في الثقافة العربية",
    excerpt: "رحلة عبر التاريخ لاستكشاف مكانة الورود في التراث العربي",
    content: `
      <p>للورود مكانة خاصة في الثقافة العربية منذ القدم. في هذا المقال، سنستكشف تاريخ الورود في التراث العربي.</p>
      
      <h3>الورود في الشعر العربي</h3>
      <p>استخدم الشعراء العرب الورود كرمز للحب والجمال في قصائدهم. من المتنبي إلى نزار قباني، كانت الورود مصدر إلهام لا ينضب.</p>
      
      <h3>الورود في الطب التقليدي</h3>
      <p>استخدم العرب القدماء الورود في الطب التقليدي، حيث استخرجوا منها الزيوت والمراهم لعلاج العديد من الأمراض.</p>
    `,
    author: "د. أحمد الثقافي",
    date: "10 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&h=800&fit=crop&crop=center",
    category: "ثقافة",
    readTime: "8 دقائق",
    tags: ["تاريخ", "ثقافة", "تراث"]
  },
  {
    id: 4,
    title: "ألوان الورود ومعانيها",
    excerpt: "تعرف على معاني الألوان المختلفة للورود وكيفية اختيار الأنسب",
    content: `
      <p>كل لون من ألوان الورود يحمل معنى خاصاً. في هذا المقال، سنستكشف معاني الألوان المختلفة.</p>
      
      <h3>الورود الحمراء</h3>
      <p>تمثل الحب والعاطفة العميقة. مثالية للتعبير عن المشاعر الرومانسية.</p>
      
      <h3>الورود البيضاء</h3>
      <p>ترمز إلى النقاء والبراءة والسلام. مناسبة للمناسبات الرسمية.</p>
      
      <h3>الورود الوردية</h3>
      <p>تعبير عن الامتنان والأنوثة والرقة. مناسبة للأصدقاء والعائلة.</p>
    `,
    author: "مستشار الورود",
    date: "8 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=center",
    category: "معاني",
    readTime: "6 دقائق",
    tags: ["ألوان", "معاني", "اختيار"]
  },
  {
    id: 5,
    title: "تصميم باقات الورود للمناسبات",
    excerpt: "أفكار إبداعية لتصميم باقات الورود المناسبة لكل مناسبة",
    content: `
      <p>تصميم باقات الورود فن يحتاج إلى ذوق وإبداع. في هذا المقال، سنشارك معك أفضل الأفكار لتصميم باقات مميزة.</p>
      
      <h3>باقات الزفاف</h3>
      <p>تتميز باقات الزفاف بالأناقة والبساطة. اختر الورود التي تتناسب مع فستان العروس.</p>
      
      <h3>باقات التخرج</h3>
      <p>استخدم ألواناً زاهية ومبهجة للاحتفال بهذا الإنجاز المهم.</p>
    `,
    author: "مصمم الباقات",
    date: "5 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&h=800&fit=crop&crop=center",
    category: "تصميم",
    readTime: "9 دقائق",
    tags: ["تصميم", "باقات", "مناسبات"]
  },
  {
    id: 6,
    title: "الورود في الطب التقليدي",
    excerpt: "استخدامات الورود في الطب التقليدي والفوائد الصحية",
    content: `
      <p>للورود فوائد صحية عديدة تم اكتشافها منذ القدم. في هذا المقال، سنستكشف الاستخدامات الطبية للورود.</p>
      
      <h3>زيت الورد</h3>
      <p>يستخدم زيت الورد في علاج العديد من المشاكل الجلدية وله خصائص مهدئة.</p>
      
      <h3>شاي الورد</h3>
      <p>شاي الورد غني بالفيتامينات ومضادات الأكسدة، وله فوائد صحية عديدة.</p>
    `,
    author: "د. فاطمة الطبية",
    date: "3 ديسمبر 2024",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=center",
    category: "صحة",
    readTime: "10 دقائق",
    tags: ["طب", "صحة", "تقليدي"]
  }
];

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const postId = parseInt(id);
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3E6D8] to-[#D1D6C4]">
      <Header />
      {/* Hero Section */}
      <section className="relative h-96 bg-[#5A5E4D]">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white text-right">
            <div className="mb-4">
              <Link 
                href="/blog"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
                style={{fontFamily:'var(--font-almarai)'}}
              >
                ← العودة للمدونة
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{fontFamily:'var(--font-almarai)'}}>
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <span style={{fontFamily:'var(--font-almarai)'}}>{post.author}</span>
              <span>•</span>
              <span style={{fontFamily:'var(--font-almarai)'}}>{post.date}</span>
              <span>•</span>
              <span style={{fontFamily:'var(--font-almarai)'}}>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-[#5A5E4D] text-white px-4 py-2 rounded-full text-sm" style={{fontFamily:'var(--font-almarai)'}}>
                    {post.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm" style={{fontFamily:'var(--font-almarai)'}}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div 
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  style={{fontFamily:'var(--font-almarai)'}}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#5A5E4D] text-center mb-12" style={{fontFamily:'var(--font-almarai)'}}>
            مقالات ذات صلة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts
              .filter(p => p.id !== postId)
              .slice(0, 3)
              .map((relatedPost) => (
                <article key={relatedPost.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#5A5E4D] mb-3 line-clamp-2" style={{fontFamily:'var(--font-almarai)'}}>
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2" style={{fontFamily:'var(--font-almarai)'}}>
                      {relatedPost.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blog/${relatedPost.id}`}
                      className="inline-block bg-[#5A5E4D] text-white px-4 py-2 rounded-lg hover:bg-[#4A4E3D] transition-colors duration-300"
                      style={{fontFamily:'var(--font-almarai)'}}
                    >
                      اقرأ المزيد
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
