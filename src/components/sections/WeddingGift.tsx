"use client";

import CopyButton from "@/components/ui/CopyButton";
import SectionWrapper, { SectionHeader, SectionItem } from "@/components/layout/SectionWrapper";
import { config } from "@/config";

export default function WeddingGift() {
  return (
    <section id="hadiah" className="py-16 px-6 relative overflow-hidden">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-8">
          <SectionHeader
            badge="Wedding Gift"
            title="Tanda Kasih"
            subtitle={config.gift.message}
          />

          <div className="space-y-4">
            {config.gift.accounts.map((acc, i) => (
              <SectionItem key={i}>
                <div className="border border-border/80 bg-surface/40 backdrop-blur-sm rounded-xl p-5 space-y-3 hover:border-accent/40 transition-colors shadow-sm">
                  <div>
                    <p className="text-accent text-xs uppercase tracking-widest font-medium">
                      {acc.type}
                    </p>
                    <p className="font-medium text-fg mt-0.5">{acc.bankName}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 bg-bg-alt rounded-lg px-4 py-3">
                    <div>
                      <p className="text-fg-muted text-xs">Nomor Rekening</p>
                      <p className="text-fg font-mono tracking-wider">{acc.accountNumber}</p>
                    </div>
                    <CopyButton text={acc.accountNumber} />
                  </div>
                  <p className="text-fg-muted text-xs">a.n. {acc.accountName}</p>
                </div>
              </SectionItem>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
