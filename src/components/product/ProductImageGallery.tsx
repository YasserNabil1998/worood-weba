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
            className={`h-24 w-24 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? "border-[#5A5E4D] ring-2 ring-[#5A5E4D]/30"
                : "border-gray-200 hover:border-[#5A5E4D]/50"
            }`}
          >
            <Image
              src={image}
              alt={`${title} ${index + 1}`}
              width={96}
              height={96}
              className="object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* الصورة الرئيسية */}
      <div
        className="flex-1 rounded-lg overflow-hidden bg-gray-50 shadow-md relative"
        style={{ height: "408px" }}
      >
        <Image
          src={images[selectedImage]}
          alt={title}
          fill
          className="object-cover"
          priority={selectedImage === 0}
          loading={selectedImage === 0 ? undefined : "lazy"}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
