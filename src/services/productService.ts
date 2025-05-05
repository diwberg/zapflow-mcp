import { PricingItem } from '@/components/ui/PricingTable';

/**
 * Representa uma feature/característica de um produto no Baserow
 */
interface BaserowFeature {
  id: number;
  value: string;
  color: string;
}

/**
 * Representa uma opção de pré-requisito no Baserow
 */
interface BaserowPrerequisite {
  id: number;
  value: string;
  color: string;
}

/**
 * Representa um registro de pedido no Baserow
 */
interface BaserowOrder {
  id: number;
  value: string;
}

/**
 * Representa um produto no formato do Baserow
 * Os nomes dos campos seguem a estrutura field_XX conforme definido no Baserow
 */
interface BaserowProduct {
  id: number;
  order: string;
  field_76: string;  // Nome
  field_77: string;  // Descrição
  field_78: boolean; // Ativo
  field_79: string;  // Preço
  field_80: BaserowFeature[]; // Features
  field_81: string;  // ID_STRIPE
  field_85: BaserowOrder[];   // Pedidos (link para outra tabela)
  field_86: BaserowPrerequisite[]; // Pré-requisitos
}

/**
 * Resposta da API do Baserow para uma listagem de produtos
 */
interface BaserowResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BaserowProduct[];
}

/**
 * Interface estendida para PricingItem incluindo informações de cores
 */
interface ExtendedPricingItem extends PricingItem {
  featureColors?: {[key: string]: string};
  requireColors?: {[key: string]: string};
}

/**
 * Busca produtos da API do Baserow e converte para o formato do PricingTable
 * 
 * @returns Lista de produtos no formato PricingItem
 */
export async function fetchProducts(): Promise<PricingItem[]> {
  try {
    // Usar variável de ambiente ou fallback para a URL da API
    const apiUrl = process.env.NEXT_PUBLIC_PRODUCTS_URL || "https://baserow.icyou.com.br/api/database/rows/table/13/";
    // Tentar obter a chave API de ambas as variáveis possíveis para compatibilidade
    let apiKey = process.env.NEXT_PUBLIC_APIKEY_BASEROW || process.env.APIKEY_BASEROW || "Token Rk5lB2S02fKuK3rZFoNJQqzIgRJU3BSR";
    
    console.log('Fetching products from:', apiUrl);
    
    // Limpar aspas no token
    if (apiKey) {
      apiKey = apiKey.replace(/"/g, '');
    }
    
    console.log('API Key configured:', apiKey ? 'Sim (primeiro caractere: ' + apiKey.charAt(0) + ')' : 'Não');
    
    if (!apiUrl) {
      console.error('API URL não configurada');
      throw new Error('API URL não configurada');
    }
    
    if (!apiKey) {
      console.error('API Key não configurada');
      throw new Error('API Key não configurada');
    }
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': apiKey
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro ao buscar produtos: ${response.status}`, errorText);
      
      if (response.status === 401) {
        throw new Error('Erro de autenticação: verifique o token da API');
      } else if (response.status === 403) {
        throw new Error('Acesso proibido: sem permissão para acessar a API');
      } else if (response.status === 404) {
        throw new Error('URL da API não encontrada');
      } else if (response.status === 429) {
        throw new Error('Limite de requisições excedido. Tente novamente mais tarde');
      } else if (response.status >= 500) {
        throw new Error('Erro no servidor da API. Tente novamente mais tarde');
      } else {
        throw new Error(`Erro ao buscar produtos: ${response.status}`);
      }
    }
    
    const data: BaserowResponse = await response.json();
    console.log('Produtos carregados:', data.count, 'resultados');
    
    // Passo 1: Extrair todos os produtos e criar uma lista completa
    // Isso é necessário para poder mapear os valores de pré-requisitos para os nomes de produtos
    const extendedProducts: ExtendedPricingItem[] = data.results
      .filter(product => product.field_78) // Apenas produtos ativos
      .map(product => ({
        id: product.id, // Adicionamos o ID para referência
        name: product.field_76,
        description: product.field_77,
        price: Number(product.field_79.replace('R$', '').trim()),
        features: product.field_80.map(feature => feature.value),
        featureColors: product.field_80.reduce((colors, feature) => {
          colors[feature.value] = feature.color;
          return colors;
        }, {} as {[key: string]: string}),
        requires: product.field_86?.map(prereq => prereq.value) || [],
        requireColors: product.field_86?.reduce((colors, prereq) => {
          colors[prereq.value] = prereq.color;
          return colors;
        }, {} as {[key: string]: string}) || {}
      }));
    
    console.log('Produtos processados:', extendedProducts.length);
    
    // Passo 2: Converter para o formato PricingItem (removendo propriedades extras)
    return extendedProducts.map(product => ({
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      requires: product.requires
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error('Falha ao carregar produtos. Por favor, tente novamente mais tarde.');
  }
} 