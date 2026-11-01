import { ArrowRight, ScanEye } from 'lucide-react';
import type { Companion } from '@/lib/story/types';
import { useLanguage } from '@/lib/useLanguage';
// `to` is the view we are switching into; Aarav-first stories switch the other way round.
export function PerspectiveSwitch({ onContinue, to = 'aarav' }: { onContinue: () => void; to?: Companion }) {
  const { t } = useLanguage();
  const [from, into] = to === 'aara' ? ['Aarav’s view', 'Aara’s view'] : ['Aara’s view', 'Aarav’s view'];
  return <section className="perspective-panel" aria-labelledby="perspective-heading">
    <p>{t('Now see what happened from another perspective.')}</p>
    <div className="perspective-path"><span className="view-before">{t(from)}</span><div className="perspective-pivot"><ScanEye size={30} strokeWidth={1.4}/><h2 id="perspective-heading">{t('SEE THEIR SIDE')}</h2></div><span className="view-after">{t(into)}</span></div>
    <p className="perspective-caption">{t('Same moment. A different experience.')}</p>
    <button className="continue-button" onClick={onContinue}>{t(to === 'aara' ? 'Step into Aara’s view' : 'Step into Aarav’s view')}<ArrowRight size={17}/></button>
  </section>;
}
