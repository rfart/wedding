"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DepthCarousel = dynamic(() => import("./DepthCarousel"), { ssr: false }) as any;

type LightboxProps = {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
};

export default function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const items = images.map((img) => ({ image: img.src, alt: img.alt }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        onClick={onClose}
      >
        <button
          className="absolute top-4 right-4 z-[3100] text-white p-2 hover:text-white/70 transition-colors"
          onClick={onClose}
        >
          <X size={28} />
        </button>
        <div
          className="w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <DepthCarousel
            items={items}
            initialIndex={currentIndex}
            cardWidth={260}
            cardHeight={360}
            autoplay={false}
            loop={true}
            tiltDirection="right"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
