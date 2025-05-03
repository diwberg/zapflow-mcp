'use client';

import { useTheme } from '@/context/ThemeContext';

export default function DarkModeTest() {
  const { theme } = useTheme();
  
  return (
    <div className="mt-8 p-6 rounded-lg border border-border">
      <h2 className="text-xl font-bold mb-4">Theme Test Component</h2>
      <p className="mb-2">Current theme: <span className="font-bold">{theme}</span></p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-background-light dark:bg-background-dark rounded border border-border">
          <h3 className="font-bold mb-2">Background Color Test</h3>
          <p className="text-foreground-light dark:text-foreground-dark">
            This text should be dark in light mode and light in dark mode.
          </p>
        </div>
        
        <div className="p-4 rounded border border-border">
          <h3 className="font-bold mb-2">Primary Color Test</h3>
          <div className="flex space-x-2">
            <div className="w-10 h-10 rounded bg-primary-light dark:bg-primary-dark"></div>
            <div className="w-10 h-10 rounded bg-secondary-light dark:bg-secondary-dark"></div>
            <div className="w-10 h-10 rounded bg-accent-light dark:bg-accent-dark"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <button className="btn-primary mr-2">Primary Button</button>
        <button className="btn-outline">Outline Button</button>
      </div>
    </div>
  );
} 