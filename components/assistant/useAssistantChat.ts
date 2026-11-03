'use client';
import { useState, useCallback, useRef } from 'react';
import { Message, AssistantState } from './types';

const WELCOME: Message = {
  id:        'welcome',
  role:      'assistant',
  content:   "System online. Welcome to Senior Dev's digital workspace. I'm NEXUS, your AI guide. Ask me about Alfred's projects, technologies, and the ideas behind the work.",
  timestamp: Date.now(),
};

export function useAssistantChat() {
  const [messages,  setMessages]  = useState<Message[]>([WELCOME]);
  const [state,     setState]     = useState<AssistantState>('idle');
  const [error,     setError]     = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || state === 'thinking') return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: content.trim(), timestamp: Date.now() };
    setMessages(m => [...m, userMsg]);
    setState('thinking');
    setError(null);

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/assistant/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        signal:  abortRef.current.signal,
        body: JSON.stringify({
          message:        content.trim(),
          conversationId: 'session',
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const reply = data.reply ?? "I couldn't process that. Please try again.";

      const assistantMsg: Message = {
        id:        (Date.now() + 1).toString(),
        role:      'assistant',
        content:   reply,
        timestamp: Date.now(),
      };
      setMessages(m => [...m, assistantMsg]);
      setState('idle');
      return assistantMsg;

    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      setError('Connection error. Please try again.');
      setState('error');
      setMessages(m => [...m, {
        id:        (Date.now() + 1).toString(),
        role:      'assistant',
        content:   'I had trouble connecting. Please try again.',
        timestamp: Date.now(),
      }]);
    }
  }, [state, messages]);

  const clearHistory = useCallback(() => {
    setMessages([WELCOME]);
    setState('idle');
    setError(null);
  }, []);

  return { messages, state, error, setState, sendMessage, clearHistory };
}
