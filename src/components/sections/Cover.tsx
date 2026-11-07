"use client";

import { motion, type Transition } from "framer-motion";
import Image from "next/image";
import { config } from "@/config";

type CoverProps = {
  onOpen: () => void;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" } as Transition,
});

export default function Cover({ onOpen }: CoverProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d0d] text-white overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Image
        src={config.heroPhoto}
        alt="Cover photo"
        fill
        className="object-cover opacity-40"
        priority
        unoptimized
      />
      <div className="relative z-10 flex flex-col items-center gap-5 px-8 text-center">
        <motion.p
          {...fadeUp(0.3)}
          className="font-serif text-6xl font-light tracking-widest text-gold"
        >
          {config.couple.initials}
        </motion.p>
        <motion.div {...fadeUp(0.6)} className="space-y-1">
          <p className="font-serif text-xl font-medium">
            {config.couple.groomNickname}
          </p>
          <p className="text-white/60 text-sm">&amp;</p>
          <p className="font-serif text-xl font-medium">
            {config.couple.brideNickname}
          </p>
        </motion.div>
        <motion.p
          {...fadeUp(0.9)}
          className="text-white/70 text-sm tracking-widest uppercase"
        >
          {config.event.dateLabel}
        </motion.p>
        <motion.button
          {...fadeUp(1.3)}
          onClick={onOpen}
          className="mt-4 px-8 py-3 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-colors duration-300 rounded-sm"
        >
          Buka Undangan
        </motion.button>
      </div>
    </motion.div>
  );
}
