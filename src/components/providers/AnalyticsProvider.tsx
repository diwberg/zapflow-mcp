'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import analytics from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  // Garantir que analytics só seja inicializado no cliente após a hidratação
  useEffect(() => {
    // Aguardar a próxima tick para garantir que a hidratação esteja completa
    const timer = setTimeout(() => {
      setIsMounted(true);
      analytics.init();
      console.log('Analytics initialized after hydration');
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Track page views - só executa depois que o componente estiver montado
  useEffect(() => {
    // Não rastrear durante o carregamento inicial ou antes da montagem
    if (!pathname || !isMounted) return;

    // Construir o URL com parâmetros de busca
    const url = searchParams?.size
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    // Rastrear view de página
    analytics.pageView(url);

    // Lidar com eventos específicos de página
    if (pathname === '/') {
      analytics.homePage();
    } else if (pathname === '/precos') {
      analytics.pricingPage();
    }
  }, [pathname, searchParams, isMounted]);

  return children;
} 