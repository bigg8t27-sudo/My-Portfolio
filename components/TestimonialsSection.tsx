'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id:1,
    name: 'Sarah Mitchell',
    role: 'CEO, NovaTech Solutions',
    avatar: 'SM',
    color: '59,130,246',
    rating: 5,
    text: "Working with Alfred was the best investment we've made in our digital presence. The new dashboard is not only stunning, it converted 40% more trial users in the first month. The attention to animation detail and performance is unmatched.",
    project: 'SaaS Dashboard',
  },
  {
    id:2,
    name: 'James Okonkwo',
    role: 'Founder, Luminary Jewellery',
    avatar: 'JO',
    color: '139,92,246',
    rating: 5,
    text: "I gave Alfred a vague brief and a deadline. What came back was beyond anything I imagined. The site now feels like the luxury brand we are. Our online revenue has tripled since the redesign. Truly exceptional creative work.",
    project: 'E-Commerce Redesign',
  },
  {
    id:3,
    name: 'Priya Sharma',
    role: 'Head of Product, PulseAI',
    avatar: 'PS',
    color: '6,182,212',
    rating: 5,
    text: "The landing page Alfred built for our launch is nothing short of cinematic. Every scroll interaction, every micro-animation tells the story we needed it to tell. We hit our trial signup targets in the first week.",
    project: 'AI Startup Landing Page',
  },
  {
    id:4,
    name: 'Tobias Brenner',
    role: 'Creative Director, Studio Oslo',
    avatar: 'TB',
    color: '245,158,11',
    rating: 5,
    text: "As a design studio, our own site has to be the best in the room. Alfred delivered. The WebGL work, the scroll experience, the typography — everything is at the highest level. Clients constantly mention the website.",
    project: 'Architecture Portfolio',
  },
  {
    id:5,
    name: 'Amira Hassan',
    role: 'Marketing Director, Apex Finance',
    avatar: 'AH',
    color: '16,185,129',
    rating: 5,
    text: "Alfred has a rare combination of skills — designer, developer, strategist. The finance app he built is both beautiful and functional. Our users love it, our team loves working with the codebase. Zero compromises anywhere.",
    project: 'Finance Web Application',
  },
];

const iv = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}} };
const cv = { hidden:{}, visible:{ transition:{ staggerChildren:0.12 } } };

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({length:n}).map((_,i) => (
        <svg key={i} viewBox="0 0 24 24" fill="rgba(245,158,11,0.9)" className="w-4 h-4">
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a+1)%testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const cur = testimonials[active];

  return (
    <section id="testimonials" className="relative z-10 py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(10,10,26,0.9) 30%,rgba(13,13,46,0.85) 70%,rgba(0,0,0,0.3))' }}/>
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)' }}/>

      {/* large quote mark */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/[0.015] pointer-events-none select-none"
        style={{ fontFamily:'Syne, sans-serif', lineHeight:1 }}>"</div>

      <div className="max-w-5xl mx-auto relative">
        {/* header */}
        <motion.div className="flex flex-col items-center text-center mb-16"
          initial="hidden" whileInView="visible" viewport={{ once:true,margin:'-80px' }} variants={cv}>
          <motion.div variants={iv} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background:'rgba(245,158,11,0.8)' }}/>
            <span className="text-xs tracking-[0.25em] uppercase" style={{ color:'rgba(245,158,11,0.8)' }}>Client Voices</span>
            <div className="w-8 h-px" style={{ background:'rgba(245,158,11,0.8)' }}/>
          </motion.div>
          <motion.h2 variants={iv}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ fontFamily:'Syne, sans-serif' }}>
            <span className="text-white">WHAT CLIENTS </span>
            <span style={{ background:'linear-gradient(135deg,#f59e0b,#ef4444)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>SAY</span>
          </motion.h2>
          <motion.p variants={iv} className="text-white/40 text-xs tracking-wider uppercase">
            * Sample testimonials — real client reviews coming soon
          </motion.p>
        </motion.div>

        {/* main testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div key={cur.id}
            initial={{ opacity:0, y:20, scale:0.98 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-20, scale:0.98 }}
            transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
            className="rounded-3xl p-8 md:p-12 glass border mb-8 relative overflow-hidden"
            style={{ borderColor:`rgba(${cur.color},0.2)` }}>

            {/* glow */}
            <div className="absolute top-0 left-0 w-96 h-96 pointer-events-none rounded-full"
              style={{ background:`radial-gradient(circle at top left,rgba(${cur.color},0.06),transparent 60%)`, transform:'translate(-40%,-40%)' }}/>

            {/* top row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              {/* avatar + info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black flex-shrink-0"
                  style={{ background:`rgba(${cur.color},0.15)`, border:`1px solid rgba(${cur.color},0.3)`, color:`rgba(${cur.color},1)`, fontFamily:'Syne, sans-serif' }}>
                  {cur.avatar}
                </div>
                <div>
                  <div className="font-bold text-white" style={{ fontFamily:'Syne, sans-serif' }}>{cur.name}</div>
                  <div className="text-sm text-white/40">{cur.role}</div>
                  <Stars n={cur.rating}/>
                </div>
              </div>
              {/* project badge */}
              <div className="px-3 py-1.5 rounded-full self-start"
                style={{ background:`rgba(${cur.color},0.1)`, border:`1px solid rgba(${cur.color},0.25)`, color:`rgba(${cur.color},0.85)` }}>
                <span className="text-[10px] tracking-widest uppercase">{cur.project}</span>
              </div>
            </div>

            {/* quote text */}
            <p className="text-lg md:text-xl text-white/75 leading-relaxed italic">
              "{cur.text}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* dot indicators + nav */}
        <div className="flex items-center justify-center gap-3">
          {testimonials.map((_,i) => (
            <button key={i} onClick={() => setActive(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: active===i ? 24 : 8,
                height: 8,
                background: active===i ? `rgba(${testimonials[i].color},0.9)` : 'rgba(255,255,255,0.15)',
                boxShadow: active===i ? `0 0 8px rgba(${testimonials[i].color},0.5)` : 'none',
              }}
            />
          ))}
        </div>

        {/* avatar row */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonials.map((t,i) => (
            <motion.button key={t.id} onClick={() => setActive(i)}
              whileHover={{ scale:1.1 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300"
              style={{
                background:`rgba(${t.color},${active===i ? 0.2 : 0.07})`,
                border:`1px solid rgba(${t.color},${active===i ? 0.5 : 0.15})`,
                color:`rgba(${t.color},${active===i ? 1 : 0.5})`,
                fontFamily:'Syne, sans-serif',
                boxShadow: active===i ? `0 0 12px rgba(${t.color},0.25)` : 'none',
              }}>
              {t.avatar}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }}/>
    </section>
  );
}
