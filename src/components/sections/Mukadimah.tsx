import SectionWrapper from "@/components/layout/SectionWrapper";

export default function Mukadimah() {
  return (
    <section className="bg-cream py-16 px-6">
      <SectionWrapper>
        <div className="max-w-sm mx-auto text-center space-y-6">
          <p className="text-stone-400 text-xs tracking-widest uppercase">
            Bismillahirrahmanirrahim
          </p>
          <div className="w-full overflow-hidden">
            <p
              className="font-serif text-2xl leading-loose text-stone-800 text-center"
              dir="rtl"
              lang="ar"
            >
              وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ
              أَزْوَٰجًا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم
              مَّوَدَّةً وَرَحْمَةً
            </p>
          </div>
          <div className="w-12 h-px bg-gold mx-auto" />
          <p className="text-stone-600 text-sm leading-relaxed italic">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
            menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar
            kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
            antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p className="text-stone-400 text-xs">QS. Ar-Rum: 21</p>
        </div>
      </SectionWrapper>
    </section>
  );
}
