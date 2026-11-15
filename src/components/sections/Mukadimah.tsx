"use client";

import { motion } from "framer-motion";
import SectionWrapper, { SectionItem } from "@/components/layout/SectionWrapper";

export default function Mukadimah() {
  return (
    <section id="home" className="bg-bg-alt/80 py-16 px-6 relative overflow-hidden">
      <SectionWrapper>
        <div className="max-w-sm mx-auto text-center space-y-6">
          <SectionItem>
            <p className="text-fg-muted text-xs tracking-widest uppercase font-medium">
              Bismillahirrahmanirrahim
            </p>
          </SectionItem>

          <SectionItem>
            <div className="w-full overflow-hidden py-2">
              <p
                className="font-serif text-2xl leading-loose text-fg text-center"
                dir="rtl"
                lang="ar"
              >
                وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ
                أَزْوَٰجًا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم
                مَّوَدَّةً وَرَحْمَةً
              </p>
            </div>
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
            <p className="text-fg-soft text-sm leading-relaxed italic">
              &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
              menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar
              kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
              antaramu rasa kasih dan sayang.&rdquo;
            </p>
          </SectionItem>

          <SectionItem>
            <p className="text-fg-muted text-xs tracking-wider">QS. Ar-Rum: 21</p>
          </SectionItem>
        </div>
      </SectionWrapper>
    </section>
  );
}
