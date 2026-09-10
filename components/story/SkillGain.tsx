import { useLanguage } from '@/lib/useLanguage';
import { skills } from '@/data/skills';
import type { SkillValues } from '@/lib/story/types';
export function SkillGain({ gains }: { gains: SkillValues }) {
  const { t } = useLanguage();
  return <div className="skill-gain-region" role="status" aria-live="polite" aria-atomic="true">{skills.filter(skill => gains[skill.id] > 0).map(({ id, name, icon: Icon }) => <span className="skill-gain" key={id}><Icon size={15}/>+{gains[id]} {t(name)}</span>)}</div>;
}
