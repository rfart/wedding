"use client";

import { motion, type Transition } from "framer-motion";
import Image from "next/image";
import { ChevronsUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { config } from "@/config";

type CoverProps = {
  onOpen: () => void;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: "easeOut" } as Transition,
});

export default function Cover({ onOpen }: CoverProps) {
  const touchStartY = useRef(0);
  const triggered = useRef(false);

  const trigger = () => {
    if (triggered.current) return;
    triggered.current = true;
    onOpen();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", " ", "PageDown", "Enter"].includes(e.key)) trigger();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) trigger();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.touches[0].clientY;
    if (delta > 40) trigger();
  };

  return (
    <motion.div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg text-fg overflow-hidden cursor-pointer"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] } as Transition}
      onClick={trigger}
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
          className="font-serif text-6xl font-light tracking-widest text-fg"
        >
          {config.couple.initials}
        </motion.p>

        <motion.div {...fadeUp(0.6)} className="space-y-1">
          <p className="font-serif text-xl font-medium text-fg">
            {config.couple.brideNickname}
          </p>
          <p className="text-fg/50 text-sm">&amp;</p>
          <p className="font-serif text-xl font-medium text-fg">
            {config.couple.groomNickname}
          </p>
        </motion.div>

        <motion.p
          {...fadeUp(0.9)}
          className="text-fg/60 text-sm tracking-widest uppercase"
        >
          {config.event.dateLabel}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 } as Transition}
        className="absolute bottom-10 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            ease: "easeInOut",
            delay: 1.8,
          } as Transition}
        >
          <ChevronsUp size={24} className="text-fg/50" />
        </motion.div>
        <span className="text-fg/40 text-[10px] uppercase tracking-widest">
          Swipe up
        </span>
      </motion.div>
    </motion.div>
  );
}
