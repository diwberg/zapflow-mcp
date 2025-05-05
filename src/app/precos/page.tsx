'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from '@/components/ui/SectionTitle';
import PricingTable from '@/components/ui/PricingTable';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { PricingItem, AdditionalInfo } from '@/components/ui/PricingTable';
import { fetchProducts } from '@/services/productService';

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

// Informações adicionais estáticas
const additionalInfoData: AdditionalInfo = {
  freeTrialPeriod: "1 hora",
  billingCycle: "Mensal",
  cancellationPolicy: "Cancelamento automático se não houver pagamento após 5 dias"
};

export default function PricingPage() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar dados de preço
  const loadPricingData = async () => {
    console.log("Iniciando carregamento de produtos...");
    try {
      setIsLoading(true);
      setError(null);
      
      // Carregar produtos da API
      const products = await fetchProducts();
      console.log("Produtos recebidos:", products?.length || 0);
      
      if (products && products.length > 0) {
        setPricingItems(products);
      } else {
        setError('Nenhum produto ativo encontrado. Tente novamente mais tarde.');
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados de preços:', error);
      setError(error instanceof Error ? error.message : 'Não foi possível carregar os produtos. Tente novamente mais tarde.');
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
          ) : error ? (
            <div className="text-center p-6 bg-red-500/10 rounded-lg">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={loadPricingData}
                className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <PricingTable 
              items={pricingItems} 
              additionalInfo={additionalInfoData}
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
            message="Olá! Gostaria de conhecer melhor as opções de aplicações do Zapflow MCP."
          />
        </div>
      </section>
    </>
  );
} 