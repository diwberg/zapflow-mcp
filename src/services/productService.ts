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
  field_85: string[] | number[]; // Requisitos (IDs)
  field_86: unknown[];    // Outros campos
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
 * Busca produtos da API do Baserow e converte para o formato do PricingTable
 * 
 * @returns Lista de produtos no formato PricingItem
 */
export async function fetchProducts(): Promise<PricingItem[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PRODUCTS_URL;
    const apiKey = process.env.APIKEY_BASEROW || "Token Rk5lB2S02fKuK3rZFoNJQqzIgRJU3BSR";
    
    if (!apiUrl) {
      throw new Error('API URL não configurada');
    }
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': apiKey
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.status}`);
    }
    
    const data: BaserowResponse = await response.json();
    
    // Passo 1: Extrair todos os produtos e criar uma lista completa
    // Isso é necessário para poder mapear os IDs de requisitos para os nomes de produtos
    const allProducts = data.results
      .filter(product => product.field_78) // Apenas produtos ativos
      .map(product => ({
        id: product.id,
        name: product.field_76,
        description: product.field_77,
        price: Number(product.field_79),
        features: product.field_80.map(feature => feature.value),
        requires: product.field_85 || []
      }));
    
    // Passo 2: Função para converter um ID de produto em um slug (usado para requisitos)
    // Os requisitos vêm como IDs numéricos, mas a aplicação espera strings representando slugs
    const getProductSlugById = (id: number | string): string => {
      const product = allProducts.find(p => p.id === Number(id));
      if (product) {
        // Criar um slug baseado no nome do produto
        return product.name.toLowerCase().replace(/\s+/g, '-');
      }
      return String(id);
    };
    
    // Passo 3: Mapear os produtos finais, convertendo os IDs de requisitos para slugs
    return allProducts.map(product => ({
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      // Converter IDs numéricos para slugs de produto
      requires: Array.isArray(product.requires) 
        ? product.requires.map(id => getProductSlugById(id))
        : []
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
} 