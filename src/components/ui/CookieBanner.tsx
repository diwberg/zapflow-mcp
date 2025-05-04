'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { X } from 'lucide-react';

// Função auxiliar para salvar o consentimento e disparar um evento
const saveConsent = (value: string) => {
  localStorage.setItem('cookie-consent', value);
  
  // Disparar um evento para que outros componentes saibam da mudança
  const event = new Event('consentUpdated');
  window.dispatchEvent(event);
};

export default function CookieBanner() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Verificar se já temos consentimento de cookies
    if (typeof window !== 'undefined') {
      const cookieConsent = localStorage.getItem('cookie-consent');
      if (!cookieConsent) {
        // Atraso para evitar que o banner apareça imediatamente durante o carregamento da página
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const acceptAll = () => {
    saveConsent('all');
    setIsVisible(false);
  };

  const acceptEssential = () => {
    saveConsent('essential');
    setIsVisible(false);
  };

  const close = () => {
    // Também salva preferência ao fechar, considerando apenas cookies essenciais
    saveConsent('essential');
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