/**
 * SEO Tab - Simplified v1 with just meta title and description
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SEOTabProps {
  data: {
    metaTitle: string;
    metaDescription: string;
  };
  onChange: (field: string, value: any) => void;
}

export function SEOTab({ data, onChange }: SEOTabProps) {
  return (
    <div className="space-y-6">
      {/* Meta Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Search Engine Optimization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Meta Title */}
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              value={data.metaTitle}
              onChange={(e) => onChange('metaTitle', e.target.value)}
              placeholder="Page title for search engines"
              maxLength={60}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Recommended: 50-60 characters</span>
              <span>{data.metaTitle?.length || 0}/60</span>
            </div>
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={data.metaDescription}
              onChange={(e) => onChange('metaDescription', e.target.value)}
              placeholder="Brief description for search results"
              rows={3}
              maxLength={160}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Recommended: 150-160 characters</span>
              <span>{data.metaDescription?.length || 0}/160</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Google Search Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 max-w-xl bg-white">
            {/* Title */}
            <div className="text-blue-600 text-xl truncate cursor-pointer hover:underline">
              {data.metaTitle || 'Your Product Name'}
            </div>
            {/* URL */}
            <div className="text-green-700 text-sm truncate">
              www.yourstore.com/products/your-product-slug
            </div>
            {/* Description */}
            <div className="text-gray-600 text-sm line-clamp-2">
              {data.metaDescription || 'Your product description will appear here...'}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This is how your product might appear in Google search results
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
