import { StoryScene } from '@/components/story/StoryScene';
import { chooseWhatFits } from '@/data/stories/chooseWhatFits';
export const metadata = { title: 'Choose What Fits · RituChakra' };
export default function BazaarPage() { return <StoryScene storyData={chooseWhatFits}/>; }
