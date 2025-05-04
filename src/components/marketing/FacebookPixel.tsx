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
    console.log('FacebookPixel: PageView event triggered');
  } else {
    console.error('FacebookPixel: fbq not available when trying to track PageView');
  }
};

// Event to track specific actions
export const event = (name: string, options = {}) => {
  if (window.fbq) {
    window.fbq('track', name, options);
    console.log(`FacebookPixel: ${name} event triggered`, options);
  } else {
    console.error(`FacebookPixel: fbq not available when trying to track ${name}`);
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
    console.log('FacebookPixel: ViewContent event triggered for homepage');
  } else {
    console.error('FacebookPixel: fbq not available when trying to track ViewContent');
  }
};

// Facebook Pixel component (to be used in the head)
const FacebookPixel = () => {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    console.log('FacebookPixel: Component mounted, pixel ID:', pixelId);
    
    // Verificar o consentimento inicial
    const checkConsent = () => {
      const cookieConsent = localStorage.getItem('cookie-consent');
      console.log('FacebookPixel: Cookie consent value:', cookieConsent);
      setHasConsent(cookieConsent === 'all');
    };
    
    // Verificar agora
    checkConsent();
    
    // Adicionar listeners para atualizações de consentimento
    const handleConsentUpdated = () => {
      console.log('FacebookPixel: Consent updated event received');
      checkConsent();
    };
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        console.log('FacebookPixel: Storage change event for cookie-consent:', e.newValue);
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
  }, [pixelId]);

  useEffect(() => {
    if (typeof window === 'undefined' || !pixelId || !pathname || !hasConsent) {
      console.log('FacebookPixel: Not tracking due to:', {
        windowUndefined: typeof window === 'undefined',
        pixelIdMissing: !pixelId,
        pathnameMissing: !pathname,
        noConsent: !hasConsent
      });
      return;
    }
    
    console.log('FacebookPixel: Ready to track with consent and pixel ID');
    
    // Pequeno atraso para garantir que o script do Facebook está carregado
    setTimeout(() => {
      console.log('FacebookPixel: Triggering events after delay');
      pageview();
      
      // Track specific page views
      if (pathname === '/') {
        trackHomePageView();
      }
    }, 300);
  }, [pathname, pixelId, hasConsent]);

  // Não carregar o script se não tiver o ID do pixel ou se o usuário não aceitou cookies
  if (!pixelId || !hasConsent) {
    console.log('FacebookPixel: Script not loaded because:', {
      pixelIdMissing: !pixelId, 
      noConsent: !hasConsent
    });
    return null;
  }

  console.log('FacebookPixel: Loading script with pixel ID:', pixelId);

  return (
    <Script id="facebook-pixel" strategy="afterInteractive" onLoad={() => console.log('FacebookPixel: Script loaded successfully')} onError={() => console.error('FacebookPixel: Script failed to load')}>
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        console.log('FacebookPixel: Initializing with pixel ID: ${pixelId}');
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