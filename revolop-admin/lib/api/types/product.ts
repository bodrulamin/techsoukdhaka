/**
 * Product types
 */

export interface ProductImage {
  id?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  altText?: string;
  displayOrder: number;
}

export interface ProductAttribute {
  id?: string;
  attributeId?: string;
  attributeName?: string;
  value: string;
  displayOrder: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  sku: string;
  price: number;
  originalPrice?: number;
  costPrice?: number;
  currency: string;
  enabled: boolean;
  displayOrder: number;
  attributes: VariantAttribute[];
  images: ProductImage[];
  inventory?: VariantInventory[];
  totalAvailable: number;
  inStock: boolean;
}

export interface VariantAttribute {
  attributeCode: string;
  attributeDisplayName: string;
  value: string;
}

export interface VariantInventory {
  id: string;
  warehouseId: string;
  warehouseName: string;
  onHand: number;
  reserved: number;
  damaged: number;
  available: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  categoryName: string;
  brandId?: string;
  brandName?: string;
  vendorId?: string;
  vendorName?: string;
  featured: boolean;
  enabled: boolean;
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  images: ProductImage[];
}

export interface CreateProductVariant {
  sku: string;
  price: number;
  originalPrice?: number;
  costPrice?: number;
  currency?: string;
  displayOrder: number;
  attributes: Array<{
    attributeName: string;
    attributeValue: string;
  }>;
  images: ProductImage[];
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  brandId?: string;
  vendorId?: string;
  featured: boolean;
  enabled: boolean;
  variants: CreateProductVariant[];
  attributes: ProductAttribute[];
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: string;
}

export interface ProductSearchParams {
  page?: number;
  size?: number;
  searchTerm?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  enabled?: boolean;
}
