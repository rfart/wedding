"use client";

import { motion, type Transition } from "framer-motion";
import Image from "next/image";
import { ChevronsUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { config } from "@/config";

type CoverProps = {
  onOpen: () => void;
  tamu?: string;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.3, delay, ease: "easeOut" } as Transition,
});

export default function Cover({ onOpen, tamu }: CoverProps) {
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
      className="fixed inset-0 z-50 flex flex-col bg-bg text-fg cursor-pointer"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] } as Transition}
      onClick={trigger}
    >
      {/* Top: hero photo ~55vh */}
      <div className="relative h-[55vh] shrink-0">
        <Image
          src={config.heroPhoto}
          alt="Cover photo"
          fill
          className="object-cover object-top"
          priority
          unoptimized
        />
        {/* Gradient fading photo into dark bg below */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-bg" />
      </div>

      {/* Flowers — anchored to viewport edges, vertically centered in bottom panel */}
      <motion.div
        className="absolute left-0 z-10 pointer-events-none"
        style={{ top: "55vh", bottom: 0, display: "flex", alignItems: "center", translateX: "-50%" }}
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] } as Transition}
      >
        <Image
          src="/images/flower.png"
          alt=""
          width={200}
          height={1000}
          className="opacity-70"
          style={{ transform: "scaleX(-1)" }}
          unoptimized
        />
      </motion.div>
      <motion.div
        className="absolute right-0 z-10 pointer-events-none"
        style={{ top: "55vh", bottom: 0, display: "flex", alignItems: "center", translateX: "50%" }}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] } as Transition}
      >
        <Image
          src="/images/flower.png"
          alt=""
          width={200}
          height={1000}
          className="opacity-70"
          unoptimized
        />
      </motion.div>

      {/* Bottom: dark content panel */}
      <div className="relative flex-1 bg-bg flex flex-col items-center justify-center gap-3 px-16 pb-24 text-center">

        {/* "Dear Family & Friends" */}
        <motion.p
          {...fadeUp(0.3)}
          className="font-sans text-fg/60 uppercase"
          style={{ fontSize: "var(--font-size-label)", letterSpacing: "var(--tracking-caps)" }}
        >
          The wedding of
        </motion.p>

        {/* Bride name */}
        <motion.p
          {...fadeUp(0.5)}
          className="text-fg"
          style={{
            fontSize: "64px",
            fontFamily: "var(--font-italianno)",
            fontWeight: 400,
            lineHeight: "36px",
            letterSpacing: "3.20px",
            wordWrap: "break-word",
          }}
        >
          {config.couple.brideNickname}
        </motion.p>

        {/* ampersand */}
        <motion.p
          {...fadeUp(0.65)}
          className="font-sans text-fg/60 text-sm"
          style={{ fontFamily: "var(--font-armelie)" }}
        >
          &amp;
        </motion.p>

        {/* Groom name */}
        <motion.p
          {...fadeUp(0.8)}
          className="text-fg"
          style={{
            fontSize: "64px",
            fontFamily: "var(--font-italianno)",
            fontWeight: 400,
            lineHeight: "36px",
            letterSpacing: "3.20px",
            wordWrap: "break-word",
          }}
        >
          {config.couple.groomNickname}
        </motion.p>

        {/* Invitation tagline */}
        <motion.p
          {...fadeUp(1.0)}
          className="font-sans text-fg/60 mt-1"
          style={{ fontSize: "var(--font-size-label)", letterSpacing: "var(--tracking-caps)" }}
        >
          Kepada Bapak/Ibu/Saudara/i
        </motion.p>
        <motion.p
          {...fadeUp(1.05)}
          className={`font-sans -mt-2 ${tamu ? "text-fg/90" : "text-fg/60"}`}
          style={{ fontSize: tamu ? "var(--font-size-body)" : "var(--font-size-label)" }}
        >
          {tamu ? tamu : "Nama Tamu"}
        </motion.p>

        {/* Date */}
        {/* <motion.p
          {...fadeUp(1.15)}
          className="font-sans font-semibold text-fg mt-1"
          style={{ fontSize: "var(--font-size-body)", letterSpacing: "var(--tracking-wide)" }}
        >
          {config.event.dateLabel.toUpperCase()}
        </motion.p> */}

        {/* Time */}
        {/* <motion.p
          {...fadeUp(1.25)}
          className="font-sans font-semibold text-fg -mt-2"
          style={{ fontSize: "var(--font-size-body)", letterSpacing: "var(--tracking-wide)" }}
        >
          {config.event.akad.time.split("–")[0].trim()}
        </motion.p> */}

        {/* Venue */}
        {/* <motion.p
          {...fadeUp(1.35)}
          className="font-sans text-fg/60 text-sm mt-0.5"
        >
          {config.event.venue.name}
        </motion.p>
        <motion.p
          {...fadeUp(1.4)}
          className="font-sans text-fg/60 text-xs -mt-2 max-w-[220px]"
        >
          {config.event.venue.address}
        </motion.p> */}

        {/* Swipe up indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.2 } as Transition}
          className="absolute bottom-6 flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.0,
              ease: "easeInOut",
              delay: 2.8,
            } as Transition}
          >
            <ChevronsUp size={24} className="text-fg/50" />
          </motion.div>
          <span
            className="text-fg/40 uppercase"
            style={{ fontSize: "var(--font-size-label)", letterSpacing: "var(--tracking-caps)" }}
          >
            Swipe up
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
