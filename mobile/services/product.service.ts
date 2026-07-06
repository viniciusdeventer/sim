import api from './api';
import {
  Product,
  ProductsResponse,
  ProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from '../types/product';

class ProductService {

  async getAll(): Promise<ProductsResponse> {
    try {
      const response = await api.get<Product[]>('/products');

      return {
        success: true,
        message: '',
        products: response.data,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao buscar produtos.',
        products: [],
      };
    }
  }

  async getById(id: string): Promise<Product | null> {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch {
      return null;
    }
  }

  async create(
    data: CreateProductRequest
  ): Promise<ProductResponse> {
    try {
      const product: Product = {
        id: crypto.randomUUID(),
        code: data.code,
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await api.post<Product>(
        '/products',
        product
      );

      return {
        success: true,
        message: 'Produto cadastrado com sucesso.',
        product: response.data,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao cadastrar produto.',
      };
    }
  }

  async update(
    id: string,
    data: UpdateProductRequest
  ): Promise<ProductResponse> {
    try {
      const current = await this.getById(id);

      if (!current) {
        return {
          success: false,
          message: 'Produto não encontrado.',
        };
      }

      const response = await api.put<Product>(
        `/products/${id}`,
        {
          ...current,
          ...data,
          updatedAt: new Date().toISOString(),
        }
      );

      return {
        success: true,
        message: 'Produto atualizado com sucesso.',
        product: response.data,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao atualizar produto.',
      };
    }
  }

  async delete(id: string): Promise<ProductResponse> {
    try {
      await api.delete(`/products/${id}`);

      return {
        success: true,
        message: 'Produto removido com sucesso.',
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao remover produto.',
      };
    }
  }
}

export default new ProductService();