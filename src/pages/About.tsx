import { Link } from 'react-router-dom';
import PageTransition from '@/components/ui/PageTransition';
import SectionReveal from '@/components/ui/SectionReveal';
import { useSEO } from '@/hooks/useSEO';
import { IMAGES_BASE } from '@/data/siteConfig';

const studioGallery = [
  { src: 'inkhub-3.jpg',  alt: 'AN Tattoo Shop studio interior' },
  { src: 'inkhub-4.jpg',  alt: 'Artist workspace' },
  { src: 'inkhub-5.jpg',  alt: 'Studio equipment' },
  { src: 'inkhub-6.jpg',  alt: 'Working environment' },
  { src: 'inkhub-10.jpg', alt: 'Consultation area' },
  { src: 'inkhub-11.jpg', alt: 'Tattoo in progress' },
];

const hygieneItems = [
  { icon: '◈', title: 'Sterile Equipment',      desc: 'All reusable tools are fully autoclave-sterilised before every session — no exceptions.' },
  { icon: '◇', title: 'Single-Use Needles',     desc: 'Fresh, factory-sealed needles opened in front of every client and disposed of immediately after.' },
  { icon: '✦', title: 'Safe Inks',              desc: 'Only licensed, dermatologically tested body-safe inks from verified manufacturers.' },
  { icon: '○', title: 'Professional Practices', desc: 'Gloves, surface barriers, and clinical-grade disinfection throughout every session.' },
];

export default function About() {
  useSEO('About AN Tattoo Shop — Our Story & Standards', 'Learn about AN Tattoo Shop in Kalyandurg — our story, hygiene standards, and mission.');

  return (
    <PageTransition>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="bg-[#f5f2ec] pt-24 pb-12">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-8">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Kalyandurg, Andhra Pradesh</p>
            <h1 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-black text-[#1a1a1a] uppercase leading-[0.9]">
              Our Story
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* ── Studio Story — two column ─────────────── */}
      <section className="bg-[#f5f2ec] pb-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionReveal>
            <div>
              <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-6">The Beginning</p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black text-[#1a1a1a] uppercase mb-8 leading-tight">
                Born in Kalyandurg.<br />Built on Craft.
              </h2>
              <div className="space-y-5 text-[#555] text-[15px] leading-relaxed">
                <p>
                  AN Tattoo Shop was founded with one purpose: to bring world-class tattoo artistry to Kalyandurg. What started as a personal passion quickly grew into the region's most respected tattoo studio.
                </p>
                <p>
                  Our lead artist trained under renowned artists in Hyderabad before returning to his roots in Andhra Pradesh — determined to prove that exceptional tattooing doesn't require a big-city address.
                </p>
                <p>
                  Eight years on, AN Tattoo Shop has built a reputation on clean lines, deep consultation, and genuine care for every client's experience. Every tattoo that leaves this studio is a permanent piece of art.
                </p>
              </div>
              <div className="mt-10">
                <Link
                  to="/artist"
                  className="inline-block btn bg-[#1a1a1a] text-white font-black text-[11px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-[#c0392b] transition-colors duration-200"
                >
                  Meet the Artist
                </Link>
              </div>
            </div>
          </SectionReveal>
          <SectionReveal>
            <div className="aspect-[1500/647] overflow-hidden">
              <img
                src={`${IMAGES_BASE}inkhub-2.jpg`}
                alt="AN Tattoo Shop studio"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Studio Gallery ────────────────────────── */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">The Space</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black text-white uppercase mb-14 leading-tight">
              Inside the Studio
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {studioGallery.map((img, i) => (
              <SectionReveal key={i}>
                <div className="aspect-square overflow-hidden group bg-[#222]">
                  <img
                    src={`${IMAGES_BASE}${img.src}`}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hygiene Standards ────────────────────── */}
      <section className="bg-[#f5f2ec] py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Health &amp; Safety</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black text-[#1a1a1a] uppercase mb-14 leading-tight">
              Our Hygiene Standards
            </h2>
          </SectionReveal>
          <SectionReveal variant="stagger">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hygieneItems.map((item) => (
                <div key={item.title} className="bg-white border border-[#e8e5e0] p-8">
                  <span className="text-[#e8b84b] text-2xl mb-5 block">{item.icon}</span>
                  <h3 className="font-display text-lg font-bold text-[#1a1a1a] mb-3">{item.title}</h3>
                  <p className="text-[#666] text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-28 px-6 md:px-10">
        <div className="max-w-[800px] mx-auto text-center">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-8">Our Mission</p>
            <blockquote className="font-display text-[clamp(1.8rem,4.5vw,3.5rem)] font-black text-white uppercase leading-tight mb-8">
              "We believe every person carries a story worth wearing."
            </blockquote>
            <p className="text-[#888] text-[15px] max-w-xl mx-auto mb-10 leading-relaxed">
              Our mission is to create tattooed art that is as unique as the person wearing it — designed with care, executed with precision, and built to last a lifetime.
            </p>
            <Link
              to="/services"
              className="inline-block btn bg-[#c0392b] text-white font-black text-[12px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#e74c3c] transition-colors duration-200"
            >
              Explore Services
            </Link>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
