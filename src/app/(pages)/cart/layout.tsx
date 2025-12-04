import type { Metadata } from "next";
import { generateCartMetadata } from "@/src/lib/seo/generateMetadata";

export const metadata: Metadata = generateCartMetadata();

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

