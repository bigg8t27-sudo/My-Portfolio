'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Nav links that match existing section IDs on the page
const links = [
  { label: 'Home',         id: 'home'          },
  { label: 'About',        id: 'about'         },
  { label: 'Services',     id: 'services'      },
  { label: 'Projects',     id: 'portfolio'     },
  { label: 'Skills',       id: 'skills'        },
  { label: 'Process',      id: 'process'       },
  { label: 'Testimonials', id: 'testimonials'  },
  { label: 'Contact',      id: 'contact'       },
];

// ── Animated N lettermark ─────────────────────────────────────────────
function NexusLogo() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <defs>
        <linearGradient id="nGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
        <filter id="nGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Background hexagon */}
      <rect x="1" y="1" width="30" height="30" rx="7" fill="url(#nGrad)" opacity="0.15"
        stroke="url(#nGrad)" strokeWidth="0.8"/>
      {/* N lettermark */}
      <motion.path
        d="M8 24 L8 8 L16 20 L24 8 L24 24"
        fill="none"
        stroke="url(#nGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#nGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
      {/* Corner dots */}
      {[[8,8],[24,8],[8,24],[24,24]].map(([cx,cy],i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="1.8" fill="#3b82f6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: [0,1,0.6] }}
          transition={{ delay: 0.8 + i*0.1, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('Home');
  const menuId = 'mobile-menu';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const sectionEls = links
      .filter(l => l.id !== 'home')
      .map(l => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const match = links.find(l => l.id === e.target.id);
          if (match) setActive(match.label);
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sectionEls.forEach(s => observer.observe(s));
    const onScroll = () => { if (window.scrollY < 200) setActive('Home'); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape' && menuOpen) setMenuOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = useCallback((link: { label: string; id: string }) => {
    setMenuOpen(false);
    if (link.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActive('Home');
      return;
    }
    const el = document.getElementById(link.id);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); setActive(link.label); }
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          borderColor:     scrolled ? 'rgba(59,130,246,0.12)' : 'transparent',
          backgroundColor: scrolled ? 'rgba(0,4,18,0.75)'     : 'transparent',
          backdropFilter:  scrolled ? 'blur(20px)'             : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)'        : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* NEXUS logo */}
          <motion.a
            href="/"
            onClick={e => { e.preventDefault(); scrollTo({ label:'Home', id:'home' }); }}
            className="flex items-center gap-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-label="Alfred Ofori — go to top"
          >
            <NexusLogo/>
            <span className="text-lg font-black tracking-[0.15em] text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              NEX<span style={{ background:'linear-gradient(90deg,#3b82f6,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>US</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <motion.nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {links.map(link => (
              <button key={link.label} type="button" onClick={() => scrollTo(link)}
                aria-current={active === link.label ? 'page' : undefined}
                className={`relative text-[11px] tracking-widest uppercase font-medium transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 py-0.5 ${
                  active === link.label
                    ? 'text-blue-400'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                  active === link.label
                    ? 'w-full bg-blue-400'
                    : 'w-0 group-hover:w-full bg-white/40'
                }`}/>
              </button>
            ))}
          </motion.nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Hire Me */}
            <motion.button type="button"
              className="px-4 py-2 text-xs tracking-widest uppercase rounded-full text-blue-400 font-semibold border border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.6, delay:0.6 }}
              onClick={() => scrollTo({ label:'Contact', id:'contact' })}
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>
              Hire Me
            </motion.button>
          </div>

          {/* Hamburger */}
          <motion.button type="button"
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen} aria-controls={menuId}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}>
            <motion.span className="block h-px w-6 bg-white origin-center"
              animate={menuOpen ? { rotate:45, y:5 } : { rotate:0, y:0 }} transition={{ duration:0.3 }}/>
            <motion.span className="block h-px w-6 bg-white"
              animate={menuOpen ? { opacity:0, scaleX:0 } : { opacity:1, scaleX:1 }} transition={{ duration:0.3 }}/>
            <motion.span className="block h-px w-6 bg-white origin-center"
              animate={menuOpen ? { rotate:-45, y:-5 } : { rotate:0, y:0 }} transition={{ duration:0.3 }}/>
          </motion.button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div id={menuId} role="dialog" aria-modal="true" aria-label="Navigation menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.25 }}
            style={{ backgroundColor:'rgba(0,4,18,0.97)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)' }}>
            {/* Mobile NEXUS header */}
            <div className="absolute top-5 left-6 flex items-center gap-2">
              <NexusLogo/>
              <span className="text-sm font-black tracking-widest text-white" style={{ fontFamily:'Syne, sans-serif' }}>NEXUS</span>
            </div>
            <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-6">
              {links.map((link, i) => (
                <motion.button key={link.label} type="button" onClick={() => scrollTo(link)}
                  aria-current={active === link.label ? 'page' : undefined}
                  className="flex items-center gap-3 text-2xl font-bold tracking-wider uppercase focus:outline-none"
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay: i*0.06, duration:0.4 }}
                  style={{ fontFamily:'Syne, sans-serif' }}>
                  <span className="text-xs text-blue-500/60 w-6 text-right" style={{ fontFamily:'monospace' }}>0{i+1}</span>
                  <span className={active === link.label
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
                    : 'text-white/80'}>
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
