# Revolop Admin - Implementation Plan

## Project Overview
Admin dashboard for revolop-commerce ecommerce platform built with Next.js 15, TypeScript, and Tailwind CSS.

## Design Philosophy
**Build a modern, clean, fast, and maintainable admin panel.**

We prioritize:
- Simplicity over flashiness
- Consistency over customization
- Readability over cleverness
- Productivity over features
- Use shadcn/ui directly (no wrappers)

The interface should feel like **Stripe Dashboard, Shopify Admin, GitHub, or Linear**—clean, minimal, professional.

---

## Approach: Business Components First

**Build reusable business components first.** Once they exist, every module becomes much easier and faster to build.

**Why this approach?**
- Eliminates duplication across modules
- Consistent UX across the entire admin
- Faster development of new features
- Easier maintenance and updates
- Cleaner, more understandable codebase

**What we don't do:**
- **Wrap shadcn/ui components** - use them directly
- Create one-off components for each page
- Duplicate table, form, or layout implementations

---

## Backend API (revolopcommerce-api)

The Quarkus backend provides REST APIs for:

### Authentication & Authorization
- `AuthResource` - Login, registration, JWT tokens
- `RoleResource` - Role management with RBAC

### Core E-commerce Entities
- `ProductResource` - Product CRUD, search, filtering
- `ProductVariantResource` - Product variants/SKU management
- `CategoryResource` - Category hierarchy
- `BrandResource` - Brand management
- `AttributeResource` - Product attributes (size, color, etc.)

### Inventory & Fulfillment
- `InventoryResource` - Stock management
- `InventoryMovementResource` - Stock movements (in/out)
- `WarehouseResource` - Warehouse management
- `LowStockAlertResource` - Low stock notifications

### Orders
- `OrderResource` - Customer orders
- `AdminOrderResource` - Admin order management

### Vendors & Supply
- `VendorResource` - Vendor/supplier management

### System Configuration
- `AdminConfigResource` - System settings
- `AdminS3ConfigResource` - S3/Storage configuration
- `ImageResource` - Image upload/management

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (Strict) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Data Table | TanStack Table |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Charts | Recharts |
| Date Utils | date-fns |

---

## Implementation Phases

### Phase 0: Core Business Components ✅ (COMPLETED)

Build these reusable business components first. They will be used across every module.

#### 0.1 Layout Components ✅
```
components/layout/
├── Sidebar.tsx           # Main sidebar navigation ✅
├── SidebarNav.tsx        # Navigation items ✅
├── SidebarNavLink.tsx    # Individual nav item ✅
├── SidebarFooter.tsx     # Sidebar footer ✅
├── Header.tsx            # Top header bar ✅
└── MainContent.tsx       # Main content wrapper ✅
```

#### 0.2 Page Components ✅
```
components/shared/
├── PageLayout.tsx        # Page wrapper with sidebar/header ✅
├── PageHeader.tsx        # Title, description, breadcrumbs, actions ✅
├── PageSection.tsx       # Grouped content sections ✅
└── PageDescription.tsx   # Description text ✅
```

#### 0.3 Table Components ✅ (COMPLETED)
```
components/table/
├── DataTable.tsx         # Full-featured table wrapper ✅
├── DataToolbar.tsx      # Search, filters, bulk actions ✅
├── SearchBox.tsx        # Debounced search input ✅
├── FilterPanel.tsx      # Filter dropdown/chip panel ✅
└── EmptyState.tsx       # Empty table illustration ✅
```

#### 0.4 Form Components ✅ (Use shadcn/ui directly)
```
# Use shadcn/ui components directly:
- Form, FormField, FormItem, FormLabel, FormControl, FormMessage
- Input, Textarea, Select, Checkbox, Switch, RadioGroup
- Card, Button, Label, Popover, Dialog

# Only custom helpers:
- FormGrid, FormRow, FormActions (simple layout utilities)
- EntitySelector (async entity dropdown)
```

#### 0.5 Display Components ✅ (COMPLETED)
```
components/display/
├── StatusBadge.tsx      # Generic status badge ✅
├── StatusBadges.tsx     # Order, Payment, Inventory badges ✅
├── Money.tsx            # Formatted currency ✅
└── DateTime.tsx         # Date/time formatting ✅
```

#### 0.6 Dialog Components ✅ (COMPLETED)
```
components/shared/
├── ConfirmDialog.tsx   # Destructive action confirmation ✅
├── DeleteDialog.tsx    # Pre-built delete confirmation ✅
└── LoadingOverlay.tsx   # Full-page loading state ✅
```

---

### Phase 1: Core Infrastructure ✅ (COMPLETED)

#### 1.1 Project Setup ✅
- [x] Configure TypeScript strict mode
- [x] Set up ESLint with Next.js rules
- [x] Configure Tailwind CSS with custom theme

#### 1.2 Dependencies ✅
- [x] Install shadcn/ui
- [x] Install TanStack Query
- [x] Install TanStack Table
- [x] Install React Hook Form + Zod
- [x] Install Lucide React icons

#### 1.3 API & State Management ✅
- [x] Configure TanStack Query client
- [x] Create API client with fetch
- [x] Set up auth context and hooks
- [x] Create error boundary
- [x] Build core services layer (useOrders, useInventory, useVendors, etc.)

---

### Phase 2: Authentication ✅ (COMPLETED)

#### 2.1 Auth Pages ✅
- [x] Login page with form validation
- [x] Protected route middleware
- [x] Token storage and refresh logic
- [x] Logout functionality

---

### Phase 3: Layout Implementation ✅ (COMPLETED)

- [x] Sidebar with navigation
- [x] Header with user menu
- [x] Breadcrumb navigation
- [x] Responsive mobile drawer
- [x] PageLayout wrapper

---

