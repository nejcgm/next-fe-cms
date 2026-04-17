"use client";

import { useState } from "react";
import { cn } from "@shared/utils/cn";

interface Image {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  heading?: string;
  images: Image[];
  columns?: 2 | 3 | 4;
  lightbox?: boolean;
}

export function ImageGallery({ heading, images, columns = 4, lightbox = false }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <section className="py-16 px-4 bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10 text-center text-[var(--color-foreground)]">
            {heading}
          </h2>
        )}
        <div className={cn("grid gap-4", gridCols)}>
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "overflow-hidden rounded-[var(--radius)] cursor-pointer group",
                columns === 4 && index === 0 ? "col-span-2 row-span-2" : ""
              )}
              onClick={() => lightbox && setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-full object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
}
