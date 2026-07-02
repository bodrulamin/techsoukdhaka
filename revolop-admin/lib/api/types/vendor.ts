/**
 * Vendor types
 */

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  enabled: boolean;
}

export interface CreateVendorRequest {
  name: string;
  slug: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface UpdateVendorRequest extends CreateVendorRequest {
  id: string;
}
