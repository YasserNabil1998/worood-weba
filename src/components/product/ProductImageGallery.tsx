"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

export default function ProductImageGallery({
  images,
  title,
  selectedImage,
  onImageSelect,
}: ProductImageGalleryProps) {
  const [displayImage, setDisplayImage] = useState(selectedImage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (selectedImage !== displayImage) {
      setIsTransitioning(true);
      // تأخير بسيط لبدء الانتقال
      const startTimer = setTimeout(() => {
        setDisplayImage(selectedImage);
        // الانتقال يبدأ بعد تغيير الصورة
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 50);
      return () => clearTimeout(startTimer);
    }
  }, [selectedImage, displayImage]);

  return (
    <div className="flex flex-col gap-3">
      {/* الصورة الرئيسية */}
      <div className="w-full h-[408px] md:h-[560px] lg:h-[450px] rounded-lg overflow-hidden bg-gray-100 shadow-md relative">
        <Image
          src={images[displayImage]}
          alt={`${title} - صورة مفصلة`}
          fill
          className={`object-cover transition-opacity duration-700 ease-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          quality={100}
          priority={displayImage === 0}
          loading={displayImage === 0 ? undefined : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQwOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
        />
      </div>

      {/* Thumbnails أسفل الصورة الرئيسية */}
      <div className="flex gap-3 w-full">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`flex-1 h-28 md:h-32 lg:h-28 rounded-lg overflow-hidden border-2 transition-all duration-500 ease-out bg-gray-100 relative ${
              selectedImage === index
                ? "border-[#5A5E4D] ring-2 ring-[#5A5E4D]/30 scale-[1.02]"
                : "border-gray-200 hover:border-[#5A5E4D]/50 hover:scale-[1.01]"
            }`}
            aria-label={`عرض الصورة ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${title} - صورة ${index + 1}`}
              fill
              className="object-cover"
              quality={90}
              loading="lazy"
              sizes="(max-width: 768px) 25vw, 20vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
