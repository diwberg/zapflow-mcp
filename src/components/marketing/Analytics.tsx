"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import GoogleAnalytics from './GoogleAnalytics';
import FacebookPixel, { FacebookPixelNoScript } from './FacebookPixel';
import GTM, { GTMNoScript } from './GTM';
import Clarity from './Clarity';

// Component to track route changes
const AnalyticsTracker = () => {
  const pathname = usePathname();
  
  useEffect(() => {
    // Verificar se o consentimento de cookies é "all"
    if (typeof window !== 'undefined') {
      const cookieConsent = localStorage.getItem('cookie-consent');
      
      if (cookieConsent === 'all' && pathname) {
        // Track page view
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_path: pathname,
          });
        }
        
        // Meta Pixel pageview
        if (window.fbq) {
          window.fbq('track', 'PageView');
        }
      }
    }
  }, [pathname]);
  
  return null;
};

// Main Analytics component that includes all tracking scripts
const Analytics = () => {
  const [hasConsent, setHasConsent] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar o consentimento inicial
      const checkConsent = () => {
        const cookieConsent = localStorage.getItem('cookie-consent');
        setHasConsent(cookieConsent === 'all');
      };
      
      // Verificar agora
      checkConsent();
      
      // Adicionar listener para o evento personalizado de consentimento
      const handleConsentUpdated = () => {
        checkConsent();
      };
      
      // Adicionar listener para mudanças no localStorage via outro tab/janela
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'cookie-consent') {
          checkConsent();
        }
      };
      
      // Adicionar listeners
      window.addEventListener('consentUpdated', handleConsentUpdated);
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('consentUpdated', handleConsentUpdated);
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);
  
  // Se não tiver consentimento, não carrega os scripts de analytics
  if (!hasConsent) return null;
  
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