'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-background border-t border-border py-12 mt-20 transition-colors duration-300">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl text-primary mb-4">Zapflow MCP</h3>
            <p className="text-muted mb-4">
              {t('footer.tagline')}
            </p>
            <a
              href="https://wa.me/5511989773253?text=Olá,%20quero%20criar%20uma%20aplicação%20com%20o%20Zapflow%20MCP."
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark font-medium transition-colors"
            >
              {t('cta.whatsapp')}
            </a>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/precos" className="text-muted hover:text-primary transition-colors">
                  {t('nav.pricing')}
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-muted hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-muted hover:text-primary transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">{t('footer.contact')}</h3>
            <p className="text-muted mb-4">
              {t('footer.contactDescription')}
            </p>
            <div className="text-muted">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-8.486 8.486l4.243 4.243 4.243-4.243a6 6 0 000-8.486zm-1.414 7.072l-2.829 2.829-2.829-2.829a4 4 0 115.657-5.657 4 4 0 010 5.657z" clipRule="evenodd" />
                </svg>
                <span>Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>WhatsApp: +55 (XX) XXXX-XXXX</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 text-center text-muted">
          <p>&copy; {currentYear} Zapflow MCP. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 