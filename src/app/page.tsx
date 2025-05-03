'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import SectionTitle from '@/components/ui/SectionTitle';
import StepCard from '@/components/ui/StepCard';
import AppCard from '@/components/ui/AppCard';
import FeatureCard from '@/components/ui/FeatureCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import DeviceMockup from '@/components/ui/DeviceMockup';
import DarkModeTest from '@/components/ui/DarkModeTest';
import { Zap, Cloud, Bot, CreditCard, ServerIcon, Database, Activity, Cpu } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Garantir que a renderização ocorra apenas no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // ou um skeleton/loader
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden" ref={targetRef}>
        {/* Gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[50%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-secondary/30 to-accent/30 blur-[120px] transform -translate-x-1/2"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-[100px]"></div>
        </div>
        
        {/* Content */}
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                  {t('hero.badge')}
                </span>
              </motion.div>
              
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {t('hero.title')}
              </motion.h1>
              
              <motion.p
                className="text-xl text-foreground/70 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {t('hero.description')}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <WhatsAppButton className="text-lg" />
              </motion.div>
            </motion.div>
            
            <motion.div
              style={{ y, opacity }}
              className="relative hidden lg:block"
            >
              <DeviceMockup type="laptop" />
              <DeviceMockup type="phone" className="absolute -bottom-12 -right-12 z-20 scale-75" />
            </motion.div>
          </div>
        </div>
        
        {/* Radial accent for visual depth */}
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      </section>
      
      {/* Dark Mode Test */}
      <section className="py-10">
        <div className="container">
          <DarkModeTest />
        </div>
      </section>
      
      {/* How It Works - ID for anchor links */}
      <section className="py-20 relative" id="features">
        <div className="container">
          <SectionTitle 
            title={t('howItWorks.title')}
            subtitle={t('howItWorks.subtitle')}
            centered
            badge={t('howItWorks.badge')}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <StepCard 
              number={1}
              title={t('howItWorks.steps.0.title')}
              description={t('howItWorks.steps.0.description')}
              delay={0}
            />
            <StepCard 
              number={2}
              title={t('howItWorks.steps.1.title')}
              description={t('howItWorks.steps.1.description')}
              delay={1}
            />
            <StepCard 
              number={3}
              title={t('howItWorks.steps.2.title')}
              description={t('howItWorks.steps.2.description')}
              delay={2}
            />
            <StepCard 
              number={4}
              title={t('howItWorks.steps.3.title')}
              description={t('howItWorks.steps.3.description')}
              delay={3}
            />
          </div>
        </div>
      </section>
      
      {/* Applications */}
      <section className="py-20 relative">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"></div>
        <div className="container relative z-10">
          <SectionTitle 
            title={t('applications.title')}
            subtitle={t('applications.subtitle')}
            centered
            gradient="secondary"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <AppCard 
              title={t('applications.items.0.title')}
              description={t('applications.items.0.description')}
              icon={<Database className="text-primary" size={32} />}
              price={30}
              showButton
            />
            
            <AppCard 
              title={t('applications.items.1.title')}
              description={t('applications.items.1.description')}
              icon={<Activity className="text-primary" size={32} />}
              price={20}
              showButton
            />
            
            <AppCard 
              title={t('applications.items.2.title')}
              description={t('applications.items.2.description')}
              icon={<Database className="text-primary" size={32} />}
              price={30}
              showButton
            />
            
            <AppCard 
              title={t('applications.items.3.title')}
              description={t('applications.items.3.description')}
              icon={<Activity className="text-primary" size={32} />}
              price={50}
              showButton
            />
            
            <AppCard 
              title={t('applications.items.4.title')}
              description={t('applications.items.4.description')}
              icon={<ServerIcon className="text-primary" size={32} />}
              price={40}
              showButton
            />
            
            <AppCard 
              title={t('applications.items.5.title')}
              description={t('applications.items.5.description')}
              icon={<Cpu className="text-primary" size={32} />}
              price={50}
              showButton
            />
          </div>
        </div>
      </section>
      
      {/* Advantages */}
      <section className="py-20 relative" id="about">
        <div className="container">
          <SectionTitle 
            title={t('advantages.title')}
            subtitle={t('advantages.subtitle')}
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <FeatureCard 
              icon={Zap}
              title={t('advantages.items.0.title')}
              description={t('advantages.items.0.description')}
              index={0}
            />
            <FeatureCard 
              icon={Cloud}
              title={t('advantages.items.1.title')}
              description={t('advantages.items.1.description')}
              index={1}
            />
            <FeatureCard 
              icon={Bot}
              title={t('advantages.items.2.title')}
              description={t('advantages.items.2.description')}
              index={2}
            />
            <FeatureCard 
              icon={CreditCard}
              title={t('advantages.items.3.title')}
              description={t('advantages.items.3.description')}
              index={3}
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-30%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-[100px] pointer-events-none"></div>
        <div className="container relative z-10">
          <SectionTitle 
            title={t('testimonials.title')}
            centered
            gradient="secondary"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <TestimonialCard 
              content={t('testimonials.items.0.content')}
              author={t('testimonials.items.0.author')}
              role={t('testimonials.items.0.role')}
              index={0}
            />
            <TestimonialCard 
              content={t('testimonials.items.1.content')}
              author={t('testimonials.items.1.author')}
              role={t('testimonials.items.1.role')}
              index={1}
            />
            <TestimonialCard 
              content={t('testimonials.items.2.content')}
              author={t('testimonials.items.2.author')}
              role={t('testimonials.items.2.role')}
              index={2}
            />
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80"></div>
        <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none"></div>
        <div className="container relative z-10">
          <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-12 rounded-3xl border border-border/40 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('finalCta.title')}
              </h2>
              <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                {t('finalCta.description')}
              </p>
              <WhatsAppButton size="lg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
