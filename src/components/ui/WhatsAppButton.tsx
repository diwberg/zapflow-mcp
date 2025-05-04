'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import analytics from '@/lib/analytics';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface WhatsAppButtonProps {
  className?: string;
  text?: string;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  source?: string;
}

const WhatsAppButton = ({
  className = '',
  text,
  fullWidth = false,
  variant = 'primary',
  size = 'md',
  source,
}: WhatsAppButtonProps) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const buttonText = text || t('cta.whatsapp');
  const [isMounted, setIsMounted] = useState(false);
  
  // Definir classes de tamanho aqui para evitar erro de referência antes da declaração
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  // Assegura hidratação correta
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate source if not provided
  const trackingSource = source || pathname || 'unknown';

  const handleClick = (e: React.MouseEvent) => {
    // Garante que o evento só é disparado após a hidratação
    if (!isMounted) return;
    
    // Prevenir o comportamento do console.log para debug
    console.log(`WhatsApp click from: ${trackingSource}`);
    
    // Track the WhatsApp button click
    analytics.whatsApp(trackingSource);
    
    // Pequeno atraso para garantir que o evento seja disparado antes do redirecionamento
    // Isso é especialmente importante para o Meta Pixel
    if (typeof window !== 'undefined' && !window.fbq) {
      e.preventDefault();
      setTimeout(() => {
        window.open(
          "https://wa.me/5511989773253?text=Olá,%20quero%20criar%20uma%20aplicação%20com%20o%20Zapflow%20MCP.",
          "_blank",
          "noopener,noreferrer"
        );
      }, 300);
    }
  };

  // Durante SSR ou primeira hidratação, renderizar versão simplificada
  if (!isMounted) {
    return (
      <a
        href="https://wa.me/5511989773253?text=Olá,%20quero%20criar%20uma%20aplicação%20com%20o%20Zapflow%20MCP."
        target="_blank"
        rel="noopener noreferrer"
        className={`btn ${variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-outline'} ${
          sizeClasses[size]
        } ${fullWidth ? 'w-full text-center' : ''} ${className}`}
      >
        {buttonText}
      </a>
    );
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03,
      boxShadow: variant === 'primary' 
        ? '0 0 15px rgba(0, 245, 160, 0.6)'
        : variant === 'secondary'
        ? '0 0 15px rgba(189, 0, 255, 0.6)'
        : 'none'
    },
    tap: { scale: 0.98 }
  };

  const buttonClasses = `
    btn 
    ${variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-outline'} 
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full text-center' : ''} 
    ${className}
  `;

  return (
    <motion.a
      href="https://wa.me/5511989773253?text=Olá,%20quero%20criar%20uma%20aplicação%20com%20o%20Zapflow%20MCP."
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      onClick={handleClick}
    >
      {buttonText}
    </motion.a>
  );
};

export default WhatsAppButton; 