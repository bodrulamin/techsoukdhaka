/**
 * Inventory Tab - Simplified v1 with core inventory tracking
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface InventoryTabProps {
  data: {
    sku: string;
    barcode?: string;
    trackInventory: boolean;
    stock: number;
    lowStockThreshold: number;
    warehouseId: string;
  };
  onChange: (field: string, value: any) => void;
}

export function InventoryTab({ data, onChange }: InventoryTabProps) {
  // TODO: Replace with real API data
  const warehouses = [
    { id: '1', name: 'Main Warehouse' },
    { id: '2', name: 'East Coast Facility' },
    { id: '3', name: 'West Coast Facility' },
  ];

  return (
    <div className="space-y-6">
      {/* Stock Management */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Track inventory</p>
              <p className="text-sm text-muted-foreground">
                Enable to track stock quantity for this product
              </p>
            </div>
            <Switch
              checked={data.trackInventory}
              onCheckedChange={(checked) => onChange('trackInventory', checked)}
            />
          </div>

          {data.trackInventory && (
            <>
              <div className="grid gap-4 md:grid-cols-2 pt-4 border-t">
                {/* Stock Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="stock">Available Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={data.stock}
                    onChange={(e) => onChange('stock', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                {/* Low Stock Threshold */}
                <div className="space-y-2">
                  <Label htmlFor="threshold">Low Stock Alert</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={data.lowStockThreshold}
                    onChange={(e) => onChange('lowStockThreshold', parseInt(e.target.value) || 0)}
                    placeholder="10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Alert when stock falls below this number
                  </p>
                </div>
              </div>

              {/* Stock Status */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    data.stock === 0 ? 'bg-red-500' :
                    data.stock <= data.lowStockThreshold ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium">
                      {data.stock === 0 ? 'Out of Stock' :
                       data.stock <= data.lowStockThreshold ? 'Low Stock' :
                       'In Stock'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {data.stock} units available
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {!data.trackInventory && (
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Inventory tracking is disabled. This product will always appear as "in stock".
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Identifiers */}
      <Card>
        <CardHeader>
          <CardTitle>Product Identifiers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* SKU */}
            <div className="space-y-2">
              <Label htmlFor="sku">SKU (Stock Keeping Unit) *</Label>
              <Input
                id="sku"
                value={data.sku}
                onChange={(e) => onChange('sku', e.target.value)}
                placeholder="e.g. TSH-001"
                required
              />
            </div>

            {/* Barcode */}
            <div className="space-y-2">
              <Label htmlFor="barcode">Barcode / ISBN</Label>
              <Input
                id="barcode"
                value={data.barcode || ''}
                onChange={(e) => onChange('barcode', e.target.value)}
                placeholder="e.g. 1234567890123"
              />
              <p className="text-xs text-muted-foreground">
                UPC, EAN, or ISBN for scanning
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warehouse */}
      <Card>
        <CardHeader>
          <CardTitle>Warehouse Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="warehouse">Default Warehouse</Label>
            <Select
              value={data.warehouseId}
              onValueChange={(value) => onChange('warehouseId', value)}
            >
              <SelectTrigger id="warehouse">
                <SelectValue placeholder="Select warehouse" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((wh) => (
                  <SelectItem key={wh.id} value={wh.id}>
                    {wh.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
