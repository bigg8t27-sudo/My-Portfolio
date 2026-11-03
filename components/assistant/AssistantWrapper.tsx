'use client';
import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AssistantLauncher } from './index';
import { useAssistantSettings } from './useAssistantSettings';
import { AssistantState } from './types';

// Lazy load the heavy assistant panel
const HumanoidAssistant = dynamic(() => import('./HumanoidAssistant'), { ssr: false });

interface AssistantWrapperProps {
  /** When true, programmatically opens the assistant (e.g. from gallery card) */
  forceOpen?: boolean;
  /** Called after forceOpen has been consumed so the parent can reset the flag */
  onForceOpenHandled?: () => void;
}

export default function AssistantWrapper({
  forceOpen = false,
  onForceOpenHandled,
}: AssistantWrapperProps) {
  const [open,       setOpen]       = useState(false);
  const [robotState, setRobotState] = useState<AssistantState>('idle');
  const { settings, update } = useAssistantSettings();

  const handleStateChange = useCallback((s: AssistantState) => setRobotState(s), []);

  // Consume the forceOpen signal once
  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
      onForceOpenHandled?.();
    }
  }, [forceOpen, onForceOpenHandled]);

  if (!settings.enabled) return null;

  return (
    <>
      <AssistantLauncher
        onClick={() => setOpen((v) => !v)}
        state={open ? robotState : 'idle'}
        isOpen={open}
        soundOn={settings.soundEnabled}
        onMute={() => update('soundEnabled', !settings.soundEnabled)}
      />
      {open && (
        <HumanoidAssistant
          open={open}
          onClose={() => setOpen(false)}
          onStateChange={handleStateChange}
        />
      )}
    </>
  );
}
