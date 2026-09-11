'use client';
import { ArrowLeft, ArrowRight, Clapperboard, CookingPot, Flower2, Landmark } from 'lucide-react';
import { rituReels } from '@/data/reels/rituReels';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { WorldProgress } from '@/components/worlds/WorldProgress';
import { Character } from '@/components/characters/Character';
import { useLanguage } from '@/lib/useLanguage';

// Temporary presentation filter; the kitchen reel and its route remain intact.
const visibleReels = rituReels.filter(reel => reel.slug === 'dadi-ka-mandir');

export function ReelLibrary() {
  const { t } = useLanguage();
  return <main className="reels-library">
    <header className="site-header"><a href="/" className="brand"><Flower2 strokeWidth={1.5}/><span>RituChakra</span></a><LanguageSelector/></header>
    <div className="reels-library-content"><a className="reels-back" href="/"><ArrowLeft size={16}/>{t('Back to Story World')}</a>
      <div className="reels-intro"><p className="eyebrow"><Clapperboard size={17}/>{t('RituReels')}</p><h1>{t('Dadi Se Baat')}</h1><p>{t('Short stories. Real beliefs. Better conversations.')}</p><span className="reels-loop">{t('Watch → Think → Choose')}</span></div>
      <div className="reels-library-grid">{visibleReels.map((reel, i) => {
        const Icon = reel.theme === 'kitchen' ? CookingPot : Landmark;
        return <a className={`reel-tile reel-tile-${reel.theme}`} href={`/ritureels/${reel.slug}`} key={reel.id}>
          <div className="reel-tile-art" aria-hidden="true"><span className="reel-tile-number">0{i + 1}</span><Icon className="reel-setting-icon" size={64} strokeWidth={1}/><div className="reel-tile-dadi"><Character character="dadi" expression="happy" animation="idle"/></div><div className="reel-tile-aara"><Character character="aara" expression="thinking" animation="idle"/></div><span className="reel-play-disc"><ArrowRight size={24}/></span></div>
          <div className="reel-tile-copy"><span className="eyebrow">{t('About 40 seconds')}</span><h2>{t(reel.title)}</h2><p>{t(reel.theme === 'kitchen' ? 'An inherited rule meets a curious question.' : 'Medical facts. Different family traditions.')}</p><WorldProgress storyId={reel.id}/></div>
        </a>;
      })}</div>
      <p className="reels-library-note">{t('Dadi and Aara guide every reel. Your selected learner and journey stay with you.')}</p>
    </div>
  </main>;
}
