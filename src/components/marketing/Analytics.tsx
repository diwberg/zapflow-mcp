"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import FacebookPixel, { FacebookPixelNoScript } from './FacebookPixel';
import GoogleAnalytics from './GoogleAnalytics';
import GTM, { GTMNoScript } from './GTM';
import Clarity from './Clarity';

// Utility function for tracking page views
const trackPageView = (url: string) => {
  // Track in Google Analytics via window.gtag if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_location: url,
      page_title: document.title
    });
  }
};

// Component to handle route change tracking
export const AnalyticsTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (pathname) {
      // Build the complete URL with query parameters
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // Track the page view
      trackPageView(url);
    }
  }, [pathname, searchParams]);
  
  return null;
};

// Main Analytics component that includes all tracking scripts
const Analytics = () => {
  return (
    <>
      {/* Head scripts */}
      <GoogleAnalytics />
      <GTM />
      <FacebookPixel />
      <Clarity />
      
      {/* Track route changes */}
      <AnalyticsTracker />
      
      {/* NoScript tags for body */}
      <FacebookPixelNoScript />
      <GTMNoScript />
    </>
  );
};

export default Analytics; 