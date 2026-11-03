'use client';
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// ── Welcome messages that cycle ────────────────────────────────
const messages = [
  "Hello! I'm NEXUS — Alfred's AI assistant.",
  "Welcome to Alfred's portfolio. How can I help?",
  "Explore Alfred's work in Data Science & Software.",
  "Click 'Explore My Work' to see Alfred's projects.",
  "Alfred turns data into insight. Let's connect!",
];

// ── Floating data particle ──────────────────────────────────────
function DataParticle({ x, y, delay, color }: { x: string; y: string; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{ left: x, top: y, background: color, boxShadow: `0 0 4px ${color}` }}
      animate={{ y: [0, -20, 0], opacity: [0, 0.8, 0] }}
      transition={{ duration: 3 + delay, ease: 'easeInOut', repeat: Infinity, delay }}
    />
  );
}

export default function NexusScene({ ready }: { ready: boolean }) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 50, damping: 20 };
  const robotX = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]),  springCfg);
  const robotY = useSpring(useTransform(mouseY, [-1, 1], [-8, 8]),  springCfg);
  const ringX  = useSpring(useTransform(mouseX, [-1, 1], [6, -6]),  springCfg);
  const ringY  = useSpring(useTransform(mouseY, [-1, 1], [6, -6]),  springCfg);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left - r.width  / 2) / (r.width  / 2));
      mouseY.set((e.clientY - r.top  - r.height / 2) / (r.height / 2));
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  // Chat bubble cycling
  const [msgIdx,    setMsgIdx]    = useState(0);
  const [showChat,  setShowChat]  = useState(false);
  const [eyePulse,  setEyePulse]  = useState(false);

  useEffect(() => {
    if (!ready) return;
    // Show chat after short delay
    const t1 = setTimeout(() => setShowChat(true), 2200);
    // Cycle messages
    const t2 = setInterval(() => {
      setEyePulse(true);
      setTimeout(() => setEyePulse(false), 600);
      setMsgIdx(i => (i + 1) % messages.length);
    }, 4500);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, [ready]);

  const particles = [
    { x:'15%', y:'20%', delay:0,   color:'#3b82f6' },
    { x:'80%', y:'15%', delay:0.8, color:'#a855f7' },
    { x:'10%', y:'65%', delay:1.5, color:'#06b6d4' },
    { x:'85%', y:'70%', delay:0.4, color:'#3b82f6' },
    { x:'50%', y:'10%', delay:1.2, color:'#a855f7' },
    { x:'25%', y:'80%', delay:2.1, color:'#3b82f6' },
    { x:'70%', y:'85%', delay:0.9, color:'#06b6d4' },
    { x:'90%', y:'45%', delay:1.7, color:'#a855f7' },
    { x:'5%',  y:'45%', delay:2.5, color:'#3b82f6' },
    { x:'55%', y:'88%', delay:0.3, color:'#06b6d4' },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center select-none">

      {/* ── Background radial glow ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 55%, rgba(59,130,246,0.08) 0%, rgba(168,85,247,0.04) 50%, transparent 75%)' }}/>

      {/* ── Floating particles ─────────────────────────────── */}
      {ready && particles.map((p, i) => <DataParticle key={i} {...p}/>)}

      {/* ── Outer rotating ring (slow) ─────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ x: ringX, y: ringY }}
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        <div className="w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px] rounded-full"
          style={{
            border: '1px solid rgba(59,130,246,0.25)',
            boxShadow: '0 0 20px rgba(59,130,246,0.08)',
          }}/>
      </motion.div>

      {/* ── Middle ring (counter-rotate) ────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ x: ringX, y: ringY }}
        animate={prefersReduced ? {} : { rotate: -360 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        <div className="w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] lg:w-[390px] lg:h-[390px] rounded-full"
          style={{ border: '1.5px solid rgba(168,85,247,0.3)' }}/>
      </motion.div>

      {/* ── Inner ring with dashes ───────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
      >
        <div className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full"
          style={{ border: '2px dashed rgba(59,130,246,0.35)' }}/>
      </motion.div>

      {/* ── Bright top lens flare ────────────────────────────── */}
      <motion.div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-8 h-8 pointer-events-none"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
      >
        <div className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(180,220,255,0.9), rgba(59,130,246,0.4), transparent)' }}/>
        {/* Cross sparkle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-6 bg-white/60 absolute"/>
          <div className="w-6 h-px bg-white/60 absolute"/>
        </div>
      </motion.div>

      {/* ── ROBOT IMAGE — main element ───────────────────────── */}
      <motion.div
        className="relative z-10"
        style={{ x: robotX, y: robotY }}
        animate={prefersReduced ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 30 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="relative"
        >
          {/* Eye glow pulse overlay */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none z-0"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 42%, rgba(59,130,246,0.35) 0%, transparent 70%)' }}
            animate={{ opacity: eyePulse ? [0.4, 1, 0.4] : [0.15, 0.35, 0.15] }}
            transition={{ duration: eyePulse ? 0.6 : 2.5, ease: 'easeInOut', repeat: Infinity }}
          />

          {/* Hero video — displayed freely, no card boundary */}
          <video
            src="/incredimate12_pindown.io_1793660625.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="NEXUS — Alfred's AI portfolio showcase"
            className="relative z-10"
            style={{
              width: '100%',
              maxWidth: '480px',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.6)) drop-shadow(0 0 80px rgba(59,130,246,0.25)) drop-shadow(0 0 120px rgba(168,85,247,0.15))',
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Chat bubble — interactive greeting ──────────────── */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="absolute top-[5%] left-[5%] max-w-[200px] z-30 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
          >
            <div className="relative">
              {/* Bubble */}
              <div className="rounded-2xl rounded-bl-sm px-4 py-3"
                style={{
                  background: 'rgba(8,20,50,0.92)',
                  border: '1px solid rgba(59,130,246,0.5)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 20px rgba(59,130,246,0.2)',
                }}>
                {/* Header */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-blue-400"
                    animate={{ opacity:[0.4,1,0.4] }}
                    transition={{ duration:1.2, repeat:Infinity }}
                  />
                  <span className="text-[8px] tracking-widest uppercase text-blue-400/80 font-semibold">NEXUS</span>
                </div>
                {/* Message — cycles */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={msgIdx}
                    className="text-[11px] text-white/85 leading-relaxed"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35 }}
                  >
                    {messages[msgIdx]}
                  </motion.p>
                </AnimatePresence>
                {/* Typing dots when about to change */}
              </div>
              {/* Tail */}
              <div className="absolute -bottom-1.5 left-4 w-3 h-3 rotate-45"
                style={{ background:'rgba(8,20,50,0.92)', borderRight:'1px solid rgba(59,130,246,0.5)', borderBottom:'1px solid rgba(59,130,246,0.5)' }}/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Platform glow beneath robot ──────────────────────── */}
      <motion.div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 pointer-events-none z-5"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
      >
        <div className="w-[180px] h-[24px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.1) 60%, transparent 100%)', filter: 'blur(6px)' }}/>
      </motion.div>

      {/* orbit dot removed */}
    </div>
  );
}
