import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import SectionReveal from '@/components/ui/SectionReveal';
import ReviewCard from '@/components/ui/ReviewCard';
import HeroCanvas from '@/components/ui/HeroCanvas';
import { useSEO } from '@/hooks/useSEO';
import { portfolioItems } from '@/data/portfolio';
import { reviews } from '@/data/reviews';
import { IMAGES_BASE, WHATSAPP_NUMBER } from '@/data/siteConfig';

/* ── data ──────────────────────────────────────────────── */
const clientStrip = [
  { src: 'inkhub-2.jpg', alt: 'Client showing tattoo' },
  { src: 'inkhub-3.jpg', alt: 'Client with forearm tattoo' },
  { src: 'inkhub-4.jpg', alt: 'Client with shoulder piece' },
  { src: 'inkhub-5.jpg', alt: 'Client with chest tattoo' },
  { src: 'inkhub-6.jpg', alt: 'Client with back tattoo' },
];

const galleryScroll = portfolioItems.slice(0, 8).map((p) => ({
  ...p, src: `${IMAGES_BASE}${p.src}`,
}));

const notSureImages = [
  { src: 'inkhub-10.jpg', alt: 'Consultation at AN Tattoo Shop' },
  { src: 'inkhub-11.jpg', alt: 'Design session at AN Tattoo Shop' },
];

const howItWorks = [
  {
    num: '01',
    img: 'inkhub-7.jpg',
    title: 'Start with a Free Consultation',
    desc: "Message us on WhatsApp and we'll set up a consultation, in-person at our studio, over a coffee. We'll talk through your idea, your placement, your artist options and your price. No commitment, no charge.",
  },
  {
    num: '02',
    img: 'inkhub-8.jpg',
    title: 'Your design, hand-drawn for you',
    desc: "Your chosen artist hand-draws your design from scratch. You're in the room while it takes shape, collaborating until it's exactly right.",
  },
  {
    num: '03',
    img: 'inkhub-9.jpg',
    title: 'Get Tattooed. Walk out proud.',
    desc: "Settle into your chair and let your artist get to work. Your price was confirmed before we started. Your design was approved. All that's left is the Art.",
  },
];

