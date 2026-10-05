import { Link } from 'react-router-dom';
import PageTransition from '@/components/ui/PageTransition';
import SectionReveal from '@/components/ui/SectionReveal';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { useSEO } from '@/hooks/useSEO';
import { services } from '@/data/services';
import { faqs } from '@/data/faqs';
import { IMAGES_BASE, WHATSAPP_NUMBER } from '@/data/siteConfig';

const processSteps = [
  {
    num: '01',
    title: 'Start with a Free Consultation',
    desc: "Message us on WhatsApp and we'll set up a consultation — in-person at our studio, over a coffee. We'll talk through your idea, placement, artist options, and price. No commitment, no charge.",
    img: 'inkhub-7.jpg',
  },
  {
    num: '02',
    title: 'Your design, hand-drawn for you',
    desc: "Your chosen artist hand-draws your design from scratch. You're in the room while it takes shape, collaborating until it's exactly right.",
    img: 'inkhub-8.jpg',
  },
  {
    num: '03',
    title: 'Get Tattooed. Walk out proud.',
    desc: "Settle into your chair and let your artist get to work. Your price was confirmed before we started. Your design was approved before we started. All that's left is the Art.",
    img: 'inkhub-9.jpg',
  },
  {
    num: '04',
    title: 'Aftercare Guidance',
    desc: "We send you home with a full aftercare sheet and stay available on WhatsApp for any questions during healing. Your tattoo is a lifelong investment — we treat it that way.",
    img: 'inkhub-12.jpg',
  },
];

const serviceIcons: Record<string, string> = {
  '1': '✦',
  '2': '◈',
  '3': '◇',
  '4': '○',
};

export default function Services() {
  useSEO('Services — AN Tattoo Shop', 'Custom tattoos, cover-ups, touch-ups, and free consultations at AN Tattoo Shop in Kalyandurg.');

  return (
    <PageTransition>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="bg-[#f5f2ec] pt-24 pb-12">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-8">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">What We Do</p>
            <h1 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-black text-[#1a1a1a] uppercase leading-[0.9]">
              Services
            </h1>
            <p className="text-[#555] text-[15px] mt-5 max-w-lg leading-relaxed">
              Everything from your first consultation to a full custom sleeve. Every session starts with a free, no-obligation conversation.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Service Cards ─────────────────────────── */}
      <section className="bg-[#f5f2ec] pb-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionReveal variant="stagger">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white border border-[#e8e5e0] p-8 flex flex-col">
                  <span className="text-[#e8b84b] text-3xl mb-5 block">{serviceIcons[service.id] ?? '✦'}</span>
                  <h3 className="font-display text-xl font-black text-[#1a1a1a] uppercase mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[#666] text-[13px] leading-relaxed mb-5 flex-grow">
                    {service.description}
                  </p>
                  {service.highlights.length > 0 && (
                    <ul className="space-y-1.5 mb-6">
                      {service.highlights.map((h, i) => (
                        <li key={i} className="text-[#888] text-[12px] flex gap-2">
                          <span className="text-[#e8b84b] flex-shrink-0">—</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to="/contact"
                    className="inline-block btn bg-[#1a1a1a] text-white font-black text-[10px] tracking-[0.18em] uppercase px-5 py-3 text-center hover:bg-[#c0392b] transition-colors duration-200 mt-auto"
                  >
                    Book Now
                  </Link>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Process Steps (01/02/03/04) ───────────── */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">The Journey</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black text-white uppercase mb-14 leading-tight">
              How It Works
            </h2>
          </SectionReveal>
          <SectionReveal variant="stagger">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step) => (
                <div key={step.num} className="bg-[#222] border border-white/10">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={`${IMAGES_BASE}${step.img}`}
                      alt={step.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="font-display text-[4rem] font-black text-white/10 leading-none block mb-3">
                      {step.num}
                    </span>
                    <h3 className="font-display text-[1rem] font-bold text-white mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[#888] text-[13px] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Promo Banner ──────────────────────────── */}
      <section className="bg-[#e8b84b] py-16 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[#1a1a1a]/60 text-[11px] font-bold tracking-[0.2em] uppercase mb-2">Premium Quality</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black text-[#1a1a1a] uppercase leading-tight">
              Dermatologically tested.<br />Premium quality.
            </h2>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#1a1a1a] text-white font-black text-[12px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#c0392b] transition-colors duration-200 flex-shrink-0"
          >
            Book Now
          </a>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="bg-[#f5f2ec] py-20">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Questions</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black text-[#1a1a1a] uppercase mb-14 leading-tight">
              Frequently Asked
            </h2>
          </SectionReveal>
          <SectionReveal>
            <FAQAccordion items={faqs} />
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-20 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-black text-white uppercase leading-tight mb-3">
              Start with a free consult.
            </h2>
            <p className="text-[#888] text-[14px]">No commitment. No charge. Just a conversation.</p>
          </div>
          <Link
            to="/contact"
            className="btn bg-[#c0392b] text-white font-black text-[12px] tracking-[0.18em] uppercase px-10 py-4 min-h-[52px] hover:bg-[#e74c3c] transition-colors duration-200 flex-shrink-0 text-center"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
