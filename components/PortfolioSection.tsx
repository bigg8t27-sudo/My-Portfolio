'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const categories = ['All','Web Design','Development','UI/UX','Branding'];

const projects = [
  {
    id:1, title:'NovaTech Dashboard',
    category:'Development', tags:['Next.js','Framer Motion','Tailwind','Chart.js'],
    desc:'Real-time SaaS analytics platform with live KPI tiles, interactive charts, dark-mode-first UI, and role-based access control.',
    accent:'59,130,246', year:'2025',
    gradient:'linear-gradient(135deg,rgba(59,130,246,0.5),rgba(10,10,30,0.95))',
    link:'#', featured: true,
    mockLines: [
      { w:'60%', c:'59,130,246' }, { w:'80%', c:'255,255,255' }, { w:'45%', c:'255,255,255' },
    ],
    mockStats: [['1.2M','Users'],['99.9%','Uptime'],['4.8★','Rating']],
  },
  {
    id:2, title:'Luminary E-Commerce',
    category:'Web Design', tags:['Figma','Shopify','Motion','SEO'],
    desc:'Premium luxury jewellery store redesign — cinematic product reveals, checkout flow optimisation, +220% conversion rate post-launch.',
    accent:'139,92,246', year:'2025',
    gradient:'linear-gradient(135deg,rgba(139,92,246,0.5),rgba(10,10,30,0.95))',
    link:'#', featured: true,
    mockLines: [
      { w:'70%', c:'139,92,246' }, { w:'55%', c:'255,255,255' }, { w:'85%', c:'255,255,255' },
    ],
    mockStats: [['+220%','Conversion'],['50K+','Monthly Visits'],['4.9★','Reviews']],
  },
  {
    id:3, title:'PulseAI Landing Page',
    category:'UI/UX', tags:['React','GSAP','Figma','WebGL'],
    desc:'Cinematic landing page for an AI startup — parallax hero, scroll-driven animations, and a 45% improvement in trial signups.',
    accent:'6,182,212', year:'2024',
    gradient:'linear-gradient(135deg,rgba(6,182,212,0.5),rgba(10,10,30,0.95))',
    link:'#', featured: true,
    mockLines: [
      { w:'90%', c:'6,182,212' }, { w:'65%', c:'255,255,255' }, { w:'50%', c:'255,255,255' },
    ],
    mockStats: [['+45%','Signups'],['2.1s','Load Time'],['98','Perf Score']],
  },
  {
    id:4, title:'Verdant Brand Identity',
    category:'Branding', tags:['Logo','Design System','Typography','Print'],
    desc:'Complete brand identity for an eco-tech startup — logomark, colour system, typography scale, brand guidelines, and packaging.',
    accent:'16,185,129', year:'2024',
    gradient:'linear-gradient(135deg,rgba(16,185,129,0.5),rgba(10,10,30,0.95))',
    link:'#', featured: true,
    mockLines: [
      { w:'55%', c:'16,185,129' }, { w:'75%', c:'255,255,255' }, { w:'40%', c:'255,255,255' },
    ],
    mockStats: [['6','Brand Tokens'],['400+','Assets'],['12','Deliverables']],
  },
  {
    id:5, title:'Apex Finance App',
    category:'Development', tags:['Next.js','PostgreSQL','Plaid API','AI'],
    desc:'Personal finance web app with live bank feeds, AI-driven spending insights, budget visualisations, and secure OAuth2 authentication.',
    accent:'59,130,246', year:'2024',
    gradient:'linear-gradient(135deg,rgba(59,130,246,0.35),rgba(139,92,246,0.35),rgba(10,10,30,0.95))',
    link:'#', featured: true,
    mockLines: [
      { w:'75%', c:'59,130,246' }, { w:'60%', c:'139,92,246' }, { w:'80%', c:'255,255,255' },
    ],
    mockStats: [['10K+','Transactions'],['Bank-Grade','Security'],['AI','Insights']],
  },
  {
    id:6, title:'Studio Oslo Portfolio',
    category:'Web Design', tags:['Next.js','Three.js','GLSL','WebGL'],
    desc:'Award-winning portfolio for a Copenhagen architecture studio — custom WebGL shaders, mouse-driven parallax, and smooth page transitions.',
    accent:'139,92,246', year:'2025',
    gradient:'linear-gradient(135deg,rgba(139,92,246,0.4),rgba(6,182,212,0.3),rgba(10,10,30,0.95))',
    link:'#', featured: true,
    mockLines: [
      { w:'80%', c:'139,92,246' }, { w:'50%', c:'6,182,212' }, { w:'65%', c:'255,255,255' },
    ],
    mockStats: [['Awwwards','Winner'],['WebGL','Shaders'],['98','Perf Score']],
  },
  {
    id:7, title:'DataPulse Analytics',
    category:'Development', tags:['Python','Pandas','Plotly','FastAPI'],
    desc:'End-to-end data analytics platform with interactive dashboards, automated PDF reports, and ML-driven forecasting models.',
    accent:'6,182,212', year:'2023',
    gradient:'linear-gradient(135deg,rgba(6,182,212,0.45),rgba(10,10,30,0.95))',
    link:'#', featured: false,
    mockLines: [
      { w:'70%', c:'6,182,212' }, { w:'85%', c:'255,255,255' }, { w:'55%', c:'255,255,255' },
    ],
    mockStats: [['1M+','Data Points'],['Auto','Reports'],['ML','Forecasting']],
  },
  {
    id:8, title:'Zephyr SaaS UI Kit',
    category:'UI/UX', tags:['Figma','Design Tokens','Components','Documentation'],
    desc:'Comprehensive Figma UI kit — 400+ components, semantic tokens, dark & light modes, and full developer handoff documentation.',
    accent:'245,158,11', year:'2023',
    gradient:'linear-gradient(135deg,rgba(245,158,11,0.4),rgba(10,10,30,0.95))',
    link:'#', featured: false,
    mockLines: [
      { w:'65%', c:'245,158,11' }, { w:'80%', c:'255,255,255' }, { w:'45%', c:'255,255,255' },
    ],
    mockStats: [['400+','Components'],['2','Modes'],['Figma','Community']],
  },
  {
    id:9, title:'Ember Restaurant Brand',
    category:'Branding', tags:['Logo','Packaging','Menu Design','Brand Voice'],
    desc:'Full brand identity for a fine-dining restaurant — logomark, menu typography, custom illustrations, and packaging design.',
    accent:'239,68,68', year:'2023',
    gradient:'linear-gradient(135deg,rgba(239,68,68,0.4),rgba(10,10,30,0.95))',
    link:'#', featured: false,
    mockLines: [
      { w:'55%', c:'239,68,68' }, { w:'70%', c:'255,255,255' }, { w:'85%', c:'255,255,255' },
    ],
    mockStats: [['Full','Brand Kit'],['Menu','Design'],['Packaging','Print']],
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
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={{ background: p.gradient }}/>
                  {/* mock screen */}
                  <div className="absolute inset-3 rounded-xl border border-white/10 overflow-hidden"
                    style={{ background:'rgba(4,4,18,0.85)', backdropFilter:'blur(4px)' }}>
                    <div className="p-3 h-full flex flex-col gap-2">
                      {/* Window chrome */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-2 h-2 rounded-full bg-red-400/70"/>
                        <div className="w-2 h-2 rounded-full bg-yellow-400/70"/>
                        <div className="w-2 h-2 rounded-full bg-green-400/70"/>
                        <div className="flex-1 h-1.5 rounded-full ml-2" style={{ background:`rgba(${p.accent},0.2)` }}/>
                      </div>
                      {/* Content lines */}
                      {p.mockLines.map((line, li) => (
                        <div key={li} className="h-1.5 rounded-full"
                          style={{ width: line.w, background: li === 0 ? `rgba(${line.c},0.7)` : `rgba(${line.c},0.12)` }}/>
                      ))}
                      {/* Stats row */}
                      <div className="mt-auto grid grid-cols-3 gap-1.5">
                        {p.mockStats.map(([val, label], si) => (
                          <div key={si} className="rounded-lg p-2 flex flex-col items-center"
                            style={{ background:`rgba(${p.accent},0.12)`, border:`1px solid rgba(${p.accent},0.2)` }}>
                            <span className="text-[9px] font-bold leading-tight text-center"
                              style={{ color:`rgba(${p.accent},1)` }}>{val}</span>
                            <span className="text-[7px] text-white/40 leading-tight text-center mt-0.5">{label}</span>
                          </div>
                        ))}
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
                <div className="p-5" style={{ background:'rgba(4,4,18,0.6)', borderTop:`1px solid rgba(${p.accent},0.15)` }}>
                  <h3 className="text-lg font-bold text-white mb-1.5" style={{ fontFamily:'var(--font-syne), sans-serif' }}>{p.title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed mb-3 line-clamp-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[9px] tracking-wider rounded-full font-medium"
                        style={{ background:`rgba(${p.accent},0.12)`, color:`rgba(${p.accent},0.9)`, border:`1px solid rgba(${p.accent},0.2)` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/25 tracking-wider">{p.year}</span>
                    <div className="flex items-center gap-1 text-xs font-semibold tracking-wider"
                      style={{ color:`rgba(${p.accent},0.8)` }}>
                      <span>View Project</span>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
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
