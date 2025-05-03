'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className = '',
  index = 0
}: FeatureCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.1 * index
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 + (0.1 * index) }
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, 0, -5, 0],
      transition: { duration: 1, repeat: Infinity, repeatDelay: 1 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, delay: 0.3 + (0.1 * index) }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5, delay: 0.4 + (0.1 * index) }
    }
  };

  return (
    <motion.div 
      className={`card p-8 relative overflow-hidden ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 gradient-border pointer-events-none"></div>
      
      {/* Icon with glow effect */}
      <motion.div 
        className="w-16 h-16 mb-6 relative"
        variants={iconVariants}
        whileHover="hover"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full text-primary">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      </motion.div>
      
      {/* Content */}
      <motion.h3 
        className="font-bold text-2xl text-foreground mb-3"
        variants={titleVariants}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-foreground/70"
        variants={descriptionVariants}
      >
        {description}
      </motion.p>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full transform translate-x-5 translate-y-[-50%]"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-secondary/5 rounded-full transform translate-x-[-30%] translate-y-[30%]"></div>
    </motion.div>
  );
};

export default FeatureCard; 