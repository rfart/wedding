"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper, { SectionItem } from "@/components/layout/SectionWrapper";
import { config } from "@/config";

export default function Penutup() {
  return (
    <section className="py-16 px-6 pb-28 relative overflow-hidden">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-8 text-center">
          <SectionItem>
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl border border-border/60">
              <Image
                src={config.closing.photo}
                alt="Closing photo"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </SectionItem>

          <div className="space-y-4">
            <SectionItem>
              <h2 className="font-serif text-2xl font-semibold text-fg">Terima Kasih</h2>
            </SectionItem>

            <SectionItem>
              <p className="text-fg-soft text-sm leading-relaxed">{config.closing.message}</p>
            </SectionItem>

            <SectionItem>
              <div className="flex justify-center items-center py-1">
                <motion.span
                  variants={{
                    hidden: { scaleX: 0, opacity: 0 },
                    visible: {
                      scaleX: 1,
                      opacity: 1,
                      transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent origin-center"
                />
              </div>
            </SectionItem>

            <SectionItem>
              <p className="font-serif text-lg text-fg-soft italic">
                Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
              </p>
            </SectionItem>

            <SectionItem>
              <p className="font-serif text-2xl font-semibold text-fg tracking-wide mt-2">
                {config.couple.brideNickname} &amp; {config.couple.groomNickname}
              </p>
            </SectionItem>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
