import { ReelPlayer } from '@/components/reels/ReelPlayer';
import { templeReel } from '@/data/reels/rituReels';
export const metadata = { title: 'Dadi Ka Mandir · RituReels' };
export default function TempleReelPage() { return <ReelPlayer reel={templeReel}/>; }
