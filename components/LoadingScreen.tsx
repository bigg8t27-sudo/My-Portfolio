'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('out'), 2000);
    const t3 = setTimeout(() => onComplete(), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'out' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Logo animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            {/* Animated ring */}
            <div className="relative w-20 h-20">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{ borderTopColor: '#3b82f6', borderRightColor: '#8b5cf6' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-transparent"
                style={{ borderBottomColor: '#06b6d4' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Syne, sans-serif' }}>P</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-sm tracking-[0.3em] uppercase text-white/40">Loading Experience</div>
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-px bg-white/10 overflow-hidden">
            <motion.div
              className="h-full"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}