# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# Revolop Admin - Admin Dashboard for RevCommerce Platform

## Project Overview
**Revolop Admin** is the official administration panel for the RevCommerce ecommerce platform. This is an internal admin panel used by merchants to manage their business—not a public storefront.

Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui (base-nova style).

**Backend API:** [revolopcommerce-api](../revolopcommerce-api/) - Quarkus-based REST API

---

## Design Philosophy

### Goal
Build a modern, clean, fast, and maintainable admin panel that feels like **Stripe Dashboard, Shopify Admin, GitHub, or Linear**—minimal, professional, and immediately understandable.

### Priorities
1. **Simplicity** - Every screen should be immediately understandable
2. **Consistency** - Same layout, patterns, and interactions everywhere
3. **Readability** - Code that another developer can understand in one minute
4. **Productivity** - Components that accelerate development
5. **Accessibility** - WCAG compliant, keyboard navigable
6. **Reusability** - Business components over one-off implementations

### What We Don't Do
- Wrappers around every shadcn component
- Flashy UI or animations
- Gradients, glassmorphism, excessive shadows
- Unnecessary colors or decoration
- Impressive but useless interactions

### What We Do
- shadcn/ui (base-nova style) as the design foundation
- Reusable BUSINESS components
- Clean, minimal, professional
- Whitespace over borders
- Typography over decoration
- Color only for status or warnings
- Consistent 8px spacing system

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (Strict) |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (base-nova) |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Charts | Recharts |
| Date Utils | date-fns |
| HTTP Client | Axios |

---

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

---

## Folder Structure

```
revolop-admin/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                # Auth group (login)
│   ├── (dashboard)/           # Protected dashboard routes
│   │   ├── dashboard/         # Dashboard overview
│   │   ├── products/          # Product management
│   │   │   ├── page.tsx       # Product list
│   │   │   ├── [id]/          # Product detail/edit
│   │   │   └── new/           # Product creation
│   │   ├── orders/            # Order management
│   │   ├── inventory/         # Inventory management
│   │   ├── customers/         # Customer management
│   │   ├── vendors/           # Vendor management
│   │   ├── reports/           # Reports & analytics
│   │   ├── categories/        # Category management
│   │   └── settings/          # System settings
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── providers.tsx          # App providers wrapper
│
├── components/
│   ├── ui/                    # shadcn/ui base components (don't wrap these)
│   ├── layout/                # Sidebar, Header, navigation
│   │   ├── sidebar/
│   │   ├── header/
│   │   ├── main/
│   │   └── breadcrumb/
│   ├── shared/                # Reusable business components
│   │   └── page/              # PageHeader, PageTitle, etc.
│   └── [feature]/             # Feature-specific components (e.g., products/tabs/)
│
├── lib/
│   ├── api/                   # API client, endpoints, types
│   │   ├── client.ts          # Axios client with auth interceptors
│   │   ├── query-client.ts    # TanStack Query client
│   │   ├── endpoints/         # API endpoint functions
│   │   └── types/             # API response/request types
│   ├── hooks/                 # Custom React hooks
│   └── utils.ts               # Utility functions (cn, etc.)
│
├── public/                    # Static assets
└── plan/                      # Implementation plans
```

---

## Path Aliases

- `@/*` maps to the project root directory

Use `@/components/...`, `@/lib/...`, etc. for imports.

---

## App Architecture

### Providers (`app/providers.tsx`)
The app uses a provider chain:
1. **QueryClientProvider** - TanStack Query for server state
2. **ThemeProvider** - next-themes for dark/light mode
3. **AuthProvider** - Custom auth context for JWT authentication
4. **Toaster** - sonner for toast notifications

### API Layer (`lib/api/`)

**client.ts** - Axios instance with:
- JWT token injection via request interceptor
- 401 handling with redirect to login
- Token storage helpers (getAccessToken, setAccessToken, clearTokens)

