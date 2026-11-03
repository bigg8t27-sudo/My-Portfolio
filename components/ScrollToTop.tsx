'use client';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPct(pct);
      setVisible(scrollTop > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  // SVG circle ring progress
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollPct);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-8 right-6 z-50 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          style={{ width: 48, height: 48 }}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={prefersReduced ? {} : { scale: 1.12 }}
          whileTap={prefersReduced ? {} : { scale: 0.92 }}
        >
          {/* Background disc */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: 'rgba(0,10,40,0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(59,130,246,0.25)',
              boxShadow: '0 0 20px rgba(59,130,246,0.2)',
            }}
            aria-hidden="true"
          />

          {/* Scroll-progress ring */}
          <svg
            className="absolute inset-0"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            {/* Track */}
            <circle
              cx="24" cy="24" r={radius}
              fill="none"
              stroke="rgba(59,130,246,0.12)"
              strokeWidth="2"
            />
            {/* Progress arc */}
            <motion.circle
              cx="24" cy="24" r={radius}
              fill="none"
              stroke="url(#scrollGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ rotate: -90, transformOrigin: '24px 24px' }}
            />
            <defs>
              <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#a855f7"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Arrow icon */}
          <motion.svg
            className="relative z-10 w-4 h-4 text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            animate={prefersReduced ? {} : { y: [0, -2, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
