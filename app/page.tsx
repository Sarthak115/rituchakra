import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Building2, Flower2, House, LockKeyhole, School, Store, Trees, Microscope, ShoppingBasket, ScanEye, Brain, ChartNoAxesCombined, Globe } from 'lucide-react';


export const metadata: Metadata = {
  title: 'RituChakra — Story Worlds',
  description: 'An interactive journey through real-life menstrual-health conversations.',
};

const worlds = [
  { name: 'Ghar', theme: 'Family & Traditions', icon: House, color: 'ghar', available: true },
  { name: 'Vidyalaya', theme: 'School & Adolescence', icon: School, color: 'school' },
  { name: 'Bazaar', theme: 'Products & Choices', icon: Store, color: 'bazaar' },
  { name: 'Nagar', theme: 'Modern Life', icon: Building2, color: 'nagar' },
  { name: 'Sakhi Sabha', theme: 'Allyship & Community', icon: Trees, color: 'sakhi' },
];

const previews = [
  { name: 'Science Check', description: 'Turn beliefs into evidence-backed understanding.', icon: Microscope },
  { name: 'Myth Mandi', description: 'Examine. Question. Verify.', detail: 'An upcoming interactive myth-exploration space.', icon: ShoppingBasket },
  { name: 'Perspective Switch', description: "See the same story from another person's side.", icon: ScanEye },
  { name: 'Adaptive Journey', description: 'Your choices shape what story comes next.', icon: Brain },
  { name: 'Impact Dashboard', description: 'See how your knowledge, confidence and allyship change.', icon: ChartNoAxesCombined },
  { name: 'Regional Story Packs', description: 'Stories designed for different languages and cultural contexts.', detail: 'English • Hindi • Odia', icon: Globe },
];

export default function Home() {
  return <main className={'world-map-map'}>
    <header className={'world-map-header'}><span className={'world-map-brand'}><Flower2 size={33} strokeWidth={1.5}/>RituChakra</span><span className={'world-map-headerNote'}><BookOpen size={16}/> Stories that open conversations</span></header>
    <section className={'world-map-intro'}>
      <p className={'world-map-eyebrow'}>RITUCHAKRA STORY WORLDS</p>
      <h1>Change the story.<br/><em>Change the conversation.</em></h1>
      <p className={'world-map-description'}>An interactive journey through real-life menstrual-health conversations.</p>
    </section>
    <section className={'world-map-worlds'} aria-labelledby="worlds-heading">
      <div className={'world-map-sectionHeading'}><span aria-hidden="true"/><h2 id="worlds-heading">Choose your story world</h2><span aria-hidden="true"/></div>
      <div className={'world-map-grid'}>{worlds.map(({ name, theme, icon: Icon, color, available }, index) => {
        const content = <><div className={`${'world-map-illustration'} ${`world-map-${color}`}`}><span className={'world-map-worldNumber'}>0{index + 1}</span><Icon size={61} strokeWidth={1.15}/><span className={'world-map-ground'} aria-hidden="true"/></div><div className={'world-map-cardBody'}><h3>{name}</h3><p>{theme}</p><span className={available ? 'world-map-available' : 'world-map-upcoming'}>{available ? <>Available <ArrowRight size={15}/></> : <><LockKeyhole size={12}/>Coming soon</>}</span></div></>;
        return available ? <a key={name} href="/ghar" className={`${'world-map-card'} ${'world-map-active'}`} aria-label="Ghar — Family & Traditions — Available. Open Dadi Ki Rasoi.">{content}</a> : <article key={name} className={'world-map-card'} aria-label={`${name} — ${theme} — Coming soon`}>{content}</article>;
      })}</div>
      <p className={'world-map-invitation'}>Your first story begins at home. Step into <strong>Dadi Ki Rasoi.</strong></p>
    </section>
    <section className="world-map-overview" aria-labelledby="experience-heading">
      <div className="world-map-sectionHeading"><span aria-hidden="true"/><h2 id="experience-heading">Explore the RituChakra Experience</h2><span aria-hidden="true"/></div>
      <p className="world-map-preview-note">Coming in the full RituChakra journey</p>
      <p className="world-map-preview-context">A glimpse of the journey ahead. Ghar’s <strong>Dadi Ki Rasoi</strong> is the currently playable experience.</p>
      <div className="world-map-preview-grid">{previews.map(({ name, description, detail, icon: Icon }) => <article className="world-map-preview-card" key={name}>
        <span className="world-map-preview-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.5}/></span>
        <div><h3>{name}</h3><p>{description}</p>{detail && <small>{detail}</small>}</div>
      </article>)}</div>
    </section>
    <footer className={'world-map-footer'}><Flower2 size={19} strokeWidth={1.3}/><p>Respect the person. Question the belief. Verify the fact.</p></footer>
  </main>;
}

