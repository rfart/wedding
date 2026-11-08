import SectionWrapper from "@/components/layout/SectionWrapper";
import RsvpForm from "@/components/ui/RsvpForm";

export default function RsvpWishes({ tamu }: { tamu: string }) {
  return (
    <section id="ucapan" className="bg-bg-alt py-16 px-6">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-8">
          <div className="text-center space-y-1">
            <p className="text-accent text-xs uppercase tracking-widest">RSVP & Buku Tamu</p>
            <h2 className="font-serif text-2xl font-semibold text-fg">Konfirmasi & Ucapan</h2>
          </div>

          <RsvpForm tamu={tamu} />
        </div>
      </SectionWrapper>
    </section>
  );
}
