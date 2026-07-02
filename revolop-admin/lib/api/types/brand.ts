/**
 * Brand types
 */

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  enabled: boolean;
}

export interface CreateBrandRequest {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  website?: string;
}

export interface UpdateBrandRequest extends CreateBrandRequest {
  id: string;
}
