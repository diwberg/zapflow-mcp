'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// Add fbq to the window object with proper typing
declare global {
  interface Window {
    fbq?: (command: string, event: string, params?: Record<string, unknown>) => void;
    _fbq?: Record<string, unknown>;
  }
}

// Event to track page views
export const pageview = () => {
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Event to track specific actions
export const event = (name: string, options = {}) => {
  if (window.fbq) {
    window.fbq('track', name, options);
  }
};

// Tracking ViewContent for homepage
export const trackHomePageView = () => {
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: 'Home Page',
      content_category: 'Landing Page',
      content_type: 'website'
    });
  }
};

// Facebook Pixel component (to be used in the head)
const FacebookPixel = () => {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Verificar o consentimento inicial
    const checkConsent = () => {
      const cookieConsent = localStorage.getItem('cookie-consent');
      setHasConsent(cookieConsent === 'all');
    };
    
    // Verificar agora
    checkConsent();
    
    // Adicionar listeners para atualizações de consentimento
    const handleConsentUpdated = () => {
      checkConsent();
    };
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        checkConsent();
      }
    };
    
    // Adicionar os listeners
    window.addEventListener('consentUpdated', handleConsentUpdated);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('consentUpdated', handleConsentUpdated);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !pixelId || !pathname || !hasConsent) return;
    
    // Pequeno atraso para garantir que o script do Facebook está carregado
    setTimeout(() => {
      pageview();
      
      // Track specific page views
      if (pathname === '/') {
        trackHomePageView();
      }
    }, 300);
  }, [pathname, pixelId, hasConsent]);

  // Não carregar o script se não tiver o ID do pixel ou se o usuário não aceitou cookies
  if (!pixelId || !hasConsent) {
    return null;
  }

  return (
    <Script id="facebook-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
};

// NoScript component (to be used in the body)
export const FacebookPixelNoScript = () => {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const [hasConsent, setHasConsent] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Verificar o consentimento inicial
    const checkConsent = () => {
      const cookieConsent = localStorage.getItem('cookie-consent');
      setHasConsent(cookieConsent === 'all');
    };
    
    // Verificar agora
    checkConsent();
    
    // Adicionar listeners para atualizações de consentimento
    const handleConsentUpdated = () => {
      checkConsent();
    };
    
    window.addEventListener('consentUpdated', handleConsentUpdated);
    
    return () => {
      window.removeEventListener('consentUpdated', handleConsentUpdated);
    };
  }, []);

  // Não mostrar se não tiver ID de pixel ou se o usuário não aceitou cookies
  if (!pixelId || !hasConsent) {
    return null;
  }

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
};

export default FacebookPixel; 