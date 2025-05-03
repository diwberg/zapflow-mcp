// Analytics service for ZapFlow MCP
// Handles Google Analytics, Meta Pixel and Google Tag Manager

// Types
type EventParams = {
  [key: string]: string | number | boolean | undefined;
};

// Environment variable validation with fallbacks
const getEnvVar = (key: string): string => {
  const value = process.env[`NEXT_PUBLIC_${key}`];
  return value || '';
};

// Feature flags
const isAnalyticsEnabled = getEnvVar('ANALYTICS_ENABLED') === 'true';
const isGAEnabled = isAnalyticsEnabled && getEnvVar('GA_ENABLED') === 'true';
const isMetaEnabled = isAnalyticsEnabled && getEnvVar('META_ENABLED') === 'true';
const isGTMEnabled = isAnalyticsEnabled && getEnvVar('GTM_ENABLED') === 'true';

// IDs
const GA_ID = getEnvVar('GA_MEASUREMENT_ID');
const META_PIXEL_ID = getEnvVar('META_PIXEL_ID');
const GTM_ID = getEnvVar('GTM_ID');

// Google Analytics
const initGA = (): void => {
  if (!isGAEnabled || !GA_ID) return;
  
  // Prevent duplicate initialization
  if ((window as any).gtag) return;
  
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
};

// Meta Pixel
const initMeta = (): void => {
  if (!isMetaEnabled || !META_PIXEL_ID) return;
  
  // Prevent duplicate initialization
  if ((window as any).fbq) return;
  
  // Add Meta Pixel script
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
    fbq('init', '${META_PIXEL_ID}');
  `;
  document.head.appendChild(script);
};

// Google Tag Manager
const initGTM = (): void => {
  if (!isGTMEnabled || !GTM_ID) return;
  
  // Prevent duplicate initialization
  if ((window as any).dataLayer) return;
  
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
};

// Initialize all analytics
export const initAnalytics = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    initGA();
    initMeta();
    initGTM();
    console.log('Analytics initialized');
  } catch (error) {
    console.error('Analytics initialization error:', error);
  }
};

// Track page view
export const trackPageView = (url: string, title: string = ''): void => {
  if (typeof window === 'undefined' || !isAnalyticsEnabled) return;
  
  try {
    // Google Analytics
    if (isGAEnabled && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_location: url,
        page_title: title || document.title
      });
    }
    
    // Meta Pixel
    if (isMetaEnabled && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
    
    // GTM (already tracks page views automatically)
    
    console.log(`Page view tracked: ${url}`);
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
    if (isGAEnabled && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventParams);
    }
    
    // Meta Pixel
    if (isMetaEnabled && (window as any).fbq) {
      (window as any).fbq('track', eventName, params);
    }
    
    // Google Tag Manager
    if (isGTMEnabled && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...eventParams
      });
    }
    
    console.log(`Event tracked: ${eventName}`, eventParams);
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
};

// Track home page view
export const trackHomePageView = (): void => {
  trackPageView('/');
  trackEvent('view_home_page', 'page_view');
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