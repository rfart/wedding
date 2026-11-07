import Image from "next/image";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { config } from "@/config";

export default function LoveStory() {
  return (
    <section className="bg-white py-16 px-6">
      <SectionWrapper>
        <div className="max-w-sm mx-auto space-y-10">
          <div className="text-center space-y-1">
            <p className="text-gold text-xs uppercase tracking-widest">
              Perjalanan Cinta
            </p>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              Love Story
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-beige" />
            <div className="space-y-10">
              {config.loveStory.map((item, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-gold border-2 border-white shadow-sm" />
                  <div className="space-y-2">
                    <span className="text-gold text-xs font-semibold uppercase tracking-widest">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-stone-800">
                      {item.title}
                    </h3>
                    {item.photo && (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden">
                        <Image
                          src={item.photo}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
