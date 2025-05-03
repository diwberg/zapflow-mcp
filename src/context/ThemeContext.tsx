'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Efeito único de inicialização quando o componente monta
  useEffect(() => {
    try {
      // Get initial theme from localStorage or system preference
      let initialTheme: Theme = 'light';
      
      try {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        if (storedTheme === 'dark' || storedTheme === 'light') {
          initialTheme = storedTheme;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          initialTheme = 'dark';
        }
      } catch (e) {
        console.warn('Error reading theme from localStorage:', e);
      }
      
      setTheme(initialTheme);
      
      // Apply theme immediately to prevent flash
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.error('Error initializing theme:', e);
    } finally {
      setMounted(true);
    }
  }, []);

  // Efeito separado para mudanças de tema
  useEffect(() => {
    if (!mounted) return;
    
    try {
      // Update HTML element class when theme changes
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      
      // Save theme to localStorage
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Error updating theme:', e);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 