# Zapflow MCP

O Zapflow MCP é uma plataforma que provisiona aplicações sob demanda via WhatsApp, utilizando um agente de IA que entende pedidos em linguagem natural. Este repositório contém a implementação das páginas de landing e preços.

## Descrição do Projeto

Zapflow MCP permite que o cliente solicite, com linguagem natural via WhatsApp, a criação de aplicações como PostgreSQL, Redis, MySQL, N8N, entre outras. O sistema provisiona automaticamente, envia credenciais e cobra mensalmente.

### Regras de Negócio
- O cliente faz o pedido por WhatsApp
- O sistema provisiona a aplicação automaticamente e envia os acessos
- Ele tem 1 hora para testar gratuitamente
- Se pagar dentro de 1 hora, o serviço é ativado e será cobrado mensalmente
- Se não pagar, o ambiente é descartado automaticamente
- Após 10 dias sem pagamento, o serviço ativo é encerrado e os dados são apagados

## Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/) - Framework React com App Router
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Lucide React](https://lucide.dev/) - Biblioteca de ícones

## Instalação

Para instalar as dependências do projeto, execute:

```bash
npm install
```

## Comandos de Desenvolvimento

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Iniciar versão de produção
npm run start

# Lint
npm run lint
```

## Estrutura de Pastas

```
zapflow-mcp/
├── public/              # Arquivos estáticos
│   ├── icons/           # Ícones para aplicações
│   └── avatars/         # Imagens para testimoniais
├── src/
│   ├── app/             # Rotas (App Router)
│   │   ├── page.tsx     # Página inicial (/)
│   │   └── precos/      # Rota /precos
│   │       └── page.tsx # Página de preços
│   ├── components/      # Componentes reutilizáveis
│   │   ├── layout/      # Componentes de layout (Navbar, Footer)
│   │   └── ui/          # Componentes de UI (botões, cards, etc)
│   └── styles/          # Estilos globais
└── tailwind.config.ts   # Configuração do Tailwind CSS
```

## Arquitetura da Aplicação

O Zapflow MCP utiliza o App Router do Next.js 14, aproveitando suas capacidades de renderização no servidor (SSR) e geração estática para melhor desempenho e SEO. A estrutura é organizada em componentes reutilizáveis que facilitam a manutenção e expansão do projeto.

### Principais Componentes
- **Layout:** Componentes estruturais como Navbar e Footer
- **UI:** Componentes de interface como botões, tabelas e cards
- **Pages:** Páginas completas organizadas por rotas

## Desenvolvimento e Contribuição

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute em modo de desenvolvimento: `npm run dev`
4. Acesse http://localhost:3000

## Changelog

### Versão 1.0.0
- Implementação inicial do projeto
- Criação da landing page
- Criação da página de preços
- Implementação de componentes reutilizáveis
- Integração com Tailwind CSS

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Analytics Setup

The project includes analytics integration with multiple providers:
- Google Analytics 4
- Meta Pixel (Facebook)
- Google Tag Manager

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Analytics Configuration
# Replace with your actual IDs for production

# Google Analytics (GA4)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Meta Pixel (Facebook)
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Feature Flags - enable/disable specific analytics providers
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_GA_ENABLED=true
NEXT_PUBLIC_META_ENABLED=true
NEXT_PUBLIC_GTM_ENABLED=true
```

### Tracked Events

The following events are automatically tracked:
- Page views for all pages
- Specific page view events for home and pricing pages
- WhatsApp button clicks with source attribution

You can add custom event tracking by importing the analytics service:

```typescript
import analytics from '@/lib/analytics';

// Track a custom event
analytics.event('event_name', 'event_category', { 
  custom_param: 'value' 
});
```
