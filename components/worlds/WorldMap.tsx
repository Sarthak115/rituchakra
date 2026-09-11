'use client';
import { useLanguage } from '@/lib/useLanguage';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { WorldProgress } from '@/components/worlds/WorldProgress';
import { CompanionPicker } from '@/components/characters/CompanionPicker';
import { ArrowRight, BookOpen, Building2, Clapperboard, Flower2, House, LockKeyhole, School, Store, Trees } from 'lucide-react';



const worlds = [
  { name: 'Ghar', theme: 'Family & Traditions', icon: House, color: 'ghar', available: true, path: '/ghar', storyId: 'ghar-dadi-rasoi' },
  { name: 'Vidyalaya', theme: 'School & Adolescence', icon: School, color: 'school', available: true, path: '/vidyalaya', storyId: 'vidyalaya-the-stain' },
  { name: 'Bazaar', theme: 'Products & Choices', icon: Store, color: 'bazaar', available: true, path: '/bazaar', storyId: 'bazaar-choose-what-fits' },
  { name: 'Sakhi Sabha', theme: 'Allyship & Community', icon: Trees, color: 'sakhi', available: true, path: '/sakhi-sabha', storyId: 'sakhi-sabha-the-joke' },
  { name: 'Nagar', theme: 'Modern Life', icon: Building2, color: 'nagar' },
];

export function WorldMap() {
  const { t } = useLanguage();
  return <main className={'world-map-map'}>
    <header className={'world-map-header'}><span className={'world-map-brand'}><Flower2 size={33} strokeWidth={1.5}/>RituChakra</span><span className={'world-map-headerNote'}><BookOpen size={16}/> {t('Stories that open conversations')}</span><LanguageSelector/></header>
    <section className={'world-map-intro'}>
      <p className={'world-map-eyebrow'}>{t("RITUCHAKRA STORY WORLDS")}</p>
      <h1>{t("Change the story.")}<br/><em>{t("Change the conversation.")}</em></h1>
      <p className={'world-map-description'}>{t("An interactive journey through real-life menstrual-health conversations.")}</p>
    </section>
    <section className={'world-map-worlds'} aria-labelledby="worlds-heading">
      <div className={'world-map-sectionHeading'}><span aria-hidden="true"/><h2 id="worlds-heading">{t("Choose your story world")}</h2><span aria-hidden="true"/></div>
      <CompanionPicker/><div className={'world-map-grid'}>{worlds.map(({ name, theme, icon: Icon, color, available, path, storyId }, index) => {
        const content = <><div className={`${'world-map-illustration'} ${`world-map-${color}`}`}><span className={'world-map-worldNumber'}>0{index + 1}</span><Icon size={61} strokeWidth={1.15}/><span className={'world-map-ground'} aria-hidden="true"/></div><div className={'world-map-cardBody'}><h3>{t(name)}</h3><p>{t(theme)}</p>{available ? <WorldProgress storyId={storyId!}/> : <span className="world-map-upcoming"><LockKeyhole size={12}/>{t('Coming soon')}</span>}</div></>;
        return available ? <a key={name} href={path} className={`${'world-map-card'} ${'world-map-active'}`}>{content}</a> : <article key={name} className={'world-map-card'} aria-label={`${t(name)} — ${t(theme)} — ${t('Coming soon')}`}>{content}</article>;
      })}</div>
      <p className={'world-map-invitation'}>{t("Your first story begins at home. Step into")} <strong>{t('Dadi Ki Rasoi')}.</strong></p>
    </section>
    <a href="/ritureels" className="world-map-reels">
      <span className="world-map-reels-icon" aria-hidden="true"><Clapperboard size={34} strokeWidth={1.4}/></span>
      <div><span className="eyebrow">{t('RituReels')}</span><h2>{t('Dadi Se Baat')}</h2><p>{t('Short stories. Real beliefs. Better conversations.')}</p><small>{t('Dadi Ka Mandir')}</small></div>
      <span className="world-map-reels-action">{t('Watch RituReels')}<ArrowRight size={19}/></span>
    </a>
    <footer className={'world-map-footer'}><Flower2 size={19} strokeWidth={1.3}/><p>{t("Respect the person. Question the belief. Verify the fact.")}</p></footer>
  </main>;
}


