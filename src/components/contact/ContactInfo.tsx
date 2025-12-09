"use client";

import { ContactInfoProps } from "@/types/contact";
import { SocialMedia } from "@/types/contact";
import { fontStyle } from "@/lib/styles";

// WhatsApp SVG Icon Component
const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] lg:w-[35px] lg:h-[35px]"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Instagram SVG Icon Component
const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] lg:w-[36px] lg:h-[36px]"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// Twitter (X) SVG Icon Component
const TwitterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] lg:w-[35px] lg:h-[35px]"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Facebook SVG Icon Component
const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] lg:w-[35px] lg:h-[35px]"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const iconMap = {
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
} as const;

interface ContactInfoWithSocialProps extends ContactInfoProps {
  socialMedia?: SocialMedia;
}

export default function ContactInfo({ data, socialMedia }: ContactInfoWithSocialProps) {
  const formatContent = (content: string, isLink: boolean, linkType?: string) => {
    const lines = content.split("\n").filter((line) => line.trim());

    return lines.map((line, index) => {
      if (isLink && linkType) {
        const linkValue = line.replace(/\s/g, "");
        const href = linkType === "tel" ? `tel:${linkValue}` : `mailto:${linkValue}`;

        return (
          <a
            key={index}
            href={href}
            className="block text-[#727272] hover:text-[#5A5E4D] transition-colors duration-200"
            dir="ltr"
          >
            {line}
          </a>
        );
      }

      return (
        <span key={index} className="block text-[#727272]">
          {line}
        </span>
      );
    });
  };

  return (
    <aside className="bg-white rounded-[20px] min-h-[726px] p-4 sm:p-5 lg:p-6 relative order-2 lg:order-2" style={fontStyle}>
      {/* Title */}
      <h3 className="text-[21px] sm:text-[22px] lg:text-[19px] font-bold text-black mb-8 sm:mb-10 lg:mb-12 text-right">
        {data.title}
      </h3>

      <div className="space-y-6 sm:space-y-7 lg:space-y-8">
        {/* Address */}
        <div className="flex items-start gap-3 sm:gap-3.5 lg:gap-4">
          {/* Location Icon - Colored (Orange/Red) */}
          <div className="shrink-0 w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] lg:w-[36px] lg:h-[36px] bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="#FF6B6B"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 text-right">
            <h4 className="text-[17px] sm:text-[17px] lg:text-[15px] font-bold text-black mb-1.5 sm:mb-2">
              {data.address.title}
            </h4>
            <div className="text-[16px] sm:text-[16px] lg:text-[14px] space-y-1">
              {formatContent(data.address.content, false)}
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          {/* Phone Icon - Colored (Blue) */}
          <div className="shrink-0 w-[36px] h-[36px] bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                fill="#4A90E2"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 text-right">
            <h4 className="text-[17px] sm:text-[17px] lg:text-[15px] font-bold text-black mb-1.5 sm:mb-2">
              {data.phone.title}
            </h4>
            <div className="text-[16px] sm:text-[16px] lg:text-[14px] space-y-1">
              {formatContent(data.phone.content, true, "tel")}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          {/* Email Icon - Colored (Red/Orange) */}
          <div className="shrink-0 w-[36px] h-[36px] bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              width="22"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                fill="#FF8C42"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 text-right">
            <h4 className="text-[17px] sm:text-[17px] lg:text-[15px] font-bold text-black mb-1.5 sm:mb-2">
              {data.email.title}
            </h4>
            <div className="text-[16px] sm:text-[16px] lg:text-[14px] space-y-1">
              {formatContent(data.email.content, true, "mailto")}
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-4">
          {/* Clock Icon - Colored (Blue) */}
          <div className="shrink-0 w-[36px] h-[36px] bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="#5B9BD5" strokeWidth="2" fill="none" />
              <path d="M12 6v6l4 2" stroke="#5B9BD5" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 text-right">
            <h4 className="text-[17px] sm:text-[17px] lg:text-[15px] font-bold text-black mb-1.5 sm:mb-2">
              {data.hours.title}
            </h4>
            <div className="text-[16px] sm:text-[16px] lg:text-[14px] space-y-1 whitespace-pre-wrap">
              {formatContent(data.hours.content, false)}
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      {socialMedia && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-[19px] sm:text-[20px] lg:text-[17px] font-bold text-black mb-4 sm:mb-5 lg:mb-6 text-right">
            {socialMedia.title}
          </h4>

          <div className="flex items-center justify-start gap-3 sm:gap-3.5 lg:gap-4">
            {socialMedia.links.map((link) => {
              const IconComponent = iconMap[link.platform];

              // ألوان كل منصة
              const colorClasses = {
                instagram: "text-[#E4405F] hover:text-[#C13584]",
                twitter: "text-[#000000] hover:text-[#1DA1F2]",
                facebook: "text-[#1877F2] hover:text-[#0A7CFF]",
                whatsapp: "text-[#25D366] hover:text-[#20BA5A]",
              };

              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${colorClasses[link.platform]} transition-colors duration-300`}
                  title={link.title}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
