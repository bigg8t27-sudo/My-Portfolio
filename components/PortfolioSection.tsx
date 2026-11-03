'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const categories = ['All','Web Design','Development','UI/UX','Branding'];

const projects = [
  {
    id:1, title:'NovaTech Dashboard',
    category:'Development', tags:['Next.js','Framer Motion','Tailwind'],
    desc:'A real-time analytics dashboard for a SaaS platform — dark-mode first, silky-smooth data visualisations.',
    accent:'59,130,246', year:'2025',
    gradient:'linear-gradient(135deg,rgba(59,130,246,0.4),rgba(10,10,30,0.9))',
    link:'#', featured: true,
  },
  {
    id:2, title:'Luminary E-Commerce',
    category:'Web Design', tags:['Figma','Shopify','Motion'],
    desc:'Premium e-commerce redesign for a luxury jewellery brand — conversion rate up 220% post-launch.',
    accent:'139,92,246', year:'2025',
    gradient:'linear-gradient(135deg,rgba(139,92,246,0.4),rgba(10,10,30,0.9))',
    link:'#', featured: true,
  },
  {
    id:3, title:'PulseAI Landing Page',
    category:'UI/UX', tags:['React','GSAP','Figma'],
    desc:'Immersive landing page for an AI startup — cinematic scroll experience and a 45% trial signup uplift.',
    accent:'6,182,212', year:'2024',
    gradient:'linear-gradient(135deg,rgba(6,182,212,0.4),rgba(10,10,30,0.9))',
    link:'#', featured: true,
  },
  {
    id:4, title:'Verdant Brand Identity',
    category:'Branding', tags:['Logo','Guidelines','Print'],
    desc:'Complete brand identity for an eco-tech startup — from naming and logomark through to full design system.',
    accent:'16,185,129', year:'2024',
    gradient:'linear-gradient(135deg,rgba(16,185,129,0.4),rgba(10,10,30,0.9))',
    link:'#', featured: true,
  },
  {
    id:5, title:'Apex Finance App',
    category:'Development', tags:['Next.js','Postgres','Plaid'],
    desc:'Personal finance web app with live bank feeds, budget visualisations, and AI-driven spending insights.',
    accent:'59,130,246', year:'2024',
    gradient:'linear-gradient(135deg,rgba(59,130,246,0.3),rgba(139,92,246,0.3),rgba(10,10,30,0.9))',
    link:'#', featured: true,
  },
  {
    id:6, title:'Studio Oslo Portfolio',
    category:'Web Design', tags:['Next.js','Three.js','GLSL'],
    desc:'Award-winning portfolio for a Copenhagen architecture studio — WebGL parallax and custom shaders.',
    accent:'139,92,246', year:'2025',
    gradient:'linear-gradient(135deg,rgba(139,92,246,0.3),rgba(6,182,212,0.25),rgba(10,10,30,0.9))',
    link:'#', featured: true,
  },
  // — Additional projects revealed on "View All" —
  {
    id:7, title:'DataPulse Analytics',
    category:'Development', tags:['Python','Pandas','Plotly','FastAPI'],
    desc:'End-to-end data analytics platform with interactive dashboards, automated reports, and ML-driven forecasts.',
    accent:'6,182,212', year:'2023',
    gradient:'linear-gradient(135deg,rgba(6,182,212,0.35),rgba(10,10,30,0.9))',
    link:'#', featured: false,
  },
  {
    id:8, title:'Zephyr SaaS UI Kit',
    category:'UI/UX', tags:['Figma','Design System','Components'],
    desc:'Comprehensive Figma UI kit with 400+ components, tokens, and documentation for SaaS product teams.',
    accent:'245,158,11', year:'2023',
    gradient:'linear-gradient(135deg,rgba(245,158,11,0.3),rgba(10,10,30,0.9))',
    link:'#', featured: false,
  },
  {
    id:9, title:'Ember Restaurant Brand',
    category:'Branding', tags:['Logo','Packaging','Menu Design'],
    desc:'Full brand identity for a fine-dining restaurant — from logo to menu typography and packaging.',
    accent:'239,68,68', year:'2023',
    gradient:'linear-gradient(135deg,rgba(239,68,68,0.3),rgba(10,10,30,0.9))',
    link:'#', featured: false,
  },
];

const FEATURED_COUNT = 6;

const iv = { hidden:{opacity:0,y:40}, visible:{ opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}} };
const cv = { hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } };

