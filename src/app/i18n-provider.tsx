'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import i18n from '../i18n/config';
import { I18nextProvider } from 'react-i18next';

interface I18nProviderProps {
  children: ReactNode;
}

// Renderização do lado do cliente apenas
function ClientI18n({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Garantir que o i18n só é configurado após a montagem do componente
    try {
      setMounted(true);
    } catch (error) {
      console.error('Error in i18n provider:', error);
    }
  }, []);

  // Não renderiza o contexto de i18n até que o componente esteja montado
  // para evitar erros de hidratação
  if (!mounted) {
    return <>{children}</>;
  }

  return <ClientI18n>{children}</ClientI18n>;
} 