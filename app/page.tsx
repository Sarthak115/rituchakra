import { WorldMap } from '@/components/worlds/WorldMap';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'RituChakra — Story Worlds', description: 'An interactive journey through real-life menstrual-health conversations.' };
export default function Home() { return <WorldMap/>; }
