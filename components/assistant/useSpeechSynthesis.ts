'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

export function useSpeechSynthesis() {
  const [voices,   setVoices]   = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSupported('speechSynthesis' in window);
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const speak = useCallback((text: string, opts: {
    voiceName?: string;
    rate?:  number;
    pitch?: number;
    onEnd?: () => void;
  } = {}) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    if (opts.voiceName) {
      const v = voices.find(v => v.name === opts.voiceName);
      if (v) utt.voice = v;
    }
    utt.rate  = opts.rate  ?? 1.0;
    utt.pitch = opts.pitch ?? 1.0;
    utt.onstart = () => setSpeaking(true);
    utt.onend   = () => { setSpeaking(false); opts.onEnd?.(); };
    utt.onerror = () => setSpeaking(false);
    utterRef.current = utt;
    window.speechSynthesis.speak(utt);
  }, [supported, voices]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return { voices, speaking, supported, speak, stop };
}
