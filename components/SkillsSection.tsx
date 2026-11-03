'use client';
import { motion } from 'framer-motion';

const coreSkills = [
  { name:'Next.js',       level:95, color:'59,130,246' },
  { name:'React',         level:95, color:'6,182,212' },
  { name:'TypeScript',    level:90, color:'59,130,246' },
  { name:'Tailwind CSS',  level:95, color:'139,92,246' },
  { name:'Framer Motion', level:88, color:'139,92,246' },
  { name:'Node.js',       level:82, color:'16,185,129' },
  { name:'Figma',         level:90, color:'245,158,11' },
  { name:'PostgreSQL',    level:75, color:'59,130,246' },
];

const techCards = [
  { group:'Frontend',  items:['React 18','Next.js 14','TypeScript','Tailwind CSS','Framer Motion','Zustand'] },
  { group:'Backend',   items:['Node.js','Express','Prisma','PostgreSQL','Supabase','REST & GraphQL'] },
  { group:'Design',    items:['Figma','Adobe XD','Illustrator','Photoshop','Spline','Lottie'] },
  { group:'Tooling',   items:['Git / GitHub','Vercel','Docker','Turborepo','Vitest','Playwright'] },
];

const accentColors: Record<string,string> = {
  Frontend: '59,130,246',
  Backend:  '16,185,129',
  Design:   '245,158,11',
  Tooling:  '139,92,246',
};

const iv = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}} };
const cv = { hidden:{}, visible:{ transition:{ staggerChildren:0.08 } } };

function SkillBar({ skill, i }: { skill: typeof coreSkills[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity:0, x:-20 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true, margin:'-40px' }}
      transition={{ duration:0.6, delay:i*0.06, ease:[0.22,1,0.36,1] }}
      className="flex flex-col gap-1.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">{skill.name}</span>
        <span className="text-xs font-bold" style={{ color:`rgba(${skill.color},0.9)` }}>{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background:`linear-gradient(90deg,rgba(${skill.color},0.9),rgba(${skill.color},0.5))` }}
          initial={{ scaleX:0, transformOrigin:'left' }}
          whileInView={{ scaleX:1 }}
          viewport={{ once:true, margin:'-40px' }}
          transition={{ duration:1.2, delay:0.2+i*0.06, ease:[0.22,1,0.36,1] }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(10,10,26,0.9) 30%,rgba(13,13,46,0.85) 70%,rgba(0,0,0,0.3))' }}/>
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)' }}/>

      <div className="max-w-7xl mx-auto relative">
        {/* header */}
        <motion.div className="flex flex-col items-center text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once:true,margin:'-80px' }} variants={cv}>
          <motion.div variants={iv} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-cyan-400"/>
            <span className="text-xs tracking-[0.25em] uppercase text-cyan-400">Expertise</span>
            <div className="w-8 h-px bg-cyan-400"/>
          </motion.div>
          <motion.h2 variants={iv}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ fontFamily:'Syne, sans-serif' }}>
            <span className="text-white">MY </span>
            <span className="gradient-text-cyan">SKILLS</span>
          </motion.h2>
          <motion.p variants={iv} className="text-white/50 max-w-xl">
            A toolkit built over years of building for clients across 20+ industries.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* skill bars */}
          <div>
            <motion.h3
              initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.6 }}
              className="text-lg font-bold text-white mb-8" style={{ fontFamily:'Syne, sans-serif' }}>
              Core Proficiencies
            </motion.h3>
            <div className="flex flex-col gap-5">
              {coreSkills.map((s,i) => <SkillBar key={s.name} skill={s} i={i}/>)}
            </div>
          </div>

          {/* tech group cards */}
          <div>
            <motion.h3
              initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.6 }}
              className="text-lg font-bold text-white mb-8" style={{ fontFamily:'Syne, sans-serif' }}>
              Technology Stack
            </motion.h3>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial="hidden" whileInView="visible" viewport={{ once:true,margin:'-40px' }} variants={cv}>
              {techCards.map((g) => {
                const ac = accentColors[g.group];
                return (
                  <motion.div key={g.group} variants={iv}
                    whileHover={{ scale:1.02, transition:{ duration:0.2 } }}
                    className="rounded-2xl p-5 glass border border-white/5 transition-all duration-300 group"
                    style={{ ['--hover-border' as string]:`rgba(${ac},0.35)` }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor=`rgba(${ac},0.3)`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor='rgba(255,255,255,0.05)')}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full" style={{ background:`rgba(${ac},0.9)`, boxShadow:`0 0 6px rgba(${ac},0.7)` }}/>
                      <span className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color:`rgba(${ac},0.9)` }}>{g.group}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map(item => (
                        <span key={item} className="px-2.5 py-1 text-[11px] rounded-full text-white/60 transition-all duration-200 hover:text-white"
                          style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* extra stat cards */}
            <motion.div className="grid grid-cols-3 gap-3 mt-4"
              initial="hidden" whileInView="visible" viewport={{ once:true }} variants={cv}>
              {[['60+','Technologies'],['5+','Years Exp.'],['∞','Curiosity']].map(([n,l]) => (
                <motion.div key={l} variants={iv}
                  className="rounded-xl p-4 glass border border-white/5 text-center">
                  <div className="text-xl font-black gradient-text mb-1" style={{ fontFamily:'Syne, sans-serif' }}>{n}</div>
                  <div className="text-[10px] text-white/40 tracking-wider uppercase leading-tight">{l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }}/>
    </section>
  );
}
