'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/></svg>`,
    title: 'Web Design',
    desc: 'Visually stunning, brand-aligned website designs crafted in Figma with pixel-perfect precision and conversion-focused layouts.',
    accent: '59,130,246',
    tags: ['Figma','Wireframes','Prototypes','Design Systems'],
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>`,
    title: 'Web Development',
    desc: 'High-performance, accessible web applications built with Next.js, React and TypeScript — clean code, blazing speed.',
    accent: '139,92,246',
    tags: ['Next.js','React','TypeScript','Node.js'],
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"/></svg>`,
    title: 'UI/UX Design',
    desc: 'Intuitive user experiences backed by research, usability testing, and design thinking that puts people first.',
    accent: '6,182,212',
    tags: ['User Research','Wireframes','Prototyping','Testing'],
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"/></svg>`,
    title: 'Landing Pages',
    desc: 'High-converting landing pages designed to capture attention, communicate value, and drive measurable results.',
    accent: '59,130,246',
    tags: ['Conversion','A/B Testing','Analytics','SEO'],
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>`,
    title: 'Website Redesign',
    desc: 'Transform outdated websites into modern, performant digital experiences that reflect where your brand is going.',
    accent: '139,92,246',
    tags: ['Audit','Strategy','Migration','Launch'],
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path d="M6 6h.008v.008H6V6z"/></svg>`,
    title: 'Brand Identity',
    desc: 'Cohesive brand identities — logo design, colour systems, typography, and guidelines — that tell your story consistently.',
    accent: '6,182,212',
    tags: ['Logo Design','Guidelines','Typography','Colour'],
  },
];

const iv = { hidden:{opacity:0,y:40}, visible:{ opacity:1,y:0, transition:{duration:0.7,ease:[0.22,1,0.36,1]} } };
const cv = { hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } };

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number|null>(null);

  return (
    <section id="services" className="relative z-10 py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(10,10,26,0.9) 30%,rgba(13,13,46,0.85) 70%,rgba(0,0,0,0.3))' }}/>
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)' }}/>

      <div className="max-w-7xl mx-auto relative">
        {/* header */}
        <motion.div className="flex flex-col items-center text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once:true,margin:'-80px' }} variants={cv}>
          <motion.div variants={iv} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-400"/>
            <span className="text-xs tracking-[0.25em] uppercase text-blue-400">What I Offer</span>
            <div className="w-8 h-px bg-blue-400"/>
          </motion.div>
          <motion.h2 variants={iv}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ fontFamily:'Syne, sans-serif' }}>
            <span className="text-white">MY </span>
            <span className="gradient-text">SERVICES</span>
          </motion.h2>
          <motion.p variants={iv} className="text-white/50 max-w-xl">
            End-to-end digital solutions — from first sketch to live product.
          </motion.p>
        </motion.div>

        {/* grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden" whileInView="visible" viewport={{ once:true,margin:'-60px' }} variants={cv}>
          {services.map((s,i) => (
            <motion.div key={s.title} variants={iv}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale:1.03, transition:{ duration:0.25 } }}
              className="relative rounded-2xl p-8 glass border border-white/5 overflow-hidden group cursor-default transition-all duration-300"
              style={{
                boxShadow: hovered===i ? `0 0 40px rgba(${s.accent},0.12)` : 'none',
                borderColor: hovered===i ? `rgba(${s.accent},0.35)` : 'rgba(255,255,255,0.05)',
              }}
            >
              {/* corner glow */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background:`radial-gradient(circle at top right,rgba(${s.accent},0.12),transparent)`, transform:'translate(30%,-30%)' }}/>

              {/* icon */}
              <div className="mb-5 p-3 rounded-xl inline-flex"
                style={{ background:`rgba(${s.accent},0.12)`, border:`1px solid rgba(${s.accent},0.25)` }}>
                <div style={{ color:`rgba(${s.accent},1)` }} dangerouslySetInnerHTML={{ __html: s.icon.replace(/className="[^"]*"/g,'class="w-7 h-7"') }}/>
              </div>

              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily:'Syne, sans-serif' }}>{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{s.desc}</p>

              {/* tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {s.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 text-[10px] tracking-wider uppercase rounded-full"
                    style={{ background:`rgba(${s.accent},0.1)`, color:`rgba(${s.accent},0.8)`, border:`1px solid rgba(${s.accent},0.2)` }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* cta */}
              <div className="flex items-center gap-2 text-sm tracking-widest uppercase transition-all duration-300"
                style={{ color: hovered===i ? `rgba(${s.accent},1)` : 'rgba(255,255,255,0.3)' }}>
                <span>Learn More</span>
                <motion.span animate={{ x: hovered===i ? 4 : 0 }} transition={{ duration:0.2 }}>→</motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA banner */}
        <motion.div className="mt-16 rounded-2xl p-8 md:p-12 glass border border-blue-500/20 text-center relative overflow-hidden"
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7, delay:0.3 }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background:'linear-gradient(135deg,rgba(59,130,246,0.06),rgba(139,92,246,0.06))' }}/>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 relative" style={{ fontFamily:'Syne, sans-serif' }}>
            Have a project in mind?
          </h3>
          <p className="text-white/50 mb-6 relative">Let's build something remarkable together.</p>
          <motion.button
            type="button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}
            className="relative px-8 py-3.5 rounded-full text-sm font-semibold tracking-widest uppercase text-white"
            style={{ background:'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
            whileHover={{ scale:1.05, boxShadow:'0 0 30px rgba(59,130,246,0.4)' }}
            whileTap={{ scale:0.97 }}>
            Start a Project
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }}/>
    </section>
  );
}
