'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useAssistantChat } from './useAssistantChat';
import { useAssistantSettings } from './useAssistantSettings';
import { useSpeechSynthesis } from './useSpeechSynthesis';
import { useSpeechRecognition } from './useSpeechRecognition';
import AssistantMessage from './AssistantMessage';
import AudioVisualizer from './AudioVisualizer';
import AssistantSettingsPanel from './AssistantSettingsPanel';
import { AssistantState } from './types';

const RobotScene = dynamic(() => import('./RobotScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"/>
    </div>
  ),
});

const SUGGESTIONS = [
  "Who is Alfred Ofori?",
  "Show me the featured projects.",
  "What technologies does Alfred use?",
  "How can I contact Alfred?",
  "What services does Alfred offer?",
];

interface HumanoidAssistantProps {
  open:    boolean;
  onClose: () => void;
  onStateChange?: (state: AssistantState) => void;
}

export default function HumanoidAssistant({ open, onClose, onStateChange }: HumanoidAssistantProps) {
  const { messages, state: chatState, error, setState, sendMessage, clearHistory } = useAssistantChat();
  const { settings, update, reset } = useAssistantSettings();
  const { voices, speaking, speak, stop: stopSpeech } = useSpeechSynthesis();
  const { listening, transcript, error: micError, supported: micSupported, start: startListen, stop: stopListen, clearError: clearMicError } = useSpeechRecognition();

  const [input,        setInput]        = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [robotState,   setRobotState]   = useState<AssistantState>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  // Sync robot state
  useEffect(() => {
    let next: AssistantState;
    if (listening)                   next = 'listening';
    else if (speaking)               next = 'speaking';
    else if (chatState === 'thinking') next = 'thinking';
    else if (chatState === 'error')    next = 'error';
    else                               next = 'idle';
    setRobotState(next);
    onStateChange?.(next);
  }, [listening, speaking, chatState, onStateChange]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Sync transcript to input
  useEffect(() => {
    if (transcript) setInput(transcript);
  }, [transcript]);

  // Stop speech on close, clear mic error on open
  useEffect(() => {
    if (!open) stopSpeech();
    else clearMicError();
  }, [open, stopSpeech, clearMicError]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    stopSpeech(); // stop any current speech before sending
    setState('thinking');
    const reply = await sendMessage(text);
    if (reply && settings.soundEnabled) {
      setState('speaking');
      speak(reply.content, {
        voiceName: settings.selectedVoice,
        rate:  settings.speechRate,
        pitch: settings.speechPitch,
        onEnd: () => setState('idle'),
      });
    }
  }, [input, sendMessage, settings, speak, stopSpeech, setState]);

  const handleSpeak = useCallback((text: string) => {
    if (!settings.soundEnabled) return;
    if (speaking) { stopSpeech(); return; }
    speak(text, {
      voiceName: settings.selectedVoice,
      rate:  settings.speechRate,
      pitch: settings.speechPitch,
      onEnd: () => setState('idle'),
    });
    setState('speaking');
  }, [settings, speaking, speak, stopSpeech, setState]);

  const handleMic = useCallback(() => {
    if (!settings.voiceInputEnabled) return;
    if (listening) { stopListen(); return; }
    startListen(text => setInput(text));
  }, [listening, settings.voiceInputEnabled, startListen, stopListen]);

  const handleNavigate = useCallback((target: string) => {
    const el = document.getElementById(target);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); onClose(); }
  }, [onClose]);

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }, [handleSend]);

  return (
    <>
      <AssistantSettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdate={update}
        onReset={reset}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[8900] flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0" style={{ background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)' }} onClick={onClose}/>

            {/* Main panel */}
            <motion.div
              className="relative w-full sm:w-[820px] sm:max-w-[95vw] h-full sm:h-auto sm:max-h-[90vh] flex flex-col sm:flex-row overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(4,8,22,0.98), rgba(8,4,20,0.98))',
                border: '1px solid rgba(6,182,212,0.2)',
                borderRadius: '0px',
                boxShadow: '0 0 80px rgba(6,182,212,0.12), 0 0 160px rgba(168,85,247,0.06)',
              }}
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type:'spring', damping:28, stiffness:220 }}
              onClick={e => e.stopPropagation()}
            >
              {/* ── LEFT: Robot panel ────────────────────────── */}
              <div className="hidden sm:flex flex-col w-56 flex-shrink-0 border-r border-white/[0.05]">
                {/* Robot display */}
                <div className="flex-1 relative min-h-[260px]">
                  {settings.textOnlyMode ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-4xl">🤖</div>
                    </div>
                  ) : (
                    <RobotScene state={robotState} intensity={settings.animationIntensity}/>
                  )}
                  {/* State label */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                    <div className="px-2.5 py-1 rounded-full text-[9px] tracking-widest uppercase"
                      style={{
                        background:'rgba(6,8,22,0.8)',
                        border: `1px solid ${robotState === 'error' ? 'rgba(245,158,11,0.4)' : 'rgba(6,182,212,0.25)'}`,
                        color: robotState === 'error' ? '#f59e0b' : '#06b6d4',
                      }}>
                      {robotState}
                    </div>
                  </div>
                </div>
                {/* Visualizer */}
                <div className="px-4 py-3 border-t border-white/[0.05]">
                  <AudioVisualizer state={robotState}/>
                </div>
                {/* Sound toggle */}
                <div className="px-4 py-3 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-[9px] tracking-wider uppercase text-white/35">Sound</span>
                  <button type="button" onClick={() => update('soundEnabled', !settings.soundEnabled)}
                    aria-label={settings.soundEnabled ? 'Mute assistant' : 'Unmute assistant'}
                    className="text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d={settings.soundEnabled
                        ? "M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 6.253v13l-4-4H3V9h5l4-4z"
                        : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2"}/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* ── RIGHT: Chat panel ─────────────────────────── */}
              <div className="flex-1 flex flex-col min-h-0">
                {/* Chat header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] flex-shrink-0">
                  <div className="flex items-center gap-3">
                    {/* Mobile robot icon */}
                    <div className="sm:hidden w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background:'linear-gradient(135deg,rgba(6,182,212,0.2),rgba(168,85,247,0.2))', border:'1px solid rgba(6,182,212,0.3)' }}>
                      <span className="text-sm">🤖</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white" style={{ fontFamily:'Syne,sans-serif' }}>NEXUS</div>
                      <div className="flex items-center gap-1.5">
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400"
                          animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:1.5, repeat:Infinity }}/>
                        <span className="text-[9px] tracking-wider text-green-400/70 uppercase">
                          {chatState === 'thinking' ? 'Processing...' : chatState === 'error' ? 'Error' : 'Online'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Mobile sound toggle */}
                    <button type="button" onClick={() => update('soundEnabled', !settings.soundEnabled)}
                      className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d={settings.soundEnabled ? "M15.536 8.464a5 5 0 010 7.072M12 6.253v13l-4-4H3V9h5l4-4z" : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l-2-2m0 0l-2-2m2 2l-2-2m-2 2l-2 2"}/>
                      </svg>
                    </button>
                    {/* Clear */}
                    <button type="button" onClick={clearHistory} aria-label="Clear conversation"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {/* Settings */}
                    <button type="button" onClick={() => setSettingsOpen(true)} aria-label="Open settings"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {/* Close */}
                    <button type="button" onClick={onClose} aria-label="Close assistant"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0"
                  style={{ scrollBehavior:'smooth' }}>
                  {messages.map(m => (
                    <AssistantMessage
                      key={m.id}
                      message={m}
                      onSpeak={settings.soundEnabled ? handleSpeak : undefined}
                      onNavigate={handleNavigate}
                      isSpeaking={speaking}
                    />
                  ))}
                  {chatState === 'thinking' && (
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background:'linear-gradient(135deg,#0e7490,#7c3aed)', border:'1px solid rgba(6,182,212,0.4)' }}>
                        <span className="text-[9px] font-black text-white">N</span>
                      </div>
                      <div className="px-3 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
                        style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                        {[0,1,2].map(i => (
                          <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400/70"
                            animate={{ scale:[1,1.4,1], opacity:[0.5,1,0.5] }}
                            transition={{ duration:0.8, delay:i*0.15, repeat:Infinity }}/>
                        ))}
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="text-xs text-amber-400 px-3 py-2 rounded-lg"
                      style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.2)' }}>
                      {error}
                    </div>
                  )}
                  {micError && (
                    <div className="text-xs text-red-400 px-3 py-2 rounded-lg"
                      style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)' }}>
                      {micError}
                    </div>
                  )}
                </div>

                {/* Suggestions */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                    {SUGGESTIONS.map(s => (
                      <button key={s} type="button" onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 0); }}
                        className="px-2.5 py-1 text-[10px] tracking-wide rounded-full text-cyan-300/70 hover:text-cyan-300 transition-colors"
                        style={{ background:'rgba(6,182,212,0.07)', border:'1px solid rgba(6,182,212,0.2)' }}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input row */}
                <div className="px-4 py-3 border-t border-white/[0.05] flex-shrink-0">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={inputRef}
                      rows={1}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Ask NEXUS anything..."
                      aria-label="Message input"
                      className="flex-1 text-sm text-white/80 placeholder-white/20 resize-none outline-none bg-transparent py-2 max-h-32"
                      style={{ scrollbarWidth:'none' }}
                    />
                    {/* Mic button */}
                    {micSupported && settings.voiceInputEnabled && (
                      <button type="button" onClick={handleMic} aria-label={listening ? 'Stop listening' : 'Start voice input'}
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        style={{
                          background: listening ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${listening ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.1)'}`,
                          boxShadow: listening ? '0 0 12px rgba(6,182,212,0.3)' : 'none',
                        }}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"
                          style={{ color: listening ? '#06b6d4' : 'rgba(255,255,255,0.4)' }}>
                          <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z"/>
                          <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z"/>
                        </svg>
                      </button>
                    )}
                    {/* Send button */}
                    <button type="button" onClick={handleSend}
                      disabled={!input.trim() || chatState === 'thinking'}
                      aria-label="Send message"
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-30"
                      style={{ background: input.trim() ? 'linear-gradient(135deg,#0e7490,#7c3aed)' : 'rgba(255,255,255,0.05)',
                               border: '1px solid rgba(6,182,212,0.3)' }}>
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="text-[9px] text-white/15 mt-1">Press Enter to send · Shift+Enter for new line</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
