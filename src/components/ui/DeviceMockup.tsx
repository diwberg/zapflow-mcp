'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface DeviceMockupProps {
  className?: string;
  type?: 'laptop' | 'phone' | 'tablet';
  imageUrl?: string;
}

const DeviceMockup = ({ 
  className = '', 
  type = 'laptop',
  imageUrl 
}: DeviceMockupProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Calculate rotation based on mouse position
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      // Calculate mouse position relative to the center of the container
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    // Reset when component mounts
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Render different device types
  const renderDevice = () => {
    switch (type) {
      case 'phone':
        return (
          <div className="relative w-64 h-[500px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-[40px] p-2 shadow-2xl overflow-hidden">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gray-900 rounded-full"></div>
              <div className="absolute inset-2 bg-black rounded-[38px] overflow-hidden">
                {imageUrl ? (
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                    <span className="text-gradient font-bold text-2xl">Zapflow</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'tablet':
        return (
          <div className="relative w-[400px] h-[280px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-[20px] p-2 shadow-2xl overflow-hidden">
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2 w-1 h-12 bg-gray-700 rounded-full"></div>
              <div className="absolute inset-1 bg-black rounded-[18px] overflow-hidden">
                {imageUrl ? (
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-accent/30 flex items-center justify-center">
                    <span className="text-gradient font-bold text-3xl">Zapflow</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
                
      default: // laptop
        return (
          <div className="relative w-full max-w-[600px] h-[350px] mx-auto">
            {/* Base/Stand */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg z-10"></div>
            <div className="absolute bottom-[5px] left-1/2 transform -translate-x-1/2 w-[180px] h-[10px] bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg z-0"></div>
            
            {/* Screen frame */}
            <div className="absolute inset-0 transform translate-y-[-20px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-[14px] p-[2px] shadow-2xl overflow-hidden">
              <div className="absolute bottom-[6px] left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-gray-800 rounded-full"></div>
              
              {/* Screen */}
              <div className="absolute inset-[1px] bg-black rounded-[12px] overflow-hidden">
                {imageUrl ? (
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                    <span className="text-gradient font-bold text-4xl">Zapflow</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {renderDevice()}
      
      {/* Light reflection effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent opacity-5 rounded-xl"
        style={{ 
          x: useTransform(springX, [-0.5, 0.5], [-50, 50]),
          y: useTransform(springY, [-0.5, 0.5], [-50, 50])
        }}
      />
    </motion.div>
  );
};

export default DeviceMockup; 