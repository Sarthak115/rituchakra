'use client';
import { useEffect, type ReactNode } from 'react';
import { useLanguage } from '@/lib/useLanguage';
export function LanguageBoundary({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return children;
}
