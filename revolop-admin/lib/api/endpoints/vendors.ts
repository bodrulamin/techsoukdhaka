/**
 * Vendor API endpoints
 */

import apiClient from '../client';
import type { Vendor, CreateVendorRequest, UpdateVendorRequest } from '../types';

/**
 * Get all vendors
 */
export const getVendors = async (): Promise<Vendor[]> => {
  const response = await apiClient.get<Vendor[]>('/vendors');
  return response.data;
};

/**
 * Get vendor by ID
 */
export const getVendor = async (id: string): Promise<Vendor> => {
  const response = await apiClient.get<Vendor>(`/vendors/${id}`);
  return response.data;
};

/**
 * Get vendor by slug
 */
export const getVendorBySlug = async (slug: string): Promise<Vendor> => {
  const response = await apiClient.get<Vendor>(`/vendors/slug/${slug}`);
  return response.data;
};

/**
 * Create new vendor
 */
export const createVendor = async (data: CreateVendorRequest): Promise<Vendor> => {
  const response = await apiClient.post<Vendor>('/vendors', data);
  return response.data;
};

/**
 * Update vendor
 */
export const updateVendor = async (id: string, data: UpdateVendorRequest): Promise<Vendor> => {
  const response = await apiClient.put<Vendor>(`/vendors/${id}`, data);
  return response.data;
};

/**
 * Delete vendor
 */
export const deleteVendor = async (id: string): Promise<void> => {
  await apiClient.delete(`/vendors/${id}`);
};
