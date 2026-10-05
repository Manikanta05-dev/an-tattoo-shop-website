import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/ui/PageTransition';
import SectionReveal from '@/components/ui/SectionReveal';
import ReviewCard from '@/components/ui/ReviewCard';
import { useSEO } from '@/hooks/useSEO';
import { artist } from '@/data/artist';
import { IMAGES_BASE, WHATSAPP_NUMBER } from '@/data/siteConfig';

export default function Artist() {
  useSEO(
    'Meet the Artist — AN Tattoo Shop',
    'Meet Anil Kumar, founder and lead tattoo artist at AN Tattoo Shop in Kalyandurg, Andhra Pradesh.',
  );

  return (
    <PageTransition>
      {/* ── Hero: split layout ───────────────────── */}
      <section className="bg-[#f5f2ec] pt-16 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Photo col */}
        <div className="relative overflow-hidden" style={{ minHeight: 'clamp(320px, 60vw, 700px)' }}>
          <img
            src={`${IMAGES_BASE}${artist.photo}`}
            alt={`${artist.name} — AN Tattoo Shop lead artist`}
            loading="eager"
            className="w-full h-full object-cover object-right"
            style={{ position: 'absolute', inset: 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f5f2ec]/40 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Bio col */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-20 bg-[#f5f2ec]">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              Lead Artist & Founder
            </p>
            <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-black text-[#1a1a1a] uppercase leading-[0.88] mb-3">
              {artist.name}
            </h1>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-8">
              {artist.yearsExperience}+ Years Experience — Kalyandurg
            </p>
            {artist.bio.split('\n\n').map((para, i) => (
              <p key={i} className="text-[#555] text-[15px] leading-relaxed mb-5">
                {para}
              </p>
            ))}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-10 py-4 min-h-[52px] text-[12px] text-center"
              >
                Book with Anil
              </a>
              <Link
                to="/portfolio"
                className="btn btn-outline border-2 px-10 py-4 min-h-[52px] text-[12px] text-center"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Specialisations ──────────────────────── */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Expertise</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black text-white uppercase mb-12 leading-tight">
              Specialisations
            </h2>
          </SectionReveal>
          <SectionReveal>
            <div className="flex flex-wrap gap-3">
              {artist.specializations.map((spec) => (
                <span
                  key={spec}
                  className="border border-[#e8b84b] text-[#e8b84b] text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4"
                >
                  {spec}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Artist Portfolio Grid ────────────────── */}
      <section className="bg-[#f5f2ec] py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">The Portfolio</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black text-[#1a1a1a] uppercase mb-14 leading-tight">
              Selected Works
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {artist.portfolioImages.map((item, i) => (
              <SectionReveal key={item.id}>
                <div className="aspect-square overflow-hidden group bg-white">
                  <img
                    src={`${IMAGES_BASE}${item.src}`}
                    alt={item.alt}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </SectionReveal>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/portfolio"
              className="inline-block btn btn-outline border-2 px-8 py-4 text-[11px]"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────── */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Client Words</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black text-white uppercase mb-14 leading-tight">
              What They Say
            </h2>
          </SectionReveal>
          <SectionReveal variant="stagger">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artist.testimonials.map((t) => (
                <motion.div
                  key={t.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <ReviewCard
                    review={{
                      ...t,
                      photo: t.photo ? `${IMAGES_BASE}${t.photo}` : undefined,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
