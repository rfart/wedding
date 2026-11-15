"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import SectionWrapper, { SectionHeader } from "@/components/layout/SectionWrapper";
import { config } from "@/config";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function TimelineItem({ item, i }: { item: (typeof config.loveStory)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={itemVariants}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.15 }}
        className="absolute left-2.5 top-1 w-3.5 h-3.5 rounded-full bg-accent border-2 border-bg shadow-sm"
      />
      <div className="space-y-2">
        <span className="text-accent text-xs font-semibold uppercase tracking-widest">
          {item.year}
        </span>
        <h3 className="font-serif text-base font-semibold text-fg">
          {item.title}
        </h3>
        {item.photo && (
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-border/60 shadow-md">
            <Image
              src={item.photo}
              alt={item.title}
              fill
              className="object-cover object-top"
              unoptimized
            />
          </div>
        )}
        <p className="text-fg-soft text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function LoveStory() {
  return (
    <section className="bg-bg py-16 px-6 relative overflow-hidden">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-10">
          <SectionHeader badge="Perjalanan Cinta" title="Love Story" />

          <div className="relative">
            {/* Animated vertical timeline line */}
            <motion.div
              variants={{
                hidden: { scaleY: 0, opacity: 0 },
                visible: {
                  scaleY: 1,
                  opacity: 1,
                  transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/40 to-border origin-top"
            />

            <div className="space-y-10">
              {config.loveStory.map((item, i) => (
                <TimelineItem key={i} item={item} i={i} />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
