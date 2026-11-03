'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';

/* ─── Floating UI panel data ─────────────────────────────── */
const panels = [
  {
    id: 'figma',
    title: 'Design System',
    sub: 'Components · Tokens · Styles',
    accent: '59,130,246',
    pos: { top: '4%', right: '0%' },
    delay: 3.6, speed: 5.2,
    bars: [80, 60, 90, 45, 70],
  },
  {
    id: 'code',
    title: 'main.tsx',
    sub: null,
    accent: '139,92,246',
    pos: { bottom: '12%', right: '-2%' },
    delay: 4.0, speed: 6.0,
    code: true,
  },
  {
    id: 'analytics',
    title: 'Performance',
    sub: 'Lighthouse Score',
    accent: '6,182,212',
    pos: { top: '30%', left: '-4%' },
    delay: 3.8, speed: 7.0,
    score: 98,
  },
  {
    id: 'mockup',
    title: 'UI Preview',
    sub: 'Landing Page v3',
    accent: '139,92,246',
    pos: { bottom: '28%', left: '-2%' },
    delay: 4.2, speed: 4.8,
    mockup: true,
  },
];

/* ─── Code panel lines ───────────────────────────────────── */
const codeLines = [
  { text: 'export default function', color: 'rgba(139,92,246,0.9)', w: 112 },
  { text: '  Hero() {', color: 'rgba(255,255,255,0.7)', w: 56 },
  { text: '  const [ready,', color: 'rgba(6,182,212,0.85)', w: 80 },
  { text: '    setReady] = useState', color: 'rgba(255,255,255,0.6)', w: 96 },
  { text: '  return (', color: 'rgba(59,130,246,0.9)', w: 50 },
  { text: '    <motion.div', color: 'rgba(139,92,246,0.8)', w: 72 },
  { text: '      animate={...}', color: 'rgba(6,182,212,0.7)', w: 88 },
  { text: '    />', color: 'rgba(59,130,246,0.7)', w: 30 },
];

