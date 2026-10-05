import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import SectionReveal from '@/components/ui/SectionReveal';
import ReviewCard from '@/components/ui/ReviewCard';
import { useSEO } from '@/hooks/useSEO';
import { reviews } from '@/data/reviews';
import { IMAGES_BASE, WHATSAPP_NUMBER } from '@/data/siteConfig';

const starDist = [
  { stars: 5, pct: 85 },
  { stars: 4, pct: 10 },
  { stars: 3, pct: 3  },
  { stars: 2, pct: 1  },
  { stars: 1, pct: 1  },
];

const videoTestimonials = [
  { poster: 'testimonial-9.jpg',  name: 'Rajan Mehta',  text: 'Full arm sleeve — watch the journey' },
  { poster: 'testimonial-11.jpg', name: 'Suresh Babu',  text: 'Krishna realism — 8-hour session'   },
];

export default function Reviews() {
  useSEO('Client Reviews — AN Tattoo Shop', 'Read what clients say about AN Tattoo Shop in Kalyandurg. 4.9/5 average rating.');
  const [showVideoMsg, setShowVideoMsg] = useState<number | null>(null);

  return (
    <PageTransition>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="bg-[#f5f2ec] pt-24 pb-12">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-8">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">What Clients Say</p>
            <h1 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-black text-[#1a1a1a] uppercase leading-[0.9]">
              Client Stories
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* ── Rating Summary ────────────────────────── */}
      <section className="bg-[#f5f2ec] pb-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Big number */}
            <SectionReveal>
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-[9rem] font-black text-[#1a1a1a] leading-none">4.9</span>
                  <span className="font-display text-3xl font-black text-[#888]">/5</span>
                </div>
                <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Google Reviews</p>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="#e8b84b" className="w-6 h-6" aria-hidden="true">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#888] text-[13px]">Based on 200+ verified reviews</p>
              </div>
            </SectionReveal>

            {/* Star bars */}
            <SectionReveal>
              <div className="space-y-3">
                {starDist.map((row) => (
                  <div key={row.stars} className="flex items-center gap-4">
                    <span className="text-[#1a1a1a] font-bold text-[13px] w-8 text-right">{row.stars}★</span>
                    <div className="flex-1 bg-[#e0ddd8] h-2">
                      <motion.div
                        className="bg-[#e8b84b] h-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 * (5 - row.stars) }}
                      />
                    </div>
                    <span className="text-[#888] text-[12px] w-8">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Review Cards Grid ────────────────────── */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">200+ Reviews</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black text-white uppercase mb-14 leading-tight">
              Client Testimonials
            </h2>
          </SectionReveal>
          <SectionReveal variant="stagger">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <ReviewCard
                    review={{
                      ...review,
                      photo: review.photo ? `${IMAGES_BASE}${review.photo}` : undefined,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Video Testimonials ────────────────────── */}
      <section className="bg-[#f5f2ec] py-20">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">In Their Words</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black text-[#1a1a1a] uppercase mb-14 leading-tight">
              Video Stories
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoTestimonials.map((v, i) => (
              <SectionReveal key={i}>
                <div
                  className="relative aspect-video overflow-hidden cursor-pointer group border border-[#e0ddd8] bg-black"
                  onClick={() => setShowVideoMsg(i)}
                >
                  <img
                    src={`${IMAGES_BASE}${v.poster}`}
                    alt={`${v.name} video testimonial`}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-white/10 group-hover:bg-[#e8b84b] group-hover:border-[#e8b84b] transition-colors duration-200">
                      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white font-display text-lg font-bold mt-4">{v.name}</p>
                    <p className="text-white/70 text-[11px] tracking-widest uppercase mt-1">{v.text}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Video coming soon modal */}
          {showVideoMsg !== null && (
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
              onClick={() => setShowVideoMsg(null)}
            >
              <div
                className="bg-white border border-[#e0ddd8] p-12 text-center max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-display text-2xl font-black text-[#1a1a1a] uppercase mb-4">Coming Soon</p>
                <p className="text-[#666] text-[14px] leading-relaxed mb-8">
                  Full video testimonials are being recorded and will be uploaded shortly.
                </p>
                <button
                  className="btn btn-secondary px-8 py-3 text-[11px]"
                  onClick={() => setShowVideoMsg(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-20 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-black text-white uppercase leading-tight mb-3">
              Ready to write your story?
            </h2>
            <p className="text-[#888] text-[14px]">Join 500+ clients who trust AN Tattoo Shop.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-10 py-4 min-h-[52px] text-center text-[12px]"
            >
              WhatsApp Us
            </a>
            <Link
              to="/contact"
              className="btn btn-outline border-2 border-white text-white px-10 py-4 min-h-[52px] text-center text-[12px]"
            >
              Book Your Session
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
