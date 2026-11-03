'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const steps = [
  {
    n: '01',
    title: 'Discover',
    sub: 'Research & Strategy',
    desc: "We start with deep discovery — understanding your business goals, audience, competitors, and success metrics. I ask the questions others skip, because the right brief produces the right product.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z"/></svg>`,
    deliverables: ['Project Brief','Competitor Analysis','Sitemap / IA','Success Metrics'],
    accent: '59,130,246',
  },
  {
    n: '02',
    title: 'Strategy',
    sub: 'Planning & Architecture',
    desc: "With clarity on the goal, I build the technical and design strategy. Technology stack selection, content hierarchy, performance targets, and a detailed project roadmap — all agreed before a pixel moves.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"/></svg>`,
    deliverables: ['Tech Stack Plan','Content Architecture','Timeline','Milestone Checklist'],
    accent: '139,92,246',
  },
  {
    n: '03',
    title: 'Design & Build',
    sub: 'Creation & Development',
    desc: "This is where strategy becomes reality. I design in Figma, validate with you, then engineer the production build — animations, responsiveness, performance optimisation, and accessibility baked in from day one.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>`,
    deliverables: ['Figma Designs','Component Library','Responsive Build','Accessibility Audit'],
    accent: '6,182,212',
  },
  {
    n: '04',
    title: 'Launch',
    sub: 'Deployment & Growth',
    desc: "We launch together. I handle deployment, performance audits, SEO foundations, and a thorough QA pass. Post-launch, I stay available to iterate, support, and help the product grow.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.98 14.98 0 00-2.58 5.84m2.699 2.7a6 6 0 11-10.607-6.607 6 6 0 0110.607 6.606z"/></svg>`,
    deliverables: ['Live Deployment','Lighthouse Audit','SEO Setup','30-Day Support'],
    accent: '59,130,246',
  },
];

const iv = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}} };
const cv = { hidden:{}, visible:{ transition:{ staggerChildren:0.12 } } };

export default function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="relative z-10 py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(13,13,46,0.9) 40%,rgba(10,10,26,0.9) 80%,rgba(0,0,0,0.3))' }}/>
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)' }}/>

      <div className="max-w-7xl mx-auto relative">
        {/* header */}
        <motion.div className="flex flex-col items-center text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once:true,margin:'-80px' }} variants={cv}>
          <motion.div variants={iv} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-purple-400"/>
            <span className="text-xs tracking-[0.25em] uppercase text-purple-400">How I Work</span>
            <div className="w-8 h-px bg-purple-400"/>
          </motion.div>
          <motion.h2 variants={iv}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ fontFamily:'Syne, sans-serif' }}>
            <span className="text-white">MY </span>
            <span className="gradient-text">PROCESS</span>
          </motion.h2>
          <motion.p variants={iv} className="text-white/50 max-w-xl">
            A proven four-step framework that turns ideas into exceptional digital products.
          </motion.p>
        </motion.div>

        {/* step tabs – desktop horizontal, mobile grid */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }}>
          {steps.map((s,i) => (
            <motion.button key={s.n}
              type="button"
              onClick={() => setActive(i)}
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              className="relative rounded-2xl p-5 text-left transition-all duration-300 border overflow-hidden"
              style={{
                background: active===i ? `rgba(${s.accent},0.1)` : 'rgba(255,255,255,0.02)',
                borderColor: active===i ? `rgba(${s.accent},0.4)` : 'rgba(255,255,255,0.06)',
                boxShadow: active===i ? `0 0 30px rgba(${s.accent},0.12)` : 'none',
              }}>
              {active===i && (
                <motion.div className="absolute inset-0 pointer-events-none"
                  initial={{ opacity:0 }} animate={{ opacity:1 }}
                  style={{ background:`radial-gradient(circle at top left,rgba(${s.accent},0.1),transparent 70%)` }}/>
              )}
              <div className="text-3xl font-black mb-2 relative"
                style={{ fontFamily:'Syne, sans-serif', color: active===i ? `rgba(${s.accent},0.9)` : 'rgba(255,255,255,0.15)' }}>
                {s.n}
              </div>
              <div className="text-sm font-bold text-white relative" style={{ fontFamily:'Syne, sans-serif' }}>{s.title}</div>
              <div className="text-[10px] tracking-wider uppercase mt-0.5 relative"
                style={{ color:`rgba(${s.accent},0.7)`, opacity: active===i ? 1 : 0.5 }}>
                {s.sub}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* step detail */}
        <motion.div key={active}
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-3xl p-8 md:p-10 glass border"
          style={{ borderColor:`rgba(${steps[active].accent},0.2)` }}>

          {/* icon + number */}
          <div className="lg:col-span-1 flex flex-col items-start gap-4">
            <div className="p-4 rounded-2xl"
              style={{ background:`rgba(${steps[active].accent},0.12)`, border:`1px solid rgba(${steps[active].accent},0.25)` }}>
              <div className="w-8 h-8" style={{ color:`rgba(${steps[active].accent},0.95)` }}
                dangerouslySetInnerHTML={{ __html: steps[active].icon.replace(/className="[^"]*"/g,'class="w-8 h-8"') }}/>
            </div>
            <div className="text-5xl font-black"
              style={{ fontFamily:'Syne, sans-serif', color:`rgba(${steps[active].accent},0.15)` }}>
              {steps[active].n}
            </div>
          </div>

          {/* desc */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2" style={{ fontFamily:'Syne, sans-serif' }}>
              {steps[active].title}
            </h3>
            <div className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color:`rgba(${steps[active].accent},0.8)` }}>
              {steps[active].sub}
            </div>
            <p className="text-white/55 leading-relaxed">{steps[active].desc}</p>
          </div>

          {/* deliverables */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">Deliverables</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {steps[active].deliverables.map((d,i) => (
                <motion.div key={d}
                  initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:i*0.08, duration:0.4 }}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                  style={{ background:`rgba(${steps[active].accent},0.06)`, border:`1px solid rgba(${steps[active].accent},0.15)` }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background:`rgba(${steps[active].accent},0.9)`, boxShadow:`0 0 4px rgba(${steps[active].accent},0.7)` }}/>
                  <span className="text-sm text-white/70">{d}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* connector line */}
        <div className="hidden md:flex items-center justify-center gap-0 mt-6 mb-2">
          {steps.map((_,i) => (
            <div key={i} className="flex items-center">
              <div className="w-3 h-3 rounded-full transition-all duration-300"
                style={{ background: i<=active ? `rgba(${steps[Math.min(i,active)].accent},0.9)` : 'rgba(255,255,255,0.1)' }}/>
              {i < steps.length-1 && (
                <div className="h-px w-24 transition-all duration-500"
                  style={{ background: i<active ? 'linear-gradient(90deg,rgba(59,130,246,0.6),rgba(139,92,246,0.6))' : 'rgba(255,255,255,0.06)' }}/>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }}/>
    </section>
  );
}
