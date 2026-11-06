'use client';
/**
 * ThemeSwitcher
 * Three themes: Dark · Blue · Light
 *
 * How it works:
 *  1. Sets data-theme on <html>
 *  2. Injects a <style id="nexus-theme-override"> tag that overrides
 *     background-color and color on body, sections, and key elements
 *     with !important — this beats Tailwind utility classes AND
 *     inline styles that use background shorthand.
 *  3. Persists to localStorage so the choice survives page refresh.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Theme = 'dark' | 'blue' | 'white';

interface ThemeDef {
  id: Theme;
  label: string;
  swatch: string;
}

const THEMES: ThemeDef[] = [
  { id: 'dark',  label: 'Dark',  swatch: '#1e1b4b' },
  { id: 'blue',  label: 'Blue',  swatch: '#1d4ed8' },
  { id: 'white', label: 'Light', swatch: '#e2e8f0' },
];

// ── CSS generated for each theme ────────────────────────────────────────────
const THEME_CSS: Record<Theme, string> = {
  dark: `
    html, body { background-color: #000000 !important; color: #ffffff !important; }
    section { color: #ffffff !important; }
    ::-webkit-scrollbar-thumb { background: #3b82f6 !important; }
    ::-webkit-scrollbar-track { background: #000 !important; }
  `,
  blue: `
    html, body { background-color: #060d20 !important; color: #e8f0ff !important; }
    section { background-color: #060d20 !important; color: #e8f0ff !important; }
    #home, #about, #services, #portfolio, #skills,
    #process, #testimonials, #contact { background-color: #060d20 !important; }
    header { background-color: rgba(6,13,32,0.88) !important; }
    footer { background-color: #040a18 !important; color: #e8f0ff !important; }
    #main-content { background-color: #060d20 !important; }
    ::-webkit-scrollbar-thumb { background: #60a5fa !important; }
    ::-webkit-scrollbar-track { background: #060d20 !important; }
    canvas { background: transparent !important; }
    p, span:not([class*="gradient"]), li, label { color: inherit; }
  `,
  white: `
    html, body { background-color: #f0f4ff !important; color: #0f172a !important; }
    section { background-color: #f0f4ff !important; color: #0f172a !important; }
    #home, #about, #services, #portfolio, #skills,
    #process, #testimonials, #contact { background-color: #f0f4ff !important; }
    header {
      background-color: rgba(240,244,255,0.92) !important;
      border-color: rgba(15,23,42,0.12) !important;
    }
    header span, header button, header a, header nav button { color: #0f172a !important; }
    footer, footer p, footer span, footer a, footer div {
      background-color: #e8eeff !important; color: #0f172a !important;
    }
    #main-content { background-color: #f0f4ff !important; }
    h1,h2,h3,h4,h5,h6 { color: #0f172a !important; }
    p  { color: rgba(15,23,42,0.78) !important; }
    li { color: rgba(15,23,42,0.78) !important; }
    .text-white { color: #0f172a !important; }
    [class*="text-white"] { color: rgba(15,23,42,0.75) !important; }
    ::-webkit-scrollbar-thumb { background: #1d4ed8 !important; }
    ::-webkit-scrollbar-track { background: #e2e8f0 !important; }
    canvas { background: transparent !important; }
    .glass { background: rgba(255,255,255,0.75) !important; border-color: rgba(15,23,42,0.12) !important; }
  `,
};

function applyTheme(theme: Theme) {
  // 1. data-theme attribute on <html>
  document.documentElement.setAttribute('data-theme', theme);

  // 2. Inject / update override style tag
  const id = 'nexus-theme-override';
  let tag = document.getElementById(id) as HTMLStyleElement | null;
  if (!tag) {
    tag = document.createElement('style');
    tag.id = id;
    document.head.appendChild(tag);
  }
  tag.textContent = THEME_CSS[theme];

  // 3. Force body inline styles (beats Tailwind bg-black)
  const bgMap: Record<Theme, string> = {
    dark:  '#000000',
    blue:  '#060d20',
    white: '#f0f4ff',
  };
  const colorMap: Record<Theme, string> = {
    dark:  '#ffffff',
    blue:  '#e8f0ff',
    white: '#0f172a',
  };
  document.body.style.setProperty('background-color', bgMap[theme], 'important');
  document.body.style.setProperty('color', colorMap[theme], 'important');

  // 4. Force every section's background
  document.querySelectorAll('section').forEach(el => {
    const bg = theme === 'dark' ? 'transparent' : bgMap[theme];
    (el as HTMLElement).style.setProperty('background-color', bg, 'important');
  });

  // 5. Force footer background
  document.querySelectorAll('footer').forEach(el => {
    const footerBg: Record<Theme, string> = {
      dark: '#000000', blue: '#040a18', white: '#e8eeff',
    };
    (el as HTMLElement).style.setProperty('background-color', footerBg[theme], 'important');
    (el as HTMLElement).style.setProperty('color', colorMap[theme], 'important');
  });

  // 6. Force main content area
  const main = document.getElementById('main-content');
  if (main) {
    main.style.setProperty('background-color', theme === 'dark' ? '#000' : bgMap[theme], 'important');
  }
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ThemeSwitcher() {
  const [open,  setOpen]  = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  // Restore saved theme on first mount
  useEffect(() => {
    const saved = (localStorage.getItem('nexus-theme') ?? 'dark') as Theme;
    setTheme(saved);
    applyTheme(saved);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const select = (t: Theme) => {
    setTheme(t);
    setOpen(false);
    applyTheme(t);
    localStorage.setItem('nexus-theme', t);
  };

  const current = THEMES.find(t => t.id === theme) ?? THEMES[0];

  return (
    <div className="fixed bottom-24 right-6 z-[9999] flex flex-col items-end gap-2">

      {/* Theme option pills */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="flex flex-col gap-2 items-end"
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{   opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {THEMES.map(t => {
              const active = theme === t.id;
              return (
                <motion.button
                  key={t.id}
                  type="button"
                  onClick={() => select(t.id)}
                  aria-label={`Switch to ${t.label} theme`}
                  aria-pressed={active}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  style={{
                    background: active
                      ? 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(168,85,247,0.3))'
                      : 'rgba(8,10,24,0.95)',
                    border: active
                      ? '1.5px solid rgba(59,130,246,0.8)'
                      : '1px solid rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    color: active ? '#bfdbfe' : 'rgba(255,255,255,0.85)',
                    boxShadow: active ? '0 0 20px rgba(59,130,246,0.35)' : 'none',
                    minWidth: '100px',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0 ring-1 ring-white/25 shadow"
                    style={{ background: t.swatch }}
                  />
                  {t.label}
                  {active && (
                    <svg className="w-3 h-3 ml-auto" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-label="Change site colour theme"
        aria-expanded={open}
        title="Change theme"
        className="w-12 h-12 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        style={{
          background: 'rgba(8,10,24,0.95)',
          border: open ? '1.5px solid rgba(59,130,246,0.7)' : '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: open ? '0 0 28px rgba(59,130,246,0.5)' : '0 4px 20px rgba(0,0,0,0.6)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Palette icon */}
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <circle cx="12" cy="12" r="8.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
          <path d="M12 3.5A8.5 8.5 0 0 1 20.5 12" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
          <path d="M20.5 12A8.5 8.5 0 0 1 12 20.5" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round"/>
          <path d="M12 20.5A8.5 8.5 0 0 1 3.5 12" stroke="#a855f7" strokeWidth="3" strokeLinecap="round"/>
          <path d="M3.5 12A8.5 8.5 0 0 1 12 3.5" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="3" fill={current.swatch}/>
        </svg>
      </motion.button>
    </div>
  );
}
