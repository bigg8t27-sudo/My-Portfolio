'use client';
/**
 * NexusPortfolioGallery
 * ─────────────────────
 * Wrapper for the pmndrs cards-with-border-radius carousel.
 *
 * Flow:
 *  1. LoadingScreen calls onComplete → `ready` becomes true
 *  2. This component fades in
 *  3. All card textures (real images + generated gradients) are pre-built
 *  4. A banner texture is generated for the sine-wave text cylinder
 *  5. GalleryScene renders the full 3-D carousel
 *  6. Card click → dismiss gallery → scroll to section or open assistant
 */

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { portfolioCards, type PortfolioCard } from '@/data/portfolioCards';
import GalleryFallback from './GalleryFallback';

const GalleryScene = dynamic(() => import('./GalleryScene'), { ssr: false, loading: () => null });

// ── WebGL detection ───────────────────────────────────────────────────────────
function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

// ── Card image generator — consistent premium style for ALL cards ──────────────
function makeCardTexture(card: PortfolioCard): string {
  const W = 512, H = 720;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const parse = (hex: string) => {
    const s = hex.replace('#', '');
    return [parseInt(s.slice(0,2),16), parseInt(s.slice(2,4),16), parseInt(s.slice(4,6),16)] as [number,number,number];
  };
  const [r1,g1,b1] = parse(card.accent);
  const [r2,g2,b2] = parse(card.accentAlt);

  // ── 1. Deep dark base
  ctx.fillStyle = '#04060f';
  ctx.fillRect(0, 0, W, H);

  // ── 2. Diagonal gradient tint
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0,   `rgba(${r1},${g1},${b1},0.45)`);
  grad.addColorStop(0.5, `rgba(4,6,15,0.1)`);
  grad.addColorStop(1,   `rgba(${r2},${g2},${b2},0.38)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // ── 3. Large central radial glow (upper 40%)
  const glow = ctx.createRadialGradient(W*0.5, H*0.30, 0, W*0.5, H*0.30, W*0.58);
  glow.addColorStop(0,   `rgba(${r1},${g1},${b1},0.52)`);
  glow.addColorStop(0.45,`rgba(${r1},${g1},${b1},0.14)`);
  glow.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // ── 4. Fine dot grid
  ctx.fillStyle = `rgba(${r1},${g1},${b1},0.11)`;
  for (let x = 18; x < W; x += 36) {
    for (let y = 18; y < H; y += 36) {
      ctx.beginPath(); ctx.arc(x, y, 1.2, 0, Math.PI*2); ctx.fill();
    }
  }

  // ── 5. Large icon circle (upper center)
  const iconY = H * 0.32;
  const iconR = W * 0.18;
  // Outer glow ring
  ctx.beginPath(); ctx.arc(W/2, iconY, iconR + 12, 0, Math.PI*2);
  ctx.strokeStyle = `rgba(${r1},${g1},${b1},0.25)`;
  ctx.lineWidth = 1; ctx.stroke();
  // Inner ring
  ctx.beginPath(); ctx.arc(W/2, iconY, iconR + 4, 0, Math.PI*2);
  ctx.strokeStyle = `rgba(${r1},${g1},${b1},0.45)`;
  ctx.lineWidth = 1.5; ctx.stroke();
  // Filled disc
  const disc = ctx.createRadialGradient(W/2, iconY, 0, W/2, iconY, iconR);
  disc.addColorStop(0,   `rgba(${r1},${g1},${b1},0.55)`);
  disc.addColorStop(0.6, `rgba(${r1},${g1},${b1},0.18)`);
  disc.addColorStop(1,   `rgba(${r1},${g1},${b1},0.05)`);
  ctx.beginPath(); ctx.arc(W/2, iconY, iconR, 0, Math.PI*2);
  ctx.fillStyle = disc; ctx.fill();

  // ── 6. Bottom vignette for text area
  const vig = ctx.createLinearGradient(0, H*0.48, 0, H);
  vig.addColorStop(0, 'rgba(3,4,12,0)');
  vig.addColorStop(0.4,'rgba(3,4,12,0.7)');
  vig.addColorStop(1,  'rgba(3,4,12,0.97)');
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);

  // ── 7. Accent divider line
  const lineY = H * 0.635;
  ctx.beginPath(); ctx.moveTo(W*0.12, lineY); ctx.lineTo(W*0.88, lineY);
  const lineGrad = ctx.createLinearGradient(W*0.12, 0, W*0.88, 0);
  lineGrad.addColorStop(0,   'rgba(255,255,255,0)');
  lineGrad.addColorStop(0.3, `rgba(${r1},${g1},${b1},0.9)`);
  lineGrad.addColorStop(0.7, `rgba(${r2},${g2},${b2},0.9)`);
  lineGrad.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.strokeStyle = lineGrad; ctx.lineWidth = 1.5; ctx.stroke();

  // ── 8. Subtitle
  ctx.font = `500 ${Math.round(W*0.036)}px "Segoe UI",system-ui,sans-serif`;
  ctx.fillStyle = `rgba(${r1},${g1},${b1},0.8)`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(card.subtitle.toUpperCase(), W/2, H*0.705);

  // ── 9. Title (word-wrapped)
  const fontSize = Math.round(W * 0.075);
  ctx.font = `800 ${fontSize}px "Segoe UI","Arial Black",system-ui,sans-serif`;
  ctx.fillStyle = 'rgba(255,255,255,0.96)';
  ctx.textBaseline = 'top';
  const words = card.title.split(' ');
  const lineH = fontSize * 1.18;
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(test).width > W * 0.82) { if (cur) lines.push(cur); cur = w; } else cur = test;
  }
  if (cur) lines.push(cur);
  const textStartY = H * 0.735;
  lines.forEach((line, i) => ctx.fillText(line, W/2, textStartY + i * lineH));

  return canvas.toDataURL('image/jpeg', 0.93);
}

// ── Banner texture — scrolling text strip ──────────────────────────────────────
function makeBannerTexture(): string {
  const W = 2048, H = 128;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#020408';
  ctx.fillRect(0, 0, W, H);

  // Repeating text
  const text = '  ALFRED OFORI  ·  DATA SCIENTIST  ·  DEVELOPER  ·  NEXUS  ·  ';
  ctx.font = `bold ${Math.round(H*0.45)}px "Segoe UI","Arial",sans-serif`;
  ctx.fillStyle = 'rgba(200,215,255,0.75)';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  let x = 0;
  while (x < W * 2) {
    ctx.fillText(text, x, H / 2);
    x += ctx.measureText(text).width;
  }

  return canvas.toDataURL('image/jpeg', 0.92);
}

// ── Texture generation — runs synchronously so there's no delay ───────────────
// All generation happens in the lazy useState initializer before first render.

function buildAllTextures(): string[] {
  if (typeof window === 'undefined') return [];
  return portfolioCards.map(c => c.image ? c.image : makeCardTexture(c));
}

function buildBanner(): string {
  if (typeof window === 'undefined') return '';
  return makeBannerTexture();
}
export interface NexusPortfolioGalleryProps {
  ready: boolean;
  onDismiss: () => void;
  onOpenAssistant: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function NexusPortfolioGallery({ ready, onDismiss, onOpenAssistant }: NexusPortfolioGalleryProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [textureUrls, setTextureUrls] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  // Build all textures client-side
  useEffect(() => {
    const webgl = detectWebGL();
    setHasWebGL(webgl);
    if (!webgl) return;

    // Card textures: real image path or generated canvas
    const cardUrls = portfolioCards.map(c => c.image ? c.image : makeCardTexture(c));
    // Banner texture appended at end (Scene uses last index for banner)
    const bannerUrl = makeBannerTexture();
    setTextureUrls([...cardUrls, bannerUrl]);
  }, []);

  // Show after textures ready
  useEffect(() => {
    if (ready && hasWebGL !== null) {
      if (hasWebGL && textureUrls.length === 0) return; // wait for textures
      const t = setTimeout(() => setShow(true), prefersReduced ? 0 : 100);
      return () => clearTimeout(t);
    }
  }, [ready, hasWebGL, textureUrls.length, prefersReduced]);

  // Escape to dismiss
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onDismiss(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onDismiss]);

  const handleCardClick = useCallback((card: PortfolioCard) => {
    if (card.action === 'assistant') {
      onDismiss();
      setTimeout(onOpenAssistant, 500);
      return;
    }
    onDismiss();
    setTimeout(() => {
      const id = card.destination.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }, 600);
  }, [onDismiss, onOpenAssistant, prefersReduced]);

  if (hasWebGL === null || !ready) return null;

  // Card textures only (banner is the last element, not passed to cards)
  const cardTextureUrls = textureUrls.slice(0, portfolioCards.length);
  const allUrls = textureUrls; // scene uses last element for banner

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.55, ease: 'easeOut' }}
        >
          {/* ── 3-D Canvas fills entire screen ── */}
          <div className="absolute inset-0">
            {hasWebGL && cardTextureUrls.length === portfolioCards.length ? (
              <GalleryScene
                cards={portfolioCards}
                textureUrls={allUrls}
                onCardClick={handleCardClick}
                prefersReduced={prefersReduced}
              />
            ) : (
              <div
                className="absolute inset-0 overflow-y-auto flex items-center justify-center"
                style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 40%, rgba(2,8,40,0.98) 0%, #000 100%)' }}
              >
                <GalleryFallback onCardClick={handleCardClick} />
              </div>
            )}
          </div>

          {/* ── Overlay: NO duplicate logo, NO online badge — just the CTA + hints ── */}
          <div className="absolute inset-0 pointer-events-none z-[60]">

            {/* ── "Enter Portfolio" — prominent, centred at the bottom ── */}
            <motion.div
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[9px] tracking-[0.35em] uppercase text-white/35 pointer-events-none">
                Scroll to rotate · Click a card to navigate
              </p>

              <motion.button
                type="button"
                onClick={onDismiss}
                aria-label="Enter the full portfolio"
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold tracking-widest uppercase text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  boxShadow: '0 0 32px rgba(59,130,246,0.5), 0 0 64px rgba(168,85,247,0.25)',
                }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: '0 0 48px rgba(59,130,246,0.7), 0 0 80px rgba(168,85,247,0.4)',
                }}
                whileTap={{ scale: 0.96 }}
              >
                Enter Portfolio
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>

              {/* Quick nav pills */}
              <nav className="flex items-center gap-1.5 flex-wrap justify-center" aria-label="Quick navigation">
                {(['About','Projects','Skills','Process','Contact'] as const).map(label => {
                  const idMap: Record<string, string> = {
                    About: 'about', Projects: 'portfolio', Skills: 'skills',
                    Process: 'process', Contact: 'contact',
                  };
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        onDismiss();
                        setTimeout(() => document.getElementById(idMap[label])?.scrollIntoView({ behavior: 'smooth' }), 600);
                      }}
                      className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {label}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
