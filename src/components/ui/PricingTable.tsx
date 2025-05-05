'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppButton from './WhatsAppButton';
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export interface PricingItem {
  name: string;
  description: string;
  price: number;
  features?: string[];
  requires?: string[];
}

export interface AdditionalInfo {
  freeTrialPeriod: string;
  billingCycle: string;
  cancellationPolicy: string;
}

interface PricingTableProps {
  items: PricingItem[];
  className?: string;
  additionalInfo?: AdditionalInfo;
}

const PricingTable = ({ items, className = '', additionalInfo }: PricingTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const tableRef = useRef<HTMLDivElement>(null);
  
  // Filtered items based on search term
  const filteredItems = items.filter(item => {
    const searchValue = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue) ||
      item.features?.some(feature => feature.toLowerCase().includes(searchValue))
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        delay: Math.min(i * 0.05, 0.3),
        ease: "easeOut"
      }
    }),
    hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transition: { duration: 0.2 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.6 }
    }
  };

  // Mapeamento dos IDs/slugs de produtos para nomes
  const getProductNameBySlug = (slug: string): string => {
    // Primeiro tenta encontrar um produto com o nome exato convertido em slug
    const product = items.find(item => 
      item.name.toLowerCase().replace(/\s+/g, '-') === slug
    );
    
    if (product) return product.name;
    
    // Se não encontrar, tenta fazer um match parcial
    const partialMatch = items.find(item => 
      slug.includes(item.name.toLowerCase().replace(/\s+/g, '-')) ||
      item.name.toLowerCase().replace(/\s+/g, '-').includes(slug)
    );
    
    if (partialMatch) return partialMatch.name;
    
    // Caso não encontre, formata o slug para exibição
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Renderizar um único badge de requisito
  const renderRequireBadge = (req: string, index: number) => (
    <span 
      key={index} 
      className="inline-flex bg-gradient-to-r from-green-400 to-teal-600 items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
    >
      {getProductNameBySlug(req)}
    </span>
  );

  return (
    <div className={`${className}`}>
      <motion.div
        className="card rounded-2xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        ref={tableRef}
      >
        <motion.div 
          className="p-6 bg-background/40 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10"
          variants={headerVariants}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gradient">Preços Mensais</h3>
              <p className="text-foreground/70 mt-2">
                Escolha a aplicação ideal para suas necessidades
              </p>
            </div>
            
            <div className="relative w-full md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-foreground/50" />
              </div>
              <input
                type="text"
                placeholder="Buscar aplicação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 bg-background/30 border border-white/10 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                           placeholder-foreground/40 text-foreground"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/50 hover:text-foreground"
                >
                  <span className="text-lg">×</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="divide-y divide-white/5 max-h-[70vh] overflow-y-auto scroll-smooth">
          <AnimatePresence initial={false}>
            {filteredItems.length > 0 ? (
              <>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 items-center my-2"
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover="hover"
                    custom={index}
                    layoutId={`pricing-row-${item.name}`}
                    data-index={index}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="md:col-span-1">
                      <h4 className="font-bold text-xl text-foreground">{item.name}</h4>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-foreground/70">{item.description}</p>
                      {/* Feature tags in a subtle way */}
                      {item.features && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.features.map((feature, i) => (
                            <span key={i} className="text-xs text-foreground/50 inline-flex items-center">
                              <CheckIcon className="w-3 h-3 text-primary/70 mr-1" />
                              {feature}
                              {i < (item.features?.length || 0) - 1 && <span className="mx-1">•</span>}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Requirement badges */}
                      {item.requires && item.requires.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="text-xs text-foreground/60 flex items-center">
                            <ArrowRightIcon className="w-3 h-3 mr-1" />
                            Requer:
                          </span>
                          {item.requires.map((req, i) => renderRequireBadge(req, i))}
                        </div>
                      )}
                    </div>
                    
                    <div className="md:col-span-1 flex items-center justify-between w-full">
                      <div className="text-2xl font-bold text-primary">
                        R$ {item.price}
                      </div>
                      <WhatsAppButton 
                        text={`Solicitar ${item.name}`}
                        className="py-2 px-4 text-sm"
                        variant="primary"
                        source={`pricing-${item.name}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <motion.div 
                className="p-8 text-center text-foreground/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>Nenhuma aplicação encontrada para &ldquo;{searchTerm}&rdquo;</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-3 text-primary hover:underline"
                >
                  Limpar busca
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {filteredItems.length > 0 && (
            <motion.div 
              className="p-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              layout
            >
              <p className="text-xs text-foreground/50">
                Mostrando {filteredItems.length} aplicações
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8 text-center text-foreground/70 max-w-3xl mx-auto bg-background/30 backdrop-blur-sm p-6 rounded-xl"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p className="mb-2">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            {additionalInfo?.freeTrialPeriod || '1 hora'} grátis
          </span>
        </p>
        <p>
          {additionalInfo ? (
            <>
              Todos os serviços incluem {additionalInfo.freeTrialPeriod} gratuita para teste. 
              Pagamento {additionalInfo.billingCycle.toLowerCase()} recorrente. 
              {additionalInfo.cancellationPolicy}.
            </>
          ) : (
            'Todos os serviços incluem 1h gratuita para teste. Pagamento mensal recorrente. Cancelamento automático se não houver pagamento após 10 dias.'
          )}
        </p>
      </motion.div>
    </div>
  );
};

export default PricingTable; 