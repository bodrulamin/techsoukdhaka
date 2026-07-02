/**
 * Variants Tab - Simplified v1 with attributes, generator, and table
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2, Wand2, Edit3 } from 'lucide-react';

interface Variant {
  id: string;
  sku: string;
  price: number;
  comparePrice?: number;
  stock: number;
  barcode?: string;
  attributes: Record<string, string>;
  enabled: boolean;
}

interface Attribute {
  id: string;
  name: string;
  values: string[];
}

interface VariantsTabProps {
  productId: string;
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
}

export function VariantsTab({ productId, variants, onChange }: VariantsTabProps) {
  const [variantTab, setVariantTab] = useState('attributes');
  const [attributes, setAttributes] = useState<Attribute[]>([
    { id: '1', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
    { id: '2', name: 'Color', values: ['Red', 'Blue', 'Black'] },
  ]);

  // Attributes Sub-tab
  const AttributesContent = () => (
    <div className="space-y-4">
      {attributes.map((attr, idx) => (
        <Card key={attr.id}>
          <CardContent className="pt-6">
            <div className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                <Label>Attribute Name</Label>
                <Input
                  value={attr.name}
                  onChange={(e) => {
                    const updated = [...attributes];
                    updated[idx].name = e.target.value;
                    setAttributes(updated);
                  }}
                  placeholder="e.g. Size, Color, Material"
                />
              </div>
              <div className="flex-[2] space-y-2">
                <Label>Values (comma separated)</Label>
                <Input
                  value={attr.values.join(', ')}
                  onChange={(e) => {
                    const updated = [...attributes];
                    updated[idx].values = e.target.value.split(',').map(v => v.trim()).filter(Boolean);
                    setAttributes(updated);
                  }}
                  placeholder="e.g. S, M, L, XL"
                />
                <p className="text-xs text-muted-foreground">
                  These values will be used to generate variant combinations
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setAttributes(attributes.filter((_, i) => i !== idx));
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={() => setAttributes([...attributes, { id: Date.now().toString(), name: '', values: [] }])}>
        <Plus className="mr-2 h-4 w-4" />
        Add Attribute
      </Button>
    </div>
  );

  // Combination Generator Sub-tab
  const GeneratorContent = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Generate Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Selected Attributes</h4>
              <div className="flex flex-wrap gap-2">
                {attributes.map((attr) => (
                  <div key={attr.id} className="border rounded-lg p-3">
                    <p className="font-medium text-sm">{attr.name}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {attr.values.map((val, i) => (
                        <span key={i} className="bg-muted px-2 py-1 rounded text-xs">
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                This will generate {attributes.reduce((acc, attr) => acc * (attr.values.length || 1), 1)} variant combinations
              </p>
              <Button type="button" className="w-full">
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Variants
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Generation Options</h4>
          <p className="text-sm text-muted-foreground">
            Generated variants will inherit the base product pricing and inventory settings. You can edit each variant individually after generation.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  // Variant Table Sub-tab
  const TableContent = () => {
    const mockVariants: Variant[] = [
      { id: '1', sku: 'TSH-001-S-RED', price: 29.99, stock: 50, attributes: { Size: 'S', Color: 'Red' }, enabled: true },
      { id: '2', sku: 'TSH-001-M-RED', price: 29.99, stock: 45, attributes: { Size: 'M', Color: 'Red' }, enabled: true },
      { id: '3', sku: 'TSH-001-L-BLU', price: 29.99, stock: 30, attributes: { Size: 'L', Color: 'Blue' }, enabled: true },
    ];

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{mockVariants.length} variants</p>
          <Button type="button" variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Variant
          </Button>
        </div>

        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Variant</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVariants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(variant.attributes).map(([key, val]) => (
                        <span key={key} className="bg-muted px-2 py-1 rounded text-xs">
                          {key}: {val}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{variant.sku}</TableCell>
                  <TableCell>${variant.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={variant.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {variant.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${variant.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {variant.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button type="button" variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Tabs value={variantTab} onValueChange={setVariantTab}>
        <TabsList className="w-full justify-start rounded-lg bg-muted/50 p-1">
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="table">Variant Table</TabsTrigger>
        </TabsList>

        <TabsContent value="attributes" className="mt-4">
          <AttributesContent />
        </TabsContent>

        <TabsContent value="generator" className="mt-4">
          <GeneratorContent />
        </TabsContent>

        <TabsContent value="table" className="mt-4">
          <TableContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
