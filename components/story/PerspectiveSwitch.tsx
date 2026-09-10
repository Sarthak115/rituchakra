import { ArrowRight, ScanEye } from 'lucide-react';
import { useLanguage } from '@/lib/useLanguage';
export function PerspectiveSwitch({ onContinue }: { onContinue: () => void }) {
  const { t } = useLanguage();
  return <section className="perspective-panel" aria-labelledby="perspective-heading">
    <p>{t('Now see what happened from another perspective.')}</p>
    <div className="perspective-path"><span className="view-before">{t('Aara’s view')}</span><div className="perspective-pivot"><ScanEye size={30} strokeWidth={1.4}/><h2 id="perspective-heading">{t('SEE THEIR SIDE')}</h2></div><span className="view-after">{t('Aarav’s view')}</span></div>
    <p className="perspective-caption">{t('Same moment. A different experience.')}</p>
    <button className="continue-button" onClick={onContinue}>{t('Step into Aarav’s view')}<ArrowRight size={17}/></button>
  </section>;
}
