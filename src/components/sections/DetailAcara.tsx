import { CalendarDays, MapPin, Clock } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { config } from "@/config";

function AcaraCard({
  label,
  time,
  venue,
  address,
}: {
  label: string;
  time: string;
  venue: string;
  address: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-beige p-5 space-y-3 shadow-sm">
      <p className="text-gold text-xs uppercase tracking-widest font-medium">
        {label}
      </p>
      <div className="flex items-center gap-2 text-stone-700 text-sm">
        <Clock size={14} className="text-gold shrink-0" />
        <span>{time}</span>
      </div>
      <div className="flex items-start gap-2 text-stone-700 text-sm">
        <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
        <span>
          <strong className="font-medium">{venue}</strong>
          <br />
          {address}
        </span>
      </div>
    </div>
  );
}

export default function DetailAcara() {
  return (
    <section id="home" className="bg-cream py-16 px-6">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-8">
          <div className="text-center space-y-1">
            <p className="text-gold text-xs uppercase tracking-widest">
              Detail Acara
            </p>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              Save The Date
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              {config.event.dateLabel}
            </p>
          </div>

          <CountdownTimer targetDate={config.event.dateISO} />

          <div className="space-y-4">
            <AcaraCard
              label={config.event.akad.label}
              time={config.event.akad.time}
              venue={config.event.venue.name}
              address={config.event.venue.address}
            />
            <AcaraCard
              label={config.event.resepsi.label}
              time={config.event.resepsi.time}
              venue={config.event.venue.name}
              address={config.event.venue.address}
            />
          </div>

          <div className="flex gap-3">
            <a
              href={config.event.venue.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-stone-300 rounded-lg text-stone-700 text-sm hover:border-gold hover:text-gold transition-colors"
            >
              <CalendarDays size={16} />
              <span>Kalender</span>
            </a>
            <a
              href={config.event.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold text-white rounded-lg text-sm hover:bg-gold/90 transition-colors"
            >
              <MapPin size={16} />
              <span>Peta Lokasi</span>
            </a>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
