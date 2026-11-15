"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

export const sectionContainerVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

export const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const scaleItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function SectionHeader({
  badge,
  title,
  subtitle,
  className = "",
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <motion.div variants={itemFadeUpVariants} className={`text-center space-y-2 ${className}`}>
      {badge && (
        <p className="text-accent text-xs uppercase tracking-widest font-medium">
          {badge}
        </p>
      )}
      <h2 className="font-serif text-2xl font-semibold text-fg tracking-wide">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-2 py-1">
        <motion.span
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: {
              scaleX: 1,
              opacity: 1,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="h-px w-20 bg-gradient-to-r from-transparent via-accent to-transparent origin-center"
        />
      </div>
      {subtitle && (
        <p className="text-fg-soft text-sm leading-relaxed max-w-sm mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export function SectionItem({
  children,
  className = "",
  variants = itemFadeUpVariants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

export default function SectionWrapper({
  children,
  className = "",
  variants = sectionContainerVariants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
