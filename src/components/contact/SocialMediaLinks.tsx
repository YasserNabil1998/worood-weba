"use client";

import { Instagram, Twitter, Facebook, MessageCircle } from "lucide-react";
import { SocialMediaLinksProps } from "../../@types/contact/index.type";

const iconMap = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  whatsapp: MessageCircle,
} as const;

export default function SocialMediaLinks({ data }: SocialMediaLinksProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h4
        className="text-lg font-bold text-gray-900 mb-4"
        style={{
          fontFamily: "var(--font-almarai)",
        }}
      >
        {data.title}
      </h4>

      <div className="flex items-center justify-between w-full">
        {data.links.map((link) => {
          const IconComponent = iconMap[link.platform];
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 hover:scale-105 transition-all duration-200 flex-1 mx-1"
              title={link.title}
            >
              <IconComponent size={20} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
