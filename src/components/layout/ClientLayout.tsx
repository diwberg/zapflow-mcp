'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default ClientLayout; 