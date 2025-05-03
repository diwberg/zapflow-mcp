'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('privacyPolicy.title')}</h1>
      <p className="text-muted mb-8">{t('privacyPolicy.lastUpdated')} {currentDate}</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.introduction.title')}</h2>
          <p className="text-muted">{t('privacyPolicy.introduction.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.informationCollected.title')}</h2>
          <p className="text-muted">{t('privacyPolicy.informationCollected.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.useOfInformation.title')}</h2>
          <p className="text-muted">{t('privacyPolicy.useOfInformation.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.dataSecurity.title')}</h2>
          <p className="text-muted">{t('privacyPolicy.dataSecurity.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.thirdParties.title')}</h2>
          <p className="text-muted">{t('privacyPolicy.thirdParties.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.yourRights.title')}</h2>
          <p className="text-muted">{t('privacyPolicy.yourRights.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.cookies.title')}</h2>
          <p className="text-muted">{t('privacyPolicy.cookies.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.changes.title')}</h2>
          <p className="text-muted">{t('privacyPolicy.changes.content')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.contact.title')}</h2>
          <p className="text-muted">{t('privacyPolicy.contact.content')}</p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-border">
        <Link href="/" className="text-primary hover:underline">&larr; {t('nav.home')}</Link>
      </div>
    </div>
  );
} 