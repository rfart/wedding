"use client";

import { useState } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Lightbox from "@/components/ui/Lightbox";
import { config } from "@/config";

export default function Galeri() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = config.gallery;

  const prev = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));

  return (
    <section id="galeri" className="bg-cream py-16 px-6">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-6">
          <div className="text-center space-y-1">
            <p className="text-gold text-xs uppercase tracking-widest">
              Momen Bersama
            </p>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              Galeri Foto
            </h2>
          </div>

          <div className="columns-2 gap-3 space-y-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid cursor-pointer rounded-lg overflow-hidden"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="relative w-full" style={{ aspectRatio: i % 3 === 0 ? "2/3" : i % 3 === 1 ? "1/1" : "3/4" }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
