'use client';
import { motion } from 'framer-motion';
import { Message } from './types';

interface AssistantMessageProps {
  message: Message;
  onSpeak?: (text: string) => void;
  onNavigate?: (target: string) => void;
  isSpeaking?: boolean;
}

export default function AssistantMessage({ message, onSpeak, onNavigate, isSpeaking }: AssistantMessageProps) {
  const isUser = message.role === 'user';
  const time   = new Date(message.timestamp).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });

  // Detect navigation JSON in response
  let displayText = message.content;
  let navTarget: string | null = null;
  try {
    const parsed = JSON.parse(message.content);
    if (parsed.action === 'navigate' && parsed.target) {
      displayText = parsed.message ?? message.content;
      navTarget   = parsed.target;
    }
  } catch { /* not JSON, use as-is */ }

  // Convert **bold** markdown
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**')
        ? <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <motion.div
      className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
          style={{ background:'linear-gradient(135deg,#0e7490,#7c3aed)', border:'1px solid rgba(6,182,212,0.4)' }}>
          <span className="text-[9px] font-black text-white">N</span>
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[82%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className="px-3 py-2.5 rounded-2xl text-sm leading-relaxed"
          style={isUser ? {
            background: 'linear-gradient(135deg,rgba(59,130,246,0.25),rgba(168,85,247,0.2))',
            border: '1px solid rgba(59,130,246,0.3)',
            color: 'rgba(255,255,255,0.9)',
            borderBottomRightRadius: '4px',
          } : {
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.8)',
            borderBottomLeftRadius: '4px',
          }}
        >
          {renderText(displayText)}

          {/* Navigation action button */}
          {navTarget && (
            <button
              type="button"
              onClick={() => { onNavigate?.(navTarget!); }}
              className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-cyan-300 w-full"
              style={{ background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.3)' }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Go to {navTarget.charAt(0).toUpperCase() + navTarget.slice(1)}
            </button>
          )}
        </div>

        {/* Time + speak button */}
        <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-[9px] text-white/25">{time}</span>
          {!isUser && onSpeak && (
            <button
              type="button"
              onClick={() => onSpeak(displayText)}
              aria-label="Read message aloud"
              className="text-white/25 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d={isSpeaking
                  ? "M6 6h12v12H6z"
                  : "M15.536 8.464a5 5 0 010 7.072M12 6.253v13l-4-4H3V9h5l4-4zm4.536-.283a9 9 0 010 12.53"}/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
