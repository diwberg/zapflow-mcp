import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preços | Zapflow MCP',
  description: 'Conheça os preços das aplicações disponíveis no Zapflow MCP.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 