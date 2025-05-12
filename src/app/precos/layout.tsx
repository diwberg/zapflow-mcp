import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preços | Zapflow',
  description: 'Conheça os preços das aplicações disponíveis no Zapflow.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 