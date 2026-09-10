import { Brain, Heart, MessageCircle, Sprout } from 'lucide-react';
export const skills = [
  { id: 'gyaan', name: 'Gyaan', meaning: 'Knowledge', icon: Brain },
  { id: 'samvaad', name: 'Samvaad', meaning: 'Communication', icon: MessageCircle },
  { id: 'saath', name: 'Saath', meaning: 'Empathy / Allyship', icon: Heart },
  { id: 'badlav', name: 'Badlav', meaning: 'Positive Behaviour', icon: Sprout },
] as const;
