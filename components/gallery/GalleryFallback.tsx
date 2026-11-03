'use client';
/**
 * GalleryFallback — shown when WebGL is unavailable.
 * Same card content, rendered with CSS + Framer Motion.
 */
import { motion } from 'framer-motion';
import Image from 'next/image';
import { portfolioCards, type PortfolioCard } from '@/data/portfolioCards';

interface Props { onCardClick: (card: PortfolioCard) => void; }

export default function GalleryFallback({ onCardClick }: Props) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 pb-20">
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {portfolioCards.map((card) => (
          <motion.button
            key={card.id}
            type="button"
            onClick={() => onCardClick(card)}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }}
            className="group relative rounded-2xl overflow-hidden text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 min-h-[220px]"
            style={{ background: '#03050f', borderColor: `${card.accent}30` }}
            whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${card.accent}40` }}
            whileTap={{ scale: 0.97 }}
            aria-label={`${card.title} — ${card.subtitle}`}
          >
            {card.image ? (
              <div className="absolute inset-0">
                <Image src={card.image} alt={card.title} fill className="object-cover object-center opacity-55 group-hover:opacity-70 transition-opacity duration-300" sizes="(max-width:640px) 50vw, 25vw"/>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,5,18,0.95) 30%, rgba(3,5,18,0.3) 100%)' }}/>
              </div>
            ) : (
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${card.accent}55, ${card.accentAlt}40)` }}/>
            )}
            <div className="relative z-10 p-4 h-full flex flex-col justify-end">
              <div className="w-2 h-2 rounded-full mb-2" style={{ background: card.accent, boxShadow: `0 0 8px ${card.accent}` }}/>
              <div className="text-[9px] tracking-[0.25em] uppercase mb-0.5" style={{ color: `${card.accent}cc` }}>{card.subtitle}</div>
              <h3 className="text-sm font-black text-white leading-tight" style={{ fontFamily: 'Syne,sans-serif' }}>{card.title}</h3>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
