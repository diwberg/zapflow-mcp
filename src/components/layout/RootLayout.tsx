'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: "Overview", href: "/" },
    { title: "Features", href: "/#features" },
    { title: "Pricing", href: "/precos" },
    { title: "About", href: "/#about" },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background grid pattern */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none"></div>
      
      {/* Background gradient orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-400px] right-[-400px] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 blur-[100px]"></div>
        <div className="absolute bottom-[-400px] left-[-400px] w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-[100px]"></div>
      </div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-lg py-3 shadow-lg" : "py-5"
        }`}
      >
        <div className="container flex justify-between items-center">
          <Link href="/" className="font-bold text-2xl text-foreground relative">
            <span className="text-gradient">Zapflow MCP</span>
            <motion.div 
              className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.title} 
                href={link.href}
                className={`font-medium transition-all duration-300 hover:text-primary ${
                  pathname === link.href || (pathname === '/' && link.href === '/') 
                    ? 'text-primary' 
                    : 'text-foreground/80'
                }`}
              >
                {link.title}
              </Link>
            ))}
            <motion.a 
              href="https://wa.me/SEUNUMERO?text=Olá,%20quero%20criar%20uma%20aplicação%20com%20o%20Zapflow%20MCP."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Chamar no WhatsApp
            </motion.a>
          </nav>
          
          {/* Mobile menu button - simplified for this example */}
          <button className="md:hidden text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/10 pt-16 pb-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl text-foreground mb-4">Zapflow MCP</h3>
              <p className="text-foreground/70 mb-4">
                Peça sua aplicação no WhatsApp.<br />Use em minutos.
              </p>
              <motion.a
                href="https://wa.me/SEUNUMERO?text=Olá,%20quero%20criar%20uma%20aplicação%20com%20o%20Zapflow%20MCP."
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
                whileHover={{ x: 3 }}
              >
                Chamar no WhatsApp →
              </motion.a>
            </div>
            
            <div>
              <h3 className="font-bold text-foreground mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-foreground/70 hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/precos" className="text-foreground/70 hover:text-primary transition-colors">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="text-foreground/70 hover:text-primary transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-foreground mb-4">Aplicações</h3>
              <ul className="space-y-2">
                <li className="text-foreground/70">PostgreSQL</li>
                <li className="text-foreground/70">Redis</li>
                <li className="text-foreground/70">MySQL</li>
                <li className="text-foreground/70">N8N</li>
                <li className="text-foreground/70">WordPress</li>
                <li className="text-foreground/70">Evolution API</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-foreground mb-4">Entre em Contato</h3>
              <p className="text-foreground/70">
                Estamos disponíveis 24/7 pelo WhatsApp para ajudar com qualquer dúvida.
              </p>
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://wa.me/SEUNUMERO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-10 pt-8 text-center text-foreground/50">
            <p>&copy; {new Date().getFullYear()} Zapflow MCP. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Scroll indicator - only visible on the homepage and when at the top */}
      {pathname === '/' && !isScrolled && (
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <ChevronDoubleDownIcon className="h-6 w-6 text-primary animate-pulse" />
        </motion.div>
      )}
    </div>
  );
};

export default RootLayout; 