'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  gradient?: 'primary' | 'secondary' | 'none';
  badge?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  centered = false,
  className = '',
  gradient = 'primary',
  badge,
}: SectionTitleProps) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%',
      transition: { duration: 1, delay: 0.3 }
    }
  };

  const getTitleClass = () => {
    if (gradient === 'primary') {
      return 'text-gradient';
    } else if (gradient === 'secondary') {
      return 'text-gradient-purple';
    } else {
      return 'text-foreground';
    }
  };

  return (
    <motion.div 
      className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {badge && (
        <motion.div 
          className="inline-block px-4 py-1 mb-4 rounded-full bg-background border border-primary/30 text-primary text-sm font-medium"
          variants={badgeVariants}
        >
          {badge}
        </motion.div>
      )}
      
      <motion.h2 
        className={`text-4xl md:text-5xl font-bold mb-6 ${getTitleClass()}`}
        variants={titleVariants}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className="text-foreground/70 text-lg max-w-3xl mx-auto"
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        className={`h-[3px] bg-primary/40 rounded-full mt-6 max-w-[80px] ${centered ? 'mx-auto' : ''}`}
        variants={lineVariants}
      />
    </motion.div>
  );
};

export default SectionTitle; 