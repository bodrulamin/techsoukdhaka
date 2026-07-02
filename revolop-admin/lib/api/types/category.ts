/**
 * Category types
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  level: number;
  displayOrder: number;
  enabled: boolean;
  parentId?: string;
}

export interface CategoryTree extends Category {
  children: CategoryTree[];
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  displayOrder: number;
  enabled: boolean;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: string;
}
