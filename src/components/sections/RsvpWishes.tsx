import SectionWrapper from "@/components/layout/SectionWrapper";
import WishesForm from "@/components/ui/WishesForm";
import { config } from "@/config";

export default function RsvpWishes() {
  return (
    <section id="ucapan" className="bg-white py-16 px-6">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-10">
          <div className="text-center space-y-1">
            <p className="text-gold text-xs uppercase tracking-widest">
              Konfirmasi Kehadiran
            </p>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              RSVP
            </h2>
          </div>

          <div className="rounded-xl overflow-hidden border border-beige">
            <iframe
              src={config.rsvp.googleFormsUrl}
              width="100%"
              height="500"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="RSVP Form"
            >
              Memuat…
            </iframe>
          </div>

          <div className="space-y-4">
            <div className="text-center space-y-1">
              <p className="text-gold text-xs uppercase tracking-widest">
                Ucapan & Doa
              </p>
              <h3 className="font-serif text-xl font-semibold text-stone-800">
                Buku Tamu
              </h3>
            </div>
            <WishesForm />
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
