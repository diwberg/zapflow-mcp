'use client';

import { motion } from 'framer-motion';
import WhatsAppButton from './WhatsAppButton';

export interface PricingItem {
  name: string;
  description: string;
  price: number;
}

interface PricingTableProps {
  items: PricingItem[];
  className?: string;
}

const PricingTable = ({ items, className = '' }: PricingTableProps) => {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    },
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

  return (
    <div className={`${className}`}>
      <motion.div
        className="card rounded-2xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          className="p-6 bg-background/40 backdrop-blur-sm border-b border-white/10"
          variants={headerVariants}
        >
          <h3 className="text-2xl font-bold text-gradient">Preços Mensais</h3>
          <p className="text-foreground/70 mt-2">
            Escolha a aplicação ideal para suas necessidades
          </p>
        </motion.div>

        <div className="divide-y divide-white/5">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 items-center"
              variants={rowVariants}
              whileHover="hover"
              custom={index}
              layoutId={`pricing-row-${index}`}
            >
              <div>
                <h4 className="font-bold text-xl text-foreground">{item.name}</h4>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-foreground/70">{item.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">
                  R$ {item.price}
                </div>
                <WhatsAppButton 
                  text="Solicitar"
                  className="py-2 px-4 text-sm"
                  variant="primary"
                />
              </div>
            </motion.div>
          ))}
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
            1 hora grátis
          </span>
        </p>
        <p>Todos os serviços incluem 1h gratuita para teste. Pagamento mensal recorrente. Cancelamento automático se não houver pagamento após 10 dias.</p>
      </motion.div>
    </div>
  );
};

export default PricingTable; 