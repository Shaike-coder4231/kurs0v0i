import { createContext, useContext, useEffect, useState } from 'react';
import { LICENSE_MULT } from '../api';
const CartContext = createContext(null);
const KEY = 'ss_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);
  const add = (product, licenseType = 'Personal', qty = 1) => {
    const mult = LICENSE_MULT[licenseType] || 1;
    const key = `${product.id}:${licenseType}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, id: product.id, title: product.title, thumbnail: product.thumbnail, price: +(product.price * mult).toFixed(2), basePrice: product.price, licenseType, qty, sku: product.sku }];
    });
  };
  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
  const updateQty = (key, qty) => setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, +qty) } : i)));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return <CartContext.Provider value={{ items, add, remove, updateQty, clear, count, total }}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);