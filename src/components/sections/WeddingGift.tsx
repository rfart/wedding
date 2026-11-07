import CopyButton from "@/components/ui/CopyButton";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { config } from "@/config";

export default function WeddingGift() {
  return (
    <section id="hadiah" className="bg-[#272727] text-white py-16 px-6">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-8">
          <div className="text-center space-y-1">
            <p className="text-gold text-xs uppercase tracking-widest">
              Wedding Gift
            </p>
            <h2 className="font-serif text-2xl font-semibold">Hadiah</h2>
            <p className="text-stone-400 text-sm mt-3 leading-relaxed">
              {config.gift.message}
            </p>
          </div>

          <div className="space-y-4">
            {config.gift.accounts.map((acc, i) => (
              <div
                key={i}
                className="border border-[#5c5959] rounded-xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold text-xs uppercase tracking-widest">
                      {acc.type}
                    </p>
                    <p className="font-medium text-white mt-0.5">
                      {acc.bankName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 bg-[#000000] rounded-lg px-4 py-3">
                  <div>
                    <p className="text-stone-400 text-xs">Nomor Rekening</p>
                    <p className="text-white font-mono tracking-wider">
                      {acc.accountNumber}
                    </p>
                  </div>
                  <CopyButton text={acc.accountNumber} />
                </div>
                <p className="text-stone-400 text-xs">a.n. {acc.accountName}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
