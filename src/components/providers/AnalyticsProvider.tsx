'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import analytics from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics once on mount
  useEffect(() => {
    analytics.init();
  }, []);

  // Track page views
  useEffect(() => {
    // Don't track during initial load
    if (!pathname) return;

    // Construct the URL path including search parameters
    const url = searchParams?.size
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    // Track page view
    analytics.pageView(url);

    // Handle specific page events
    if (pathname === '/') {
      analytics.homePage();
    } else if (pathname === '/precos') {
      analytics.pricingPage();
    }
  }, [pathname, searchParams]);

  return children;
} 