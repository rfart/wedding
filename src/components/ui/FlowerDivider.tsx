"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FlowerDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative z-10 flex items-center justify-center w-full -my-6 mix-blend-screen origin-center"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src="/flowerornament.png"
        alt=""
        width={800}
        height={80}
        className="w-full select-none pointer-events-none"
        style={{
          filter: "invert(1) sepia(0.6) saturate(0.6) brightness(0.65)",
          opacity: 0.75,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
