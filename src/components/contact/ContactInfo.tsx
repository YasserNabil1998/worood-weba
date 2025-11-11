"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactInfoProps } from "@/src/@types/contact/index.type";

const iconMap = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
} as const;

const iconColorMap = {
  address: "bg-red-50 text-red-600",
  phone: "bg-blue-50 text-blue-600",
  email: "bg-purple-50 text-purple-600",
  hours: "bg-green-50 text-green-600",
} as const;

export default function ContactInfo({ data }: ContactInfoProps) {
  const contactItems = [
    {
      key: "address" as const,
      icon: iconMap.address,
      title: data.address.title,
      content: data.address.content,
      isLink: false,
    },
    {
      key: "phone" as const,
      icon: iconMap.phone,
      title: data.phone.title,
      content: data.phone.content,
      isLink: true,
      linkType: "tel",
    },
    {
      key: "email" as const,
      icon: iconMap.email,
      title: data.email.title,
      content: data.email.content,
      isLink: true,
      linkType: "mailto",
    },
    {
      key: "hours" as const,
      icon: iconMap.hours,
      title: data.hours.title,
      content: data.hours.content,
      isLink: false,
    },
  ];

  const formatContent = (content: string, isLink: boolean, linkType?: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => {
      if (isLink && linkType) {
        // استخراج القيمة الفعلية للرابط (إزالة المسافات والرموز)
        const linkValue = line.replace(/\s/g, '');
        const href = linkType === "tel" 
          ? `tel:${linkValue}` 
          : `mailto:${linkValue}`;
        
        return (
          <a
            key={index}
            href={href}
            className="block text-gray-700 hover:text-[#5A5E4D] transition-colors duration-200 font-medium"
            dir="ltr"
          >
            {line}
          </a>
        );
      }
      
      return (
        <span key={index} className="block text-gray-700">
          {line}
        </span>
      );
    });
  };

  return (
    <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 order-2 lg:order-2">
      <h3 className="text-xl font-bold text-[#2D3319] mb-6 text-center">
        {data.title}
      </h3>

      <div className="space-y-5">
        {contactItems.map((item) => {
          const IconComponent = item.icon;
          const colorClass = iconColorMap[item.key];
          
          return (
            <div 
              key={item.key} 
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <div className={`flex-shrink-0 h-11 w-11 flex items-center justify-center rounded-full ${colorClass}`}>
                <IconComponent size={20} strokeWidth={2} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">
                  {item.title}
                </h4>
                <div className="text-sm leading-relaxed space-y-1">
                  {formatContent(item.content, item.isLink || false, item.linkType)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
