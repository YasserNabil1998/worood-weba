import type { Metadata } from "next";
import { generateFavoritesMetadata } from "@/src/lib/seo/generateMetadata";

export const metadata: Metadata = generateFavoritesMetadata();

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

