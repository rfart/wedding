"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper, { SectionHeader, itemFadeUpVariants } from "@/components/layout/SectionWrapper";
import Lightbox from "@/components/ui/Lightbox";
import { config } from "@/config";

export default function Galeri() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = config.gallery;

  return (
    <section id="galeri" className="bg-bg-alt/80 py-16 px-6 relative overflow-hidden">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-8">
          <SectionHeader badge="Momen Bersama" title="Galeri Foto" />

          <div className="columns-2 gap-3 space-y-3">
            {images.map((img, i) => (
              <motion.div
                key={i}
                variants={itemFadeUpVariants}
                className="break-inside-avoid cursor-pointer rounded-xl overflow-hidden border border-border/50 shadow-sm group"
                onClick={() => setLightboxIndex(i)}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: i % 3 === 0 ? "2/3" : i % 3 === 1 ? "1/1" : "3/4" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
