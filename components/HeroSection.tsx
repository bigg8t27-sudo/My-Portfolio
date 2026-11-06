'use client';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import HolographicHUD from './HolographicHUD';
import NexusCommandInterface from './NexusCommandInterface';
import IntroModal from './IntroModal';

// ── Repeating typewriter for the "Hello I'm" badge ─────────────────────────────
const TYPING_PHRASES = [
  'Alfred Ofori',
  'a Data Scientist',
  'a Software Developer',
  'an Analytics Expert',
  'a Problem Solver',
];

function TypingText() {
  const prefersReduced = useReducedMotion();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayed(TYPING_PHRASES[0]);
      return;
    }
    const full = TYPING_PHRASES[phraseIdx];

    if (!deleting && displayed.length < full.length) {
      // Typing
      timeoutRef.current = setTimeout(() => {
        setDisplayed(full.slice(0, displayed.length + 1));
      }, 65);
    } else if (!deleting && displayed.length === full.length) {
      // Pause at full word then start deleting
      timeoutRef.current = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && displayed.length > 0) {
      // Deleting
      timeoutRef.current = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 38);
    } else if (deleting && displayed.length === 0) {
      // Move to next phrase
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % TYPING_PHRASES.length);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, phraseIdx, prefersReduced]);

  return (
    <span className="text-sm font-semibold text-blue-300 min-w-[1ch]">
      {displayed}
      <motion.span
        className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
}

const NexusScene = dynamic(() => import('./NexusScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-2 border-blue-500/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-3"/>
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/20">NEXUS initialising...</div>
      </div>
    </div>
  ),
});

export default function HeroSection({ ready }: { ready: boolean }) {
  const prefersReduced = useReducedMotion();
  const [scrolled,    setScrolled]    = useState(false);
  const [introOpen,   setIntroOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const cv = { hidden:{}, visible:{ transition:{ staggerChildren:0.1, delayChildren:0.05 } } };
  const fadeUp = (delay = 0) => ({
    hidden:   { opacity:0, y: prefersReduced ? 0 : 30 },
    visible:  { opacity:1, y:0, transition:{ duration:0.6, ease:[0.22,1,0.36,1] as const, delay } },
  });

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <>
      {/* ── Intro modal ─────────────────────────────────────── */}
      <IntroModal open={introOpen} onClose={() => setIntroOpen(false)}/>

      <section id="home" aria-label="Hero"
        className="relative min-h-screen w-full flex items-center overflow-hidden pt-16">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(0,20,80,0.7) 0%, rgba(0,5,20,0.9) 60%, #000 100%)' }}/>
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
          style={{ background:'radial-gradient(ellipse at bottom right, rgba(80,0,200,0.2) 0%, transparent 65%)', filter:'blur(40px)' }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full min-h-screen py-20 lg:py-0 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 items-center">

          {/* ── ROW 1 on mobile / COL 2 on desktop: Text ─── */}
          <motion.div
            className="flex flex-col gap-4 lg:gap-5 order-1 lg:order-2 pt-4 lg:pt-0"
            initial="hidden"
            animate={ready ? 'visible' : 'hidden'}
            variants={cv}
          >
            {/* Hello I'm */}
            <motion.div variants={fadeUp(0)} className="flex items-center gap-2">
              <div className="px-4 py-1.5 rounded-full flex items-center gap-2"
                style={{ background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.25)' }}>
                <span className="text-sm text-white/70">Hello, I&apos;m&nbsp;</span>
                <TypingText />
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={fadeUp(0.1)} className="leading-[0.92]" style={{ fontFamily:'Syne,sans-serif' }}>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight">
                ALFRED
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight"
                style={{ background:'linear-gradient(90deg,#3b82f6,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                OFORI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp(0.2)} className="text-base sm:text-lg text-white/65 leading-relaxed max-w-sm">
              I turn <strong className="text-white">data</strong> into{' '}
              <strong className="text-blue-400">insight</strong> and ideas into{' '}
              <strong className="text-purple-400">intelligent systems.</strong>
            </motion.p>

            {/* Tags */}
            <motion.div variants={fadeUp(0.25)} className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-white/35">
              <span>Data Science</span>
              <span className="text-blue-600/70">×</span>
              <span>Analytics</span>
              <span className="text-blue-600/70">×</span>
              <span>Software</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp(0.35)} className="flex flex-wrap gap-3">
              <motion.button type="button"
                onClick={() => scrollTo('portfolio')}
                aria-label="Explore portfolio work"
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white min-h-[44px]"
                style={{ background:'linear-gradient(135deg,#7c3aed,#3b82f6)', boxShadow:'0 0 24px rgba(100,60,220,0.35)' }}
                whileHover={prefersReduced ? {} : { scale:1.05, boxShadow:'0 0 36px rgba(100,60,220,0.55)' }}
                whileTap={prefersReduced ? {} : { scale:0.97 }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7a6 6 0 11-10.607-6.607 6 6 0 0110.607 6.606z"/>
                </svg>
                Explore My Work
              </motion.button>

              <motion.button type="button"
                onClick={() => setIntroOpen(true)}
                aria-label="Watch introduction"
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white/80 min-h-[44px]"
                style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.18)' }}
                whileHover={prefersReduced ? {} : { scale:1.05, background:'rgba(255,255,255,0.09)', borderColor:'rgba(59,130,246,0.4)' }}
                whileTap={prefersReduced ? {} : { scale:0.97 }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd"/>
                </svg>
                Watch Intro
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp(0.45)} className="flex gap-7 pt-3 border-t border-white/[0.05]">
              {[['5+','Years Exp.'],['120+','Projects'],['50+','Clients']].map(([n,l]) => (
                <div key={l} className="flex flex-col">
                  <span className="text-xl font-black" aria-label={`${n} ${l}`}
                    style={{ background:'linear-gradient(135deg,#3b82f6,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontFamily:'Syne,sans-serif' }}>
                    {n}
                  </span>
                  <span className="text-[10px] text-white/30 tracking-wider uppercase">{l}</span>
                </div>
              ))}
            </motion.div>

            {/* NEXUS Command Interface */}
            <motion.div variants={fadeUp(0.55)} className="mt-1">
              <NexusCommandInterface ready={ready}/>
            </motion.div>
          </motion.div>

          {/* ── ROW 2 on mobile / COL 1 on desktop: Robot + HUD ── */}
          <motion.div
            className="relative flex items-center justify-center order-2 lg:order-1"
            style={{ minHeight: '320px' }}
            initial={{ opacity:0, scale:0.93 }}
            animate={ready ? { opacity:1, scale:1 } : { opacity:0, scale:0.93 }}
            transition={{ duration:1.0, ease:[0.22,1,0.36,1], delay:0.2 }}
            aria-hidden="true"
          >
            <NexusScene ready={ready}/>
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              <HolographicHUD ready={ready}/>
            </div>
          </motion.div>

        </div>{/* end grid */}

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
          style={{ background:'linear-gradient(to bottom,transparent,rgba(0,0,0,0.85))' }} aria-hidden="true"/>

        {/* Scroll indicator */}
        <AnimatePresence>
          {!scrolled && ready && (
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ delay:2.8, duration:0.6 }}
              aria-hidden="true"
            >
              <motion.div
                className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
                animate={{ y:[0,4,0] }}
                transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}
              >
                <div className="w-0.5 h-2 rounded-full bg-blue-400/70"/>
              </motion.div>
              <span className="text-[8px] tracking-[0.25em] uppercase text-white/25">Scroll</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
