import { createContext, useContext, useEffect, useState } from 'react';
const OrderContext = createContext(null);
const KEY = 'ss_orders';

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(orders)); }, [orders]);
  const add = (order) => {
    const o = { id: 'ORD-' + Date.now().toString(36).toUpperCase(), createdAt: new Date().toISOString(), status: 'paid', ...order };
    setOrders((prev) => [o, ...prev]);
    return o;
  };
  const updateStatus = (id, status) => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  const getById = (id) => orders.find((o) => o.id === id);
  return <OrderContext.Provider value={{ orders, add, updateStatus, getById }}>{children}</OrderContext.Provider>;
}
export const useOrders = () => useContext(OrderContext);