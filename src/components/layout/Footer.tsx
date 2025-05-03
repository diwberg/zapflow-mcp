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
              href="https://wa.me/SEUNUMERO?text=Olá,%20quero%20criar%20uma%20aplicação%20com%20o%20Zapflow%20MCP."
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
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">{t('footer.applications')}</h3>
            <ul className="space-y-2">
              <li className="text-muted">PostgreSQL</li>
              <li className="text-muted">Redis</li>
              <li className="text-muted">MySQL</li>
              <li className="text-muted">N8N</li>
              <li className="text-muted">WordPress</li>
              <li className="text-muted">Evolution API</li>
            </ul>
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