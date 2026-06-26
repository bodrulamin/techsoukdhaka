"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Cart, CartTotals, Order, Product, ShippingInfo, User } from "@/lib/types";

interface Toast {
  id: number;
  message: string;
}

interface StoreContextValue {
  cart: Cart;
  user: User | null;
  orders: Order[];
  cartOpen: boolean;
  totals: CartTotals;
  itemCount: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, change: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  placeOrder: (shipping: ShippingInfo, payment: string) => string;
  notify: (message: string) => void;
  toasts: Toast[];
}

const StoreContext = createContext<StoreContextValue | null>(null);

function computeTotals(cart: Cart): CartTotals {
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal >= 500 ? 0 : cart.items.length > 0 ? 60 : 0;
  return { subtotal, shipping, total: subtotal + shipping };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const toastId = useRef(0);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      const storedUser = localStorage.getItem("user");
      const storedOrders = localStorage.getItem("orders");
      if (storedCart) setCart(JSON.parse(storedCart));
      const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;
      if (parsedUser) setUser(parsedUser);
      let parsedOrders: Order[] = storedOrders ? JSON.parse(storedOrders) : [];

      // Seed a demo order for the demo account (matches prototype behavior)
      if (parsedUser && parsedOrders.length === 0) {
        parsedOrders = [
          {
            orderNumber: "TS-DEMO1",
            items: [
              {
                id: 1,
                name: "ABC Dry Powder Fire Extinguisher - 1kg",
                price: 850,
                quantity: 2,
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8iShMzzmBsP3HYNaOKAtPuGcU8hW5yftcfGs1bVUrXezV47MZfYx2WfI&s=10",
              },
            ],
            totals: { subtotal: 1700, shipping: 0, total: 1700 },
            status: "Delivered",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            userId: "customer@demo.com",
          },
        ];
        localStorage.setItem("orders", JSON.stringify(parsedOrders));
      }
      setOrders(parsedOrders);
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist cart
  useEffect(() => {
    if (hydrated) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  // Persist orders
  useEffect(() => {
    if (hydrated) localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders, hydrated]);

  const notify = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2300);
  }, []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const toggleCart = useCallback(() => setCartOpen((o) => !o), []);

  const addToCart = useCallback(
    (product: Product) => {
      setCart((prev) => {
        const existing = prev.items.find((i) => i.id === product.id);
        let items;
        if (existing) {
          items = prev.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        } else {
          items = [
            ...prev.items,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.image,
            },
          ];
        }
        return { items };
      });
      setCartOpen(true);
      notify("Added to cart!");
    },
    [notify],
  );

  const updateQuantity = useCallback((productId: number, change: number) => {
    setCart((prev) => {
      const items = prev.items
        .map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity + change } : i,
        )
        .filter((i) => i.quantity > 0);
      return { items };
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => ({
      items: prev.items.filter((i) => i.id !== productId),
    }));
  }, []);

  const clearCart = useCallback(() => setCart({ items: [] }), []);

  const login = useCallback(
    (email: string, password: string) => {
      if (email === "customer@demo.com" && password === "demo123") {
        const u: User = { name: "Customer", email };
        setUser(u);
        localStorage.setItem("user", JSON.stringify(u));
        notify("Welcome back!");
        return true;
      }
      notify("Invalid credentials!");
      return false;
    },
    [notify],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    notify("Signed out successfully");
  }, [notify]);

  const placeOrder = useCallback(
    (shipping: ShippingInfo, payment: string) => {
      const orderNumber =
        "TS-" + Math.random().toString(36).substring(2, 7).toUpperCase();
      const totals = computeTotals(cart);
      const order: Order = {
        orderNumber,
        items: [...cart.items],
        totals,
        shipping,
        payment,
        status: "Processing",
        date: new Date().toISOString(),
        userId: user?.email || "guest",
      };
      setOrders((prev) => [...prev, order]);
      setCart({ items: [] });
      return orderNumber;
    },
    [cart, user],
  );

  const totals = useMemo(() => computeTotals(cart), [cart]);
  const itemCount = useMemo(
    () => cart.items.reduce((sum, i) => sum + i.quantity, 0),
    [cart],
  );

  const value: StoreContextValue = {
    cart,
    user,
    orders,
    cartOpen,
    totals,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    login,
    logout,
    placeOrder,
    notify,
    toasts,
  };

  return <StoreContext value={value}>{children}</StoreContext>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
