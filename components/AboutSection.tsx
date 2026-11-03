'use client';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const skills = [
  'Next.js','React','TypeScript','Tailwind CSS','Framer Motion',
  'Node.js','Figma','Three.js','GraphQL','PostgreSQL','Vercel','Git',
];

const stats = [
  { n: '5+',   l: 'Years Experience' },
  { n: '120+', l: 'Projects Delivered' },
  { n: '50+',  l: 'Happy Clients' },
  { n: '15+',  l: 'Awards Won' },
];

const iv = { hidden: { opacity:0, y:40 }, visible: { opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } };
const cv = { hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } };

export default function AboutSection() {
  const rm = useReducedMotion();
  return (
    <section id="about" className="relative z-10 py-28 px-6 overflow-hidden">
      {/* background tint */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(13,13,46,0.85) 40%, rgba(10,10,26,0.9) 80%, rgba(0,0,0,0.3))' }}/>

      {/* top blend */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)' }}/>

      {/* accent glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(139,92,246,0.08),transparent 70%)', filter:'blur(40px)' }}/>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(59,130,246,0.07),transparent 70%)', filter:'blur(40px)' }}/>

      <div className="max-w-7xl mx-auto relative">

        {/* section header */}
        <motion.div className="flex flex-col items-center text-center mb-20"
          initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-80px' }} variants={cv}>
          <motion.div variants={iv} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-purple-400"/>
            <span className="text-xs tracking-[0.25em] uppercase text-purple-400">Who I Am</span>
            <div className="w-8 h-px bg-purple-400"/>
          </motion.div>
          <motion.h2 variants={iv}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ fontFamily:'Syne, sans-serif' }}>
            <span className="text-white">ABOUT </span>
            <span className="gradient-text">ME</span>
          </motion.h2>
        </motion.div>

        {/* two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* left – portrait */}
          <motion.div className="flex justify-center lg:justify-start"
            initial={{ opacity:0, x: rm?0:-40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}>
            <div className="relative">
              {/* glowing frame */}
              <div className="absolute -inset-3 rounded-3xl pointer-events-none"
                style={{ background:'linear-gradient(135deg,rgba(59,130,246,0.3),rgba(139,92,246,0.3))', filter:'blur(12px)', opacity:0.6 }}/>
              {/* portrait box */}
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border border-blue-500/20">
                {/* dark background base */}
                <div className="absolute inset-0"
                  style={{ background:'linear-gradient(180deg,rgba(5,5,20,0.6) 0%,rgba(10,10,30,0.3) 100%)' }}/>

                {/* Alfred real photo */}
                <Image
                  src="/Alfred.png"
                  alt="Alfred — Creative Developer & Designer"
                  fill
                  priority
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover object-top"
                  style={{ objectPosition: 'center top' }}
                />

                {/* subtle blue overlay to blend with site palette */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background:'linear-gradient(to top, rgba(3,3,20,0.65) 0%, rgba(3,3,20,0.1) 50%, transparent 100%)' }}/>

                {/* bottom label */}
                <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow:'0 0 6px rgba(34,197,94,0.8)' }}/>
                    <span className="text-xs text-white/80 tracking-wider font-medium">Available for work</span>
                  </div>
                </div>
              </div>
                            {/* floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 border border-blue-500/30"
                animate={{ y:[0,-8,0] }} transition={{ duration:4, ease:'easeInOut', repeat:Infinity }}>
                <div className="text-xl font-black gradient-text" style={{ fontFamily:'Syne, sans-serif' }}>5+</div>
                <div className="text-[10px] text-white/40 tracking-wider uppercase">Years Exp.</div>
              </motion.div>
              {/* floating badge 2 */}
              <motion.div
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 border border-purple-500/30"
                animate={{ y:[0,8,0] }} transition={{ duration:5, ease:'easeInOut', repeat:Infinity }}>
                <div className="text-xl font-black" style={{ fontFamily:'Syne, sans-serif', background:'linear-gradient(135deg,#8b5cf6,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>120+</div>
                <div className="text-[10px] text-white/40 tracking-wider uppercase">Projects</div>
              </motion.div>
            </div>
          </motion.div>

          {/* right – text */}
          <motion.div className="flex flex-col gap-6"
            initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }} variants={cv}>
            <motion.div variants={iv}>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4" style={{ fontFamily:'Syne, sans-serif' }}>
                Creative developer who builds experiences, not just websites.
              </h3>
              <div className="space-y-4 text-white/55 leading-relaxed">
                <p>I'm a full-stack creative developer with over 5 years of experience crafting digital experiences that sit at the intersection of design precision and engineering excellence. Based in Ghana, working globally.</p>
                <p>My work spans from pixel-perfect UI/UX design in Figma to production-ready Next.js applications — every project is built with performance, accessibility, and visual delight as non-negotiables.</p>
                <p>I believe the best digital products are the ones people feel before they read. That's why I lead every project with motion, depth, and considered interactivity.</p>
              </div>
            </motion.div>

            {/* philosophy tags */}
            <motion.div variants={iv} className="flex flex-wrap gap-2">
              {['Design-Led','Performance-First','Accessibility','Motion Design','Clean Code','User-Centred'].map(t => (
                <span key={t} className="px-3 py-1.5 text-xs tracking-wider uppercase glass rounded-full border border-blue-500/20 text-blue-300/70">
                  {t}
                </span>
              ))}
            </motion.div>

            {/* stats row */}
            <motion.div variants={iv} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/5">
              {stats.map(s => (
                <div key={s.l} className="flex flex-col">
                  <span className="text-2xl font-black gradient-text" style={{ fontFamily:'Syne, sans-serif' }}>{s.n}</span>
                  <span className="text-xs text-white/40 tracking-wider uppercase leading-tight">{s.l}</span>
                </div>
              ))}
            </motion.div>

            {/* skills pills */}
            <motion.div variants={iv}>
              <div className="text-xs tracking-[0.2em] uppercase text-white/30 mb-3">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s,i) => (
                  <motion.span key={s}
                    initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }}
                    transition={{ delay: i*0.05, duration:0.4 }}
                    viewport={{ once:true }}
                    className="px-3 py-1 text-xs font-medium glass rounded-full border border-white/8 text-white/60 hover:text-white hover:border-blue-500/40 transition-all duration-200">
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }}/>
    </section>
  );
}