export default function CharacterVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ─── Mouse parallax ─────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 55, damping: 22 };

  const charX  = useSpring(useTransform(mouseX, [-1,1], [-6, 6]),  spring);
  const charY  = useSpring(useTransform(mouseY, [-1,1], [-6, 6]),  spring);
  const panelX = useSpring(useTransform(mouseX, [-1,1], [12,-12]), spring);
  const panelY = useSpring(useTransform(mouseY, [-1,1], [12,-12]), spring);
  const bgX    = useSpring(useTransform(mouseX, [-1,1], [-20,20]), spring);
  const bgY    = useSpring(useTransform(mouseY, [-1,1], [-20,20]), spring);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left - r.width  / 2) / (r.width  / 2));
      mouseY.set((e.clientY - r.top  - r.height / 2) / (r.height / 2));
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center select-none">

      {/* ── Layer 1: deep background glow (slowest parallax) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        {/* Large purple bloom */}
        <div className="absolute"
          style={{
            width: 480, height: 480,
            top: '10%', left: '15%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)',
            filter: 'blur(32px)',
          }}
        />
        {/* Blue bloom */}
        <div className="absolute"
          style={{
            width: 360, height: 360,
            bottom: '5%', right: '10%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 65%)',
            filter: 'blur(28px)',
          }}
        />
        {/* Cyan accent */}
        <div className="absolute"
          style={{
            width: 220, height: 220,
            top: '40%', right: '5%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>

      {/* ── Layer 2: character (idle float + parallax) ─────── */}
      <motion.div
        className="relative z-10 flex items-end justify-center"
        style={{ x: charX, y: charY }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
      >
        <svg
          viewBox="0 0 340 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-56 h-auto sm:w-64 md:w-72 lg:w-80 xl:w-[340px] drop-shadow-2xl"
          aria-label="Professional web designer illustration"
        >
          <defs>
            {/* Suit gradient */}
            <linearGradient id="suitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b"/>
              <stop offset="100%" stopColor="#0f0e2a"/>
            </linearGradient>
            {/* Shirt gradient */}
            <linearGradient id="shirtGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1d2a52"/>
              <stop offset="100%" stopColor="#111827"/>
            </linearGradient>
            {/* Skin gradient */}
            <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B6048"/>
              <stop offset="100%" stopColor="#6B4226"/>
            </linearGradient>
            {/* Hair gradient */}
            <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c1810"/>
              <stop offset="100%" stopColor="#1a0f0a"/>
            </linearGradient>
            {/* Screen glow */}
            <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.3)"/>
              <stop offset="100%" stopColor="rgba(59,130,246,0)"/>
            </radialGradient>
            {/* Chair gradient */}
            <linearGradient id="chairGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a2e"/>
              <stop offset="100%" stopColor="#0d0d1a"/>
            </linearGradient>
            {/* Desk gradient */}
            <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b"/>
              <stop offset="100%" stopColor="#0a0a1a"/>
            </linearGradient>
            {/* Glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* Strong glow */}
            <filter id="strongGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* Screen reflection clip */}
            <clipPath id="screenClip">
              <rect x="85" y="52" width="170" height="110" rx="4"/>
            </clipPath>
          </defs>

          {/* ── MONITOR ───────────────────────────────────────── */}
          {/* Monitor body */}
          <rect x="78" y="44" width="184" height="124" rx="8"
            fill="url(#deskGrad)" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5"/>
          {/* Screen bezel */}
          <rect x="85" y="52" width="170" height="110" rx="4" fill="#03030e"/>
          {/* Screen glow overlay */}
          <rect x="85" y="52" width="170" height="110" rx="4" fill="url(#screenGlow)" opacity="0.6"/>

          {/* Screen content – website wireframe */}
          {/* Nav bar */}
          <rect x="89" y="56" width="162" height="14" rx="2" fill="rgba(15,12,40,0.9)"/>
          <rect x="93" y="60" width="28" height="6" rx="1" fill="rgba(59,130,246,0.7)"/>
          <rect x="205" y="60" width="16" height="6" rx="1" fill="rgba(255,255,255,0.2)"/>
          <rect x="226" y="60" width="16" height="6" rx="1" fill="rgba(255,255,255,0.2)"/>
          <rect x="247" y="60" width="16" height="6" rx="1" fill="rgba(59,130,246,0.5)"/>

          {/* Hero area */}
          <rect x="89" y="73" width="162" height="54" rx="0" fill="rgba(8,6,22,0.95)"/>
          {/* Big headline bars */}
          <rect x="95" y="79" width="75" height="7" rx="2" fill="rgba(59,130,246,0.8)" filter="url(#glow)"/>
          <rect x="95" y="90" width="55" height="5" rx="2" fill="rgba(139,92,246,0.65)"/>
          <rect x="95" y="99" width="90" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
          <rect x="95" y="107" width="70" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
          {/* CTA button */}
          <rect x="95" y="116" width="38" height="8" rx="4"
            fill="rgba(59,130,246,0.9)" filter="url(#glow)"/>
          <rect x="138" y="116" width="30" height="8" rx="4"
            fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="1"/>

          {/* Card grid */}
          <rect x="89" y="130" width="50" height="28" rx="2" fill="rgba(15,12,40,0.8)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5"/>
          <rect x="93" y="134" width="28" height="4" rx="1" fill="rgba(59,130,246,0.5)"/>
          <rect x="93" y="141" width="38" height="3" rx="1" fill="rgba(255,255,255,0.2)"/>
          <rect x="93" y="147" width="32" height="3" rx="1" fill="rgba(255,255,255,0.15)"/>

          <rect x="143" y="130" width="50" height="28" rx="2" fill="rgba(15,12,40,0.8)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5"/>
          <rect x="147" y="134" width="28" height="4" rx="1" fill="rgba(139,92,246,0.5)"/>
          <rect x="147" y="141" width="38" height="3" rx="1" fill="rgba(255,255,255,0.2)"/>
          <rect x="147" y="147" width="32" height="3" rx="1" fill="rgba(255,255,255,0.15)"/>

          <rect x="197" y="130" width="50" height="28" rx="2" fill="rgba(15,12,40,0.8)" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5"/>
          <rect x="201" y="134" width="28" height="4" rx="1" fill="rgba(6,182,212,0.5)"/>
          <rect x="201" y="141" width="38" height="3" rx="1" fill="rgba(255,255,255,0.2)"/>
          <rect x="201" y="147" width="32" height="3" rx="1" fill="rgba(255,255,255,0.15)"/>

          {/* Monitor bottom bezel */}
          <rect x="78" y="168" width="184" height="8" rx="0"
            fill="rgba(20,18,48,0.9)" stroke="rgba(59,130,246,0.4)" strokeWidth="0.5"/>

          {/* Monitor stand neck */}
          <rect x="157" y="176" width="26" height="22" rx="2" fill="rgba(18,16,44,0.95)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5"/>
          {/* Stand base */}
          <ellipse cx="170" cy="200" rx="44" ry="7" fill="rgba(14,12,38,0.95)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5"/>

          {/* Monitor screen glow spill */}
          <ellipse cx="170" cy="176" rx="80" ry="6" fill="rgba(59,130,246,0.06)" filter="url(#glow)"/>

          {/* ── DESK ──────────────────────────────────────────── */}
          <rect x="20" y="292" width="300" height="18" rx="4"
            fill="url(#deskGrad)" stroke="rgba(59,130,246,0.35)" strokeWidth="1"/>
          {/* Desk glow edge */}
          <rect x="20" y="292" width="300" height="2" rx="1" fill="rgba(59,130,246,0.25)" filter="url(#glow)"/>

          {/* ── KEYBOARD ───────────────────────────────────────── */}
          <rect x="108" y="284" width="124" height="10" rx="3"
            fill="rgba(12,10,32,0.95)" stroke="rgba(59,130,246,0.35)" strokeWidth="0.75"/>
          {/* Key rows */}
          {[0,1,2,3,4,5,6,7,8,9,10,11].map((k) => (
            <rect key={k} x={111 + k * 9} y={286} width="7" height="3" rx="1"
              fill="rgba(59,130,246,0.25)"/>
          ))}
          {[0,1,2,3,4,5,6,7,8,9].map((k) => (
            <rect key={k} x={115 + k * 9} y={291} width="7" height="2" rx="1"
              fill="rgba(139,92,246,0.2)"/>
          ))}

          {/* ── MOUSE ──────────────────────────────────────────── */}
          <rect x="240" y="285" width="22" height="14" rx="7"
            fill="rgba(12,10,32,0.95)" stroke="rgba(59,130,246,0.35)" strokeWidth="0.75"/>
          <line x1="251" y1="285" x2="251" y2="299" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5"/>

          {/* ── CHAIR ──────────────────────────────────────────── */}
          {/* Seat */}
          <ellipse cx="170" cy="420" rx="72" ry="16"
            fill="url(#chairGrad)" stroke="rgba(59,130,246,0.2)" strokeWidth="1"/>
          {/* Back rest */}
          <rect x="122" y="320" width="96" height="100" rx="16"
            fill="url(#chairGrad)" stroke="rgba(59,130,246,0.2)" strokeWidth="1"/>
          {/* Back rest stitching */}
          <rect x="130" y="328" width="80" height="84" rx="10"
            fill="none" stroke="rgba(59,130,246,0.12)" strokeWidth="0.75" strokeDasharray="4 3"/>
          {/* Chair pillar */}
          <rect x="162" y="432" width="16" height="28" rx="3"
            fill="rgba(18,16,44,0.95)"/>
          {/* Chair base */}
          {[-50,-25,0,25,50].map((x, i) => (
            <line key={i} x1={170} y1={460} x2={170+x} y2={474}
              stroke="rgba(18,16,44,0.9)" strokeWidth="4" strokeLinecap="round"/>
          ))}
          {[-50,-25,0,25,50].map((x, i) => (
            <circle key={i} cx={170+x} cy={474} r="4"
              fill="rgba(12,10,32,0.95)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5"/>
          ))}

          {/* Chair arm rests */}
          <rect x="96" y="355" width="18" height="50" rx="6"
            fill="rgba(18,16,44,0.9)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5"/>
          <rect x="226" y="355" width="18" height="50" rx="6"
            fill="rgba(18,16,44,0.9)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5"/>

          {/* ── BODY / SUIT ─────────────────────────────────────── */}
          {/* Torso */}
          <path d="M120 295 Q125 310 120 340 Q120 360 122 380 L218 380 Q220 360 220 340 Q215 310 220 295 Q200 285 170 283 Q140 285 120 295Z"
            fill="url(#suitGrad)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.75"/>

          {/* Left lapel */}
          <path d="M163 283 L155 295 L165 310 L170 295Z"
            fill="rgba(20,18,50,0.9)" stroke="rgba(59,130,246,0.25)" strokeWidth="0.5"/>
          {/* Right lapel */}
          <path d="M177 283 L185 295 L175 310 L170 295Z"
            fill="rgba(20,18,50,0.9)" stroke="rgba(59,130,246,0.25)" strokeWidth="0.5"/>

          {/* Shirt / inner */}
          <path d="M163 283 L170 295 L177 283 Q170 278 163 283Z"
            fill="rgba(30,42,82,0.95)"/>

          {/* Tie */}
          <path d="M167 284 L165 295 L170 318 L175 295 L173 284 Q170 281 167 284Z"
            fill="rgba(59,130,246,0.75)" stroke="rgba(59,130,246,0.4)" strokeWidth="0.5"/>
          <path d="M166 284 L168 290 L172 290 L174 284Z"
            fill="rgba(59,130,246,0.9)"/>

          {/* Suit jacket buttons */}
          <circle cx="170" cy="332" r="2.5" fill="rgba(59,130,246,0.6)"/>
          <circle cx="170" cy="348" r="2.5" fill="rgba(59,130,246,0.5)"/>
          <circle cx="170" cy="364" r="2.5" fill="rgba(59,130,246,0.4)"/>

          {/* Pocket square */}
          <rect x="124" y="298" width="14" height="10" rx="1"
            fill="rgba(59,130,246,0.3)"/>
          <path d="M124 300 L131 294 L138 300" fill="rgba(6,182,212,0.6)" stroke="none"/>

          {/* Left arm */}
          <path d="M120 295 Q96 305 88 330 Q84 345 90 360 Q96 368 106 365 Q116 362 118 350 Q120 340 124 332 Q128 315 124 300Z"
            fill="url(#suitGrad)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5"/>
          {/* Left cuff */}
          <path d="M88 350 Q84 360 88 368 Q96 375 106 368 Q114 362 112 355 Q104 370 92 363Z"
            fill="rgba(30,42,82,0.9)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5"/>

          {/* Right arm */}
          <path d="M220 295 Q244 305 252 330 Q256 345 250 360 Q244 368 234 365 Q224 362 222 350 Q220 340 216 332 Q212 315 216 300Z"
            fill="url(#suitGrad)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5"/>
          {/* Right cuff */}
          <path d="M252 350 Q256 360 252 368 Q244 375 234 368 Q226 362 228 355 Q236 370 248 363Z"
            fill="rgba(30,42,82,0.9)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5"/>

          {/* Left hand on keyboard */}
          <ellipse cx="114" cy="288" rx="14" ry="8" fill="url(#skinGrad)" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>
          {/* Fingers left */}
          <rect x="100" y="283" width="6" height="9" rx="3" fill="url(#skinGrad)"/>
          <rect x="108" y="281" width="6" height="10" rx="3" fill="url(#skinGrad)"/>
          <rect x="116" y="280" width="6" height="11" rx="3" fill="url(#skinGrad)"/>
          <rect x="124" y="282" width="5" height="9" rx="2.5" fill="url(#skinGrad)"/>

          {/* Right hand on keyboard */}
          <ellipse cx="226" cy="288" rx="14" ry="8" fill="url(#skinGrad)" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>
          {/* Fingers right */}
          <rect x="210" y="282" width="5" height="9" rx="2.5" fill="url(#skinGrad)"/>
          <rect x="218" y="280" width="6" height="11" rx="3" fill="url(#skinGrad)"/>
          <rect x="226" y="281" width="6" height="10" rx="3" fill="url(#skinGrad)"/>
          <rect x="234" y="283" width="6" height="9" rx="3" fill="url(#skinGrad)"/>

          {/* ── NECK ─────────────────────────────────────────────── */}
          <rect x="158" y="255" width="24" height="30" rx="8"
            fill="url(#skinGrad)" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5"/>
          {/* Collar */}
          <path d="M155 268 Q158 260 170 260 Q182 260 185 268 Q178 275 170 273 Q162 275 155 268Z"
            fill="rgba(30,42,82,0.9)"/>

          {/* ── HEAD ─────────────────────────────────────────────── */}
          {/* Head shape – slightly squared jaw, professional */}
          <path d="M136 220 Q133 240 134 255 Q138 278 155 282 Q162 285 170 285 Q178 285 185 282 Q202 278 206 255 Q207 240 204 220 Q200 195 170 192 Q140 195 136 220Z"
            fill="url(#skinGrad)" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>

          {/* ── HAIR ─────────────────────────────────────────────── */}
          <path d="M134 225 Q133 205 138 197 Q148 186 170 184 Q192 186 202 197 Q207 205 206 225 Q200 210 190 207 Q180 204 170 204 Q160 204 150 207 Q140 210 134 225Z"
            fill="url(#hairGrad)"/>
          {/* Hair texture strands */}
          <path d="M140 206 Q148 198 160 196" stroke="rgba(50,30,18,0.5)" strokeWidth="1" fill="none"/>
          <path d="M150 202 Q158 195 170 194" stroke="rgba(50,30,18,0.5)" strokeWidth="1" fill="none"/>
          <path d="M160 200 Q168 193 176 194" stroke="rgba(50,30,18,0.5)" strokeWidth="1" fill="none"/>
          <path d="M172 200 Q180 193 188 196" stroke="rgba(50,30,18,0.4)" strokeWidth="1" fill="none"/>
          {/* Side hair / fade */}
          <path d="M134 222 Q132 230 134 240 Q138 250 142 258 Q136 245 134 232Z"
            fill="url(#hairGrad)" opacity="0.7"/>
          <path d="M206 222 Q208 230 206 240 Q202 250 198 258 Q204 245 206 232Z"
            fill="url(#hairGrad)" opacity="0.7"/>

          {/* ── FACE FEATURES ──────────────────────────────────── */}
          {/* Forehead shadow */}
          <path d="M140 222 Q142 215 152 213 Q161 211 170 211 Q179 211 188 213 Q198 215 200 222 Q190 218 170 218 Q150 218 140 222Z"
            fill="rgba(0,0,0,0.12)"/>

          {/* Eyebrows */}
          <path d="M147 232 Q153 228 161 229" stroke="rgba(40,20,10,0.9)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M179 229 Q187 228 193 232" stroke="rgba(40,20,10,0.9)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

          {/* Eyes – almond shaped, intelligent look */}
          {/* Left eye whites */}
          <ellipse cx="154" cy="240" rx="10" ry="7" fill="rgba(240,235,225,0.95)"/>
          {/* Left iris */}
          <ellipse cx="154" cy="240" rx="7" ry="6" fill="rgba(45,80,140,0.95)"/>
          {/* Left pupil */}
          <ellipse cx="155" cy="240" rx="4" ry="4" fill="rgba(8,8,20,0.95)"/>
          {/* Left highlight */}
          <ellipse cx="158" cy="237" rx="1.5" ry="1.5" fill="rgba(255,255,255,0.85)"/>
          {/* Left eyelid crease */}
          <path d="M144 237 Q154 233 164 237" stroke="rgba(160,100,60,0.35)" strokeWidth="0.75" fill="none"/>
          {/* Left lower lash */}
          <path d="M144 243 Q154 247 164 243" stroke="rgba(40,20,10,0.25)" strokeWidth="0.75" fill="none"/>

          {/* Right eye whites */}
          <ellipse cx="186" cy="240" rx="10" ry="7" fill="rgba(240,235,225,0.95)"/>
          {/* Right iris */}
          <ellipse cx="186" cy="240" rx="7" ry="6" fill="rgba(45,80,140,0.95)"/>
          {/* Right pupil */}
          <ellipse cx="187" cy="240" rx="4" ry="4" fill="rgba(8,8,20,0.95)"/>
          {/* Right highlight */}
          <ellipse cx="190" cy="237" rx="1.5" ry="1.5" fill="rgba(255,255,255,0.85)"/>
          <path d="M176 237 Q186 233 196 237" stroke="rgba(160,100,60,0.35)" strokeWidth="0.75" fill="none"/>
          <path d="M176 243 Q186 247 196 243" stroke="rgba(40,20,10,0.25)" strokeWidth="0.75" fill="none"/>

          {/* Nose */}
          <path d="M170 245 Q166 252 163 258 Q166 261 170 261 Q174 261 177 258 Q174 252 170 245Z"
            fill="rgba(0,0,0,0.1)" stroke="rgba(120,70,40,0.3)" strokeWidth="0.5"/>
          <path d="M163 258 Q164 261 170 261 Q176 261 177 258"
            stroke="rgba(100,60,35,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

          {/* Confident slight smile */}
          <path d="M157 270 Q162 275 170 275 Q178 275 183 270"
            stroke="rgba(90,55,30,0.7)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Subtle dimples */}
          <circle cx="156" cy="269" r="1.5" fill="rgba(0,0,0,0.08)"/>
          <circle cx="184" cy="269" r="1.5" fill="rgba(0,0,0,0.08)"/>

          {/* Ears */}
          <ellipse cx="133" cy="248" rx="6" ry="9" fill="url(#skinGrad)" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5"/>
          <path d="M133 242 Q130 248 133 255" stroke="rgba(100,60,35,0.3)" strokeWidth="0.75" fill="none"/>
          <ellipse cx="207" cy="248" rx="6" ry="9" fill="url(#skinGrad)" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5"/>
          <path d="M207 242 Q210 248 207 255" stroke="rgba(100,60,35,0.3)" strokeWidth="0.75" fill="none"/>

          {/* ── GLASSES (optional professional touch) ──────── */}
          {/* Left frame */}
          <rect x="141" y="234" width="26" height="15" rx="6"
            fill="none" stroke="rgba(59,130,246,0.55)" strokeWidth="1.25"/>
          {/* Right frame */}
          <rect x="173" y="234" width="26" height="15" rx="6"
            fill="none" stroke="rgba(59,130,246,0.55)" strokeWidth="1.25"/>
          {/* Bridge */}
          <line x1="167" y1="240" x2="173" y2="240"
            stroke="rgba(59,130,246,0.55)" strokeWidth="1.25"/>
          {/* Left temple */}
          <line x1="141" y1="240" x2="133" y2="243"
            stroke="rgba(59,130,246,0.45)" strokeWidth="1.25"/>
          {/* Right temple */}
          <line x1="199" y1="240" x2="207" y2="243"
            stroke="rgba(59,130,246,0.45)" strokeWidth="1.25"/>
          {/* Lens tint */}
          <rect x="141" y="234" width="26" height="15" rx="6"
            fill="rgba(59,130,246,0.04)"/>
          <rect x="173" y="234" width="26" height="15" rx="6"
            fill="rgba(59,130,246,0.04)"/>

          {/* ── SCREEN REFLECTION on glasses ───────────────── */}
          <motion.rect x="145" y="237" width="10" height="4" rx="1"
            fill="rgba(59,130,246,0.25)"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.rect x="177" y="237" width="10" height="4" rx="1"
            fill="rgba(59,130,246,0.25)"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />

          {/* ── BLINKING ANIMATION ──────────────────────────── */}
          <motion.g
            animate={{ scaleY: [1, 0.05, 1] }}
            transition={{ duration: 0.12, ease: 'easeIn', repeat: Infinity, repeatDelay: 3.5 }}
            style={{ transformOrigin: '154px 240px' }}
          >
            <ellipse cx="154" cy="240" rx="10" ry="7" fill="url(#skinGrad)" opacity="0.9"/>
          </motion.g>
          <motion.g
            animate={{ scaleY: [1, 0.05, 1] }}
            transition={{ duration: 0.12, ease: 'easeIn', repeat: Infinity, repeatDelay: 3.5 }}
            style={{ transformOrigin: '186px 240px' }}
          >
            <ellipse cx="186" cy="240" rx="10" ry="7" fill="url(#skinGrad)" opacity="0.9"/>
          </motion.g>

          {/* ── GROUND SHADOW ────────────────────────────────── */}
          <ellipse cx="170" cy="478" rx="90" ry="8"
            fill="rgba(59,130,246,0.06)" filter="url(#glow)"/>

          {/* ── HOLOGRAPHIC HUD – left side ──────────────────── */}
          <motion.g
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <line x1="132" y1="225" x2="88" y2="195"
              stroke="rgba(139,92,246,0.4)" strokeWidth="0.75" strokeDasharray="4 3"/>
            <rect x="52" y="175" width="36" height="28" rx="4"
              fill="rgba(0,0,12,0.9)" stroke="rgba(139,92,246,0.5)" strokeWidth="0.75"/>
            <text x="57" y="186" fontSize="5.5" fill="rgba(139,92,246,0.9)" fontFamily="'Courier New', monospace">TypeScript</text>
            <text x="57" y="194" fontSize="5.5" fill="rgba(59,130,246,0.9)" fontFamily="'Courier New', monospace">Framer</text>
            <text x="57" y="202" fontSize="5.5" fill="rgba(6,182,212,0.9)" fontFamily="'Courier New', monospace">Tailwind</text>
          </motion.g>

          {/* ── HOLOGRAPHIC HUD – right side ─────────────────── */}
          <motion.g
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
          >
            <line x1="208" y1="225" x2="250" y2="195"
              stroke="rgba(59,130,246,0.4)" strokeWidth="0.75" strokeDasharray="4 3"/>
            <rect x="250" y="175" width="36" height="28" rx="4"
              fill="rgba(0,0,12,0.9)" stroke="rgba(59,130,246,0.5)" strokeWidth="0.75"/>
            <text x="255" y="186" fontSize="5.5" fill="rgba(59,130,246,0.9)" fontFamily="'Courier New', monospace">React 18</text>
            <text x="255" y="194" fontSize="5.5" fill="rgba(139,92,246,0.9)" fontFamily="'Courier New', monospace">Next.js</text>
            <text x="255" y="202" fontSize="5.5" fill="rgba(6,182,212,0.9)" fontFamily="'Courier New', monospace">Node.js</text>
          </motion.g>

          {/* ── CURSOR BLINK on screen ───────────────────────── */}
          <motion.rect x="150" y="107" width="1.5" height="8" rx="0.75"
            fill="rgba(59,130,246,0.9)" filter="url(#strongGlow)"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />

          {/* ── KEYBOARD TYPING GLOW ────────────────────────── */}
          <motion.rect x="112" y="285" width="7" height="3" rx="1"
            fill="rgba(59,130,246,0.7)"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0 }}
          />
          <motion.rect x="130" y="285" width="7" height="3" rx="1"
            fill="rgba(139,92,246,0.7)"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0.15 }}
          />
          <motion.rect x="148" y="285" width="7" height="3" rx="1"
            fill="rgba(6,182,212,0.7)"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0.3 }}
          />
          <motion.rect x="166" y="285" width="7" height="3" rx="1"
            fill="rgba(59,130,246,0.7)"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0.45 }}
          />
          <motion.rect x="184" y="285" width="7" height="3" rx="1"
            fill="rgba(139,92,246,0.7)"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0.6 }}
          />
          <motion.rect x="202" y="285" width="7" height="3" rx="1"
            fill="rgba(6,182,212,0.7)"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0.75 }}
          />
          <motion.rect x="220" y="285" width="7" height="3" rx="1"
            fill="rgba(59,130,246,0.7)"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0.9 }}
          />
        </svg>
      </motion.div>

      {/* ── Layer 3: floating UI panels (inverse parallax) ─── */}

      {/* Panel 1: Design System (top right) */}
      <motion.div
        className="absolute z-20 glass rounded-2xl p-3 w-44"
        style={{ top: '4%', right: '0%', x: panelX, y: panelY } as any}
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.6, duration: 0.7, ease: [0.22,1,0.36,1] }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5.2, ease: 'easeInOut', repeat: Infinity }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" style={{ boxShadow: '0 0 6px rgba(59,130,246,0.8)' }}/>
            <span className="text-[10px] tracking-widest uppercase text-white/40">Design System</span>
          </div>
          <div className="text-xs font-semibold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Components · v2.4</div>
          {/* Color swatches */}
          <div className="flex gap-1.5 mb-2">
            {['#3b82f6','#8b5cf6','#06b6d4','#10b981','#f59e0b'].map(c => (
              <div key={c} className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: c }}/>
            ))}
          </div>
          {/* Progress bars */}
          {[80,60,90,45].map((w, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full" style={{
                  width: `${w}%`,
                  background: i%2===0 ? 'linear-gradient(90deg,#3b82f6,#8b5cf6)' : 'linear-gradient(90deg,#06b6d4,#3b82f6)'
                }}/>
              </div>
              <span className="text-[9px] text-white/30 w-5">{w}%</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Panel 2: Code editor (bottom right) */}
      <motion.div
        className="absolute z-20 glass rounded-2xl overflow-hidden w-52"
        style={{ bottom: '12%', right: '-2%', x: panelX, y: panelY } as any}
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.0, duration: 0.7, ease: [0.22,1,0.36,1] }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6.0, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
        >
          {/* Editor title bar */}
          <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: 'rgba(139,92,246,0.12)' }}>
            <div className="w-2 h-2 rounded-full bg-red-400/70"/>
            <div className="w-2 h-2 rounded-full bg-yellow-400/70"/>
            <div className="w-2 h-2 rounded-full bg-green-400/70"/>
            <span className="ml-2 text-[9px] text-white/30 tracking-wider">hero.tsx</span>
          </div>
          {/* Code lines */}
          <div className="px-3 py-2 space-y-1 font-mono text-[9px]">
            <div><span className="text-purple-400">export</span><span className="text-white/60"> default </span><span className="text-blue-400">function</span><span className="text-white/80"> Hero()</span></div>
            <div className="pl-2"><span className="text-white/60">{'{'}</span></div>
            <div className="pl-4"><span className="text-cyan-400">return</span><span className="text-white/60"> (</span></div>
            <div className="pl-6"><span className="text-white/40">&lt;</span><span className="text-blue-400">motion.div</span></div>
            <div className="pl-8 flex items-center gap-1">
              <span className="text-purple-400">animate</span>
              <span className="text-white/40">={'{'}</span>
              <motion.span
                className="text-cyan-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >...</motion.span>
              <span className="text-white/40">{'}'}</span>
            </div>
            <div className="pl-6"><span className="text-white/40">/&gt;</span></div>
            <div className="pl-2"><span className="text-white/60">{')'}</span></div>
            <div className="flex items-center gap-1">
              <span className="text-white/60">{'}'}</span>
              <motion.span
                className="inline-block w-1 h-3 bg-blue-400 ml-0.5"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Panel 3: Lighthouse score (left center) */}
      <motion.div
        className="absolute z-20 glass rounded-2xl p-3 w-36"
        style={{ top: '28%', left: '-2%', x: panelX, y: panelY } as any}
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.8, duration: 0.7, ease: [0.22,1,0.36,1] }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7.0, ease: 'easeInOut', repeat: Infinity, delay: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 6px rgba(6,182,212,0.8)' }}/>
            <span className="text-[10px] tracking-widest uppercase text-white/40">Lighthouse</span>
          </div>
          {/* Circular score */}
          <div className="flex items-center justify-center my-2">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 60 60" className="w-16 h-16 -rotate-90">
                <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5"/>
                <motion.circle cx="30" cy="30" r="24" fill="none"
                  stroke="rgba(6,182,212,0.9)" strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 24 * (1 - 0.98) }}
                  transition={{ delay: 4.5, duration: 1.2, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-base font-black text-cyan-400" style={{ fontFamily: 'Syne, sans-serif' }}>98</span>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {[['Perf','98','#06b6d4'],['SEO','100','#3b82f6'],['A11y','95','#8b5cf6']].map(([k,v,c]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-[9px] text-white/40">{k}</span>
                <span className="text-[10px] font-bold" style={{ color: c }}>{v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Panel 4: UI Preview mockup (bottom left) */}
      <motion.div
        className="absolute z-20 glass rounded-2xl overflow-hidden w-40"
        style={{ bottom: '22%', left: '-3%', x: panelX, y: panelY } as any}
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.2, duration: 0.7, ease: [0.22,1,0.36,1] }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.8, ease: 'easeInOut', repeat: Infinity, delay: 1.2 }}
        >
          {/* Mini browser chrome */}
          <div className="flex items-center gap-1 px-2 py-1.5" style={{ background: 'rgba(59,130,246,0.1)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-red-400/60"/>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60"/>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60"/>
            <div className="ml-1 flex-1 h-2 rounded-sm bg-white/5 px-1">
              <span className="text-[6px] text-white/20 leading-none">portfolio.dev</span>
            </div>
          </div>
          {/* Mini website preview */}
          <div className="p-2" style={{ background: 'rgba(4,4,18,0.95)' }}>
            {/* Hero bar */}
            <div className="h-8 rounded mb-1.5" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.2))' }}>
              <div className="p-1.5">
                <div className="w-12 h-1.5 rounded-full bg-white/30 mb-1"/>
                <div className="w-8 h-1 rounded-full bg-blue-400/40"/>
              </div>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-3 gap-1">
              {[0,1,2].map(i => (
                <div key={i} className="h-5 rounded" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(59,130,246,0.15)' }}/>
              ))}
            </div>
          </div>
          <div className="px-2 py-1.5 flex items-center justify-between">
            <span className="text-[8px] text-white/30 tracking-wider">UI Preview</span>
            <div className="w-2 h-2 rounded-full bg-green-400/70" style={{ boxShadow: '0 0 4px rgba(34,197,94,0.6)' }}/>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Ambient light beam from screen ─────────────────── */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 200, height: 300,
          top: '5%', left: '50%', transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at top, rgba(59,130,246,0.12) 0%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />
    </div>
  );
}
