import { StoryScene } from '@/components/story/StoryScene';
import { theJoke } from '@/data/stories/theJoke';
export const metadata = { title: 'The Joke · RituChakra' };
export default function SakhiSabhaPage() { return <StoryScene storyData={theJoke}/>; }
