'use client';
import { useState } from 'react';
import * as m from 'motion/react-m';
import { AnimatePresence } from 'motion/react';
import { Mic, ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '@/lib/useLanguage';

// Concept preview of the planned "say it your way" voice answer. It deliberately does NOT open the
// microphone or record anything: the real version needs consent, safety review and reviewed
// story paths first (see docs/VOICE_ANSWERS.md).
export function SpeakPreview() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const steps = ['Speak in Hindi, Odia or English.', 'RituChakra matches your answer to a reviewed story path.', 'The story continues from what you said.'];
  return <div className="speak-preview">
    <button type="button" className={`speak-button ${open ? 'is-open' : ''}`} onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="speak-preview-card">
      <span className="speak-mic" aria-hidden="true"><Mic size={20}/><i/><i/></span>
      <span><strong>{t('Tap to speak')}</strong><small>{t('Say it your way')}</small></span>
      <span className="speak-tag">{t('Preview')}</span>
    </button>
    <AnimatePresence>{open && <m.section id="speak-preview-card" className="speak-card" aria-label={t('Say it your way')} initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -6, height: 0 }} transition={{ duration: 0.3 }} onAnimationComplete={() => document.getElementById('speak-preview-card')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })}>
      <div className="speak-card-inner">
        <div className="speak-wave" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ animationDelay: `${i * 0.09}s` }}/>)}</div>
        <h3>{t('Coming soon: answer in your own words')}</h3>
        <ol>{steps.map(step => <li key={step}>{t(step)}</li>)}</ol>
        <p className="speak-safe"><ShieldCheck size={16}/>{t('This preview does not use the microphone. Nothing is recorded or stored.')}</p>
        <button type="button" className="speak-close" onClick={() => setOpen(false)}><X size={15}/>{t('Back to the choices')}</button>
      </div>
    </m.section>}</AnimatePresence>
  </div>;
}
