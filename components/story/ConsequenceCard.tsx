import { ArrowRight, Footprints } from 'lucide-react';
import * as m from 'motion/react-m';
import type { Choice } from '@/lib/story/types';
import { useLanguage } from '@/lib/useLanguage';
// Shown right after a decision: what the learner chose and what it led to, without judging them.
export function ConsequenceCard({ choice, onContinue }: { choice: Choice; onContinue: () => void }) {
  const { t } = useLanguage();
  return <m.section className="consequence-card" aria-labelledby="consequence-heading" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
    <span className="eyebrow"><Footprints size={14}/>{t('What happened next')}</span>
    <p className="consequence-choice">{t('You chose')}: <strong>“{choice.text}”</strong></p>
    <h2 id="consequence-heading">{choice.consequence}</h2>
    <button className="continue-button" onClick={onContinue}>{t('See what happens')}<ArrowRight size={17}/></button>
  </m.section>;
}
