'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

// ── Animated bar chart bar ─────────────────────────────────────
function Bar({ height, delay, color, animated }: {
  height: number; delay: number; color: string; animated: boolean;
}) {
  return (
    <motion.div
      className="flex-1 rounded-sm"
      style={{ height: `${height * 100}%`, background: color }}
      initial={{ scaleY: 0, originY: 1 }}
      animate={{ scaleY: 1 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
    >
      {animated && (
        <motion.div
          className="w-full h-full rounded-sm"
          style={{ background: color }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2 + delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
}

// ── Animated signal bar ────────────────────────────────────────
function SignalBar({ height, delay, color, baseDelay }: {
  height: number; delay: number; color: string; baseDelay: number;
}) {
  return (
    <motion.div
      className="flex-1 rounded-sm"
      style={{ background: color }}
      initial={{ scaleY: 0, originY: 1 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: baseDelay + delay, duration: 0.35, ease: 'easeOut' }}
    >
      <motion.div
        className="w-full h-full rounded-sm"
        style={{ background: color }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5 + delay * 0.3, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.2 }}
      />
    </motion.div>
  );
}

export default function HolographicHUD({ ready }: { ready: boolean }) {
  const prefersReduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  // Live-updating "metric" for the top-right panel
  useEffect(() => {
    if (!ready || prefersReduced) return;
    const t = setInterval(() => setTick(n => (n + 1) % 100), 2200);
    return () => clearInterval(t);
  }, [ready, prefersReduced]);

  if (!ready) return null;

  const barHeights = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.65, 0.75];
  const signalHeights = [0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.5, 0.9, 0.7, 0.6];

  // Rotating metrics for top-right live panel
  const metrics = [
    { label: 'Projects Done', value: '120+', sub: 'Delivered on time' },
    { label: 'Client Score', value: '98%', sub: 'Satisfaction rate' },
    { label: 'Lines of Code', value: '500k+', sub: 'Written & shipped' },
    { label: 'Uptime SLA', value: '99.9%', sub: 'Average uptime' },
  ];
  const currentMetric = metrics[tick % metrics.length];

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">

      {/* ── TOP-LEFT: Data · Insights · Innovation ──────────── */}
      <motion.div className="absolute top-6 left-2 w-44"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="rounded-xl p-3" style={{
          background: 'rgba(0,20,60,0.75)',
          border: '1px solid rgba(0,120,255,0.4)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 20px rgba(0,80,255,0.15)',
        }}>
          <div className="text-[9px] tracking-[0.2em] uppercase text-blue-300/80 mb-2 flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"
              animate={prefersReduced ? {} : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Data · Insights · Innovation
          </div>
          <div className="flex items-end gap-1 h-8">
            {barHeights.map((h, i) => (
              prefersReduced ? (
                <div key={i} className="flex-1 rounded-sm"
                  style={{ height: `${h * 100}%`, background: `rgba(0,${120 + i * 15},255,0.7)` }}/>
              ) : (
                <Bar
                  key={i}
                  height={h}
                  delay={3.2 + i * 0.06}
                  color={`rgba(0,${120 + i * 15},255,0.7)`}
                  animated
                />
              )
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── TOP-RIGHT: Live Stats panel ─────────────────────── */}
      <motion.div className="absolute top-6 right-2 w-44"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="rounded-xl p-3" style={{
          background: 'rgba(20,0,60,0.75)',
          border: '1px solid rgba(120,0,255,0.35)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 20px rgba(100,0,255,0.12)',
        }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-[9px] tracking-[0.2em] uppercase text-purple-300/80 flex items-center gap-1.5">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"
                animate={prefersReduced ? {} : { opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
              />
              Live Stats
            </div>
            {/* Blinking cursor */}
            {!prefersReduced && (
              <motion.div
                className="w-0.5 h-3 bg-purple-400 rounded-full"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            )}
          </div>

          {/* Rotating metric */}
          <motion.div
            key={currentMetric.label}
            initial={prefersReduced ? {} : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[9px] text-purple-300/60 tracking-wider uppercase mb-0.5">
              {currentMetric.label}
            </div>
            <div className="text-xl font-black mb-0.5"
              style={{
                fontFamily: 'Syne, sans-serif',
                background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              {currentMetric.value}
            </div>
            <div className="text-[9px] text-white/40 leading-tight">
              {currentMetric.sub}
            </div>
          </motion.div>

          {/* Progress ring visual */}
          <div className="mt-2 flex items-center gap-1.5">
            {metrics.map((_, i) => (
              <motion.div
                key={i}
                className="h-0.5 flex-1 rounded-full"
                style={{
                  background: i === tick % metrics.length
                    ? 'rgba(168,85,247,0.9)'
                    : 'rgba(255,255,255,0.1)',
                }}
                animate={prefersReduced ? {} : { opacity: i === tick % metrics.length ? [0.6, 1, 0.6] : 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── BOTTOM-LEFT: My Mission ──────────────────────────── */}
      <motion.div className="absolute bottom-10 left-2 w-44"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="rounded-xl p-3" style={{
          background: 'rgba(0,20,60,0.75)',
          border: '1px solid rgba(0,120,255,0.35)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 20px rgba(0,80,255,0.12)',
        }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ border: '1px solid rgba(0,150,255,0.6)' }}>
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: 'rgba(0,150,255,0.8)' }}
                animate={prefersReduced ? {} : { scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <span className="text-[9px] tracking-widest uppercase text-blue-300/90 font-semibold">My Mission:</span>
          </div>
          <p className="text-[9px] text-white/55 leading-relaxed">
            Build intelligent solutions<br />for a smarter tomorrow.
          </p>
          {/* Scanning line */}
          {!prefersReduced && (
            <motion.div
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,150,255,0.4), transparent)' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      </motion.div>

      {/* ── BOTTOM-RIGHT: NEXUS Status ───────────────────────── */}
      <motion.div className="absolute bottom-10 right-2 w-44"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="rounded-xl p-3" style={{
          background: 'rgba(0,20,60,0.75)',
          border: '1px solid rgba(0,120,255,0.35)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 20px rgba(0,80,255,0.12)',
        }}>
          <div className="flex items-center gap-2 mb-2">
            {/* Robot icon */}
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(0,100,255,0.3)', border: '1px solid rgba(0,150,255,0.4)' }}>
              <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15m-6.75-5.986V3.104m0 0c.25.023.5.05.75.082M10.5 8.5h3m-3 3h3m-3 3h3"/>
              </svg>
            </div>
            <div>
              <div className="text-[11px] font-bold text-white/90">NEXUS AI</div>
              <div className="flex items-center gap-1 mt-0.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={prefersReduced ? {} : { opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[8px] text-green-400/80 tracking-wider">System Online</span>
              </div>
            </div>
          </div>
          {/* Animated signal bars */}
          <div className="flex items-end gap-0.5 h-4">
            {signalHeights.map((h, i) =>
              prefersReduced ? (
                <div key={i} className="flex-1 rounded-sm"
                  style={{ height: `${h * 100}%`, background: `rgba(0,${130 + i * 10},255,0.65)` }}/>
              ) : (
                <SignalBar
                  key={i}
                  height={h}
                  delay={i * 0.05}
                  color={`rgba(0,${130 + i * 10},255,0.65)`}
                  baseDelay={3.9}
                />
              )
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
