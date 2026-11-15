"use client";

import SectionWrapper, { SectionHeader, SectionItem } from "@/components/layout/SectionWrapper";
import RsvpForm from "@/components/ui/RsvpForm";

export default function RsvpWishes({ tamu }: { tamu: string }) {
  return (
    <section id="ucapan" className="bg-bg-alt py-16 px-6 relative overflow-hidden">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-8">
          <SectionHeader
            badge="RSVP & Buku Tamu"
            title="Konfirmasi & Ucapan"
            subtitle="Doa restu Anda merupakan karunia yang sangat berarti bagi kami."
          />

          <SectionItem>
            <RsvpForm tamu={tamu} />
          </SectionItem>
        </div>
      </SectionWrapper>
    </section>
  );
}
