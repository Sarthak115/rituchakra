import { StoryScene } from '@/components/story/StoryScene';
import { theLongJourney } from '@/data/stories/theLongJourney';
export const metadata = { title: 'The Long Journey · RituChakra' };
export default function NagarPage() { return <StoryScene storyData={theLongJourney}/>; }
