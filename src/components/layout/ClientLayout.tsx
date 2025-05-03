'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

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
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default ClientLayout; 