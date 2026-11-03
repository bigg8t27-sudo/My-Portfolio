'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { AssistantState } from './types';

interface AssistantLauncherProps {
  onClick:   () => void;
  state:     AssistantState;
  isOpen:    boolean;
  soundOn:   boolean;
  onMute:    () => void;
}

export default function AssistantLauncher({ onClick, state, isOpen, soundOn, onMute }: AssistantLauncherProps) {
  const pulseColor = state === 'error' ? '#f59e0b'
    : state === 'thinking' || state === 'listening' ? '#06b6d4'
    : '#06b6d4';

  return (
    <div className="fixed bottom-6 right-6 z-[8800] flex flex-col items-end gap-3">
      {/* Mute button — always visible */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            type="button"
            onClick={onMute}
            aria-label={soundOn ? 'Mute assistant' : 'Unmute assistant'}
            className="w-9 h-9 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400"
            style={{ background:'rgba(4,8,22,0.9)', border:'1px solid rgba(6,182,212,0.25)' }}
            initial={{ opacity:0, scale:0.8 }}
            animate={{ opacity:1, scale:1 }}
            exit={{ opacity:0, scale:0.8 }}
            whileHover={{ scale:1.1 }}
            whileTap={{ scale:0.95 }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"
              style={{ color: soundOn ? '#06b6d4' : 'rgba(255,255,255,0.3)' }}>
              <path d={soundOn
                ? "M15.536 8.464a5 5 0 010 7.072M12 6.253v13l-4-4H3V9h5l4-4z"
                : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l-2-2m0 0l-2-2m2 2l-2-2m-2 2l-2 2"}/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main launcher button */}
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={isOpen}
        className="relative w-14 h-14 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
        style={{
          background: 'linear-gradient(135deg, #0e7490, #7c3aed)',
          boxShadow: `0 0 20px rgba(6,182,212,0.35), 0 4px 20px rgba(0,0,0,0.5)`,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 2.5 }}
      >
        {/* Pulse ring */}
        {(state === 'listening' || state === 'thinking') && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border:`2px solid ${pulseColor}` }}
            animate={{ scale:[1,1.4,1], opacity:[0.8,0,0.8] }}
            transition={{ duration:1.5, repeat:Infinity }}
          />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="close" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90, opacity:0 }}
              transition={{ duration:0.2 }}>
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
            </motion.svg>
          ) : (
            <motion.svg key="robot" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"
              initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.5, opacity:0 }}
              transition={{ duration:0.2 }}>
              <path d="M12 2a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2zm0 4c1.1 0 2 .9 2 2v1h2a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h2V8a2 2 0 012-2zM9 13v2h2v-2H9zm4 0v2h2v-2h-2z"/>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* NEXUS label */}
        {!isOpen && (
          <motion.div
            className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[9px] tracking-widest uppercase text-white whitespace-nowrap"
            style={{ background:'rgba(4,8,22,0.9)', border:'1px solid rgba(6,182,212,0.25)' }}
            initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:3.5 }}>
            NEXUS AI
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
