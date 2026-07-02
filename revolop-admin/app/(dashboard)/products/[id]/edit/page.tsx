/**
 * Edit product page - v1 simplified with core tabs only
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Save, X, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GeneralTab } from '@/components/products/tabs/GeneralTab';
import { MediaTab } from '@/components/products/tabs/MediaTab';
import { VariantsTab } from '@/components/products/tabs/VariantsTab';
import { InventoryTab } from '@/components/products/tabs/InventoryTab';
import { SEOTab } from '@/components/products/tabs/SEOTab';
import { useProduct, useUpdateProduct } from '@/lib/hooks/use-products';
import { useCategories, useBrands, useVendors } from '@/lib/hooks/use-related-entities';
import type { UpdateProductRequest } from '@/lib/api/types';

type ProductFormData = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  brandId: string;
  vendorId: string;
  featured: boolean;
  enabled: boolean;
  // Inventory
  sku: string;
  barcode: string;
  trackInventory: boolean;
  stock: number;
  lowStockThreshold: number;
  warehouseId: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
};

const TABS = [
  { value: 'general', label: 'General' },
  { value: 'media', label: 'Media' },
  { value: 'variants', label: 'Variants' },
  { value: 'inventory', label: 'Inventory' },
  { value: 'seo', label: 'SEO' },
] as const;

// Convert API ProductImage to MediaTab ProductImage
const convertToMediaTabImages = (images: any[]): Array<{ id: string; url: string; alt: string; isPrimary: boolean; order: number }> => {
  return images.map((img, idx) => ({
    id: img.id || `img-${idx}`,
    url: img.imageUrl || img.url || '',
    alt: img.altText || img.alt || '',
    isPrimary: idx === 0,
    order: img.displayOrder || idx,
  }));
};

// Convert API ProductVariant to VariantsTab Variant
const convertToVariantsTabVariants = (variants: any[]): Array<{ id: string; sku: string; price: number; comparePrice?: number; stock: number; barcode?: string; attributes: Record<string, string>; enabled: boolean }> => {
  return variants.map((v) => ({
    id: v.id,
    sku: v.sku,
    price: v.price,
    comparePrice: v.originalPrice,
    stock: v.totalAvailable || 0,
    barcode: '',
    attributes: (v.attributes || []).reduce((acc: any, attr: any) => {
      acc[attr.attributeDisplayName || attr.attributeName] = attr.value;
      return acc;
    }, {}),
    enabled: v.enabled,
  }));
};

// Convert API ProductVariant to CreateProductVariant
const convertToCreateProductVariant = (variants: any[]): any[] => {
  return variants.map((v) => ({
    sku: v.sku,
    price: v.price,
    originalPrice: v.originalPrice,
    costPrice: v.costPrice,
    currency: v.currency || 'USD',
    displayOrder: v.displayOrder || 0,
    attributes: (v.attributes || []).map((attr: any) => ({
      attributeName: attr.attributeDisplayName || attr.attributeName,
      attributeValue: attr.value,
    })),
    images: (v.images || []).map((img: any) => ({
      imageUrl: img.imageUrl || img.url,
      thumbnailUrl: img.thumbnailUrl,
      altText: img.altText || img.alt,
      displayOrder: img.displayOrder || 0,
    })),
  }));
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Fetch product and related entities
  const { data: product, isLoading: productLoading } = useProduct(params.id as string);
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const { data: vendors } = useVendors();
  const updateMutation = useUpdateProduct();

  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    categoryId: '',
    brandId: '',
    vendorId: '',
    featured: false,
    enabled: true,
    sku: '',
    barcode: '',
    trackInventory: true,
    stock: 0,
    lowStockThreshold: 10,
    warehouseId: '',
    metaTitle: '',
    metaDescription: '',
  });

  // Media and variants state
  const [mediaImages, setMediaImages] = useState<Array<{ id: string; url: string; alt: string; isPrimary: boolean; order: number }>>([]);
  const [variantList, setVariantList] = useState<Array<{ id: string; sku: string; price: number; comparePrice?: number; stock: number; barcode?: string; attributes: Record<string, string>; enabled: boolean }>>([]);

  // Update form data when product is loaded
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        description: product.description,
        categoryId: product.categoryId,
        brandId: product.brandId || '',
        vendorId: product.vendorId || '',
        featured: product.featured,
        enabled: product.enabled,
        sku: product.variants?.[0]?.sku || '',
        barcode: '',
        trackInventory: true,
        stock: product.variants?.[0]?.totalAvailable || 0,
        lowStockThreshold: 10,
        warehouseId: '',
        metaTitle: '',
        metaDescription: '',
      });

      // Set media and variants
      setMediaImages(convertToMediaTabImages(product.images || []));
      setVariantList(convertToVariantsTabVariants(product.variants || []));
    }
  }, [product]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const updateData: UpdateProductRequest = {
        id: formData.id,
        name: formData.name,
        slug: formData.slug,
        shortDescription: formData.shortDescription,
        description: formData.description,
        categoryId: formData.categoryId,
        brandId: formData.brandId || undefined,
        vendorId: formData.vendorId || undefined,
        featured: formData.featured,
        enabled: formData.enabled,
        variants: convertToCreateProductVariant(product?.variants || []),
        attributes: product?.attributes || [],
      };

      updateMutation.mutate(
        { id: params.id as string, data: updateData },
        {
          onSuccess: () => {
            toast.success('Product saved successfully');
            setHasUnsavedChanges(false);
            setIsSubmitting(false);
          },
          onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to save product');
            setIsSubmitting(false);
          },
        }
      );
    } catch (error) {
      toast.error('Failed to save product');
      setIsSubmitting(false);
    }
  };

  const handleSaveAndContinue = async () => {
    await handleSave();
    // Move to next tab
    const currentIndex = TABS.findIndex((t) => t.value === activeTab);
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].value);
    }
  };

  const isLoading = productLoading;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <span>/</span>
        <Link href={`/products/${params.id}`} className="hover:text-foreground">
          {formData.name || 'Loading...'}
        </Link>
        <span>/</span>
        <span className="text-foreground">Edit</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Edit Product</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {formData.name || 'Loading...'} {hasUnsavedChanges && '(unsaved changes)'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSaveAndContinue} disabled={isSubmitting || isLoading}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save & Continue
              </>
            )}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 h-auto bg-muted/50">
              {TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="data-[state=active]:bg-background">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general">
              <GeneralTab
                data={formData}
                categories={categories || []}
                brands={brands || []}
                vendors={vendors || []}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media">
              <MediaTab
                productId={params.id as string}
                images={mediaImages}
                onChange={(images) => {
                  setMediaImages(images);
                  setHasUnsavedChanges(true);
                }}
              />
            </TabsContent>

            {/* Variants Tab */}
            <TabsContent value="variants">
              <VariantsTab
                productId={params.id as string}
                variants={variantList}
                onChange={(variants) => {
                  setVariantList(variants);
                  setHasUnsavedChanges(true);
                }}
              />
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory">
              <InventoryTab data={formData} onChange={handleChange} />
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo">
              <SEOTab data={formData} onChange={handleChange} />
            </TabsContent>
          </Tabs>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
            <Button variant="ghost" onClick={() => router.back()} disabled={isSubmitting}>
              Cancel
            </Button>
            <div className="flex items-center gap-3">
              {hasUnsavedChanges && (
                <span className="text-sm text-muted-foreground">Unsaved changes</span>
              )}
              <Button variant="outline" onClick={handleSave} disabled={isSubmitting}>
                Save
              </Button>
              <Button onClick={handleSaveAndContinue} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save & Continue'
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
