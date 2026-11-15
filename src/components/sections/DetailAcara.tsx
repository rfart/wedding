"use client";

import { CalendarDays, MapPin, Clock } from "lucide-react";
import SectionWrapper, { SectionHeader, SectionItem } from "@/components/layout/SectionWrapper";
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
    <div className="bg-surface rounded-xl border border-border/80 p-5 space-y-3 shadow-sm hover:border-accent/40 transition-colors">
      <p className="text-accent text-xs uppercase tracking-widest font-medium">{label}</p>
      <div className="flex items-center gap-2 text-fg text-sm">
        <Clock size={14} className="text-accent shrink-0" />
        <span>{time}</span>
      </div>
      <div className="flex items-start gap-2 text-fg text-sm">
        <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
        <span>
          <strong className="font-medium text-fg">{venue}</strong>
          <br />
          <span className="text-fg-soft">{address}</span>
        </span>
      </div>
    </div>
  );
}

export default function DetailAcara() {
  return (
    <section id="acara" className="bg-bg-alt py-16 px-6 relative overflow-hidden">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-8">
          <SectionHeader
            badge="Detail Acara"
            title="Save The Date"
            subtitle={config.event.dateLabel}
          />

          <SectionItem>
            <CountdownTimer targetDate={config.event.dateISO} />
          </SectionItem>

          <div className="space-y-4">
            <SectionItem>
              <AcaraCard
                label={config.event.akad.label}
                time={config.event.akad.time}
                venue={config.event.venue.name}
                address={config.event.venue.address}
              />
            </SectionItem>
            <SectionItem>
              <AcaraCard
                label={config.event.resepsi.label}
                time={config.event.resepsi.time}
                venue={config.event.venue.name}
                address={config.event.venue.address}
              />
            </SectionItem>
          </div>

          <SectionItem>
            <div className="flex gap-3">
              <a
                href={config.event.venue.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-border rounded-lg text-fg-soft text-sm hover:border-accent hover:text-fg transition-colors"
              >
                <CalendarDays size={16} />
                <span>Kalender</span>
              </a>
              <a
                href={config.event.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-bg font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                <MapPin size={16} />
                <span>Peta Lokasi</span>
              </a>
            </div>
          </SectionItem>
        </div>
      </SectionWrapper>
    </section>
  );
}
