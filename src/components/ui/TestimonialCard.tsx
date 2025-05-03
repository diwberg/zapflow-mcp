'use client';

import { motion } from 'framer-motion';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  className?: string;
  index?: number;
}

const TestimonialCard = ({
  content,
  author,
  role,
  className = '',
  index = 0
}: TestimonialCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.1 * index,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        delay: 0.2 + (0.1 * index),
        ease: "backOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.3 + (0.1 * index) }
    }
  };

  const authorVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, delay: 0.4 + (0.1 * index) }
    }
  };

  return (
    <motion.div 
      className={`card p-6 backdrop-blur-sm ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative z-10">
        <motion.div
          className="mb-4 text-foreground/90"
          variants={contentVariants}
        >
          <motion.div
            variants={quoteVariants}
            className="mb-3"
          >
            <svg
              className="h-6 w-6 text-primary opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </motion.div>
          <p className="text-lg leading-relaxed">{content}</p>
        </motion.div>
        
        <motion.div 
          className="flex items-center border-t border-white/10 pt-4"
          variants={authorVariants}
        >
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold mr-3">
            {author.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-foreground">{author}</p>
            <p className="text-foreground/50 text-sm">{role}</p>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-primary/5 rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-30px] left-[-30px] w-60 h-60 bg-secondary/5 rounded-full z-0 pointer-events-none"></div>
    </motion.div>
  );
};

export default TestimonialCard; 