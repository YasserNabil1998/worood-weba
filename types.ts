export type OccasionItem = {
  id: number | string;
  title: string;
  image: string;
  icon?: string;
  href?: string;
};

export type BouquetItem = {
  id: number | string;
  title: string;
  image: string;
  price: number;
  currency?: string;
};

export type ReviewItem = {
  id: number | string;
  orderId?: string;
  customerName: string;
  customerImage?: string | null;
  rating: number; // 0..5
  comment: string;
  date?: string;
  productName?: string;
};

export type BlogItem = {
  id: number | string;
  title: string;
  description: string;
  image: string;
  date?: string;
  href?: string;
};

export type FeatureItem = {
  id: number | string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

