// assistant/types.ts
export type AssistantState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'error'
  | 'sleep';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isNav?: boolean;
  navTarget?: string;
}

export interface AssistantSettings {
  enabled:         boolean;
  soundEnabled:    boolean;
  autoSpeak:       boolean;
  soundEffects:    boolean;
  voiceInputEnabled: boolean;
  selectedVoice:   string;
  speechRate:      number;
  speechPitch:     number;
  reducedMotion:   boolean;
  textOnlyMode:    boolean;
  animationIntensity: number;
}

export const DEFAULT_SETTINGS: AssistantSettings = {
  enabled:          true,
  soundEnabled:     true,
  autoSpeak:        true,   // speak replies by default
  soundEffects:     false,
  voiceInputEnabled: true,
  selectedVoice:    '',
  speechRate:       1.0,
  speechPitch:      1.0,
  reducedMotion:    false,
  textOnlyMode:     false,
  animationIntensity: 1.0,
};
