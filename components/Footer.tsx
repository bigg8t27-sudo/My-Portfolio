'use client';
import { motion } from 'framer-motion';

const navLinks = [
  { label:'Home',        href:'#home' },
  { label:'About',       href:'#about' },
  { label:'Services',    href:'#services' },
  { label:'Portfolio',   href:'#portfolio' },
  { label:'Skills',      href:'#skills' },
  { label:'Process',     href:'#process' },
  { label:'Testimonials',href:'#testimonials' },
  { label:'Contact',     href:'#contact' },
];

const socials = [
  { label:'GitHub',    href:'https://github.com/alfredofori',      icon:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>` },
  { label:'LinkedIn',  href:'https://linkedin.com/in/alfredofori',  icon:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
  { label:'Twitter',   href:'https://twitter.com/alfredofori',      icon:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>` },
  { label:'Dribbble',  href:'https://dribbble.com/alfredofori',     icon:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.06 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4.026-.814zm-11.51-2.18c.25-.42 3.26-5.33 8.59-7.02.022-.01.043-.01.066-.022-.26-.585-.54-1.167-.832-1.43-5.078 1.472-10.01 1.41-10.44 1.4-.03.427-.04.858-.04 1.29 0 2.21.554 4.29 1.657 6.03zm-1.61-7.39c.44.006 4.795.052 9.556-1.248-1.72-3.05-3.56-5.61-3.83-5.99-2.99 1.42-5.19 3.94-5.72 7.24zm7.278-8.984c.28.39 2.156 2.943 3.857 6.07 3.675-1.375 5.23-3.47 5.415-3.72-1.784-1.59-4.144-2.56-6.728-2.56-.86 0-1.698.1-2.505.28l-.04-.07zm9.81 1.76c-.22.29-1.93 2.55-5.77 4.09.24.49.47.99.68 1.5.073.18.14.36.21.54 3.38-.42 6.74.26 7.08.33-.02-2.42-.78-4.66-2.2-6.46z"/></svg>` },
  { label:'Instagram', href:'https://instagram.com/alfredofori',    icon:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>` },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    if (id === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t" style={{ borderColor:'rgba(59,130,246,0.12)', background:'#000' }}>
      {/* top accent line */}
      <div className="h-px w-full" style={{ background:'linear-gradient(90deg,transparent,rgba(59,130,246,0.4),rgba(139,92,246,0.4),transparent)' }}/>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">

          {/* brand */}
          <div className="flex flex-col gap-4">
            <a href="#" onClick={e => { e.preventDefault(); scrollTo('#home'); }}
              className="text-2xl font-black tracking-wider" style={{ fontFamily:'Syne, sans-serif' }}>
              <span className="gradient-text">PORT</span>
              <span className="text-white">FOLIO</span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Full-stack creative developer crafting premium digital experiences. Based in Ghana, working globally.
            </p>
            {/* social icons */}
            <div className="flex gap-3 mt-2">
              {socials.map(s => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale:1.15, y:-2 }} whileTap={{ scale:0.95 }}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center glass border border-white/8 text-white/40 hover:text-white hover:border-blue-500/40 transition-all duration-200">
                  <div className="w-4 h-4" dangerouslySetInnerHTML={{ __html: s.icon.replace(/className="[^"]*"/g,'class="w-4 h-4"') }}/>
                </motion.a>
              ))}
            </div>
          </div>

          {/* nav */}
          <div className="flex flex-col gap-4">
            <div className="text-xs tracking-[0.2em] uppercase text-white/30">Navigation</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {navLinks.map(l => (
                <button key={l.label} type="button" onClick={() => scrollTo(l.href)}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200 text-left">
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* availability CTA */}
          <div className="flex flex-col gap-4">
            <div className="text-xs tracking-[0.2em] uppercase text-white/30">Availability</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-400"/>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-50"/>
              </div>
              <span className="text-sm text-white/60">Open to new projects</span>
            </div>
            <p className="text-white/35 text-sm">Available for freelance, contract, and full-time roles.</p>
            <motion.button
              onClick={() => scrollTo('#contact')}
              whileHover={{ scale:1.04, boxShadow:'0 0 20px rgba(59,130,246,0.3)' }}
              whileTap={{ scale:0.97 }}
              className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase text-white self-start"
              style={{ background:'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
              Hire Me
            </motion.button>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-white/25 text-xs tracking-wider">
            © 2026 ALFRED. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-white/20 text-xs">
            <span>Built with</span>
            <span className="text-blue-400/60 mx-0.5">Next.js</span>
            <span>·</span>
            <span className="text-purple-400/60 mx-0.5">Framer Motion</span>
            <span>·</span>
            <span className="text-cyan-400/60 mx-0.5">Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
