'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface WhatsAppButtonProps {
  className?: string;
  text?: string;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const WhatsAppButton = ({
  className = '',
  text,
  fullWidth = false,
  variant = 'primary',
  size = 'md',
}: WhatsAppButtonProps) => {
  const { t } = useTranslation();
  const buttonText = text || t('cta.whatsapp');

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

  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
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
      href="https://wa.me/SEUNUMERO?text=Olá,%20quero%20criar%20uma%20aplicação%20com%20o%20Zapflow%20MCP."
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      {buttonText}
    </motion.a>
  );
};

export default WhatsAppButton; 