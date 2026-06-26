export type Category =
  | "extinguisher"
  | "detector"
  | "blanket"
  | "emergency"
  | "firstaid"
  | "signs"
  | "valve";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
  image: string;
  specs: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
}

export interface CartTotals {
  subtotal: number;
  shipping: number;
  total: number;
}

export interface ShippingInfo {
  name: string;
  phone: string;
  email: string;
  division: string;
  city: string;
  address: string;
}

export interface Order {
  orderNumber: string;
  items: CartItem[];
  totals: CartTotals;
  shipping?: ShippingInfo;
  payment?: string;
  status: string;
  date: string;
  userId: string;
}

export interface User {
  name: string;
  email: string;
}
