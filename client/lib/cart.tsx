import React, { createContext, useContext, useEffect, useState } from "react";
import type { FoodItem } from "@/components/FoodItemCard";

type CartEntry = {
  item: FoodItem;
  qty: number;
};

type CartState = Record<string, CartEntry>;

type CartContextValue = {
  cart: CartState;
  add: (item: FoodItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartState>(() => {
    try {
      const raw = localStorage.getItem("cart:v1");
      return raw ? (JSON.parse(raw) as CartState) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const add = (item: FoodItem) => {
    setCart((prev) => {
      const prevEntry = prev[item.id];
      return {
        ...prev,
        [item.id]: { item, qty: (prevEntry?.qty ?? 0) + 1 },
      };
    });
  };

  const remove = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const setQty = (id: string, qty: number) => {
    setCart((prev) => {
      const entry = prev[id];
      if (!entry) return prev;
      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: { ...entry, qty } };
    });
  };

  const clear = () => setCart({});

  const totalCount = Object.values(cart).reduce((s, e) => s + e.qty, 0);
  const totalPrice = Object.values(cart).reduce(
    (s, e) => s + e.qty * e.item.price,
    0,
  );

  return (
    <CartContext.Provider
      value={{ cart, add, remove, setQty, clear, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
