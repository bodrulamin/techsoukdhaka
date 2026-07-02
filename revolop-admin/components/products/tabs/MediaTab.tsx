/**
 * Media Tab - Simplified v1 with image management only
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Star, Trash2, GripVertical } from 'lucide-react';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

interface MediaTabProps {
  productId: string;
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

export function MediaTab({ productId, images, onChange }: MediaTabProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // TODO: Handle file upload
    console.log('Files dropped:', e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const setPrimaryImage = (imageId: string) => {
    const updated = images.map(img => ({
      ...img,
      isPrimary: img.id === imageId
    }));
    onChange(updated);
  };

  const removeImage = (imageId: string) => {
    onChange(images.filter(img => img.id !== imageId));
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center transition-colors
              ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50'}
            `}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Product Images</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop images here, or click to browse
            </p>
            <Button type="button">
              <ImageIcon className="mr-2 h-4 w-4" />
              Browse Images
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Supports: JPG, PNG, WEBP. Max file size: 5MB per image. Recommended: 1200x1200px
            </p>
          </div>

          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Image Gallery ({images.length})</Label>
                <p className="text-xs text-muted-foreground">
                  Drag images to reorder
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square rounded-lg border overflow-hidden"
                  >
                    {/* Image */}
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />

                    {/* Primary Badge */}
                    {image.isPrimary && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Primary
                      </div>
                    )}

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!image.isPrimary && (
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => setPrimaryImage(image.id)}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Set Primary
                        </Button>
                      )}
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(image.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Drag Handle */}
                    <div className="absolute top-2 right-2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="h-5 w-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Image Tips</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use square images (1:1 ratio) for best display</li>
            <li>• First image is automatically set as primary</li>
            <li>• Drag images to change their display order</li>
            <li>• Recommended size: 1200x1200px for high resolution</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
