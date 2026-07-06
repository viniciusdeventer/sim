import { useCallback, useEffect, useState } from 'react';
import categoryService from '../services/category.service';
import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '../types/category';

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = useCallback(async () => {
    setLoading(true);

    try {
      const response = await categoryService.getAll();

      if (response.success) {
        setCategories(response.categories);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = async (data: CreateCategoryRequest) => {
    setLoading(true);

    try {
      const response = await categoryService.create(data);

      if (response.success) {
        await loadCategories();
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (
    id: string,
    data: UpdateCategoryRequest
  ) => {
    setLoading(true);

    try {
      const response = await categoryService.update(id, data);

      if (response.success) {
        await loadCategories();
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);

    try {
      const response = await categoryService.delete(id);

      if (response.success) {
        await loadCategories();
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,

    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}