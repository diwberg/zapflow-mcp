import { PricingItem } from '@/components/ui/PricingTable';

interface BaserowFeature {
  id: number;
  value: string;
  color: string;
}

interface BaserowProduct {
  id: number;
  order: string;
  field_76: string;  // Nome
  field_77: string;  // Descrição
  field_78: boolean; // Ativo
  field_79: string;  // Preço
  field_80: BaserowFeature[]; // Features
  field_85: string[]; // Requisitos (IDs)
  field_86: unknown[];    // Outros campos
}

interface BaserowResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BaserowProduct[];
}

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
    
    // Filtrar apenas produtos ativos e converter para o formato PricingItem
    return data.results
      .filter(product => product.field_78) // Apenas produtos ativos
      .map(product => ({
        name: product.field_76,
        description: product.field_77,
        price: Number(product.field_79),
        features: product.field_80.map(feature => feature.value),
        requires: product.field_85
      }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
} 