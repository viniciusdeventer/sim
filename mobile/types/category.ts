export interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateCategoryRequest {
  name: string;
  description: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  category?: Category;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  categories: Category[];
}