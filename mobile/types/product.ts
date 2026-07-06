export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  buyPrice: number;
  sellPrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  buyPrice: number;
  sellPrice: number;
}

export interface UpdateProductRequest {
  code: string;
  name: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  buyPrice: number;
  sellPrice: number;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  product?: Product;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  products: Product[];
}