import Image from "next/image";
import { ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { config } from "@/config";

function ProfileCard({
  photo, fullName, fatherName, motherName, instagram, role, childLabel,
}: {
  photo: string; fullName: string; fatherName: string; motherName: string;
  instagram: string; role: string; childLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center w-full sm:w-auto">
      <div className="relative w-48 h-60 sm:w-40 sm:h-52 rounded-xl overflow-hidden shadow-md mx-auto">
        <Image src={photo} alt={fullName} fill className="object-cover" unoptimized />
      </div>
      <div className="space-y-1">
        <p className="text-fg-muted text-xs uppercase tracking-widest">{role}</p>
        <h3 className="font-serif text-lg font-semibold text-fg">{fullName}</h3>
        <p className="text-fg-soft text-sm">
          {childLabel} dari {fatherName}
          <br />& {motherName}
        </p>
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-accent text-sm mt-1 hover:underline"
        >
          <ExternalLink size={14} />
          <span>Instagram</span>
        </a>
      </div>
    </div>
  );
}

export default function ProfilMempelai() {
  return (
    <section id="pasangan" className="bg-bg py-16 px-6">
      <SectionWrapper>
        <div className="max-w-lg mx-auto space-y-10">
          <div className="text-center space-y-1">
            <p className="text-accent text-xs uppercase tracking-widest">Mempelai</p>
            <h2 className="font-serif text-2xl font-semibold text-fg">Profil Pasangan</h2>
          </div>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:items-start sm:gap-8">
            <ProfileCard
              photo={config.couple.bride.photo} fullName={config.couple.bride.fullName}
              fatherName={config.couple.bride.fatherName} motherName={config.couple.bride.motherName}
              instagram={config.couple.bride.instagram} role="Mempelai Wanita" childLabel="Putri"
            />
            <div className="flex items-center sm:pt-24">
              <span className="font-serif text-2xl text-accent">&amp;</span>
            </div>
            <ProfileCard
              photo={config.couple.groom.photo} fullName={config.couple.groom.fullName}
              fatherName={config.couple.groom.fatherName} motherName={config.couple.groom.motherName}
              instagram={config.couple.groom.instagram} role="Mempelai Pria" childLabel="Putra"
            />
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
