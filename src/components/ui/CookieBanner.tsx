'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // For testing - force banner to show
    setIsVisible(true);
    
    // Comment out original logic for testing
    /*
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      // Atraso para evitar que o banner apareça imediatamente durante o carregamento da página
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    */
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setIsVisible(false);
  };

  const close = () => {
    setIsVisible(false);
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-background border border-border rounded-lg shadow-lg p-4 md:p-6 backdrop-blur-3xl">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-bold mb-2">{t('cookies.title')}</h3>
              <p className="text-muted text-sm mb-4">{t('cookies.description')}</p>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={acceptAll}
                  className="btn-primary py-1.5 px-4 text-sm"
                >
                  {t('cookies.accept')}
                </button>
                <button
                  onClick={acceptEssential}
                  className="btn-outline py-1.5 px-4 text-sm"
                >
                  {t('cookies.reject')}
                </button>
                <Link
                  href="/privacidade"
                  className="text-primary hover:underline text-sm flex items-center"
                >
                  {t('cookies.learnMore')}
                </Link>
              </div>
            </div>
            
            <button
              onClick={close}
              className="p-1 text-foreground hover:text-primary transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 