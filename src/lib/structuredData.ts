/**
 * Structured Data (JSON-LD) Helper Functions
 * لمساعدة محركات البحث على فهم محتوى الموقع بشكل أفضل
 */

/**
 * Organization Schema
 * معلومات المنظمة/الشركة
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "زهور الشمس",
    alternateName: "Shams Flowers",
    url: "https://shamsflowers.com", // استبدل بالـ URL الحقيقي
    logo: "https://shamsflowers.com/Logo-shams.svg",
    description: "نقدم لكم أرقى تشكيلة من باقات الزهور المميزة والفريدة لجميع المناسبات",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressLocality: "الرياض", // حدّث حسب موقعك الفعلي
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Arabic", "ar"],
    },
    sameAs: [
      // أضف روابط وسائل التواصل الاجتماعي هنا
      // "https://facebook.com/shamsflowers",
      // "https://twitter.com/shamsflowers",
      // "https://instagram.com/shamsflowers",
    ],
  };
}

/**
 * Product Schema
 * schema للمنتج الفردي
 */
export function generateProductSchema(product: {
  id: number | string;
  name: string;
  description?: string;
  image: string;
  price: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  rating?: {
    value: number;
    count: number;
  };
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description || `باقة زهور جميلة: ${product.name}`,
    sku: `PROD-${product.id}`,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "SAR",
      availability:
        product.availability === "OutOfStock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `https://shamsflowers.com/product/${product.id}`,
    },
  };

  // إضافة التقييمات إذا كانت موجودة
  if (product.rating && product.rating.count > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

/**
 * Breadcrumb List Schema
 * للـ breadcrumb navigation
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Local Business Schema
 * إذا كان لديك متجر فعلي
 */
export function generateLocalBusinessSchema(options?: {
  address?: string;
  phone?: string;
  openingHours?: string[];
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://shamsflowers.com",
    name: "زهور الشمس",
    image: "https://shamsflowers.com/Logo-shams.svg",
    url: "https://shamsflowers.com",
    telephone: options?.phone || "+966-XXX-XXXX",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: options?.address || "",
      addressLocality: "الرياض",
      addressCountry: "SA",
    },
  };

  if (options?.openingHours) {
    schema.openingHours = options.openingHours;
  }

  return schema;
}

/**
 * Website Schema
 * معلومات الموقع الأساسية
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "زهور الشمس",
    url: "https://shamsflowers.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://shamsflowers.com/bouquets?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * FAQ Schema
 * للأسئلة الشائعة
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Review Schema
 * تقييم/مراجعة
 */
export function generateReviewSchema(review: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  itemReviewed: {
    name: string;
    image?: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": "Product",
      name: review.itemReviewed.name,
      image: review.itemReviewed.image,
    },
  };
}
