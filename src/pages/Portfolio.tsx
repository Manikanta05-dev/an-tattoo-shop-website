import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import SectionReveal from '@/components/ui/SectionReveal';
import Lightbox from '@/components/ui/Lightbox';
import { useSEO } from '@/hooks/useSEO';
import { portfolioItems } from '@/data/portfolio';
import { IMAGES_BASE, WHATSAPP_NUMBER } from '@/data/siteConfig';
import type { PortfolioCategory } from '@/types';

const CATEGORIES: PortfolioCategory[] = ['All', 'Realism', 'Blackwork', 'Portrait', 'Tribal', 'Custom'];

/* ── Placement gallery — matches reference 3-col layout with labels ── */
const placementGallery = [
  { placement: 'BICEP', img: 'angelic-knight-1.jpg',     alt: 'Angelic knight bicep tattoo',        cat: 'Realism'   },
  { placement: 'INNER FOREARM', img: 'enso-shogun-1.jpg',    alt: 'Enso shogun inner forearm tattoo',   cat: 'Blackwork' },
  { placement: 'RIB', img: 'cosmic-phoenix-1.jpg',  alt: 'Cosmic phoenix rib tattoo',          cat: 'Realism'   },
  { placement: 'COLLAR BONE', img: 'rose-essence-1.jpg',    alt: 'Rose essence collar bone tattoo',    cat: 'Custom'    },
  { placement: 'ANKLE', img: 'karma-trishul-1.jpg', alt: 'Karma trishul ankle tattoo',         cat: 'Tribal'    },
  { placement: 'BACK', img: 'dark-trinity-1.jpg',   alt: 'Dark trinity back tattoo',           cat: 'Realism'   },
  { placement: 'STRIP UP', img: 'veni-vidi-vici-1.jpg', alt: 'Veni vidi vici strip tattoo',        cat: 'Tribal'    },
  { placement: 'HIP', img: 'caught-in-love-1.jpg',  alt: 'Caught in love hip tattoo',          cat: 'Custom'    },
  { placement: 'SHIN', img: 'discipline.jpg',       alt: 'Discipline shin tattoo',             cat: 'Blackwork' },
];

/* ── Featured gallery (second grid, reference style) ── */
const featuredGallery = [
  { img: 'krishna-in-dhyan-1.jpg', label: 'THIGH',         cat: 'Realism'   },
  { img: 'sankat-mochan-1.jpg',    label: 'UPPER ARM',     cat: 'Realism'   },
  { img: 'the-eastern-dragon-1.jpg',label:'FULL BACK',     cat: 'Realism'   },
  { img: 'devoted-one-1.jpg',      label: 'INNER FOREARM', cat: 'Portrait'  },
  { img: 'panchmukhi-1.jpg',       label: 'THIGH',         cat: 'Realism'   },
  { img: 'natural-geometry-1.jpg', label: 'OUTER FOREARM', cat: 'Blackwork' },
  { img: 'wayfinder-1.jpg',        label: 'BACK OF PALM',  cat: 'Realism'   },
  { img: 'ikigai-1.jpg',           label: 'FINGERS',       cat: 'Custom'    },
  { img: 'karma-sabra-moksha-1.jpg',label: 'UNDER SCAR',   cat: 'Tribal'    },
  { img: 'excalibur-1.jpg',        label: 'CALF',          cat: 'Blackwork' },
  { img: 'forever-us-1.jpg',       label: 'WRIST',         cat: 'Custom'    },
  { img: 'dual-tone-yin-yang-1.jpg',label:'CHEST',         cat: 'Blackwork' },
];