export default function Home() {
  useSEO(
    'AN Tattoo Shop — Premium Tattoo Studio in Kalyandurg, Andhra Pradesh',
    'AN Tattoo Shop in Kalyandurg. Custom tattoos, cover-ups, free consultation. Book now.',
  );

  const reviewRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // 3D tilt state for hero image
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20 });
  const shadowX = useTransform(springY, [-15, 15], [-20, 20]);
  const shadowY = useTransform(springX, [-15, 15], [20, -20]);

  const handleImageMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(dx * 14);
    rotateX.set(-dy * 14);
  }, [rotateX, rotateY]);

  const handleImageMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <PageTransition>

      {/* ══════════════════════════════════════════════
          1. HERO — particle canvas bg + 3D tilt image
      ══════════════════════════════════════════════ */}
      <section className="relative bg-white pt-[68px] min-h-[88vh] flex items-center overflow-hidden">

        {/* Ink-particle canvas — fills entire hero */}
        <HeroCanvas />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">

          {/* Left — text content */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[#888] text-[11px] font-bold tracking-[0.22em] uppercase mb-5"
            >
              Kalyandurg, Andhra Pradesh
            </motion.p>

            <h1 className="font-display text-[clamp(2.8rem,5.5vw,5rem)] font-black text-[#1a1a1a] leading-[1.0] mb-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="block"
              >
                We help you get
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.6 }}
                className="block"
              >
                a tattoo that speaks
              </motion.span>
              <motion.em
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6 }}
                className="not-italic text-[#e8b84b] block"
              >
                your story
              </motion.em>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[#555] text-[16px] leading-relaxed mb-10 max-w-md"
            >
              Kalyandurg's premium tattoo studio. Every piece is custom-designed,
              hand-drawn, and permanently yours. 8+ years of precision and passion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#c0392b] text-white font-black text-[13px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#e74c3c] transition-colors duration-200 text-center"
              >
                Book Free Consult
              </a>
              <Link
                to="/portfolio"
                className="btn border-2 border-[#1a1a1a] text-[#1a1a1a] font-black text-[13px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#c0392b] hover:text-white hover:border-[#c0392b] transition-colors duration-200 text-center"
              >
                View Gallery
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — 3D tilt hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
            className="relative hidden lg:block"
            style={{ perspective: 1000 }}
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
          >
            {/* Drop shadow that moves with tilt */}
            <motion.div
              className="absolute inset-0 rounded-none"
              style={{
                boxShadow: useTransform(
                  [shadowX, shadowY],
                  ([sx, sy]: number[]) =>
                    `${sx}px ${sy}px 60px rgba(232,184,75,0.25), ${sx * 0.5}px ${sy * 0.5}px 30px rgba(0,0,0,0.15)`,
                ),
              }}
            />

            {/* Tilt container */}
            <motion.div
              style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <motion.img
                  src={`${IMAGES_BASE}angelic-knight-1.jpg`}
                  alt="Premium tattoo artwork by AN Tattoo Shop"
                  loading="eager"
                  className="w-full h-full object-cover"
                  style={{
                    scale: useTransform(
                      [springX, springY],
                      ([rx, ry]: number[]) => 1 + (Math.abs(rx as number) + Math.abs(ry as number)) * 0.003,
                    ),
                  }}
                />
              </div>

              {/* Specular highlight overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: useTransform(
                    [springX, springY],
                    ([rx, ry]: number[]) => {
                      const x = 50 + (ry as number) * 2;
                      const y = 50 + (rx as number) * 2;
                      return `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
                    },
                  ),
                }}
              />

              {/* Floating rating badge — slightly extruded */}
              <motion.div
                className="absolute bottom-6 right-6 bg-white shadow-2xl px-5 py-4"
                style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
              >
                <div className="text-center">
                  <div className="font-display text-2xl font-black text-[#1a1a1a] leading-none">4.9</div>
                  <div className="flex gap-0.5 mt-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="#e8b84b" className="w-3 h-3">
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[9px] font-bold tracking-widest uppercase text-[#888] mt-1">Google</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. #INKYOURSTORY — yellow bg + client strip
      ══════════════════════════════════════════════ */}
      <section className="bg-[#e8b84b]">
        {/* Hashtag heading */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-14 pb-6">
          <SectionReveal>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-black text-[#1a1a1a] leading-none">
              #ink<em className="not-italic">yourstory</em>
            </h2>
          </SectionReveal>
        </div>

        {/* 5-col client photo strip — full width */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {clientStrip.map((img, i) => (
            <div key={i} className="aspect-[1500/647] overflow-hidden">
              <img
                src={`${IMAGES_BASE}${img.src}`}
                alt={img.alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        {/* Body text + CTA below strip */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <SectionReveal>
            <p className="text-[#1a1a1a] text-[16px] leading-relaxed max-w-lg">
              Every tattoo we create starts with your story. Whether it's a bold statement, a subtle symbol, or a tribute to someone you love — we take the time to understand what matters to you before any ink touches skin.
            </p>
          </SectionReveal>
          <SectionReveal>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#1a1a1a] text-white font-black text-[12px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#c0392b] transition-colors duration-200 text-center"
              >
                Book Now
              </a>
              <Link
                to="/portfolio"
                className="btn border-2 border-[#1a1a1a] text-[#1a1a1a] font-black text-[12px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#c0392b] hover:text-white hover:border-[#c0392b] transition-colors duration-200 text-center"
              >
                See Our Work
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. MEET THE ARTIST — text left + horizontal scroll gallery
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-14 items-start">
            {/* Left: text */}
            <SectionReveal>
              <p className="text-[#888] text-[11px] font-bold tracking-[0.22em] uppercase mb-4">Our Artist</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-black text-[#1a1a1a] leading-tight mb-6">
                Meet the<br />
                <em className="not-italic text-[#e8b84b]">AN Tattoo</em> Artist
              </h2>
              <p className="text-[#555] text-[15px] leading-relaxed mb-8">
                Anil Kumar has spent 8+ years perfecting his craft across realism, blackwork, portrait, and tribal styles. Every session starts with a conversation — because great tattoos start with understanding the person wearing them.
              </p>
              <Link
                to="/artist"
                className="inline-block btn bg-[#1a1a1a] text-white font-black text-[11px] tracking-[0.18em] uppercase px-8 py-4 hover:bg-[#e8b84b] hover:text-[#1a1a1a] transition-colors duration-200"
              >
                Meet the Artist
              </Link>
            </SectionReveal>

            {/* Right: horizontal scroll tattoo cards */}
            <div className="relative">
              <div
                ref={galleryRef}
                className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
                style={{ scrollbarWidth: 'none' }}
              >
                {galleryScroll.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-[220px] bg-[#f5f2ec] group"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading={i < 3 ? 'eager' : 'lazy'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[#1a1a1a] font-bold text-[10px] tracking-[0.15em] uppercase">
                        {item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* scroll hint fade */}
              <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. NOT SURE WHERE TO START — split layout
      ══════════════════════════════════════════════ */}
      <section className="bg-[#f5f2ec] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text */}
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.22em] uppercase mb-4">First Timer?</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-black text-[#1a1a1a] leading-tight mb-6">
              Not sure<br />
              <em className="not-italic">where to start?</em>
            </h2>
            <p className="text-[#555] text-[15px] leading-relaxed mb-6">
              That's exactly why we offer a free, no-pressure consultation. Come in, grab a coffee, and let's talk about your idea. We'll guide you through styles, placements, and pricing — no commitment required.
            </p>
            <p className="text-[#555] text-[15px] leading-relaxed mb-10">
              Most of our clients arrive with a vague idea and leave with a fully-formed concept they're excited about. That's the power of a real conversation.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn bg-[#c0392b] text-white font-black text-[12px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#e74c3c] transition-colors duration-200"
            >
              Book Free Consultation
            </a>
          </SectionReveal>

          {/* Right: 2 stacked images */}
          <SectionReveal>
            <div className="grid grid-cols-2 gap-3">
              {notSureImages.map((img, i) => (
                <div
                  key={i}
                  className={`overflow-hidden ${i === 0 ? 'mt-8 aspect-[1500/647]' : '-mt-8 aspect-[1944/2500]'}`}
                >
                  <img
                    src={`${IMAGES_BASE}${img.src}`}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. HOW IT WORKS — 3 numbered cards
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.22em] uppercase mb-4">Simple Process</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-black text-[#1a1a1a] leading-tight mb-16">
              How it works
            </h2>
          </SectionReveal>
          <SectionReveal variant="stagger">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step) => (
                <motion.div
                  key={step.num}
                  variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
                  className="bg-[#f5f2ec] border border-[#ebe8e3]"
                >
                  <div className="aspect-[1500/647] overflow-hidden">
                    <img
                      src={`${IMAGES_BASE}${step.img}`}
                      alt={step.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <span className="font-display text-[5.5rem] font-black text-[#1a1a1a]/8 leading-none block -mb-2">
                      {step.num}
                    </span>
                    <h3 className="font-display text-[1.2rem] font-black text-[#1a1a1a] mb-4 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[#666] text-[14px] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. READY TO START? — dark full-width CTA
      ══════════════════════════════════════════════ */}
      <section className="bg-[#1a1a1a] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 text-center">
          <SectionReveal>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black text-white uppercase leading-none mb-10">
              Ready to Start?
            </h2>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn bg-[#c0392b] text-white font-black text-[13px] tracking-[0.2em] uppercase px-14 py-5 hover:bg-[#e74c3c] transition-colors duration-200"
            >
              Book Free Consultation
            </a>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. TESTIMONIAL QUOTE — white section
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          <SectionReveal>
            <div className="text-[#e8b84b] text-[5rem] leading-none font-serif mb-4">"</div>
            <blockquote className="font-display text-[clamp(1.4rem,3.5vw,2.4rem)] font-black text-[#1a1a1a] leading-snug italic mb-8">
              Honestly the best tattoo experience I've had. Anil listened to exactly what I wanted and delivered something even better than I imagined. The studio is spotless and the whole process was smooth from start to finish.
            </blockquote>
            <p className="text-[#888] text-[12px] font-bold tracking-[0.2em] uppercase">
              — Arjun Reddy, Hyderabad
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. GIVE THE GIFT — yellow card
      ══════════════════════════════════════════════ */}
      <section className="bg-[#f5f2ec] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <div className="bg-[#e8b84b] p-12 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#1a1a1a]/60 text-[11px] font-bold tracking-[0.22em] uppercase mb-4">Gift Ideas</p>
                <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-black text-[#1a1a1a] leading-tight mb-6">
                  Give the gift of a story worth telling
                </h2>
                <p className="text-[#1a1a1a]/70 text-[15px] leading-relaxed mb-8">
                  Surprise someone with a consultation voucher for AN Tattoo Shop. No commitment — just the gift of a conversation and a custom design experience.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block btn bg-[#1a1a1a] text-white font-black text-[12px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#c0392b] transition-colors duration-200"
                >
                  Ask Us How
                </a>
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src={`${IMAGES_BASE}inkhub-13.jpg`}
                  alt="Gift a tattoo consultation"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. CLIENT REVIEWS — horizontal scroll
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-24 overflow-hidden">
        {/* Header — constrained */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-12">
          <SectionReveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[#888] text-[11px] font-bold tracking-[0.22em] uppercase mb-3">
                  Testimonials
                </p>
                <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-black text-[#1a1a1a] leading-tight">
                  What our clients say
                </h2>
              </div>
              <Link
                to="/reviews"
                className="hidden md:inline-block btn border-2 border-[#1a1a1a] text-[#1a1a1a] font-black text-[11px] tracking-[0.18em] uppercase px-7 py-3 hover:bg-[#c0392b] hover:text-white hover:border-[#c0392b] transition-colors duration-200"
              >
                All Reviews
              </Link>
            </div>
          </SectionReveal>
        </div>

        {/* Scroll track — full viewport width, padding gives left indent */}
        <div className="relative">
          <div
            ref={reviewRef}
            className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth"
            style={{
              paddingLeft: 'max(24px, calc((100vw - 1200px) / 2 + 40px))',
              paddingRight: '40px',
              paddingBottom: '16px',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px]"
              >
                <ReviewCard
                  review={{
                    ...review,
                    photo: review.photo ? `${IMAGES_BASE}${review.photo}` : undefined,
                  }}
                />
              </div>
            ))}
          </div>
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-white to-transparent" />
        </div>

        {/* Scroll arrows + mobile CTA */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mt-8 flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => reviewRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
              aria-label="Scroll reviews left"
              className="btn w-11 h-11 border-2 border-[#1a1a1a] flex items-center justify-center hover:bg-[#c0392b] hover:border-[#c0392b] hover:text-white transition-colors duration-200 text-[#1a1a1a]"
            >
              ←
            </button>
            <button
              onClick={() => reviewRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
              aria-label="Scroll reviews right"
              className="btn w-11 h-11 border-2 border-[#1a1a1a] flex items-center justify-center hover:bg-[#c0392b] hover:border-[#c0392b] hover:text-white transition-colors duration-200 text-[#1a1a1a]"
            >
              →
            </button>
          </div>
          <Link
            to="/reviews"
            className="md:hidden btn border-2 border-[#1a1a1a] text-[#1a1a1a] font-black text-[11px] tracking-[0.18em] uppercase px-7 py-3 hover:bg-[#c0392b] hover:text-white hover:border-[#c0392b] transition-colors duration-200"
          >
            All Reviews
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          10. FROM THE STUDIO — photo blog / updates
      ══════════════════════════════════════════════ */}
      <section className="bg-[#f5f2ec] py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.22em] uppercase mb-4">Latest Work</p>
            <div className="flex items-end justify-between mb-14">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-black text-[#1a1a1a] leading-tight">
                From the Studio
              </h2>
              <Link
                to="/portfolio"
                className="hidden md:inline-block btn border-2 border-[#1a1a1a] text-[#1a1a1a] font-black text-[11px] tracking-[0.18em] uppercase px-7 py-3 hover:bg-[#c0392b] hover:text-white hover:border-[#c0392b] transition-colors duration-200"
              >
                Full Gallery
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioItems.slice(30, 33).map((item) => (
              <SectionReveal key={item.id}>
                <Link to="/portfolio" className="block group bg-white">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`${IMAGES_BASE}${item.src}`}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[#888] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-display text-[1rem] font-black text-[#1a1a1a] leading-tight">
                      {item.alt.replace(' tattoo', '')}
                    </h3>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/portfolio"
              className="inline-block btn border-2 border-[#1a1a1a] text-[#1a1a1a] font-black text-[11px] tracking-[0.18em] uppercase px-7 py-3 hover:bg-[#c0392b] hover:text-white hover:border-[#c0392b] transition-colors duration-200"
            >
              Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          11. FINAL CTA — dark strip
      ══════════════════════════════════════════════ */}
      <section className="bg-[#1a1a1a] py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <SectionReveal>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black text-white uppercase leading-tight">
              Ready for your next tattoo?
            </h2>
            <p className="text-[#888] text-[14px] mt-2">No commitment. No charge. Just a conversation.</p>
          </SectionReveal>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#c0392b] text-white font-black text-[12px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-[#e74c3c] transition-colors duration-200 text-center"
            >
              WhatsApp Us
            </a>
            <Link
              to="/contact"
              className="border-2 border-white text-white font-black text-[12px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-white hover:text-[#1a1a1a] transition-colors duration-200 text-center"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
