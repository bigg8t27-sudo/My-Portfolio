'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function IntroModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  const stats = [
    { label: 'Focus',        value: 'Data Science' },
    { label: 'Tools',        value: 'Python · SQL · React' },
    { label: 'Availability', value: 'Open to Work' },
    { label: 'Location',     value: 'Ghana, Africa' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ background: 'rgba(0,4,18,0.92)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}/>

          {/* Modal card */}
          <motion.div
            className="relative w-full max-w-lg rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,20,60,0.9) 0%, rgba(10,5,30,0.95) 100%)',
              border: '1px solid rgba(59,130,246,0.35)',
              boxShadow: '0 0 60px rgba(59,130,246,0.2), 0 0 120px rgba(139,92,246,0.1)',
            }}
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1,    opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top accent line */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, #a855f7, transparent)' }}/>

            <div className="p-8">
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close intro"
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                {/* Animated N mark */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(168,85,247,0.2))', border: '1px solid rgba(59,130,246,0.4)' }}>
                  <span className="text-lg font-black" style={{ fontFamily:'Syne,sans-serif', background:'linear-gradient(135deg,#3b82f6,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>N</span>
                </div>
                <div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-blue-400/70 mb-0.5">NEXUS INTELLIGENCE</div>
                  <div className="text-lg font-black text-white" style={{ fontFamily:'Syne,sans-serif' }}>Alfred Ofori</div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                I&apos;m a <strong className="text-white">Data Scientist</strong> and{' '}
                <strong className="text-blue-400">Software Developer</strong> passionate about turning raw data
                into actionable insights and building intelligent digital systems.
                I combine analytical thinking with creative engineering to deliver solutions that matter.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {stats.map(s => (
                  <div key={s.label} className="rounded-xl p-3"
                    style={{ background:'rgba(59,130,246,0.06)', border:'1px solid rgba(59,130,246,0.15)' }}>
                    <div className="text-[9px] tracking-widest uppercase text-blue-400/60 mb-1">{s.label}</div>
                    <div className="text-sm font-semibold text-white/85">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Mission statement */}
              <div className="rounded-xl p-4 mb-6"
                style={{ background:'linear-gradient(135deg,rgba(59,130,246,0.08),rgba(168,85,247,0.08))', border:'1px solid rgba(168,85,247,0.2)' }}>
                <div className="text-[9px] tracking-widest uppercase text-purple-400/70 mb-2">Mission</div>
                <p className="text-sm text-white/70 italic leading-relaxed">
                  &ldquo;Build intelligent solutions for a smarter tomorrow.&rdquo;
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <motion.button
                  type="button"
                  onClick={() => { onClose(); document.getElementById('portfolio')?.scrollIntoView({ behavior:'smooth' }); }}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold tracking-wide text-white"
                  style={{ background:'linear-gradient(135deg,#3b82f6,#a855f7)' }}
                  whileHover={{ scale:1.03, boxShadow:'0 0 24px rgba(100,60,220,0.5)' }}
                  whileTap={{ scale:0.97 }}>
                  View Projects
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => { onClose(); document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }); }}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold tracking-wide text-white/80"
                  style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.15)' }}
                  whileHover={{ scale:1.03, background:'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale:0.97 }}>
                  Get In Touch
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
