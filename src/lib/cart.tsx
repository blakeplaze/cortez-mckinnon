"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Size } from "./products";

export type CartItem = {
  slug: string;
  size: Size;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  addItem: (slug: string, size: Size, qty?: number) => void;
  setQty: (slug: string, size: Size, qty: number) => void;
  removeItem: (slug: string, size: Size) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "tezz-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      setItems([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (slug: string, size: Size, qty = 1) => {
      setItems((current) => {
        const match = current.find((item) => item.slug === slug && item.size === size);
        if (match) {
          return current.map((item) =>
            item.slug === slug && item.size === size
              ? { ...item, qty: item.qty + qty }
              : item,
          );
        }
        return [...current, { slug, size, qty }];
      });
      setOpen(true);
    };

    const setQty = (slug: string, size: Size, qty: number) => {
      if (qty < 1) {
        setItems((current) =>
          current.filter((item) => !(item.slug === slug && item.size === size)),
        );
        return;
      }
      setItems((current) =>
        current.map((item) =>
          item.slug === slug && item.size === size ? { ...item, qty } : item,
        ),
      );
    };

    const removeItem = (slug: string, size: Size) => {
      setItems((current) =>
        current.filter((item) => !(item.slug === slug && item.size === size)),
      );
    };

    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce((sum, item) => {
      const product = getProduct(item.slug);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);

    return {
      items,
      ready,
      addItem,
      setQty,
      removeItem,
      clear: () => setItems([]),
      count,
      subtotal,
      open,
      setOpen,
    };
  }, [items, open, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
