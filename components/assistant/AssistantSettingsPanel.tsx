'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AssistantSettings } from './types';
import { useSpeechSynthesis } from './useSpeechSynthesis';

interface AssistantSettingsPanelProps {
  open:     boolean;
  onClose:  () => void;
  settings: AssistantSettings;
  onUpdate: <K extends keyof AssistantSettings>(k: K, v: AssistantSettings[K]) => void;
  onReset:  () => void;
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        style={{ background: checked ? 'rgba(6,182,212,0.8)' : 'rgba(255,255,255,0.1)' }}
      >
        <span
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow"
          style={{ transform: checked ? 'translateX(17px)' : 'translateX(2px)' }}
        />
      </button>
    </label>
  );
}

function Slider({ value, min, max, step, onChange, label, display }:
  { value: number; min: number; max: number; step: number; onChange: (v: number) => void; label: string; display: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/60">{label}</span>
        <span className="text-xs text-cyan-400 font-mono">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#06b6d4' }}/>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="text-[9px] tracking-[0.25em] uppercase text-cyan-400/70 mb-3 flex items-center gap-2">
        <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,rgba(6,182,212,0.4),transparent)' }}/>
        {title}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export default function AssistantSettingsPanel({ open, onClose, settings, onUpdate, onReset }: AssistantSettingsPanelProps) {
  const [confirmReset, setConfirmReset] = useState(false);
  const { voices, speak, supported: ttsSupported } = useSpeechSynthesis();

  const testVoice = () => {
    speak("Hello! I'm NEXUS, Alfred's AI assistant. How does this voice sound?", {
      voiceName: settings.selectedVoice,
      rate:  settings.speechRate,
      pitch: settings.speechPitch,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[8990]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[8991] w-80 flex flex-col overflow-hidden"
            style={{
              background: 'rgba(6,8,20,0.97)',
              borderLeft: '1px solid rgba(6,182,212,0.2)',
              boxShadow: '-8px 0 40px rgba(0,0,0,0.5)',
            }}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div>
                <div className="text-sm font-bold text-white" style={{ fontFamily:'Syne,sans-serif' }}>Settings</div>
                <div className="text-[9px] tracking-widest uppercase text-cyan-400/60">NEXUS Configuration</div>
              </div>
              <button type="button" onClick={onClose} aria-label="Close settings"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">

              <Section title="General">
                <Toggle label="Assistant Enabled"       checked={settings.enabled}       onChange={v => onUpdate('enabled', v)}/>
                <Toggle label="Auto-speak Responses"    checked={settings.autoSpeak}     onChange={v => onUpdate('autoSpeak', v)}/>
                <Toggle label="Sound Effects"           checked={settings.soundEffects}  onChange={v => onUpdate('soundEffects', v)}/>
              </Section>

              <Section title="Voice">
                <Toggle label="Master Sound" checked={settings.soundEnabled} onChange={v => onUpdate('soundEnabled', v)}/>
                {ttsSupported && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs text-white/60">Voice</span>
                      <select
                        value={settings.selectedVoice}
                        onChange={e => onUpdate('selectedVoice', e.target.value)}
                        className="w-full text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.75)' }}
                      >
                        <option value="">Default</option>
                        {voices.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
                      </select>
                    </div>
                    <Slider label="Speed" value={settings.speechRate}  min={0.5} max={2}   step={0.1} display={`${settings.speechRate.toFixed(1)}x`}  onChange={v => onUpdate('speechRate', v)}/>
                    <Slider label="Pitch" value={settings.speechPitch} min={0.5} max={2}   step={0.1} display={`${settings.speechPitch.toFixed(1)}`}    onChange={v => onUpdate('speechPitch', v)}/>
                    <button type="button" onClick={testVoice}
                      className="w-full py-2 rounded-lg text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-400/10"
                      style={{ border:'1px solid rgba(6,182,212,0.3)' }}>
                      Test Voice
                    </button>
                  </>
                )}
              </Section>

              <Section title="Appearance">
                <Slider label="Animation Intensity" value={settings.animationIntensity} min={0} max={1} step={0.1}
                  display={`${Math.round(settings.animationIntensity * 100)}%`} onChange={v => onUpdate('animationIntensity', v)}/>
                <Toggle label="Reduced Motion"  checked={settings.reducedMotion} onChange={v => onUpdate('reducedMotion', v)}/>
                <Toggle label="Text-only Mode"  checked={settings.textOnlyMode}  onChange={v => onUpdate('textOnlyMode', v)}/>
              </Section>

              <Section title="Privacy">
                <div className="text-[10px] text-white/35 leading-relaxed">
                  Voice input uses your browser's built-in speech recognition. No audio is stored or transmitted to third parties.
                </div>
                <Toggle label="Voice Input Enabled" checked={settings.voiceInputEnabled} onChange={v => onUpdate('voiceInputEnabled', v)}/>
              </Section>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-white/[0.06]">
              {confirmReset ? (
                <div className="flex gap-2">
                  <button type="button" onClick={() => { onReset(); setConfirmReset(false); }}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold text-red-400"
                    style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)' }}>
                    Confirm Reset
                  </button>
                  <button type="button" onClick={() => setConfirmReset(false)}
                    className="flex-1 py-2 rounded-lg text-xs text-white/60"
                    style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)' }}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => setConfirmReset(true)}
                  className="w-full py-2 rounded-lg text-xs text-white/40 hover:text-white/70 transition-colors"
                  style={{ border:'1px solid rgba(255,255,255,0.08)' }}>
                  Reset All Settings
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
