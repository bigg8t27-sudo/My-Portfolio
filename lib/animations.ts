import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: (delay = 0) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const navbarVariants: Variants = {
  transparent: {
    backgroundColor: 'rgba(0,0,0,0)',
    backdropFilter: 'blur(0px)',
    borderColor: 'rgba(255,255,255,0)',
  },
  glass: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(20px)',
    borderColor: 'rgba(255,255,255,0.08)',
  },
};

export const floatAnimation = {
  y: [0, -12, 0],
  transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
};

export const floatAnimationSlow = {
  y: [0, -8, 0],
  transition: { duration: 6, ease: 'easeInOut', repeat: Infinity },
};

export const floatAnimationFast = {
  y: [0, -16, 0],
  transition: { duration: 3, ease: 'easeInOut', repeat: Infinity },
};

export const pulseGlow = {
  opacity: [0.4, 1, 0.4],
  scale: [1, 1.05, 1],
  transition: { duration: 3, ease: 'easeInOut', repeat: Infinity },
};