export default function Portfolio() {
  useSEO(
    'Gallery — AN Tattoo Shop',
    'Browse our complete tattoo gallery. Placements across bicep, forearm, back, ribs, and more.',
  );

  const [filter, setFilter]           = useState<PortfolioCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allMapped = portfolioItems.map((item) => ({
    ...item,
    src: `${IMAGES_BASE}${item.src}`,
  }));
  const filtered = filter === 'All' ? allMapped : allMapped.filter((i) => i.category === filter);

  return (
    <PageTransition>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="bg-[#f5f2ec] pt-24 pb-0">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-10 pb-8">
          <SectionReveal>
            {/* Reference: giant bold serif heading */}
            <h1 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-black text-[#1a1a1a] leading-[0.9] uppercase mb-6">
              Tattoo Placements
            </h1>
            <p className="text-[#555] text-[15px] leading-relaxed max-w-lg">
              Every body is different. Every placement tells a different story. Browse our work by placement and find the perfect spot for your next piece.
            </p>
            <p className="text-[#555] text-[15px] leading-relaxed max-w-lg mt-3">
              Book a free consultation and we'll help you decide what works best for your body — size, placement, style, price — all before any commitment.
            </p>
          </SectionReveal>
        </div>

        {/* ─── PLACEMENT GRID (reference: 3 cols, portrait images, label + button) ─ */}
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placementGallery.map((item, i) => (
              <div key={i} className="bg-white">
                {/* Image — portrait ratio like reference */}
                <div className="aspect-[3/4] overflow-hidden cursor-pointer group bg-white"
                  onClick={() => {
                    const idx = portfolioItems.findIndex((p) => p.src === item.img);
                    if (idx !== -1) setLightboxIndex(idx);
                  }}
                >
                  <img
                    src={`${IMAGES_BASE}${item.img}`}
                    alt={item.alt}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Label row — matches reference exactly */}
                <div className="px-4 py-4">
                  <p className="text-[#1a1a1a] font-bold text-[13px] tracking-widest uppercase mb-3">
                    {item.placement}
                  </p>
                  <Link
                    to="/contact"
                    className="btn btn-secondary inline-block px-5 py-2 text-[10px]"
                  >
                    Book this collection
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── MID-PAGE PROMO BANNER (reference: yellow/black stripe) ─ */}
        <div className="bg-[#1a1a1a] py-10 px-6 md:px-10">
          <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              {/* Badge icon */}
              <div className="w-16 h-16 bg-[#e8b84b] rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="font-display font-black text-[#1a1a1a] text-lg leading-none text-center">AN</span>
              </div>
              <div>
                <p className="text-[#e8b84b] text-[11px] font-bold tracking-[0.2em] uppercase mb-1">Premium Inks</p>
                <h2 className="font-display text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                  Dermatologically tested.<br />Premium quality.
                </h2>
              </div>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-10 py-4 flex-shrink-0 text-[12px]"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* ─── FEATURED GALLERY (reference: larger 3-col below the banner) ─ */}
        <div className="bg-[#f5f2ec] max-w-[1100px] mx-auto px-6 lg:px-10 py-16">
          <SectionReveal>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black text-[#1a1a1a] uppercase mb-10">
              Featured Work
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGallery.map((item, i) => (
              <SectionReveal key={i}>
                <div className="bg-white group">
                  <div className="aspect-square overflow-hidden cursor-pointer"
                    onClick={() => {
                      const idx = portfolioItems.findIndex((p) => p.src === item.img);
                      if (idx !== -1) setLightboxIndex(idx);
                    }}
                  >
                    <img
                      src={`${IMAGES_BASE}${item.img}`}
                      alt={`${item.label} tattoo`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-[#1a1a1a] font-bold text-[12px] tracking-widest uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-[#888] text-[11px] tracking-widest uppercase">{item.cat}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FILTER + FULL GALLERY ─────────────────────────── */}
      <section className="bg-[#f5f2ec] pb-20 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal>
            <div className="flex flex-wrap gap-2 mb-10 border-t border-[#ddd] pt-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`min-h-[38px] px-6 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors duration-200 ${
                    filter === cat
                      ? 'bg-[#1a1a1a] text-white'
                      : 'bg-white text-[#1a1a1a] border border-[#ddd] hover:border-[#1a1a1a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filtered.map((item, i) => (
                <div
                  key={item.id}
                  className="bg-white cursor-pointer group"
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-3 py-3">
                    <p className="text-[#1a1a1a] text-[11px] font-bold tracking-widest uppercase truncate">
                      {item.alt.replace(' tattoo', '').replace(' realism', '').replace(' blackwork', '').replace(' portrait', '')}
                    </p>
                    <p className="text-[#999] text-[10px] tracking-widest uppercase mt-0.5">{item.category}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center text-[#999] py-24 text-sm">No pieces found for this category.</p>
          )}
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-16 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white uppercase">
              Want us to design your dream tattoo?
            </h2>
            <p className="text-gray-400 text-sm mt-2">Free consultation. No commitment. No charge.</p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-10 py-4 flex-shrink-0 text-[12px]"
          >
            Book Now
          </a>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((idx) => (idx !== null && idx > 0 ? idx - 1 : filtered.length - 1))}
          onNext={() => setLightboxIndex((idx) => (idx !== null && idx < filtered.length - 1 ? idx + 1 : 0))}
        />
      )}
    </PageTransition>
  );
}
