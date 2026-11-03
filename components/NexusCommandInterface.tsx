'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const items = [
  { num: '01', label: 'About',    id: 'about',     icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
  { num: '02', label: 'Projects', id: 'portfolio', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
  { num: '03', label: 'Skills',   id: 'skills',    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
  { num: '04', label: 'Contact',  id: 'contact',   icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' },
];

const cv = { hidden:{}, visible:{ transition:{ staggerChildren:0.08, delayChildren:0.1 } } };
const iv = {
  hidden:   { opacity:0, x:-12 },
  visible:  { opacity:1, x:0, transition:{ duration:0.5, ease:[0.22,1,0.36,1] } },
};

export default function NexusCommandInterface({ ready }: { ready: boolean }) {
  const [hovered, setHovered] = useState<string|null>(null);

  const nav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  };

  if (!ready) return null;

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={cv}
    >
      {/* Header */}
      <motion.div variants={iv} className="flex items-center gap-2 mb-3">
        <div className="w-1 h-4 rounded-full" style={{ background:'linear-gradient(180deg,#3b82f6,#a855f7)' }}/>
        <span className="text-[9px] tracking-[0.3em] uppercase text-blue-400/70">NEXUS System</span>
        <div className="flex items-center gap-1 ml-auto">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity:[0.4,1,0.4] }}
            transition={{ duration:1.5, repeat:Infinity }}
          />
          <span className="text-[8px] tracking-widest text-green-400/70 uppercase">Online</span>
        </div>
      </motion.div>

      {/* Command items */}
      <div className="flex flex-col gap-1.5">
        {items.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            variants={iv}
            onClick={() => nav(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Navigate to ${item.label} section`}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 group"
            style={{
              background:   hovered === item.id ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.03)',
              border:       `1px solid ${hovered === item.id ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.06)'}`,
              boxShadow:    hovered === item.id ? '0 0 16px rgba(59,130,246,0.12)' : 'none',
            }}
            whileTap={{ scale:0.98 }}
          >
            {/* Number */}
            <span
              className="text-[9px] font-mono flex-shrink-0 w-5"
              style={{ color: hovered === item.id ? 'rgba(59,130,246,0.9)' : 'rgba(255,255,255,0.2)' }}
            >
              {item.num}
            </span>

            {/* Icon */}
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={{
                background: hovered === item.id ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.04)',
                border:     `1px solid ${hovered === item.id ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                style={{ color: hovered === item.id ? '#3b82f6' : 'rgba(255,255,255,0.4)' }}>
                <path d={item.icon} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Label */}
            <span
              className="text-xs font-semibold tracking-widest uppercase flex-1 transition-colors duration-200"
              style={{ color: hovered === item.id ? '#fff' : 'rgba(255,255,255,0.55)', fontFamily:'Syne,sans-serif' }}
            >
              {item.label}
            </span>

            {/* Arrow */}
            <motion.svg
              className="w-3 h-3 flex-shrink-0"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ color: hovered === item.id ? '#3b82f6' : 'transparent' }}
              animate={{ x: hovered === item.id ? 2 : 0 }}
              transition={{ duration:0.2 }}
            >
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
