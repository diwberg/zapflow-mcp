'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function TermsOfServicePage() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('termsOfService.title')}</h1>
      <p className="text-muted mb-8">{t('termsOfService.lastUpdated')} {currentDate}</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.introduction.title')}</h2>
          <p className="text-muted">{t('termsOfService.introduction.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.serviceDescription.title')}</h2>
          <p className="text-muted">{t('termsOfService.serviceDescription.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.userAccounts.title')}</h2>
          <p className="text-muted">{t('termsOfService.userAccounts.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.paymentTerms.title')}</h2>
          <p className="text-muted">{t('termsOfService.paymentTerms.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.userConduct.title')}</h2>
          <p className="text-muted">{t('termsOfService.userConduct.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.intellectualProperty.title')}</h2>
          <p className="text-muted">{t('termsOfService.intellectualProperty.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.limitation.title')}</h2>
          <p className="text-muted">{t('termsOfService.limitation.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.termination.title')}</h2>
          <p className="text-muted">{t('termsOfService.termination.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.changes.title')}</h2>
          <p className="text-muted">{t('termsOfService.changes.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.governingLaw.title')}</h2>
          <p className="text-muted">{t('termsOfService.governingLaw.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.contact.title')}</h2>
          <p className="text-muted">{t('termsOfService.contact.content')}</p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-border">
        <Link href="/" className="text-primary hover:underline">&larr; {t('nav.home')}</Link>
      </div>
    </div>
  );
} 