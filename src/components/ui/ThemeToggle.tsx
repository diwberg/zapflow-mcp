'use client';

import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-background/10 backdrop-blur-sm border border-border hover:border-primary/30 transition-colors duration-200"
      aria-label={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-primary" />
      ) : (
        <Moon size={18} className="text-primary" />
      )}
    </button>
  );
} 