"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactInfoProps } from "@/src/@types/contact/index.type";
import { renderMultilineText } from "@/src/lib/textUtils";

const iconMap = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
} as const;

export default function ContactInfo({ data }: ContactInfoProps) {
  const contactItems = [
    {
      key: "address" as const,
      icon: iconMap.address,
      title: data.address.title,
      content: data.address.content,
    },
    {
      key: "phone" as const,
      icon: iconMap.phone,
      title: data.phone.title,
      content: data.phone.content,
    },
    {
      key: "email" as const,
      icon: iconMap.email,
      title: data.email.title,
      content: data.email.content,
    },
    {
      key: "hours" as const,
      icon: iconMap.hours,
      title: data.hours.title,
      content: data.hours.content,
    },
  ];

  return (
    <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 order-2 lg:order-2">
      <h3
        className="text-xl font-bold text-gray-900 mb-6"
        style={{ fontFamily: "var(--font-almarai)" }}
      >
        {data.title}
      </h3>

      <ul className="space-y-4 text-sm">
        {contactItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <li key={item.key} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700">
                <IconComponent size={16} />
              </span>
              <div>
                <div className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</div>
                <p className="text-gray-600 leading-5 text-sm">
                  {renderMultilineText(item.content)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
