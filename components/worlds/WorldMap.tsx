'use client';
import { useLanguage } from '@/lib/useLanguage';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { CompanionPicker } from '@/components/characters/CompanionPicker';
import { IslandMap } from '@/components/worlds/IslandMap';
import { updateProgress, useProgress } from '@/lib/story/useProgress';
import { Flower2, Volume2, VolumeX } from 'lucide-react';

export function WorldMap() {
  const { t } = useLanguage();
  const { progress } = useProgress();
  return <main className={'world-map-map'}>
    <header className={'world-map-header'}><span className={'world-map-brand'}><Flower2 size={33} strokeWidth={1.5}/>RituChakra</span><span className="world-map-header-actions">
      <button type="button" className="sound-toggle" aria-pressed={!progress.muted} onClick={() => updateProgress(current => ({ ...current, muted: !current.muted }))} aria-label={t(progress.muted ? 'Sound off' : 'Sound on')} title={t(progress.muted ? 'Sound off' : 'Sound on')}>{progress.muted ? <VolumeX size={18}/> : <Volume2 size={18}/>}</button>
      <LanguageSelector/></span></header>
    <section className={'world-map-intro island-intro'}>
      <p className={'world-map-eyebrow'}>{t("RITUCHAKRA STORY WORLDS")}</p>
      <h1>{t("Change the story.")} <em>{t("Change the conversation.")}</em></h1>
      <p className={'world-map-description'}>{t('Pick who sails with you, then tap an island to start a story.')}</p>
    </section>
    <section className={'world-map-worlds'} aria-labelledby="worlds-heading">
      <h2 id="worlds-heading" className="sr-only">{t("Choose your story world")}</h2>
      <div className="island-stage"><CompanionPicker/><IslandMap/></div>
    </section>
    {/* RituReels is out of the current plan: unlinked here, while /ritureels and its data stay intact. */}
    <footer className={'world-map-footer'}><Flower2 size={19} strokeWidth={1.3}/><p>{t("Respect the person. Question the belief. Verify the fact.")}</p></footer>
  </main>;
}
