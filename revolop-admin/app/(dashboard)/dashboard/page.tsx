/**
 * Dashboard overview page
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  // TODO: Replace with real data from API
  const stats = [
    { title: 'Total Revenue', value: '$24,780', change: '+12.5%', icon: TrendingUp, positive: true },
    { title: 'Total Orders', value: '1,234', change: '+8.2%', icon: ShoppingCart, positive: true },
    { title: 'Total Products', value: '456', change: '+2', icon: Package, positive: true },
    { title: 'Total Customers', value: '892', change: '+5.4%', icon: Users, positive: true },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', total: '$120.00', status: 'Delivered', date: '2025-01-15' },
    { id: '#ORD-002', customer: 'Jane Smith', total: '$85.50', status: 'Processing', date: '2025-01-15' },
    { id: '#ORD-003', customer: 'Bob Johnson', total: '$210.00', status: 'Shipped', date: '2025-01-14' },
    { id: '#ORD-004', customer: 'Alice Brown', total: '$55.00', status: 'Pending', date: '2025-01-14' },
    { id: '#ORD-005', customer: 'Charlie Wilson', total: '$175.00', status: 'Delivered', date: '2025-01-13' },
  ];

  const lowStockProducts = [
    { name: 'Product A', stock: 5, threshold: 10 },
    { name: 'Product B', stock: 2, threshold: 15 },
    { name: 'Product C', stock: 8, threshold: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Revolop Admin - Overview of your business</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === 'Delivered'
                            ? 'default'
                            : order.status === 'Processing'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Low Stock Alerts
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.stock} left (threshold: {product.threshold})
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
