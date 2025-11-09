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
  return (
    <div className="flex gap-3">
      {/* Thumbnails على الجانب */}
      <div className="flex flex-col gap-3 w-24">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`h-24 w-24 rounded-lg overflow-hidden border-2 transition-all bg-gray-100 ${
              selectedImage === index
                ? "border-[#5A5E4D] ring-2 ring-[#5A5E4D]/30"
                : "border-gray-200 hover:border-[#5A5E4D]/50"
            }`}
            aria-label={`عرض الصورة ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${title} - صورة ${index + 1}`}
              width={96}
              height={96}
              className="object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+"
            />
          </button>
        ))}
      </div>

      {/* الصورة الرئيسية */}
      <div
        className="flex-1 rounded-lg overflow-hidden bg-gray-100 shadow-md relative"
        style={{ height: "408px" }}
      >
        <Image
          src={images[selectedImage]}
          alt={`${title} - صورة مفصلة`}
          fill
          className="object-cover"
          priority={selectedImage === 0}
          loading={selectedImage === 0 ? undefined : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQwOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
        />
      </div>
    </div>
  );
}
