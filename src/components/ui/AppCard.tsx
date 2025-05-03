'use client';

import { motion } from 'framer-motion';
import WhatsAppButton from './WhatsAppButton';

export interface AppCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  price?: number;
  className?: string;
  showButton?: boolean;
  buttonText?: string;
}

const AppCard = ({ 
  title, 
  description, 
  icon,
  price,
  className = '',
  showButton = false,
  buttonText = 'Solicitar'
}: AppCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -10,
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 245, 160, 0.2)',
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, yoyo: Infinity, repeatDelay: 0.5 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.3 }
    }
  };

  const priceVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, delay: 0.4 }
    },
    hover: {
      color: '#00F5A0',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className={`card p-6 relative overflow-hidden ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 gradient-border"></div>
      
      <div className="flex items-start my-4">
        {icon ? (
          <motion.div 
            className="flex-shrink-0 mr-4 relative z-10"
            variants={iconVariants}
          >
            {icon}
          </motion.div>
        ) : (
          <motion.div 
            className="w-12 h-12 bg-background/80 rounded-lg border border-primary/20 flex items-center justify-center mr-4 text-primary"
            variants={iconVariants}
          >
            <span className="font-bold">{title.slice(0, 2).toUpperCase()}</span>
          </motion.div>
        )}
        
        <div className="flex-1">
          <motion.h3 
            className="font-bold text-xl text-foreground"
            variants={textVariants}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-foreground/70 mt-1"
            variants={textVariants}
          >
            {description}
          </motion.p>
        </div>
        
        {price !== undefined && (
          <motion.div
            className="ml-4 flex-shrink-0 text-xl font-bold text-foreground"
            variants={priceVariants}
          >
            R$ {price}
          </motion.div>
        )}
      </div>
      
      {showButton && (
        <motion.div
          className="mt-5 flex justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <WhatsAppButton text={buttonText} className="text-sm py-2" />
        </motion.div>
      )}
      
      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-radial from-primary/10 to-transparent opacity-50 rounded-full transform translate-x-5 translate-y-5"></div>
    </motion.div>
  );
};

export default AppCard; 