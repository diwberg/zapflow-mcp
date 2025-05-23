'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from '../ui/CookieBanner';
import Analytics from '../marketing/Analytics';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enquanto não estiver montado, renderize apenas o conteúdo principal
  // sem Navbar ou Footer para evitar erros de hidratação
  if (!isMounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <>
      <Analytics />
      <Navbar />
      {children}
      <Footer />
      <CookieBanner />
    </>
  );
};

export default ClientLayout; 