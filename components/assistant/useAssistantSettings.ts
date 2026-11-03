'use client';
import { useState, useEffect, useCallback } from 'react';
import { AssistantSettings, DEFAULT_SETTINGS } from './types';

const STORAGE_KEY = 'nexus-assistant-settings';

export function useAssistantSettings() {
  const [settings, setSettings] = useState<AssistantSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<AssistantSettings>;
        setSettings(s => ({ ...s, ...saved }));
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  const update = useCallback(<K extends keyof AssistantSettings>(key: K, value: AssistantSettings[K]) => {
    setSettings(s => {
      const next = { ...s, [key]: value };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  return { settings, update, reset, loaded };
}
