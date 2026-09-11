'use client';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '@/data/translations';

export type ReelSpeaker = 'dadi' | 'aara';
export type ReelAudioMap = Record<string, Partial<Record<Language, string>>>;
export const reelVoices = {
  en: { lang: 'en-IN', dadi: ['Veena', 'Heera', 'Neerja', 'Zira'], aara: ['Aditi', 'Ava', 'Aria', 'Jenny'] },
  hi: { lang: 'hi-IN', dadi: ['Swara', 'Kalpana'], aara: ['Aditi', 'Google हिन्दी'] },
  or: { lang: 'or-IN', dadi: ['Subhasini'], aara: ['Odia', 'Oriya'] },
};

export function useReelAudio({ beat, text, speaker, language, src, enabled, paused, muted, onEnd }: {
  beat: string; text: string; speaker: ReelSpeaker; language: Language; src?: string;
  enabled: boolean; paused: boolean; muted: boolean; onEnd: () => void;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'speaking' | 'paused' | 'error'>('idle');
  const [attempt, setAttempt] = useState(0);
  const media = useRef<HTMLAudioElement | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const controls = useRef({ paused, muted });
  controls.current = { paused, muted };
  const finish = useRef(onEnd); finish.current = onEnd;

  useEffect(() => {
    if (!enabled || !text) { setStatus('idle'); return; }
    let disposed = false;
    let started = false;
    let ended = false;
    let failed = false;
    let watchdog: ReturnType<typeof setTimeout>;
    let voiceWait: ReturnType<typeof setTimeout> | undefined;
    const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
    const fail = () => { if (!disposed && !ended && !failed) { failed = true; clearTimeout(watchdog); setStatus('error'); media.current?.pause(); if (utterance.current) synth?.cancel(); } };
    const done = () => { if (!disposed && !ended && !failed) { ended = true; clearTimeout(watchdog); setStatus('idle'); finish.current(); } };
    const began = () => { if (!disposed && !failed) { started = true; clearTimeout(watchdog); setStatus(controls.current.paused ? 'paused' : 'speaking'); } };
    setStatus('loading');
    watchdog = setTimeout(() => { if (!controls.current.paused) fail(); }, 8000);
    // Covers engines that never deliver end/error events. Paused playback does not time out.
    let activeMs = 0;
    const guard = setInterval(() => { if (!controls.current.paused) activeMs += 1000; if ((!started && activeMs > 8000) || activeMs > Math.max(45000, text.length * 350)) fail(); }, 1000);
    if (src) {
      const audio = new Audio(src);
      media.current = audio;
      audio.preload = 'auto'; audio.muted = controls.current.muted;
      audio.onplaying = began; audio.onended = done; audio.onerror = fail;
      if (!controls.current.paused) void audio.play().catch(fail);
      else { clearTimeout(watchdog); setStatus('paused'); }
    } else if (synth) {
      const speak = () => {
        if (disposed || failed || utterance.current) return;
        const config = reelVoices[language];
        const voices = synth.getVoices().filter(voice => {
          const code = voice.lang.toLowerCase().replace('_', '-').split('-')[0];
          return code === language || (language === 'or' && code === 'ory');
        });
        if (voices.length < 2) return;
        const rank = (voice: SpeechSynthesisVoice, who: ReelSpeaker) => {
          const preferred = config[who].findIndex(name => voice.name.toLowerCase().includes(name.toLowerCase()));
          return (preferred < 0 ? 100 : preferred) + (voice.lang.toLowerCase() === config.lang.toLowerCase() ? 0 : 20);
        };
        const dadi = [...voices].sort((a, b) => rank(a, 'dadi') - rank(b, 'dadi'))[0];
        const aara = voices.filter(v => v.voiceURI !== dadi.voiceURI).sort((a, b) => rank(a, 'aara') - rank(b, 'aara'))[0];
        if (!aara) return;
        clearTimeout(voiceWait);
        const speech = new SpeechSynthesisUtterance(text);
        speech.voice = speaker === 'dadi' ? dadi : aara;
        speech.lang = speech.voice.lang;
        speech.rate = 1; speech.pitch = 1; speech.volume = controls.current.muted ? 0 : 1;
        speech.onstart = began; speech.onend = done;
        speech.onerror = () => { if (!disposed) fail(); };
        utterance.current = speech;
        synth.speak(speech);
        if (controls.current.paused) synth.pause();
      };
      synth.addEventListener('voiceschanged', speak);
      speak();
      voiceWait = setTimeout(() => { if (!utterance.current) fail(); }, 2500);
      return () => {
        disposed = true; clearTimeout(watchdog); clearTimeout(voiceWait); clearInterval(guard);
        synth.removeEventListener('voiceschanged', speak);
        utterance.current = null; synth.cancel();
      };
    } else fail();
    return () => {
      disposed = true; clearTimeout(watchdog); clearInterval(guard);
      if (media.current) { media.current.pause(); media.current.removeAttribute('src'); media.current.load(); media.current = null; }
    };
  }, [beat, text, speaker, language, src, enabled, attempt]);

  useEffect(() => {
    if (!enabled) return;
    const audio = media.current;
    if (audio) {
      audio.muted = muted;
      if (paused) { audio.pause(); setStatus(current => current === 'error' ? current : 'paused'); }
      else if (status !== 'error') void audio.play().catch(() => setStatus('error'));
    } else if (utterance.current && 'speechSynthesis' in window) {
      // Volume changes are not consistently applied mid-utterance by browsers.
      if (utterance.current.volume !== (muted ? 0 : 1)) { setAttempt(value => value + 1); return; }
      if (paused) { window.speechSynthesis.pause(); setStatus(current => current === 'error' ? current : 'paused'); }
      else { window.speechSynthesis.resume(); setStatus(current => current === 'paused' ? 'speaking' : current); }
    }
  }, [paused, muted, enabled]);

  return { status, speaking: status === 'speaking' && !paused && !muted, retry: () => setAttempt(value => value + 1) };
}
