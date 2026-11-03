'use client';
import { useReducedMotion } from 'framer-motion';

const items = [
  { icon: '◈', label: 'Data Science' },
  { icon: '⚡', label: 'Web Development' },
  { icon: '◎', label: 'Data Analytics' },
  { icon: '✦', label: 'UI / UX Design' },
  { icon: '◈', label: 'Next.js & React' },
  { icon: '⚙', label: 'Machine Learning' },
  { icon: '◎', label: 'Landing Pages' },
  { icon: '✦', label: 'TypeScript' },
  { icon: '◈', label: 'Brand Identity' },
  { icon: '⚡', label: 'Data Visualisation' },
  { icon: '◎', label: 'Website Redesign' },
  { icon: '✦', label: 'SQL & PostgreSQL' },
  { icon: '◈', label: 'Python' },
  { icon: '⚡', label: 'Node.js' },
  { icon: '◎', label: 'Framer Motion' },
  { icon: '✦', label: 'Performance Optimisation' },
];

// Duplicate for seamless loop
const track = [...items, ...items];

function Item({ icon, label, accent }: { icon: string; label: string; accent: boolean }) {
  return (
    <div className="flex items-center gap-3 flex-shrink-0 px-6 py-0 select-none">
      <span
        className="text-sm font-bold flex-shrink-0"
        style={{ color: accent ? '#06b6d4' : '#3b82f6' }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span
        className="text-sm font-semibold tracking-widest uppercase whitespace-nowrap"
        style={{
          color: accent ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)',
          fontFamily: 'Syne, sans-serif',
          letterSpacing: '0.12em',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function MarqueeStrip() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="relative z-10 w-full overflow-hidden border-y"
      style={{
        borderColor: 'rgba(59,130,246,0.12)',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(6,8,24,0.9) 50%, rgba(0,0,0,0.85) 100%)',
        backdropFilter: 'blur(8px)',
      }}
      aria-label="Alfred's skills and capabilities"
      role="marquee"
    >
      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.95), transparent)' }}
        aria-hidden="true"
      />
      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, rgba(0,0,0,0.95), transparent)' }}
        aria-hidden="true"
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(168,85,247,0.4), transparent)' }}
        aria-hidden="true"
      />
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), rgba(6,182,212,0.3), transparent)' }}
        aria-hidden="true"
      />

      {/* Scrolling track */}
      <div
        className={prefersReduced ? 'flex flex-nowrap' : 'marquee-track'}
        style={{ padding: '18px 0' }}
        aria-hidden="true"
      >
        {track.map((item, i) => (
          <Item
            key={i}
            icon={item.icon}
            label={item.label}
            accent={i % 4 === 0}
          />
        ))}
      </div>

      {/* Screen-reader accessible version */}
      <p className="sr-only">
        {items.map(i => i.label).join(', ')}
      </p>
    </div>
  );
}
