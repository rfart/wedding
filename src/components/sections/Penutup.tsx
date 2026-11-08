import Image from "next/image";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { config } from "@/config";

export default function Penutup() {
  return (
    <section className="bg-bg py-16 px-6 pb-28">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-8 text-center">
          <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md">
            <Image src={config.closing.photo} alt="Closing photo" fill className="object-cover" unoptimized />
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-fg">Terima Kasih</h2>
            <p className="text-fg-soft text-sm leading-relaxed">{config.closing.message}</p>
            <div className="w-12 h-px bg-accent mx-auto" />
            <p className="font-serif text-lg text-fg-soft italic">
              Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
            </p>
            <p className="font-serif text-xl font-semibold text-fg">
              {config.couple.brideNickname} &amp; {config.couple.groomNickname}
            </p>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
