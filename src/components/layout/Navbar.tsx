'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSelector from '../ui/LanguageSelector';
import { useTranslation } from 'react-i18next';

// Valores fallback para tradução durante SSR
const fallbackTranslations = {
  'nav.home': 'Início',
  'nav.pricing': 'Preços',
  'nav.whatsapp': 'Chamar no WhatsApp'
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // Montar o componente apenas no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Função segura de tradução que usa fallback durante SSR/hidratação
  const safeT = (key: string) => {
    if (!mounted || !ready) {
      return fallbackTranslations[key as keyof typeof fallbackTranslations] || key;
    }
    return t(key);
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border py-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="container flex justify-between items-center">
        <Link href="/" className="font-bold text-xl flex items-center text-gradient-primary hover:opacity-90 transition-opacity">
          <Image src="/logo.png" alt="Zapflow MCP" width={80} height={30} className="mr-2" />
          Zapflow MCP
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link href="/" className="text-foreground hover:text-primary font-medium transition-colors">
            {safeT('nav.home')}
          </Link>
          <Link href="/precos" className="text-foreground hover:text-primary font-medium transition-colors">
            {safeT('nav.pricing')}
          </Link>
          
          {/* Theme and Language Controls */}
          <div className="flex items-center space-x-2 ml-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
          
          <a 
            href="https://wa.me/SEUNUMERO?text=Olá,%20quero%20criar%20uma%20aplicação%20com%20o%20Zapflow%20MCP."
            target="_blank"
            rel="noopener noreferrer" 
            className="btn-primary py-2 px-4 rounded-2xl"
          >
            {safeT('nav.whatsapp')}
          </a>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <LanguageSelector />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 py-2 bg-background/80 backdrop-blur-md border-t border-border">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-foreground hover:text-primary font-medium py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {safeT('nav.home')}
            </Link>
            <Link 
              href="/precos" 
              className="text-foreground hover:text-primary font-medium py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {safeT('nav.pricing')}
            </Link>
            <a 
              href="https://wa.me/SEUNUMERO?text=Olá,%20quero%20criar%20uma%20aplicação%20com%20o%20Zapflow%20MCP."
              target="_blank"
              rel="noopener noreferrer" 
              className="btn-primary py-2 px-4 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {safeT('nav.whatsapp')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 