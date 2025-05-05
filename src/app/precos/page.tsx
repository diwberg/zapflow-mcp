'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '@/components/ui/SectionTitle';
import PricingTable from '@/components/ui/PricingTable';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { PricingItem, AdditionalInfo } from '@/components/ui/PricingTable';
import pricingData from '@/data/pricing.json';

// Loading skeleton component
const PricingTableSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-16 bg-background-light/20 dark:bg-background-dark/20 rounded-t-2xl mb-4"></div>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="h-24 bg-background-light/10 dark:bg-background-dark/10 mb-2"></div>
    ))}
    <div className="h-20 bg-background-light/20 dark:bg-background-dark/20 rounded-b-2xl mt-4"></div>
  </div>
);

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features?: string[];
  requires?: string[];
}

export default function PricingPage() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo | undefined>(undefined);

  // Função para carregar dados de preço
  const loadPricingData = async () => {
    try {
      // Simular carregamento de dados (pode ser removido se não for necessário)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mapear produtos do JSON para formato PricingItem
      const items = (pricingData.products as Product[]).map(product => ({
        name: product.name,
        description: product.description,
        price: product.price,
        features: product.features,
        requires: product.requires
      }));
      
      setPricingItems(items);
      setAdditionalInfo(pricingData.additionalInfo as AdditionalInfo);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados de preços:', error);
      setIsLoading(false);
    }
  };

  // Garantir que a renderização e carregamento de dados ocorra apenas no cliente
  useEffect(() => {
    setIsMounted(true);
    loadPricingData();
  }, []);

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
          {isLoading ? (
            <PricingTableSkeleton />
          ) : (
            <PricingTable 
              items={pricingItems} 
              additionalInfo={additionalInfo}
            />
          )}
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