/**
 * General Tab - Simplified v1 basic product information
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Category, Brand, Vendor } from '@/lib/api/types';

interface GeneralTabProps {
  data: {
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    categoryId: string;
    brandId: string;
    vendorId: string;
  };
  categories: Category[];
  brands: Brand[];
  vendors: Vendor[];
  onChange: (field: string, value: any) => void;
  disabled?: boolean;
}

export function GeneralTab({
  data,
  categories,
  brands,
  vendors,
  onChange,
  disabled = false,
}: GeneralTabProps) {
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (value: string) => {
    onChange('name', value);
    if (!data.slug || data.slug === generateSlug(data.name)) {
      onChange('slug', generateSlug(value));
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Name */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="e.g. Classic T-Shirt"
                value={data.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                disabled={disabled}
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                placeholder="e.g. classic-tshirt"
                value={data.slug}
                onChange={(e) => onChange('slug', e.target.value)}
                required
                disabled={disabled}
              />
            </div>

            {/* Product ID (readonly) */}
            <div className="space-y-2">
              <Label htmlFor="productId">Product ID</Label>
              <Input
                id="productId"
                value="AUTO-GENERATED"
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              placeholder="Brief product description for listings (max 160 characters)"
              value={data.shortDescription}
              onChange={(e) => onChange('shortDescription', e.target.value)}
              maxLength={160}
              disabled={disabled}
            />
            <p className="text-xs text-muted-foreground">
              {data.shortDescription?.length || 0}/160 characters
            </p>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              placeholder="Detailed product description with features, specifications, etc."
              value={data.description}
              onChange={(e) => onChange('description', e.target.value)}
              rows={8}
              className="resize-y"
              disabled={disabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Classification */}
      <Card>
        <CardHeader>
          <CardTitle>Classification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={data.categoryId}
                onValueChange={(value) => onChange('categoryId', value)}
                required
                disabled={disabled}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select
                value={data.brandId}
                onValueChange={(value) => onChange('brandId', value)}
                disabled={disabled}
              >
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No brand</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vendor */}
            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Select
                value={data.vendorId}
                onValueChange={(value) => onChange('vendorId', value)}
                disabled={disabled}
              >
                <SelectTrigger id="vendor">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No vendor</SelectItem>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