**endpoints/** - Individual API modules:
- `auth.ts` - Login, registration
- `products.ts` - Product CRUD, variants
- `categories.ts` - Category hierarchy
- `brands.ts` - Brand management
- `attributes.ts` - Product attributes
- `inventory.ts` - Stock, movements
- `orders.ts` - Order management
- `vendors.ts` - Supplier management
- `warehouses.ts` - Warehouse management

**types/** - TypeScript types matching backend DTOs

### Auth Hook (`lib/hooks/use-auth.tsx`)
- `useAuth()` - Provides user, isAuthenticated, isLoading, login, logout
- Parses JWT tokens to extract user info
- Manages token storage

---

## Component Guidelines

### Before creating a new component:
1. Check whether an existing reusable component can be used
2. Reuse if possible
3. Only create new when it represents a reusable business concept

### Existing Shared Components
- `PageHeader` - Title, description, breadcrumbs, actions
- `PageHeaderTitle` - Title portion of PageHeader
- `PageHeaderActions` - Actions portion of PageHeader
- `PageDescription` - Description text

### Layout Components
- `Header` - Top header with mobile menu trigger
- `Sidebar` - Desktop sidebar navigation
- `SidebarNav` - Navigation items with links
- `SidebarNavLink` - Individual nav item
- `SidebarFooter` - Sidebar footer content
- `MainContent` - Main content wrapper
- `Breadcrumb` - Breadcrumb navigation

### Feature Components
- `components/products/tabs/` - Product detail tabs (General, Variants, Inventory, Media, SEO)

---

## UI Rules

### Every List Page Must Contain
- Title
- Description
- Primary Action button
- Search
- Filters
- Table
- Pagination
- Bulk Actions
- Empty State
- Loading State
- Error State

### Every Edit Page Must Contain
- Breadcrumb
- Page Title
- Save Button
- Cancel Button
- Organized sections
- Validation
- Unsaved change protection

### Tables Must Support
- Search
- Sorting
- Filtering
- Pagination
- Column visibility
- Bulk selection
- Responsive layout

### Forms Must
- Use React Hook Form
- Use Zod validation
- Display validation inline
- Have consistent spacing
- Group related fields
- Never overwhelm users

---

## Development Rules

### Component Development
- Prefer composition over inheritance
- Keep components small - Single responsibility
- Keep pages thin - Business logic in hooks/services
- UI components remain presentational
- Use strict TypeScript
- Avoid unnecessary abstractions
- Write readable code - Understandable in one minute

### Never Duplicate
- Layouts
- Table implementations
- Form layouts

**Create reusable business components when duplication appears.**

---

## Backend API Resources

The Quarkus backend provides REST APIs for:

- **Auth** - `/api/auth` - Login, registration, JWT
- **Products** - `/api/products` - Product CRUD, variants
- **Categories** - `/api/categories` - Category hierarchy
- **Brands** - `/api/brands` - Brand management
- **Inventory** - `/api/inventory` - Stock, movements
- **Orders** - `/api/orders`, `/api/admin/orders` - Order management
- **Vendors** - `/api/vendors` - Supplier management
- **Warehouses** - `/api/warehouses` - Warehouse management
- **Users/Roles** - `/api/roles` - RBAC

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

Create `.env.local` for local development (already exists).

---

## When to Use Server vs Client Components

**Use Server Components by default:**
- Data fetching pages (lists, details)
- Forms without complex interactivity
- Static content

**Use Client Components when:**
- Interactive UI (modals, dropdowns, mobile sidebar)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- React Query hooks
- Auth state management

The dashboard layout (`app/(dashboard)/layout.tsx`) and auth providers require client components.

---

## Styling

- Use **shadcn/ui** components as base (don't wrap them)
- Extend with Tailwind utilities
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Support dark mode with `dark:` prefix
- Follow 8px spacing system
- Prefer whitespace over borders
- Use color only for status or warnings

---

## Implementation Progress

See [plan/01-implementation-plan.md](plan/01-implementation-plan.md) for detailed phases.

**Completed:**
- Project setup with Next.js 16, TypeScript strict mode
- shadcn/ui integration (base-nova style)
- TanStack Query configuration
- API client with auth interceptors
- Auth hook with JWT parsing
- Dashboard layout (sidebar, header, mobile responsive)
- Page header components
- Product list page structure
- Product detail page with tabs

**In Progress:**
- Remaining CRUD modules (Orders, Inventory, Vendors, etc.)
- Reusable table components (DataTable, DataToolbar)
- Form components and validation
- Status badges and display components

---

## Related Projects

- **Backend API:** [revolopcommerce-api](../revolopcommerce-api/)
- **Storefront:** [techsoukdhaka](../techsoukdhaka/) (customer-facing store)
