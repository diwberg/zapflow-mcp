'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '@/components/ui/SectionTitle';
import PricingTable from '@/components/ui/PricingTable';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { PricingItem } from '@/components/ui/PricingTable';

export default function PricingPage() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  // Garantir que a renderização ocorra apenas no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pricingItems: PricingItem[] = [
    {
      name: t('applications.items.0.title'),
      description: t('applications.items.0.description').split('.')[0],
      price: 30,
    },
    {
      name: t('applications.items.1.title'),
      description: t('applications.items.1.description').split('.')[0],
      price: 20,
    },
    {
      name: t('applications.items.2.title'),
      description: t('applications.items.2.description').split('.')[0],
      price: 30,
    },
    {
      name: t('applications.items.3.title'),
      description: t('applications.items.3.description').split('.')[0],
      price: 50,
    },
    {
      name: t('applications.items.4.title'),
      description: t('applications.items.4.description').split('.')[0],
      price: 40,
    },
    {
      name: t('applications.items.5.title'),
      description: t('applications.items.5.description').split('.')[0],
      price: 50,
    },
  ];

  if (!isMounted) {
    return null; // ou um skeleton/loader
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background-light/50 to-background-light/80 dark:from-background-dark/50 dark:to-background-dark/80">
        <div className="container text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('pricing.pricingHero.title')}</h1>
          <p className="text-xl text-muted mb-0 max-w-3xl mx-auto">
            {t('pricing.pricingHero.subtitle')}
          </p>
        </div>
      </section>
      
      {/* Pricing Table */}
      <section className="py-16">
        <div className="container">
          <PricingTable items={pricingItems} />
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 bg-background-light/50 dark:bg-background-dark/50">
        <div className="container">
          <SectionTitle 
            title={t('faq.title')}
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-12 max-w-4xl mx-auto">
            <div>
              <h3 className="font-bold text-xl text-foreground mb-2">{t('faq.items.0.question')}</h3>
              <p className="text-muted">
                {t('faq.items.0.answer')}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl text-foreground mb-2">{t('faq.items.1.question')}</h3>
              <p className="text-muted">
                {t('faq.items.1.answer')}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl text-foreground mb-2">{t('faq.items.2.question')}</h3>
              <p className="text-muted">
                {t('faq.items.2.answer')}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl text-foreground mb-2">{t('faq.items.3.question')}</h3>
              <p className="text-muted">
                {t('faq.items.3.answer')}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl text-foreground mb-2">{t('faq.items.4.question')}</h3>
              <p className="text-muted">
                {t('faq.items.4.answer')}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl text-foreground mb-2">{t('faq.items.5.question')}</h3>
              <p className="text-muted">
                {t('faq.items.5.answer')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-background mb-6">
            {t('finalCta.readyToStart')}
          </h2>
          <p className="text-xl text-background/90 mb-8 max-w-3xl mx-auto">
            {t('finalCta.requestNow')}
          </p>
          <WhatsAppButton 
            className="bg-background text-primary hover:bg-background/90 text-lg"
            variant="outline"
            size="lg"
          />
        </div>
      </section>
    </>
  );
} 