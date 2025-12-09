import type { Metadata } from "next";
import { generateCustomMetadata } from "@/lib/seo/generateMetadata";

export const metadata: Metadata = generateCustomMetadata();

export default function CustomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
