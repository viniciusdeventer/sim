import { useCallback, useEffect, useState } from 'react';
import productService from '../services/product.service';
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from '../types/product';

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);

    try {
      const response = await productService.getAll();

      if (response.success) {
        setProducts(response.products);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = async (data: CreateProductRequest) => {
    setLoading(true);

    try {
      const response = await productService.create(data);

      if (response.success) {
        await loadProducts();
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (
    id: string,
    data: UpdateProductRequest
  ) => {
    setLoading(true);

    try {
      const response = await productService.update(id, data);

      if (response.success) {
        await loadProducts();
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);

    try {
      const response = await productService.delete(id);

      if (response.success) {
        await loadProducts();
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,

    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}