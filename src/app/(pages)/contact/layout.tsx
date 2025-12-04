import type { Metadata } from "next";
import { generateContactMetadata } from "@/src/lib/seo/generateMetadata";

export const metadata: Metadata = generateContactMetadata();

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

