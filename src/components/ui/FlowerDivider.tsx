"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FlowerDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative z-10 w-full origin-center"
      style={{
        height: 40,
        marginTop: -20,
        marginBottom: -20,
        backgroundImage: "url('/flowerornament.png')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "390px 40px",
        backgroundPosition: "center",
        filter: "invert(1) sepia(0.6) saturate(0.6) brightness(0.65)",
        mixBlendMode: "screen",
        opacity: 0.75,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 0.75 } : { scaleX: 0, opacity: 0 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
