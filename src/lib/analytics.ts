// Analytics service for ZapFlow
// Handles Google Analytics, Meta Pixel and Google Tag Manager

// Types
type EventParams = {
  [key: string]: string | number | boolean | undefined;
};

// Define window global types with proper typing
declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    fbq?: (command: string, event: string, params?: Record<string, unknown>) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

// Environment variable validation with fallbacks
const getEnvVar = (key: string): string => {
  const value = process.env[`NEXT_PUBLIC_${key}`];
  return value || '';
};

// Server-side environment variable (for Meta Pixel Token)
const getServerEnvVar = (key: string): string => {
  const value = process.env[key];
  return value || '';
};

// Feature flags
const isAnalyticsEnabled = getEnvVar('ANALYTICS_ENABLED') === 'true';
const isGAEnabled = isAnalyticsEnabled && getEnvVar('GA_ENABLED') === 'true';
const isMetaEnabled = isAnalyticsEnabled && getEnvVar('META_ENABLED') === 'true';
const isGTMEnabled = isAnalyticsEnabled && getEnvVar('GTM_ENABLED') === 'true';

// IDs and Tokens
const GA_ID = getEnvVar('GA_MEASUREMENT_ID');
const META_PIXEL_ID = getEnvVar('NEXT_PUBLIC_META_PIXEL_ID');
const META_PIXEL_TOKEN = getServerEnvVar('META_PIXEL_TOKEN');
const GTM_ID = getEnvVar('GTM_ID');

// Google Analytics
const initGA = (): void => {
  if (!isGAEnabled || !GA_ID) return;
  
  // Prevent duplicate initialization
  if (window.gtag) return;
  
  try {
    // Add Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script1);
    
    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { send_page_view: false });
    `;
    document.head.appendChild(script2);
  } catch (error) {
    console.error('Error initializing GA:', error);
  }
};

// Meta Pixel
const initMeta = (): void => {
  if (!isMetaEnabled || !META_PIXEL_ID) return;
  
  // Prevent duplicate initialization
  if (window.fbq) return;
  
  try {
    // Add Meta Pixel script with token if available
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${META_PIXEL_ID}'${META_PIXEL_TOKEN ? `, {
        external_id: '${META_PIXEL_TOKEN}'
      }` : ''});
    `;
    document.head.appendChild(script);
    
    // Add noscript pixel for browsers with JavaScript disabled
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <img height="1" width="1" style="display:none" 
        src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"
      />
    `;
    document.body.appendChild(noscript);
  } catch (error) {
    console.error('Error initializing Meta Pixel:', error);
  }
};

// Google Tag Manager
const initGTM = (): void => {
  if (!isGTMEnabled || !GTM_ID) return;
  
  // Prevent duplicate initialization
  if (window.dataLayer) return;
  
  try {
    // Add GTM script
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(script);
    
    // Add GTM noscript frame
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    
    // Add it at the start of the body
    if (document.body.firstChild) {
      document.body.insertBefore(noscript, document.body.firstChild);
    } else {
      document.body.appendChild(noscript);
    }
  } catch (error) {
    console.error('Error initializing GTM:', error);
  }
};

// Initialize all analytics
export const initAnalytics = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    initGA();
    initMeta();
    initGTM();
  } catch (error) {
    console.error('Analytics initialization error:', error);
  }
};

// Track page view
export const trackPageView = (url: string, title: string = ''): void => {
  if (typeof window === 'undefined' || !isAnalyticsEnabled) return;
  
  try {
    // Google Analytics
    if (isGAEnabled && window.gtag) {
      window.gtag('event', 'page_view', {
        page_location: url,
        page_title: title || document.title
      });
    }
    
    // Meta Pixel
    if (isMetaEnabled && window.fbq) {
      window.fbq('track', 'PageView', {
        page_path: url,
        page_title: title || document.title
      });
    }
  } catch (error) {
    console.error('Page view tracking error:', error);
  }
};

// Track custom event
export const trackEvent = (
  eventName: string,
  category: string,
  params: EventParams = {}
): void => {
  if (typeof window === 'undefined' || !isAnalyticsEnabled) return;
  
  try {
    // Prepare params
    const eventParams = {
      event_category: category,
      ...params
    };
    
    // Google Analytics
    if (isGAEnabled && window.gtag) {
      window.gtag('event', eventName, eventParams as Record<string, unknown>);
    }
    
    // Meta Pixel - Convert to standard Meta event name if possible
    if (isMetaEnabled && window.fbq) {
      // Check if this is a standard Meta event
      const metaStandardEvents = [
        'AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'CompleteRegistration', 
        'Contact', 'CustomizeProduct', 'Donate', 'FindLocation', 'InitiateCheckout', 
        'Lead', 'Purchase', 'Schedule', 'Search', 'StartTrial', 'SubmitApplication', 
        'Subscribe', 'ViewContent'
      ];
      
      // Convert event name to proper Meta format (first letter capitalized, no spaces)
      const formattedEventName = eventName
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
      
      // Use standard event if available, otherwise use custom event
      const isStandardEvent = metaStandardEvents.includes(formattedEventName);
      
      if (isStandardEvent) {
        window.fbq('track', formattedEventName, params as Record<string, unknown>);
      } else {
        window.fbq('trackCustom', formattedEventName, params as Record<string, unknown>);
      }
    }
    
    // Google Tag Manager
    if (isGTMEnabled && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventParams
      });
    }
  } catch (error) {
    console.error('Event tracking error:', error);
  }
};

// Track WhatsApp click
export const trackWhatsAppClick = (source: string): void => {
  trackEvent('whatsapp_click', 'engagement', { 
    source,
    timestamp: new Date().toISOString()
  });
  
  // Also track as Meta Lead event for better ad optimization
  if (isMetaEnabled && window.fbq) {
    window.fbq('track', 'Lead', { 
      content_name: 'WhatsApp Click',
      content_category: 'Engagement',
      source: source
    });
  }
};

// Track home page view
export const trackHomePageView = (): void => {
  trackPageView('/');
  trackEvent('view_home_page', 'page_view');
  
  // Add explicit Meta Pixel tracking for homepage
  if (isMetaEnabled && typeof window !== 'undefined' && window.fbq) {
    // Trigger standard PageView event again to ensure it's captured
    window.fbq('track', 'PageView');
    
    // Also track as ViewContent event for better ad optimization
    window.fbq('track', 'ViewContent', {
      content_name: 'Home Page',
      content_category: 'Landing Page',
      content_type: 'website'
    });
  }
};

// Track pricing page view
export const trackPricingPageView = (): void => {
  trackPageView('/precos');
  trackEvent('view_pricing_page', 'page_view');
};

// Export a default analytics object
const analytics = {
  init: initAnalytics,
  pageView: trackPageView,
  event: trackEvent,
  whatsApp: trackWhatsAppClick,
  homePage: trackHomePageView,
  pricingPage: trackPricingPageView
};

export default analytics; 