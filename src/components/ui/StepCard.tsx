'use client';

import { motion } from 'framer-motion';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const StepCard = ({ 
  number, 
  title, 
  description, 
  className = '',
  delay = 0
}: StepCardProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2 + delay * 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 + delay * 0.1 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, delay: 0.2 + delay * 0.1 }
    }
  };

  // Line connecting steps
  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: '100%',
      transition: { duration: 0.5, delay: 0.3 + delay * 0.1 }
    }
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Connector line (only visible if not the last step) */}
      {number < 4 && (
        <motion.div 
          className="absolute left-6 top-12 w-[2px] bg-gradient-to-b from-primary/70 to-primary/10 z-0"
          style={{ height: 'calc(100% + 2rem)' }}
          variants={lineVariants}
        />
      )}
      
      <div className="flex relative z-10">
        {/* Step number */}
        <motion.div 
          className="flex-shrink-0 mr-5"
          variants={numberVariants}
        >
          <motion.div 
            className="flex items-center justify-center w-12 h-12 bg-background border border-primary/30 text-primary rounded-full font-bold text-xl overflow-hidden relative"
            animate={{
              boxShadow: ['0 0 0px rgba(0, 245, 160, 0.4)', '0 0 15px rgba(0, 245, 160, 0.7)', '0 0 0px rgba(0, 245, 160, 0.4)']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/10 rounded-full" />
            
            {/* Number */}
            <span className="relative z-10">{number}</span>
          </motion.div>
        </motion.div>
        
        {/* Content */}
        <motion.div
          variants={contentVariants}
          className="flex-1"
        >
          <h3 className="font-bold text-xl text-foreground mb-2">{title}</h3>
          <p className="text-foreground/70">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepCard; 