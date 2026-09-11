import { ReelPlayer } from '@/components/reels/ReelPlayer';
import { kitchenReel } from '@/data/reels/rituReels';
export const metadata = { title: 'Dadi Ki Rasoi · RituReels' };
export default function KitchenReelPage() { return <ReelPlayer reel={kitchenReel}/>; }
