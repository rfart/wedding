"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import SectionWrapper, { SectionHeader } from "@/components/layout/SectionWrapper";
import { config } from "@/config";

const brideVariants: Variants = {
  hidden: { opacity: 0, x: -35, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const groomVariants: Variants = {
  hidden: { opacity: 0, x: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ampersandVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

function ProfileCard({
  photo,
  fullName,
  fatherName,
  motherName,
  instagram,
  role,
  childLabel,
  variants,
}: {
  photo: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  instagram: string;
  role: string;
  childLabel: string;
  variants: Variants;
}) {
  return (
    <motion.div
      variants={variants}
      className="flex flex-col items-center gap-4 text-center w-full sm:w-auto"
    >
      <div className="relative w-48 h-60 sm:w-40 sm:h-52 rounded-xl overflow-hidden shadow-lg border border-border/60 mx-auto group">
        <Image
          src={photo}
          alt={fullName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>
      <div className="space-y-1">
        <p className="text-fg-muted text-xs uppercase tracking-widest">{role}</p>
        <h3 className="font-serif text-lg font-semibold text-fg">{fullName}</h3>
        <p className="text-fg-soft text-sm leading-relaxed">
          {childLabel} dari {fatherName}
          <br />& {motherName}
        </p>
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-accent text-sm mt-1 hover:underline transition-opacity hover:opacity-80"
        >
          <ExternalLink size={14} />
          <span>Instagram</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function ProfilMempelai() {
  return (
    <section id="pasangan" className="bg-bg py-16 px-6 relative overflow-hidden">
      <SectionWrapper>
        <div className="max-w-lg mx-auto space-y-10">
          <SectionHeader badge="Mempelai" title="Profil Pasangan" />

          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:items-start sm:gap-8">
            <ProfileCard
              photo={config.couple.bride.photo}
              fullName={config.couple.bride.fullName}
              fatherName={config.couple.bride.fatherName}
              motherName={config.couple.bride.motherName}
              instagram={config.couple.bride.instagram}
              role="Mempelai Wanita"
              childLabel="Putri"
              variants={brideVariants}
            />

            <motion.div
              variants={ampersandVariants}
              className="flex items-center justify-center sm:pt-24"
            >
              <span className="font-serif text-3xl text-accent select-none drop-shadow-sm">
                &amp;
              </span>
            </motion.div>

            <ProfileCard
              photo={config.couple.groom.photo}
              fullName={config.couple.groom.fullName}
              fatherName={config.couple.groom.fatherName}
              motherName={config.couple.groom.motherName}
              instagram={config.couple.groom.instagram}
              role="Mempelai Pria"
              childLabel="Putra"
              variants={groomVariants}
            />
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