### Phase 4: Dashboard Overview

- [ ] Statistics cards component
- [ ] Recent orders table
- [ ] Low stock alerts widget
- [ ] Sales chart (Recharts)

---

### Phase 5: Module Implementation (Now Easy!)

With business components, each module is straightforward:

#### 5.1 Products
- [ ] Product list page (DataTable + Search + Filters)
- [ ] Product create/edit form
- [ ] Product variants table
- [ ] Product image gallery

#### 5.2 Orders
- [ ] Order list page (DataTable + Status filters)
- [ ] Order detail page
- [ ] Order status update

#### 5.3 Inventory
- [ ] Inventory list page (DataTable + Warehouse filters)
- [ ] Stock movement form
- [ ] Low stock alerts

#### 5.4 Categories
- [ ] Category tree or nested table
- [ ] Category form

#### 5.5 Vendors
- [ ] Vendor list page
- [ ] Vendor form

#### 5.6 Customers
- [ ] Customer list page
- [ ] Customer detail page

#### 5.7 Reports
- [ ] Sales report with date range
- [ ] Export functionality

#### 5.8 Settings
- [ ] System config forms
- [ ] User and role management

---

## Component Examples

### List Page Pattern
```tsx
// In any module list page
'use client';

import { DataTable } from '@/components/table/DataTable';
import { DataToolbar } from '@/components/table/DataToolbar';
import { PageHeader } from '@/components/shared/PageHeader';
import { useProducts } from '@/lib/hooks/use-products';
import { getProductColumns } from './product-columns';

export default function ProductsPage() {
  const products = useProducts();
  const columns = getProductColumns();

  return (
    <PageLayout>
      <PageHeader
        title="Products"
        description="Manage your product catalog"
        actions={<AddProductButton />}
      />
      <DataToolbar
        search={<SearchBox placeholder="Search products..." />}
        filters={<ProductFilters />}
        actions={<BulkActions />}
      />
      <DataTable
        data={products}
        columns={columns}
        pagination
      />
    </PageLayout>
  );
}
```

### Form Page Pattern
```tsx
// In any module edit page
'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { ProductForm } from '@/components/forms/ProductForm';
import { useProduct } from '@/lib/hooks/use-products';

export default function EditProductPage({ params }) {
  const { data: product } = useProduct(params.id);

  return (
    <PageLayout>
      <PageHeader
        title="Edit Product"
        breadcrumbs={[
          { label: 'Products', href: '/products' },
          { label: product?.name }
        ]}
      />
      <ProductForm product={product} />
    </PageLayout>
  );
}
```

---

## Page Structure Checklist

### Every List Page Must Contain
- [ ] Title
- [ ] Description
- [ ] Primary Action button
- [ ] Search
- [ ] Filters
- [ ] Table
- [ ] Pagination
- [ ] Bulk Actions
- [ ] Empty State
- [ ] Loading State
- [ ] Error State

### Every Edit Page Must Contain
- [ ] Breadcrumb
- [ ] Page Title
- [ ] Save Button
- [ ] Cancel Button
- [ ] Organized sections
- [ ] Validation
- [ ] Unsaved change protection

---

## Tables Must Support
- [ ] Search
- [ ] Sorting
- [ ] Filtering
- [ ] Pagination
- [ ] Column visibility
- [ ] Bulk selection
- [ ] Responsive layout

---

## Forms Must
- [ ] Use React Hook Form
- [ ] Use Zod validation
- [ ] Display validation inline
- [ ] Have consistent spacing
- [ ] Group related fields
- [ ] Never overwhelm users

---

## API Integration

The admin will integrate with the Quarkus backend:
- **Base URL**: Configurable via `.env.local`
- **Authentication**: JWT Bearer tokens
- **Content-Type**: `application/json`

### Key Endpoints

```
POST   /api/auth/login           - Admin login
GET    /api/products             - List products
POST   /api/products             - Create product
PUT    /api/products/{id}        - Update product
DELETE /api/products/{id}        - Delete product
GET    /api/categories           - List categories
GET    /api/orders               - List orders
GET    /api/admin/orders/{id}    - Get order details
PUT    /api/admin/orders/{id}    - Update order
GET    /api/inventory            - List inventory
GET    /api/vendors              - List vendors
```

---

## Development Guidelines

### Component Design
- **Prefer composition over inheritance**
- **Keep components small** - Single responsibility
- **Keep pages thin** - Business logic in hooks/services
- **UI components remain presentational**
- **Use strict TypeScript**
- **Avoid unnecessary abstractions**

### Never Duplicate
- Layouts
- Table implementations
- Form layouts

**Create reusable business components when duplication appears.**

### Code Quality
- Write code that another developer can understand in one minute
- Prefer explicit props over implicit context
- Use TypeScript strict mode
- Avoid `any` types

### Styling
- Use **shadcn/ui** components as base (don't wrap them)
- Extend with Tailwind utilities
- Use `cn()` utility for conditional classes
- Support dark mode with `dark:` prefix
- Follow 8px spacing system
- Prefer whitespace over borders
- Use color only for status or warnings

---

## State Management

- **Server state**: TanStack Query
- **Client state**: React Context or Zustand (if needed)
- **Form state**: React Hook Form

---

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Authentication
NEXT_PUBLIC_JWT_REFRESH_INTERVAL=300000

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

---

## Success Criteria

- [ ] All business components implemented and tested
- [ ] All CRUD operations functional for Products, Orders, Inventory
- [ ] Consistent UI across all modules
- [ ] Responsive design working on mobile and desktop
- [ ] Authentication and authorization working
- [ ] Export functionality for reports
- [ ] Dark mode support
- [ ] Error handling and loading states
- [ ] Accessible UI (ARIA labels, keyboard navigation)
- [ ] Code is maintainable and understandable
