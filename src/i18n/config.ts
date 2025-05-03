'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translations/en.json';
import translationPT from './translations/pt.json';
import translationES from './translations/es.json';
// Remover importação do francês para reduzir carga inicial
// import translationFR from './translations/fr.json';

// Função de carregamento sob demanda
const loadResources = async (lang: string) => {
  if (lang === 'en') return { translation: translationEN };
  if (lang === 'pt') return { translation: translationPT };
  if (lang === 'es') return { translation: translationES };
  return { translation: translationPT }; // Default para português
};

// Inicialização segura
const initI18n = () => {
  // Verifica se estamos no navegador
  if (typeof window === 'undefined') return;

  try {
    // Carrega apenas PT por padrão para inicialização rápida
    i18n
      .use(initReactI18next)
      .init({
        resources: {
          pt: { translation: translationPT }
        },
        lng: 'pt',
        fallbackLng: 'pt',
        interpolation: {
          escapeValue: false
        }
      });

    // Configurar detecção de idioma apenas após inicialização da aplicação
    setTimeout(() => {
      try {
        const storedLang = localStorage.getItem('language');
        if (storedLang && storedLang !== 'pt') {
          i18n.changeLanguage(storedLang);
          
          // Adicionar bundle para o idioma armazenado
          if (!i18n.hasResourceBundle(storedLang, 'translation')) {
            loadResources(storedLang).then(resources => {
              i18n.addResourceBundle(storedLang, 'translation', resources.translation);
            });
          }
        }
      } catch (e) {
        console.warn('Error loading language preference:', e);
      }
    }, 0);

    // Lidar com mudanças de idioma
    i18n.on('languageChanged', (lang) => {
      if (!i18n.hasResourceBundle(lang, 'translation')) {
        loadResources(lang).then(resources => {
          i18n.addResourceBundle(lang, 'translation', resources.translation);
        });
      }
      
      try {
        localStorage.setItem('language', lang);
      } catch (e) {
        console.warn('Error storing language preference:', e);
      }
    });
  } catch (e) {
    console.error('Failed to initialize i18n:', e);
  }
};

// Iniciar apenas do lado do cliente
if (typeof window !== 'undefined') {
  initI18n();
}

export default i18n; 