export default function PortfolioSection() {
  const [active,    setActive]    = useState('All');
  const [hovered,   setHovered]   = useState<number|null>(null);
  const [showAll,   setShowAll]   = useState(false);

  const pool     = showAll ? projects : projects.filter(p => p.featured);
  const filtered = active === 'All' ? pool : pool.filter(p => p.category === active);
  const extraCount = active === 'All'
    ? projects.length - FEATURED_COUNT
    : projects.filter(p => !p.featured && p.category === active).length;

  return (
    <section id="portfolio" className="relative z-10 py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(13,13,46,0.9) 30%,rgba(10,10,26,0.85) 70%,rgba(0,0,0,0.3))' }}/>
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)' }}/>

      {/* faint background word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[18vw] font-black text-white select-none"
          style={{ fontFamily:'var(--font-syne), sans-serif', opacity:0.02, lineHeight:1 }}>
          WORK
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* header */}
        <motion.div className="flex flex-col items-center text-center mb-12"
          initial="hidden" whileInView="visible" viewport={{ once:true,margin:'-80px' }} variants={cv}>
          <motion.div variants={iv} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-400"/>
            <span className="text-xs tracking-[0.25em] uppercase text-blue-400">Selected Work</span>
            <div className="w-8 h-px bg-blue-400"/>
          </motion.div>
          <motion.h2 variants={iv}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ fontFamily:'var(--font-syne), sans-serif' }}>
            <span className="text-white">MY </span>
            <span className="gradient-text">PORTFOLIO</span>
          </motion.h2>
          <motion.p variants={iv} className="text-white/50 max-w-xl">
            A curated selection of projects that push the boundaries of design and technology.
          </motion.p>
        </motion.div>

        {/* filter tabs */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-14"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}>
          {categories.map(c => (
            <motion.button key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              className="px-5 py-2 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300"
              style={{
                background: active === c ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'rgba(255,255,255,0.04)',
                border: active === c ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
                color: active === c ? '#fff' : 'rgba(255,255,255,0.5)',
                boxShadow: active === c ? '0 0 20px rgba(59,130,246,0.25)' : 'none',
              }}>
              {c}
            </motion.button>
          ))}
        </motion.div>

        {/* project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article key={p.id} layout
                initial={{ opacity:0, scale:0.9 }}
                animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:0.9 }}
                transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative rounded-2xl overflow-hidden border border-white/8 group cursor-pointer"
                style={{ boxShadow: hovered === p.id ? `0 0 40px rgba(${p.accent},0.15)` : 'none' }}
              >
                {/* preview */}
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={{ background: p.gradient }}/>
                  {/* mock screen content */}
                  <div className="absolute inset-4 rounded-lg border border-white/10 overflow-hidden"
                    style={{ background:'rgba(4,4,18,0.8)' }}>
                    <div className="p-3">
                      <div className="flex gap-1 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-400/60"/>
                        <div className="w-2 h-2 rounded-full bg-yellow-400/60"/>
                        <div className="w-2 h-2 rounded-full bg-green-400/60"/>
                      </div>
                      <div className="h-2 rounded-full mb-1.5 w-3/4" style={{ background:`rgba(${p.accent},0.6)` }}/>
                      <div className="h-1.5 rounded-full mb-1 w-full bg-white/10"/>
                      <div className="h-1.5 rounded-full mb-1 w-5/6 bg-white/8"/>
                      <div className="h-1.5 rounded-full w-2/3 bg-white/6"/>
                      <div className="mt-3 grid grid-cols-2 gap-1.5">
                        <div className="h-8 rounded-md" style={{ background:`rgba(${p.accent},0.15)`, border:`1px solid rgba(${p.accent},0.2)` }}/>
                        <div className="h-8 rounded-md bg-white/5"/>
                      </div>
                    </div>
                  </div>

                  {/* hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background:'rgba(0,0,0,0.65)', backdropFilter:'blur(4px)' }}>
                    {p.link !== '#' ? (
                      <motion.a
                        href={p.link}
                        aria-label={`View ${p.title} project`}
                        target="_blank" rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase text-white"
                        style={{ background:'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
                        whileHover={{ scale:1.08 }} whileTap={{ scale:0.97 }}>
                        View Project
                      </motion.a>
                    ) : (
                      <span
                        className="px-5 py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase text-white/60"
                        style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', cursor:'default' }}>
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* year tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 glass rounded-full text-[10px] tracking-wider text-white/50">
                    {p.year}
                  </div>

                  {/* category badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] tracking-wider font-medium"
                    style={{ background:`rgba(${p.accent},0.15)`, border:`1px solid rgba(${p.accent},0.3)`, color:`rgba(${p.accent},0.9)` }}>
                    {p.category}
                  </div>
                </div>

                {/* info */}
                <div className="p-5 glass">
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily:'var(--font-syne), sans-serif' }}>{p.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed mb-3 line-clamp-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[9px] tracking-wider rounded-full"
                        style={{ background:`rgba(${p.accent},0.1)`, color:`rgba(${p.accent},0.7)`, border:`1px solid rgba(${p.accent},0.15)` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All / Collapse toggle */}
        {extraCount > 0 && (
          <motion.div className="text-center mt-12"
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} transition={{ delay:0.3 }}>
            <motion.button
              type="button"
              onClick={() => setShowAll(v => !v)}
              aria-expanded={showAll}
              aria-label={showAll ? 'Show fewer projects' : `View all projects (${extraCount} more)`}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold tracking-widest uppercase border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300"
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
              {showAll ? (
                <>
                  Show Less
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 15l-6-6-6 6"/>
                  </svg>
                </>
              ) : (
                <>
                  View All Projects
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    +{extraCount}
                  </span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }}/>
    </section>
  );
}
