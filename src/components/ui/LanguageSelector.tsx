'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative z-20" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 rounded-full bg-background/10 backdrop-blur-sm border border-border hover:border-primary/30 transition-colors duration-200"
        aria-label="Select language"
      >
        <Globe size={18} className="text-primary" />
        <span className="sr-only md:not-sr-only md:text-sm">{currentLanguage.flag}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
        />
      </button>
      
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-background/80 backdrop-blur-md border border-border rounded-lg shadow-lg"
        >
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 flex items-center gap-2 transition-colors ${
                  language.code === i18n.language ? 'bg-primary/5 font-medium text-primary' : 'text-foreground'
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 