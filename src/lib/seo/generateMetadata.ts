import { Metadata } from "next";

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

const SITE_NAME = "زهور الشمس";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shamsflowers.com";
const DEFAULT_IMAGE = `${SITE_URL}/Logo-shams.svg`;

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image = DEFAULT_IMAGE,
  url,
}: PageMetadata): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "ar_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export function generateHomeMetadata(): Metadata {
  return generatePageMetadata({
    title: "الرئيسية",
    description:
      "نقدم لكم أرقى تشكيلة من باقات الزهور المميزة والفريدة لجميع المناسبات. خدمة تنسيق الزهور بأعلى جودة وأفضل الأسعار.",
    keywords: [
      "زهور",
      "باقات زهور",
      "تنسيق زهور",
      "زهور الرياض",
      "باقات جاهزة",
      "تنسيق خاص",
      "زهور الشمس",
    ],
  });
}

export function generateProductsMetadata(): Metadata {
  return generatePageMetadata({
    title: "الباقات الجاهزة",
    description:
      "تصفح مجموعتنا المميزة من الباقات الجاهزة. باقات زهور فاخرة ومناسبة لجميع المناسبات مع خدمة توصيل سريعة.",
    keywords: ["باقات جاهزة", "زهور", "باقات زهور", "منتجات"],
    url: "/bouquets",
  });
}

export function generateProductMetadata(product: {
  title: string;
  description?: string;
  image?: string;
  price?: number;
}): Metadata {
  return generatePageMetadata({
    title: product.title,
    description:
      product.description ||
      `اكتشف ${product.title} من زهور الشمس. ${product.price ? `السعر: ${product.price} ر.س` : ""} خدمة توصيل سريعة وجودة عالية.`,
    keywords: [product.title, "باقة زهور", "زهور", "تنسيق"],
    image: product.image || DEFAULT_IMAGE,
    url: `/product/${product.title}`,
  });
}

export function generateCustomMetadata(): Metadata {
  return generatePageMetadata({
    title: "تنسيق خاص",
    description:
      "صمم باقتك الخاصة بالزهور التي تفضلها. اختر الزهور والألوان والحجم والتغليف لإنشاء باقة فريدة تناسب ذوقك.",
    keywords: ["تنسيق خاص", "تصميم باقة", "زهور مخصصة", "باقة خاصة"],
    url: "/custom",
  });
}

export function generateCartMetadata(): Metadata {
  return generatePageMetadata({
    title: "السلة",
    description: "راجع منتجاتك المختارة وأكمل عملية الشراء. خدمة آمنة وسريعة.",
    keywords: ["سلة التسوق", "شراء", "طلبات"],
    url: "/cart",
  });
}

export function generateOrdersMetadata(): Metadata {
  return generatePageMetadata({
    title: "طلباتي",
    description: "تابع طلباتك السابقة والحالية. عرض تفاصيل الطلبات وحالاتها.",
    keywords: ["طلبات", "متابعة طلبات", "تاريخ الطلبات"],
    url: "/orders",
  });
}

export function generateFavoritesMetadata(): Metadata {
  return generatePageMetadata({
    title: "المفضلة",
    description: "عرض جميع المنتجات التي أضفتها إلى قائمة المفضلة لديك.",
    keywords: ["مفضلة", "منتجات مفضلة", "قائمة المفضلة"],
    url: "/favorites",
  });
}

export function generateProfileMetadata(): Metadata {
  return generatePageMetadata({
    title: "الملف الشخصي",
    description: "إدارة معلوماتك الشخصية والطلبات والمناسبات المفضلة.",
    keywords: ["ملف شخصي", "حساب", "إعدادات"],
    url: "/profile",
  });
}

export function generateContactMetadata(): Metadata {
  return generatePageMetadata({
    title: "تواصل معنا",
    description:
      "تواصل معنا لأي استفسار أو طلب خاص. فريقنا جاهز لمساعدتك في أي وقت.",
    keywords: ["اتصال", "تواصل", "دعم", "مساعدة"],
    url: "/contact",
  });
}

