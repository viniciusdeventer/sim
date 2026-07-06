import api from './api';
import {
  Category,
  CategoriesResponse,
  CategoryResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '../types/category';

class CategoryService {


  async getAll(): Promise<CategoriesResponse> {
    try {
      const response = await api.get<Category[]>('/categories');

      return {
        success: true,
        message: '',
        categories: response.data,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao buscar categorias.',
        categories: [],
      };
    }
  }

  async getById(id: string): Promise<Category | null> {
    try {
      const response = await api.get<Category>(`/categories/${id}`);
      return response.data;
    } catch {
      return null;
    }
  }

  async create(
    data: CreateCategoryRequest
  ): Promise<CategoryResponse> {
    try {
      const category: Category = {
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await api.post<Category>(
        '/categories',
        category
      );

      return {
        success: true,
        message: 'Categoria cadastrada com sucesso.',
        category: response.data,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao cadastrar categoria.',
      };
    }
  }

  async update(
    id: string,
    data: UpdateCategoryRequest
  ): Promise<CategoryResponse> {
    try {
      const current = await this.getById(id);

      if (!current) {
        return {
          success: false,
          message: 'Categoria não encontrada.',
        };
      }

      const response = await api.put<Category>(
        `/categories/${id}`,
        {
          ...current,
          ...data,
          updatedAt: new Date().toISOString(),
        }
      );

      return {
        success: true,
        message: 'Categoria atualizada com sucesso.',
        category: response.data,
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao atualizar categoria.',
      };
    }
  }

  async delete(id: string): Promise<CategoryResponse> {
    try {
      await api.delete(`/categories/${id}`);

      return {
        success: true,
        message: 'Categoria removida com sucesso.',
      };
    } catch {
      return {
        success: false,
        message: 'Erro ao remover categoria.',
      };
    }
  }
}

export default new CategoryService();