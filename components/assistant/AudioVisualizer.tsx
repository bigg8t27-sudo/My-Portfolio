'use client';
import { motion } from 'framer-motion';
import { AssistantState } from './types';

interface AudioVisualizerProps {
  state: AssistantState;
}

const BAR_COUNT = 12;

export default function AudioVisualizer({ state }: AudioVisualizerProps) {
  const isActive = state === 'listening' || state === 'speaking';
  const isThinking = state === 'thinking';

  return (
    <div className="flex items-center justify-center gap-0.5 h-8" aria-hidden="true">
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        const delay = i * 0.06;
        const baseDuration = isActive ? 0.4 + (i % 3) * 0.15 : isThinking ? 0.8 + (i % 4) * 0.2 : 2;
        const maxH = isActive ? 24 + (i % 4) * 8 : isThinking ? 8 + (i % 3) * 6 : 4;
        const minH = 3;
        const color = state === 'error' ? '#f59e0b'
          : state === 'thinking' ? '#a855f7'
          : '#06b6d4';

        return (
          <motion.div
            key={i}
            className="w-0.5 rounded-full"
            style={{ backgroundColor: color, opacity: state === 'sleep' ? 0.15 : 0.8 }}
            animate={{ height: [minH, maxH, minH] }}
            transition={{
              duration: baseDuration,
              delay: delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}
