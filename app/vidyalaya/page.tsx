import { StoryScene } from '@/components/story/StoryScene';
import { theStain } from '@/data/stories/theStain';
export const metadata = { title: 'The Stain · RituChakra' };
export default function Vidyalaya() { return <StoryScene storyData={theStain}/>; }
