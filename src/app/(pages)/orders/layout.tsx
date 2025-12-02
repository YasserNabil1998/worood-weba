import type { Metadata } from "next";
import { generateOrdersMetadata } from "@/src/lib/seo/generateMetadata";

export const metadata: Metadata = generateOrdersMetadata();

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

