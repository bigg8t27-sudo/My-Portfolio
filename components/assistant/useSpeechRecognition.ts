'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

export function useSpeechRecognition() {
  const [listening,  setListening]  = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error,      setError]      = useState<string | null>(null);
  const [supported,  setSupported]  = useState(false);
  const recRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SR = (window as Record<string,any>).SpeechRecognition || (window as Record<string,any>).webkitSpeechRecognition;
    setSupported(!!SR);
  }, []);

  const start = useCallback((onResult: (text: string) => void) => {
    if (typeof window === 'undefined') return;
    const SR = (window as Record<string,any>).SpeechRecognition || (window as Record<string,any>).webkitSpeechRecognition;
    if (!SR) { setError('Speech recognition not supported in this browser.'); return; }

    setError(null);
    setTranscript('');

    const rec = new SR();
    rec.lang           = 'en-US';
    rec.continuous     = false;
    rec.interimResults = true;

    rec.onstart = () => setListening(true);

    rec.onresult = (e: any) => {
      const text = Array.from(e.results as any[])
        .map((r: any) => r[0].transcript)
        .join('');
      setTranscript(text);
      if (e.results[e.results.length - 1].isFinal) onResult(text);
    };

    rec.onerror = (e: any) => {
      setListening(false);
      if (e.error === 'not-allowed') setError('Microphone permission denied.');
      else if (e.error === 'no-speech') setError('No speech detected. Try again.');
      else setError('Speech recognition error.');
    };

    rec.onend = () => setListening(false);

    try { rec.start(); recRef.current = rec; }
    catch { setError('Could not start speech recognition.'); }
  }, []);

  const stop = useCallback(() => {
    recRef.current?.stop();
    setListening(false);
  }, []);

  return { listening, transcript, error, supported, start, stop };
}
