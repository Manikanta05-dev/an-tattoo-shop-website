import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { WHATSAPP_NUMBER } from '@/data/siteConfig';

const NAV_LINKS = [
  { label: 'Home',     to: '/'          },
  { label: 'About',    to: '/about'     },
  { label: 'Gallery',  to: '/portfolio' },
  { label: 'Artist',   to: '/artist'    },
  { label: 'Services', to: '/services'  },
  { label: 'Reviews',  to: '/reviews'   },
  { label: 'Contact',  to: '/contact'   },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled  ] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 w-full overflow-hidden ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 w-full">
        <div className="flex items-center justify-between h-[68px] w-full">

          {/* ── Logo ──────────────────────────── */}
          <Link to="/" onClick={close} className="flex items-baseline gap-1.5 flex-shrink-0">
            <span className="font-display text-[1.6rem] font-black text-[#1a1a1a] leading-none tracking-tight">
              AN
            </span>
            <span className="text-[9px] font-bold text-[#888] tracking-[0.22em] uppercase leading-none">
              Tattoo Shop
            </span>
          </Link>

          {/* ── Desktop nav links ─────────────── */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-[#1a1a1a] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-[#e8b84b] after:rounded-full'
                      : 'text-[#666] hover:text-[#1a1a1a]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* ── Book Now CTA ──────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-7 py-3 rounded-none whitespace-nowrap"
            >
              Book Now
            </a>
          </div>

          {/* ── Hamburger (mobile) ────────────── */}
          <button
            className="md:hidden w-11 h-11 flex flex-col justify-center items-center gap-[5px] text-[#1a1a1a]"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-[22px] h-[2px] bg-current transition-all duration-300 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-current transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-current transition-all duration-300 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ─────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-[#eee] overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4 flex flex-col">
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={close}
                  className={({ isActive }) =>
                    `py-3.5 text-[15px] border-b border-[#f0f0f0] last:border-0 font-semibold transition-colors duration-200 ${
                      isActive ? 'text-[#1a1a1a]' : 'text-[#666] hover:text-[#1a1a1a]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-5 px-6 py-3.5 text-center"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
