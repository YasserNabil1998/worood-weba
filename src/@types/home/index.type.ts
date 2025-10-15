export interface OccasionItem {
  id: number | string;
  title: string;
  image: string;
  icon?: string;
  href?: string;
};


// Extended type for occasions with href
export interface OccasionWithHref extends OccasionItem {
    href?: string;
};